import { defineStore } from 'pinia'
import { subscribeBookingsByStatus, decideBooking, findBookingsWithSameSlip } from '../services/firebaseService'
import { getSlip } from '../services/slipStorage'

function describeError(err) {
  if (err?.code === 'permission-denied') return 'ไม่มีสิทธิ์ดูรายการนี้ (ต้องเป็น admin หรือ owner)'
  if (err?.code === 'failed-precondition') return 'ฐานข้อมูลยังสร้างดัชนี (index) ไม่เสร็จ กรุณารอสักครู่แล้วรีเฟรช'
  if (err?.code === 'unavailable') return 'เชื่อมต่อฐานข้อมูลไม่ได้ ตรวจสอบอินเทอร์เน็ต'
  return err?.message || 'โหลดรายการไม่สำเร็จ'
}

export const useSlipReviewStore = defineStore('slipReview', {
  state: () => ({
    pending: [],
    needsSlip: [],
    decided: [],
    loaded: { pending: false, needsSlip: false, decided: false },
    error: '',
    selectedId: null,
    slipCache: {}, // bookingId -> { dataUrl, mime } | null (ไม่มีรูป)
    unsubs: []
  }),

  getters: {
    pendingCount: (s) => s.pending.length,
    isLoading: (s) => !(s.loaded.pending && s.loaded.needsSlip && s.loaded.decided),
    byId: (s) => (id) => [...s.pending, ...s.needsSlip, ...s.decided].find(b => b.id === id) || null
  },

  actions: {
    start() {
      this.stop()
      this.error = ''
      const onError = (err) => {
        console.error('Slip review listener error:', err)
        this.error = describeError(err)
      }
      const listen = (key, statuses, opts) => subscribeBookingsByStatus(statuses, opts, (rows) => {
        this[key] = rows
        this.loaded[key] = true
        this.error = ''
      }, onError)
      this.unsubs = [
        listen('pending', ['pending'], { order: 'asc' }),
        listen('needsSlip', ['needs_slip'], { order: 'asc' }),
        listen('decided', ['approved', 'rejected'], { order: 'desc', max: 50 })
      ]
    },

    stop() {
      this.unsubs.forEach(fn => fn())
      this.unsubs = []
      this.pending = []
      this.needsSlip = []
      this.decided = []
      this.loaded = { pending: false, needsSlip: false, decided: false }
      this.selectedId = null
      this.slipCache = {}
    },

    /**
     * โหลดรูปสลิป (เก็บ cache) คืน null ถ้าไม่มีรูป; โยน error ถ้าอ่านไม่ได้
     * key ผูกกับเวลาที่ส่งสลิป: ผู้เช่าส่งสลิปใหม่แล้วจะโหลดรูปใหม่เอง ไม่ต้อง F5
     */
    async loadSlip(bookingId) {
      const key = this.slipKey(bookingId)
      if (key in this.slipCache) return this.slipCache[key]
      const slip = await getSlip(bookingId)
      // เก็บ cache ไม่เกิน 8 รูป (รูปละได้ถึง ~700 KB)
      const keys = Object.keys(this.slipCache)
      if (keys.length >= 8) delete this.slipCache[keys[0]]
      this.slipCache[key] = slip ? { dataUrl: slip.dataUrl, mime: slip.mime } : null
      return this.slipCache[key]
    },

    slipKey(bookingId) {
      const b = this.byId(bookingId)
      return `${bookingId}:${b?.slipUploadedAt?.toMillis?.() ?? 0}:${b?.slipHash ?? ''}`
    },

    prefetch(bookingId) {
      if (!bookingId || this.slipKey(bookingId) in this.slipCache) return
      this.loadSlip(bookingId).catch(() => {})
    },

    duplicatesOf(booking) {
      return findBookingsWithSameSlip(booking.slipHash, booking.id)
    },

    async decide(booking, decision, reason, adminUid) {
      await decideBooking({ bookingId: booking.id, decision, reason, adminUid })
    }
  }
})
