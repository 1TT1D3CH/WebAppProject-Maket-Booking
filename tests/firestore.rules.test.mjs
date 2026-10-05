// ทดสอบ firestore.rules ด้วย Firestore emulator
// รัน: npm run test:rules  (ต้องมี firebase-tools และ Java)
import { readFileSync } from 'node:fs'
import { after, before, beforeEach, describe, test } from 'node:test'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'

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
    await setDoc(doc(db, 'markets/main-layout'), { name: 'ตลาด', zones: [], stalls: [] })
    await setDoc(doc(db, 'notifications/n-bob'), { tenantId: 'bob', title: 'x', isRead: false })
  })
})

const tenant = (uid = 'alice') => testEnv.authenticatedContext(uid, { firebase: { sign_in_provider: 'password' } }).firestore()
const anon = () => testEnv.authenticatedContext('anon1', { firebase: { sign_in_provider: 'anonymous' } }).firestore()
const guest = () => testEnv.unauthenticatedContext().firestore()

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

describe('markets / stalls (B1, B2)', () => {
  test('ทุกคนอ่านผังได้', async () => {
    await assertSucceeds(getDoc(doc(guest(), 'markets/main-layout')))
  })

  test('tenant แก้ชื่อ/โซนของผังไม่ได้', async () => {
    await assertFails(updateDoc(doc(tenant(), 'markets/main-layout'), { name: 'hacked' }))
    await assertFails(updateDoc(doc(tenant(), 'markets/main-layout'), { zones: [{ id: 'z' }] }))
  })

  test('tenant ลบหรือสร้างผังไม่ได้', async () => {
    await assertFails(deleteDoc(doc(tenant(), 'markets/main-layout')))
    await assertFails(setDoc(doc(tenant(), 'markets/other'), { name: 'x' }))
  })

  test('anonymous แก้ stalls ในผังไม่ได้', async () => {
    await assertFails(updateDoc(doc(anon(), 'markets/main-layout'), { stalls: [] , updatedAt: 'x' }))
  })

  test('admin แก้ผังได้', async () => {
    await assertSucceeds(updateDoc(doc(tenant('admin1'), 'markets/main-layout'), { name: 'ใหม่' }))
  })

  test('tenant เขียน stalls collection ไม่ได้ แต่ admin เขียนได้', async () => {
    await assertFails(setDoc(doc(tenant(), 'stalls/s1'), { stallNo: 'A1' }))
    await assertSucceeds(setDoc(doc(tenant('admin1'), 'stalls/s1'), { stallNo: 'A1' }))
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

describe('bookings (B1)', () => {
  test('ผู้ที่ไม่ล็อกอินอ่านการจองไม่ได้', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'bookings/b1'), { tenantId: 'bob', stallId: 's1' })
    })
    await assertFails(getDoc(doc(guest(), 'bookings/b1')))
    await assertFails(getDoc(doc(tenant('alice'), 'bookings/b1')))
    await assertSucceeds(getDoc(doc(tenant('bob'), 'bookings/b1')))
  })

  test('จองได้เฉพาะในชื่อตัวเอง และ anonymous จองไม่ได้', async () => {
    await assertFails(setDoc(doc(tenant('alice'), 'bookings/b2'), { tenantId: 'bob', stallId: 's1' }))
    await assertFails(setDoc(doc(anon(), 'bookings/b3'), { tenantId: 'anon1', stallId: 's1' }))
    await assertSucceeds(setDoc(doc(tenant('alice'), 'bookings/b4'), { tenantId: 'alice', stallId: 's1' }))
  })
})
