import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  buildMonthGrid, formatMonthTitle, formatLongThaiDate, shiftMonth, monthsBetween, daysInMonth, moveByKey
} from '../src/utils/calendarGrid.js'
import { canBookDate, canBookSlot, maxBookableDate, nextBookableDate, normalizeSettings } from '../src/utils/marketCalendar.js'

const at = (iso) => new Date(iso) // UTC ชัดเจน ไทย = UTC+7

test('ตาราง 6 แถว: เดือนที่ 1 ตรงวันอาทิตย์ / วันเสาร์', () => {
  // 1 มี.ค. 2569 = วันอาทิตย์ (ช่องแรก), 1 ส.ค. 2569 = วันเสาร์ (ช่องที่ 7)
  const mar = buildMonthGrid(2026, 3)
  assert.equal(mar.length, 42)
  assert.equal(mar[0], '2026-03-01')
  const aug = buildMonthGrid(2026, 8)
  assert.equal(aug.indexOf('2026-08-01'), 6)
  assert.equal(aug.filter(Boolean).length, 31)
})

test('กุมภาพันธ์ปีอธิกสุรทิน และปี พ.ศ.', () => {
  assert.equal(daysInMonth(2028, 2), 29)
  assert.equal(daysInMonth(2026, 2), 28)
  assert.equal(buildMonthGrid(2028, 2).filter(Boolean).length, 29)
  assert.equal(formatMonthTitle({ year: 2026, month: 10 }), 'ตุลาคม 2569')
  assert.equal(formatLongThaiDate('2026-10-17'), 'วันเสาร์ที่ 17 ตุลาคม 2569')
})

test('เลื่อนเดือนข้ามปี และรายการเดือนในช่วง 365 วัน', () => {
  assert.deepEqual(shiftMonth({ year: 2026, month: 12 }, 1), { year: 2027, month: 1 })
  assert.deepEqual(shiftMonth({ year: 2026, month: 1 }, -1), { year: 2025, month: 12 })
  const months = monthsBetween('2026-10-14', '2027-10-14')
  assert.equal(months.length, 13)
  assert.deepEqual(months[12], { year: 2027, month: 10 })
})

test('ลูกศรคีย์บอร์ด', () => {
  assert.equal(moveByKey('2026-10-31', 'ArrowRight'), '2026-11-01')
  assert.equal(moveByKey('2026-10-14', 'ArrowDown'), '2026-10-21')
  assert.equal(moveByKey('2026-10-14', 'Enter'), null)
})

test('ช่วงจอง 365 วัน: วันสุดท้าย = วันนี้ + 365, วันที่ 366 จองไม่ได้', () => {
  const s = {}
  assert.equal(normalizeSettings(s).maxAdvanceDays, 365)
  const now = at('2026-10-14T05:00:00Z')
  assert.equal(maxBookableDate(s, now), '2027-10-14')
  assert.equal(canBookDate(s, '2027-10-14', now).ok, true)
  const over = canBookDate(s, '2027-10-15', now)
  assert.equal(over.ok, false)
  assert.match(over.reason, /365 วัน/)
})

test('"วันนี้" ตามเวลาไทย: 23:30 และ 00:30 (UTC 16:30 / 17:30 ของวันก่อน)', () => {
  // 14 ต.ค. 23:30 ไทย = 14 ต.ค. 16:30Z -> วันนี้ยังเป็น 14, 15 ต.ค. 00:30 ไทย = 14 ต.ค. 17:30Z -> วันนี้เป็น 15
  assert.equal(maxBookableDate({}, at('2026-10-14T16:30:00Z')), '2027-10-14')
  assert.equal(maxBookableDate({}, at('2026-10-14T17:30:00Z')), '2027-10-15')
  assert.equal(canBookSlot({}, '2026-10-14_all', at('2026-10-14T17:30:00Z')).ok, false)
})

test('nextBookableDate ข้ามวันตลาดปิดและไม่ออกนอกช่วง', () => {
  const s = { openWeekdays: [6] } // เสาร์เท่านั้น
  const now = at('2026-10-14T05:00:00Z') // พ. 14 ต.ค.
  assert.equal(nextBookableDate(s, '2026-10-14', 1, now), '2026-10-17')
  assert.equal(nextBookableDate(s, '2026-10-17', -1, now), null)
  assert.equal(nextBookableDate(s, '2027-10-09', 1, now), null) // เสาร์สุดท้ายก่อนเกินกำหนด 14 ต.ค. 2570
})
