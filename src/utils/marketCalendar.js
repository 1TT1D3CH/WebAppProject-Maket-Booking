// ปฏิทินตลาด: วัน + รอบ = "slot" ที่จองได้ ใช้ได้ทั้งฝั่งหน้าเว็บและ unit test (ไม่พึ่ง Firebase)
// วันที่เป็น 'YYYY-MM-DD' เวลาไทยเสมอ slotKey = 'YYYY-MM-DD_roundId' เช่น '2026-10-17_all'
import { addDays, diffDays, dayOfWeek, isDateKey, todayBangkok, formatThaiDate } from './date.js'

export const DEFAULT_ROUND_ID = 'all'
export const MAX_SLOTS_LIMIT = 7 // เพดานของ rules (นับการอ่านเอกสารต่อคำสั่งเขียน)
export const MAX_ROUNDS = 6
const ROUND_ID_RE = /^[a-z0-9]{1,20}$/
const SLOT_KEY_RE = /^(\d{4}-\d{2}-\d{2})_([a-z0-9]{1,20})$/
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/
const BANGKOK_OFFSET_MS = 7 * 3600 * 1000

export const DEFAULT_SETTINGS = Object.freeze({
  openWeekdays: [0, 1, 2, 3, 4, 5, 6], // 0 = อาทิตย์
  closedDates: [],
  extraOpenDates: [],
  maxAdvanceDays: 30,
  bookingCutoffTime: '', // 'HH:MM' ของวันก่อนวันขาย ว่าง = ไม่จำกัด
  maxSlotsPerBooking: MAX_SLOTS_LIMIT,
  rounds: [] // ว่าง = วันละรอบเดียว (id 'all')
})

const clampInt = (v, min, max, fallback) => {
  const n = Math.trunc(Number(v))
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback
}

const uniqueDates = (list) => [...new Set((Array.isArray(list) ? list : []).filter(isDateKey))].sort()

/** รับค่าจาก Firestore (หรือ undefined) แล้วคืนค่าตั้งค่าที่ปลอดภัยเสมอ */
export function normalizeSettings(raw) {
  const s = raw && typeof raw === 'object' ? raw : {}
  const weekdays = Array.isArray(s.openWeekdays)
    ? [...new Set(s.openWeekdays.map(Number).filter(n => Number.isInteger(n) && n >= 0 && n <= 6))].sort()
    : null
  const rounds = (Array.isArray(s.rounds) ? s.rounds : [])
    .filter(r => r && ROUND_ID_RE.test(String(r.id)) && String(r.label || '').trim())
    .slice(0, MAX_ROUNDS)
    .map(r => ({
      id: String(r.id),
      label: String(r.label).trim().slice(0, 30),
      start: TIME_RE.test(r.start) ? r.start : '',
      end: TIME_RE.test(r.end) ? r.end : ''
    }))
  return {
    openWeekdays: weekdays ?? [...DEFAULT_SETTINGS.openWeekdays],
    closedDates: uniqueDates(s.closedDates),
    extraOpenDates: uniqueDates(s.extraOpenDates),
    maxAdvanceDays: clampInt(s.maxAdvanceDays, 1, 365, DEFAULT_SETTINGS.maxAdvanceDays),
    bookingCutoffTime: TIME_RE.test(s.bookingCutoffTime) ? s.bookingCutoffTime : '',
    maxSlotsPerBooking: clampInt(s.maxSlotsPerBooking, 1, MAX_SLOTS_LIMIT, MAX_SLOTS_LIMIT),
    rounds
  }
}

/** รอบทั้งหมดของตลาด (ไม่ได้ตั้งรอบ = รอบเดียว 'ทั้งวัน') */
export function getRounds(settings) {
  const rounds = normalizeSettings(settings).rounds
  return rounds.length ? rounds : [{ id: DEFAULT_ROUND_ID, label: 'ทั้งวัน', start: '', end: '' }]
}

export const slotKey = (date, roundId = DEFAULT_ROUND_ID) => `${date}_${roundId}`

export function parseSlotKey(key) {
  const m = SLOT_KEY_RE.exec(String(key))
  if (!m || !isDateKey(m[1])) return null
  return { date: m[1], roundId: m[2] }
}

