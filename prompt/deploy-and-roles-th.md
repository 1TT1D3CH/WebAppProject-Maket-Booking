# Prompt: Deploy ขึ้น Firebase Hosting + ล็อกอิน Owner/Admin ด้วยชื่อผู้ใช้

วิธีใช้
1. ทำ `fix-prompts-th.md` **ระยะ 1** ให้เสร็จก่อน (rules ที่เช็ค role, ลบ demo role switch, Admin Builder เช็คสิทธิ์)
   ไม่อย่างนั้นพอขึ้นลิงก์แล้วใครก็กดเป็น Owner และแก้ผังได้
2. เปิด AI coding agent ที่ root ของ repo วาง **"ส่วนหัว"** ตามด้วย **ส่วน 1** ก่อน ทดสอบ แล้วค่อยวาง **ส่วน 2**
   (ทำส่วน 1 ก่อน เพราะส่วน 2 จะ deploy โค้ดที่มีระบบสิทธิ์แล้ว)
3. ทำ **"สิ่งที่คุณต้องทำเอง"** ท้ายไฟล์

### เรื่องรหัสผ่านที่ขอมา (สำคัญ อ่านก่อน)

| บทบาท | ชื่อผู้ใช้ | รหัสที่ขอ | ปัญหา |
|---|---|---|---|
| Owner | `owner001` | `ONWER` | 5 ตัว Firebase บังคับขั้นต่ำ 6 ตัว **สร้างบัญชีไม่ผ่าน** |
| Admin | `admin001` | `ADMIN` | 5 ตัว **สร้างบัญชีไม่ผ่าน** เหมือนกัน |

- ผมใช้ `owner001` (สะกด owner) ถ้าตั้งใจให้เป็น `onwer001` ตามที่พิมพ์ ให้แก้ชื่อตอนรัน seed ในส่วน 1 ได้เลย
- รหัสแบบนี้เดาง่ายมาก และลิงก์ `.web.app` ใครก็เปิดได้ ใครเดาได้ก็แก้ผังและอนุมัติการจองได้ทันที
  แนะนำให้ใช้รหัสยาว 10 ตัวขึ้นไปตั้งแต่แรก ถ้าอยากได้รหัสจำง่ายไว้ทดสอบ ให้ใช้ชั่วคราว
  เช่น `ONWER001` / `ADMIN001` แล้วเปลี่ยนทันทีหลังล็อกอินครั้งแรก (ส่วน 1 มีหน้าเปลี่ยนรหัสให้)
- รหัสผ่านจะ**ไม่ถูกเขียนลงในโค้ด**เลย ใส่ตอนรัน seed script บนเครื่องคุณเท่านั้น
  ใครเปิดดูโค้ดเว็บก็ไม่เห็นรหัส และไม่มีการเช็ค role ฝั่งเว็บที่โกงได้

---

## ส่วนหัว (ใช้ทุกส่วน)

```
คุณคือนักพัฒนา Vue 3 + Pinia + Firebase (Firestore, Auth, Storage, Hosting) ที่ทำงานใน repo
"Dynamic Market Stall Booking System" (Firebase project id: market-booking-project)

บริบท:
- แก้ไขตาม code review ระยะ 1 เสร็จแล้ว (ตรวจ git log): firestore.rules เช็ค role จาก users/{uid}.role
  (isAdmin() = role in ['admin','owner'], isOwner() = role == 'owner'), authStore ใช้ onAuthStateChanged
  แล้วโหลด role จาก users/{uid}, ปุ่ม demo role แสดงเฉพาะ DEV/VITE_DEMO_MODE
- ถ้าระยะ 1 ยังไม่เสร็จ (เช่น rules ยังให้ทุกคนเป็น admin หรือยังมี DEMO_USERS ใน production build)
  ให้หยุดแล้วบอกผมก่อน ห้ามทำต่อ
- ถ้าโค้ดจริงต่างจากที่ prompt นี้อธิบาย ให้ยึดโค้ดจริง ปรับวิธีทำให้เข้ากัน และบอกผมในสรุปว่าต่างตรงไหน

กติกาการทำงาน:
1. ทำเฉพาะงานในส่วนนี้ ห้ามขยายขอบเขต ห้าม refactor สิ่งที่ไม่เกี่ยวข้อง
2. commit ย่อย ข้อความขึ้นต้นด้วย feat/fix/chore และรหัสส่วน เช่น "feat(DR-1): ล็อกอินด้วยชื่อผู้ใช้"
3. หลังแต่ละ commit รัน `npm run build` ต้องผ่าน ถ้ามี lint/test ให้รันด้วย
4. ห้ามรัน `firebase deploy`, ห้ามสร้าง/ลบบัญชีหรือข้อมูลจริงใน Firebase, ห้าม force push
   ให้เตรียมไฟล์แล้วบอกคำสั่งให้ผมรันเอง
5. ห้ามเขียนรหัสผ่าน, ชื่อบัญชี owner/admin คู่กับรหัส, หรือ service account key ลงในโค้ดหรือ commit
   ห้ามเช็คสิทธิ์ด้วยการเทียบชื่อผู้ใช้/อีเมลในฝั่ง client (เช่น if (username === 'admin001'))
   สิทธิ์มาจาก users/{uid}.role เท่านั้น และ firestore.rules เป็นตัวบังคับจริง
6. ข้อความ UI เป็นภาษาไทย ใช้สไตล์และ component เดิม รองรับ dark mode และมือถือ
7. จบงานให้สรุป: ทำอะไรไป, ไฟล์ที่แก้, สิ่งที่ผมต้องทำเอง (เป็นขั้นตอนพร้อมคำสั่ง), วิธีทดสอบ
```

