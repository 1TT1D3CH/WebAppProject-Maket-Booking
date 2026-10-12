import { defineStore } from 'pinia'
import {
  subscribeMyBookings, resubmitSlip, cancelMyBooking, submitHeldSlip, requestCancelBooking,
  withdrawCancelRequest, expireBookings, getRefundSlip
} from '../services/firebaseService'
import { useAuthStore } from './authStore'
import { isHoldExpired } from '../utils/holdTimer'
import { serverNow } from '../utils/serverClock'
import { getSlip } from '../services/slipStorage'

function describeError(err) {
  if (err?.code === 'permission-denied') return 'ไม่มีสิทธิ์ดูรายการจอง กรุณาเข้าสู่ระบบใหม่'
  if (err?.code === 'failed-precondition') return 'ฐานข้อมูลยังสร้างดัชนี (index) ไม่เสร็จ กรุณารอสักครู่แล้วรีเฟรช'
  if (err?.code === 'unavailable') return 'เชื่อมต่อฐานข้อมูลไม่ได้ ตรวจสอบอินเทอร์เน็ต'
  return err?.message || 'โหลดรายการจองไม่สำเร็จ'
}

export const useMyBookingsStore = defineStore('myBookings', {
  state: () => ({
    items: [],
    loaded: false,
    error: '',
    unsub: null,
    uid: '',
    pageSize: 50,
    sweptIds: {} // รายการที่เคยสั่งตั้งสถานะหมดเวลาแล้ว (กันยิงซ้ำ)
  }),

  getters: {
    needsSlipCount: (s) => s.items.filter(b => b.status === 'needs_slip' || b.status === 'awaiting_slip').length
  },

  actions: {
    start(uid, keepPageSize = false) {
      const size = keepPageSize ? this.pageSize : 50
      this.stop()
      this.pageSize = size
      if (!uid) return
      this.uid = uid
      this.unsub = subscribeMyBookings(uid, (rows) => {
        this.items = rows
        this.loaded = true
        this.error = ''
        this.sweepExpired()
      }, (err) => {
        console.error('My bookings listener error:', err)
        this.error = describeError(err)
      }, this.pageSize)
    },

    /** โหลดรายการเก่าเพิ่ม (ขยายขอบเขตของ query ทีละ 50) */
    loadMore() {
      this.pageSize += 50
      this.start(this.uid, true)
    },

    stop() {
      if (this.unsub) this.unsub()
      this.unsub = null
      this.sweptIds = {}
      this.pageSize = 50
      this.items = []
      this.loaded = false
      this.error = ''
    },

    /** ตั้งสถานะ "หมดเวลา" ให้รายการของตัวเองที่หมดเวลากันแผงแล้ว (ทีละไม่เกิน 20) */
    async sweepExpired() {
      const auth = useAuthStore()
      const now = serverNow()
      const due = this.items.filter(b => isHoldExpired(b, now) && !this.sweptIds[b.id])
      if (!due.length || !auth.auditActor?.uid) return
      due.forEach(b => { this.sweptIds[b.id] = true })
      try {
        await expireBookings(due, auth.auditActor)
      } catch (err) {
        console.warn('Sweep expired notice:', err?.message)
        due.forEach(b => { delete this.sweptIds[b.id] })
      }
    },

    paySlip: (booking, slip, tenantId) => submitHeldSlip({ bookingId: booking.id, tenantId, slip }),
    requestCancel: (booking, reason, account) => requestCancelBooking({ bookingId: booking.id, reason, account }),
    withdrawCancel: (booking) => withdrawCancelRequest({ bookingId: booking.id }),
    loadRefundSlip: (bookingId) => getRefundSlip(bookingId),
    loadSlip: (bookingId) => getSlip(bookingId),
    resubmit: (booking, slip, tenantId) => resubmitSlip({ bookingId: booking.id, tenantId, slip }),
    cancel: (booking) => cancelMyBooking(booking.id)
  }
})