/** ตลาดเปิดขายวันนี้ไหม: วันปิดพิเศษชนะทุกอย่าง, วันเปิดพิเศษชนะวันในสัปดาห์ */
export function isMarketOpen(settings, date) {
  const s = normalizeSettings(settings)
  if (s.closedDates.includes(date)) return false
  if (s.extraOpenDates.includes(date)) return true
  return s.openWeekdays.includes(dayOfWeek(date))
}

/** วันที่เปิดขายตั้งแต่ fromDate ภายใน days วัน (รวม fromDate) */
export function openDatesFrom(settings, fromDate, days) {
  const out = []
  for (let i = 0; i < days; i++) {
    const d = addDays(fromDate, i)
    if (isMarketOpen(settings, d)) out.push(d)
  }
  return out
}

function bangkokMinutes(now) {
  const t = new Date(now.getTime() + BANGKOK_OFFSET_MS)
  return t.getUTCHours() * 60 + t.getUTCMinutes()
}

const toMinutes = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5))

/**
 * จองช่องนี้ได้ไหมตามปฏิทินตลาด (ฝั่งหน้าเว็บ: rules ตรวจปฏิทินไม่ได้)
 * @returns {{ ok: boolean, reason?: string }}
 */
export function canBookSlot(settings, key, now = new Date()) {
  const s = normalizeSettings(settings)
  const parsed = parseSlotKey(key)
  if (!parsed) return { ok: false, reason: 'ช่องจองไม่ถูกต้อง' }
  const round = getRounds(s).find(r => r.id === parsed.roundId)
  if (!round) return { ok: false, reason: 'ไม่มีรอบนี้ในตลาดแล้ว' }

  const today = todayBangkok(now)
  if (parsed.date < today) return { ok: false, reason: 'วันที่ผ่านมาแล้ว' }
  if (!isMarketOpen(s, parsed.date)) return { ok: false, reason: 'ตลาดไม่เปิดวันนี้' }
  if (diffDays(today, parsed.date) > s.maxAdvanceDays) {
    return { ok: false, reason: `จองล่วงหน้าได้ไม่เกิน ${s.maxAdvanceDays} วัน` }
  }

  if (s.bookingCutoffTime) {
    // ปิดรับจองเวลา cutoff ของวันก่อนวันขาย
    const deadline = new Date(`${addDays(parsed.date, -1)}T${s.bookingCutoffTime}:00+07:00`)
    if (now.getTime() > deadline.getTime()) return { ok: false, reason: 'ปิดรับจองรอบนี้แล้ว' }
  } else if (parsed.date === today && round.end && bangkokMinutes(now) >= toMinutes(round.end)) {
    return { ok: false, reason: 'ปิดรับจองรอบนี้แล้ว' }
  }
  return { ok: true }
}

const roundLabel = (settings, roundId) => getRounds(settings).find(r => r.id === roundId)?.label || roundId

/** "ส. 17 ต.ค. 2569 · รอบเช้า" (รอบเดียว/ทั้งวันไม่ต่อท้ายรอบ) */
export function formatSlotLabel(settings, key) {
  const p = parseSlotKey(key)
  if (!p) return String(key)
  const multi = getRounds(settings).length > 1 || p.roundId !== DEFAULT_ROUND_ID
  return multi ? `${formatThaiDate(p.date)} · ${roundLabel(settings, p.roundId)}` : formatThaiDate(p.date)
}

/** สรุปหลาย slot เป็นข้อความสั้น เช่น "17 ต.ค., 18 ต.ค. 2569" หรือมีหลายรอบ "17 ต.ค. (เช้า)" */
export function formatSlotsSummary(settings, keys) {
  const order = getRounds(settings).map(r => r.id)
  const idx = (id) => { const i = order.indexOf(id); return i < 0 ? order.length : i }
  const parsed = (keys || []).map(parseSlotKey).filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date) || idx(a.roundId) - idx(b.roundId))
  if (!parsed.length) return '-'
  const multiRound = getRounds(settings).length > 1 || parsed.some(p => p.roundId !== DEFAULT_ROUND_ID)
  const parts = parsed.map((p) => {
    const [, d, month] = formatThaiDate(p.date).split(' ')
    return multiRound ? `${d} ${month} (${roundLabel(settings, p.roundId)})` : `${d} ${month}`
  })
  const year = formatThaiDate(parsed[parsed.length - 1].date).split(' ')[3]
  return `${parts.join(', ')} ${year}`
}
