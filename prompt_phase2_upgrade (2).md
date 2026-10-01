# 🚀 Phase 2 Upgrade: System Architecture, Multi-Role Auth, Responsive UI & Real-time Notifications

เรากำลังจะยกระดับโปรเจกต์ **Market Stall Booking System** จากระบบ Prototype ให้กลายเป็นระบบที่ใช้งานได้จริงในระดับ Production โปรดช่วยปรับปรุงโครงสร้างโค้ดและเพิ่มฟีเจอร์ตามข้อกำหนดดังต่อไปนี้:

---

## 1. 👥 Actor System & Role-based Authentication (ระบบ 3 บทบาท)
เพิ่มระบบ Register / Login และการจัดการสิทธิ์การใช้งานสำหรับ 3 Actors:
1. **Market Owner (เจ้าของตลาด):**
   * สิทธิ์สูงสุด (Super Admin)
   * จัดการสิทธิ์ของ Admin และดูภาพรวมการจอง/รายได้ทั้งหมด
   * สามารถแก้ไขผังตลาดหลัก (Master Layout) และอนุมัติการจอง
2. **Admin (ผู้ดูแลระบบ):**
   * ปรับเปลี่ยนตำแหน่งแผงตลาด (Drag & Drop Layout Builder)
   * ตรวจสอบสลิปการโอนเงิน ยืนยัน/ยกเลิกการจอง
3. **Tenant (ผู้เช่า/พ่อค้าแม่ค้า):**
   * สมัครสมาชิกและล็อกอินเข้าใช้งาน
   * ดูผังตลาด เลือกแผง และทำการจอง
   * ดูประวัติการจองและรับการแจ้งเตือน (Notifications)

---

## 2. 📝 Strictly Validated Booking & Verification (ป้องกันข้อมูลมั่ว)
* **Authentication Enforcement:** ผู้เช่าต้อง Sign Up / Sign In เข้าสู่ระบบก่อนจึงจะสามารถกดจองแผงได้ (ห้ามจองแบบ Guest)
* **Strict Data Validation:** ในขั้นตอนการจอง ต้องมีระบบตรวจทานข้อมูลอย่างเข้มงวด:
  * ชื่อ-นามสกุลจริง
  * เบอร์โทรศัพท์ (บังคับรูปแบบ 10 หลัก / Regex Check)
  * ประเภทสินค้าที่จะขาย
  * เลขบัตรประชาชน หรือ เอกสารยืนยันตัวตน (ถ้ามี)
  * ระบบอัปโหลดสลิปการชำระเงินที่ตรวจสอบได้

---

## 3. 📱 Responsive UI & Mobile/Tablet Touch Optimization
* ปรับปรุงหน้า UI ให้เสถียรและแสดงผลสวยงามบนอุปกรณ์ทุกขนาด (Mobile, Tablet, Desktop)
* ในส่วนของผังตลาด (Market Canvas):
  * เพิ่มการรองรับ **Touch Gestures** บนหน้าจอมือถือ/แท็บเล็ต (Pinch to Zoom, Pan/Drag)
  * ปรับ Responsive Toolbar และ Controls ให้ใช้งานง่ายบนสมาร์ตโฟน

---

## 4. 🔔 Dynamic Layout Changes & Tenant Notification Engine
* เมื่อ Admin หรือ Owner ทำการขยับ/เปลี่ยนตำแหน่งแผงค้าที่มีผู้เช่ากดจองหรือจ่ายเงินแล้ว:
  * ระบบต้องบันทึกประวัติการเปลี่ยนแปลง
  * สั่งงานส่ง **Real-time Notification** ตรงไปยังบัญชีของผู้เช่าแผงนั้นทันที (เช่น "แผง A1 ของคุณได้รับการปรับย้ายตำแหน่งบนผังตลาด")
  * แสดงจุดแจ้งเตือน (Notification Badge) บนหน้าโปรไฟล์/กล่องข้อความของผู้เช่า

---

## 🛠️ Tasks for Implementation:
1. สร้าง/ปรับปรุง Firestore Schema สำหรับ `users`, `stalls`, `bookings` และ `notifications`
2. ตั้งค่า Vue Router Navigation Guards เพื่อเช็กสิทธิ์ Role (Owner, Admin, Tenant)
3. เพิ่ม Form Validation library หรือ Logic การตรวจวัดรูปแบบข้อมูลผู้เช่า
4. อัปเดต Market Canvas Component ให้รองรับ Touch Events และ Responsive Viewport
5. เขียน Firestore Triggers หรือ Service สำหรับสร้าง Notification Document เมื่อมีการแก้ไขตำแหน่งแผงที่จองแล้ว

โปรดเริ่มดำเนินการโดยสรุปโครงสร้างไฟล์ที่จะสร้าง/แก้ไข และเริ่มลงมือเขียนโค้ดทีละส่วนได้เลย!