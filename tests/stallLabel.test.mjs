import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { pickStallLabelMode, isTinyStall, FULL_LABEL_MIN_WIDTH, FULL_LABEL_MIN_HEIGHT } from '../src/utils/stallLabel.js'

describe('pickStallLabelMode', () => {
  test('แผงขนาดมาตรฐาน 2.5×2 ม. (100×80px) แสดงเต็ม', () => {
    assert.equal(pickStallLabelMode(100, 80), 'full')
  })
  test('แผงเล็กกว่าเกณฑ์ด้านใดด้านหนึ่งเหลือแค่ชื่อ', () => {
    assert.equal(pickStallLabelMode(80, 60), 'name')
    assert.equal(pickStallLabelMode(FULL_LABEL_MIN_WIDTH - 1, 200), 'name')
    assert.equal(pickStallLabelMode(200, FULL_LABEL_MIN_HEIGHT - 1), 'name')
  })
  test('พอดีเกณฑ์ขั้นต่ำถือว่าพอ', () => {
    assert.equal(pickStallLabelMode(FULL_LABEL_MIN_WIDTH, FULL_LABEL_MIN_HEIGHT), 'full')
  })
  test('แผงแคบมากย่อฟอนต์ชื่อ', () => {
    assert.equal(isTinyStall(40), true)
    assert.equal(isTinyStall(80), false)
  })
})