---

## ส่วน 1: ล็อกอิน Owner/Admin ด้วยชื่อผู้ใช้ (บัญชีจริงใน Firebase Auth)

```
ส่วน DR-1: ให้ owner/admin ล็อกอินด้วยชื่อผู้ใช้ เช่น owner001, admin001
แบบปลอดภัย: เป็นบัญชี Email/Password จริงใน Firebase Auth และ role เก็บใน users/{uid}.role

แนวคิด:
- ชื่อผู้ใช้ map เป็นอีเมลภายใน: `${username}@${VITE_STAFF_EMAIL_DOMAIN}`
  ค่าเริ่มต้นของโดเมน: staff.market-booking-project.web.app (ไม่ต้องรับอีเมลได้จริง ใช้แค่เป็นชื่อบัญชี)
- ลูกค้า (tenant) ยังสมัครและล็อกอินด้วยอีเมลจริง/Google เหมือนเดิม

1) ฟอร์มล็อกอิน (AuthModal หรือที่ใช้จริง)
   - ช่องแรกเปลี่ยน label เป็น "อีเมล หรือ ชื่อผู้ใช้"
   - ถ้าค่าที่กรอกไม่มี '@' ให้ trim, toLowerCase, ตรวจรูปแบบ /^[a-z0-9._-]{3,32}$/
     แล้วต่อโดเมนจาก import.meta.env.VITE_STAFF_EMAIL_DOMAIN ก่อนเรียก signInWithEmailAndPassword
     ถ้ามี '@' ให้ใช้เป็นอีเมลตามเดิม
   - แยก logic นี้เป็นฟังก์ชันเดียว เช่น src/utils/loginId.js -> toLoginEmail(input) พร้อม unit test ถ้ามี test runner
   - ข้อความ error ภาษาไทยที่ไม่บอกว่าผิดที่ชื่อหรือรหัส: "ชื่อผู้ใช้/อีเมล หรือรหัสผ่านไม่ถูกต้อง"
     และจัดการ auth/too-many-requests ("ลองผิดหลายครั้ง กรุณารอสักครู่")
   - หลังล็อกอินสำเร็จ role มาจาก authStore (users/{uid}.role) เท่านั้น
     ถ้าเป็น admin/owner ให้ไปหน้า/โหมด Admin Builder ได้, tenant ไปหน้าลูกค้า
   - เพิ่ม VITE_STAFF_EMAIL_DOMAIN ใน .env.example (ไม่มีค่าลับ ใส่ค่าเริ่มต้นได้)

2) กันการสมัครด้วยโดเมนภายใน
   - ฟอร์มสมัครสมาชิก: ปฏิเสธอีเมลที่ลงท้ายด้วย @${VITE_STAFF_EMAIL_DOMAIN}
   - rules ของ users/{userId} ตอน create ยังบังคับ role == 'tenant' เหมือนเดิม
     (ต่อให้ใครสมัครด้วยโดเมนนี้ผ่าน API ตรง ก็ได้แค่ tenant)

3) Seed script สร้างบัญชี owner/admin (รันครั้งเดียวบนเครื่องผม)
   - สร้าง scripts/seed-staff.mjs ใช้ firebase-admin (เพิ่มเป็น devDependency)
   - อ่าน service account จาก env GOOGLE_APPLICATION_CREDENTIALS (path ไฟล์ JSON นอก repo)
   - รับค่าจาก argument: --username owner001 --role owner และถามรหัสผ่านแบบซ่อนตัวอักษรใน terminal
     (ห้ามรับรหัสผ่านทาง argument หรืออ่านจากไฟล์ใน repo)
   - role ต้องเป็น 'owner' หรือ 'admin' เท่านั้น, ตรวจรหัสยาวอย่างน้อย 6 ตัว
     ถ้าสั้นกว่า 10 ตัวให้พิมพ์คำเตือนว่าเดาง่าย แต่ยังให้สร้างได้
   - ถ้าบัญชีอีเมลนั้นมีอยู่แล้ว: ถามยืนยันก่อนรีเซ็ตรหัส/อัปเดต role
   - สร้าง/อัปเดต users/{uid}: { username, displayName (เช่น "Owner 001"), email, role,
     mustChangePassword: true, createdAt: serverTimestamp() } โดยไม่ลบฟิลด์อื่นที่มีอยู่ (merge)
   - เพิ่ม npm script: "seed:staff": "node scripts/seed-staff.mjs"
   - เพิ่มใน .gitignore: serviceAccount*.json, *-firebase-adminsdk-*.json
   - เขียนวิธีใช้ใน README (หัวข้อ "สร้างบัญชี Owner/Admin") รวมวิธีทำผ่าน Firebase Console แทนได้:
     Authentication > Add user ด้วยอีเมล owner001@<โดเมน> แล้วสร้าง doc users/{uid} ใส่ role = 'owner'

4) บังคับเปลี่ยนรหัสหลังล็อกอินครั้งแรก
   - ถ้า users/{uid}.mustChangePassword == true ให้แสดงหน้า/โมดัล "ตั้งรหัสผ่านใหม่" ก่อนใช้งานอย่างอื่น
     ใช้ reauthenticateWithCredential แล้ว updatePassword, รหัสใหม่อย่างน้อย 10 ตัว และต้องไม่เท่ารหัสเดิม
   - สำเร็จแล้ว set mustChangePassword = false
   - rules: เจ้าของ doc แก้ mustChangePassword จาก true เป็น false ได้เอง แต่ห้ามแก้ role
     (ใช้ diff().affectedKeys().hasOnly([...]) ให้สอดคล้องกับ rules เดิม)
   - เพิ่มเมนู "เปลี่ยนรหัสผ่าน" ในเมนูผู้ใช้สำหรับทุกคนที่ล็อกอินด้วยรหัสผ่าน

5) ตรวจว่าไม่มีทางลัดเหลือใน production
   - ค้นทั้ง src/ หา DEMO_USERS, demo role switch, setRole/role ที่ตั้งจาก client, การเทียบ username/อีเมล
     กับ 'admin'/'owner', localStorage ที่เก็บ role แล้วรายงานผล
   - ยืนยันว่า build production (`npm run build`) ไม่มีปุ่ม demo role และไม่มีโค้ด DEMO_USERS ใน dist
     (grep ใน dist/assets)
   - ถ้ามี emulator ให้เพิ่ม rules test: tenant ตั้ง role ตัวเองเป็น admin ไม่ได้,
     tenant แก้ mustChangePassword คนอื่นไม่ได้, admin แก้ role คนอื่นไม่ได้ (เฉพาะ owner)

ทดสอบ (เขียนในสรุป): รัน seed สร้าง owner001 และ admin001 บนโปรเจกต์ทดสอบหรือ emulator
-> ล็อกอินด้วย "owner001" + รหัส -> ถูกบังคับเปลี่ยนรหัส -> เห็น Admin Builder และเมนูของ owner;
admin001 เห็น Admin Builder แต่ไม่เห็นเมนูเฉพาะ owner; ลูกค้าล็อกอินด้วยอีเมลได้เหมือนเดิม;
พิมพ์ชื่อผู้ใช้ผิดได้ข้อความ error กลาง ๆ
```

