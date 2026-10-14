// ตารางปฏิทินรายเดือน (ไม่พึ่ง Date ของเครื่อง: คำนวณจาก dateKey 'yyyy-mm-dd' ล้วน ๆ)
import { addDays, dayOfWeek, isDateKey } from './date.js'

export const THAI_MONTHS_FULL = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
]
export const THAI_WEEKDAYS_FULL = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
export const THAI_WEEKDAYS_SHORT = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

const pad = (n) => String(n).padStart(2, '0')

/** 'yyyy-mm-dd' -> { year, month } (month 1-12) */
export function monthOf(dateKey) {
  const [y, m] = dateKey.split('-').map(Number)
  return { year: y, month: m }
}

export const monthStart = (year, month) => `${year}-${pad(month)}-01`

/** เลื่อนเดือน (delta บวก/ลบ) -> { year, month } */
export function shiftMonth({ year, month }, delta) {
  const idx = year * 12 + (month - 1) + delta
  return { year: Math.floor(idx / 12), month: (idx % 12) + 1 }
}

/** เทียบเดือน: ลบ = a ก่อน b */
export const compareMonth = (a, b) => (a.year - b.year) * 12 + (a.month - b.month)

export function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

/** "ตุลาคม 2569" */
export const formatMonthTitle = ({ year, month }) => `${THAI_MONTHS_FULL[month - 1]} ${year + 543}`

/** "วันเสาร์ที่ 17 ตุลาคม 2569" สำหรับ aria-label */
export function formatLongThaiDate(dateKey) {
  const { year, month } = monthOf(dateKey)
  const d = Number(dateKey.slice(8, 10))
  return `วัน${THAI_WEEKDAYS_FULL[dayOfWeek(dateKey)]}ที่ ${d} ${THAI_MONTHS_FULL[month - 1]} ${year + 543}`
}

/**
 * ตาราง 6 แถว x 7 คอลัมน์ (42 ช่อง) เริ่มวันอาทิตย์ ช่องนอกเดือนเป็น null
 * สูงคงที่ 6 แถวเสมอ หน้าจะได้ไม่กระโดดตอนเปลี่ยนเดือน
 */
export function buildMonthGrid(year, month) {
  const first = monthStart(year, month)
  const lead = dayOfWeek(first)
  const total = daysInMonth(year, month)
  const cells = []
  for (let i = 0; i < 42; i++) {
    const day = i - lead + 1
    cells.push(day >= 1 && day <= total ? `${year}-${pad(month)}-${pad(day)}` : null)
  }
  return cells
}

/** เลื่อนวันตามปุ่มลูกศร: ซ้าย/ขวา = ±1 วัน, ขึ้น/ลง = ±7 วัน */
export function moveByKey(dateKey, key) {
  const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[key]
  return step === undefined || !isDateKey(dateKey) ? null : addDays(dateKey, step)
}

/** รายการเดือนที่อยู่ในช่วง min..max (รวมปลายทั้งสอง) สำหรับกริดเลือกเดือน */
export function monthsBetween(minDate, maxDate) {
  const out = []
  let cur = monthOf(minDate)
  const end = monthOf(maxDate)
  while (compareMonth(cur, end) <= 0) {
    out.push(cur)
    cur = shiftMonth(cur, 1)
  }
  return out
}
