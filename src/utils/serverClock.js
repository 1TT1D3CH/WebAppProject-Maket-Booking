// ความต่างระหว่างเวลา server กับนาฬิกาเครื่อง (ms) ใช้นับถอยหลังหมดเวลากันแผงให้ตรงกับที่ rules ตัดสิน
// ค่าได้จาก holdStartedAt (serverTimestamp) ของการจองที่เพิ่งเขียน เทียบกับเวลาเครื่องก่อน/หลังเขียน
// ยังไม่รู้ค่า = 0 (ใช้นาฬิกาเครื่อง) rules เป็นผู้ตัดสินสุดท้ายเสมอ
let offsetMs = 0

export const getServerOffset = () => offsetMs
export const serverNow = () => Date.now() + offsetMs

/** serverMs = เวลา server ที่อ่านได้, beforeMs/afterMs = เวลาเครื่องก่อนและหลังสั่งเขียน */
export function calibrateServerClock(serverMs, beforeMs, afterMs = Date.now()) {
  if (!Number.isFinite(serverMs) || !Number.isFinite(beforeMs)) return offsetMs
  const mid = (beforeMs + afterMs) / 2
  const next = serverMs - mid
  // ค่าที่ไม่สมเหตุสมผล (เกิน 1 วัน) ไม่เชื่อ
  if (Math.abs(next) < 24 * 3600 * 1000) offsetMs = Math.round(next)
  return offsetMs
}

export const resetServerClock = () => { offsetMs = 0 }
