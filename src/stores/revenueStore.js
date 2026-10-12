import { defineStore } from 'pinia'
import { fetchBookingsForReport, logReportExport } from '../services/firebaseService'
import { computeRevenue, capacitySlots, previousRange } from '../utils/revenue'
import { buildReportSheets, countReportRows, reportFileName } from '../utils/reportSheets'
import { todayBangkok, addDays, diffDays, dayOfWeek } from '../utils/date'
import { useMarketStore } from './marketStore'
import { useSlotStore } from './slotStore'
import { useAuthStore } from './authStore'

const MAX_DAYS = 366

/** ช่วงวันที่ของตัวเลือกสำเร็จรูป */
export function presetRange(key, today = todayBangkok()) {
  if (key === 'today') return { from: today, to: today }
  if (key === 'week') {
    const dow = dayOfWeek(today) // 0 = อาทิตย์; สัปดาห์เริ่มวันจันทร์
    const from = addDays(today, -((dow + 6) % 7))
    return { from, to: addDays(from, 6) }
  }
  const [y, m] = today.split('-').map(Number)
  const monthRange = (yy, mm) => {
    const last = new Date(Date.UTC(yy, mm, 0)).getUTCDate()
    const p = (n) => String(n).padStart(2, '0')
    return { from: `${yy}-${p(mm)}-01`, to: `${yy}-${p(mm)}-${p(last)}` }
  }
  if (key === 'lastMonth') return m === 1 ? monthRange(y - 1, 12) : monthRange(y, m - 1)
  return monthRange(y, m) // thisMonth
}

export const useRevenueStore = defineStore('revenue', {
  state: () => ({
    preset: 'thisMonth',
    range: presetRange('thisMonth'),
    rawKey: '',
    raw: [], // การจองที่ดึงมา (ครอบคลุมช่วงปัจจุบัน + ช่วงก่อนหน้า) เก็บไว้ระหว่างสลับแท็บ
    loading: false,
    error: '',
    loadedAt: null,
    exporting: false
  }),

  getters: {
    previous: (s) => previousRange(s.range),
    ctx() {
      const market = useMarketStore()
      const stalls = {}
      for (const st of market.pub.stalls) {
        stalls[st.id] = { stallNo: st.stallNo, zoneName: market.pubZoneById(st.zoneId)?.name || 'ไม่ระบุโซน' }
      }
      return { stalls }
    },
    report() { return computeRevenue(this.raw, this.range, this.ctx) },
    prevReport() { return computeRevenue(this.raw, this.previous, this.ctx) },
    stallCount: () => useMarketStore().pub.stalls.filter(st => st.status !== 'disabled').length,
    utilization() {
      const cap = capacitySlots(useSlotStore().settings, this.range, this.stallCount)
      return cap ? Math.min(1, this.report.slotCount / cap) : null
    },
    rangeDays: (s) => diffDays(s.range.from, s.range.to) + 1
  },

  actions: {
    setPreset(key) {
      this.preset = key
      if (key !== 'custom') this.range = presetRange(key)
      return this.load()
    },

    setCustom(from, to) {
      if (!from || !to || from > to) { this.error = 'ช่วงวันที่ไม่ถูกต้อง'; return Promise.resolve() }
      if (diffDays(from, to) + 1 > MAX_DAYS) { this.error = `เลือกช่วงได้ไม่เกิน ${MAX_DAYS} วัน`; return Promise.resolve() }
      this.preset = 'custom'
      this.range = { from, to }
      return this.load()
    },

    /** อ่านครั้งเดียว (getDocs) ไม่ใช่ realtime; force = ปุ่มรีเฟรช */
    async load(force = false) {
      const key = `${this.previous.from}|${this.range.to}`
      if (!force && key === this.rawKey && this.raw.length) return
      this.loading = true
      this.error = ''
      try {
        this.raw = await fetchBookingsForReport(this.previous.from, this.range.to)
        this.rawKey = key
        this.loadedAt = new Date()
      } catch (err) {
        console.error('Load revenue report error:', err)
        this.error = err?.code === 'permission-denied' ? 'ไม่มีสิทธิ์ดูรายงาน (ต้องเป็นผู้ดูแล/เจ้าของ)'
          : err?.code === 'failed-precondition' ? 'ฐานข้อมูลยังสร้างดัชนีไม่เสร็จ กรุณารอสักครู่แล้วกดรีเฟรช'
            : (err?.message || 'โหลดรายงานไม่สำเร็จ')
      } finally {
        this.loading = false
      }
    },

    sheets(includePhone = false) {
      const auth = useAuthStore()
      return buildReportSheets(this.report, {
        settings: useSlotStore().settings,
        marketName: useMarketStore().marketName,
        exportedBy: auth.auditActor?.name || '',
        exportedAt: new Date(),
        utilization: this.utilization,
        includePhone
      })
    },

    /** ส่งออกไฟล์ (xlsx | csv) แล้วบันทึก audit log report.export */
    async exportFile(format, includePhone = false) {
      this.exporting = true
      try {
        const sheets = this.sheets(includePhone)
        const marketName = useMarketStore().marketName
        const { downloadBytes, XLSX_MIME, CSV_MIME } = await import('../utils/download')
        if (format === 'xlsx') {
          // ตัวเขียน xlsx โหลดเฉพาะตอนกดส่งออก
          const { buildXlsx } = await import('../utils/xlsx')
          await downloadBytes(buildXlsx(sheets), reportFileName(marketName, this.range, 'xlsx'), XLSX_MIME)
        } else {
          const { toCsv } = await import('../utils/xlsx')
          // CSV ไม่มีหลาย sheet: ส่งออกเฉพาะรายการจอง
          await downloadBytes(new TextEncoder().encode(toCsv(sheets[2].rows)), reportFileName(marketName, this.range, 'csv'), CSV_MIME)
        }
        // log ไม่ควรทำให้การดาวน์โหลดที่สำเร็จแล้วดูเหมือนล้มเหลว
        logReportExport({
          actor: useAuthStore().auditActor, from: this.range.from, to: this.range.to,
          rowCount: countReportRows(sheets), format
        }).catch((err) => console.warn('Report export log notice:', err?.message))
      } finally {
        this.exporting = false
      }
    }
  }
})
