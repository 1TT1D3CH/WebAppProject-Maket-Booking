import { defineStore } from 'pinia'
import { DEFAULT_ZONES, DEFAULT_STALLS, DEFAULT_LAYOUT_OBJECTS } from '../types/market.js'
import { isRealFirebaseConfigured } from '../firebase/config.js'
import { 
  subscribeToMarketLayout, 
  saveMarketLayoutToFirestore, 
  bookStallWithTransaction
} from '../services/firebaseService.js'
import { useNotificationStore } from './notificationStore.js'
import { useAuthStore } from './authStore.js'
import { formatThaiTime } from '../utils/date.js'
import { buildStallWrites, mergeRemoteStalls } from '../utils/stallSync.js'
import { snapshotLayout, draftFromPublished, patchPublishedStall } from '../utils/publishedLayout.js'

function readCache(key, fallback) {
  try {
    const cached = JSON.parse(localStorage.getItem(key))
    if (cached) return cached
  } catch {
    // cache เสียหรือไม่มี localStorage
  }
  return isRealFirebaseConfigured ? [] : fallback
}

export const useMarketStore = defineStore('market', {
  state: () => ({
    activeMode: 'customer', // 'admin' | 'members' | 'slips' | 'audit' | 'revenue' | 'customer'
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
    
    // localStorage เป็นแค่ cache; เมื่อใช้ Firestore จริงและเครื่องนี้ยังไม่มี cache ให้เริ่มว่าง
    // (ไม่โชว์ค่า default ชั่วคราว) แล้วรอข้อมูลจาก Firestore เป็นตัวตัดสิน
    zones: readCache('market_zones', DEFAULT_ZONES),
    stalls: readCache('market_stalls', DEFAULT_STALLS),
    layoutObjects: readCache('market_layout_objects', DEFAULT_LAYOUT_OBJECTS),

    // ผังที่เผยแพร่แล้ว = สิ่งที่ลูกค้าเห็น (stalls/zones/layoutObjects/ขนาดตลาด ด้านบนคือ draft ของ admin)
    // อัปเดตจาก Firestore หรือหลัง admin บันทึกสำเร็จเท่านั้น ห้ามอ่าน draft ในหน้าลูกค้า
    published: null,
    
    selectedStallId: null,
    selectedObjectId: null, // Selected non-stall Architecture Object ID
    
    // Filters for customer view
    filterZoneId: 'all',
    filterStatus: 'all',
    searchQuery: '',
    
    // Firebase & System Status
    isSaving: false,
    _pendingRemote: null, // snapshot ผังล่าสุดที่มาระหว่าง admin กำลังบันทึก
    isLoading: false,
    isRealtimeConnected: false,
    lastSavedTime: null,
    notification: null,
    unsubscribeRealtime: null,

    // การเปลี่ยนแปลงที่ยังไม่ได้บันทึก
    hasUnsavedChanges: false,

    // true เมื่อแผงอยู่ใน Firestore (markets/main-layout/stalls) แล้ว
    // false = ข้อมูลเก่า/ยังไม่เคยบันทึก ต้องเขียนแผงทั้งหมดตอน admin บันทึกครั้งแรก
    stallsInFirestore: false,

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

    // ─── มุมมองลูกค้า: อ่านจากผังที่เผยแพร่แล้วเท่านั้น ───────────────────────
    pub: (state) => state.published || state,
    pubZoneById() {
      const zones = this.pub.zones
      return (id) => zones.find(z => z.id === id) || { name: 'ไม่ระบุ', color: '#94a3b8' }
    },
    pubCanvasWidthPx() { return Math.round(this.pub.marketWidthMeters * this.scalePxPerMeter) },
    pubCanvasHeightPx() { return Math.round(this.pub.marketHeightMeters * this.scalePxPerMeter) },
    pubTotalAreaSqM() { return this.pub.marketWidthMeters * this.pub.marketHeightMeters },
    pubFilteredStalls() {
      return this.pub.stalls.filter(stall => {
        const q = this.searchQuery.toLowerCase()
        const matchesZone = this.filterZoneId === 'all' || stall.zoneId === this.filterZoneId
        const matchesStatus = this.filterStatus === 'all' || stall.status === this.filterStatus
        const matchesSearch = !q ||
          stall.stallNo.toLowerCase().includes(q) ||
          (stall.notes && stall.notes.toLowerCase().includes(q))
        return matchesZone && matchesStatus && matchesSearch
      })
    },

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
      const pending = state.stalls.filter(s => s.status === 'pending').length
      const disabled = state.stalls.filter(s => s.status === 'disabled').length
      const totalRevenue = state.stalls
        .filter(s => s.status === 'booked')
        .reduce((sum, s) => sum + (s.price || 0), 0)
      return { total, available, booked, pending, disabled, totalRevenue }
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

    _hasCollision(excludeId, x, y, w, h) {
      const allItems = [
        ...this.stalls.map(s => ({ id: s.id, x: s.x, y: s.y, w: s.width, h: s.height })),
        ...this.layoutObjects.map(o => ({ id: o.id, x: o.x, y: o.y, w: o.width, h: o.height }))
      ]
      return allItems.some(item =>
        item.id !== excludeId &&
        x < item.x + item.w &&
        x + w > item.x &&
        y < item.y + item.h &&
        y + h > item.y
      )
    },

    _findFreePosition(w, h) {
      const step = Math.max(this.gridSizePx || 20, 20)
      const cw = this.canvasWidthPx
      const ch = this.canvasHeightPx
      for (let y = 20; y + h <= ch; y += step) {
        for (let x = 20; x + w <= cw; x += step) {
          if (!this._hasCollision(null, x, y, w, h)) return { x, y }
        }
      }
      return { x: 20, y: 20 }
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
      if (!this.published) this._publishFrom(this)

      if (!isRealFirebaseConfigured) return

      if (!this.unsubscribeRealtime) {
        this.unsubscribeRealtime = subscribeToMarketLayout(
          (data) => {
            // อยู่ระหว่างบันทึกผังของ Admin: เก็บ snapshot ล่าสุดไว้ใช้หลังบันทึกเสร็จ
            // (เดิมทิ้งไปเลย ทำให้การจองที่เข้ามาช่วงนั้นไม่แสดงจนกว่าจะมีการเปลี่ยนครั้งถัดไป)
            if (this.isSaving) {
              this._pendingRemote = data
              return
            }
            this._applyRemoteLayout(data)
          },
          () => { this.isRealtimeConnected = false }
        )
      }
    },

    /** นำ snapshot ผังจาก Firestore มารวมกับสถานะในเครื่อง */
    _applyRemoteLayout(data) {
      this.stallsInFirestore = data.stallsInFirestore
      const hadUnsaved = this.hasUnsavedChanges

      // ยังไม่มีเอกสารผังใน Firestore เลย: ใช้ค่า default เป็นผังตั้งต้น (admin เป็นคนบันทึกสร้างเอกสารครั้งแรก)
      if (!data.exists) {
        if (!hadUnsaved && this.stalls.length === 0 && this.layoutObjects.length === 0 && this.zones.length === 0) {
          this.stalls = JSON.parse(JSON.stringify(DEFAULT_STALLS))
          this.zones = JSON.parse(JSON.stringify(DEFAULT_ZONES))
          this.layoutObjects = JSON.parse(JSON.stringify(DEFAULT_LAYOUT_OBJECTS))
          this._captureInitialStallsState()
          this._publishFrom(this)
        }
        this.isRealtimeConnected = true
        return
      }

      // ผังที่ลูกค้าเห็น = ของที่บันทึกใน Firestore เสมอ ไม่ว่า admin จะมีงานค้างหรือไม่
      this._publishRemote(data)

      // มีเอกสารผังแล้ว: Firestore ชนะเสมอ แม้ผังจะว่าง (admin ลบทุกอย่างแล้วบันทึก) ห้ามเอา default มาเติม
      if (Array.isArray(data.stalls)) {
        // มีงานที่ admin ยังไม่ได้บันทึก: รวมเฉพาะการจองใหม่ ไม่ทับงานที่แก้ไว้ (C5)
        const merged = mergeRemoteStalls(this.stalls, data.stalls, this.initialStallsState, hadUnsaved)
        this.stalls = merged.stalls
        if (merged.initial) this.initialStallsState = merged.initial
      }

      if (!hadUnsaved) {
        if (Array.isArray(data.zones)) this.zones = data.zones
        if (Array.isArray(data.layoutObjects)) this.layoutObjects = data.layoutObjects
        if (data.name) this.marketName = data.name
        if (data.marketWidthMeters) this.marketWidthMeters = data.marketWidthMeters
        if (data.marketHeightMeters) this.marketHeightMeters = data.marketHeightMeters
        if (data.gridSnapMeters) this.gridSnapMeters = data.gridSnapMeters
        this.hasUnsavedChanges = false
        this._captureInitialStallsState()
      }

      this.isRealtimeConnected = true
      this.lastSavedTime = formatThaiTime(new Date())
      this.persistToLocal()
    },

    /** ตั้งผังเผยแพร่จากสำเนาของ state (draft) */
    _publishFrom(src) {
      this.published = snapshotLayout(src)
    },

    /** ตั้งผังเผยแพร่จาก snapshot ของ Firestore (ฟิลด์ที่ไม่มีใน snapshot คงค่าเดิม) */
    _publishRemote(data) {
      const base = this.published || snapshotLayout(this)
      this.published = snapshotLayout({
        stalls: Array.isArray(data.stalls) ? data.stalls : base.stalls,
        zones: Array.isArray(data.zones) ? data.zones : base.zones,
        layoutObjects: Array.isArray(data.layoutObjects) ? data.layoutObjects : base.layoutObjects,
        marketName: data.name || base.marketName,
        marketWidthMeters: data.marketWidthMeters || base.marketWidthMeters,
        marketHeightMeters: data.marketHeightMeters || base.marketHeightMeters,
        gridSnapMeters: data.gridSnapMeters || base.gridSnapMeters
      })
    },

    /** ยกเลิกการแก้ไขที่ยังไม่บันทึก: คืน draft เป็นผังที่บันทึกล่าสุด */
    discardChanges() {
      if (!this.published) return
      const d = draftFromPublished(this.published)
      this.stalls = d.stalls
      this.zones = d.zones
      this.layoutObjects = d.layoutObjects
      this.marketName = d.marketName
      this.marketWidthMeters = d.marketWidthMeters
      this.marketHeightMeters = d.marketHeightMeters
      this.gridSnapMeters = d.gridSnapMeters
      this.selectedStallId = null
      this.selectedObjectId = null
      this.hasUnsavedChanges = false
      this._captureInitialStallsState()
      this.persistToLocal()
      this.showNotification('ยกเลิกการแก้ไขแล้ว กลับเป็นผังที่บันทึกล่าสุด', 'info')
    },

    setMode(mode) {
      if ((mode === 'admin' || mode === 'members' || mode === 'slips' || mode === 'audit') && !useAuthStore().isAdmin) {
        this.showNotification('เฉพาะผู้ดูแลระบบหรือเจ้าของตลาดเท่านั้นที่เข้าโหมดแก้ไขผังได้', 'error')
        return false
      }
      if (mode === 'revenue' && !useAuthStore().isOwner) {
        this.showNotification('หน้ารายงานรายได้สำหรับเจ้าของตลาดเท่านั้น', 'error')
        return false
      }
      this.activeMode = mode
      return true
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
        // cache เก็บเฉพาะผังที่เผยแพร่แล้ว (งานที่ admin ยังไม่บันทึกไม่ไหลไปเป็น cache ของลูกค้า)
        const p = this.published || this
        localStorage.setItem('market_stalls', JSON.stringify(p.stalls))
        localStorage.setItem('market_zones', JSON.stringify(p.zones))
        localStorage.setItem('market_layout_objects', JSON.stringify(p.layoutObjects))
        localStorage.setItem('market_name', p.marketName)
        localStorage.setItem('market_width_m', String(p.marketWidthMeters))
        localStorage.setItem('market_height_m', String(p.marketHeightMeters))
        localStorage.setItem('market_grid_snap_m', String(p.gridSnapMeters))
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

      let posX = Math.min(Math.max(0, this.canvasWidthPx - defaultW_Px), Math.max(0, stallData.x ?? nextX))
      let posY = Math.min(Math.max(0, this.canvasHeightPx - defaultH_Px), Math.max(0, stallData.y ?? nextY))

      if (this._hasCollision(null, posX, posY, defaultW_Px, defaultH_Px)) {
        const free = this._findFreePosition(defaultW_Px, defaultH_Px)
        posX = free.x
        posY = free.y
      }

      const newStall = {
        id: `stall-${Date.now().toString(36)}`,
        stallNo: stallData.stallNo || `S-${String(count).padStart(2, '0')}`,
        zoneId: stallData.zoneId || defaultZone,
        x: posX,
        y: posY,
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
        const maxX = this.canvasWidthPx - stall.width
        const maxY = this.canvasHeightPx - stall.height

        let newX, newY
        if (this.snapToGrid && step > 0) {
          newX = Math.min(Math.max(0, maxX), Math.max(0, Math.round(xPx / step) * step))
          newY = Math.min(Math.max(0, maxY), Math.max(0, Math.round(yPx / step) * step))
        } else {
          newX = Math.min(Math.max(0, maxX), Math.max(0, Math.round(xPx)))
          newY = Math.min(Math.max(0, maxY), Math.max(0, Math.round(yPx)))
        }

        if (this._hasCollision(id, newX, newY, stall.width, stall.height)) return

        stall.x = newX
        stall.y = newY
        this.hasUnsavedChanges = true
        this.persistToLocal()
      }
    },

    updateStallSize(id, widthPx, heightPx) {
      const stall = this.stalls.find(s => s.id === id)
      if (stall) {
        const step = this.gridSizePx
        const minPx = this.mToPx(1.0)
        const maxW = this.canvasWidthPx - stall.x
        const maxH = this.canvasHeightPx - stall.y

        let newW, newH
        if (this.snapToGrid && step > 0) {
          newW = Math.min(maxW, Math.max(minPx, Math.round(widthPx / step) * step))
          newH = Math.min(maxH, Math.max(minPx, Math.round(heightPx / step) * step))
        } else {
          newW = Math.min(maxW, Math.max(minPx, Math.round(widthPx)))
          newH = Math.min(maxH, Math.max(minPx, Math.round(heightPx)))
        }

        if (this._hasCollision(id, stall.x, stall.y, newW, newH)) return

        stall.width = newW
        stall.height = newH
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
      
      const rawX = 120 + (count * 30) % 300
      const rawY = 120 + (count * 30) % 200

      let objX = Math.min(Math.max(0, this.canvasWidthPx - wPx), Math.max(0, rawX))
      let objY = Math.min(Math.max(0, this.canvasHeightPx - hPx), Math.max(0, rawY))

      if (this._hasCollision(null, objX, objY, wPx, hPx)) {
        const free = this._findFreePosition(wPx, hPx)
        objX = free.x
        objY = free.y
      }

      const newObj = {
        id: `obj-${Date.now().toString(36)}`,
        type: preset.type || 'facility',
        subType: preset.subType || 'info',
        label: preset.label || `วัตถุโครงสร้าง ${count}`,
        x: objX,
        y: objY,
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
        const maxX = this.canvasWidthPx - obj.width
        const maxY = this.canvasHeightPx - obj.height

        let newX, newY
        if (this.snapToGrid && step > 0) {
          newX = Math.min(Math.max(0, maxX), Math.max(0, Math.round(xPx / step) * step))
          newY = Math.min(Math.max(0, maxY), Math.max(0, Math.round(yPx / step) * step))
        } else {
          newX = Math.min(Math.max(0, maxX), Math.max(0, Math.round(xPx)))
          newY = Math.min(Math.max(0, maxY), Math.max(0, Math.round(yPx)))
        }

        if (this._hasCollision(id, newX, newY, obj.width, obj.height)) return

        obj.x = newX
        obj.y = newY
        this.hasUnsavedChanges = true
        this.persistToLocal()
      }
    },

    updateLayoutObjectSize(id, widthPx, heightPx) {
      const obj = this.layoutObjects.find(o => o.id === id)
      if (obj) {
        const step = this.gridSizePx
        const minPx = this.mToPx(0.8)
        const maxW = this.canvasWidthPx - obj.x
        const maxH = this.canvasHeightPx - obj.y

        let newW, newH
        if (this.snapToGrid && step > 0) {
          newW = Math.min(maxW, Math.max(minPx, Math.round(widthPx / step) * step))
          newH = Math.min(maxH, Math.max(minPx, Math.round(heightPx / step) * step))
        } else {
          newW = Math.min(maxW, Math.max(minPx, Math.round(widthPx)))
          newH = Math.min(maxH, Math.max(minPx, Math.round(heightPx)))
        }

        if (this._hasCollision(id, obj.x, obj.y, newW, newH)) return

        obj.width = newW
        obj.height = newH
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

      if (stall.status === 'booked' || stall.status === 'pending') {
        this.showNotification(`แผงค้า ${stall.stallNo} ถูกจองไปแล้ว!`, 'error')
        return false
      }

      if (!customerInfo?.tenantId) {
        this.showNotification('กรุณาเข้าสู่ระบบก่อนจองแผงค้า', 'error')
        return false
      }

      try {
        const res = await bookStallWithTransaction(stallId, customerInfo)

        // เก็บเฉพาะ id ในเอกสารแผง (ชื่อ/เบอร์โทรอยู่ใน bookings) และไม่นับเป็นการแก้ของ admin
        stall.status = 'pending'
        stall.bookedBy = res.bookedBy
        if (this.initialStallsState[stallId]) {
          this.initialStallsState[stallId] = { ...this.initialStallsState[stallId], status: 'pending', bookedBy: res.bookedBy }
        }
        if (this.published) patchPublishedStall(this.published, stallId, { status: 'pending', bookedBy: res.bookedBy })
        this.persistToLocal()

        this.showNotification(`ส่งการจองแผง ${stall.stallNo} แล้ว รอผู้ดูแลตรวจสลิป`, 'success')
        return true
      } catch (err) {
        console.error('Booking Error:', err)
        this.showNotification(
          err.code === 'permission-denied' ? 'ไม่มีสิทธิ์จองแผงนี้ (อาจถูกจองไปแล้ว) กรุณารีเฟรชหน้า' : (err.message || 'เกิดข้อผิดพลาดในการจองแผงค้า'),
          'error'
        )
        return false
      }
    },

    cancelBooking(stallId) {
      const stall = this.stalls.find(s => s.id === stallId)
      if (stall) {
        stall.status = 'available'
        stall.bookedBy = null
        if (this.initialStallsState[stallId]) {
          this.initialStallsState[stallId] = { ...this.initialStallsState[stallId], status: 'available', bookedBy: null }
        }
        if (this.published) patchPublishedStall(this.published, stallId, { status: 'available', bookedBy: null })
        this.markUnsaved()
        this.showNotification(`ยกเลิกการจองแผง ${stall.stallNo} — กด "บันทึกผัง" เพื่อยืนยัน`, 'warning')
      }
    },

    // ─── Save Layout + Batch Notification ────────────────────────────────────
    /**
     * @returns {Promise<boolean>} true เมื่อบันทึกลง Firestore สำเร็จจริง
     * ล้มเหลว -> แจ้ง error, คง hasUnsavedChanges ไว้ และไม่ส่งแจ้งเตือนผู้เช่า (C7)
     */
    async saveLayoutToFirestore(silent = false) {
      this.isSaving = true
      this.persistToLocal()

      try {
        // เขียนเฉพาะแผงที่ admin เปลี่ยนจริง (ไม่ส่งทั้งก้อน กันเขียนทับการจองที่เข้ามาระหว่างแก้ผัง — C4)
        // ถ้ายังไม่มีแผงใน Firestore ให้เขียนทั้งหมด (ย้ายจากโครงสร้างเก่า / ผังใหม่)
        const stallWrites = buildStallWrites(this.stalls, this.stallsInFirestore ? this.initialStallsState : {})

        const res = await saveMarketLayoutToFirestore(
          this.marketName,
          this.zones,
          {
            marketWidthMeters: this.marketWidthMeters,
            marketHeightMeters: this.marketHeightMeters,
            gridSnapMeters: this.gridSnapMeters
          },
          this.layoutObjects,
          stallWrites,
          this.stalls.map(s => s.id)
        )

        if (!res.success) {
          this.hasUnsavedChanges = true
          this.showNotification(
            res.error?.code === 'permission-denied'
              ? 'บันทึกไม่สำเร็จ: ไม่มีสิทธิ์แก้ไขผังตลาด'
              : 'บันทึกผังไม่สำเร็จ กรุณาลองใหม่ (ข้อมูลที่แก้ยังอยู่ในเครื่อง)',
            'error'
          )
          return false
        }

        // ส่งแจ้งเตือนผู้เช่า "หลัง" บันทึกสำเร็จเท่านั้น และก่อน capture snapshot ใหม่
        let notifCount = 0
        try {
          notifCount = await this._sendBatchShiftNotifications()
        } catch (err) {
          console.warn('Send notifications notice:', err)
        }

        this.stallsInFirestore = true
        this._publishFrom(this) // ลูกค้าเห็นผังใหม่ทั้งชุดพร้อมกันหลังบันทึกสำเร็จ
        this.lastSavedTime = formatThaiTime(new Date())
        this.hasUnsavedChanges = false
        this._captureInitialStallsState()

        if (!silent) {
          this.showNotification(
            notifCount > 0
              ? `✅ บันทึกผังสำเร็จ และส่งแจ้งเตือนไปยังผู้เช่า ${notifCount} ราย`
              : '✅ บันทึกผังตลาดลง Firebase Firestore สำเร็จ!',
            'success'
          )
        }
        return true
      } catch (err) {
        console.error('Save Layout error:', err)
        this.hasUnsavedChanges = true
        if (!silent) this.showNotification('บันทึกผังไม่สำเร็จ กรุณาลองใหม่', 'error')
        return false
      } finally {
        this.isSaving = false
        // รับ snapshot ที่ค้างระหว่างบันทึก (ถ้าบันทึกล้ม งานที่ยังไม่บันทึกจะถูกรวมแบบ C5 ไม่ถูกทับ)
        if (this._pendingRemote) {
          const pending = this._pendingRemote
          this._pendingRemote = null
          this._applyRemoteLayout(pending)
        }
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
                         oldSnap?.bookedBy?.uid
        if (!tenantId) continue // ไม่ทราบผู้เช่า ไม่ส่งแจ้งเตือน (เลิก fallback ไปบัญชี demo — C3)

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
          const tenantId = delStall.bookedBy?.tenantId || delStall.bookedBy?.uid
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
