// คำนวณรายงานรายได้ (ไม่พึ่ง Firebase เพื่อให้ unit test ได้)
// รายได้นับตาม "วันขาย" ของแต่ละช่อง (slot) คืนเงินหักตามวันที่คืนจริง
import { toDateKey, addDays, diffDays } from './date.js'
import { parseSlotKey, getRounds, isMarketOpen } from './marketCalendar.js'

const toDate = (t) => (t?.toDate ? t.toDate() : t instanceof Date ? t : typeof t === 'number' ? new Date(t) : typeof t === 'string' ? new Date(t) : null)
const dateKeyOf = (t) => { const d = toDate(t); return d && !Number.isNaN(d.getTime()) ? toDateKey(d) : null }
const round2 = (n) => Math.round(n * 100) / 100
const inRange = (d, from, to) => d !== null && d >= from && d <= to

/** การจองนี้ถูกอนุมัติ (เงินเข้า) หรือเคยถูกอนุมัติก่อนยกเลิกไหม; การจองเก่าไม่มี status = ยืนยันแล้ว */
export function isRecognized(b) {
  const s = b.status || 'confirmed'
  if (['approved', 'cancel_requested', 'confirmed'].includes(s)) return true
  return s === 'cancelled' && b.wasApproved === true
}

/** ช่องที่ยังนับเป็นรายได้ (ไม่รวมช่องที่ปล่อยคืนตอนยกเลิก) */
export function countedSlots(b) {
  const released = new Set(Array.isArray(b.releasedSlots) ? b.releasedSlots : [])
  return (Array.isArray(b.slots) ? b.slots : []).filter(k => !released.has(k))
}

export function enumerateDates(from, to) {
  const out = []
  for (let d = from; d <= to; d = addDays(d, 1)) out.push(d)
  return out
}

/**
 * @param bookings   รายการจองที่ดึงมา (ช่วงกว้างกว่าหรือเท่ากับ from..to)
 * @param range      { from, to } 'YYYY-MM-DD'
 * @param ctx        { stalls: { [stallId]: { stallNo, zoneName } } }
 */
