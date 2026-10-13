import { doc, collection, serverTimestamp, getDocs, query, where, orderBy, limit, startAfter, Timestamp, writeBatch } from 'firebase/firestore'
import { db } from '../firebase/config'

const NAME_MAX = 80
const REASON_MAX = 300

/**
 * เตรียมเอกสาร audit log เข้า batch/transaction เดียวกับการกระทำ แล้วคืน auditId
 * (ใช้เป็น lastAuditId ของเอกสารที่ถูกกระทำ rules ตรวจว่ามี log ไปพร้อมกัน)
 * ห้ามมีฟังก์ชันเขียน log แยกหลังการกระทำเสร็จ: log ต้องไปพร้อมกันหรือไม่ไปเลย
 * ไม่เก็บรูปสลิป / เบอร์โทร / เลขบัตร ใน before/after
 *
 * @param batchOrTx writeBatch(db) หรือ transaction (มี .set(ref, data))
 * @param {{uid, name, role}} actor
 */
export function addAuditToBatch(batchOrTx, { actor, action, targetType, targetId, before, after, reason, bookingId, marketId, auditId: fixedId }) {
  if (!actor?.uid) throw new Error('ไม่พบข้อมูลผู้ทำรายการ กรุณาเข้าสู่ระบบใหม่')
  // auditId กำหนดเองได้เฉพาะกรณีที่ rules ต้องรู้ id ล่วงหน้า (เช่น delete_{bookingId} ตอนลบการจอง)
  const ref = fixedId ? doc(db, 'auditLogs', fixedId) : doc(collection(db, 'auditLogs'))
  const data = {
    at: serverTimestamp(),
    actorUid: actor.uid,
    actorName: String(actor.name || '').slice(0, NAME_MAX),
    actorRole: actor.role || 'tenant',
    action,
    targetType,
    targetId: String(targetId)
  }
  if (marketId) data.marketId = marketId
  if (bookingId) data.bookingId = bookingId
  if (before && Object.keys(before).length) data.before = before
  if (after && Object.keys(after).length) data.after = after
  if (reason) data.reason = String(reason).slice(0, REASON_MAX)
  batchOrTx.set(ref, data)
  return ref.id
}

export { diffFields } from '../utils/auditDiff'

/**
 * อ่านหน้าของ log (ใหม่สุดก่อน) สำหรับ admin/owner
 * กรองฝั่งเซิร์ฟเวอร์ได้ 1 ตัวเลือกต่อครั้ง (bookingId หรือ action) + ช่วงวันที่ ที่เหลือกรองฝั่งหน้าเว็บ
 * @returns {Promise<{ rows: object[], cursor: object|null, done: boolean }>}
 */
export async function fetchAuditPage({ bookingId, action, from, to, cursor, pageSize = 50 } = {}) {
  const constraints = []
  if (bookingId) constraints.push(where('bookingId', '==', bookingId))
  else if (action) constraints.push(where('action', '==', action))
  // วันที่เป็นเวลาไทย (UTC+7) สตริง 'YYYY-MM-DD'
  if (from) constraints.push(where('at', '>=', Timestamp.fromDate(new Date(`${from}T00:00:00+07:00`))))
  if (to) constraints.push(where('at', '<=', Timestamp.fromDate(new Date(`${to}T23:59:59.999+07:00`))))
  constraints.push(orderBy('at', 'desc'))
  if (cursor) constraints.push(startAfter(cursor))
  constraints.push(limit(pageSize))
  const snap = await getDocs(query(collection(db, 'auditLogs'), ...constraints))
  return {
    rows: snap.docs.map(d => ({ id: d.id, ...d.data() })),
    cursor: snap.docs.length ? snap.docs[snap.docs.length - 1] : cursor || null,
    done: snap.docs.length < pageSize
  }
}

/**
 * (เฉพาะ owner) ลบ audit log ตาม id แล้วเขียน log สรุป 'auditlog.purge' (จำนวน + เหตุผล) ใน batch เดียวกัน
 * log สรุปนี้ลบด้วยฟังก์ชันนี้ไม่ได้ในรอบเดียวกัน เพื่อให้ยังเห็นว่าใครล้างบันทึกเมื่อไร
 * @returns {Promise<number>} จำนวนที่ลบ
 */
export async function deleteAuditLogs(ids, actor) {
  if (!actor?.uid || actor.role !== 'owner') throw new Error('เฉพาะเจ้าของตลาด (owner) เท่านั้นที่ลบบันทึกการทำงานได้')
  const unique = [...new Set(ids)].filter(Boolean)
  const CHUNK = 400 // 1 batch = ลบ N + log สรุป 1 (เพดาน 500)
  for (let i = 0; i < unique.length; i += CHUNK) {
    const part = unique.slice(i, i + CHUNK)
    const batch = writeBatch(db)
    addAuditToBatch(batch, {
      actor,
      action: 'auditlog.purge',
      targetType: 'settings',
      targetId: 'auditLogs',
      after: { deletedCount: part.length }
    })
    part.forEach(id => batch.delete(doc(db, 'auditLogs', id)))
    await batch.commit()
  }
  return unique.length
}
