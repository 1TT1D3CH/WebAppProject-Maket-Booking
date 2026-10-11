// ตรรกะล้วน (ไม่แตะ Firebase) สำหรับซิงก์แผงค้าแบบรายแผง: markets/{id}/stalls/{stallId}
// แยกไว้ให้ทดสอบได้ด้วย node --test

/** ฟิลด์ผังที่ admin แก้ได้ */
export const LAYOUT_FIELDS = ['stallNo', 'zoneId', 'x', 'y', 'width', 'height', 'price', 'notes']

/** ความยาวสูงสุดของข้อความสาธารณะ (ชื่อร้าน/ประเภทสินค้า) ต้องตรงกับ firestore.rules */
export const PUBLIC_TEXT_MAX = 60

const publicText = (v) => (typeof v === 'string' ? v.trim().slice(0, PUBLIC_TEXT_MAX) : '')

/**
 * bookedBy ที่เก็บในเอกสารแผง (อ่านได้สาธารณะ) มี id + ชื่อร้าน + ประเภทสินค้า (ให้ลูกค้าอื่นดูว่าแผงนี้ขายอะไร)
 * ห้ามมีชื่อจริง/เบอร์โทร/เลขบัตร — รายละเอียดผู้จองอยู่ใน bookings/{bookingId} ซึ่งอ่านได้เฉพาะเจ้าของและ admin
 */
export function toPublicBookedBy(bookedBy) {
  if (!bookedBy) return null
  const out = {
    tenantId: bookedBy.tenantId || bookedBy.uid || null,
    bookedAt: bookedBy.bookedAt || null
  }
  if (bookedBy.bookingId) out.bookingId = bookedBy.bookingId
  const shopName = publicText(bookedBy.shopName)
  const goodsType = publicText(bookedBy.goodsType)
  if (shopName) out.shopName = shopName
  if (goodsType) out.goodsType = goodsType
  return out
}

function sameBooking(a, b) {
  return (a?.tenantId || null) === (b?.tenantId || null) && (a?.bookedAt || null) === (b?.bookedAt || null)
}

function layoutOf(stall) {
  return {
    stallNo: stall.stallNo,
    zoneId: stall.zoneId,
    x: stall.x,
    y: stall.y,
    width: stall.width,
    height: stall.height,
    price: stall.price,
    notes: stall.notes || ''
  }
}

/**
 * คำนวณสิ่งที่ต้องเขียนลง Firestore ตอน admin กดบันทึก
 * - แผงใหม่ (ไม่มีใน initial): เขียนทุกฟิลด์
 * - แผงเดิม: เขียนเฉพาะฟิลด์ที่ admin เปลี่ยนจริง ไม่แตะ status/bookedBy ถ้าไม่ได้แก้
 *   (กันเขียนทับการจองของลูกค้าที่เข้ามาระหว่างที่ admin แก้ผัง — C4)
 * - แผงที่หายไปจาก stalls แต่เคยอยู่ใน initial: ลบ
 * @param {Array} stalls แผงปัจจุบันในเครื่อง
 * @param {Object} initial snapshot id -> แผง ตอนโหลด/บันทึกล่าสุด
 */
export function buildStallWrites(stalls, initial = {}) {
  const upserts = []
  const seen = new Set()

  for (const stall of stalls) {
    seen.add(stall.id)
    const old = initial[stall.id]
    const next = layoutOf(stall)

    if (!old) {
      upserts.push({
        id: stall.id,
        data: { ...next, status: stall.status || 'available', bookedBy: toPublicBookedBy(stall.bookedBy) }
      })
      continue
    }

    const data = {}
    const prev = layoutOf(old)
    for (const f of LAYOUT_FIELDS) {
      if (prev[f] !== next[f]) data[f] = next[f]
    }
    if (old.status !== stall.status || !sameBooking(old.bookedBy, stall.bookedBy)) {
      data.status = stall.status || 'available'
      data.bookedBy = toPublicBookedBy(stall.bookedBy)
    }
    if (Object.keys(data).length) upserts.push({ id: stall.id, data })
  }

  const deletes = Object.keys(initial).filter(id => !seen.has(id))
  return { upserts, deletes }
}

/**
 * รวมแผงจาก snapshot ใหม่ของ Firestore เข้ากับสิ่งที่ admin กำลังแก้ (C5)
 * - ไม่มีงานค้าง: ใช้ของ remote ทั้งหมด
 * - มีงานค้าง: เก็บฟิลด์ผัง/สถานะที่ admin แก้ไว้ แต่รับการจองใหม่จาก remote
 *   และรับแผงใหม่ที่ผู้อื่นเพิ่ม; ไม่ฟื้นแผงที่ admin ลบไว้
 * @returns {{ stalls: Array, initial: Object }} initial = snapshot ใหม่ที่ควรใช้เทียบตอนบันทึก
 */
export function mergeRemoteStalls(local, remote, initial, hasUnsaved) {
  if (!hasUnsaved) return { stalls: remote, initial: null }

  const localById = new Map(local.map(s => [s.id, s]))
  const nextInitial = { ...initial }
  const merged = []

  for (const r of remote) {
    const l = localById.get(r.id)
    const base = initial[r.id]

    if (!l) {
      // admin ลบไว้ในเครื่อง (ยังไม่บันทึก) -> ไม่ฟื้น; ไม่เคยมีมาก่อน = แผงใหม่ของผู้อื่น -> รับ
      if (!base) {
        merged.push(r)
        nextInitial[r.id] = { ...r }
      }
      continue
    }

    const statusUntouched = !base || (base.status === l.status && sameBooking(base.bookedBy, l.bookedBy))
    if (statusUntouched) {
      merged.push({ ...l, status: r.status, bookedBy: r.bookedBy ?? null })
      if (base) nextInitial[r.id] = { ...base, status: r.status, bookedBy: r.bookedBy ?? null }
    } else {
      merged.push(l)
    }
  }

  // แผงที่มีเฉพาะในเครื่อง (admin เพิ่มใหม่ ยังไม่บันทึก)
  const remoteIds = new Set(remote.map(r => r.id))
  for (const l of local) {
    if (!remoteIds.has(l.id) && !initial[l.id]) merged.push(l)
  }

  return { stalls: merged, initial: nextInitial }
}
