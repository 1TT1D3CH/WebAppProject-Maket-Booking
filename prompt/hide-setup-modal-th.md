# Prompt: เอาหน้า "ตั้งค่าการเชื่อมต่อ Firebase Firestore" ออกจากเว็บจริง

## ทำไมหน้านี้ขึ้น (อ่านก่อน)

- หน้านี้ขึ้นบน `market-booking-project.web.app` แปลว่าตอน `npm run build` **ไม่มีไฟล์ .env**
  เว็บที่ขึ้นอยู่ตอนนี้จึง **ไม่ได้ต่อ Firebase เลย** ทุกคนที่เข้าเว็บเห็นข้อมูลแค่ใน browser ของตัวเอง
  (LocalStorage) การจองของคนหนึ่ง คนอื่นจะไม่เห็น และล้าง browser แล้วข้อมูลหาย
- ค่า `VITE_FIREBASE_*` **ไม่ใช่ความลับ** มันถูกฝังในโค้ดเว็บอยู่แล้วทุกเว็บที่ใช้ Firebase
  ความปลอดภัยจริงมาจาก `firestore.rules` (ทำไปแล้วใน fix-prompts ระยะ 1)
- สิ่งที่ไม่ควรมีคือ (1) build ที่ไม่มีค่า config และ (2) หน้าตั้งค่าสำหรับนักพัฒนา + โหมด Local ที่โผล่ให้คนทั่วไปเห็น

## วิธีใช้

1. วาง prompt ด้านล่างใน coding agent ที่ root ของ repo
2. ทำ **"สิ่งที่คุณต้องทำเอง"** ท้ายไฟล์ แล้ว deploy ใหม่

---

## Prompt

```
คุณคือนักพัฒนา Vue 3 + Pinia + Firebase (Vite) ใน repo "Dynamic Market Stall Booking System"
(Firebase project id: market-booking-project)

ปัญหา: เว็บ production แสดง modal "ตั้งค่าการเชื่อมต่อ Firebase Firestore" ที่บอกว่าไม่ได้ตั้งค่า .env
ระบบจึงทำงานใน "Local Mode" (เก็บข้อมูลใน LocalStorage) และโชว์รายชื่อ key VITE_FIREBASE_* ให้ผู้ใช้ทั่วไปเห็น

งาน (commit ขึ้นต้น "fix(ENV-1): ..."):

1. หาโค้ดที่ตัดสินว่า "มี config หรือไม่" (เช่น isFirebaseConfigured / useLocalMode / เช็ค import.meta.env.VITE_FIREBASE_API_KEY)
   และ component ของ modal นี้ (ค้นข้อความ "Local Mode" หรือ "ตั้งค่าการเชื่อมต่อ Firebase")

2. modal ตั้งค่าและ Local Mode (LocalStorage fallback) ให้ทำงานได้เฉพาะ import.meta.env.DEV เท่านั้น
   - production build ห้าม render modal นี้ และห้าม fallback ไป LocalStorage แบบเงียบๆ
   - ให้โค้ดส่วน Local Mode ถูก tree-shake ออกจาก production ได้ (ห่อด้วย if (import.meta.env.DEV))

3. ถ้า production แต่ config ไม่ครบ ให้แสดงหน้า "ระบบขัดข้อง กรุณาลองใหม่ภายหลัง" แบบเรียบๆ
   ห้ามแสดงชื่อ key, ชื่อไฟล์ .env หรือรายละเอียดทางเทคนิคใดๆ (log ลง console.error ได้)

4. ให้ build ล้มเลยถ้าไม่มีค่า: เพิ่มการเช็คใน vite.config (ตอน mode === 'production' / command === 'build')
   ใช้ loadEnv แล้วถ้า VITE_FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET,
   MESSAGING_SENDER_ID, APP_ID ตัวใดว่าง ให้ throw Error ภาษาไทยบอกว่าขาด key ไหน
   ผลคือจะ deploy เว็บที่ไม่มี config ขึ้นไปอีกไม่ได้

5. ตรวจ .gitignore ให้มี .env, .env.local, .env.*.local (ถ้ายังไม่มีให้เพิ่ม)
   สร้าง .env.example ที่มีแค่ชื่อ key ค่าว่าง (ห้ามใส่ค่าจริง)
   ถ้าเจอ .env ที่มีค่าจริงถูก commit อยู่ใน repo ให้บอกผม ห้ามแก้ history เอง

กติกา:
- ห้ามรัน firebase deploy ห้าม force push ห้ามแก้ firestore.rules
- รัน npm run build ต้อง "ล้ม" เมื่อไม่มี .env และ "ผ่าน" เมื่อมี .env ครบ ทดสอบทั้งสองแบบ
- npm run dev ที่ไม่มี .env ยังเปิด Local Mode และ modal ได้เหมือนเดิม
- จบงานสรุป: ไฟล์ที่แก้, วิธีทดสอบ, และสิ่งที่ผมต้องทำเอง
```

---

## สิ่งที่คุณต้องทำเอง

1. เปิด Firebase Console → โปรเจกต์ `market-booking-project` → ⚙️ Project settings → แท็บ General
   → เลื่อนลงไปที่ **Your apps** → เลือกเว็บแอป (`</>`) → คัดลอกค่าใน `firebaseConfig`
   (ถ้ายังไม่มีเว็บแอป กด Add app → Web ก่อน)
2. สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ (ข้างๆ package.json):
   ```
   VITE_FIREBASE_API_KEY=ค่า apiKey
   VITE_FIREBASE_AUTH_DOMAIN=market-booking-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=market-booking-project
   VITE_FIREBASE_STORAGE_BUCKET=ค่า storageBucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=ค่า messagingSenderId
   VITE_FIREBASE_APP_ID=ค่า appId
   ```
   ถ้า prompt deploy-and-roles ใช้ `VITE_STAFF_EMAIL_DOMAIN` ด้วย ใส่ไว้ในไฟล์เดียวกัน
3. Build และ deploy ใหม่:
   ```
   npm run build
   firebase deploy --only hosting
   ```
4. เปิดเว็บแบบ Incognito ต้องไม่เห็น modal นี้แล้ว ลองจองจากเครื่องหนึ่ง แล้วดูจากอีกเครื่องว่าเห็นข้อมูลเดียวกัน
