// ลบสมาชิกทั้งหมด: บัญชี Firebase Auth ทุกบัญชี + เอกสาร users/{uid} ทุกรายการ (รันบนเครื่องคุณเท่านั้น)
//   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\keys\market-sa.json"
//   npm run delete:members            (แสดงจำนวนและขอยืนยันก่อนลบ)
// ไม่แตะ markets / bookings / notifications; ลบแล้วกู้คืนไม่ได้
import readline from 'node:readline'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'market-booking-project'

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('ตั้งค่า GOOGLE_APPLICATION_CREDENTIALS เป็น path ของ service account JSON ก่อน')
  process.exit(1)
}

initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID })
const auth = getAuth()
const db = getFirestore()

const uids = []
let pageToken
do {
  const page = await auth.listUsers(1000, pageToken)
  page.users.forEach(u => uids.push({ uid: u.uid, email: u.email }))
  pageToken = page.pageToken
} while (pageToken)

const userDocs = await db.collection('users').listDocuments()

console.log(`โปรเจกต์: ${PROJECT_ID}`)
console.log(`บัญชี Auth: ${uids.length} | เอกสาร users: ${userDocs.length}`)
uids.slice(0, 50).forEach(u => console.log(`  - ${u.email || u.uid}`))
if (uids.length > 50) console.log(`  ... และอีก ${uids.length - 50} บัญชี`)

if (!uids.length && !userDocs.length) {
  console.log('ไม่มีสมาชิกให้ลบ')
  process.exit(0)
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const answer = await new Promise(r => rl.question(`\nพิมพ์ ${PROJECT_ID} เพื่อยืนยันลบทั้งหมด (กู้คืนไม่ได้): `, r))
rl.close()
if (answer.trim() !== PROJECT_ID) { console.log('ยกเลิก ไม่มีอะไรถูกลบ'); process.exit(0) }

for (let i = 0; i < uids.length; i += 1000) {
  const res = await auth.deleteUsers(uids.slice(i, i + 1000).map(u => u.uid))
  console.log(`ลบ Auth สำเร็จ ${res.successCount}, ล้มเหลว ${res.failureCount}`)
  res.errors.forEach(e => console.error('  ', e.error.message))
}

const writer = db.bulkWriter()
userDocs.forEach(ref => writer.delete(ref))
await writer.close()
console.log(`ลบเอกสาร users ${userDocs.length} รายการแล้ว`)
process.exit(0)
