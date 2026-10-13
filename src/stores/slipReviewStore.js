import { defineStore } from 'pinia'
import {
  subscribeBookingsByStatus, decideBooking, findBookingsWithSameSlip, deleteDecidedBookings,
  decideCancellation, recordRefund, getRefundAccount, expireBookings, purgeExpiredSlips
} from '../services/firebaseService'
import { useAuthStore } from './authStore'
import { useSlotStore } from './slotStore'
import { isHoldExpired } from '../utils/holdTimer'
import { serverNow } from '../utils/serverClock'
import { getSlip, deleteSlip } from '../services/slipStorage'

function describeError(err) {
  if (err?.code === 'permission-denied') return 'ไม่มีสิทธิ์ดูรายการนี้ (ต้องเป็น admin หรือ owner)'
  if (err?.code === 'failed-precondition') return 'ฐานข้อมูลยังสร้างดัชนี (index) ไม่เสร็จ กรุณารอสักครู่แล้วรีเฟรช'
  if (err?.code === 'unavailable') return 'เชื่อมต่อฐานข้อมูลไม่ได้ ตรวจสอบอินเทอร์เน็ต'
  return err?.message || 'โหลดรายการไม่สำเร็จ'
}

let slipSweepTimer = null

export const useSlipReviewStore = defineStore('slipReview', {
  state: () => ({
    pending: [],
    needsSlip: [],
    decided: [],
    awaiting: [], // กันแผงรอสลิป
    cancelReq: [], // ผู้เช่าขอยกเลิก
    cancelled: [], // ยกเลิกแล้ว (ใช้หารายการรอคืนเงิน)
    loaded: { pending: false, needsSlip: false, decided: false, awaiting: false, cancelReq: false, cancelled: false },
    error: '',
    selectedId: null,
    slipCache: {}, // bookingId -> { dataUrl, mime } | null (ไม่มีรูป)
    unsubs: []
  }),

  getters: {
    pendingCount: (s) => s.pending.length,
    // รายการที่รอผู้ดูแลลงมือ: ตรวจสลิป + คำขอยกเลิก + รอคืนเงิน (ป้ายแจ้งบนเมนู)
    refundPending: (s) => s.cancelled.filter(b => b.refund?.status === 'pending'),
    actionCount() { return this.pending.length + this.cancelReq.length + this.refundPending.length },
    isLoading: (s) => !(s.loaded.pending && s.loaded.needsSlip && s.loaded.decided),
    // รายการที่ปฏิเสธแล้ว (ลบออกจากรายการได้)
    rejectedList: (s) => s.decided.filter(b => b.status === 'rejected'),
    byId: (s) => (id) => [...s.pending, ...s.needsSlip, ...s.decided, ...s.awaiting, ...s.cancelReq, ...s.cancelled].find(b => b.id === id) || null
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
        if (key === 'awaiting' || key === 'needsSlip') this.sweepExpired(rows)
      }, onError)
      this.unsubs = [
        listen('pending', ['pending'], { order: 'asc' }),
        listen('needsSlip', ['needs_slip'], { order: 'asc' }),
        listen('decided', ['approved', 'rejected'], { order: 'desc', max: 50 }),
        listen('awaiting', ['awaiting_slip'], { order: 'asc' }),
        listen('cancelReq', ['cancel_requested'], { order: 'asc' }),
        listen('cancelled', ['cancelled'], { order: 'desc', max: 100 })
      ]
      // ลบรูปสลิปที่อนุมัติแล้วเกิน 1 วัน: กวาดตอนเปิดหน้านี้ แล้วทุก 30 นาที
      this.sweepSlips()
      slipSweepTimer = setInterval(() => this.sweepSlips(), 30 * 60 * 1000)
    },

    /** ลบรูปสลิปของรายการที่อนุมัติแล้วทันที */
    async deleteSlipNow(bookingId) {
      await deleteSlip(bookingId)
      delete this.slipCache[this.slipKey(bookingId)]
    },

    async sweepSlips() {
      try {
        const n = await purgeExpiredSlips()
        if (n) this.slipCache = {}
      } catch (err) {
        console.warn('Purge slips notice:', err?.message)
      }
    },

    stop() {
      clearInterval(slipSweepTimer)
      this.unsubs.forEach(fn => fn())
      this.unsubs = []
      this.pending = []
      this.needsSlip = []
      this.decided = []
      this.awaiting = []
      this.cancelReq = []
      this.cancelled = []
      this.loaded = { pending: false, needsSlip: false, decided: false, awaiting: false, cancelReq: false, cancelled: false }
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

    async decide(booking, decision, reason, actor) {
      await decideBooking({ bookingId: booking.id, decision, reason, actor, resubmitHours: useSlotStore().settings.resubmitHours })
    },

    /** ตั้งสถานะ "หมดเวลา" ให้รายการที่หมดเวลากันแผงแล้ว (ทีละไม่เกิน 20 รายการ) */
    async sweepExpired(rows) {
      const actor = useAuthStore().auditActor
      const now = serverNow()
      const due = rows.filter(b => isHoldExpired(b, now))
      if (!due.length || !actor?.uid) return
      try {
        await expireBookings(due, actor)
      } catch (err) {
        console.warn('Sweep expired notice:', err?.message)
      }
    },

    /** อนุมัติ / ไม่อนุมัติ คำขอยกเลิก หรือผู้ดูแลยกเลิกเอง (mode: approve | deny | direct) */
    decideCancel(booking, mode, opts, actor) {
      return decideCancellation({ bookingId: booking.id, mode, policy: useSlotStore().settings.cancelPolicy, actor, ...opts })
    },

    recordRefund(booking, opts, actor) {
      return recordRefund({ bookingId: booking.id, actor, ...opts })
    },

    loadRefundAccount: (bookingId) => getRefundAccount(bookingId),

    /** ลบรายการที่ปฏิเสธ/ยกเลิกแล้ว คืนจำนวนที่ลบ */
    async removeDecided(bookings, actor) {
      const n = await deleteDecidedBookings(bookings, actor)
      for (const b of bookings) delete this.slipCache[this.slipKey(b.id)]
      if (bookings.some(b => b.id === this.selectedId)) this.selectedId = null
      return n
    }
  }
})
