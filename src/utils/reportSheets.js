// สร้างข้อมูลแต่ละ sheet ของรายงานรายได้ (แถวของเซลล์) แยกจากการเขียนไฟล์ เพื่อให้ตรวจใน unit test ได้
// เงินเป็นตัวเลขจริง { v, fmt: 'money' } วันที่เป็น { date } เบอร์โทรไม่ใส่เว้นแต่เลือก includePhone
import { formatSlotsSummary } from './marketCalendar.js'
import { toDateKey, formatThaiDate } from './date.js'

const money = (v) => ({ v: Math.round(Number(v || 0) * 100) / 100, fmt: 'money' })
const dateKeyOf = (t) => {
  const d = t?.toDate ? t.toDate() : t instanceof Date ? t : null
  return d ? toDateKey(d) : null
}
const dateCell = (t) => { const k = dateKeyOf(t); return k ? { date: k } : '' }
const STATUS_TH = {
  approved: 'อนุมัติแล้ว', cancel_requested: 'ขอยกเลิก', cancelled: 'ยกเลิกแล้ว', confirmed: 'ยืนยันแล้ว', pending: 'รอตรวจสลิป'
}
const METHOD_TH = { transfer: 'โอนเงิน', promptpay: 'PromptPay', cash: 'เงินสด' }

/**
 * @param report   ผลจาก computeRevenue
 * @param meta     { settings, marketName, exportedBy, exportedAt (Date), utilization (0-1|null), includePhone }
 * @returns {Array<{name, rows, header}>}
 */
export function buildReportSheets(report, meta) {
  const { settings, includePhone = false } = meta
  const roundLabel = (id) => (settings.rounds?.find(r => r.id === id)?.label) || (id === 'all' ? 'ทั้งวัน' : id)

  const summary = [
    ['รายงานรายได้', meta.marketName || ''],
    ['ช่วงวันที่', `${formatThaiDate(report.from)} ถึง ${formatThaiDate(report.to)}`],
    ['สร้างไฟล์เมื่อ', meta.exportedAt ? meta.exportedAt.toLocaleString('th-TH-u-ca-buddhist', { timeZone: 'Asia/Bangkok' }) : ''],
    ['ผู้ส่งออก', meta.exportedBy || ''],
    [],
    ['รายการ', 'ค่า'],
    ['รายได้รวม (บาท)', money(report.gross)],
    ['คืนเงิน (บาท)', money(report.refunds)],
    ['รายได้สุทธิ (บาท)', money(report.net)],
    ['จำนวนการจอง', report.bookingCount],
    ['จำนวนช่อง (วัน/รอบ) ที่ขายได้', report.slotCount],
    ['อัตราการใช้แผง (%)', meta.utilization === null || meta.utilization === undefined ? '-' : Math.round(meta.utilization * 1000) / 10],
    ['รอตรวจสลิป ยังไม่นับเป็นรายได้ (บาท)', money(report.pendingAmount)]
  ]
  if (report.estimated) summary.push([], ['หมายเหตุ', 'มีการจองแบบเดิมที่ไม่ระบุวัน นับตามวันที่อนุมัติ เป็นยอดประมาณการ'])

  // รายวัน: แยกรอบ + แถวคืนเงิน (รอบ "-") เรียงตามวัน
  const dailyRows = [['วันที่', 'รอบ', 'จำนวนช่องที่จอง', 'รายได้', 'คืนเงิน', 'สุทธิ']]
  const refundByDate = new Map(report.daily.filter(d => d.refund).map(d => [d.date, d.refund]))
  const dates = [...new Set([...report.byRoundDaily.map(r => r.date), ...refundByDate.keys()])].sort()
  for (const date of dates) {
    for (const r of report.byRoundDaily.filter(x => x.date === date)) {
      dailyRows.push([{ date }, roundLabel(r.roundId), r.slots, money(r.revenue), money(0), money(r.revenue)])
    }
    if (refundByDate.has(date)) dailyRows.push([{ date }, '-', 0, money(0), money(refundByDate.get(date)), money(-refundByDate.get(date))])
  }

  const bookingHeader = ['เลขการจอง', 'เลขใบเสร็จ', 'แผง', 'โซน', 'ชื่อร้าน', 'ผู้เช่า']
  if (includePhone) bookingHeader.push('เบอร์โทร')
  bookingHeader.push('วัน/รอบ', 'ยอดในช่วงนี้', 'สถานะ', 'วันอนุมัติ', 'ผู้อนุมัติ (uid)')
  const bookingRows = [bookingHeader]
  for (const row of report.rows) {
    const b = row.booking
    const line = [b.id, b.receiptNo || '', row.stallNo, row.zoneName, b.shopName || '', b.customerName || '']
    if (includePhone) line.push(b.customerPhone || '')
    line.push(
      b.slots?.length ? formatSlotsSummary(settings, b.slots) : 'ไม่ระบุวัน',
      money(row.amount),
      STATUS_TH[b.status || 'confirmed'] || b.status,
      dateCell(b.decidedAt),
      b.decidedBy || ''
    )
    bookingRows.push(line)
  }

  const refundRows = [['เลขการจอง', 'ยอดจ่าย', 'ยอดคืน', 'วิธี', 'วันที่คืน', 'ผู้บันทึก (uid)', 'เหตุผล/หมายเหตุ']]
  for (const r of report.refundRows) {
    const rf = r.booking.refund || {}
    refundRows.push([
      r.booking.id, money(r.booking.amountDue), money(r.amount), METHOD_TH[rf.method] || '',
      rf.refundedDate ? { date: rf.refundedDate } : { date: r.date }, rf.refundedBy || '',
      [r.booking.statusReason, rf.adjustReason, rf.note].filter(Boolean).join(' · ')
    ])
  }

  return [
    { name: 'สรุป', rows: summary, widths: [38, 40] },
    { name: 'รายวัน', rows: dailyRows, header: true },
    { name: 'รายการจอง', rows: bookingRows, header: true },
    { name: 'คืนเงิน', rows: refundRows, header: true }
  ]
}

/** จำนวนแถวข้อมูลทั้งหมด (ไม่รวมหัวตาราง) ใช้ใน audit log */
export const countReportRows = (sheets) => sheets.slice(1).reduce((n, s) => n + Math.max(0, s.rows.length - 1), 0)

const asciiSlug = (name) => {
  const s = String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return s || 'market'
}

/** revenue-market-2569-10.xlsx (ทั้งเดือน) | revenue-market-20261001-20261031.xlsx (ช่วงอื่น) */
export function reportFileName(marketName, { from, to }, ext = 'xlsx') {
  const slug = asciiSlug(marketName)
  const sameMonth = from.slice(0, 7) === to.slice(0, 7)
  const lastDay = new Date(Date.UTC(Number(to.slice(0, 4)), Number(to.slice(5, 7)), 0)).getUTCDate()
  if (sameMonth && from.endsWith('-01') && Number(to.slice(8, 10)) === lastDay) {
    return `revenue-${slug}-${Number(from.slice(0, 4)) + 543}-${from.slice(5, 7)}.${ext}`
  }
  return `revenue-${slug}-${from.replaceAll('-', '')}-${to.replaceAll('-', '')}.${ext}`
}
