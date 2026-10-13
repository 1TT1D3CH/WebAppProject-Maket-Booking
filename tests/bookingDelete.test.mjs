import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  canDeleteBooking, deleteConfirmCode, confirmCodeMatches, maskPhone, snapshotForAudit
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

test('maskPhone ปิดตรงกลาง', () => {
  assert.equal(maskPhone('0971238030'), '097***8030')
  assert.equal(maskPhone('097-123-8030'), '097***8030')
  assert.equal(maskPhone('123'), '***')
  assert.equal(maskPhone(''), '')
  assert.equal(maskPhone(null), '')
})

test('snapshotForAudit ไม่มีเบอร์เต็ม รูปสลิป หรือเลขบัญชี', () => {
  const s = snapshotForAudit({
    status: 'approved', stallNo: 'S-01', customerName: 'A', customerPhone: '0971238030', amountDue: 500,
    slots: ['a', 'b'], slipHash: 'x', dataUrl: 'data:...', refund: { status: 'refunded', amount: 100 }
  })
  assert.equal(s.phone, '097***8030')
  assert.equal(s.slotCount, 2)
  assert.equal(s.refund, 'refunded 100')
  assert.equal(JSON.stringify(s).includes('0971238030'), false)
  assert.equal('dataUrl' in s, false)
})