---

## ส่วน 2: Deploy ขึ้น Firebase Hosting

```
ส่วน DR-2: เตรียม repo ให้ deploy ขึ้น Firebase Hosting ได้ด้วยคำสั่งเดียว (ผมจะรัน deploy เอง)

1) firebase.json (สร้างใหม่หรือแก้ของเดิม ห้ามลบ config ที่มีอยู่โดยไม่บอก)
   - hosting:
     "public": "dist", "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
     "rewrites": [{ "source": "**", "destination": "/index.html" }]  (SPA, รีเฟรชหน้า /admin แล้วไม่ 404)
     headers: /assets/** ใส่ Cache-Control "public, max-age=31536000, immutable"
              /index.html ใส่ Cache-Control "no-cache" (deploy ใหม่แล้วผู้ใช้เห็นทันที)
   - firestore: { "rules": "firestore.rules", "indexes": "firestore.indexes.json" }
     (ถ้ายังไม่มี firestore.indexes.json ให้สร้างแบบว่าง { "indexes": [], "fieldOverrides": [] })
   - ถ้าแอปใช้ Firebase Storage (เช่นสลิป): "storage": { "rules": "storage.rules" }
     และถ้ายังไม่มี storage.rules ให้เขียน: อ่าน/เขียนได้เฉพาะเจ้าของไฟล์หรือ admin, จำกัดชนิดไฟล์รูป/PDF
     และขนาดไม่เกิน 5MB (เขียนให้สอดคล้องกับ path ที่โค้ดใช้จริง)

2) .firebaserc
   { "projects": { "default": "market-booking-project" } }

3) package.json scripts
   - "deploy": "npm run build && firebase deploy --only hosting,firestore:rules,firestore:indexes"
     (เพิ่ม ",storage" ถ้ามี storage.rules)
   - "deploy:hosting": "npm run build && firebase deploy --only hosting"
   - "deploy:rules": "firebase deploy --only firestore:rules,firestore:indexes"
   - ใส่ firebase-tools เป็น devDependency แล้วให้ script เรียกผ่าน npx ได้ (ผมไม่ต้องติดตั้ง global ก็ได้)

4) ค่า environment ตอน build
   - Vite อ่าน VITE_FIREBASE_* ตอน build: ตรวจว่า build จะใช้ .env.production หรือ .env ที่มีค่าครบ
     ถ้าขาดตัวไหนให้ build fail พร้อมข้อความที่เข้าใจได้ (ต่อยอดจาก src/firebase.js ในระยะ 1)
   - ตรวจว่า .env* ยังอยู่ใน .gitignore และ dist/ ไม่ถูก commit
   - ยืนยันว่า VITE_DEMO_MODE ไม่ได้ตั้งเป็น 'true' ใน .env.production
   - ถ้าใช้ vue-router แบบ history mode ให้ base เป็น '/' และตรวจว่า vite.config ไม่มี base แปลก ๆ

5) README หัวข้อ "Deploy"
   - ครั้งแรก: npx firebase login, npm run deploy
   - ครั้งต่อไป: npm run deploy (หรือ deploy:hosting ถ้าแก้แค่หน้าเว็บ)
   - ลิงก์ที่จะได้: https://market-booking-project.web.app
   - Authorized domains: market-booking-project.web.app และ .firebaseapp.com ถูกเพิ่มให้อัตโนมัติ
     ถ้าต่อโดเมนของตัวเองต้องเพิ่มที่ Authentication > Settings > Authorized domains
     ไม่อย่างนั้นล็อกอิน Google จะ error auth/unauthorized-domain
   - ถ้า API key ตั้ง HTTP referrer restriction ไว้ (จากระยะ 1) ต้องเพิ่ม
     https://market-booking-project.web.app/* และ https://market-booking-project.firebaseapp.com/*
   - วิธีย้อนเวอร์ชัน: Firebase Console > Hosting > Release history > Rollback

6) ตรวจก่อนส่งงาน
   - รัน `npm run build` แล้ว `npx firebase emulators:start --only hosting` (หรือ `npx vite preview`)
     เปิดหน้าแรกและรีเฟรชที่ route ย่อย ต้องไม่ 404
   - grep ใน dist/ ว่าไม่มีคำว่า DEMO_USERS, ไม่มี service account, ไม่มีรหัสผ่าน
   - ห้ามรัน firebase deploy เอง ให้สรุปคำสั่งให้ผม
```

