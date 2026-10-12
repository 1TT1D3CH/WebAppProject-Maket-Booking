import assert from 'node:assert/strict'
import { test } from 'node:test'
import { diffFields, summarizeChange } from '../src/utils/auditDiff.js'

test('diffFields คืนเฉพาะฟิลด์ที่เปลี่ยน', () => {
  const r = diffFields({ status: 'pending', price: 500, x: 1 }, { status: 'approved', price: 500, x: 1 }, ['status', 'price'])
  assert.deepEqual(r, { before: { status: 'pending' }, after: { status: 'approved' } })
})

test('diffFields: ไม่เปลี่ยนเลย / ฟิลด์ที่เพิ่ม / ฟิลด์ที่ลบ', () => {
  assert.deepEqual(diffFields({ a: 1 }, { a: 1 }, ['a']), { before: {}, after: {} })
  assert.deepEqual(diffFields({}, { a: 1 }, ['a']), { before: {}, after: { a: 1 } })
  assert.deepEqual(diffFields({ a: 1 }, {}, ['a']), { before: { a: 1 }, after: {} })
  assert.deepEqual(diffFields(null, null, ['a']), { before: {}, after: {} })
})

test('diffFields ไม่นับ null กับ undefined ว่าต่างกัน และเทียบ object ตามค่า', () => {
  assert.deepEqual(diffFields({ a: null }, {}, ['a']), { before: {}, after: {} })
  assert.deepEqual(diffFields({ o: { k: 1 } }, { o: { k: 1 } }, ['o']), { before: {}, after: {} })
})

test('summarizeChange', () => {
  assert.equal(summarizeChange({ status: 'pending' }, { status: 'approved' }), 'status: pending → approved')
  assert.equal(summarizeChange({}, { role: 'admin' }), 'role: admin')
  assert.equal(summarizeChange({ r: 1 }, {}), 'r: 1 → (ลบ)')
})
