# คู่มือ deploy ระบบตรวจสลิป

โปรเจกต์ Firebase: `market-booking-project` (Spark plan)

## หลักสำคัญ: ต้อง deploy 3 อย่างพร้อมกันในคำสั่งเดียว

โค้ดใหม่จองเป็น `pending` + แนบสลิป ส่วน rules เก่าไม่ยอมให้ตั้ง `pending`
ส่วนโค้ดเก่าจองเป็น `booked` ทันที ซึ่ง rules ใหม่ปฏิเสธ
ถ้า deploy ไม่พร้อมกัน **จองแผงไม่ได้เลย** (เกิดขึ้นแล้วหนึ่งครั้ง)

## ก่อน deploy

1. **สำรอง rules ปัจจุบัน**: Firebase Console > Firestore Database > Rules คัดลอกทั้งหมดเก็บไว้
   ในไฟล์ เช่น `docs/rules-deployed-2026-10-11.rules` (ใช้ย้อนกลับ และใช้เทียบกับ repo)
2. **จด Hosting release ปัจจุบัน**: Console > Hosting > Release history (เวลาที่ deploy ล่าสุด)
3. ตรวจให้ผ่านในเครื่อง:
   ```
   npm run build
   npm run test:unit
   npm run test:rules
   ```
4. ตรวจว่า rules ใน Console ที่คุณเคยแก้มือ (เช่น `markets` ให้ admin update ได้โดยไม่เช็ค revision)
   ยังเทียบเท่ากับ repo: ใน repo ใช้ `allow create, update, delete: if isAdmin();` อยู่แล้ว
   ถ้า Console มีกฎอื่นที่ไม่อยู่ใน repo ให้เทียบไฟล์สำรองในข้อ 1 แล้วย้ายมาใส่ repo ก่อน deploy
   (deploy จะเขียนทับ rules ใน Console ทั้งหมด)

## Deploy

```
npm run build && firebase deploy --only firestore:rules,firestore:indexes,hosting
```

ห้ามใช้ `npm run deploy:hosting` หรือ `npm run deploy:rules` เดี่ยว ๆ ในรอบนี้

## หลัง deploy

1. Console > Firestore > Indexes: รอจนทุกตัวของ `bookings` เป็น **Enabled**
   - `status ASC, createdAt ASC` (หน้าตรวจสลิป: รอตรวจ / ขอสลิปใหม่)
   - `status ASC, createdAt DESC` (หน้าตรวจสลิป: ตัดสินแล้ว)
   - `tenantId ASC, createdAt DESC` (การจองของฉัน)
   ระหว่างที่ยัง Building หน้าจะขึ้นข้อความ "ฐานข้อมูลยังสร้างดัชนีไม่เสร็จ" ให้รอแล้วกด "ลองใหม่"
2. ล้าง cache บนมือถือ/iPad หรือกดรีเฟรชแรง ๆ (Ctrl+F5) เพราะเครื่องที่เปิดค้างอาจยังใช้โค้ดเก่า
3. ทดสอบด้วยบัญชีผู้เช่าทดสอบ 1 รายการ:
   - ผู้เช่าจองแผง + แนบสลิป: แผงเป็นสีเหลือง "รอตรวจสลิป"
   - admin เปิด "ตรวจสลิป" เห็นรายการและรูป กด "ขอสลิปใหม่"
   - ผู้เช่าเปิด "การจองของฉัน" เห็นเหตุผล ส่งสลิปใหม่
   - owner อนุมัติ แผงเป็น "จองแล้ว" และผู้เช่าได้แจ้งเตือน
   - จองอีกรายการแล้ว "ปฏิเสธ" เพื่อคืนแผงว่าง

## วิธีย้อนกลับ (ย้อน **ทั้งสองอย่างพร้อมกัน**)

Rollback Hosting อย่างเดียวไม่ย้อน rules ต้องทำทั้งคู่:

1. Hosting > Release history > เลือก release ก่อนหน้า > Rollback
2. Firestore > Rules > วางไฟล์ rules ที่สำรองไว้ > Publish
   (หรือใช้ปุ่ม Rules history เลือกเวอร์ชันเก่า)

หมายเหตุ: การจองที่สร้างด้วยระบบใหม่ (status `pending`/`needs_slip`/`approved`) จะค้างอยู่ในฐานข้อมูล
ถ้าย้อนกลับ โค้ดเก่าจะไม่เห็นสถานะเหล่านี้ และแผงที่เป็น `pending` จะแสดงเป็นสถานะที่โค้ดเก่าไม่รู้จัก
ควรตัดสินรายการที่ค้างให้หมดก่อนย้อน

## ข้อจำกัดที่ยังมี

- **แผงที่รอตรวจแล้ว admin ลบออกจากผัง**: ระบบยังไม่แจ้งเตือนผู้เช่า และ booking ที่ค้างจะตัดสินไม่ได้
  (แผงหาย) ให้ปฏิเสธรายการก่อนลบแผง (confirm ตอนลบแผงตอนนี้เตือนเฉพาะแผงที่ `booked`)
- **ตรวจด้วยตาเท่านั้น**: ไม่มีการอ่านสลิปอัตโนมัติ มีแค่คำเตือนสลิปไฟล์ซ้ำ (hash เดียวกัน)
  สลิปที่ถูกตัดต่อหรือถ่ายซ้ำจากรูปเดียวกันคนละไฟล์จะไม่ถูกจับ
- **ไม่มีหมดเวลาอัตโนมัติ**: แผงถูกกันไว้จนกว่า admin/owner หรือผู้เช่าเองจะตัดสิน/ยกเลิก
  (ต้องใช้ Cloud Functions ซึ่งอยู่นอก Spark plan)
- **ไม่ได้ทดสอบบนเบราว์เซอร์/อุปกรณ์จริง**: ยังไม่มี Playwright ใน repo
  ส่วนที่ทดสอบอัตโนมัติคือ rules และ logic ล้วน ๆ; หน้าจอ (ย่อรูปด้วย canvas, ซูมสลิป, layout มือถือ/iPad)
  ต้องทดสอบด้วยมือหลัง deploy ที่ขนาด 390x844, 820x1180, 1180x820, 1440x900
- **พื้นที่เก็บสลิป**: Firestore ฟรี 1 GiB รับสลิป (ไม่เกินราว 500 KB ต่อรูป) ได้ราว 2,000 รูป
  ถ้าใกล้เต็ม ลบ `bookingSlips/{id}` ของการจองที่ตัดสินแล้วใน Console (admin ลบผ่านโค้ดได้ด้วย `deleteSlip`)
  ยังไม่มีปุ่มลบในหน้าจอ

## อ้างอิงไฟล์

| เรื่อง | ไฟล์ |
|---|---|
| rules | `firestore.rules` |
| index | `firestore.indexes.json` |
| จอง + แนบสลิป | `src/services/firebaseService.js` (`bookStallWithTransaction`), `src/components/Customer/BookingModal.vue` |
| ย่อรูป | `src/utils/compressImage.js` |
| เก็บ/อ่านสลิป | `src/services/slipStorage.js` |
| หน้าตรวจสลิป admin/owner | `src/components/Admin/SlipReviewPanel.vue`, `src/components/Admin/slip/*`, `src/stores/slipReviewStore.js` |
| การจองของฉัน (ผู้เช่า) | `src/components/Customer/MyBookingsModal.vue`, `src/stores/myBookingsStore.js` |
| test rules | `tests/firestore.rules.test.mjs` |
