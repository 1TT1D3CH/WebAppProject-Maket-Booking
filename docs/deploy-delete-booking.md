# Deploy: ลบการจองถาวร + ลบสลิปอัตโนมัติ

rules และโค้ดต้อง deploy **พร้อมกันในคำสั่งเดียว** ไม่งั้นปุ่มลบ/การอนุมัติจะ permission-denied

## ก่อน deploy
1. สำรอง rules ปัจจุบัน: Firebase Console > Firestore > Rules > copy เก็บไว้ที่ `docs/rules-deployed-<วันที่>.rules`
2. จด Hosting release ปัจจุบัน (Hosting > Release history)
3. `npm run build`, `npm run test:unit`, `npm run test:rules` ต้องผ่านทั้งหมด

## deploy
```
npm run build && firebase deploy --only firestore:rules,firestore:indexes,hosting
```

## ย้อนกลับ
- Hosting > Release history > Rollback
- Firestore > Rules > เลือกเวอร์ชันที่สำรองไว้ แล้ว Publish

## สิ่งที่เปลี่ยนใน rules
- `bookings` delete: admin/owner, สถานะ approved/rejected/cancelled/expired (หรือไม่มี status), ไม่มียอดรอคืนเงิน,
  มี `receiptNo` ต้องเป็น owner, ต้องมี `auditLogs/delete_{bookingId}` (action `booking.delete`) ใน batch เดียวกัน
- `bookingSlips` update: admin ตั้ง `purgeAfter` ได้อย่างเดียว ตอน booking เป็น approved (ลบสลิปอัตโนมัติหลัง 1 วัน)
- การลบสลิปเดี่ยว ๆ (ลบอัตโนมัติ / ปุ่มลบสลิปทันที) ยังทำได้ตามเดิม

## ทดสอบเองหลัง deploy (ใช้การจองทดสอบ)
เปิดตรวจสลิป > ตัดสินแล้ว > เลือกการจองทดสอบ > "ลบการจองนี้ถาวร" > ใส่เหตุผล > ถัดไป >
พิมพ์รหัสแผงผิด (ปุ่มต้องกดไม่ได้) > พิมพ์ถูกรอ 3 วินาที > ลบ > ดู "บันทึกการทำงาน" ต้องมี "ลบการจองถาวร" พร้อมเหตุผล
