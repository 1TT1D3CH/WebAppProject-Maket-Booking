# Dynamic Market Stall Booking System

ระบบจองแผงตลาดแบบ interactive (Vue 3 + Pinia + Tailwind + Firebase Auth/Firestore)

## เริ่มใช้งาน

```bash
npm install
cp .env.example .env     # ใส่ค่า Firebase จาก Console > Project settings > Your apps
npm run dev
npm run build
```

**ต้องมี `.env`** (ไฟล์นี้อยู่ใน .gitignore จึงไม่ติดมากับ git — ขอค่าจากเจ้าของโปรเจกต์หรือคัดลอกจาก Firebase Console > Project settings > Your apps)
ถ้าไม่มี: `npm run build` จะหยุดพร้อมแจ้ง key ที่ขาด, `npm run dev` จะขึ้น error "ไม่พบค่า Firebase config" และหน้าเว็บว่าง

ต้องใช้ Node 18+ (ทดสอบกับ Node 26) และหลัง `npm install` ถ้าเห็นคำเตือน `allow-scripts` ของ `@firebase/util` / `protobufjs` ไม่กระทบการ build

## ตั้งค่า Firebase (ต้องทำก่อนใช้งานจริง)

1. เปิด Authentication > Email/Password (ไม่ต้องเปิด Anonymous)
2. Deploy rules และ index: `firebase deploy --only firestore:rules,firestore:indexes`
3. ตั้ง API key restriction (HTTP referrer) ใน Google Cloud Console
4. **สร้างเจ้าของตลาดคนแรกด้วยมือ**: สมัครสมาชิกในแอป แล้วไปแก้เอกสาร `users/{uid}` ใน Console ให้ `role = "owner"`
   (ผู้สมัครเองจะได้ role `tenant` เสมอ; rules ห้ามแก้ role ตัวเอง)

## บทบาท

| role | สิทธิ์ |
|---|---|
| guest | ดูผังตลาด |
| tenant | จองแผง, ดู/จัดการแจ้งเตือนของตัวเอง |
| admin | แก้ผัง, ยกเลิกการจอง, ดูรายละเอียดผู้จอง |
| owner | เหมือน admin + เลื่อนสิทธิ์ผู้ใช้ (ผ่าน Console/เครื่องมือหลังบ้าน) |

## โครงสร้างข้อมูล

- `markets/main-layout` — ผัง (อ่านสาธารณะ): zones, stalls, layoutObjects. `stalls[].bookedBy` เก็บแค่ `tenantId, bookingId, goodsType, bookedAt`
- `bookings/{id}` — ชื่อ/เบอร์ผู้จอง (อ่านได้เฉพาะเจ้าของรายการ + admin)
- `users/{uid}` — โปรไฟล์ (ไม่เก็บเลขบัตรประชาชนอีกต่อไป)
- `notifications/{id}` — แจ้งเตือนรายผู้เช่า (`tenantId`)

## ข้อจำกัดที่ยังเหลือ

- **Rules ระดับรายแผงทำไม่ได้**: ผู้เช่าต้องเขียน `markets/main-layout` เพื่อจอง rules จึงจำกัดได้แค่ฟิลด์ (`stalls`, `updatedAt`) ผู้ใช้ที่ล็อกอินและเขียน request เองยังแก้ stalls อื่นได้ — ทางแก้ที่ถูกต้องคือย้ายการจองไป Cloud Function หรือแยกเป็น `stalls/{id}`
- การจองยังไม่มีวันที่/ช่วงเวลา, ไม่มี flow อนุมัติสลิป และสลิปยังไม่ถูกอัปโหลดเก็บ (ต้องใช้ Firebase Storage)
- ยังไม่มี test / ESLint / CI

## สร้างบัญชี Owner/Admin

Owner/Admin ล็อกอินด้วย "ชื่อผู้ใช้" (เช่น `owner001`) ซึ่งแปลงเป็นอีเมลภายใน `owner001@<VITE_STAFF_EMAIL_DOMAIN>` — เป็นบัญชี Email/Password จริง สิทธิ์มาจาก `users/{uid}.role` และ Firestore Rules เท่านั้น ไม่มีรหัสผ่านในโค้ด

1. Firebase Console > Authentication > Sign-in method > เปิด Email/Password
2. โหลด service account key (Project settings > Service accounts) เก็บ**นอก repo**
3. รัน (PowerShell):
   ```
   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\keys\market-sa.json"
   npm run seed:staff -- --username owner001 --role owner
   npm run seed:staff -- --username admin001 --role admin
   ```
   สคริปต์จะถามรหัสผ่านแบบซ่อน (อย่างน้อย 6 ตัว, แนะนำ 10+) และตั้ง `mustChangePassword: true` — ล็อกอินครั้งแรกจะถูกบังคับตั้งรหัสใหม่ 10 ตัวขึ้นไป
4. ทางเลือก: สร้างเองใน Console (Authentication > Add user อีเมล `owner001@<โดเมน>` แล้วสร้าง doc `users/{uid}` ใส่ `role = "owner"`)

อีเมลโดเมนภายในสมัครเองไม่ได้ (ฟอร์มปฏิเสธ + rules บังคับ role = tenant ตอนสมัคร)

## Deploy

```
npx firebase login      # ครั้งแรก
npm run deploy          # build + hosting + rules + indexes
npm run deploy:hosting  # เฉพาะหน้าเว็บ
npm run deploy:rules    # เฉพาะ rules/indexes
```

- ลิงก์: https://market-booking-project.web.app
- `npm run build` จะ fail ถ้าขาด `VITE_FIREBASE_*` หรือตั้ง `VITE_DEMO_MODE=true`
- โดเมนของตัวเอง: เพิ่มที่ Authentication > Settings > Authorized domains
- ถ้าตั้ง API key referrer restriction ให้เพิ่ม `https://market-booking-project.web.app/*` และ `https://market-booking-project.firebaseapp.com/*`
- ย้อนเวอร์ชัน: Firebase Console > Hosting > Release history > Rollback
