import { db, isRealFirebaseConfigured } from '../firebase/config'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'

// เลือก backend เก็บรูปสลิปด้วย VITE_SLIP_BACKEND: 'firestore' (ค่าเริ่มต้น, Spark plan)
// 'storage' เตรียมไว้สำหรับอัปเกรด Blaze (ยังไม่เปิดใช้)
const BACKEND = import.meta.env?.VITE_SLIP_BACKEND || 'firestore'

export const SLIPS_COLLECTION = 'bookingSlips'

export const slipRef = (bookingId) => doc(db, SLIPS_COLLECTION, bookingId)

/** ข้อมูลเอกสารสลิปสำหรับเขียนใน transaction/batch ร่วมกับ booking (backend firestore) */
export function buildSlipDoc({ tenantId, marketId, dataUrl, mime, bytes, createdAt }) {
  if (BACKEND !== 'firestore') {
    throw new Error('VITE_SLIP_BACKEND=storage ยังไม่เปิดใช้ (ต้องอัปเกรด Blaze)')
  }
  return { tenantId, marketId, dataUrl, mime, bytes, createdAt }
}

/** อ่านรูปสลิป (เจ้าของหรือ admin เท่านั้นตาม rules) คืน null ถ้าไม่มี */
export async function getSlip(bookingId) {
  if (!isRealFirebaseConfigured || !db || !bookingId) return null
  const snap = await getDoc(slipRef(bookingId))
  return snap.exists() ? snap.data() : null
}

/** ลบรูปสลิป (admin เท่านั้นตาม rules) */
export async function deleteSlip(bookingId) {
  if (!isRealFirebaseConfigured || !db || !bookingId) return
  await deleteDoc(slipRef(bookingId))
}
