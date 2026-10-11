// เลือกว่าแผงบนผังลูกค้าจะแสดงข้อความแบบเต็ม หรือแค่ชื่อแผง (ตรรกะล้วน ทดสอบด้วย node --test)
// ขนาดเป็นหน่วย px ของผัง (ก่อน scale ของ container) ข้อความย่อ/ขยายตามผังอยู่แล้ว จึงใช้ค่าเดียวได้ทุกจอ

/** ขั้นต่ำที่ชื่อแผง+ราคา, ชื่อโซน, ป้ายสถานะ วางได้ครบโดยไม่ล้นกรอบ */
export const FULL_LABEL_MIN_WIDTH = 92
export const FULL_LABEL_MIN_HEIGHT = 72

/** ต่ำกว่านี้ชื่อแผงเริ่มย่อฟอนต์ (ไม่ขึ้นบรรทัดใหม่ ตัดท้ายเป็น …) */
export const TINY_LABEL_MAX_WIDTH = 56

/** @returns {'full' | 'name'} */
export function pickStallLabelMode(widthPx, heightPx) {
  return widthPx >= FULL_LABEL_MIN_WIDTH && heightPx >= FULL_LABEL_MIN_HEIGHT ? 'full' : 'name'
}

export function isTinyStall(widthPx) {
  return widthPx < TINY_LABEL_MAX_WIDTH
}
