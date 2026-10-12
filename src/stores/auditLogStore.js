import { defineStore } from 'pinia'
import { fetchAuditPage } from '../services/auditLog'

function describeError(err) {
  if (err?.code === 'permission-denied') return 'ไม่มีสิทธิ์ดูบันทึกการทำงาน (ต้องเป็น admin หรือ owner)'
  if (err?.code === 'failed-precondition') return 'ฐานข้อมูลยังสร้างดัชนี (index) ไม่เสร็จ กรุณารอสักครู่แล้วลองใหม่'
  if (err?.code === 'unavailable') return 'เชื่อมต่อฐานข้อมูลไม่ได้ ตรวจสอบอินเทอร์เน็ต'
  return err?.message || 'โหลดบันทึกการทำงานไม่สำเร็จ'
}

export const useAuditLogStore = defineStore('auditLog', {
  state: () => ({
    rows: [],
    cursor: null,
    done: false,
    loading: false,
    error: '',
    // กรองฝั่งเซิร์ฟเวอร์: from/to (YYYY-MM-DD), action, bookingId | กรองฝั่งหน้าเว็บ: actor, text
    filters: { from: '', to: '', action: '', bookingId: '', actor: '', text: '' }
  }),

  getters: {
    // กรองฝั่งหน้าเว็บ (คนทำ / ค้นหาเลขแผง-เลขการจอง) จากแถวที่โหลดมาแล้ว
    visible(state) {
      const actor = state.filters.actor.trim().toLowerCase()
      const text = state.filters.text.trim().toLowerCase()
      return state.rows.filter((r) => {
        if (actor && !String(r.actorName || '').toLowerCase().includes(actor)) return false
        if (text) {
          const hay = [r.targetId, r.bookingId, r.after?.stallNo, r.before?.stallNo, r.reason].join(' ').toLowerCase()
          if (!hay.includes(text)) return false
        }
        return true
      })
    }
  },

  actions: {
    serverQuery() {
      const f = this.filters
      return { bookingId: f.bookingId.trim(), action: f.action, from: f.from, to: f.to }
    },

    async load() {
      this.rows = []
      this.cursor = null
      this.done = false
      await this.loadMore()
    },

    async loadMore() {
      if (this.loading || this.done) return
      this.loading = true
      this.error = ''
      try {
        const page = await fetchAuditPage({ ...this.serverQuery(), cursor: this.cursor })
        this.rows = [...this.rows, ...page.rows]
        this.cursor = page.cursor
        this.done = page.done
      } catch (err) {
        console.error('Audit log load error:', err)
        this.error = describeError(err)
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.rows = []
      this.cursor = null
      this.done = false
      this.error = ''
    }
  }
})
