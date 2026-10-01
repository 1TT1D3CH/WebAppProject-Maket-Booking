# 🔔 Master Notification Refactoring: Batch & Throttle Notification Engine

เราต้องการปรับปรุงระบบ Notification ของโปรเจกต์ **Market Stall Booking System** ใหม่ทั้งหมด 
โดยเปลี่ยนกระบวนการแจ้งเตือนเรื่องการจัดการแผงตลาดให้มีความเสถียร ไม่รบกวนผู้เช่า และทำงานเมื่อ Admin ยืนยันการบันทึกแล้วเท่านั้น

โปรดรีกระบวนการทำงาน (Refactor Logic) ของระบบ Notification ตามกฎเหล็ก 3 ข้อต่อไปนี้:

---

## 📜 Core Rules & Business Logic

### Rule 1: ต้องกด "บันทึก (Save)" ก่อนเท่านั้น จึงจะส่ง Notification
* **Disable Real-time Live Notifications:** ห้ามส่ง Notification ทันทีในระหว่างที่ Admin กำลังลาก ย้าย ขยับ ย่อ/ขยาย หรือแก้ไขข้อมูลแผงค้าบน Canvas
* **Draft / Staging State:** ทุกการกระทำของ Admin ให้ถือเป็น "Draft" หรือ state ชั่วคราวใน Local Store/Memory ก่อน
* **Batch Trigger on Save:** เมื่อ Admin กดปุ่ม **"บันทึกผังตลาด" (Save Market Layout)** เท่านั้น ระบบจึงจะเปรียบเทียบความต่าง (Diffing) และเริ่มกระบวนการส่ง Notification ลง Firestore

---

### Rule 2: แจ้งเตือนเฉพาะการจัดการแผงที่มี "ผู้เช่า/จองแล้ว" เท่านั้น
* **Filter Unbooked Stalls:** แผงที่ยังว่างอยู่ (`isBooked: false` หรือไม่มี `tenantId`) หากถูกเลื่อน ย้าย หรือแก้ไข ห้ามสร้าง Notification เด็ดขาด
* **Target Affected Tenants:** คัดกรองส่ง Notification ไปยัง Firestore `notifications` collection เฉพาะ `tenantId` ที่เป็นเจ้าของแผงซึ่งได้รับผลกระทบจากการแก้ไขจริงเท่านั้น

---

### Rule 3: ป้องกันการแจ้งเตือนถี่เกินความจำเป็น (Notification Throttling & Consolidation)
* **Single Consolidated Notification per Save:** หาก Admin ทำการขยับแผงเดิมหลายครั้ง หรือแก้ไขหลายรายการของแผงเดียวกันในการบันทึก 1 ครั้ง ให้สรุปเป็น **1 Notification** ต่อ 1 ผู้เช่าเท่านั้น (ห้ามยิงแยกทีละ Event)
* **Change Summary Detection:** ระบบต้องสรุปการเปลี่ยนแปลงอย่างกระชับ เช่น:
  * กรณีขยับตำแหน่ง: *"แผง A01 ของคุณได้รับการปรับเปลี่ยนตำแหน่งบนผังตลาด"*
  * กรณีแก้ไขรายละเอียด: *"ข้อมูลแผง A01 ของคุณได้รับการอัปเดตจากผู้ดูแลระบบ"*
* **No-Op Check (Skip if No Actual Change):** หาก Admin ลากแผงไปมาแล้วลากกลับมาไว้ที่เดิมก่อนกดบันทึก ระบบต้องตรวจจับได้ว่าตำแหน่งไม่เปลี่ยน (`old_x == new_x` && `old_y == new_y`) และไม่ส่ง Notification

---

## 🛠️ Technical Implementation Strategy for AI

1. **State Management (`marketStore.js` / Pinia):**
   * สร้าง `initialStallsState` เพื่อเก็บ Snapshots ของผังตลาดก่อนเริ่มแก้ไข
   * สร้าง `dirtyStallsMap` เพื่อติดตามรายการแผงที่มีการขยับ/แก้ไขระหว่าง Admin ทำงาน

2. **Save Action Handler (`saveLayout()`):**
   * เมื่อเรียกใช้ `saveLayout()` ให้ทำ Diffing ระหว่าง `initialStallsState` กับ `currentStallsState`
   * กรองเอาเฉพาะแผงที่:
     1. มีผู้เช่า (`tenantId` มีอยู่จริง)
     2. มีการเปลี่ยนแปลงพิกัด (`x`, `y`) หรือรายละเอียดข้อมูลจริง
   * รวมรายการเปลี่ยนแปลงตาม `tenantId` (Group by Tenant)
   * เขียน Batch Write หรือ Loop สร้าง `notification` documents ลงใน Firestore ในครั้งเดียว

3. **Notification Document Schema:**
   ```json
   {
     "tenantId": "user_123",
     "stallId": "stall_A01",
     "title": "อัปเดตข้อมูลแผงค้า",
     "message": "แผง A01 ของคุณได้รับการปรับตำแหน่งบนผังตลาดใหม่เรียบร้อยแล้ว",
     "type": "LAYOUT_UPDATE",
     "createdAt": "SERVER_TIMESTAMP",
     "isRead": false
   }