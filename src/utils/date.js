// ฟังก์ชันวันที่ทั้งหมดของแอป ยึดเขตเวลาไทย (Asia/Bangkok) เสมอ ไม่ขึ้นกับเขตเวลาของเครื่องผู้ใช้
//
// "dateKey" คือวันที่ตามปฏิทินไทยในรูป 'yyyy-mm-dd' ใช้เก็บและเปรียบเทียบวันที่
// ห้ามใช้ new Date('yyyy-mm-dd') เพราะจะได้เที่ยงคืนตามเวลา UTC (= 07:00 เวลาไทย)
// และเมื่อแสดงผลบนเครื่องที่อยู่เขตเวลาอื่น วันจะเลื่อนไปหนึ่งวัน

export const TIME_ZONE = 'Asia/Bangkok'
// ประเทศไทยไม่มี daylight saving จึงใช้ offset คงที่ได้
const BANGKOK_OFFSET = '+07:00'

const DATE_KEY_RE = /^(\d{4})-(\d{2})-(\d{2})$/

const THAI_WEEKDAYS = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
const THAI_MONTHS = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
]

// en-CA ให้ผลเป็น yyyy-mm-dd
const dateKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

const timeFormatter = new Intl.DateTimeFormat('th-TH', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

export function isDateKey(value) {
  if (typeof value !== 'string') return false
  const m = DATE_KEY_RE.exec(value)
  if (!m) return false
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const utc = new Date(Date.UTC(y, mo - 1, d))
  return utc.getUTCFullYear() === y && utc.getUTCMonth() === mo - 1 && utc.getUTCDate() === d
}

function parseKey(key) {
  if (!isDateKey(key)) throw new RangeError(`วันที่ไม่ถูกต้อง: ${key}`)
  const [y, m, d] = key.split('-').map(Number)
  return { y, m, d }
}

function toDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) throw new RangeError(`วันที่ไม่ถูกต้อง: ${value}`)
  return date
}

/** วันที่ตามเวลาไทยของช่วงเวลาที่ระบุ (Date, timestamp หรือ ISO string) -> 'yyyy-mm-dd' */
export function toDateKey(date) {
  const parts = Object.fromEntries(
    dateKeyFormatter.formatToParts(toDate(date)).map(p => [p.type, p.value])
  )
  return `${parts.year}-${parts.month}-${parts.day}`
}

/** วันนี้ตามเวลาไทย -> 'yyyy-mm-dd' */
export function todayBangkok(now = new Date()) {
  return toDateKey(now)
}

/** 'yyyy-mm-dd' -> Date ของเวลา 00:00 ตามเวลาไทยของวันนั้น */
export function fromDateKey(key) {
  parseKey(key)
  return new Date(`${key}T00:00:00${BANGKOK_OFFSET}`)
}

/** บวก/ลบวันตามปฏิทิน -> 'yyyy-mm-dd' */
export function addDays(key, n) {
  const { y, m, d } = parseKey(key)
  const utc = new Date(Date.UTC(y, m - 1, d + n))
  return utc.toISOString().slice(0, 10)
}

/** ระยะห่างเป็นจำนวนวัน (to - from) */
export function diffDays(fromKey, toKey) {
  const a = parseKey(fromKey)
  const b = parseKey(toKey)
  return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86400000)
}

/** 0 = อาทิตย์ ... 6 = เสาร์ */
export function dayOfWeek(key) {
  const { y, m, d } = parseKey(key)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

/** 'yyyy-mm-dd' -> "ส. 12 ต.ค. 2569" */
export function formatThaiDate(key) {
  const { y, m, d } = parseKey(key)
  return `${THAI_WEEKDAYS[dayOfWeek(key)]} ${d} ${THAI_MONTHS[m - 1]} ${y + 543}`
}

/** เวลาตามเวลาไทย -> "14:05" */
export function formatThaiTime(date) {
  return timeFormatter.format(toDate(date))
}

/**
 * วันที่และเวลาตามเวลาไทย -> "ส. 12 ต.ค. 2569 14:05"
 * ถ้าได้ค่าเป็น 'yyyy-mm-dd' (ไม่มีเวลา) จะแสดงแค่วันที่ ไม่แปลงผ่าน new Date()
 */
export function formatThaiDateTime(value) {
  if (isDateKey(value)) return formatThaiDate(value)
  const date = toDate(value)
  return `${formatThaiDate(toDateKey(date))} ${formatThaiTime(date)}`
}
