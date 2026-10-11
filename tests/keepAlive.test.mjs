import { test } from 'node:test'
import assert from 'node:assert/strict'
import { keepAlive, nextDelay } from '../src/utils/keepAlive.js'

test('nextDelay เพิ่มเป็นสองเท่าและไม่เกินเพดาน', () => {
  assert.equal(nextDelay(0), 2000)
  assert.equal(nextDelay(1), 4000)
  assert.equal(nextDelay(3), 16000)
  assert.equal(nextDelay(10), 30000)
})

test('listener ที่พังแล้วถูกเปิดใหม่เอง และหยุดเมื่อ unsubscribe', async () => {
  let opens = 0
  let closes = 0
  const stop = keepAlive(({ ok, fail }) => {
    opens++
    if (opens === 1) setTimeout(fail, 0)   // ครั้งแรกพัง
    else ok()                              // ครั้งต่อมาทำงานปกติ
    return () => { closes++ }
  }, { base: 5, max: 20 })

  await new Promise(r => setTimeout(r, 60))
  assert.equal(opens, 2)
  assert.equal(closes, 1) // ปิดตัวที่พังก่อนเปิดใหม่

  stop()
  assert.equal(closes, 2)
  await new Promise(r => setTimeout(r, 40))
  assert.equal(opens, 2)  // ไม่เปิดซ้ำหลังหยุด
})

test('fail ซ้ำหลายครั้งติดกันนับเป็นครั้งเดียว (ไม่นัดเปิดซ้อน)', async () => {
  let opens = 0
  const stop = keepAlive(({ fail }) => {
    opens++
    if (opens === 1) { fail(); fail(); fail() }
    return () => {}
  }, { base: 5, max: 20 })
  await new Promise(r => setTimeout(r, 40))
  stop()
  assert.equal(opens, 2)
})
