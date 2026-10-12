// ทดสอบ firestore.rules ส่วน 3-6: หมดเวลากันแผง, ยกเลิก+คืนเงิน, เลขใบเสร็จ, รายงาน
// รัน: npm run test:rules  (ต้องมี firebase-tools และ Java)
import { readFileSync } from 'node:fs'
import { after, before, beforeEach, describe, test } from 'node:test'
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import {
  collection, deleteField, doc, getDoc, getDocs, query, setDoc, updateDoc, where, writeBatch, serverTimestamp, Timestamp
} from 'firebase/firestore'

let testEnv

before(async () => {
  testEnv = await initializeTestEnvironment({ projectId: 'demo-market-rules', firestore: { rules: readFileSync('firestore.rules', 'utf8') } })
})
after(async () => { await testEnv?.cleanup() })

const SLIP = 'data:image/webp;base64,UklGRg=='
const KEY = '2026-10-17_all'
const LK = `bookingLocks/s1_${KEY}`
const T = (minAgo) => Timestamp.fromMillis(Date.now() - minAgo * 60000)

beforeEach(async () => {
  await testEnv.clearFirestore()
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    await setDoc(doc(db, 'users/alice'), { role: 'tenant', displayName: 'Alice' })
    await setDoc(doc(db, 'users/bob'), { role: 'tenant', displayName: 'Bob' })
    await setDoc(doc(db, 'users/admin1'), { role: 'admin', displayName: 'Admin' })
    await setDoc(doc(db, 'users/owner1'), { role: 'owner', displayName: 'Owner' })
    await setDoc(doc(db, 'markets/main-layout'), { name: 'ตลาด', zones: [] })
    await setDoc(doc(db, 'markets/main-layout/stalls/s1'), { stallNo: 'A1', price: 500, status: 'available', bookedBy: null })
  })
})

const tenant = (uid = 'alice') => testEnv.authenticatedContext(uid, { firebase: { sign_in_provider: 'password' } }).firestore()
const ROLE_OF = { admin1: 'admin', owner1: 'owner' }
const addAudit = (w, db, uid, action, bookingId) => {
  const ref = doc(collection(db, 'auditLogs'))
  w.set(ref, { at: serverTimestamp(), actorUid: uid, actorName: uid, actorRole: ROLE_OF[uid] || 'tenant', action, targetType: 'booking', targetId: bookingId, bookingId })
  return ref.id
}

const lockData = (id, over = {}) => ({
  marketId: 'main-layout', stallId: 's1', date: '2026-10-17', roundId: 'all', slotKey: KEY, bookingId: id,
  status: 'approved', createdAt: T(200), ...over
})
const bookingData = (over = {}) => ({
  tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111', shopName: 'ร้านชา', goodsType: 'ชา',
  slots: [KEY], firstDate: '2026-10-17', lastDate: '2026-10-17', pricePerSlot: 500, totalAmount: 500, amountDue: 500,
  status: 'approved', createdAt: T(200), decidedBy: 'admin1', decidedAt: T(100), lastAuditId: 'old', slipHash: 'h', ...over
})

// ใส่ข้อมูลโดยไม่ผ่าน rules (booking + lock + สลิป)
async function seed(id, over = {}, lockOver = {}, { lock = true, slip = true } = {}) {
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    await setDoc(doc(db, `bookings/${id}`), bookingData(over))
    if (lock) await setDoc(doc(db, LK), lockData(id, lockOver))
    if (slip) await setDoc(doc(db, `bookingSlips/${id}`), { tenantId: over.tenantId || 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: T(150) })
  })
}

// อัปเดต booking พร้อม audit log ใน batch เดียว extra(batch, db) เพิ่มคำสั่งอื่นในคำสั่งเดียวกัน
const upd = (uid, id, patch, action, extra) => {
  const db = tenant(uid)
  const b = writeBatch(db)
  const aid = addAudit(b, db, uid, action, id)
  b.update(doc(db, `bookings/${id}`), { updatedAt: serverTimestamp(), lastAuditId: aid, ...patch })
  extra?.(b, db)
  return b.commit()
}