---

## สิ่งที่คุณต้องทำเอง (หลัง agent ทำเสร็จ)

1. **เปิด Email/Password sign-in**: Firebase Console > Authentication > Sign-in method > Email/Password > Enable
2. **ดาวน์โหลด service account key** (ใช้แค่ตอน seed): Project settings > Service accounts > Generate new private key
   เก็บไฟล์ไว้**นอกโฟลเดอร์โปรเจกต์** เช่น `C:\keys\market-sa.json` ห้าม commit ห้ามส่งให้ใคร
3. **สร้างบัญชี** (ในโฟลเดอร์โปรเจกต์):
   ```
   # Windows PowerShell
   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\keys\market-sa.json"
   # macOS/Linux
   export GOOGLE_APPLICATION_CREDENTIALS=~/keys/market-sa.json

   npm run seed:staff -- --username owner001 --role owner
   npm run seed:staff -- --username admin001 --role admin
   ```
   ระบบจะถามรหัสผ่าน ต้องยาวอย่างน้อย 6 ตัว (`ONWER` / `ADMIN` ใช้ไม่ได้)
   เสร็จแล้วลบไฟล์ key ทิ้งหรือเก็บไว้ที่ปลอดภัย
4. **Deploy**: `npx firebase login` แล้ว `npm run deploy`
5. **ทดสอบบนลิงก์จริง** https://market-booking-project.web.app
   - ล็อกอิน `owner001` แล้วตั้งรหัสใหม่ที่ยาว 10 ตัวขึ้นไป ทำเหมือนกันกับ `admin001`
   - เปิดหน้าต่างไม่ระบุตัวตน (Incognito) แล้วเช็คว่าไม่เห็นปุ่ม Admin Builder และไม่มีปุ่มสลับ role
6. ครั้งต่อไปที่แก้โค้ด รันแค่ `npm run deploy`
