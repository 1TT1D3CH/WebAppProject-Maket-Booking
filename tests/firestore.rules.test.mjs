// ทดสอบ firestore.rules ด้วย Firestore emulator
// รัน: npm run test:rules  (ต้องมี firebase-tools และ Java)
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { after, before, beforeEach, describe, test } from 'node:test'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where, writeBatch, serverTimestamp, deleteField, runTransaction } from 'firebase/firestore'

let testEnv

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-market-rules',
    firestore: { rules: readFileSync('firestore.rules', 'utf8') }
  })
})

after(async () => {
  await testEnv?.cleanup()
})

beforeEach(async () => {
  await testEnv.clearFirestore()
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    await setDoc(doc(db, 'users/alice'), { role: 'tenant', displayName: 'Alice', phone: '0811111111' })
    await setDoc(doc(db, 'users/bob'), { role: 'tenant', displayName: 'Bob', phone: '0822222222' })
    await setDoc(doc(db, 'users/admin1'), { role: 'admin', displayName: 'Admin' })
    await setDoc(doc(db, 'users/owner1'), { role: 'owner', displayName: 'Owner' })
    await setDoc(doc(db, 'markets/main-layout'), { name: 'ตลาด', zones: [] })
    await setDoc(doc(db, 'markets/main-layout/stalls/s1'), { stallNo: 'A1', x: 10, y: 10, price: 500, status: 'available', bookedBy: null })
    await setDoc(doc(db, 'markets/main-layout/stalls/s2'), { stallNo: 'A2', x: 90, y: 10, price: 500, status: 'booked', bookedBy: { tenantId: 'bob', bookedAt: 't', bookingId: 'bk-bob' } })
    await setDoc(doc(db, 'markets/main-layout/stalls/s3'), { stallNo: 'A3', x: 170, y: 10, price: 500, status: 'disabled', bookedBy: null })
    await setDoc(doc(db, 'notifications/n-bob'), { tenantId: 'bob', title: 'x', isRead: false })
  })
})

const tenant = (uid = 'alice') => testEnv.authenticatedContext(uid, { firebase: { sign_in_provider: 'password' } }).firestore()
const anon = () => testEnv.authenticatedContext('anon1', { firebase: { sign_in_provider: 'anonymous' } }).firestore()
const guest = () => testEnv.unauthenticatedContext().firestore()

const STALL = 'markets/main-layout/stalls'
// audit log: ทุกการเปลี่ยนสถานะการจองต้องมี log ใน batch/transaction เดียวกัน (lastAuditId ชี้ไป)
const ROLE_OF = { admin1: 'admin', owner1: 'owner' }
const auditDoc = (uid, action, bookingId, over = {}) => ({
  at: serverTimestamp(), actorUid: uid, actorName: uid, actorRole: ROLE_OF[uid] || 'tenant',
  action, targetType: 'booking', targetId: bookingId, bookingId, ...over
})
// เขียน log เข้า batch/tx แล้วคืน id สำหรับ lastAuditId
const addAudit = (w, db, uid, action, bookingId, over) => {
  const ref = doc(collection(db, 'auditLogs'))
  w.set(ref, auditDoc(uid, action, bookingId, over))
  return ref.id
}
const DECISION_ACTION = { approved: 'booking.approve', rejected: 'booking.reject', needs_slip: 'booking.request_slip' }
const bookedBy = (uid, bookingId = 'bk1') => ({ tenantId: uid, bookedAt: '2026-10-07T00:00:00Z', bookingId })

describe('users (B3, B4)', () => {
  test('tenant แก้ role ของตัวเองไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant(), 'users/alice'), { role: 'owner' }))
  })

  test('tenant แก้ข้อมูลอื่นของตัวเองได้', async () => {
    await assertSucceeds(updateDoc(doc(tenant(), 'users/alice'), { displayName: 'Alice 2' }))
  })

  test('สมัครใหม่ได้เฉพาะ role tenant', async () => {
    const db = tenant('carol')
    await assertFails(setDoc(doc(db, 'users/carol'), { role: 'admin' }))
    await assertSucceeds(setDoc(doc(db, 'users/carol'), { role: 'tenant' }))
  })

  test('anonymous อ่าน users ไม่ได้', async () => {
    await assertFails(getDoc(doc(anon(), 'users/alice')))
  })

  test('ผู้ที่ไม่ล็อกอินอ่าน users ไม่ได้', async () => {
    await assertFails(getDoc(doc(guest(), 'users/alice')))
  })

  test('tenant อ่าน profile คนอื่นไม่ได้ แต่อ่านของตัวเองได้', async () => {
    await assertFails(getDoc(doc(tenant(), 'users/bob')))
    await assertSucceeds(getDoc(doc(tenant(), 'users/alice')))
  })

  test('admin อ่าน profile ผู้ใช้ได้ แต่เปลี่ยน role ไม่ได้', async () => {
    await assertSucceeds(getDoc(doc(tenant('admin1'), 'users/alice')))
    await assertFails(updateDoc(doc(tenant('admin1'), 'users/alice'), { role: 'admin' }))
  })

  test('owner เปลี่ยน role ผู้ใช้ได้', async () => {
    await assertSucceeds(updateDoc(doc(tenant('owner1'), 'users/alice'), { role: 'admin' }))
  })
})

describe('markets (B1, B2)', () => {
  test('ทุกคนอ่านผังได้', async () => {
    await assertSucceeds(getDoc(doc(guest(), 'markets/main-layout')))
  })

  test('tenant แก้เอกสารผังไม่ได้ (ชื่อ โซน หรือ stalls/updatedAt)', async () => {
    await assertFails(updateDoc(doc(tenant(), 'markets/main-layout'), { name: 'hacked' }))
    await assertFails(updateDoc(doc(tenant(), 'markets/main-layout'), { zones: [{ id: 'z' }] }))
    await assertFails(updateDoc(doc(tenant(), 'markets/main-layout'), { stalls: [], updatedAt: 'x' }))
  })

  test('tenant ลบหรือสร้างผังไม่ได้', async () => {
    await assertFails(deleteDoc(doc(tenant(), 'markets/main-layout')))
    await assertFails(setDoc(doc(tenant(), 'markets/other'), { name: 'x' }))
  })

  test('anonymous แก้ผังไม่ได้', async () => {
    await assertFails(updateDoc(doc(anon(), 'markets/main-layout'), { name: 'x' }))
  })

  test('admin และ owner แก้ผังได้', async () => {
    await assertSucceeds(updateDoc(doc(tenant('admin1'), 'markets/main-layout'), { name: 'ใหม่' }))
    await assertSucceeds(updateDoc(doc(tenant('owner1'), 'markets/main-layout'), { name: 'ใหม่2' }))
  })

  test('collection stalls ระดับราก (โครงสร้างเก่า) ไม่มีสิทธิ์เขียนแล้ว แม้เป็น admin', async () => {
    await assertFails(setDoc(doc(tenant('admin1'), 'stalls/s1'), { stallNo: 'A1' }))
  })
})

