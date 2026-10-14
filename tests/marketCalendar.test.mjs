import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  normalizeSettings, getRounds, slotKey, parseSlotKey, isMarketOpen, openDatesFrom,
  canBookSlot, formatSlotLabel, formatSlotsSummary
} from '../src/utils/marketCalendar.js'

// เวลาทุกค่าระบุเป็น UTC ชัดเจน (ผลต้องไม่ขึ้นกับ TZ ของเครื่อง) ไทย = UTC+7
const at = (iso) => new Date(iso)

test('slotKey / parseSlotKey', () => {
  assert.equal(slotKey('2026-10-17'), '2026-10-17_all')
  assert.equal(slotKey('2026-10-17', 'morning'), '2026-10-17_morning')
  assert.deepEqual(parseSlotKey('2026-10-17_morning'), { date: '2026-10-17', roundId: 'morning' })
  assert.equal(parseSlotKey('2026-13-01_all'), null)
  assert.equal(parseSlotKey('2026-10-17'), null)
  assert.equal(parseSlotKey('2026-10-17_Bad Id'), null)
})

test('normalizeSettings: ค่าว่าง/ผิดชนิดได้ค่าเริ่มต้นที่ใช้ได้', () => {
  const s = normalizeSettings(undefined)
  assert.equal(s.openWeekdays.length, 7)
  assert.equal(s.maxAdvanceDays, 365)
  assert.equal(s.maxSlotsPerBooking, 7) // ค่าเริ่มต้นยังเป็น 7 (admin ปรับเพิ่มได้ถึง 365)
  const t = normalizeSettings({ maxSlotsPerBooking: 9999, maxAdvanceDays: -5, closedDates: ['2026-02-30', '2026-10-20', '2026-10-20'], bookingCutoffTime: '25:00' })
  assert.equal(t.maxSlotsPerBooking, 365)
  assert.equal(t.maxAdvanceDays, 1)
  assert.deepEqual(t.closedDates, ['2026-10-20'])
  assert.equal(t.bookingCutoffTime, '')
})

test('getRounds: ไม่ตั้งรอบ = รอบเดียว all และจำกัดไม่เกิน 6 รอบ', () => {
  assert.deepEqual(getRounds({}).map(r => r.id), ['all'])
  const many = Array.from({ length: 9 }, (_, i) => ({ id: `r${i}`, label: `รอบ ${i}` }))
  assert.equal(getRounds({ rounds: many }).length, 6)
})

test('isMarketOpen: วันปิดพิเศษชนะ วันเปิดพิเศษชนะวันในสัปดาห์', () => {
  // 2026-10-17 เป็นวันเสาร์ (6), 2026-10-18 อาทิตย์ (0)
  const s = { openWeekdays: [6], closedDates: ['2026-10-24'], extraOpenDates: ['2026-10-18', '2026-10-24'] }
  assert.equal(isMarketOpen(s, '2026-10-17'), true)
  assert.equal(isMarketOpen(s, '2026-10-18'), true)
  assert.equal(isMarketOpen(s, '2026-10-19'), false)
  assert.equal(isMarketOpen(s, '2026-10-24'), false)
})

test('openDatesFrom', () => {
  assert.deepEqual(openDatesFrom({ openWeekdays: [6] }, '2026-10-12', 14), ['2026-10-17', '2026-10-24'])
})

test('canBookSlot: วันที่ผ่านมา / ปิดตลาด / ล่วงหน้าเกิน', () => {
  const s = { openWeekdays: [6], maxAdvanceDays: 10 }
  const now = at('2026-10-12T03:00:00Z') // 10:00 ไทย วันจันทร์
  assert.deepEqual(canBookSlot(s, '2026-10-17_all', now), { ok: true })
  assert.equal(canBookSlot(s, '2026-10-10_all', now).reason, 'วันที่ผ่านมาแล้ว')
  assert.equal(canBookSlot(s, '2026-10-14_all', now).reason, 'ตลาดไม่เปิดวันนี้')
  assert.equal(canBookSlot(s, '2026-10-31_all', now).reason, 'จองล่วงหน้าได้ไม่เกิน 10 วัน')
  assert.equal(canBookSlot(s, '2026-10-17_morning', now).reason, 'ไม่มีรอบนี้ในตลาดแล้ว')
})

test('canBookSlot: เส้นแบ่งวันตามเวลาไทย (23:30 / 00:30 ไทย)', () => {
  const s = { openWeekdays: [0, 1, 2, 3, 4, 5, 6] }
  // 2026-10-12T16:30Z = 23:30 ไทยวันที่ 12 -> วันนี้ยังเป็น 12
  const lateNight = at('2026-10-12T16:30:00Z')
  assert.equal(canBookSlot(s, '2026-10-12_all', lateNight).ok, true)
  // 2026-10-12T17:30Z = 00:30 ไทยวันที่ 13 -> วันที่ 12 ผ่านไปแล้ว
  const afterMidnight = at('2026-10-12T17:30:00Z')
  assert.equal(canBookSlot(s, '2026-10-12_all', afterMidnight).reason, 'วันที่ผ่านมาแล้ว')
  assert.equal(canBookSlot(s, '2026-10-13_all', afterMidnight).ok, true)
})

test('canBookSlot: เวลาปิดรับจอง 20:00 ของวันก่อนวันขาย (เวลาไทย)', () => {
  const s = { bookingCutoffTime: '20:00' }
  // ขายวันที่ 17 -> ปิดรับ 16 ต.ค. 20:00 ไทย = 13:00Z
  assert.equal(canBookSlot(s, '2026-10-17_all', at('2026-10-16T12:59:00Z')).ok, true)
  assert.equal(canBookSlot(s, '2026-10-17_all', at('2026-10-16T13:01:00Z')).reason, 'ปิดรับจองรอบนี้แล้ว')
  // ตั้งเวลาปิดรับแล้ว จองวันเดียวกับวันขายไม่ได้
  assert.equal(canBookSlot(s, '2026-10-12_all', at('2026-10-12T03:00:00Z')).reason, 'ปิดรับจองรอบนี้แล้ว')
})

test('canBookSlot: ไม่ตั้ง cutoff แต่รอบวันนี้สิ้นสุดแล้ว', () => {
  const s = { rounds: [{ id: 'morning', label: 'เช้า', start: '06:00', end: '12:00' }, { id: 'evening', label: 'เย็น', start: '16:00', end: '22:00' }] }
  const noon = at('2026-10-12T05:30:00Z') // 12:30 ไทย
  assert.equal(canBookSlot(s, '2026-10-12_morning', noon).reason, 'ปิดรับจองรอบนี้แล้ว')
  assert.equal(canBookSlot(s, '2026-10-12_evening', noon).ok, true)
})

test('formatSlotLabel / formatSlotsSummary', () => {
  assert.equal(formatSlotLabel({}, '2026-10-17_all'), 'ส. 17 ต.ค. 2569')
  const s = { rounds: [{ id: 'morning', label: 'รอบเช้า' }, { id: 'evening', label: 'รอบเย็น' }] }
  assert.equal(formatSlotLabel(s, '2026-10-17_morning'), 'ส. 17 ต.ค. 2569 · รอบเช้า')
  assert.equal(formatSlotsSummary({}, ['2026-10-18_all', '2026-10-17_all']), '17 ต.ค., 18 ต.ค. 2569')
  assert.equal(formatSlotsSummary(s, ['2026-10-17_morning', '2026-10-17_evening']), '17 ต.ค. (รอบเช้า), 17 ต.ค. (รอบเย็น) 2569')
  assert.equal(formatSlotsSummary({}, []), '-')
})
