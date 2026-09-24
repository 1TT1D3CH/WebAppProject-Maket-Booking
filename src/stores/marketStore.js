import { defineStore } from 'pinia'
import { DEFAULT_ZONES, DEFAULT_STALLS } from '../types/market.js'
import { isRealFirebaseConfigured } from '../firebase/config.js'
import { 
  subscribeToMarketLayout, 
  saveMarketLayoutToFirestore, 
  bookStallWithTransaction,
  initAuthListener
} from '../services/firebaseService.js'

export const useMarketStore = defineStore('market', {
  state: () => ({
    activeMode: 'admin', // 'admin' | 'customer'
    marketName: localStorage.getItem('market_name') || 'ตลาดยามเย็น Walking Street KKU',
    
    // Real-world Dimensions in Meters
    marketWidthMeters: Number(localStorage.getItem('market_width_m')) || 30, // 30 เมตร
    marketHeightMeters: Number(localStorage.getItem('market_height_m')) || 20, // 20 เมตร
    scalePxPerMeter: 40, // 1 เมตร = 40px
    gridSnapMeters: Number(localStorage.getItem('market_grid_snap_m')) || 0.5, // Snap ทุกๆ 0.5 เมตร
    snapToGrid: true,
    
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },
    
    zones: JSON.parse(localStorage.getItem('market_zones')) || DEFAULT_ZONES,
    stalls: JSON.parse(localStorage.getItem('market_stalls')) || DEFAULT_STALLS,
    
    selectedStallId: null,
    
    // Filters for customer view
    filterZoneId: 'all',
    filterStatus: 'all',
    searchQuery: '',
    
    // Firebase & System Status
    isSaving: false,
    isLoading: false,
    isRealtimeConnected: false,
    lastSavedTime: null,
    notification: null,
    unsubscribeRealtime: null,
    currentUser: null
  }),

  getters: {
    selectedStall: (state) => state.stalls.find(s => s.id === state.selectedStallId),

    getZoneById: (state) => (id) => state.zones.find(z => z.id === id) || { name: 'ไม่ระบุ', color: '#94a3b8' },

    // Canvas size in pixels computed from real-world meters
    canvasWidthPx: (state) => Math.round(state.marketWidthMeters * state.scalePxPerMeter),
    canvasHeightPx: (state) => Math.round(state.marketHeightMeters * state.scalePxPerMeter),
    gridSizePx: (state) => Math.round(state.gridSnapMeters * state.scalePxPerMeter),

    // Total Market Area in Square Meters (ตร.ม.)
    totalMarketAreaSqM: (state) => state.marketWidthMeters * state.marketHeightMeters,

    filteredStalls: (state) => {
      return state.stalls.filter(stall => {
        const matchesZone = state.filterZoneId === 'all' || stall.zoneId === state.filterZoneId
        const matchesStatus = state.filterStatus === 'all' || stall.status === state.filterStatus
        const matchesSearch = !state.searchQuery || 
          stall.stallNo.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          (stall.notes && stall.notes.toLowerCase().includes(state.searchQuery.toLowerCase()))
        
        return matchesZone && matchesStatus && matchesSearch
      })
    },

    stats: (state) => {
      const total = state.stalls.length
      const available = state.stalls.filter(s => s.status === 'available').length
      const booked = state.stalls.filter(s => s.status === 'booked').length
      const disabled = state.stalls.filter(s => s.status === 'disabled').length
      const totalRevenue = state.stalls
        .filter(s => s.status === 'booked')
        .reduce((sum, s) => sum + (s.price || 0), 0)

      return { total, available, booked, disabled, totalRevenue }
    }
  },

  actions: {
    // Utility functions to convert between Pixels and Meters
    pxToM(px) {
      return Math.round((px / this.scalePxPerMeter) * 10) / 10
    },

    mToPx(m) {
      return Math.round(m * this.scalePxPerMeter)
    },

    getStallMetrics(stall) {
      if (!stall) return { widthM: 0, heightM: 0, xM: 0, yM: 0, areaSqM: 0 }
      const widthM = this.pxToM(stall.width)
      const heightM = this.pxToM(stall.height)
      const xM = this.pxToM(stall.x)
      const yM = this.pxToM(stall.y)
      const areaSqM = Math.round((widthM * heightM) * 10) / 10
      return { widthM, heightM, xM, yM, areaSqM }
    },

    /**
     * Start Firebase Auth & Real-Time Firestore Synchronization
     */
    initFirebaseSync() {
      if (!isRealFirebaseConfigured) return

      // Auth Listener
      initAuthListener((user) => {
        this.currentUser = user
      })

      // Real-time Firestore Listener
      if (!this.unsubscribeRealtime) {
        this.unsubscribeRealtime = subscribeToMarketLayout(
          (data) => {
            if (data.stalls && data.stalls.length > 0) this.stalls = data.stalls
            if (data.zones && data.zones.length > 0) this.zones = data.zones
            if (data.name) this.marketName = data.name
            if (data.marketWidthMeters) this.marketWidthMeters = data.marketWidthMeters
            if (data.marketHeightMeters) this.marketHeightMeters = data.marketHeightMeters
            if (data.gridSnapMeters) this.gridSnapMeters = data.gridSnapMeters
            
            this.isRealtimeConnected = true
            this.lastSavedTime = new Date().toLocaleTimeString('th-TH')
            this.persistToLocal()
          },
          (err) => {
            this.isRealtimeConnected = false
          }
        )
      }
    },

    setMode(mode) {
      this.activeMode = mode
    },

    showNotification(msg, type = 'info') {
      this.notification = { msg, type }
      setTimeout(() => {
        if (this.notification?.msg === msg) {
          this.notification = null
        }
      }, 3500)
    },

    persistToLocal() {
      try {
        localStorage.setItem('market_stalls', JSON.stringify(this.stalls))
        localStorage.setItem('market_zones', JSON.stringify(this.zones))
        localStorage.setItem('market_name', this.marketName)
        localStorage.setItem('market_width_m', String(this.marketWidthMeters))
        localStorage.setItem('market_height_m', String(this.marketHeightMeters))
        localStorage.setItem('market_grid_snap_m', String(this.gridSnapMeters))
      } catch (err) {
        console.warn('LocalStorage save error:', err)
      }
    },

    // Update overall Market dimensions in Meters
    updateMarketDimensions({ name, widthMeters, heightMeters, gridSnapMeters }) {
      if (name) this.marketName = name
      if (widthMeters && widthMeters > 0) this.marketWidthMeters = Number(widthMeters)
      if (heightMeters && heightMeters > 0) this.marketHeightMeters = Number(heightMeters)
      if (gridSnapMeters && gridSnapMeters > 0) this.gridSnapMeters = Number(gridSnapMeters)

      this.persistToLocal()
      this.saveLayoutToFirestore()
      this.showNotification(`ปรับขนาดตลาดเป็น ${this.marketWidthMeters} x ${this.marketHeightMeters} เมตร (${this.totalMarketAreaSqM} ตร.ม.)`, 'success')
    },

    selectStall(id) {
      this.selectedStallId = id
    },

    // Admin Layout Actions
    addStall(stallData = {}) {
      const count = this.stalls.length + 1
      const defaultZone = this.zones[0]?.id || 'zone-food'
      const defaultZoneObj = this.getZoneById(defaultZone)
      
      // Default stall size: 2.5 meters x 2.0 meters
      const defaultW_Px = this.mToPx(stallData.widthM || 2.5)
      const defaultH_Px = this.mToPx(stallData.heightM || 2.0)

      const nextX = (count * 40) % (this.canvasWidthPx - 120) + 40
      const nextY = Math.floor((count * 40) / (this.canvasWidthPx - 120)) * 120 + 40

      const newStall = {
        id: `stall-${Date.now().toString(36)}`,
        stallNo: stallData.stallNo || `S-${String(count).padStart(2, '0')}`,
        zoneId: stallData.zoneId || defaultZone,
        x: stallData.x ?? nextX,
        y: stallData.y ?? nextY,
        width: defaultW_Px,
        height: defaultH_Px,
        price: stallData.price || defaultZoneObj.pricePerDay || 400,
        status: stallData.status || 'available',
        bookedBy: null,
        notes: stallData.notes || ''
      }

      this.stalls.push(newStall)
      this.selectedStallId = newStall.id
      this.persistToLocal()
      this.saveLayoutToFirestore()
      this.showNotification(`เพิ่มแผงค้า ${newStall.stallNo} สำเร็จ (ขนาด ${this.pxToM(defaultW_Px)} x ${this.pxToM(defaultH_Px)} ม.)`, 'success')
      return newStall
    },

    updateStall(id, updates) {
      const idx = this.stalls.findIndex(s => s.id === id)
      if (idx !== -1) {
        // If updates contain meters (widthM, heightM, xM, yM), convert to pixels
        if (updates.widthM !== undefined) updates.width = this.mToPx(updates.widthM)
        if (updates.heightM !== undefined) updates.height = this.mToPx(updates.heightM)
        if (updates.xM !== undefined) updates.x = this.mToPx(updates.xM)
        if (updates.yM !== undefined) updates.y = this.mToPx(updates.yM)

        delete updates.widthM
        delete updates.heightM
        delete updates.xM
        delete updates.yM

        this.stalls[idx] = { ...this.stalls[idx], ...updates }
        this.persistToLocal()
        this.saveLayoutToFirestore()
      }
    },

    updateStallPosition(id, xPx, yPx) {
      const stall = this.stalls.find(s => s.id === id)
      if (stall) {
        const step = this.gridSizePx
        if (this.snapToGrid && step > 0) {
          stall.x = Math.max(0, Math.round(xPx / step) * step)
          stall.y = Math.max(0, Math.round(yPx / step) * step)
        } else {
          stall.x = Math.max(0, Math.round(xPx))
          stall.y = Math.max(0, Math.round(yPx))
        }
        this.persistToLocal()
      }
    },

    updateStallSize(id, widthPx, heightPx) {
      const stall = this.stalls.find(s => s.id === id)
      if (stall) {
        const step = this.gridSizePx
        const minPx = this.mToPx(1.0) // Minimum 1 meter
        if (this.snapToGrid && step > 0) {
          stall.width = Math.max(minPx, Math.round(widthPx / step) * step)
          stall.height = Math.max(minPx, Math.round(heightPx / step) * step)
        } else {
          stall.width = Math.max(minPx, Math.round(widthPx))
          stall.height = Math.max(minPx, Math.round(heightPx))
        }
        this.persistToLocal()
      }
    },

    removeStall(id) {
      const idx = this.stalls.findIndex(s => s.id === id)
      if (idx !== -1) {
        const removed = this.stalls.splice(idx, 1)[0]
        if (this.selectedStallId === id) {
          this.selectedStallId = null
        }
        this.persistToLocal()
        this.saveLayoutToFirestore()
        this.showNotification(`ลบแผงค้า ${removed.stallNo} เรียบร้อยแล้ว`, 'info')
      }
    },

    // Zone Management
    addZone(zone) {
      const newZone = {
        id: `zone-${Date.now().toString(36)}`,
        name: zone.name || 'โซนใหม่',
        color: zone.color || '#3b82f6',
        pricePerDay: zone.pricePerDay || 400
      }
      this.zones.push(newZone)
      this.persistToLocal()
      this.saveLayoutToFirestore()
      this.showNotification(`เพิ่ม ${newZone.name} เรียบร้อยแล้ว`, 'success')
    },

    updateZone(id, updates) {
      const idx = this.zones.findIndex(z => z.id === id)
      if (idx !== -1) {
        this.zones[idx] = { ...this.zones[idx], ...updates }
        this.persistToLocal()
        this.saveLayoutToFirestore()
      }
    },

    removeZone(id) {
      if (this.zones.length <= 1) {
        this.showNotification('ต้องมีอย่างน้อย 1 โซนในระบบ', 'warning')
        return
      }
      this.zones = this.zones.filter(z => z.id !== id)
      this.persistToLocal()
      this.saveLayoutToFirestore()
      this.showNotification('ลบโซนสำเร็จ', 'info')
    },

    // Customer Booking
    async bookStall(stallId, customerInfo) {
      const stall = this.stalls.find(s => s.id === stallId)
      if (!stall) return false
      
      if (stall.status === 'booked') {
        this.showNotification(`แผงค้า ${stall.stallNo} ถูกจองไปแล้ว!`, 'error')
        return false
      }

      try {
        const res = await bookStallWithTransaction(
          stallId, 
          customerInfo, 
          this.stalls, 
          this.marketName, 
          this.zones
        )

        stall.status = 'booked'
        stall.bookedBy = {
          name: customerInfo.name,
          phone: customerInfo.phone,
          goodsType: customerInfo.goodsType,
          bookedAt: new Date().toISOString()
        }
        this.persistToLocal()

        if (res.mode === 'firestore') {
          this.showNotification(`จองแผงค้า ${stall.stallNo} สำเร็จแล้ว! (บันทึก Firestore)`, 'success')
        } else {
          this.showNotification(`จองแผงค้า ${stall.stallNo} สำเร็จ! (โหมด Local)`, 'success')
        }
        return true
      } catch (err) {
        console.error('Booking Error:', err)
        this.showNotification(err.message || 'เกิดข้อผิดพลาดในการจองแผงค้า', 'error')
        return false
      }
    },

    cancelBooking(stallId) {
      const stall = this.stalls.find(s => s.id === stallId)
      if (stall) {
        stall.status = 'available'
        stall.bookedBy = null
        this.persistToLocal()
        this.saveLayoutToFirestore()
        this.showNotification(`ยกเลิกการจองแผง ${stall.stallNo} แล้ว`, 'info')
      }
    },

    // Firestore Integration
    async saveLayoutToFirestore() {
      this.isSaving = true
      this.persistToLocal()

      try {
        const res = await saveMarketLayoutToFirestore(
          this.marketName, 
          this.zones, 
          this.stalls, 
          {
            marketWidthMeters: this.marketWidthMeters,
            marketHeightMeters: this.marketHeightMeters,
            gridSnapMeters: this.gridSnapMeters
          }
        )
        if (res.success && res.mode === 'firestore') {
          this.showNotification('บันทึกผังตลาดลง Firebase Firestore สำเร็จ!', 'success')
        } else if (res.error?.code === 'permission-denied') {
          this.showNotification('บันทึกในเครื่องสำเร็จ (กรุณาเปิดสิทธิ์ Rules บน Firebase Console)', 'warning')
        } else {
          this.showNotification('บันทึกผังตลาดเรียบร้อยแล้ว', 'success')
        }
        this.lastSavedTime = new Date().toLocaleTimeString('th-TH')
      } catch (err) {
        console.warn('Save Layout notice:', err)
        this.showNotification('บันทึกข้อมูลเรียบร้อยแล้ว (โหมด Local Storage)', 'success')
      } finally {
        this.isSaving = false
      }
    },

    resetToDefaults() {
      this.stalls = JSON.parse(JSON.stringify(DEFAULT_STALLS))
      this.zones = JSON.parse(JSON.stringify(DEFAULT_ZONES))
      this.marketWidthMeters = 30
      this.marketHeightMeters = 20
      this.gridSnapMeters = 0.5
      this.selectedStallId = null
      this.persistToLocal()
      this.saveLayoutToFirestore()
      this.showNotification('คืนค่าเริ่มต้นผังตลาดเรียบร้อยแล้ว', 'info')
    }
  }
})
