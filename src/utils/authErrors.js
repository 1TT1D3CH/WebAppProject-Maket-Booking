// แปลง error ของ Firebase Auth เป็นข้อความภาษาไทย (ใช้ทั้ง Google และ Email/Password)

// ผู้ใช้ปิด/ยกเลิกเอง ไม่ต้องแสดงอะไร
const SILENT_CODES = [
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/user-cancelled'
]

const WRONG_CREDENTIALS = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'

const MESSAGES = {
  'auth/popup-blocked': 'เบราว์เซอร์บล็อกหน้าต่างล็อกอิน กำลังเปลี่ยนไปหน้า Google...',
  'auth/operation-not-supported-in-this-environment': 'กำลังเปลี่ยนไปหน้า Google...',
  'auth/network-request-failed': 'เชื่อมต่ออินเทอร์เน็ตไม่ได้ ลองใหม่อีกครั้ง',
  'auth/unauthorized-domain': 'โดเมนนี้ยังไม่ได้รับอนุญาตให้ล็อกอิน (ผู้ดูแลต้องเพิ่มใน Firebase Console)',
  'auth/account-exists-with-different-credential': 'อีเมลนี้เคยสมัครด้วยวิธีอื่น กรุณาเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน',
  'auth/user-disabled': 'บัญชีนี้ถูกระงับ กรุณาติดต่อผู้ดูแลตลาด',
  'auth/too-many-requests': 'ลองหลายครั้งเกินไป กรุณารอสักครู่',
  'auth/operation-not-allowed': 'ยังไม่ได้เปิดการเข้าสู่ระบบวิธีนี้ (ผู้ดูแลต้องเปิดใน Firebase Console)',
  // Email/Password
  'auth/invalid-credential': WRONG_CREDENTIALS,
  'auth/invalid-login-credentials': WRONG_CREDENTIALS,
  'auth/wrong-password': WRONG_CREDENTIALS,
  'auth/user-not-found': WRONG_CREDENTIALS,
  'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
  'auth/email-already-in-use': 'อีเมลนี้ถูกใช้สมัครแล้ว กรุณาเข้าสู่ระบบ',
  'auth/weak-password': 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
  // ของแอปเอง: สร้าง users/{uid} ไม่สำเร็จ
  'app/profile-create-failed': 'สร้างข้อมูลผู้ใช้ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
}

// error ที่ควร fallback จาก popup ไปเป็น redirect
export const REDIRECT_FALLBACK_CODES = [
  'auth/popup-blocked',
  'auth/operation-not-supported-in-this-environment'
]

/**
 * คืนข้อความภาษาไทย หรือ '' ถ้าไม่ต้องแสดงอะไร (ผู้ใช้ปิด popup เอง)
 */
export function authErrorMessage(err, fallback = 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่') {
  if (!err) return ''
  if (SILENT_CODES.includes(err.code)) return ''
  const message = MESSAGES[err.code]
  if (message) return message
  console.error('Auth error:', err)
  return fallback
}
