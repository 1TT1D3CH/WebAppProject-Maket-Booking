export const STAFF_EMAIL_DOMAIN =
  import.meta.env?.VITE_STAFF_EMAIL_DOMAIN || 'staff.market-booking-project.web.app'

const USERNAME_PATTERN = /^[a-z0-9._-]{3,32}$/

/**
 * แปลงค่าที่ผู้ใช้กรอก (อีเมล หรือ ชื่อผู้ใช้) เป็นอีเมลสำหรับ Firebase Auth
 * @returns {string|null} null เมื่อรูปแบบชื่อผู้ใช้ไม่ถูกต้อง
 */
export function toLoginEmail(input, domain = STAFF_EMAIL_DOMAIN) {
  const value = String(input ?? '').trim()
  if (value.includes('@')) return value
  const username = value.toLowerCase()
  return USERNAME_PATTERN.test(username) ? `${username}@${domain}` : null
}

/** อีเมลโดเมนภายในสงวนไว้สำหรับบัญชี owner/admin ห้ามสมัครเอง */
export function isStaffEmail(email, domain = STAFF_EMAIL_DOMAIN) {
  return String(email ?? '').trim().toLowerCase().endsWith(`@${domain.toLowerCase()}`)
}