describe('markets/{id}/stalls (แผงรายแผง — C4, C6, B9)', () => {
  test('ทุกคนอ่านแผงได้ (รวมคนไม่ล็อกอิน)', async () => {
    await assertSucceeds(getDoc(doc(guest(), `${STALL}/s1`)))
    await assertSucceeds(getDocs(collection(guest(), STALL)))
  })

  test('admin/owner สร้าง แก้ผัง และลบแผงได้', async () => {
    const adm = tenant('admin1')
    await assertSucceeds(setDoc(doc(adm, `${STALL}/s9`), { stallNo: 'Z9', x: 1, y: 1, status: 'available', bookedBy: null }))
    await assertSucceeds(updateDoc(doc(adm, `${STALL}/s1`), { x: 50, price: 700 }))
    await assertSucceeds(updateDoc(doc(adm, `${STALL}/s2`), { status: 'available', bookedBy: null }))
    await assertSucceeds(deleteDoc(doc(tenant('owner1'), `${STALL}/s3`)))
  })

  test('tenant จองแผงว่างเป็นชื่อตัวเองได้', async () => {
    await assertSucceeds(updateDoc(doc(tenant('alice'), `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('alice'), updatedAt: 'x' }))
  })

  test('tenant ตั้งสถานะ booked เอง (ข้ามการตรวจสลิป) ไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('alice'), updatedAt: 'x' }))
  })

  test('tenant จองในชื่อคนอื่นไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('bob') }))
  })

  test('tenant แย่งแผงที่ถูกจองแล้ว หรือแผงที่ปิดให้บริการ ไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s2`), { status: 'pending', bookedBy: bookedBy('alice') }))
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s3`), { status: 'pending', bookedBy: bookedBy('alice') }))
  })

  test('tenant ยกเลิกการจอง (ของตัวเองหรือคนอื่น) ผ่านเอกสารแผงไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('bob'), `${STALL}/s2`), { status: 'available', bookedBy: null }))
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s2`), { status: 'available', bookedBy: null }))
  })

  test('tenant แก้ตำแหน่ง ราคา หรือฟิลด์อื่นของแผงไม่ได้ แม้ตอนจอง', async () => {
    const db = tenant('alice')
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { x: 999 }))
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { price: 1 }))
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('alice'), price: 1 }))
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { status: 'disabled' }))
  })

  test('bookedBy ที่ใส่ชื่อ/เบอร์โทรเพิ่มไม่ได้ (กันข้อมูลส่วนตัวรั่วสู่สาธารณะ)', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), {
      status: 'pending',
      bookedBy: { ...bookedBy('alice'), name: 'Alice', phone: '0811111111' }
    }))
  })

  test('bookedBy ใส่ชื่อร้าน/ประเภทสินค้าได้ (สำเนาสาธารณะ) แต่ต้องเป็นข้อความสั้น', async () => {
    await assertSucceeds(updateDoc(doc(tenant('alice'), `${STALL}/s1`), {
      status: 'pending',
      bookedBy: { ...bookedBy('alice'), shopName: 'ข้าวมันไก่ป้าแดง', goodsType: 'อาหารคาว' },
      updatedAt: 'x'
    }))
  })

  test('ชื่อร้านยาวเกิน 60 หรือไม่ใช่ข้อความ -> ปฏิเสธ', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), {
      status: 'pending', bookedBy: { ...bookedBy('alice'), shopName: 'ก'.repeat(61) }, updatedAt: 'x'
    }))
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), {
      status: 'pending', bookedBy: { ...bookedBy('alice'), goodsType: { phone: '081' } }, updatedAt: 'x'
    }))
  })

  test('ลูกค้าอ่านสำเนาชื่อร้านบนแผงที่จองแล้วได้ แต่อ่าน bookings ของคนอื่นไม่ได้', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await updateDoc(doc(db, `${STALL}/s2`), { bookedBy: { tenantId: 'bob', bookedAt: 't', bookingId: 'bk-bob', shopName: 'ร้านบ๊อบ', goodsType: 'ชา' } })
      await setDoc(doc(db, 'bookings/bk-bob'), { tenantId: 'bob', stallId: 's2', customerName: 'Bob', customerPhone: '0899999999', status: 'approved' })
    })
    const snap = await assertSucceeds(getDoc(doc(tenant('alice'), `${STALL}/s2`)))
    assert.equal(snap.data().bookedBy.shopName, 'ร้านบ๊อบ')
    assert.equal('customerPhone' in snap.data().bookedBy, false)
    await assertFails(getDoc(doc(tenant('alice'), 'bookings/bk-bob')))
  })

  test('tenant สร้างหรือลบแผงไม่ได้', async () => {
    await assertFails(setDoc(doc(tenant(), `${STALL}/s9`), { stallNo: 'Z9', status: 'available' }))
    await assertFails(deleteDoc(doc(tenant(), `${STALL}/s1`)))
  })

  test('anonymous และคนไม่ล็อกอิน จองไม่ได้', async () => {
    await assertFails(updateDoc(doc(anon(), `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('anon1') }))
    await assertFails(updateDoc(doc(guest(), `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('x') }))
  })
})

describe('notifications (B1, C2)', () => {
  test('tenant อ่านแจ้งเตือนของคนอื่นไม่ได้', async () => {
    await assertFails(getDoc(doc(tenant('alice'), 'notifications/n-bob')))
  })

  test('tenant ลบแจ้งเตือนของคนอื่นไม่ได้', async () => {
    await assertFails(deleteDoc(doc(tenant('alice'), 'notifications/n-bob')))
  })

  test('เจ้าของแจ้งเตือนอ่าน/กดอ่านแล้ว/ลบได้', async () => {
    const db = tenant('bob')
    await assertSucceeds(getDoc(doc(db, 'notifications/n-bob')))
    await assertSucceeds(updateDoc(doc(db, 'notifications/n-bob'), { isRead: true }))
    await assertSucceeds(deleteDoc(doc(db, 'notifications/n-bob')))
  })

  test('เจ้าของแจ้งเตือนแก้ฟิลด์อื่นไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('bob'), 'notifications/n-bob'), { tenantId: 'alice' }))
  })

  test('tenant query แจ้งเตือนได้เฉพาะ where tenantId == uid ตัวเอง', async () => {
    const db = tenant('bob')
    await assertSucceeds(getDocs(query(collection(db, 'notifications'), where('tenantId', '==', 'bob'))))
    await assertFails(getDocs(collection(db, 'notifications')))
    await assertSucceeds(getDocs(collection(tenant('admin1'), 'notifications')))
  })

  test('tenant สร้างแจ้งเตือนไม่ได้ แต่ admin สร้างได้', async () => {
    await assertFails(setDoc(doc(tenant(), 'notifications/n2'), { tenantId: 'bob' }))
    await assertSucceeds(setDoc(doc(tenant('admin1'), 'notifications/n2'), { tenantId: 'bob' }))
  })
})

