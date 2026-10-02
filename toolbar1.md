# 🛠️ Fix Floating Toolbar UI: Collapsible, Compact & Dockable Canvas Controls

แถบเครื่องมือวางผังตลาด (Toolbar) บน Canvas ตอนนี้มีขนาดใหญ่เกินไป ลอยทับพื้นที่ทำงาน[cite: 4] และบังสายตาในระหว่างวาดผัง ทำให้ใช้งานยาก

โปรดปรับปรุง UX/UI ส่วน Control Toolbar ใน `MarketCanvas.vue` ใหม่ตามแนวทางดังต่อไปนี้:

---

## 🎯 Requirements for Fixes

### 1. 📐 Make Toolbar Compact (ปรับขนาดให้กะทัดรัด)
* **Icon-First Mode:** ปรับปุ่มเครื่องมือวาดผังให้เน้นแสดง **ไอคอน + Tooltip** (แสดงชื่อเมื่อ Hover) แทนการวางข้อความยาวๆ เรียงกัน เพื่อลดความกว้างของแถบ
* **Category Dropdown / Drawer:** จัดกลุ่มเครื่องมือวาดผังเป็น หมวดหมู่ (เช่น "โครงสร้างหลัก", "โซนอำนวยความสะดวก") แล้วเปิดเป็น Dropdown เพื่อไม่ให้ปุ่มยาวเกินขอบจอ[cite: 4]

### 2. 👁️ Collapsible / Minimizable Toolbar (ทำให้พับเก็บได้)
* เพิ่มปุ่ม **Toggle / Collapse (ไอคอน chevron หรือ eye)** สำหรับพับเก็บแถบเครื่องมือให้เหลือเพียงแถบเล็กๆ ที่มุมจอเมื่อ Admin ต้องการดูผังตลาดแบบเต็มตา
* เมื่อพับเก็บ ให้สามารถกดขยายออกมาใหม่ได้ตลอดเวลา

### 3. 📍 Floating Placement Option (ปรับตำแหน่งไม่ให้บัง)
* ปรับตำแหน่งให้อยู่ในจุดที่ไม่บังพื้นที่วาดหลัก เช่น ย้ายไปลอยอยู่มุมซ้ายล่าง/ขวาล่าง (`bottom-4 left-4`) หรือแนบติดขอบข้าง (Sidebar Drawer) 
* เพิ่ม `backdrop-blur-md bg-slate-900/80` เพื่อให้แถบดูโปร่งแสง (Semi-transparent) และไม่รู้สึกหนาทึบบังผังด้านหลัง

---

## 🛠️ Implementation Steps for AI:
1. ปรับปรุง โครงสร้าง HTML/CSS ของ Toolbar Component
2. เพิ่ม State `isToolbarCollapsed = ref(false)` สำหรับสลับเปิด/ปิดแถบเครื่องมือ
3. ปรับสไตล์เป็น Icon-only พร้อมใช้ Tailwind Tooltip (`group-hover:block`)

โปรดเริ่มปรับแก้ UI Toolbar ตามรายละเอียดด้านบนเพื่อเพิ่มพื้นที่การทำงานให้กับ Admin ได้เลย!