// จองใหม่ (awaiting_slip หรือ pending) ตามที่แอปทำ
const book = ({ uid = 'alice', id = 'nb1', status = 'awaiting_slip', hold = 30, bookingOver = {}, lockOver = {}, slip = status === 'pending' } = {}) => {
  const db = tenant(uid)
  const b = writeBatch(db)
  const aid = addAudit(b, db, uid, 'booking.create', id)
  const doc1 = {
    tenantId: uid, stallId: 's1', stallNo: 'A1', customerName: uid, customerPhone: '0811111111', shopName: 'ร้านชา', goodsType: 'ชา',
    slots: [KEY], firstDate: '2026-10-17', lastDate: '2026-10-17', pricePerSlot: 500, totalAmount: 500, amountDue: 500,
    createdAt: serverTimestamp(), status, lastAuditId: aid
  }
  if (status === 'awaiting_slip') { doc1.holdStartedAt = serverTimestamp(); doc1.holdMinutes = hold } else { doc1.slipHash = 'h'; doc1.slipUploadedAt = serverTimestamp() }
  b.set(doc(db, `bookings/${id}`), { ...doc1, ...bookingOver })
  const lock = { marketId: 'main-layout', stallId: 's1', date: '2026-10-17', roundId: 'all', slotKey: KEY, bookingId: id, status, createdAt: serverTimestamp() }
  if (status === 'awaiting_slip') { lock.holdStartedAt = serverTimestamp(); lock.holdMinutes = hold }
  b.set(doc(db, LK), { ...lock, ...lockOver })
  if (slip) b.set(doc(db, `bookingSlips/${id}`), { tenantId: uid, marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
  return b.commit()
}

const awaiting = (minAgo, over = {}) => ({ status: 'awaiting_slip', holdStartedAt: T(minAgo), holdMinutes: 30, slipHash: undefined, ...over })
const awaitingLock = (minAgo) => ({ status: 'awaiting_slip', holdStartedAt: T(minAgo), holdMinutes: 30 })
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined))
const seedAwaiting = (minAgo, id = 'ab1', uid = 'alice') =>
  seed(id, clean({ ...awaiting(minAgo), tenantId: uid }), awaitingLock(minAgo), { slip: false })