describe('bookings (B1, B9)', () => {
  test('ผู้ที่ไม่ล็อกอินอ่านการจองไม่ได้ / อ่านได้เฉพาะเจ้าของและ admin', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'bookings/b1'), { tenantId: 'bob', stallId: 's1', customerPhone: '0822222222' })
    })
    await assertFails(getDoc(doc(guest(), 'bookings/b1')))
    await assertFails(getDoc(doc(tenant('alice'), 'bookings/b1')))
    await assertSucceeds(getDoc(doc(tenant('bob'), 'bookings/b1')))
    await assertSucceeds(getDoc(doc(tenant('admin1'), 'bookings/b1')))
  })

  const SLIP = 'data:image/webp;base64,UklGRg=='
  const newBooking = (over = {}) => ({
    tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111',
    goodsType: 'ชา', amountDue: 500, slipHash: 'abc123', slipUploadedAt: serverTimestamp(),
    createdAt: serverTimestamp(), status: 'pending', ...over
  })
  const slipDoc = (over = {}) => ({
    tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10,
    createdAt: serverTimestamp(), ...over
  })
  // จอง = แผง + booking + สลิป ใน batch เดียว (เหมือน transaction ในแอป)
  const bookBatch = ({ uid = 'alice', stallId = 's1', id = 'bk-new', booking = {}, slip = {}, withSlip = true, stallStatus = 'pending' } = {}) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, uid, 'booking.create', id)
    batch.update(doc(db, `${STALL}/${stallId}`), { status: stallStatus, bookedBy: bookedBy(uid, id), updatedAt: 'x' })
    batch.set(doc(db, `bookings/${id}`), newBooking({ tenantId: uid, stallId, lastAuditId, ...booking }))
    if (withSlip) batch.set(doc(db, `bookingSlips/${id}`), slipDoc({ tenantId: uid, ...slip }))
    return batch.commit()
  }

  test('จองพร้อมแนบสลิป (แผง pending + booking pending + สลิป) สำเร็จ', async () => {
    await assertSucceeds(bookBatch())
  })

  test('admin/owner จองแผงเองได้ (log ระบุ role จริงของตัวเอง) แต่ระบุว่าเป็น tenant ไม่ผ่าน', async () => {
    await assertSucceeds(bookBatch({ uid: 'admin1', id: 'bk-adm' }))
    const db = tenant('owner1')
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, 'owner1', 'booking.create', 'bk-own', { actorRole: 'tenant' })
    batch.update(doc(db, `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('owner1', 'bk-own'), updatedAt: 'x' })
    batch.set(doc(db, 'bookings/bk-own'), newBooking({ tenantId: 'owner1', lastAuditId }))
    batch.set(doc(db, 'bookingSlips/bk-own'), slipDoc({ tenantId: 'owner1' }))
    await assertFails(batch.commit())
  })

  test('จองพร้อมสลิปขนาดจริง (~700,000 ตัวอักษร) สำเร็จ', async () => {
    await assertSucceeds(bookBatch({ slip: { dataUrl: 'data:image/webp;base64,' + 'A'.repeat(699000) } }))
  })

  test('จองโดยไม่มีสลิปไม่ได้', async () => {
    await assertFails(bookBatch({ withSlip: false }))
  })

  test('ตั้ง booking เป็น approved/confirmed เองไม่ได้', async () => {
    await assertFails(bookBatch({ booking: { status: 'approved' } }))
    await assertFails(bookBatch({ booking: { status: 'confirmed' } }))
  })

  test('ตั้งแผงเป็น booked เองไม่ได้', async () => {
    await assertFails(bookBatch({ stallStatus: 'booked' }))
  })

  test('ปลอม amountDue ไม่ได้', async () => {
    await assertFails(bookBatch({ booking: { amountDue: 1 } }))
  })

  test('booking มีฟิลด์แปลกปลอมเพิ่มไม่ได้', async () => {
    await assertFails(bookBatch({ booking: { decidedBy: 'alice' } }))
  })

  test('สองบัญชีจองแผงเดียวกัน ผ่านได้บัญชีเดียว', async () => {
    await assertSucceeds(bookBatch({ uid: 'alice', id: 'bk-a' }))
    await assertFails(bookBatch({ uid: 'bob', id: 'bk-b' }))
  })

  test('สลิปที่ไม่ใช่รูป หรือใหญ่เกินไป ไม่ได้', async () => {
    await assertFails(bookBatch({ slip: { dataUrl: 'data:text/html;base64,PGI+' } }))
    await assertFails(bookBatch({ slip: { dataUrl: 'data:image/webp;base64,' + 'A'.repeat(750000) } }))
  })

  test('สลิปที่ระบุเจ้าของเป็นคนอื่นไม่ได้', async () => {
    await assertFails(bookBatch({ slip: { tenantId: 'bob' } }))
  })

  test('บัญชีอื่นอ่านสลิปเราไม่ได้ แต่เจ้าของและ admin อ่านได้', async () => {
    await assertSucceeds(bookBatch())
    await assertFails(getDoc(doc(tenant('bob'), 'bookingSlips/bk-new')))
    await assertFails(getDoc(doc(guest(), 'bookingSlips/bk-new')))
    await assertSucceeds(getDoc(doc(tenant('alice'), 'bookingSlips/bk-new')))
    await assertSucceeds(getDoc(doc(tenant('admin1'), 'bookingSlips/bk-new')))
  })

  test('tenant แก้/ลบสลิปไม่ได้ แต่ admin ลบได้', async () => {
    await assertSucceeds(bookBatch())
    await assertFails(updateDoc(doc(tenant('alice'), 'bookingSlips/bk-new'), { bytes: 1 }))
    await assertFails(deleteDoc(doc(tenant('alice'), 'bookingSlips/bk-new')))
    await assertSucceeds(deleteDoc(doc(tenant('admin1'), 'bookingSlips/bk-new')))
  })

  test('สร้างรายการจองเดี่ยว ๆ โดยแผงไม่ได้ถูกจองในชื่อตัวเอง ไม่ได้', async () => {
    await assertFails(setDoc(doc(tenant('alice'), 'bookings/b4'), newBooking()))
  })

  test('จองในชื่อคนอื่น และ anonymous จองไม่ได้', async () => {
    const db = tenant('alice')
    const batch = writeBatch(db)
    batch.update(doc(db, `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('alice', 'bk-x') })
    batch.set(doc(db, 'bookings/bk-x'), newBooking({ tenantId: 'bob', lastAuditId: addAudit(batch, db, 'alice', 'booking.create', 'bk-x') }))
    await assertFails(batch.commit())
    await assertFails(setDoc(doc(anon(), 'bookings/b3'), newBooking({ tenantId: 'anon1' })))
  })

  test('tenant แก้/ลบรายการจองไม่ได้', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'bookings/b1'), { tenantId: 'bob', stallId: 's1' })
    })
    await assertFails(updateDoc(doc(tenant('bob'), 'bookings/b1'), { status: 'x' }))
    await assertFails(deleteDoc(doc(tenant('bob'), 'bookings/b1')))
  })
})

describe('ตรวจสลิป: admin/owner ตัดสินการจอง', () => {
  // แผง s1 + booking bk1 ของ alice อยู่ในสถานะรอตรวจ
  beforeEach(async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await setDoc(doc(db, `${STALL}/s1`), { stallNo: 'A1', x: 10, y: 10, price: 500, status: 'pending', bookedBy: bookedBy('alice', 'bk1') })
      await setDoc(doc(db, 'bookings/bk1'), {
        tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111',
        amountDue: 500, slipHash: 'h', status: 'pending'
      })
    })
  })

  const decide = (uid, bookingPatch, stallPatch, id = 'bk1') => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, uid, DECISION_ACTION[bookingPatch.status] || 'booking.approve', id)
    batch.update(doc(db, `bookings/${id}`), { decidedBy: uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId, ...bookingPatch })
    if (stallPatch) batch.update(doc(db, `${STALL}/s1`), stallPatch)
    return batch.commit()
  }

  test('admin อนุมัติ: booking approved + แผง booked', async () => {
    await assertSucceeds(decide('admin1', { status: 'approved' }, { status: 'booked' }))
  })

  test('owner อนุมัติได้เหมือน admin', async () => {
    await assertSucceeds(decide('owner1', { status: 'approved' }, { status: 'booked' }))
  })

  test('admin ปฏิเสธพร้อมเหตุผล: แผงกลับ available และปล่อยผู้จอง', async () => {
    await assertSucceeds(decide('admin1', { status: 'rejected', statusReason: 'ยอดไม่ตรง' }, { status: 'available', bookedBy: null }))
  })

  test('admin ขอสลิปใหม่พร้อมเหตุผล: แผงยัง pending', async () => {
    await assertSucceeds(decide('admin1', { status: 'needs_slip', statusReason: 'รูปไม่ชัด' }, null))
  })

  test('ปฏิเสธ/ขอสลิปใหม่โดยไม่ใส่เหตุผลไม่ได้', async () => {
    await assertFails(decide('admin1', { status: 'rejected' }, { status: 'available', bookedBy: null }))
    await assertFails(decide('admin1', { status: 'needs_slip', statusReason: '' }, null))
  })

  test('อนุมัติโดยไม่เปลี่ยนแผงเป็น booked ไม่ได้ (สถานะแผงต้องตามผล)', async () => {
    await assertFails(decide('admin1', { status: 'approved' }, null))
    await assertFails(decide('admin1', { status: 'approved' }, { status: 'available', bookedBy: null }))
  })

  test('tenant อนุมัติ/ปฏิเสธการจองของตัวเองไม่ได้', async () => {
    await assertFails(decide('alice', { status: 'approved' }, { status: 'booked' }))
  })

  test('admin แก้ยอดเงิน/ผู้เช่า/แฮชสลิปไม่ได้', async () => {
    await assertFails(decide('admin1', { status: 'approved', amountDue: 1 }, { status: 'booked' }))
    await assertFails(decide('admin1', { status: 'approved', tenantId: 'bob' }, { status: 'booked' }))
    await assertFails(decide('admin1', { status: 'approved', slipHash: 'x' }, { status: 'booked' }))
  })

  test('ต้องบันทึก decidedBy เป็นตัวเอง', async () => {
    await assertFails(decide('admin1', { status: 'approved', decidedBy: 'owner1' }, { status: 'booked' }))
  })

  test('เปลี่ยนสถานะย้อนกลับ approved -> pending ไม่ได้', async () => {
    await assertSucceeds(decide('admin1', { status: 'approved' }, { status: 'booked' }))
    await assertFails(decide('admin1', { status: 'pending' }, { status: 'pending' }))
    await assertFails(decide('admin1', { status: 'rejected', statusReason: 'x' }, { status: 'available', bookedBy: null }))
  })

  test('needs_slip -> rejected ได้ แต่ needs_slip -> approved ไม่ได้', async () => {
    await assertSucceeds(decide('admin1', { status: 'needs_slip', statusReason: 'รูปไม่ชัด' }, null))
    await assertFails(decide('admin1', { status: 'approved' }, { status: 'booked' }))
    await assertSucceeds(decide('admin1', { status: 'rejected', statusReason: 'ไม่ส่งสลิปใหม่' }, { status: 'available', bookedBy: null }))
  })

  test('admin ส่งแจ้งเตือนผลการตรวจถึงผู้เช่าได้', async () => {
    const db = tenant('admin1')
    await assertSucceeds(setDoc(doc(db, 'notifications/n-slip'), { tenantId: 'alice', title: 'อนุมัติการจองแล้ว', type: 'SLIP_REVIEW', isRead: false }))
  })
})

