import { defineStore } from 'pinia'
import { subscribeMyBookings, resubmitSlip, cancelMyBooking } from '../services/firebaseService'
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
    unsub: null
  }),

  getters: {
    needsSlipCount: (s) => s.items.filter(b => b.status === 'needs_slip').length
  },

  actions: {
    start(uid) {
      this.stop()
      if (!uid) return
      this.unsub = subscribeMyBookings(uid, (rows) => {
        this.items = rows
        this.loaded = true
        this.error = ''
      }, (err) => {
        console.error('My bookings listener error:', err)
        this.error = describeError(err)
      })
    },

    stop() {
      if (this.unsub) this.unsub()
      this.unsub = null
      this.items = []
      this.loaded = false
      this.error = ''
    },

    loadSlip: (bookingId) => getSlip(bookingId),
    resubmit: (booking, slip, tenantId) => resubmitSlip({ bookingId: booking.id, tenantId, slip }),
    cancel: (booking) => cancelMyBooking(booking.id)
  }
})
