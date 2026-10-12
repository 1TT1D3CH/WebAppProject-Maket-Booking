// เวลากันแผงรอสลิป: คำนวณจากเวลา server (holdStartedAt) ไม่ใช่นาฬิกาเครื่อง
// offsetMs = เวลา server - เวลาเครื่อง (ถ้ายังไม่รู้ใช้ 0)
export const HOLD_STATUSES = ['awaiting_slip', 'needs_slip']

const toMs = (v) => (v?.toMillis ? v.toMillis() : typeof v === 'number' ? v : v instanceof Date ? v.getTime() : null)

/** เวลาหมดอายุ (ms) หรือ null ถ้าไม่มีข้อมูลกันแผง */
export function holdExpiresAtMs(startedAt, minutes) {
  const start = toMs(startedAt)
  if (start == null || !Number.isFinite(Number(minutes))) return null
  return start + Number(minutes) * 60000
}

/** เวลาที่เหลือ (ms, ไม่ติดลบ) หรือ null ถ้าไม่มีข้อมูล */
export function remainingMs(startedAt, minutes, nowMs = Date.now(), offsetMs = 0) {
  const end = holdExpiresAtMs(startedAt, minutes)
  if (end == null) return null
  return Math.max(0, end - (nowMs + offsetMs))
}

/** รายการ/lock นี้หมดเวลากันแผงแล้วไหม (เฉพาะสถานะที่รอสลิป) */
export function isHoldExpired(item, nowMs = Date.now(), offsetMs = 0) {
  if (!item || !HOLD_STATUSES.includes(item.status)) return false
  const left = remainingMs(item.holdStartedAt, item.holdMinutes, nowMs, offsetMs)
  return left !== null && left <= 0
}

/** เหลือเวลา "29:41" หรือ "23 ชม. 12 นาที" (>= 1 ชั่วโมง) */
export function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const sec = total % 60
  if (h >= 1) return `${h} ชม. ${m} นาที`
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

/** ระดับเตือนของนับถอยหลัง: ok | warn (<5 นาที) | danger (<1 นาที) | expired */
export function countdownLevel(ms) {
  if (ms <= 0) return 'expired'
  if (ms < 60000) return 'danger'
  if (ms < 5 * 60000) return 'warn'
  return 'ok'
}