describe('ผู้เช่าส่งสลิปใหม่ / ยกเลิกการจองเอง', () => {
  const SLIP = 'data:image/webp;base64,UklGRg=='
  // แผง s1 + booking bk1 ของ alice
  const seed = async (status, stallStatus = 'pending') => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await setDoc(doc(db, `${STALL}/s1`), { stallNo: 'A1', x: 10, y: 10, price: 500, status: stallStatus, bookedBy: bookedBy('alice', 'bk1') })
      await setDoc(doc(db, 'bookings/bk1'), {
        tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111',
        amountDue: 500, slipHash: 'old', status, statusReason: 'รูปไม่ชัด'
      })
      await setDoc(doc(db, 'bookingSlips/bk1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10 })
    })
  }

  const resubmit = (uid = 'alice', { booking = {}, withSlip = true, slip = {} } = {}) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, uid, 'booking.slip_submit', 'bk1')
    batch.update(doc(db, 'bookings/bk1'), {
      status: 'pending', statusReason: deleteField(), slipHash: 'new',
      slipUploadedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId, ...booking
    })
    if (withSlip) {
      batch.set(doc(db, 'bookingSlips/bk1'), { tenantId: uid, marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp(), ...slip })
    }
    return batch.commit()
  }

  const cancel = (uid = 'alice', { releaseStall = true } = {}) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, uid, 'booking.cancel_self', 'bk1')
    batch.update(doc(db, 'bookings/bk1'), { status: 'cancelled', updatedAt: serverTimestamp(), lastAuditId })
    if (releaseStall) batch.update(doc(db, `${STALL}/s1`), { status: 'available', bookedBy: null, updatedAt: 'x' })
    return batch.commit()
  }

  test('ส่งสลิปใหม่ตอน needs_slip ได้ (booking กลับเป็น pending + เขียนสลิปใหม่)', async () => {
    await seed('needs_slip')
    await assertSucceeds(resubmit())
  })

  test('ส่งสลิปใหม่ตอน pending / approved ไม่ได้', async () => {
    await seed('pending')
    await assertFails(resubmit())
    await testEnv.clearFirestore()
    await seed('approved', 'booked')
    await assertFails(resubmit())
  })

  test('ส่งสลิปใหม่แล้วแก้ amountDue หรือสถานะอื่นไม่ได้', async () => {
    await seed('needs_slip')
    await assertFails(resubmit('alice', { booking: { amountDue: 1 } }))
    await assertFails(resubmit('alice', { booking: { status: 'approved' } }))
  })

  test('เปลี่ยนสถานะเป็น pending โดยไม่ส่งรูปใหม่ไม่ได้', async () => {
    await seed('needs_slip')
    await assertFails(resubmit('alice', { withSlip: false }))
  })

  test('ส่งสลิปใหม่ของการจองคนอื่นไม่ได้', async () => {
    await seed('needs_slip')
    await assertFails(resubmit('bob'))
  })

  test('รูปสลิปใหม่ที่ไม่ใช่รูปไม่ได้', async () => {
    await seed('needs_slip')
    await assertFails(resubmit('alice', { slip: { dataUrl: 'data:text/html;base64,PGI+' } }))
  })

  test('แก้รูปสลิปเดี่ยว ๆ ตอน pending ไม่ได้', async () => {
    await seed('pending')
    await assertFails(setDoc(doc(tenant('alice'), 'bookingSlips/bk1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() }))
  })

  test('ยกเลิกตอน pending / needs_slip ได้ (booking cancelled + ปล่อยแผง)', async () => {
    await seed('pending')
    await assertSucceeds(cancel())
    await testEnv.clearFirestore()
    await seed('needs_slip')
    await assertSucceeds(cancel())
  })

  test('ยกเลิกที่ approved แล้วไม่ได้', async () => {
    await seed('approved', 'booked')
    await assertFails(cancel())
  })

  test('ยกเลิก booking ของคนอื่นไม่ได้', async () => {
    await seed('pending')
    await assertFails(cancel('bob'))
  })

  test('ยกเลิก booking โดยไม่ปล่อยแผง หรือปล่อยแผงโดยไม่ยกเลิก booking ไม่ได้', async () => {
    await seed('pending')
    await assertFails(cancel('alice', { releaseStall: false }))
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), { status: 'available', bookedBy: null, updatedAt: 'x' }))
  })
})

describe('เส้นทางเต็มของระบบสลิป (ต่อเนื่องในฐานข้อมูลเดียว)', () => {
  const SLIP = 'data:image/webp;base64,UklGRg=='
  const book = async () => {
    const db = tenant('alice')
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, 'alice', 'booking.create', 'bk-flow')
    batch.update(doc(db, `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('alice', 'bk-flow'), updatedAt: 'x' })
    batch.set(doc(db, 'bookings/bk-flow'), {
      tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111', goodsType: 'ชา',
      amountDue: 500, slipHash: 'h1', slipUploadedAt: serverTimestamp(), createdAt: serverTimestamp(), status: 'pending', lastAuditId
    })
    batch.set(doc(db, 'bookingSlips/bk-flow'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    await batch.commit()
  }
  const adminDecide = async (uid, bookingPatch, stallPatch) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, uid, DECISION_ACTION[bookingPatch.status], 'bk-flow')
    batch.update(doc(db, 'bookings/bk-flow'), { decidedBy: uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId, ...bookingPatch })
    if (stallPatch) batch.update(doc(db, `${STALL}/s1`), stallPatch)
    await batch.commit()
  }

  test('จอง -> admin ขอสลิปใหม่ -> ผู้เช่าส่งใหม่ -> owner อนุมัติ -> แผงเป็น booked', async () => {
    await book()
    await adminDecide('admin1', { status: 'needs_slip', statusReason: 'รูปไม่ชัด' }, null)
    const db = tenant('alice')
    const batch = writeBatch(db)
    batch.update(doc(db, 'bookings/bk-flow'), { status: 'pending', statusReason: deleteField(), slipHash: 'h2', slipUploadedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId: addAudit(batch, db, 'alice', 'booking.slip_submit', 'bk-flow') })
    batch.set(doc(db, 'bookingSlips/bk-flow'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    await assertSucceeds(batch.commit())
    await assertSucceeds(adminDecide('owner1', { status: 'approved' }, { status: 'booked' }))
    await assertSucceeds(getDoc(doc(tenant('alice'), 'bookings/bk-flow')))
    // คนอื่นจองแผงที่อนุมัติแล้วไม่ได้
    await assertFails(updateDoc(doc(tenant('bob'), `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('bob', 'bk-b'), updatedAt: 'x' }))
  })

  test('จอง -> admin ปฏิเสธ -> แผงว่าง และคนอื่นจองต่อได้', async () => {
    await book()
    await assertFails(updateDoc(doc(tenant('bob'), `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('bob', 'bk-b'), updatedAt: 'x' }))
    await assertSucceeds(adminDecide('admin1', { status: 'rejected', statusReason: 'ยอดไม่ตรง' }, { status: 'available', bookedBy: null }))
    await assertSucceeds(updateDoc(doc(tenant('bob'), `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('bob', 'bk-b'), updatedAt: 'x' }))
  })

  test('admin บันทึกผัง (แก้ราคา/ตำแหน่งแผง) ยังทำได้กับ rules ใหม่ แม้แผงกำลังรอตรวจ', async () => {
    await book()
    await assertSucceeds(updateDoc(doc(tenant('admin1'), `${STALL}/s1`), { x: 55, price: 600 }))
    await assertSucceeds(updateDoc(doc(tenant('admin1'), 'markets/main-layout'), { name: 'ตลาดใหม่', updatedAt: 'x' }))
  })
})

