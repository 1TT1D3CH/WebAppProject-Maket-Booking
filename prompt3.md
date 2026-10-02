# 🛠️ Advanced Canvas Tools, Dynamic Grid, Entrance/Exit & Dark Mode Prompt

โปรดพัฒนาระบบ **Market Layout Builder** เพิ่มเติม เพื่อขยายความสามารถจากเครื่องมือวางแผงค้า ให้กลายเป็นเครื่องมือวางผังตลาดแบบครบวงจร (Full Market Design Suite) โดยมีรายละเอียดดังนี้:

---

## 1. 🌓 Dark / Light Mode Switcher
* เพิ่มปุ่ม **Theme Switcher Component** ที่ Navbar/Header
* รองรับการสลับระหว่าง Dark Mode และ Light Mode แบบ Smooth Transition
* บันทึกค่า Theme ลงใน `localStorage` และปรับเปลี่ยนสีของ Canvas/Background ให้เหมาะสมกับแต่ละโหมดอัตโนมัติ

---

## 2. 📐 Enhanced Canvas Grid System
* เพิ่ม **Grid Overlay** บน Canvas ที่ชัดเจน:
  * ใน Light Mode: Grid เส้น/จุดสีสว่าง สบายตา (`#E2E8F0` / Slate 200)
  * ใน Dark Mode: Grid เส้น/จุดสีเข้มกระชับ (`#334155` / Slate 700)
* **Snap-to-Grid Engine:** เมื่อ Admin ลากวางแผงหรือทางเดิน ตัววัตถุจะ Snap เข้ากับตาราง Grid (เช่น ขนาดกริต 10px / 20px) ช่วยให้การวางผังตรงแถวเป็นระเบียบ

---

## 3. 🛠️ Market Architecture Tools (เครื่องมือวาดโครงสร้างนอกเหนือจากแผงค้า)
เพิ่ม Toolbar สำหรับ Admin ในการเลือกประเภท Object บน Canvas:

1. **Entrance / Exit Markers (ทางเข้า-ออก):**
   * เครื่องมือวางไอคอนประตู/ทางเข้า-ออก (Door / Gate / Arrow Indicator)
   * สามารถหมุนทิศทาง (Rotate 0°, 90°, 180°, 270°) และระบุชื่อได้ (เช่น "ทางเข้า 1", "ทางออกฝั่งลานจอดรถ")
2. **Walkway / Pathway Tool (เครื่องมือทำทางเดิน):**
   * วาดกรอบพื้นที่ทางเดินสำหรับผู้ซื้อ (Walkway Overlay)
   * แสดง Pattern หรือสีพื้นหลังที่แตกต่างชัดเจน (เช่น ลายเฉียง หรือสีเทาโปร่งแสง)
3. **Restricted / Obstacle Zones (พื้นที่ห้ามตั้งแผง/สิ่งกีดขวาง):**
   * วาดหรือวางบล็อกสำหรับ: เสาอาคาร, ห้องน้ำ, เวทีกลางแจ้ง, จุดทิ้งขยะ, พื้นที่อันตราย
   * ไม่เปิดให้ผู้เช่ากดเลือกจองบนพื้นที่ประเภทนี้
4. **Landmark / Facility Tools:**
   * วางไอคอนสิ่งอำนวยความสะดวก เช่น จุดประชาสัมพันธ์ (Info), จุดปฐมพยาบาล, ตู้ ATM

---

## 4. 🗄️ Firestore Schema Extension
ปรับปรุงการเก็บข้อมูลผังตลาดใน Firestore Collection `stalls` หรือ `layout_objects`:
```json
{
  "id": "obj_001",
  "type": "entrance" | "walkway" | "restricted" | "stall",
  "label": "ทางเข้าหลัก A",
  "x": 100,
  "y": 50,
  "width": 120,
  "height": 40,
  "rotation": 0,
  "styleProps": {
    "color": "#10B981",
    "icon": "door-enter"
  }
}