describe('หมดเวลากันแผง (ส่วน 3)', () => {
  test('จองแบบกันแผง (ไม่แนบสลิป) ผ่าน และเก็บเวลาจาก server', async () => {
    await assertSucceeds(book())
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const snap = await getDoc(doc(ctx.firestore(), 'bookings/nb1'))
      if (!snap.data().holdStartedAt) throw new Error('ไม่มี holdStartedAt')
    })
  })

  test('ปลอม holdMinutes = 9999 / 5 หรือเวลาเริ่มจากนาฬิกาเครื่อง ไม่ผ่าน', async () => {
    await assertFails(book({ hold: 9999 }))
    await assertFails(book({ hold: 5 }))
    await assertFails(book({ bookingOver: { holdStartedAt: T(-60) } }))
    await assertFails(book({ lockOver: { holdStartedAt: T(-60) } }))
  })

  test('holdMinutes ต้องตรงกับตั้งค่าตลาด (paymentHoldMinutes)', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'markets/main-layout'), { name: 'ตลาด', zones: [], settings: { paymentHoldMinutes: 45 } })
    })
    await assertFails(book({ hold: 30 }))
    await assertSucceeds(book({ hold: 45 }))
  })

  test('awaiting_slip ที่แนบสลิป/มีฟิลด์สลิปมาด้วย ไม่ผ่าน; pending แต่มี hold ไม่ผ่าน', async () => {
    await assertFails(book({ bookingOver: { slipHash: 'x' } }))
    await assertFails(book({ status: 'pending', bookingOver: { holdStartedAt: serverTimestamp(), holdMinutes: 30 } }))
    await assertSucceeds(book({ status: 'pending' }))
  })

  test('เส้นทางหนักสุด: กันแผง 7 ช่องในครั้งเดียว ไม่เกินเพดานการอ่านเอกสารของ rules และจองทับ 7 ช่องที่หมดเวลาแล้วได้', async () => {
    const days = ['17', '18', '19', '20', '21', '22', '23'].map(d => `2026-10-${d}_all`)
    const hold = (uid, id, slots) => {
      const db = tenant(uid)
      const b = writeBatch(db)
      const aid = addAudit(b, db, uid, 'booking.create', id)
      b.set(doc(db, `bookings/${id}`), {
        tenantId: uid, stallId: 's1', stallNo: 'A1', customerName: uid, customerPhone: '0811111111', shopName: 'ร้านชา', goodsType: 'ชา',
        slots, firstDate: slots[0].split('_')[0], lastDate: slots[slots.length - 1].split('_')[0],
        pricePerSlot: 500, totalAmount: 500 * slots.length, amountDue: 500 * slots.length,
        createdAt: serverTimestamp(), status: 'awaiting_slip', lastAuditId: aid, holdStartedAt: serverTimestamp(), holdMinutes: 30
      })
      for (const k of slots) {
        const [date, roundId] = k.split('_')
        b.set(doc(db, `bookingLocks/s1_${k}`), { marketId: 'main-layout', stallId: 's1', date, roundId, slotKey: k, bookingId: id, status: 'awaiting_slip', createdAt: serverTimestamp(), holdStartedAt: serverTimestamp(), holdMinutes: 30 })
      }
      return b.commit()
    }
    await assertSucceeds(hold('alice', 'h7', days))
    // ทำให้ทั้งหมดหมดเวลา (ย้อนเวลาเริ่ม 31 นาที) แล้วคนอื่นจองทับครบ 7 ช่อง
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await updateDoc(doc(db, 'bookings/h7'), { holdStartedAt: T(31) })
      for (const k of days) await updateDoc(doc(db, `bookingLocks/s1_${k}`), { holdStartedAt: T(31) })
    })
    await assertSucceeds(hold('bob', 'h7b', days))
  })

  test('จองทับแผงที่หมดเวลาแล้ว (31 นาที) ผ่าน', async () => {
    await seedAwaiting(31)
    await assertSucceeds(book({ uid: 'bob', id: 'bob1' }))
  })

  test('จองทับแผงที่ยังไม่หมดเวลา (5 นาที) ไม่ผ่าน', async () => {
    await seedAwaiting(5)
    await assertFails(book({ uid: 'bob', id: 'bob1' }))
    await assertFails(book({ uid: 'bob', id: 'bob1', status: 'pending' }))
  })

  test('จองทับ lock ที่ส่งสลิปแล้ว (pending) หรืออนุมัติแล้ว ไม่ผ่านแม้เวลาผ่านไปนาน', async () => {
    await seed('ob1', { status: 'pending', slipUploadedAt: T(500) }, { status: 'pending' })
    await assertFails(book({ uid: 'bob', id: 'bob1' }))
    await assertFails(book({ uid: 'bob', id: 'bob1', status: 'pending' }))
  })

  test('ส่งสลิปก่อนหมดเวลา ผ่าน (booking -> pending + lock -> pending + สลิป)', async () => {
    await seedAwaiting(5)
    await assertSucceeds(upd('alice', 'ab1', { status: 'pending', slipHash: 'h', slipUploadedAt: serverTimestamp() }, 'booking.slip_submit', (b, db) => {
      b.update(doc(db, LK), { status: 'pending' })
      b.set(doc(db, 'bookingSlips/ab1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    }))
  })

  test('ส่งสลิปหลังหมดเวลา ไม่ผ่าน', async () => {
    await seedAwaiting(31)
    await assertFails(upd('alice', 'ab1', { status: 'pending', slipHash: 'h', slipUploadedAt: serverTimestamp() }, 'booking.slip_submit', (b, db) => {
      b.update(doc(db, LK), { status: 'pending' })
      b.set(doc(db, 'bookingSlips/ab1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    }))
  })

  test('บัญชีอื่นส่งสลิปแทนไม่ได้', async () => {
    await seedAwaiting(5)
    await assertFails(upd('bob', 'ab1', { status: 'pending', slipHash: 'h', slipUploadedAt: serverTimestamp() }, 'booking.slip_submit', (b, db) => {
      b.set(doc(db, 'bookingSlips/ab1'), { tenantId: 'bob', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    }))
  })

  test('ตั้งสถานะหมดเวลา: เจ้าของ/admin ทำได้เมื่อหมดเวลาแล้ว และลบ lock ได้ ส่วนที่ยังไม่หมดเวลา/บัญชีอื่นทำไม่ได้', async () => {
    await seedAwaiting(31)
    await assertFails(upd('bob', 'ab1', { status: 'expired' }, 'booking.expire'))
    await assertSucceeds(upd('alice', 'ab1', { status: 'expired' }, 'booking.expire', (b, db) => b.delete(doc(db, LK))))
    await seedAwaiting(31, 'ab2')
    await assertSucceeds(upd('admin1', 'ab2', { status: 'expired' }, 'booking.expire'))
    await seedAwaiting(5, 'ab3')
    await assertFails(upd('alice', 'ab3', { status: 'expired' }, 'booking.expire'))
    await assertFails(upd('admin1', 'ab3', { status: 'expired' }, 'booking.expire'))
  })

  test('ลบ lock ที่ยังไม่หมดเวลาโดยอ้างว่าหมดเวลา ไม่ผ่าน', async () => {
    await seedAwaiting(5)
    await assertFails(upd('alice', 'ab1', { status: 'expired' }, 'booking.expire', (b, db) => b.delete(doc(db, LK))))
  })

  test('หลังหมดเวลาแล้ว แผงว่างให้คนอื่นจองต่อได้ และเจ้าของเดิมยังตั้งหมดเวลาให้รายการเก่าได้', async () => {
    await seedAwaiting(31)
    await assertSucceeds(book({ uid: 'bob', id: 'bob1', status: 'pending' }))
    // lock เป็นของ bob แล้ว: alice ตั้ง expired ได้แต่ต้องไม่ไปลบ lock ของ bob
    await assertSucceeds(upd('alice', 'ab1', { status: 'expired' }, 'booking.expire'))
  })

  test('admin ขอสลิปใหม่ของการจองรายวัน: ตั้งเวลาใหม่ (ตามตั้งค่า 24 ชม.) ปลอมเวลาไม่ผ่าน', async () => {
    await seed('pb1', { status: 'pending', slipUploadedAt: T(60) }, { status: 'pending' })
    await assertFails(upd('admin1', 'pb1', { status: 'needs_slip', statusReason: 'ยอดไม่ตรง', decidedBy: 'admin1', decidedAt: serverTimestamp(), holdStartedAt: serverTimestamp(), holdMinutes: 99999 }, 'booking.request_slip'))
    await assertSucceeds(upd('admin1', 'pb1', { status: 'needs_slip', statusReason: 'ยอดไม่ตรง', decidedBy: 'admin1', decidedAt: serverTimestamp(), holdStartedAt: serverTimestamp(), holdMinutes: 1440 }, 'booking.request_slip', (b, db) => {
      b.update(doc(db, LK), { status: 'needs_slip', holdStartedAt: serverTimestamp(), holdMinutes: 1440 })
    }))
  })

  test('ส่งสลิปใหม่หลังหมดเวลาของ needs_slip ไม่ผ่าน แต่ก่อนหมดเวลาผ่าน (พร้อม lock -> pending)', async () => {
    const hold = { status: 'needs_slip', statusReason: 'x', holdMinutes: 1440 }
    await seed('nb9', { ...hold, holdStartedAt: T(60) }, { status: 'needs_slip', holdStartedAt: T(60), holdMinutes: 1440 })
    const resub = (id) => upd('alice', id, { status: 'pending', statusReason: deleteField(), slipHash: 'n', slipUploadedAt: serverTimestamp() }, 'booking.slip_submit', (b, db) => {
      b.update(doc(db, LK), { status: 'pending' })
      b.set(doc(db, `bookingSlips/${id}`), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    })
    await assertSucceeds(resub('nb9'))
    await testEnv.clearFirestore()
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await setDoc(doc(db, 'users/alice'), { role: 'tenant' })
      await setDoc(doc(db, 'markets/main-layout/stalls/s1'), { stallNo: 'A1', price: 500, status: 'available', bookedBy: null })
    })
    await seed('nb9', { ...hold, holdStartedAt: T(1500) }, { status: 'needs_slip', holdStartedAt: T(1500), holdMinutes: 1440 })
    await assertFails(resub('nb9'))
  })

  test('ผู้เช่ายกเลิกการจองที่กันแผงรอสลิปได้ และปล่อย lock', async () => {
    await seedAwaiting(5)
    await assertSucceeds(upd('alice', 'ab1', { status: 'cancelled' }, 'booking.cancel_self', (b, db) => b.delete(doc(db, LK))))
  })

  test('ผู้เช่าแก้ holdStartedAt / holdMinutes ของตัวเองไม่ได้', async () => {
    await seedAwaiting(5)
    const db = tenant('alice')
    await assertFails(updateDoc(doc(db, 'bookings/ab1'), { holdMinutes: 9999 }))
    await assertFails(updateDoc(doc(db, 'bookings/ab1'), { holdStartedAt: serverTimestamp() }))
    await assertFails(updateDoc(doc(db, LK), { holdMinutes: 9999 }))
  })
})

describe('ยกเลิกและคืนเงิน (ส่วน 4)', () => {
  const reqCancel = (uid = 'alice', over = {}) => upd(uid, 'ap1', {
    status: 'cancel_requested', cancelRequest: { reason: 'ติดธุระ', requestedAt: serverTimestamp() }, ...over
  }, 'booking.cancel_request')

  const refund = (over = {}) => ({ status: 'pending', amount: 500, suggestedAmount: 500, policyText: 'คืนเต็ม', ...over })
  const approveCancel = (over = {}, extra) => upd('admin1', 'ap1', {
    status: 'cancelled', wasApproved: true, releasedSlots: [KEY], refund: refund(), decidedBy: 'admin1', decidedAt: serverTimestamp(), ...over
  }, 'booking.cancel_approve', extra)

  beforeEach(async () => { await seed('ap1') })

  test('ผู้เช่ายกเลิกการจองที่อนุมัติแล้วโดยตรงไม่ได้ ต้องขอยกเลิก', async () => {
    await assertFails(upd('alice', 'ap1', { status: 'cancelled' }, 'booking.cancel_self', (b, db) => b.delete(doc(db, LK))))
    await assertSucceeds(reqCancel())
  })

  test('ขอยกเลิกต้องมีเหตุผล และเวลาต้องเป็นเวลา server; บัญชีอื่นขอแทนไม่ได้', async () => {
    await assertFails(reqCancel('alice', { cancelRequest: { reason: '', requestedAt: serverTimestamp() } }))
    await assertFails(reqCancel('alice', { cancelRequest: { reason: 'x', requestedAt: T(0) } }))
    await assertFails(reqCancel('bob'))
  })

  test('ผู้เช่าตั้ง refund.status = refunded หรือแก้ยอดเองไม่ได้', async () => {
    await assertFails(reqCancel('alice', { refund: refund({ status: 'refunded' }) }))
    await assertFails(reqCancel('alice', { totalAmount: 1 }))
  })

  test('ขอยกเลิกแล้ว แผงยังเป็นของผู้เช่า (lock ยังอยู่) และถอนคำขอได้', async () => {
    await assertSucceeds(reqCancel())
    await assertFails(book({ uid: 'bob', id: 'bob1', status: 'pending' }))
    await assertSucceeds(upd('alice', 'ap1', { status: 'approved', cancelRequest: deleteField() }, 'booking.cancel_withdraw'))
  })

  test('admin อนุมัติคำขอยกเลิก + ปล่อย lock แล้วคนอื่นจองช่องนั้นได้', async () => {
    await reqCancel()
    await assertSucceeds(approveCancel({}, (b, db) => b.delete(doc(db, LK))))
    await assertSucceeds(book({ uid: 'bob', id: 'bob1', status: 'pending' }))
  })

  test('admin ยกเลิกยอดคืนเกินยอดจ่าย / ยอดต่างจากแนะนำโดยไม่ระบุเหตุผล ไม่ผ่าน', async () => {
    await reqCancel()
    await assertFails(approveCancel({ refund: refund({ amount: 501, suggestedAmount: 500 }) }))
    await assertFails(approveCancel({ refund: refund({ amount: 300, suggestedAmount: 500 }) }))
    await assertSucceeds(approveCancel({ refund: refund({ amount: 300, suggestedAmount: 500, adjustReason: 'หักค่าดำเนินการ' }) }))
  })

  test('ผู้เช่าอนุมัติการยกเลิกของตัวเองไม่ได้', async () => {
    await reqCancel()
    await assertFails(upd('alice', 'ap1', { status: 'cancelled', wasApproved: true, refund: refund(), decidedBy: 'alice', decidedAt: serverTimestamp() }, 'booking.cancel_approve'))
  })

  test('admin ไม่อนุมัติ ต้องมีเหตุผล และกลับเป็น approved', async () => {
    await reqCancel()
    const deny = (over = {}) => upd('admin1', 'ap1', { status: 'approved', cancelRequest: deleteField(), decidedBy: 'admin1', decidedAt: serverTimestamp(), ...over }, 'booking.cancel_deny')
    await assertFails(deny())
    await assertSucceeds(deny({ statusReason: 'ใกล้วันขายแล้ว' }))
  })

  test('admin ยกเลิกการจองที่อนุมัติแล้วเอง ต้องมีเหตุผล', async () => {
    const direct = (over = {}) => upd('admin1', 'ap1', {
      status: 'cancelled', wasApproved: true, releasedSlots: [KEY], refund: refund(), decidedBy: 'admin1', decidedAt: serverTimestamp(), ...over
    }, 'booking.cancel_admin', (b, db) => b.delete(doc(db, LK)))
    await assertFails(direct())
    await assertSucceeds(direct({ statusReason: 'ตลาดปิดฉุกเฉิน' }))
  })

  test('ยกเลิกโดยไม่มี audit log ไม่ผ่าน', async () => {
    await reqCancel()
    const db = tenant('admin1')
    await assertFails(updateDoc(doc(db, 'bookings/ap1'), { status: 'cancelled', wasApproved: true, refund: refund(), decidedBy: 'admin1', decidedAt: serverTimestamp(), updatedAt: serverTimestamp() }))
  })

  describe('บันทึกคืนเงิน', () => {
    const record = (uid = 'admin1', over = {}, extra) => upd(uid, 'ap1', {
      refund: { ...refund(), status: 'refunded', method: 'promptpay', refundedDate: '2026-10-13', refundedBy: uid, refundedAt: serverTimestamp(), ...over }
    }, 'refund.record', extra)

    beforeEach(async () => {
      await reqCancel()
      await approveCancel({}, (b, db) => b.delete(doc(db, LK)))
    })

    test('admin บันทึกคืนเงิน + สลิปคืนเงินได้', async () => {
      await assertSucceeds(record('admin1', {}, (b, db) => b.set(doc(db, 'refundSlips/ap1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })))
    })

    test('คืนเกินยอดจ่าย / วิธีไม่ถูกต้อง / ผู้เช่าบันทึกเอง ไม่ผ่าน', async () => {
      await assertFails(record('admin1', { amount: 501 }))
      await assertFails(record('admin1', { method: 'bitcoin' }))
      await assertFails(record('alice'))
    })

    test('คืนเงินแล้วบันทึกซ้ำไม่ได้', async () => {
      await assertSucceeds(record())
      await assertFails(record())
    })

    test('ผู้เช่าเห็นสลิปคืนเงินของตัวเอง คนอื่นดูไม่ได้', async () => {
      await assertSucceeds(record('admin1', {}, (b, db) => b.set(doc(db, 'refundSlips/ap1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })))
      await assertSucceeds(getDoc(doc(tenant('alice'), 'refundSlips/ap1')))
      await assertFails(getDoc(doc(tenant('bob'), 'refundSlips/ap1')))
    })

    test('ผู้เช่าเขียนสลิปคืนเงินเองไม่ได้', async () => {
      await assertFails(setDoc(doc(tenant('alice'), 'refundSlips/ap1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() }))
    })
  })

  describe('บัญชีรับเงินคืน', () => {
    const acct = { tenantId: 'alice', accountName: 'Alice A', bank: 'กสิกร', accountNo: '1234567890' }
    test('เจ้าของสร้างได้ตอนขอยกเลิก; คนอื่นอ่านไม่ได้; admin อ่านได้', async () => {
      await assertSucceeds(upd('alice', 'ap1', {
        status: 'cancel_requested', cancelRequest: { reason: 'ติดธุระ', requestedAt: serverTimestamp() }
      }, 'booking.cancel_request', (b, db) => b.set(doc(db, 'refundAccounts/ap1'), acct)))
      await assertFails(getDoc(doc(tenant('bob'), 'refundAccounts/ap1')))
      await assertSucceeds(getDoc(doc(tenant('alice'), 'refundAccounts/ap1')))
      await assertSucceeds(getDoc(doc(tenant('admin1'), 'refundAccounts/ap1')))
    })
    test('สร้างโดยไม่ได้ขอยกเลิกในคำสั่งเดียวกัน / ของคนอื่น ไม่ผ่าน', async () => {
      await assertFails(setDoc(doc(tenant('alice'), 'refundAccounts/ap1'), acct))
      await assertFails(setDoc(doc(tenant('bob'), 'refundAccounts/ap1'), { ...acct, tenantId: 'bob' }))
    })
  })
})

describe('เลขใบเสร็จ (ส่วน 5)', () => {
  const receipt = (year, seq, over = {}) => ({
    receiptNo: `R${year}-${String(seq).padStart(6, '0')}`, receiptSeq: seq, receiptYear: year, receiptIssuedAt: serverTimestamp(), ...over
  })
  const approve = (id, rcpt, counter, uid = 'admin1') => upd(uid, id, {
    status: 'approved', decidedBy: uid, decidedAt: serverTimestamp(), ...(rcpt || {})
  }, 'booking.approve', (b, db) => { if (counter) b.set(doc(db, 'counters/receipts_2569'), counter) })

  const pend = (id) => seed(id, { status: 'pending', slipUploadedAt: T(30) }, { status: 'pending' }, {})

  test('อนุมัติครั้งแรก: สร้างตัวนับ next=1 และได้เลข R2569-000001', async () => {
    await pend('p1')
    await assertSucceeds(approve('p1', receipt(2569, 1), { year: 2569, next: 1 }))
  })

  test('อนุมัติสองรายการติดกัน ได้เลขต่อกัน; ข้ามเลขหรือเลขซ้ำไม่ผ่าน', async () => {
    await pend('p1')
    await assertSucceeds(approve('p1', receipt(2569, 1), { year: 2569, next: 1 }))
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await setDoc(doc(db, 'bookings/p2'), bookingData({ status: 'pending', slipUploadedAt: T(30), stallId: 's1' }))
    })
    const bump = (n) => (b, db) => b.update(doc(db, 'counters/receipts_2569'), { next: n })
    const approveWith = (id, rcpt, counterFn) => {
      const db = tenant('admin1')
      const b = writeBatch(db)
      const aid = addAudit(b, db, 'admin1', 'booking.approve', id)
      b.update(doc(db, `bookings/${id}`), { status: 'approved', decidedBy: 'admin1', decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId: aid, ...rcpt })
      counterFn?.(b, db)
      return b.commit()
    }
    await assertFails(approveWith('p2', receipt(2569, 3), bump(3))) // ข้ามเลข
    await assertFails(approveWith('p2', receipt(2569, 1), null)) // เลขซ้ำ ตัวนับไม่เพิ่ม
    await assertFails(approveWith('p2', receipt(2569, 2), null)) // ไม่เพิ่มตัวนับในคำสั่งเดียวกัน
    await assertFails(approveWith('p2', receipt(2569, 2, { receiptNo: 'R2569-000005' }), bump(2))) // เลขในตัวหนังสือไม่ตรง
    await assertSucceeds(approveWith('p2', receipt(2569, 2), bump(2)))
  })

  test('ผู้เช่าตั้ง receiptNo เองไม่ได้ และเลขที่ออกแล้วแก้ไม่ได้', async () => {
    await seed('a1')
    await assertFails(updateDoc(doc(tenant('alice'), 'bookings/a1'), receipt(2569, 1)))
    await pend('p1')
    await assertSucceeds(approve('p1', receipt(2569, 1), { year: 2569, next: 1 }))
    const db = tenant('admin1')
    const b = writeBatch(db)
    const aid = addAudit(b, db, 'admin1', 'booking.receipt_issue', 'p1')
    b.update(doc(db, 'bookings/p1'), { ...receipt(2569, 2), updatedAt: serverTimestamp(), lastAuditId: aid })
    b.update(doc(db, 'counters/receipts_2569'), { next: 2 })
    await assertFails(b.commit())
  })

  test('ตัวนับ: ผู้เช่าเขียนไม่ได้ ลดเลข/เพิ่มทีละ 2 ไม่ได้', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'counters/receipts_2569'), { year: 2569, next: 5 }) })
    await assertFails(updateDoc(doc(tenant('alice'), 'counters/receipts_2569'), { next: 6 }))
    await assertFails(updateDoc(doc(tenant('admin1'), 'counters/receipts_2569'), { next: 7 }))
    await assertFails(updateDoc(doc(tenant('admin1'), 'counters/receipts_2569'), { next: 4 }))
    await assertSucceeds(updateDoc(doc(tenant('admin1'), 'counters/receipts_2569'), { next: 6 }))
    await assertFails(getDoc(doc(tenant('alice'), 'counters/receipts_2569')))
  })

  test('admin ออกเลขใบเสร็จให้การจองเก่าที่อนุมัติไปแล้ว; ผู้เช่าทำไม่ได้', async () => {
    await seed('old1')
    const issue = (uid, id) => {
      const db = tenant(uid)
      const b = writeBatch(db)
      const aid = addAudit(b, db, uid, 'booking.receipt_issue', id)
      b.update(doc(db, `bookings/${id}`), { ...receipt(2569, 1), updatedAt: serverTimestamp(), lastAuditId: aid })
      b.set(doc(db, 'counters/receipts_2569'), { year: 2569, next: 1 })
      return b.commit()
    }
    await assertFails(issue('alice', 'old1'))
    await assertSucceeds(issue('admin1', 'old1'))
  })

  test('ผู้เช่าอ่านใบเสร็จ (booking) ของคนอื่นไม่ได้', async () => {
    await seed('a1')
    await assertFails(getDoc(doc(tenant('bob'), 'bookings/a1')))
    await assertSucceeds(getDoc(doc(tenant('alice'), 'bookings/a1')))
  })
})

describe('รายงาน (ส่วน 6)', () => {
  test('admin เขียน audit report.export ได้ ผู้เช่าเขียนไม่ได้ และอ่าน log ไม่ได้', async () => {
    const log = (uid) => setDoc(doc(collection(tenant(uid), 'auditLogs')), {
      at: serverTimestamp(), actorUid: uid, actorName: uid, actorRole: ROLE_OF[uid] || 'tenant',
      action: 'report.export', targetType: 'settings', targetId: 'revenue-report', after: { rows: 10 }
    })
    await assertSucceeds(log('owner1'))
    await assertFails(log('alice'))
  })

  test('admin ดึงการจองตามช่วงวันที่ได้ ผู้เช่าดึงทั้ง collection ไม่ได้', async () => {
    await seed('a1')
    const q = (uid) => getDocs(query(collection(tenant(uid), 'bookings'), where('firstDate', '>=', '2026-10-01'), where('firstDate', '<=', '2026-10-31')))
    await assertSucceeds(q('admin1'))
    await assertFails(q('alice'))
  })
})
