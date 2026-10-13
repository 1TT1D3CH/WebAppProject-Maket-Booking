import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  canDeleteBooking, deleteConfirmCode, confirmCodeMatches, snapshotForAudit
} from '../src/utils/bookingDelete.js'

test('canDeleteBooking: สถานะที่ลบได้/ไม่ได้', () => {
  for (const status of ['approved', 'rejected', 'cancelled', 'expired']) {
    assert.equal(canDeleteBooking({ status }, 'admin').ok, true, status)
  }
  for (const status of ['pending', 'needs_slip', 'awaiting_slip', 'cancel_requested']) {
    assert.equal(canDeleteBooking({ status }, 'admin').ok, false, status)
  }
})

test('canDeleteBooking: การจองเก่าที่ไม่มี status นับเป็น approved', () => {
  assert.equal(canDeleteBooking({}, 'admin').ok, true)
})

test('canDeleteBooking: ผู้เช่า/ไม่มีบทบาท ลบไม่ได้', () => {
  assert.equal(canDeleteBooking({ status: 'approved' }, 'tenant').ok, false)
  assert.equal(canDeleteBooking({ status: 'approved' }, null).ok, false)
  assert.equal(canDeleteBooking(null, 'admin').ok, false)
})

test('canDeleteBooking: ยอดรอคืนเงินลบไม่ได้ แต่คืนแล้ว/ไม่มียอดลบได้', () => {
  assert.equal(canDeleteBooking({ status: 'cancelled', refund: { status: 'pending' } }, 'owner').ok, false)
  assert.equal(canDeleteBooking({ status: 'cancelled', refund: { status: 'refunded' } }, 'admin').ok, true)
  assert.equal(canDeleteBooking({ status: 'cancelled', refund: { status: 'none' } }, 'admin').ok, true)
})

test('canDeleteBooking: มีใบเสร็จ admin ลบไม่ได้ owner ลบได้', () => {
  const b = { status: 'approved', receiptNo: 'R2569-0001' }
  const a = canDeleteBooking(b, 'admin')
  assert.equal(a.ok, false)
  assert.equal(a.ownerOnly, true)
  assert.equal(canDeleteBooking(b, 'owner').ok, true)
})

test('deleteConfirmCode / confirmCodeMatches', () => {
  assert.equal(deleteConfirmCode({ id: 'abcdef123', stallNo: 'S-01' }), 'S-01')
  assert.equal(deleteConfirmCode({ id: 'abcdef123' }), 'abcdef')
  assert.equal(confirmCodeMatches('  s-01 ', 'S-01'), true)
  assert.equal(confirmCodeMatches('S-02', 'S-01'), false)
  assert.equal(confirmCodeMatches('', ''), false)
})

test('snapshotForAudit เก็บแค่รหัสแผง ยอดเงิน สถานะ เวลา ไม่มีข้อมูลผู้เช่า', () => {
  const s = snapshotForAudit({
    status: 'approved', stallNo: 'S-01', customerName: 'สมชาย', customerPhone: '0971238030', goodsType: 'ผลไม้', amountDue: 500,
    slots: ['a', 'b'], slipHash: 'x', dataUrl: 'data:...', receiptNo: 'R1', refund: { status: 'refunded', amount: 100 },
    createdAt: { toDate: () => new Date('2026-10-13T01:00:00Z') }
  })
  assert.deepEqual(s, { stallCode: 'S-01', amount: 500, status: 'approved', createdAt: '2026-10-13T01:00:00.000Z' })
  const text = JSON.stringify(s)
  for (const leak of ['สมชาย', '0971238030', 'ผลไม้', 'data:', 'R1']) assert.equal(text.includes(leak), false, leak)
})

test('snapshotForAudit ทนข้อมูลไม่ครบ', () => {
  assert.deepEqual(snapshotForAudit({}), { stallCode: null, amount: null, status: 'approved', createdAt: null })
})
