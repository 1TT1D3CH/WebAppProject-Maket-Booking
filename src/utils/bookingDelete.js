// กติกาลบการจองถาวร (ใช้ทั้งหน้าจอและ service; rules บังคับซ้ำที่ฝั่งฐานข้อมูล)

export const DELETABLE_STATUSES = ['approved', 'rejected', 'cancelled', 'expired']
export const DELETE_REASON_MIN = 3
export const DELETE_REASON_MAX = 300

/**
 * ลบการจองได้ไหม
 * - สถานะต้องเป็น approved / rejected / cancelled / expired (การจองเก่าที่ไม่มี status นับเป็น approved)
 * - ห้ามมียอดรอคืนเงิน (refund.status == 'pending')
 * - ออกเลขใบเสร็จแล้ว: เฉพาะ owner
 * @returns {{ ok: boolean, reasonText: string, ownerOnly?: boolean }}
 */
export function canDeleteBooking(booking, role) {
  if (!booking) return { ok: false, reasonText: 'ไม่พบรายการจอง' }
  if (role !== 'admin' && role !== 'owner') return { ok: false, reasonText: 'เฉพาะผู้ดูแลหรือเจ้าของตลาดเท่านั้น' }
  const status = booking.status || 'approved'
  if (!DELETABLE_STATUSES.includes(status)) {
    return { ok: false, reasonText: 'รายการที่ยังรอดำเนินการลบไม่ได้ ต้องตัดสินหรือยกเลิกให้เสร็จก่อน' }
  }
  if (booking.refund?.status === 'pending') {
    return { ok: false, reasonText: 'ยังมียอดรอคืนเงิน ต้องบันทึกการคืนเงินให้เสร็จก่อน' }
  }
  if (booking.receiptNo && role !== 'owner') {
    return { ok: false, reasonText: 'ออกใบเสร็จแล้ว เจ้าของตลาดเท่านั้นที่ลบได้', ownerOnly: true }
  }
  return { ok: true, reasonText: '' }
}

/** ข้อความที่ต้องพิมพ์ยืนยัน: รหัสแผง (ถ้าไม่มีใช้ 6 ตัวแรกของ id) */
export function deleteConfirmCode(booking) {
  return String(booking?.stallNo || String(booking?.id || '').slice(0, 6) || '').trim()
}

/** เทียบรหัสที่พิมพ์ (ไม่สนตัวพิมพ์เล็กใหญ่ ตัดช่องว่างหัวท้าย) */
export function confirmCodeMatches(input, expected) {
  const a = String(input ?? '').trim().toLowerCase()
  const b = String(expected ?? '').trim().toLowerCase()
  return a.length > 0 && a === b
}

/** ปิดเบอร์โทรบางส่วนก่อนเก็บใน audit log เช่น 0971238030 -> 097***8030 */
export function maskPhone(phone) {
  const d = String(phone ?? '').replace(/\D/g, '')
  if (d.length < 7) return d ? '***' : ''
  return `${d.slice(0, 3)}***${d.slice(-4)}`
}

/** สำเนาข้อมูลการจองสำหรับ audit log (ไม่มีรูปสลิป เลขบัญชี หรือเบอร์โทรเต็ม) */
export function snapshotForAudit(booking) {
  const out = {
    status: booking.status || 'approved',
    stallNo: booking.stallNo || null,
    customerName: booking.customerName || null,
    phone: maskPhone(booking.customerPhone) || null,
    amountDue: booking.amountDue ?? null,
    receiptNo: booking.receiptNo || null,
    slotCount: Array.isArray(booking.slots) ? booking.slots.length : 0
  }
  if (booking.refund?.status) out.refund = `${booking.refund.status} ${booking.refund.amount ?? ''}`.trim()
  return out
}
