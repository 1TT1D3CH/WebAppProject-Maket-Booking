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
    batch.update(doc(db, `${STALL}/${stallId}`), { status: stallStatus, bookedBy: bookedBy(uid, id), updatedAt: 'x' })
    batch.set(doc(db, `bookings/${id}`), newBooking({ tenantId: uid, stallId, ...booking }))
    if (withSlip) batch.set(doc(db, `bookingSlips/${id}`), slipDoc({ tenantId: uid, ...slip }))
    return batch.commit()
  }

  test('จองพร้อมแนบสลิป (แผง pending + booking pending + สลิป) สำเร็จ', async () => {
    await assertSucceeds(bookBatch())
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
    batch.set(doc(db, 'bookings/bk-x'), newBooking({ tenantId: 'bob' }))
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
    batch.update(doc(db, `bookings/${id}`), { decidedBy: uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), ...bookingPatch })
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
    batch.update(doc(db, 'bookings/bk1'), {
      status: 'pending', statusReason: deleteField(), slipHash: 'new',
      slipUploadedAt: serverTimestamp(), updatedAt: serverTimestamp(), ...booking
    })
    if (withSlip) {
      batch.set(doc(db, 'bookingSlips/bk1'), { tenantId: uid, marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp(), ...slip })
    }
    return batch.commit()
  }

  const cancel = (uid = 'alice', { releaseStall = true } = {}) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    batch.update(doc(db, 'bookings/bk1'), { status: 'cancelled', updatedAt: serverTimestamp() })
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
    batch.update(doc(db, `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('alice', 'bk-flow'), updatedAt: 'x' })
    batch.set(doc(db, 'bookings/bk-flow'), {
      tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111', goodsType: 'ชา',
      amountDue: 500, slipHash: 'h1', slipUploadedAt: serverTimestamp(), createdAt: serverTimestamp(), status: 'pending'
    })
    batch.set(doc(db, 'bookingSlips/bk-flow'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    await batch.commit()
  }
  const adminDecide = async (uid, bookingPatch, stallPatch) => {
    const db = tenant(uid)
    const batch = writeBatch(db)
    batch.update(doc(db, 'bookings/bk-flow'), { decidedBy: uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), ...bookingPatch })
    if (stallPatch) batch.update(doc(db, `${STALL}/s1`), stallPatch)
    await batch.commit()
  }

  test('จอง -> admin ขอสลิปใหม่ -> ผู้เช่าส่งใหม่ -> owner อนุมัติ -> แผงเป็น booked', async () => {
    await book()
    await adminDecide('admin1', { status: 'needs_slip', statusReason: 'รูปไม่ชัด' }, null)
    const db = tenant('alice')
    const batch = writeBatch(db)
    batch.update(doc(db, 'bookings/bk-flow'), { status: 'pending', statusReason: deleteField(), slipHash: 'h2', slipUploadedAt: serverTimestamp(), updatedAt: serverTimestamp() })
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
    b1.update(doc(adb, `${STALL}/s1`), { status: 'pending', bookedBy: bookedBy('alice', 'bk-t'), updatedAt: 'x' })
    b1.set(doc(adb, 'bookings/bk-t'), {
      tenantId: 'alice', stallId: 's1', stallNo: 'A1', customerName: 'Alice', customerPhone: '0811111111', goodsType: 'ชา',
      amountDue: 500, slipHash: 'h1', slipUploadedAt: serverTimestamp(), createdAt: serverTimestamp(), status: 'pending'
    })
    b1.set(doc(adb, 'bookingSlips/bk-t'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    await assertSucceeds(b1.commit())
    const mdb = tenant('admin1')
    await assertSucceeds(updateDoc(doc(mdb, 'bookings/bk-t'), {
      status: 'needs_slip', statusReason: 'ยอดไม่ตรง', decidedBy: 'admin1', decidedAt: serverTimestamp(), updatedAt: serverTimestamp()
    }))

    const db = tenant('alice')
    await assertSucceeds(runTransaction(db, async (tx) => {
      const ref = doc(db, 'bookings/bk-t')
      const snap = await tx.get(ref)
      if (snap.data().status !== 'needs_slip') throw new Error('bad status')
      tx.update(ref, { status: 'pending', statusReason: deleteField(), slipHash: 'h2', slipUploadedAt: serverTimestamp(), updatedAt: serverTimestamp() })
      tx.set(doc(db, 'bookingSlips/bk-t'), { tenantId: 'alice', marketId: 'main-layout', dataUrl: SLIP, mime: 'image/webp', bytes: 10, createdAt: serverTimestamp() })
    }))
  })
})