describe('ส่งสลิปใหม่ด้วย transaction (เหมือนที่แอปใช้จริง)', () => {
  test('booking ที่ผ่านการขอสลิปใหม่จริง (มี decidedBy/decidedAt/updatedAt) ส่งใหม่ผ่าน transaction ได้', async () => {
    const SLIP = 'data:image/webp;base64,UklGRg=='
    // จองจริง -> admin ขอสลิปใหม่จริง (ผ่าน rules ทั้งคู่)
    const adb = tenant('alice')
    const b1 = writeBatch(adb)
    const auditT = addAudit(b1, adb, 'alice', 'booking.create', 'bk-t')
    b1.update(doc(adb, `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('alice', 'bk-t'), updatedAt: 'x' })
    b1.set(doc(adb, 'bookings/bk-t'), {
      tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111', goodsType: 'ชา',
      amountDue: 500, slipHash: 'h1', slipUploadedAt: serverTimestamp(), createdAt: serverTimestamp(), status: 'pending', lastAuditId: auditT
    })
    b1.set(doc(adb, 'bookingSlips/bk-t'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    await assertSucceeds(b1.commit())
    const mdb = tenant('admin1')
    const mb = writeBatch(mdb)
    const auditM = addAudit(mb, mdb, 'admin1', 'booking.request_slip', 'bk-t')
    mb.update(doc(mdb, 'bookings/bk-t'), {
      status: 'needs_slip', statusReason: 'ยอดไม่ตรง', decidedBy: 'admin1', decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId: auditM
    })
    await assertSucceeds(mb.commit())

    const db = tenant('alice')
    await assertSucceeds(runTransaction(db, async (tx) => {
      const ref = doc(db, 'bookings/bk-t')
      const snap = await tx.get(ref)
      if (snap.data().status !== 'needs_slip') throw new Error('bad status')
      tx.update(ref, { status: 'pending', statusReason: deleteField(), slipHash: 'h2', slipUploadedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId: addAudit(tx, db, 'alice', 'booking.slip_submit', 'bk-t') })
      tx.set(doc(db, 'bookingSlips/bk-t'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    }))
  })
})

describe('audit log (บันทึกการทำงาน)', () => {
  const seedPending = async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await setDoc(doc(db, `${STALL}/s1`), { stallNo: 'A1', x: 10, y: 10, price: 500, status: 'pending', bookedBy: bookedBy('alice', 'bk1') })
      await setDoc(doc(db, 'bookings/bk1'), {
        tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111',
        amountDue: 500, slipHash: 'h', status: 'pending', lastAuditId: 'old-audit'
      })
      await setDoc(doc(db, 'auditLogs/old-audit'), { at: new Date(), actorUid: 'alice', actorRole: 'tenant', action: 'booking.create', targetType: 'booking', targetId: 'bk1', bookingId: 'bk1' })
    })
  }
  const approve = (uid, { audit = true, auditOver, auditId } = {}) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    const id = audit ? addAudit(batch, db, uid, 'booking.approve', 'bk1', auditOver) : null
    batch.update(doc(db, 'bookings/bk1'), {
      status: 'approved', decidedBy: uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp(),
      ...(audit || auditId ? { lastAuditId: auditId || id } : {})
    })
    batch.update(doc(db, `${STALL}/s1`), { status: 'booked' })
    return batch.commit()
  }

  test('เปลี่ยนสถานะโดยไม่มี log ไม่ผ่าน', async () => {
    await seedPending()
    await assertFails(approve('admin1', { audit: false }))
  })

  test('ชี้ lastAuditId เดิม (log ของการกระทำก่อนหน้า) ไม่ผ่าน', async () => {
    await seedPending()
    await assertFails(approve('admin1', { audit: false, auditId: 'old-audit' }))
  })

  test('log ที่ actorUid เป็นคนอื่นไม่ผ่าน', async () => {
    await seedPending()
    await assertFails(approve('admin1', { auditOver: { actorUid: 'owner1' } }))
  })

  test('log ที่ action ไม่ตรงกับการกระทำ (อนุมัติแต่บันทึกว่าปฏิเสธ) ไม่ผ่าน', async () => {
    await seedPending()
    await assertFails(approve('admin1', { auditOver: { action: 'booking.reject' } }))
  })

  test('log ที่ at ไม่ใช่ request.time ไม่ผ่าน', async () => {
    await seedPending()
    await assertFails(approve('admin1', { auditOver: { at: new Date('2020-01-01') } }))
  })

  test('มี log ถูกต้องผ่าน และ admin/owner อ่าน log ได้ ผู้เช่าอ่านไม่ได้', async () => {
    await seedPending()
    await assertSucceeds(approve('admin1'))
    const rows = await getDocs(collection(tenant('admin1'), 'auditLogs'))
    assert.ok(rows.size >= 2)
    await assertSucceeds(getDocs(collection(tenant('owner1'), 'auditLogs')))
    await assertFails(getDocs(collection(tenant('alice'), 'auditLogs')))
    await assertFails(getDoc(doc(tenant('alice'), 'auditLogs/old-audit')))
  })

  test('ผู้เช่าเขียน log ว่าตัวเองเป็น admin ไม่ผ่าน', async () => {
    await seedPending()
    const db = tenant('alice')
    await assertFails(setDoc(doc(db, 'auditLogs/x1'), auditDoc('alice', 'booking.cancel_self', 'bk1', { actorRole: 'admin' })))
  })

  test('ผู้เช่าเขียน action ของ admin (approve) ไม่ผ่าน', async () => {
    await seedPending()
    const db = tenant('alice')
    await assertFails(setDoc(doc(db, 'auditLogs/x2'), auditDoc('alice', 'booking.approve', 'bk1')))
  })

  test('ผู้เช่าเขียน log ของการจองคนอื่นไม่ผ่าน', async () => {
    await seedPending()
    const db = tenant('bob')
    await assertFails(setDoc(doc(db, 'auditLogs/x3'), auditDoc('bob', 'booking.cancel_self', 'bk1')))
  })

  test('admin ตั้ง actorRole เป็น owner ทั้งที่เป็น admin ไม่ผ่าน และอ้าง role system ไม่ได้', async () => {
    await seedPending()
    const db = tenant('admin1')
    await assertFails(setDoc(doc(db, 'auditLogs/x4'), auditDoc('admin1', 'booking.approve', 'bk1', { actorRole: 'owner' })))
    await assertFails(setDoc(doc(db, 'auditLogs/x5'), auditDoc('admin1', 'booking.approve', 'bk1', { actorRole: 'system' })))
  })

  test('log มีฟิลด์แปลกปลอมหรือ action นอกรายการไม่ผ่าน', async () => {
    await seedPending()
    const db = tenant('admin1')
    await assertFails(setDoc(doc(db, 'auditLogs/x6'), auditDoc('admin1', 'booking.approve', 'bk1', { slipDataUrl: 'data:...' })))
    await assertFails(setDoc(doc(db, 'auditLogs/x7'), auditDoc('admin1', 'booking.hack', 'bk1')))
  })

  test('แก้ log ไม่ได้แม้เป็น owner; ลบได้เฉพาะ owner (admin/ผู้เช่าลบไม่ได้)', async () => {
    await seedPending()
    await assertFails(updateDoc(doc(tenant('owner1'), 'auditLogs/old-audit'), { reason: 'x' }))
    await assertFails(deleteDoc(doc(tenant('admin1'), 'auditLogs/old-audit')))
    await assertFails(deleteDoc(doc(tenant('alice'), 'auditLogs/old-audit')))
    await assertSucceeds(deleteDoc(doc(tenant('owner1'), 'auditLogs/old-audit')))
  })

  test('owner ลบ log พร้อมเขียน log สรุป auditlog.purge ใน batch เดียวได้', async () => {
    await seedPending()
    const own = tenant('owner1')
    const batch = writeBatch(own)
    batch.set(doc(collection(own, 'auditLogs')), {
      at: serverTimestamp(), actorUid: 'owner1', actorName: 'Owner', actorRole: 'owner', action: 'auditlog.purge',
      targetType: 'settings', targetId: 'auditLogs', after: { deletedCount: 1 }
    })
    batch.delete(doc(own, 'auditLogs/old-audit'))
    await assertSucceeds(batch.commit())
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      assert.equal((await getDoc(doc(ctx.firestore(), 'auditLogs/old-audit'))).exists(), false)
    })
  })

  test('เปลี่ยน role ผู้ใช้พร้อม log (batch เดียว) โดย owner ผ่าน', async () => {
    const db = tenant('owner1')
    const batch = writeBatch(db)
    batch.update(doc(db, 'users/alice'), { role: 'admin' })
    batch.set(doc(collection(db, 'auditLogs')), {
      at: serverTimestamp(), actorUid: 'owner1', actorName: 'Owner', actorRole: 'owner', action: 'user.role_change',
      targetType: 'user', targetId: 'alice', before: { role: 'tenant' }, after: { role: 'admin' }
    })
    await assertSucceeds(batch.commit())
  })
})

describe('ลบรายการจองที่ตัดสินแล้ว (ลบถาวร)', () => {
  const LOCK = 'bookingLocks/s1_2026-10-17_all'
  const seed = async (status, extra = {}, { stall = 'own' } = {}) => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore()
      await setDoc(doc(db, 'bookings/bk1'), { tenantId: 'alice', stallId: 's1', stallNo: 'A1', amountDue: 500, status, ...extra })
      await setDoc(doc(db, 'bookingSlips/bk1'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: 'data:image/webp;base64,UklGRg==', mime: 'image/webp', bytes: 10 })
      await setDoc(doc(db, `${STALL}/s1`), {
        stallNo: 'A1', x: 10, y: 10, price: 500,
        status: stall === 'own' ? 'booked' : 'booked',
        bookedBy: bookedBy('alice', stall === 'own' ? 'bk1' : 'other-booking')
      })
    })
  }
  // วนหลายสถานะในเทสต์เดียว: log ลบสร้างซ้ำไม่ได้ ต้องเคลียร์ก่อนรอบถัดไป
  const clearDeleteAudit = () => testEnv.withSecurityRulesDisabled(async (ctx) => { await deleteDoc(doc(ctx.firestore(), 'auditLogs/delete_bk1')) })
  // opts.audit: false = ไม่เขียน log; opts.auditUid: ผู้กระทำใน log; opts.releaseStall: ปล่อยแผงใน batch เดียวกัน
  const remove = (uid, { audit = true, auditUid = uid, releaseStall = false, withSlip = true } = {}) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    if (audit) batch.set(doc(db, 'auditLogs/delete_bk1'), auditDoc(auditUid, 'booking.delete', 'bk1', { actorRole: ROLE_OF[auditUid] || 'tenant' }))
    batch.delete(doc(db, 'bookings/bk1'))
    if (withSlip) batch.delete(doc(db, 'bookingSlips/bk1'))
    if (releaseStall) batch.update(doc(db, `${STALL}/s1`), { status: 'available', bookedBy: null, updatedAt: 'x' })
    return batch.commit()
  }

  test('admin ลบรายการที่ปฏิเสธ/ยกเลิก/อนุมัติ/หมดเวลา (พร้อมสลิปและ log) ได้', async () => {
    for (const status of ['rejected', 'cancelled', 'approved', 'expired']) {
      await clearDeleteAudit()
      await seed(status)
      await assertSucceeds(remove('admin1'))
    }
  })

  test('owner ลบรายการที่ยกเลิกแล้วได้', async () => {
    await seed('cancelled')
    await assertSucceeds(remove('owner1'))
  })

  test('ลบพร้อมปล่อยแผงที่ยังเป็นของการจองนี้ ผ่าน', async () => {
    await seed('approved')
    await assertSucceeds(remove('admin1', { releaseStall: true }))
  })

  test('ลบโดยไม่มี audit log ไม่ผ่าน', async () => {
    await seed('approved')
    await assertFails(remove('admin1', { audit: false }))
  })

  test('audit log ที่ actorUid เป็นคนอื่นไม่ผ่าน', async () => {
    await seed('approved')
    await assertFails(remove('admin1', { auditUid: 'owner1' }))
  })

  test('audit log ผิด action ไม่ผ่าน', async () => {
    await seed('approved')
    const db = tenant('admin1')
    const batch = writeBatch(db)
    batch.set(doc(db, 'auditLogs/delete_bk1'), auditDoc('admin1', 'booking.reject', 'bk1'))
    batch.delete(doc(db, 'bookings/bk1'))
    await assertFails(batch.commit())
  })

  test('ลบรายการที่รอดำเนินการ (pending / needs_slip / awaiting_slip / cancel_requested) ไม่ผ่าน', async () => {
    for (const status of ['pending', 'needs_slip', 'awaiting_slip', 'cancel_requested']) {
      await clearDeleteAudit()
      await seed(status)
      await assertFails(remove('admin1'))
    }
  })

  test('ยกเลิกแล้วแต่ยังรอคืนเงิน (refund pending) ลบไม่ผ่าน; คืนแล้วผ่าน', async () => {
    await seed('cancelled', { refund: { status: 'pending', amount: 100 } })
    await assertFails(remove('admin1'))
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'bookings/bk1'), { tenantId: 'alice', stallId: 's1', stallNo: 'A1', amountDue: 500, status: 'cancelled', refund: { status: 'refunded', amount: 100 } })
    })
    await assertSucceeds(remove('admin1'))
  })

  test('มีเลขใบเสร็จ: admin ลบไม่ผ่าน owner ผ่าน', async () => {
    await seed('approved', { receiptNo: 'R2569-0001' })
    await assertFails(remove('admin1'))
    await assertSucceeds(remove('owner1'))
  })

  test('ผู้เช่าลบไม่ได้ทุกสถานะ (แม้เขียน log เอง)', async () => {
    for (const status of ['rejected', 'approved', 'cancelled']) {
      await clearDeleteAudit()
      await seed(status)
      await assertFails(remove('alice'))
    }
  })

  test('หลังลบ booking และสลิปไม่เหลือ และลบแจ้งเตือนที่ผูกการจองใน batch เดียวกันได้', async () => {
    await seed('approved')
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'notifications/n-bk1'), { tenantId: 'alice', bookingId: 'bk1', title: 'x', isRead: false })
    })
    const db = tenant('admin1')
    const batch = writeBatch(db)
    batch.set(doc(db, 'auditLogs/delete_bk1'), auditDoc('admin1', 'booking.delete', 'bk1', { actorRole: 'admin' }))
    batch.delete(doc(db, 'bookings/bk1'))
    batch.delete(doc(db, 'bookingSlips/bk1'))
    batch.delete(doc(db, 'notifications/n-bk1'))
    await assertSucceeds(batch.commit())
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const c = ctx.firestore()
      assert.equal((await getDoc(doc(c, 'bookings/bk1'))).exists(), false)
      assert.equal((await getDoc(doc(c, 'bookingSlips/bk1'))).exists(), false)
      assert.equal((await getDoc(doc(c, 'notifications/n-bk1'))).exists(), false)
    })
  })

  test('ลบ bookingSlips เดี่ยว ๆ ของ admin ยังทำได้ (ลบสลิปอัตโนมัติ/ทันที)', async () => {
    await seed('approved')
    await assertSucceeds(deleteDoc(doc(tenant('admin1'), 'bookingSlips/bk1')))
  })

  test('ลบการจอง A ที่แผงเป็นของการจอง B: ผ่าน และแผงของ B ยังอยู่ (การไม่ปล่อยแผงของคนอื่นเช็กที่ service)', async () => {
    // rules ไม่ผูกการปล่อยแผงกับ bookedBy (admin แก้เอกสารแผงได้อยู่แล้วตอนยกเลิก) การกันอยู่ที่ deleteBookingPermanently
    await seed('approved', {}, { stall: 'other' })
    await assertSucceeds(remove('admin1'))
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const snap = await getDoc(doc(ctx.firestore(), `${STALL}/s1`))
      assert.equal(snap.data().bookedBy.bookingId, 'other-booking') // ลบการจอง A แล้วแผงยังเป็นของ B
    })
  })

  test('แก้ audit log ของการลบไม่ได้แม้เป็น owner และ admin ลบไม่ได้', async () => {
    await seed('approved')
    await assertSucceeds(remove('owner1'))
    await assertFails(updateDoc(doc(tenant('owner1'), 'auditLogs/delete_bk1'), { reason: 'x' }))
    await assertFails(deleteDoc(doc(tenant('admin1'), 'auditLogs/delete_bk1')))
  })
})

describe('จองตามวัน/รอบ (bookingLocks)', () => {
  const SLIP = 'data:image/webp;base64,UklGRg=='
  const keyOf = (date, round = 'all') => `${date}_${round}`
  const lockId = (stallId, key) => `${stallId}_${key}`

  const slotBookingDoc = (uid, stallId, slots, over = {}) => ({
    tenantId: uid, stallId, stallNo: 'A1', customerName: uid, customerPhone: '0811111111', shopName: 'ร้านชา', goodsType: 'ชา',
    slots, firstDate: slots[0].split('_')[0], lastDate: slots[slots.length - 1].split('_')[0],
    pricePerSlot: 500, totalAmount: 500 * slots.length, amountDue: 500 * slots.length,
    slipHash: 'h', slipUploadedAt: serverTimestamp(), createdAt: serverTimestamp(), status: 'pending', ...over
  })
  const lockDoc = (stallId, key, bookingId, over = {}) => {
    const [date, roundId] = key.split('_')
    return { marketId: 'main-layout', stallId, date, roundId, slotKey: key, bookingId, status: 'pending', shopName: 'ร้านชา', createdAt: serverTimestamp(), ...over }
  }

  // จอง = booking + locks + สลิป + audit ใน batch เดียว (เหมือน transaction ในแอป)
  const slotBook = ({ uid = 'alice', stallId = 's1', id = 'sb1', slots = [keyOf('2026-10-17')], booking = {}, lockOver = {}, locks = slots, withSlip = true } = {}) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    const lastAuditId = addAudit(batch, db, uid, 'booking.create', id)
    batch.set(doc(db, `bookings/${id}`), slotBookingDoc(uid, stallId, slots, { lastAuditId, ...booking }))
    // จองเกิน 7 ช่อง lock ต้องมี seq (ลำดับใน booking.slots) เพื่อให้ rules ตรวจเป็นลูกโซ่
    for (const k of locks) {
      const seq = slots.length > 7 && slots.length <= 14 && slots.includes(k) ? { seq: slots.indexOf(k) } : {}
      const lock = lockDoc(stallId, k, id, { ...seq, ...lockOver })
      if (lock.seq === null) delete lock.seq // lockOver.seq = null -> ไม่ใส่ seq
      batch.set(doc(db, `bookingLocks/${lockId(stallId, k)}`), lock)
    }
    if (withSlip) batch.set(doc(db, `bookingSlips/${id}`), { tenantId: uid, marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    return batch.commit()
  }

  test('จอง 1 slot สำเร็จ และไม่แตะสถานะแผง', async () => {
    await assertSucceeds(slotBook())
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const snap = await getDoc(doc(ctx.firestore(), `${STALL}/s1`))
      assert.equal(snap.data().status, 'available')
    })
  })

  test('จอง 7 slot ในครั้งเดียวสำเร็จ (ไม่เกินเพดานการอ่านเอกสารของ rules)', async () => {
    const slots = ['10-17', '10-18', '10-19', '10-20', '10-21', '10-22', '10-23'].map(d => keyOf(`2026-${d}`))
    await assertSucceeds(slotBook({ slots }))
  })

  const manyDays = (n) => Array.from({ length: n }, (_, i) => keyOf(`2026-11-${String(i + 1).padStart(2, '0')}`))

  test('จอง 8 และ 14 slot ในครั้งเดียวสำเร็จ (ตรวจ lock แบบลูกโซ่)', async () => {
    await assertSucceeds(slotBook({ id: 'm8', slots: manyDays(8) }))
    await assertSucceeds(slotBook({ uid: 'bob', id: 'm14', slots: manyDays(14).map(k => k.replace('2026-11', '2026-12')) }))
  })

  const yearDays = (n, offset = 0) => Array.from({ length: n }, (_, i) => {
    const d = new Date(Date.UTC(2026, 10, 1 + offset + i))
    return keyOf(d.toISOString().slice(0, 10))
  })

  test('จอง 15 และ 365 slot ในครั้งเดียวสำเร็จ (batch 368 รายการ), 366 ไม่ผ่าน', async () => {
    await assertSucceeds(slotBook({ id: 'b15', slots: yearDays(15) }))
    await assertSucceeds(slotBook({ uid: 'bob', id: 'b365', slots: yearDays(365, 100) }))
    await assertFails(slotBook({ uid: 'carol', id: 'b366', slots: yearDays(366, 600) }))
  })

  test('จองเกิน 14 ช่องแต่ไม่มี lock ช่องแรก/ช่องสุดท้าย ไม่ผ่าน', async () => {
    const slots = yearDays(20)
    await assertFails(slotBook({ id: 'x1', slots, locks: slots.slice(1) }))
    await assertFails(slotBook({ id: 'x2', slots, locks: slots.slice(0, 19) }))
  })

  test('จองเกิน 14 ช่องแล้วใส่ seq ใน lock ไม่ผ่าน (กันตรวจลูกโซ่เกินเพดานการอ่าน)', async () => {
    await assertFails(slotBook({ id: 'y1', slots: yearDays(20), lockOver: { seq: 0 } }))
  })

  test('จองเกิน 7 slot แต่ขาด lock บางช่อง (กลางโซ่ / ช่องสุดท้าย) ไม่ผ่าน', async () => {
    const slots = manyDays(10)
    await assertFails(slotBook({ id: 'g1', slots, locks: slots.filter((_, i) => i !== 4) }))
    await assertFails(slotBook({ id: 'g2', slots, locks: slots.slice(0, 9) }))
    await assertFails(slotBook({ id: 'g3', slots, locks: slots.slice(1) }))
  })

  test('จองเกิน 7 slot แต่ lock ไม่มี seq หรือ seq ผิดลำดับ ไม่ผ่าน', async () => {
    const slots = manyDays(9)
    await assertFails(slotBook({ id: 'n1', slots, lockOver: { seq: null } }))
    await assertFails(slotBook({ id: 'n2', slots, lockOver: { seq: 0 } }))
  })

  test('สองบัญชีจอง slot เดียวกัน ผ่านได้บัญชีเดียว', async () => {
    await assertSucceeds(slotBook({ uid: 'alice', id: 'sa' }))
    await assertFails(slotBook({ uid: 'bob', id: 'sb' }))
  })

  test('คนละวันแผงเดียวกัน ผ่านทั้งคู่', async () => {
    await assertSucceeds(slotBook({ uid: 'alice', id: 'sa', slots: [keyOf('2026-10-17')] }))
    await assertSucceeds(slotBook({ uid: 'bob', id: 'sb', slots: [keyOf('2026-10-18')] }))
  })

  test('คนละรอบวันเดียวกัน ผ่านทั้งคู่ แต่รอบเดียวกันไม่ผ่าน', async () => {
    await assertSucceeds(slotBook({ uid: 'alice', id: 'sa', slots: [keyOf('2026-10-17', 'morning')] }))
    await assertSucceeds(slotBook({ uid: 'bob', id: 'sb', slots: [keyOf('2026-10-17', 'evening')] }))
    await assertFails(slotBook({ uid: 'carol', id: 'sc', slots: [keyOf('2026-10-17', 'morning')] }))
  })

  test('จองหลาย slot ที่มี slot หนึ่งถูกจองไปแล้ว ไม่ผ่านทั้งก้อน', async () => {
    await assertSucceeds(slotBook({ uid: 'alice', id: 'sa', slots: [keyOf('2026-10-18')] }))
    await assertFails(slotBook({ uid: 'bob', id: 'sb', slots: [keyOf('2026-10-17'), keyOf('2026-10-18')] }))
    // ก้อนที่ล้มต้องไม่ทิ้ง lock ของวัน 17 ไว้
    await assertSucceeds(slotBook({ uid: 'carol', id: 'sc', slots: [keyOf('2026-10-17')] }))
  })

  test('ปลอม totalAmount / pricePerSlot / amountDue ไม่ผ่าน', async () => {
    await assertFails(slotBook({ booking: { totalAmount: 1, amountDue: 1 } }))
    await assertFails(slotBook({ booking: { pricePerSlot: 1, totalAmount: 1, amountDue: 1 } }))
    await assertFails(slotBook({ slots: [keyOf('2026-10-17'), keyOf('2026-10-18')], booking: { totalAmount: 500, amountDue: 500 } }))
  })

  test('slot ซ้ำกันในการจองเดียว หรือฟิลด์แปลกปลอม ไม่ผ่าน', async () => {
    await assertFails(slotBook({ slots: [keyOf('2026-10-17'), keyOf('2026-10-17')], locks: [keyOf('2026-10-17')] }))
    await assertFails(slotBook({ booking: { decidedBy: 'alice' } }))
  })

  test('จองโดยไม่สร้าง lock (หรือขาด lock บาง slot) ไม่ผ่าน', async () => {
    await assertFails(slotBook({ locks: [] }))
    await assertFails(slotBook({ slots: [keyOf('2026-10-17'), keyOf('2026-10-18')], locks: [keyOf('2026-10-17')] }))
  })

  test('สร้าง lock ชี้ booking ของคนอื่น หรือ slot ที่ไม่อยู่ในการจอง ไม่ผ่าน', async () => {
    await assertSucceeds(slotBook({ uid: 'alice', id: 'sa', slots: [keyOf('2026-10-17')] }))
    const db = tenant('bob')
    const batch = writeBatch(db)
    batch.set(doc(db, `bookingLocks/${lockId('s1', keyOf('2026-10-20'))}`), lockDoc('s1', keyOf('2026-10-20'), 'sa'))
    await assertFails(batch.commit())
    await assertFails(setDoc(doc(db, `bookingLocks/${lockId('s1', keyOf('2026-10-21'))}`), lockDoc('s1', keyOf('2026-10-21'), 'no-such')))
  })

  test('lock ที่ id / slotKey ไม่ตรงกัน หรือสถานะไม่ใช่ pending ไม่ผ่าน', async () => {
    await assertFails(slotBook({ lockOver: { status: 'approved' } }))
    await assertFails(slotBook({ lockOver: { slotKey: '2026-10-18_all' } }))
    await assertFails(slotBook({ lockOver: { shopName: 'x'.repeat(61) } }))
  })

  test('แผงที่ปิด หรือถูกจองแบบเดิมอยู่ จองตาม slot ไม่ได้', async () => {
    await assertFails(slotBook({ stallId: 's3' }))
    await assertFails(slotBook({ stallId: 's2' }))
  })

  test('anonymous จองตาม slot ไม่ได้ และอ่าน lock ได้ทุกคน (รวมผู้ไม่ล็อกอิน)', async () => {
    await assertSucceeds(slotBook())
    await assertSucceeds(getDocs(query(collection(guest(), 'bookingLocks'), where('slotKey', '==', keyOf('2026-10-17')))))
    await assertFails(slotBook({ uid: 'anon1', id: 'sx' }))
  })

  describe('หลังจอง', () => {
    const decideSlot = (uid, patch, lockAction) => {
      const db = tenant(uid)
      const batch = writeBatch(db)
      const lastAuditId = addAudit(batch, db, uid, DECISION_ACTION[patch.status], 'sb1')
      batch.update(doc(db, 'bookings/sb1'), { decidedBy: uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId, ...patch })
      if (lockAction === 'approve') batch.update(doc(db, `bookingLocks/${lockId('s1', keyOf('2026-10-17'))}`), { status: 'approved' })
      if (lockAction === 'delete') batch.delete(doc(db, `bookingLocks/${lockId('s1', keyOf('2026-10-17'))}`))
      return batch.commit()
    }

    test('admin อนุมัติ: booking approved + lock approved โดยไม่แตะแผง', async () => {
      await assertSucceeds(slotBook({ id: 'sb1' }))
      await assertSucceeds(decideSlot('admin1', { status: 'approved' }, 'approve'))
    })

    test('admin ปฏิเสธ: ปล่อย lock แล้วคนอื่นจองต่อได้', async () => {
      await assertSucceeds(slotBook({ id: 'sb1' }))
      await assertSucceeds(decideSlot('admin1', { status: 'rejected', statusReason: 'ยอดไม่ตรง' }, 'delete'))
      await assertSucceeds(slotBook({ uid: 'bob', id: 'sb2' }))
    })

    test('ผู้เช่าอนุมัติ / แก้สถานะ lock เองไม่ได้', async () => {
      await assertSucceeds(slotBook({ id: 'sb1' }))
      await assertFails(decideSlot('alice', { status: 'approved' }, 'approve'))
      await assertFails(updateDoc(doc(tenant('alice'), `bookingLocks/${lockId('s1', keyOf('2026-10-17'))}`), { status: 'approved' }))
    })

    const cancelSlot = (uid, { deleteLocks = true, cancel = true } = {}) => {
      const db = tenant(uid)
      const batch = writeBatch(db)
      if (cancel) {
        const lastAuditId = addAudit(batch, db, uid, 'booking.cancel_self', 'sb1')
        batch.update(doc(db, 'bookings/sb1'), { status: 'cancelled', updatedAt: serverTimestamp(), lastAuditId })
      }
      if (deleteLocks) batch.delete(doc(db, `bookingLocks/${lockId('s1', keyOf('2026-10-17'))}`))
      return batch.commit()
    }

    test('ผู้เช่ายกเลิกการจองของตัวเอง + ปล่อย lock แล้วคนอื่นจอง slot นั้นได้', async () => {
      await assertSucceeds(slotBook({ id: 'sb1' }))
      await assertSucceeds(cancelSlot('alice'))
      await assertSucceeds(slotBook({ uid: 'bob', id: 'sb2' }))
    })

    test('ลบ lock โดยไม่ยกเลิกการจอง / ลบ lock ของคนอื่น ไม่ได้', async () => {
      await assertSucceeds(slotBook({ id: 'sb1' }))
      await assertFails(cancelSlot('alice', { cancel: false }))
      await assertFails(cancelSlot('bob', { cancel: false }))
    })

    test('การจอง 14 ช่อง: ผู้เช่ายกเลิก + ปล่อย lock ครบทุกช่อง แล้วคนอื่นจองได้', async () => {
      const slots = Array.from({ length: 14 }, (_, i) => keyOf(`2026-11-${String(i + 1).padStart(2, '0')}`))
      await assertSucceeds(slotBook({ id: 'sb1', slots }))
      const db = tenant('alice')
      const batch = writeBatch(db)
      const lastAuditId = addAudit(batch, db, 'alice', 'booking.cancel_self', 'sb1')
      batch.update(doc(db, 'bookings/sb1'), { status: 'cancelled', updatedAt: serverTimestamp(), lastAuditId })
      for (const k of slots) batch.delete(doc(db, `bookingLocks/${lockId('s1', k)}`))
      await assertSucceeds(batch.commit())
      await assertSucceeds(slotBook({ uid: 'bob', id: 'sb2', slots }))
    })

    test('การจอง 14 ช่อง: admin อนุมัติ (lock ทุกช่องเป็น approved) ได้', async () => {
      const slots = Array.from({ length: 14 }, (_, i) => keyOf(`2026-11-${String(i + 1).padStart(2, '0')}`))
      await assertSucceeds(slotBook({ id: 'sb1', slots }))
      const db = tenant('admin1')
      const batch = writeBatch(db)
      const lastAuditId = addAudit(batch, db, 'admin1', 'booking.approve', 'sb1')
      batch.update(doc(db, 'bookings/sb1'), { status: 'approved', decidedBy: 'admin1', decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId })
      for (const k of slots) batch.update(doc(db, `bookingLocks/${lockId('s1', k)}`), { status: 'approved' })
      await assertSucceeds(batch.commit())
    })

    test('ยกเลิกโดยไม่มี audit log ไม่ผ่าน', async () => {
      await assertSucceeds(slotBook({ id: 'sb1' }))
      const db = tenant('alice')
      await assertFails(updateDoc(doc(db, 'bookings/sb1'), { status: 'cancelled', updatedAt: serverTimestamp() }))
    })
  })

  describe('ตั้งค่าตลาด (markets/{id}.settings)', () => {
    const settings = (over = {}) => ({ openWeekdays: [6, 0], maxAdvanceDays: 30, rounds: [{ id: 'morning', label: 'เช้า' }], ...over })

    test('admin ตั้งค่าได้ ผู้เช่าตั้งค่าไม่ได้', async () => {
      await assertSucceeds(updateDoc(doc(tenant('admin1'), 'markets/main-layout'), { settings: settings() }))
      await assertFails(updateDoc(doc(tenant('alice'), 'markets/main-layout'), { settings: settings() }))
    })

    test('รอบเกิน 6 รอบ หรือ settings ไม่ใช่ map ไม่ผ่าน', async () => {
      const rounds = Array.from({ length: 7 }, (_, i) => ({ id: `r${i}`, label: `รอบ ${i}` }))
      await assertFails(updateDoc(doc(tenant('admin1'), 'markets/main-layout'), { settings: settings({ rounds }) }))
      await assertFails(updateDoc(doc(tenant('admin1'), 'markets/main-layout'), { settings: 'x' }))
    })

    test('admin บันทึกผัง (ไม่แตะ settings) ยังผ่านเมื่อมี settings อยู่ และ settings ไม่หาย', async () => {
      await assertSucceeds(updateDoc(doc(tenant('admin1'), 'markets/main-layout'), { settings: settings() }))
      await assertSucceeds(setDoc(doc(tenant('admin1'), 'markets/main-layout'), { name: 'ตลาดใหม่', zones: [], updatedAt: 'x' }, { merge: true }))
      const snap = await getDoc(doc(tenant('admin1'), 'markets/main-layout'))
      assert.deepEqual(snap.data().settings.openWeekdays, [6, 0])
    })
  })
})
