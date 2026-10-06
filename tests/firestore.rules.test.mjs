// ทดสอบ firestore.rules ด้วย Firestore emulator
// รัน: npm run test:rules  (ต้องมี firebase-tools และ Java)
import { readFileSync } from 'node:fs'
import { after, before, beforeEach, describe, test } from 'node:test'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where, writeBatch } from 'firebase/firestore'

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
    await assertSucceeds(updateDoc(doc(tenant('alice'), `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('alice'), updatedAt: 'x' }))
  })

  test('tenant จองในชื่อคนอื่นไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('bob') }))
  })

  test('tenant แย่งแผงที่ถูกจองแล้ว หรือแผงที่ปิดให้บริการ ไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s2`), { status: 'booked', bookedBy: bookedBy('alice') }))
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s3`), { status: 'booked', bookedBy: bookedBy('alice') }))
  })

  test('tenant ยกเลิกการจอง (ของตัวเองหรือคนอื่น) ผ่านเอกสารแผงไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant('bob'), `${STALL}/s2`), { status: 'available', bookedBy: null }))
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s2`), { status: 'available', bookedBy: null }))
  })

  test('tenant แก้ตำแหน่ง ราคา หรือฟิลด์อื่นของแผงไม่ได้ แม้ตอนจอง', async () => {
    const db = tenant('alice')
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { x: 999 }))
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { price: 1 }))
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('alice'), price: 1 }))
    await assertFails(updateDoc(doc(db, `${STALL}/s1`), { status: 'disabled' }))
  })

  test('bookedBy ที่ใส่ชื่อ/เบอร์โทรเพิ่มไม่ได้ (กันข้อมูลส่วนตัวรั่วสู่สาธารณะ)', async () => {
    await assertFails(updateDoc(doc(tenant('alice'), `${STALL}/s1`), {
      status: 'booked',
      bookedBy: { ...bookedBy('alice'), name: 'Alice', phone: '0811111111' }
    }))
  })

  test('tenant สร้างหรือลบแผงไม่ได้', async () => {
    await assertFails(setDoc(doc(tenant(), `${STALL}/s9`), { stallNo: 'Z9', status: 'available' }))
    await assertFails(deleteDoc(doc(tenant(), `${STALL}/s1`)))
  })

  test('anonymous และคนไม่ล็อกอิน จองไม่ได้', async () => {
    await assertFails(updateDoc(doc(anon(), `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('anon1') }))
    await assertFails(updateDoc(doc(guest(), `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('x') }))
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

  test('batch เดียวที่จองแผง + สร้างรายการจอง (เหมือน transaction) สำเร็จ', async () => {
    const db = tenant('alice')
    const batch = writeBatch(db)
    batch.update(doc(db, `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('alice', 'bk-new'), updatedAt: 'x' })
    batch.set(doc(db, 'bookings/bk-new'), { tenantId: 'alice', stallId: 's1', customerName: 'Alice', customerPhone: '0811111111', status: 'confirmed' })
    await assertSucceeds(batch.commit())
  })

  test('สร้างรายการจองเดี่ยว ๆ โดยแผงไม่ได้ถูกจองในชื่อตัวเอง ไม่ได้', async () => {
    await assertFails(setDoc(doc(tenant('alice'), 'bookings/b4'), { tenantId: 'alice', stallId: 's1' }))
  })

  test('จองในชื่อคนอื่น และ anonymous จองไม่ได้', async () => {
    const db = tenant('alice')
    const batch = writeBatch(db)
    batch.update(doc(db, `${STALL}/s1`), { status: 'booked', bookedBy: bookedBy('alice', 'bk-x') })
    batch.set(doc(db, 'bookings/bk-x'), { tenantId: 'bob', stallId: 's1' })
    await assertFails(batch.commit())
    await assertFails(setDoc(doc(anon(), 'bookings/b3'), { tenantId: 'anon1', stallId: 's1' }))
  })

  test('tenant แก้/ลบรายการจองไม่ได้ แต่ admin ทำได้', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'bookings/b1'), { tenantId: 'bob', stallId: 's1' })
    })
    await assertFails(updateDoc(doc(tenant('bob'), 'bookings/b1'), { status: 'x' }))
    await assertFails(deleteDoc(doc(tenant('bob'), 'bookings/b1')))
    await assertSucceeds(updateDoc(doc(tenant('admin1'), 'bookings/b1'), { status: 'cancelled' }))
  })
})
