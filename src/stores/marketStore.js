import { defineStore } from 'pinia'
import { DEFAULT_ZONES, DEFAULT_STALLS, DEFAULT_LAYOUT_OBJECTS } from '../types/market.js'
import { isRealFirebaseConfigured } from '../firebase/config.js'
import { 
  subscribeToMarketLayout, 
  saveMarketLayoutToFirestore, 
  bookStallWithTransaction,
  initAuthListener
} from '../services/firebaseService.js'
import { useNotificationStore } from './notificationStore.js'

export const useMarketStore = defineStore('market', {
  state: () => ({
    activeMode: 'admin', // 'admin' | 'customer'
    theme: localStorage.getItem('app_theme') || 'light', // 'light' | 'dark'
    marketName: localStorage.getItem('market_name') || 'ตลาดยามเย็น Walking Street KKU',
    
    // Real-world Dimensions in Meters
    marketWidthMeters: Number(localStorage.getItem('market_width_m')) || 30,
    marketHeightMeters: Number(localStorage.getItem('market_height_m')) || 20,
    scalePxPerMeter: 40, // 1 เมตร = 40px
    gridSnapMeters: Number(localStorage.getItem('market_grid_snap_m')) || 0.5,
    snapToGrid: true,
    
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },
    
    zones: JSON.parse(localStorage.getItem('market_zones')) || DEFAULT_ZONES,
    stalls: JSON.parse(localStorage.getItem('market_stalls')) || DEFAULT_STALLS,
    layoutObjects: JSON.parse(localStorage.getItem('market_layout_objects')) || DEFAULT_LAYOUT_OBJECTS,
    
    selectedStallId: null,
    selectedObjectId: null, // Selected non-stall Architecture Object ID
    
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
    currentUser: null,

    // การเปลี่ยนแปลงที่ยังไม่ได้บันทึก
    hasUnsavedChanges: false,

    /**
     * Snapshots และ Dirty tracking ตาม notification1.md
     */
    initialStallsState: {},
    dirtyStallsMap: {},
    deletedBookedStalls: []
  }),

  getters: {
    isDark: (state) => state.theme === 'dark',
    selectedStall: (state) => state.stalls.find(s => s.id === state.selectedStallId),
    selectedObject: (state) => state.layoutObjects.find(o => o.id === state.selectedObjectId),

    getZoneById: (state) => (id) => state.zones.find(z => z.id === id) || { name: 'ไม่ระบุ', color: '#94a3b8' },

    canvasWidthPx: (state) => Math.round(state.marketWidthMeters * state.scalePxPerMeter),
    canvasHeightPx: (state) => Math.round(state.marketHeightMeters * state.scalePxPerMeter),
    gridSizePx: (state) => Math.round(state.gridSnapMeters * state.scalePxPerMeter),

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
    // ─── Theme Actions ────────────────────────────────────────────────────────
    initTheme() {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('app_theme', this.theme)
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      this.showNotification(`สลับเป็นโหมด ${this.theme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`, 'info')
    },

    setTheme(newTheme) {
      this.theme = newTheme
      localStorage.setItem('app_theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    // ─── Utilities ────────────────────────────────────────────────────────────
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

    getObjectMetrics(obj) {
      if (!obj) return { widthM: 0, heightM: 0, xM: 0, yM: 0 }
      const widthM = this.pxToM(obj.width)
      const heightM = this.pxToM(obj.height)
      const xM = this.pxToM(obj.x)
      const yM = this.pxToM(obj.y)
      return { widthM, heightM, xM, yM }
    },

    // ─── Firebase Sync ────────────────────────────────────────────────────────
    initFirebaseSync() {
      this.initTheme()
      this._captureInitialStallsState()

      if (!isRealFirebaseConfigured) return

      initAuthListener((user) => {
        this.currentUser = user
      })

      if (!this.unsubscribeRealtime) {
        this.unsubscribeRealtime = subscribeToMarketLayout(
          (data) => {
            // หากอยู่ระหว่างการบันทึกผังของ Admin ให้ข้าม เพื่อไม่ให้ snapshot ล่วงหน้ามาลบล้าง Diffing
            if (this.isSaving) return

            if (data.stalls && data.stalls.length > 0) this.stalls = data.stalls
            if (data.zones && data.zones.length > 0) this.zones = data.zones
            if (data.layoutObjects && data.layoutObjects.length > 0) this.layoutObjects = data.layoutObjects
            if (data.name) this.marketName = data.name
            if (data.marketWidthMeters) this.marketWidthMeters = data.marketWidthMeters
            if (data.marketHeightMeters) this.marketHeightMeters = data.marketHeightMeters
            if (data.gridSnapMeters) this.gridSnapMeters = data.gridSnapMeters
            
            this.isRealtimeConnected = true
            this.lastSavedTime = new Date().toLocaleTimeString('th-TH')
            this.hasUnsavedChanges = false
            this._captureInitialStallsState()
            this.persistToLocal()
          },
          () => { this.isRealtimeConnected = false }
        )
      }
    },

    setMode(mode) {
      this.activeMode = mode
    },

    // ─── Toast Notification (UI only) ─────────────────────────────────────────
    showNotification(msg, type = 'info') {
      if (this._notifTimer) {
        clearTimeout(this._notifTimer)
        this._notifTimer = null
      }
      this.notification = { msg, type }
      this._notifTimer = setTimeout(() => {
        this.notification = null
        this._notifTimer = null
      }, 3000)
    },

    // ─── Local Persistence ────────────────────────────────────────────────────
    persistToLocal() {
      try {
        localStorage.setItem('market_stalls', JSON.stringify(this.stalls))
        localStorage.setItem('market_zones', JSON.stringify(this.zones))
        localStorage.setItem('market_layout_objects', JSON.stringify(this.layoutObjects))
        localStorage.setItem('market_name', this.marketName)
        localStorage.setItem('market_width_m', String(this.marketWidthMeters))
        localStorage.setItem('market_height_m', String(this.marketHeightMeters))
        localStorage.setItem('market_grid_snap_m', String(this.gridSnapMeters))
        localStorage.setItem('app_theme', this.theme)
      } catch (err) {
        console.warn('LocalStorage save error:', err)
      }
    },

    markUnsaved() {
      this.hasUnsavedChanges = true
      this.persistToLocal()
    },

    /**
     * สร้าง Snapshot ของผังตลาด (initialStallsState) ก่อนเริ่มแก้ไข
     * เรียกตอนโหลดข้อมูลจาก Firestore/LocalStorage และหลัง Save สำเร็จแต่ละครั้ง
     */
    _captureInitialStallsState() {
      const snapshot = {}
      this.stalls.forEach(stall => {
        snapshot[stall.id] = {
          id: stall.id,
          stallNo: stall.stallNo,
          zoneId: stall.zoneId,
          x: stall.x,
          y: stall.y,
          width: stall.width,
          height: stall.height,
          price: stall.price,
          status: stall.status,
          notes: stall.notes || '',
          bookedBy: stall.bookedBy ? JSON.parse(JSON.stringify(stall.bookedBy)) : null
        }
      })
      this.initialStallsState = snapshot
      this.dirtyStallsMap = {}
      this.deletedBookedStalls = []
    },

    /**
     * ติดตามการแก้ไขแผงค้า (Dirty Stalls Tracker)
     */
    snapshotStallIfNew(stallId) {
      if (!this.dirtyStallsMap) this.dirtyStallsMap = {}
      this.dirtyStallsMap[stallId] = true
    },

    // ─── Market Dimensions ────────────────────────────────────────────────────
    updateMarketDimensions({ name, widthMeters, heightMeters, gridSnapMeters }) {
      if (name) this.marketName = name
      if (widthMeters && widthMeters > 0) this.marketWidthMeters = Number(widthMeters)
      if (heightMeters && heightMeters > 0) this.marketHeightMeters = Number(heightMeters)
      if (gridSnapMeters && gridSnapMeters > 0) this.gridSnapMeters = Number(gridSnapMeters)

      this.markUnsaved()
      this.showNotification(`ปรับขนาดตลาดเป็น ${this.marketWidthMeters} x ${this.marketHeightMeters} เมตร — กด "บันทึกผัง" เพื่อยืนยัน`, 'warning')
    },

    selectStall(id) {
      this.selectedStallId = id
      this.selectedObjectId = null
    },

    selectLayoutObject(id) {
      this.selectedObjectId = id
      this.selectedStallId = null
    },

    deselectAll() {
      this.selectedStallId = null
      this.selectedObjectId = null
    },

    // ─── Admin Stall Actions ──────────────────────────────────────────────────
    addStall(stallData = {}) {
      const count = this.stalls.length + 1
      const defaultZone = this.zones[0]?.id || 'zone-food'
      const defaultZoneObj = this.getZoneById(defaultZone)
      
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
      this.selectStall(newStall.id)
      this.markUnsaved()
      this.showNotification(`เพิ่มแผงค้า ${newStall.stallNo} — กด "บันทึกผัง" เพื่อยืนยัน`, 'warning')
      return newStall
    },

    updateStall(id, updates) {
      const idx = this.stalls.findIndex(s => s.id === id)
      if (idx !== -1) {
        if (updates.widthM !== undefined) updates.width = this.mToPx(updates.widthM)
        if (updates.heightM !== undefined) updates.height = this.mToPx(updates.heightM)
        if (updates.xM !== undefined) updates.x = this.mToPx(updates.xM)
        if (updates.yM !== undefined) updates.y = this.mToPx(updates.yM)

        delete updates.widthM
        delete updates.heightM
        delete updates.xM
        delete updates.yM

        this.stalls[idx] = { ...this.stalls[idx], ...updates }
        this.markUnsaved()
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

        this.hasUnsavedChanges = true
        this.persistToLocal()
      }
    },

    updateStallSize(id, widthPx, heightPx) {
      const stall = this.stalls.find(s => s.id === id)
      if (stall) {
        const step = this.gridSizePx
        const minPx = this.mToPx(1.0)

        if (this.snapToGrid && step > 0) {
          stall.width = Math.max(minPx, Math.round(widthPx / step) * step)
          stall.height = Math.max(minPx, Math.round(heightPx / step) * step)
        } else {
          stall.width = Math.max(minPx, Math.round(widthPx))
          stall.height = Math.max(minPx, Math.round(heightPx))
        }

        this.hasUnsavedChanges = true
        this.persistToLocal()
      }
    },

    removeStall(id) {
      const idx = this.stalls.findIndex(s => s.id === id)
      if (idx !== -1) {
        const removed = this.stalls.splice(idx, 1)[0]
        if (this.selectedStallId === id) this.selectedStallId = null
        if (removed.status === 'booked' && removed.bookedBy) {
          if (!this.deletedBookedStalls) this.deletedBookedStalls = []
          this.deletedBookedStalls.push(removed)
        }
        this.markUnsaved()
        this.showNotification(`ลบแผงค้า ${removed.stallNo} — กด "บันทึกผัง" เพื่อยืนยัน`, 'warning')
      }
    },

    // ─── Admin Architecture / Layout Object Actions ───────────────────────────
    addLayoutObject(preset) {
      const count = this.layoutObjects.length + 1
      const wPx = this.mToPx(preset.widthM || 3.0)
      const hPx = this.mToPx(preset.heightM || 2.0)
      
      const newObj = {
        id: `obj-${Date.now().toString(36)}`,
        type: preset.type || 'facility',
        subType: preset.subType || 'info',
        label: preset.label || `วัตถุโครงสร้าง ${count}`,
        x: 120 + (count * 30) % 300,
        y: 120 + (count * 30) % 200,
        width: wPx,
        height: hPx,
        rotation: 0, // 0, 90, 180, 270 degrees
        styleProps: preset.styleProps || { color: '#6366f1', icon: 'help-circle' }
      }

      this.layoutObjects.push(newObj)
      this.selectLayoutObject(newObj.id)
      this.markUnsaved()
      this.showNotification(`เพิ่ม ${newObj.label} บนผังแล้ว`, 'success')
      return newObj
    },

    updateLayoutObject(id, updates) {
      const idx = this.layoutObjects.findIndex(o => o.id === id)
      if (idx !== -1) {
        if (updates.widthM !== undefined) updates.width = this.mToPx(updates.widthM)
        if (updates.heightM !== undefined) updates.height = this.mToPx(updates.heightM)
        if (updates.xM !== undefined) updates.x = this.mToPx(updates.xM)
        if (updates.yM !== undefined) updates.y = this.mToPx(updates.yM)

        delete updates.widthM
        delete updates.heightM
        delete updates.xM
        delete updates.yM

        this.layoutObjects[idx] = { ...this.layoutObjects[idx], ...updates }
        this.markUnsaved()
      }
    },

    rotateLayoutObject(id) {
      const obj = this.layoutObjects.find(o => o.id === id)
      if (obj) {
        obj.rotation = ((obj.rotation || 0) + 90) % 360
        this.markUnsaved()
        this.showNotification(`หมุน ${obj.label} เป็น ${obj.rotation}°`, 'info')
      }
    },

    updateLayoutObjectPosition(id, xPx, yPx) {
      const obj = this.layoutObjects.find(o => o.id === id)
      if (obj) {
        const step = this.gridSizePx
        if (this.snapToGrid && step > 0) {
          obj.x = Math.max(0, Math.round(xPx / step) * step)
          obj.y = Math.max(0, Math.round(yPx / step) * step)
        } else {
          obj.x = Math.max(0, Math.round(xPx))
          obj.y = Math.max(0, Math.round(yPx))
        }
        this.hasUnsavedChanges = true
        this.persistToLocal()
      }
    },

    updateLayoutObjectSize(id, widthPx, heightPx) {
      const obj = this.layoutObjects.find(o => o.id === id)
      if (obj) {
        const step = this.gridSizePx
        const minPx = this.mToPx(0.8)

        if (this.snapToGrid && step > 0) {
          obj.width = Math.max(minPx, Math.round(widthPx / step) * step)
          obj.height = Math.max(minPx, Math.round(heightPx / step) * step)
        } else {
          obj.width = Math.max(minPx, Math.round(widthPx))
          obj.height = Math.max(minPx, Math.round(heightPx))
        }

        this.hasUnsavedChanges = true
        this.persistToLocal()
      }
    },

    removeLayoutObject(id) {
      const idx = this.layoutObjects.findIndex(o => o.id === id)
      if (idx !== -1) {
        const removed = this.layoutObjects.splice(idx, 1)[0]
        if (this.selectedObjectId === id) this.selectedObjectId = null
        this.markUnsaved()
        this.showNotification(`ลบวัตถุ ${removed.label} แล้ว`, 'warning')
      }
    },

    // ─── Zone Management ──────────────────────────────────────────────────────
    addZone(zone) {
      const newZone = {
        id: `zone-${Date.now().toString(36)}`,
        name: zone.name || 'โซนใหม่',
        color: zone.color || '#3b82f6',
        pricePerDay: zone.pricePerDay || 400
      }
      this.zones.push(newZone)
      this.markUnsaved()
      this.showNotification(`เพิ่ม ${newZone.name} — กด "บันทึกผัง" เพื่อยืนยัน`, 'warning')
    },

    updateZone(id, updates) {
      const idx = this.zones.findIndex(z => z.id === id)
      if (idx !== -1) {
        this.zones[idx] = { ...this.zones[idx], ...updates }
        this.markUnsaved()
      }
    },

    removeZone(id) {
      if (this.zones.length <= 1) {
        this.showNotification('ต้องมีอย่างน้อย 1 โซนในระบบ', 'warning')
        return
      }
      this.zones = this.zones.filter(z => z.id !== id)
      this.markUnsaved()
      this.showNotification('ลบโซนแล้ว — กด "บันทึกผัง" เพื่อยืนยัน', 'warning')
    },

    // ─── Customer Booking ─────────────────────────────────────────────────────
    async bookStall(stallId, customerInfo) {
      const stall = this.stalls.find(s => s.id === stallId)
      if (!stall) return false
      
      if (stall.status === 'booked') {
        this.showNotification(`แผงค้า ${stall.stallNo} ถูกจองไปแล้ว!`, 'error')
        return false
      }

      try {
        const res = await bookStallWithTransaction(
          stallId, customerInfo, this.stalls, this.marketName, this.zones
        )

        stall.status = 'booked'
        stall.bookedBy = {
          tenantId: customerInfo.tenantId || 'demo-tenant-001',
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
        this.markUnsaved()
        this.showNotification(`ยกเลิกการจองแผง ${stall.stallNo} — กด "บันทึกผัง" เพื่อยืนยัน`, 'warning')
      }
    },

    // ─── Save Layout + Batch Notification ────────────────────────────────────
    async saveLayoutToFirestore(silent = false) {
      this.isSaving = true
      this.persistToLocal()

      try {
        // 1. ทำการ Diffing และส่ง Notification ก่อนที่ Firestore realtime listener จะมารีเซ็ต snapshot
        const notifCount = await this._sendBatchShiftNotifications()

        // 2. บันทึกผังตลาดลง Firestore
        const res = await saveMarketLayoutToFirestore(
          this.marketName, 
          this.zones, 
          this.stalls, 
          {
            marketWidthMeters: this.marketWidthMeters,
            marketHeightMeters: this.marketHeightMeters,
            gridSnapMeters: this.gridSnapMeters
          },
          this.layoutObjects
        )
        this.lastSavedTime = new Date().toLocaleTimeString('th-TH')
        this.hasUnsavedChanges = false

        // 3. อัปเดต snapshot ให้เป็นปัจจุบันหลังบันทึกเสร็จสมบูรณ์
        this._captureInitialStallsState()

        if (!silent) {
          if (notifCount > 0) {
            this.showNotification(
              `✅ บันทึกผังสำเร็จ และส่งแจ้งเตือนไปยังผู้เช่า ${notifCount} ราย`,
              'success'
            )
          } else if (res.success && res.mode === 'firestore') {
            this.showNotification('✅ บันทึกผังตลาดลง Firebase Firestore สำเร็จ!', 'success')
          } else if (res.error?.code === 'permission-denied') {
            this.showNotification('บันทึกในเครื่องสำเร็จ (กรุณาเปิดสิทธิ์ Rules บน Firebase Console)', 'warning')
          } else {
            this.showNotification('✅ บันทึกผังตลาดเรียบร้อยแล้ว', 'success')
          }
        }
      } catch (err) {
        console.warn('Save Layout notice:', err)
        if (!silent) {
          this.showNotification('✅ บันทึกข้อมูลเรียบร้อยแล้ว (โหมด Local Storage)', 'success')
        }
        this.hasUnsavedChanges = false
      } finally {
        this.isSaving = false
      }
    },

    /**
     * Master Notification Refactoring: Batch & Throttle Notification Engine
     * ทำงานตามกฎเหล็ก 3 ข้อใน notification1.md:
     * Rule 1: ทำงานเมื่อกด "บันทึก (Save)" เท่านั้น
     * Rule 2: คัดกรองเฉพาะแผงที่มีผู้เช่า (isBooked && tenantId) เท่านั้น
     * Rule 3: Single Consolidated Notification per Save + No-Op Check
     */
    async _sendBatchShiftNotifications() {
      // ตรวจสอบว่ามี initialStallsState หรือไม่ ถ้าไม่มีให้ capture และ return 0
      if (!this.initialStallsState || Object.keys(this.initialStallsState).length === 0) {
        this._captureInitialStallsState()
        return 0
      }

      const notifStore = useNotificationStore()
      // Group changes by tenantId -> Map<tenantId, Array<{ stall, oldSnap, posChanged, sizeChanged, infoChanged, isDeleted }>>
      const tenantChangesMap = new Map()

      // ตรวจสอบแผงปัจจุบันทั้งหมดเทียบกับ initialStallsState
      for (const stall of this.stalls) {
        const oldSnap = this.initialStallsState[stall.id]

        // Rule 2: กรองเฉพาะแผงที่มีผู้เช่า / จองแล้ว เท่านั้น
        // (ตรวจสอบทั้งสถานะปัจจุบัน และสถานะเดิมใน snapshot)
        const isCurrentlyBooked = stall.status === 'booked'
        const wasBooked = oldSnap && oldSnap.status === 'booked'

        // ถ้าทั้งในอดีตและปัจจุบันไม่มีการจองเลย ให้ข้ามเด็ดขาด (Filter Unbooked Stalls)
        if (!isCurrentlyBooked && !wasBooked) continue

        const tenantId = stall.bookedBy?.tenantId || 
                         stall.bookedBy?.uid || 
                         oldSnap?.bookedBy?.tenantId || 
                         oldSnap?.bookedBy?.uid || 
                         'demo-tenant-001'

        if (!oldSnap) {
          // แผงนี้เพิ่งถูกสร้างหรือเพิ่งเปลี่ยนสถานะมาเป็น booked
          if (!tenantChangesMap.has(tenantId)) {
            tenantChangesMap.set(tenantId, [])
          }
          tenantChangesMap.get(tenantId).push({
            stall,
            oldSnap: null,
            posChanged: false,
            sizeChanged: false,
            infoChanged: true
          })
          continue
        }

        // Rule 3: No-Op Check (Skip if No Actual Change)
        const posChanged = oldSnap.x !== stall.x || oldSnap.y !== stall.y
        const sizeChanged = oldSnap.width !== stall.width || oldSnap.height !== stall.height
        const statusChanged = oldSnap.status !== stall.status
        const infoChanged = statusChanged ||
                            oldSnap.stallNo !== stall.stallNo || 
                            oldSnap.price !== stall.price || 
                            oldSnap.notes !== (stall.notes || '') ||
                            oldSnap.zoneId !== stall.zoneId

        // หากไม่มีการเปลี่ยนแปลงจริง (เช่น ลากแล้ววางกลับที่เดิม) ให้ข้าม ไม่สร้าง Notification
        if (!posChanged && !sizeChanged && !infoChanged) {
          continue
        }

        if (!tenantChangesMap.has(tenantId)) {
          tenantChangesMap.set(tenantId, [])
        }
        tenantChangesMap.get(tenantId).push({
          stall,
          oldSnap,
          posChanged,
          sizeChanged,
          infoChanged
        })
      }

      // ตรวจสอบแผงที่มีผู้เช่าและถูกลบระหว่างรอบการแก้ไข
      if (this.deletedBookedStalls && this.deletedBookedStalls.length > 0) {
        for (const delStall of this.deletedBookedStalls) {
          const tenantId = delStall.bookedBy?.tenantId || delStall.bookedBy?.uid || 'demo-tenant-001'
          if (tenantId) {
            if (!tenantChangesMap.has(tenantId)) {
              tenantChangesMap.set(tenantId, [])
            }
            tenantChangesMap.get(tenantId).push({
              stall: delStall,
              oldSnap: delStall,
              posChanged: false,
              sizeChanged: false,
              infoChanged: true,
              isDeleted: true
            })
          }
        }
      }

      // หากไม่มีแผงของผู้เช่าใดเปลี่ยนแปลงเลย
      if (tenantChangesMap.size === 0) {
        return 0
      }

      // Rule 3: Single Consolidated Notification per Save (1 Notification ต่อ 1 Tenant)
      const notificationsToCreate = []

      for (const [tenantId, changeList] of tenantChangesMap.entries()) {
        if (changeList.length === 1) {
          const item = changeList[0]
          const stallNo = item.stall.stallNo
          const stallId = item.stall.id

          let title = 'อัปเดตข้อมูลแผงค้า'
          let message = ''

          if (item.isDeleted) {
            title = 'แจ้งเตือนการยกเลิกแผงค้า'
            message = `แผง ${stallNo} ของคุณถูกนำออกจากผังตลาดโดยผู้ดูแลระบบ`
          } else if (item.posChanged && (item.sizeChanged || item.infoChanged)) {
            title = 'อัปเดตข้อมูลแผงค้า'
            message = `แผง ${stallNo} ของคุณได้รับการปรับตำแหน่งและอัปเดตข้อมูลบนผังตลาดเรียบร้อยแล้ว`
          } else if (item.posChanged) {
            title = 'อัปเดตตำแหน่งแผงค้า'
            message = `แผง ${stallNo} ของคุณได้รับการปรับเปลี่ยนตำแหน่งบนผังตลาด`
          } else {
            title = 'อัปเดตข้อมูลแผงค้า'
            message = `ข้อมูลแผง ${stallNo} ของคุณได้รับการอัปเดตจากผู้ดูแลระบบ`
          }

          notificationsToCreate.push({
            tenantId,
            stallId,
            stallNo,
            title,
            message,
            type: 'LAYOUT_UPDATE',
            createdAt: new Date().toISOString(),
            isRead: false
          })
        } else {
          // ผู้เช่ามีหลายแผงที่ได้รับการแก้ไขในการเซฟครั้งนี้ -> Consolidated สรุปเป็น 1 ข้อความ
          const stallNos = changeList.map(c => c.stall.stallNo).join(', ')
          const stallIds = changeList.map(c => c.stall.id).join(', ')
          const hasPos = changeList.some(c => c.posChanged)

          const title = 'อัปเดตข้อมูลแผงค้า'
          const message = hasPos
            ? `แผงค้าของคุณ (${stallNos}) ได้รับการปรับตำแหน่งและอัปเดตข้อมูลบนผังตลาดเรียบร้อยแล้ว`
            : `แผงค้าของคุณ (${stallNos}) ได้รับการปรับปรุงข้อมูลบนผังตลาดเรียบร้อยแล้ว`

          notificationsToCreate.push({
            tenantId,
            stallId: stallIds,
            stallNo: stallNos,
            title,
            message,
            type: 'LAYOUT_UPDATE',
            createdAt: new Date().toISOString(),
            isRead: false
          })
        }
      }

      // บันทึก Notification ลง Firestore และ Local Store แบบ Batch
      await notifStore.sendBatchLayoutNotifications(notificationsToCreate)
      return notificationsToCreate.length
    },

    resetToDefaults() {
      this.stalls = JSON.parse(JSON.stringify(DEFAULT_STALLS))
      this.zones = JSON.parse(JSON.stringify(DEFAULT_ZONES))
      this.layoutObjects = JSON.parse(JSON.stringify(DEFAULT_LAYOUT_OBJECTS))
      this.marketWidthMeters = 30
      this.marketHeightMeters = 20
      this.gridSnapMeters = 0.5
      this.selectedStallId = null
      this.selectedObjectId = null
      this.initialStallsState = {}
      this.dirtyStallsMap = {}
      this.deletedBookedStalls = []
      this._captureInitialStallsState()
      this.markUnsaved()
      this.showNotification('รีเซ็ตผังตลาดแล้ว — กด "บันทึกผัง" เพื่อยืนยัน', 'warning')
    }
  }
})