export function computeRevenue(bookings, { from, to }, ctx = {}) {
  const stalls = ctx.stalls || {}
  const dailyMap = new Map(enumerateDates(from, to).map(d => [d, { date: d, revenue: 0, refund: 0, slots: 0 }]))
  const roundMap = new Map() // `${date}|${roundId}` -> { date, roundId, slots, revenue }
  const zoneMap = new Map()
  const stallMap = new Map()
  const roundTotals = new Map()
  const rows = [] // รายการจองที่มีผลในช่วง
  const refundRows = []
  let gross = 0
  let refunds = 0
  let slotCount = 0
  let pendingAmount = 0
  let estimated = false
  const bookingIds = new Set()

  const addTo = (map, key, init, amount, slots) => {
    const cur = map.get(key) || { ...init, revenue: 0, slots: 0 }
    cur.revenue = round2(cur.revenue + amount)
    cur.slots += slots
    map.set(key, cur)
  }

  for (const b of bookings) {
    const stall = stalls[b.stallId] || {}
    const zoneName = stall.zoneName || 'ไม่ระบุโซน'
    const stallNo = b.stallNo || stall.stallNo || '-'
    const hasSlots = Array.isArray(b.slots) && b.slots.length > 0
    const price = Number(b.pricePerSlot ?? 0)

    if (b.status === 'pending' && hasSlots) {
      for (const k of b.slots) { const p = parseSlotKey(k); if (p && inRange(p.date, from, to)) pendingAmount += price }
    } else if (b.status === 'pending' && inRange(dateKeyOf(b.createdAt), from, to)) {
      pendingAmount += Number(b.amountDue || 0)
    }

    if (isRecognized(b)) {
      let counted = 0
      let amount = 0
      if (hasSlots) {
        for (const k of countedSlots(b)) {
          const p = parseSlotKey(k)
          if (!p || !inRange(p.date, from, to)) continue
          counted++
          amount += price
          const day = dailyMap.get(p.date)
          day.revenue = round2(day.revenue + price)
          day.slots++
          addTo(roundMap, `${p.date}|${p.roundId}`, { date: p.date, roundId: p.roundId }, price, 1)
          addTo(roundTotals, p.roundId, { roundId: p.roundId }, price, 1)
        }
      } else {
        // การจองเก่าไม่มีวันที่: นับตามวันที่อนุมัติ (หรือวันที่สร้าง) เป็นประมาณการ
        const d = dateKeyOf(b.decidedAt) || dateKeyOf(b.createdAt)
        if (inRange(d, from, to)) {
          counted = 1
          amount = Number(b.amountDue || 0)
          const day = dailyMap.get(d)
          day.revenue = round2(day.revenue + amount)
          day.slots++
          addTo(roundMap, `${d}|all`, { date: d, roundId: 'all' }, amount, 1)
          addTo(roundTotals, 'all', { roundId: 'all' }, amount, 1)
          estimated = true
        }
      }
      if (counted) {
        gross = round2(gross + amount)
        slotCount += counted
        bookingIds.add(b.id)
        addTo(zoneMap, zoneName, { zoneName }, amount, counted)
        addTo(stallMap, b.stallId || stallNo, { stallId: b.stallId, stallNo, zoneName }, amount, counted)
        rows.push({ booking: b, stallNo, zoneName, amount, slots: counted })
      }

      const refund = b.refund
      if (refund?.status === 'refunded' && b.wasApproved !== false) {
        const d = dateKeyOf(refund.refundedAt)
        if (inRange(d, from, to)) {
          const amt = Number(refund.amount || 0)
          refunds = round2(refunds + amt)
          dailyMap.get(d).refund = round2(dailyMap.get(d).refund + amt)
          refundRows.push({ booking: b, stallNo, amount: amt, date: d })
        }
      }
    }
  }

  const daily = [...dailyMap.values()].map(d => ({ ...d, net: round2(d.revenue - d.refund) }))
  const byRoundDaily = [...roundMap.values()].sort((a, b) => a.date.localeCompare(b.date) || a.roundId.localeCompare(b.roundId))
  const sortDesc = (arr) => arr.sort((a, b) => b.revenue - a.revenue)
  return {
    from,
    to,
    gross,
    refunds,
    net: round2(gross - refunds),
    bookingCount: bookingIds.size,
    slotCount,
    pendingAmount: round2(pendingAmount),
    estimated,
    daily,
    byRoundDaily,
    byRound: sortDesc([...roundTotals.values()]),
    byZone: sortDesc([...zoneMap.values()]),
    topStalls: sortDesc([...stallMap.values()]).slice(0, 10),
    rows,
    refundRows
  }
}

/** จำนวนช่องที่เปิดขายในช่วง × จำนวนแผงที่ไม่ปิด (ตัวหารของอัตราการใช้แผง) */
export function capacitySlots(settings, { from, to }, stallCount) {
  const rounds = getRounds(settings).length
  const days = enumerateDates(from, to).filter(d => isMarketOpen(settings, d)).length
  return days * rounds * stallCount
}

/** เปลี่ยนแปลงเทียบช่วงก่อนหน้า เป็นเปอร์เซ็นต์ (null ถ้าช่วงก่อนหน้าเป็น 0) */
export function percentChange(current, previous) {
  if (!previous) return null
  return Math.round((current - previous) / previous * 1000) / 10
}

/** ช่วงก่อนหน้าที่ยาวเท่ากันและต่อกับ from พอดี */
export function previousRange({ from, to }) {
  const len = diffDays(from, to) + 1
  return { from: addDays(from, -len), to: addDays(from, -1) }
}

/** รวมรายวันเป็นรายเดือน ('YYYY-MM') สำหรับช่วงยาว */
export function groupMonthly(daily) {
  const m = new Map()
  for (const d of daily) {
    const key = d.date.slice(0, 7)
    const cur = m.get(key) || { date: key, revenue: 0, refund: 0, slots: 0, net: 0 }
    cur.revenue = round2(cur.revenue + d.revenue)
    cur.refund = round2(cur.refund + d.refund)
    cur.slots += d.slots
    cur.net = round2(cur.revenue - cur.refund)
    m.set(key, cur)
  }
  return [...m.values()]
}
