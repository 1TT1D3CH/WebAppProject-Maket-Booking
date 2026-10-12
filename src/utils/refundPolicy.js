// ยอดคืนเงินที่แนะนำตามนโยบายยกเลิก (admin แก้ได้แต่ต้องใส่เหตุผล)
import { todayBangkok, diffDays } from './date.js'
import { parseSlotKey } from './marketCalendar.js'

const round2 = (n) => Math.round(n * 100) / 100

/**
 * @param booking { slots?, pricePerSlot?, totalAmount?, amountDue }
 * @param policy  { fullRefundDaysBefore, partialRefundPercent, noRefundOnMarketDay }
 * @returns {{ amount, paid, percent, reasonText, releaseSlots: string[] }}
 *   releaseSlots = ช่องที่ยังไม่ถึงวันขาย (ปล่อยให้คนอื่นจองได้)
 */
export function suggestRefund(booking, policy, now = new Date()) {
  const paid = Number(booking.totalAmount ?? booking.amountDue ?? 0)
  const today = todayBangkok(now)
  const slots = Array.isArray(booking.slots) ? booking.slots : []
  if (!slots.length) {
    return { amount: paid, paid, percent: 100, releaseSlots: [], reasonText: 'การจองแบบเดิมไม่ระบุวัน คืนเต็มจำนวน (ผู้ดูแลปรับยอดได้)' }
  }
  const price = Number(booking.pricePerSlot ?? paid / slots.length)
  const fullDays = Number(policy.fullRefundDaysBefore)
  const partialPct = Number(policy.partialRefundPercent)
  let amount = 0
  const release = []
  let full = 0
  let partial = 0
  let none = 0
  for (const key of slots) {
    const p = parseSlotKey(key)
    if (!p) continue
    const days = diffDays(today, p.date)
    if (days > 0) release.push(key)
    if (days > 0 && days >= fullDays) { amount += price; full++ }
    else if (days > 0 || (days === 0 && !policy.noRefundOnMarketDay)) { amount += price * partialPct / 100; partial++ }
    else none++
  }
  amount = round2(amount)
  const parts = []
  if (full) parts.push(`${full} ช่องคืนเต็ม (ยกเลิกก่อนวันขาย ${fullDays} วันขึ้นไป)`)
  if (partial) parts.push(`${partial} ช่องคืน ${partialPct}%`)
  if (none) parts.push(`${none} ช่องไม่คืน (ถึงวันขายหรือผ่านมาแล้ว)`)
  return {
    amount,
    paid,
    percent: paid ? round2(amount / paid * 100) : 0,
    releaseSlots: release,
    reasonText: parts.join(' · ') || 'ไม่มีช่องที่คืนได้'
  }
}
