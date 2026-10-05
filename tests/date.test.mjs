// รัน: npm run test:unit
// ทุกกรณีรันซ้ำในหลายเขตเวลาของเครื่อง ผลต้องเหมือนกันเพราะ date.js ยึดเวลาไทยเสมอ
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  todayBangkok,
  toDateKey,
  fromDateKey,
  addDays,
  diffDays,
  dayOfWeek,
  formatThaiDate,
  formatThaiTime,
  formatThaiDateTime,
  isDateKey
} from '../src/utils/date.js'

const MACHINE_TIME_ZONES = ['Asia/Bangkok', 'UTC', 'America/New_York', 'Pacific/Kiritimati']
const cases = []
const tzTest = (name, fn) => cases.push([name, fn])

tzTest('todayBangkok: 23:30 เวลาไทยยังเป็นวันเดิม', () => {
  assert.equal(todayBangkok(new Date('2026-10-12T23:30:00+07:00')), '2026-10-12')
})

tzTest('todayBangkok: 00:30 เวลาไทยเป็นวันใหม่แล้ว แม้ UTC ยังเป็นเมื่อวาน', () => {
  const now = new Date('2026-10-13T00:30:00+07:00')
  assert.equal(now.toISOString().slice(0, 10), '2026-10-12') // UTC ยังเป็นวันที่ 12
  assert.equal(todayBangkok(now), '2026-10-13')
})

tzTest('toDateKey รับ ISO string และ timestamp', () => {
  assert.equal(toDateKey('2026-10-12T17:00:00Z'), '2026-10-13')
  assert.equal(toDateKey(Date.parse('2026-10-12T16:59:59Z')), '2026-10-12')
})

tzTest('fromDateKey คือ 00:00 เวลาไทย และแปลงกลับได้วันเดิม', () => {
  const date = fromDateKey('2026-10-12')
  assert.equal(date.toISOString(), '2026-10-11T17:00:00.000Z')
  assert.equal(toDateKey(date), '2026-10-12')
})

tzTest('addDays ข้ามเดือน ปี และปีอธิกสุรทิน', () => {
  assert.equal(addDays('2026-10-31', 1), '2026-11-01')
  assert.equal(addDays('2026-12-31', 1), '2027-01-01')
  assert.equal(addDays('2028-02-28', 1), '2028-02-29')
  assert.equal(addDays('2026-03-01', -1), '2026-02-28')
})

tzTest('diffDays', () => {
  assert.equal(diffDays('2026-10-12', '2026-11-11'), 30)
  assert.equal(diffDays('2026-10-12', '2026-10-10'), -2)
})

tzTest('dayOfWeek: 0 = อาทิตย์ ... 6 = เสาร์', () => {
  assert.equal(dayOfWeek('2026-10-10'), 6) // เสาร์
  assert.equal(dayOfWeek('2026-10-11'), 0) // อาทิตย์
  assert.equal(dayOfWeek('2026-10-12'), 1) // จันทร์
})

tzTest('formatThaiDate ใช้ปี พ.ศ. และชื่อย่อไทย', () => {
  assert.equal(formatThaiDate('2026-10-10'), 'ส. 10 ต.ค. 2569')
  assert.equal(formatThaiDate('2027-01-01'), 'ศ. 1 ม.ค. 2570')
})

tzTest('formatThaiTime และ formatThaiDateTime ใช้เวลาไทย', () => {
  assert.equal(formatThaiTime('2026-10-12T16:30:00Z'), '23:30')
  assert.equal(formatThaiDateTime('2026-10-12T17:30:00Z'), 'อ. 13 ต.ค. 2569 00:30')
})

tzTest('formatThaiDateTime กับค่าที่เป็นแค่วันที่ ไม่เลื่อนวัน', () => {
  assert.equal(formatThaiDateTime('2026-09-24'), 'พฤ. 24 ก.ย. 2569')
})

tzTest('isDateKey ตรวจวันที่ที่ไม่มีจริง', () => {
  assert.equal(isDateKey('2026-02-29'), false)
  assert.equal(isDateKey('2028-02-29'), true)
  assert.equal(isDateKey('2026-1-5'), false)
  assert.throws(() => addDays('2026-13-01', 1), RangeError)
})

for (const tz of MACHINE_TIME_ZONES) {
  for (const [name, fn] of cases) {
    test(`[${tz}] ${name}`, () => {
      process.env.TZ = tz // Node เปลี่ยนเขตเวลาของ process ได้ทันที (ใช้ได้บน Windows ด้วย)
      fn()
    })
  }
}
