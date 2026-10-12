// ชุด action ของ audit log (ต้องตรงกับรายการใน firestore.rules)
export const AUDIT_ACTIONS = {
  'booking.create': 'สร้างการจอง',
  'booking.slip_submit': 'ส่งสลิปใหม่',
  'booking.approve': 'อนุมัติการจอง',
  'booking.request_slip': 'ขอสลิปใหม่',
  'booking.reject': 'ปฏิเสธการจอง',
  'booking.cancel_self': 'ผู้เช่ายกเลิกการจอง',
  'booking.cancel_request': 'ขอยกเลิกการจอง',
  'booking.cancel_approve': 'อนุมัติการยกเลิก',
  'booking.cancel_deny': 'ไม่อนุมัติการยกเลิก',
  'booking.cancel_admin': 'ผู้ดูแลยกเลิกการจอง',
  'booking.expire': 'การจองหมดเวลา',
  'refund.record': 'บันทึกการคืนเงิน',
  'settings.update': 'แก้ไขตั้งค่าตลาด',
  'stall.close': 'ปิดแผง',
  'stall.open': 'เปิดแผง',
  'user.role_change': 'เปลี่ยนสิทธิ์ผู้ใช้',
  'legacy.end': 'สิ้นสุดการจองแบบเดิม',
  'booking.delete': 'ลบรายการจองที่ตัดสินแล้ว'
}

export const AUDIT_ACTION_KEYS = Object.keys(AUDIT_ACTIONS)

export const ROLE_LABEL = { owner: 'เจ้าของ', admin: 'ผู้ดูแล', tenant: 'ผู้เช่า', system: 'ระบบ' }

export const STATUS_LABEL_TH = {
  awaiting_slip: 'รอส่งสลิป',
  pending: 'รอตรวจสลิป',
  needs_slip: 'ขอสลิปใหม่',
  approved: 'อนุมัติแล้ว',
  rejected: 'ปฏิเสธแล้ว',
  cancelled: 'ยกเลิกแล้ว',
  expired: 'หมดเวลา',
  cancel_requested: 'ขอยกเลิก'
}

export const actionLabel = (action) => AUDIT_ACTIONS[action] || action
