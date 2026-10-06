// สร้าง/อัปเดตบัญชี owner/admin (รันบนเครื่องคุณเท่านั้น)
//   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\keys\market-sa.json"
//   npm run seed:staff -- --username owner001 --role owner
//   บัญชีอีเมลจริง + สิทธิ์สูงสุด (สลับ owner/admin/user ได้):
//   npm run seed:staff -- --email me@example.com --role owner --super
import readline from 'node:readline'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

const DOMAIN = process.env.VITE_STAFF_EMAIL_DOMAIN || 'staff.market-booking-project.web.app'
const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'market-booking-project'

function arg(name) {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : undefined
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    if (hidden) {
      rl._writeToOutput = (s) => { if (s.includes(question)) rl.output.write(s) }
    }
    rl.question(question, (answer) => {
      rl.close()
      if (hidden) process.stdout.write('\n')
      resolve(answer)
    })
  })
}

const rawEmail = (arg('email') || '').trim().toLowerCase()
const username = rawEmail ? rawEmail.split('@')[0] : (arg('username') || '').trim().toLowerCase()
const role = arg('role')
const superUser = process.argv.includes('--super')

if (rawEmail ? !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rawEmail) : !/^[a-z0-9._-]{3,32}$/.test(username)) {
  console.error('--username ต้องเป็น a-z 0-9 . _ - ยาว 3-32 ตัว (หรือใช้ --email ที่ถูกต้อง)')
  process.exit(1)
}
if (superUser && role !== 'owner') {
  console.error('--super ใช้ได้กับ --role owner เท่านั้น')
  process.exit(1)
}
if (!['owner', 'admin'].includes(role)) {
  console.error("--role ต้องเป็น 'owner' หรือ 'admin'")
  process.exit(1)
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('ตั้งค่า GOOGLE_APPLICATION_CREDENTIALS เป็น path ของ service account JSON ก่อน')
  process.exit(1)
}

const password = await ask('รหัสผ่าน: ', { hidden: true })
if (password.length < 6) {
  console.error('รหัสผ่านต้องยาวอย่างน้อย 6 ตัว (Firebase บังคับ)')
  process.exit(1)
}
if (password.length < 10) console.warn('คำเตือน: รหัสสั้นกว่า 10 ตัว เดาง่าย — ระบบจะบังคับเปลี่ยนตอนล็อกอินครั้งแรก')

initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID })
const auth = getAuth()
const db = getFirestore()
const email = rawEmail || `${username}@${DOMAIN}`

let user = null
try { user = await auth.getUserByEmail(email) } catch (e) { if (e.code !== 'auth/user-not-found') throw e }

if (user) {
  const ok = (await ask(`มีบัญชี ${email} อยู่แล้ว รีเซ็ตรหัสและตั้ง role = ${role}? (yes/no): `)).trim().toLowerCase()
  if (ok !== 'yes') { console.log('ยกเลิก'); process.exit(0) }
  user = await auth.updateUser(user.uid, { password })
} else {
  user = await auth.createUser({ email, password, displayName: username })
}

await db.doc(`users/${user.uid}`).set({
  uid: user.uid,
  username,
  displayName: username.replace(/(\d+)$/, ' $1').replace(/^./, c => c.toUpperCase()),
  email,
  role,
  superUser,
  mustChangePassword: true,
  createdAt: FieldValue.serverTimestamp()
}, { merge: true })

console.log(`เรียบร้อย: ${email} (${role}) uid=${user.uid}`)
process.exit(0)
