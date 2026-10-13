import { db, isRealFirebaseConfigured } from '../firebase/config'
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  writeBatch,
  collection,
  deleteField,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { toPublicBookedBy, PUBLIC_TEXT_MAX } from '../utils/stallSync'
import { slipRef, buildSlipDoc } from './slipStorage'
import { keepAlive } from '../utils/keepAlive'
import { addAuditToBatch } from './auditLog'
import { useAuthStore } from '../stores/authStore'
import { isHoldExpired } from '../utils/holdTimer'
import { suggestRefund } from '../utils/refundPolicy'
import { formatReceiptNo, thaiYearOf, formatBaht } from '../utils/receipt'
import { todayBangkok, addDays } from '../utils/date'

const MARKET_ID = 'main-layout'
const BATCH_LIMIT = 450 // เพดานจริงของ Firestore คือ 500 การเขียนต่อ batch
export const SLIP_RETENTION_MS = 24 * 60 * 60 * 1000 // เก็บรูปสลิปที่อนุมัติแล้วไว้ 1 วัน

// ผู้ทำรายการที่เป็นเจ้าของการจองเอง: role ต้องตรงกับ users/{uid}.role จริง (rules ตรวจ)
// admin/owner ที่ลองจองเองจึงต้องส่ง role ของตัวเอง ไม่ใช่ 'tenant'
const selfActor = (uid, name) => {
  const auth = useAuthStore()
  const role = auth.currentUser?.uid === uid && auth.userRole ? auth.userRole : 'tenant'
  return { uid, name, role }
}

const lockRef = (stallId, key) => doc(db, 'bookingLocks', `${stallId}_${key}`)
const marketRef = () => doc(db, 'markets', MARKET_ID)
const stallsCol = () => collection(db, 'markets', MARKET_ID, 'stalls')

/**
 * Clean & sanitize objects before passing to Firestore
 * Eliminates Vue reactivity proxies and removes undefined fields
 */
function sanitizeData(data) {
  return JSON.parse(JSON.stringify(data || []))
}

/**
 * Subscribe to Real-Time Market Layout (markets/main-layout) และแผงค้ารายแผง
 * (markets/main-layout/stalls/*) แล้วรวมเป็นก้อนเดียวให้ store
 * stallsInFirestore = false เมื่อยังไม่มีแผงใน subcollection (ข้อมูลเก่าที่เก็บเป็น array ใน
 * เอกสารผัง) store จะเขียนแผงทั้งหมดเข้า subcollection ตอน admin บันทึกครั้งแรก
 */
export function subscribeToMarketLayout(onDataReceived, onError) {
  if (!isRealFirebaseConfigured || !db) {
    if (import.meta.env.DEV) console.log('Firebase not configured. Real-time sync skipped.')
    return () => {}
  }

  let marketData = null // undefined = ยังไม่ได้รับ, null = ไม่มีเอกสาร
  let marketReady = false
  let stallDocs = null
  const emit = () => {
    if (!marketReady || stallDocs === null || !onDataReceived) return
    const inSub = stallDocs.length > 0
    onDataReceived({
      exists: marketData !== null,
      name: marketData?.name,
      // null = เอกสารยังไม่มีฟิลด์นี้ (ไม่ใช่ว่าง) ให้ store แยกออกจาก "ว่างจริง"
      zones: Array.isArray(marketData?.zones) ? marketData.zones : null,
      stalls: inSub ? stallDocs : (Array.isArray(marketData?.stalls) ? marketData.stalls : []),
      stallsInFirestore: inSub,
      layoutObjects: Array.isArray(marketData?.layoutObjects) ? marketData.layoutObjects : null,
      marketWidthMeters: marketData?.marketWidthMeters,
      marketHeightMeters: marketData?.marketHeightMeters,
      gridSnapMeters: marketData?.gridSnapMeters,
      updatedAt: marketData?.updatedAt
    })
  }
  const fail = (err) => {
    console.warn('Firestore snapshot listener warning/notice:', err.message)
    if (onError) onError(err)
  }

  // keepAlive: ถ้า listener พัง (เน็ตหลุด ฯลฯ) จะเปิดใหม่เอง ไม่ต้องให้ผู้ใช้กด F5
  const unsubMarket = keepAlive(({ ok, fail: retry }) => onSnapshot(marketRef(), (snap) => {
    ok()
    marketData = snap.exists() ? snap.data() : null
    marketReady = true
    emit()
  }, (err) => { fail(err); retry(err) }))

  const unsubStalls = keepAlive(({ ok, fail: retry }) => onSnapshot(stallsCol(), (snap) => {
    ok()
    stallDocs = snap.docs.map(d => ({ ...d.data(), id: d.id }))
    emit()
  }, (err) => { fail(err); retry(err) }))

  return () => {
    unsubMarket()
    unsubStalls()
  }
}

/**
 * บันทึกผังตลาด (เฉพาะ admin/owner ตาม rules)
 * @param {{ upserts: Array<{id: string, data: Object}>, deletes: string[] }} stallWrites
 *        เฉพาะแผงที่เปลี่ยน ดู buildStallWrites() — ไม่ส่ง stalls ทั้งก้อนอีกต่อไป
 * @returns {{ success: boolean, error?: Error }} ไม่โยน error เพื่อให้ผู้เรียกแจ้งผลตามจริง
 */
export async function saveMarketLayoutToFirestore(marketName, zones, dimensions = {}, layoutObjects = [], stallWrites = { upserts: [], deletes: [] }, currentStallIds = null) {
  if (!isRealFirebaseConfigured || !db) {
    return { success: false, error: new Error('ยังไม่ได้ตั้งค่า Firebase') }
  }

  try {
    const marketPayload = {
      name: marketName || 'ตลาดยามเย็น Walking Street KKU',
      zones: sanitizeData(zones),
      layoutObjects: sanitizeData(layoutObjects),
      marketWidthMeters: dimensions.marketWidthMeters || 30,
      marketHeightMeters: dimensions.marketHeightMeters || 20,
      gridSnapMeters: dimensions.gridSnapMeters || 0.5,
      updatedAt: new Date().toISOString(),
      stalls: deleteField() // เลิกใช้ array stalls ในเอกสารผัง (ย้ายไป subcollection แล้ว)
    }

    // ผังในเครื่อง admin คือต้นฉบับ: ลบแผงใน Firestore ที่ไม่อยู่ในผังแล้ว (แผงค้าง/ขยะ ที่ทำให้หน้าคนทั่วไปเห็นแผงซ้อนทับ)
    const deleteIds = new Set(stallWrites.deletes)
    if (Array.isArray(currentStallIds)) {
      const keep = new Set(currentStallIds)
      const existing = await getDocs(stallsCol())
      existing.forEach(d => { if (!keep.has(d.id)) deleteIds.add(d.id) })
    }

    const ops = [
      ...stallWrites.upserts.map(({ id, data }) => ({ type: 'set', ref: doc(stallsCol(), id), data: sanitizeData(data) })),
      ...[...deleteIds].map(id => ({ type: 'delete', ref: doc(stallsCol(), id) }))
    ]

    // แผงต้องถูกเขียนก่อน แล้วค่อยลบฟิลด์ stalls เดิม กันข้อมูลหายถ้าบันทึกกลางทางล้ม
    for (let i = 0; i < ops.length; i += BATCH_LIMIT) {
      const batch = writeBatch(db)
      for (const op of ops.slice(i, i + BATCH_LIMIT)) {
        if (op.type === 'set') batch.set(op.ref, op.data, { merge: true })
        else batch.delete(op.ref)
      }
      await batch.commit()
    }

    const last = writeBatch(db)
    last.set(marketRef(), marketPayload, { merge: true })
    await last.commit()

    return { success: true, mode: 'firestore' }
  } catch (err) {
    console.error('Firestore save error:', err)
    return { success: false, error: err }
  }
}

/**
 * จองแผงด้วย transaction: เปลี่ยนเฉพาะสถานะของแผงนั้นเป็น 'pending' (รอตรวจสลิป)
 * + สร้างรายการจอง + เก็บรูปสลิป ในครั้งเดียว ล้มส่วนใดส่วนหนึ่งจะไม่มีอะไรค้าง
 * rules ฝั่งเซิร์ฟเวอร์บังคับว่าผู้เช่าเปลี่ยนได้แค่ available -> pending ของตัวเอง
 * customerInfo.slip = { dataUrl, mime, bytes, hash }
 * (ไม่แตะ zones/ชื่อผัง/แผงอื่น — C6)
 */
export async function bookStallWithTransaction(stallId, customerInfo) {
  if (!isRealFirebaseConfigured || !db) {
    throw new Error('ยังไม่ได้ตั้งค่า Firebase จึงจองไม่ได้')
  }
  if (!customerInfo?.tenantId) {
    throw new Error('กรุณาเข้าสู่ระบบก่อนจอง')
  }
  if (!customerInfo.slip?.dataUrl) {
    throw new Error('กรุณาแนบสลิปการโอนเงินก่อนจอง')
  }

  const stallRef = doc(stallsCol(), stallId)
  const bookingRef = doc(collection(db, 'bookings'))

  await runTransaction(db, async (transaction) => {
    const stallDoc = await transaction.get(stallRef)
    if (!stallDoc.exists()) {
      throw new Error('ไม่พบข้อมูลแผงค้านี้ในระบบ (ผู้ดูแลอาจยังไม่ได้บันทึกผัง) กรุณาลองใหม่ภายหลัง')
    }

    const stall = stallDoc.data()
    if (stall.status === 'booked' || stall.status === 'pending') {
      throw new Error(`แผงค้า ${stall.stallNo} ถูกผู้อื่นจองไว้ก่อนหน้านี้แล้ว!`)
    }
    if (stall.status === 'disabled') {
      throw new Error(`แผงค้า ${stall.stallNo} ปิดให้บริการ ไม่สามารถจองได้`)
    }

    const bookedBy = toPublicBookedBy({
      tenantId: customerInfo.tenantId,
      bookedAt: new Date().toISOString(),
      bookingId: bookingRef.id,
      shopName: customerInfo.shopName,
      goodsType: customerInfo.goodsType
    })

    const auditId = addAuditToBatch(transaction, {
      actor: selfActor(customerInfo.tenantId, customerInfo.name),
      action: 'booking.create',
      targetType: 'booking',
      targetId: bookingRef.id,
      bookingId: bookingRef.id,
      marketId: MARKET_ID,
      after: { status: 'pending', stallNo: stall.stallNo || null }
    })
    transaction.update(stallRef, { status: 'pending', bookedBy, updatedAt: new Date().toISOString() })
    transaction.set(bookingRef, {
      stallId,
      stallNo: stall.stallNo || null,
      tenantId: customerInfo.tenantId,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      shopName: (customerInfo.shopName || '').trim().slice(0, PUBLIC_TEXT_MAX),
      goodsType: (customerInfo.goodsType || '').trim().slice(0, PUBLIC_TEXT_MAX),
      amountDue: stall.price,
      slipHash: customerInfo.slip.hash,
      slipUploadedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      status: 'pending',
      lastAuditId: auditId
    })
    transaction.set(slipRef(bookingRef.id), buildSlipDoc({
      tenantId: customerInfo.tenantId,
      marketId: MARKET_ID,
      dataUrl: customerInfo.slip.dataUrl,
      mime: customerInfo.slip.mime,
      bytes: customerInfo.slip.bytes,
      createdAt: serverTimestamp()
    }))
  })

  const snap = await getDoc(stallRef)
  return { success: true, mode: 'firestore', bookedBy: snap.exists() ? snap.data().bookedBy : null }
}

/**
 * (admin) เติมชื่อร้าน/ประเภทสินค้าลง bookedBy ของแผงที่จองไว้ก่อนมีฟีเจอร์นี้
 * อ่านจาก bookings ของแผงที่ยังถือครองอยู่ (bookedBy.bookingId ตรงกัน) เขียนเฉพาะฟิลด์ที่ยังไม่มี
 * @returns {Promise<{ updated: number, skipped: number }>}
 */
export async function backfillPublicBookingInfo() {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  const [stallSnap, bookingSnap] = await Promise.all([getDocs(stallsCol()), getDocs(collection(db, 'bookings'))])
  const bookings = new Map(bookingSnap.docs.map(d => [d.id, d.data()]))

  const ops = []
  let skipped = 0
  for (const sd of stallSnap.docs) {
    const bb = sd.data().bookedBy
    if (!bb?.bookingId) continue
    const b = bookings.get(bb.bookingId)
    const patch = {}
    const shopName = typeof b?.shopName === 'string' ? b.shopName.trim().slice(0, PUBLIC_TEXT_MAX) : ''
    const goodsType = typeof b?.goodsType === 'string' ? b.goodsType.trim().slice(0, PUBLIC_TEXT_MAX) : ''
    if (shopName && !bb.shopName) patch['bookedBy.shopName'] = shopName
    if (goodsType && !bb.goodsType) patch['bookedBy.goodsType'] = goodsType
    if (Object.keys(patch).length) ops.push({ ref: sd.ref, patch })
    else skipped++
  }

  for (let i = 0; i < ops.length; i += BATCH_LIMIT) {
    const batch = writeBatch(db)
    ops.slice(i, i + BATCH_LIMIT).forEach(({ ref, patch }) => batch.update(ref, patch))
    await batch.commit()
  }
  return { updated: ops.length, skipped }
}

/** อ่านรายละเอียดการจอง (ชื่อ/เบอร์โทร) — rules อนุญาตเฉพาะเจ้าของรายการและ admin */
export async function fetchBooking(bookingId) {
  if (!isRealFirebaseConfigured || !db || !bookingId) return null
  try {
    const snap = await getDoc(doc(db, 'bookings', bookingId))
    return snap.exists() ? snap.data() : null
  } catch (err) {
    console.warn('Fetch booking notice:', err.message)
    return null
  }
}

// ─── ตรวจสลิป (admin / owner) ────────────────────────────────────────────────

/**
 * ฟังรายการจองตามสถานะแบบ realtime (รูปสลิปไม่ได้มาด้วย ใช้ getSlip ตอนเปิดดู)
 * ต้องมี index bookings (status, createdAt) ใน firestore.indexes.json
 * @returns {Function} unsubscribe
 */
export function subscribeBookingsByStatus(statuses, { order = 'asc', max = 100 } = {}, onData, onError) {
  if (!isRealFirebaseConfigured || !db) return () => {}
  const q = query(
    collection(db, 'bookings'),
    where('status', 'in', statuses),
    orderBy('createdAt', order),
    limit(max)
  )
  return keepAlive(({ ok, fail }) => onSnapshot(q, (snap) => {
    ok()
    onData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }, (err) => {
    onError?.(err)
    fail(err)
  }))
}

/** การจองอื่นที่ใช้ไฟล์สลิปเดียวกัน (hash เดียวกัน) เตือนอย่างเดียว ไม่บล็อก */
export async function findBookingsWithSameSlip(slipHash, excludeId) {
  if (!isRealFirebaseConfigured || !db || !slipHash) return []
  const snap = await getDocs(query(collection(db, 'bookings'), where('slipHash', '==', slipHash), limit(6)))
  return snap.docs.filter(d => d.id !== excludeId).map(d => ({ id: d.id, ...d.data() }))
}

const DECISION_ACTION = { approved: 'booking.approve', needs_slip: 'booking.request_slip', rejected: 'booking.reject' }

const DECISION_NOTICE = {
  approved: (no) => ({ title: 'อนุมัติการจองแล้ว', message: `การจองแผง ${no} ของคุณได้รับการอนุมัติแล้ว` }),
  needs_slip: (no, reason) => ({ title: 'ขอสลิปใหม่', message: `การจองแผง ${no}: กรุณาส่งสลิปใหม่ (${reason})` }),
  rejected: (no, reason) => ({ title: 'การจองถูกปฏิเสธ', message: `การจองแผง ${no} ถูกปฏิเสธ (${reason})` })
}

/**
 * ตัดสินการจอง: booking + สถานะแผง + แจ้งเตือนผู้เช่า ใน transaction เดียว
 * approved -> แผง booked | rejected -> แผง available | needs_slip -> แผงยัง pending
 * ถ้าถูกตัดสินไปแล้ว (admin อีกคนกดก่อน) จะโยน error code 'already-decided' ไม่ทับ
 */
export async function decideBooking({ bookingId, decision, reason = '', actor, resubmitHours = 24 }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  if (!['approved', 'needs_slip', 'rejected'].includes(decision)) throw new Error('การตัดสินไม่ถูกต้อง')
  if (!actor?.uid) throw new Error('ไม่พบข้อมูลผู้ตรวจ กรุณาเข้าสู่ระบบใหม่')
  const cleanReason = String(reason || '').trim().slice(0, 300)
  if (decision !== 'approved' && !cleanReason) throw new Error('กรุณาระบุเหตุผล')

  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const bSnap = await tx.get(bookingRef)
    if (!bSnap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = bSnap.data()

    const canDecide = b.status === 'pending' || (b.status === 'needs_slip' && decision === 'rejected')
    if (!canDecide) {
      const err = new Error('รายการนี้ถูกตรวจไปแล้ว')
      err.code = 'already-decided'
      err.current = b
      throw err
    }

    const stallRef = doc(stallsCol(), b.stallId)
    const sSnap = await tx.get(stallRef)
    if (!sSnap.exists()) throw new Error('ไม่พบแผงของรายการนี้ (อาจถูกลบออกจากผัง)')

    // การจองตามวัน/รอบ: สถานะแผงไม่เปลี่ยน ต้องเปลี่ยน lock ของทุก slot แทน (อ่านก่อนเขียน)
    const isSlot = Array.isArray(b.slots) && b.slots.length > 0
    const lockSnaps = isSlot ? await Promise.all(b.slots.map(k => tx.get(lockRef(b.stallId, k)))) : []

    // ออกเลขใบเสร็จตอนอนุมัติ (อ่านตัวนับก่อนเขียนอะไรทั้งหมด)
    let receipt = null
    if (decision === 'approved' && !b.receiptNo) {
      const year = thaiYearOf(todayBangkok())
      const counterRef = doc(db, 'counters', `receipts_${year}`)
      const cSnap = await tx.get(counterRef)
      receipt = { year, seq: (cSnap.exists() ? cSnap.data().next : 0) + 1, counterRef, exists: cSnap.exists() }
    }

    const auditId = addAuditToBatch(tx, {
      actor,
      action: DECISION_ACTION[decision],
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: b.status },
      after: { status: decision },
      reason: decision === 'approved' ? '' : cleanReason
    })
    const update = { status: decision, decidedBy: actor.uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp(), lastAuditId: auditId }
    if (decision !== 'approved') update.statusReason = cleanReason
    if (receipt) {
      update.receiptNo = formatReceiptNo(receipt.year, receipt.seq)
      update.receiptSeq = receipt.seq
      update.receiptYear = receipt.year
      update.receiptIssuedAt = serverTimestamp()
      if (receipt.exists) tx.update(receipt.counterRef, { next: receipt.seq })
      else tx.set(receipt.counterRef, { year: receipt.year, next: receipt.seq })
    }
    // ขอสลิปใหม่ของการจองรายวัน/รอบ: เริ่มนับเวลาใหม่ หมดเวลาแล้วช่องกลับว่าง
    const holdMinutes = Math.round(resubmitHours * 60)
    if (decision === 'needs_slip' && isSlot) {
      update.holdStartedAt = serverTimestamp()
      update.holdMinutes = holdMinutes
    }
    tx.update(bookingRef, update)
    // อนุมัติแล้ว: ตั้งเวลาลบรูปสลิปอัตโนมัติ (ตัวกวาดฝั่งแอดมิน purgeExpiredSlips เป็นคนลบ)
    if (decision === 'approved') {
      tx.update(slipRef(bookingId), { purgeAfter: Timestamp.fromMillis(Date.now() + SLIP_RETENTION_MS) })
    }

    const now = new Date().toISOString()
    if (isSlot) {
      for (const ls of lockSnaps) {
        if (!ls.exists() || ls.data().bookingId !== bookingId) continue
        if (decision === 'approved') tx.update(ls.ref, { status: 'approved' })
        if (decision === 'rejected') tx.delete(ls.ref)
        if (decision === 'needs_slip') tx.update(ls.ref, { status: 'needs_slip', holdStartedAt: serverTimestamp(), holdMinutes })
      }
    } else {
      if (decision === 'approved') tx.update(stallRef, { status: 'booked', updatedAt: now })
      if (decision === 'rejected') tx.update(stallRef, { status: 'available', bookedBy: null, updatedAt: now })
    }

    const stallNo = b.stallNo || sSnap.data().stallNo || ''
    const notice = DECISION_NOTICE[decision](stallNo, cleanReason)
    tx.set(doc(collection(db, 'notifications')), {
      tenantId: b.tenantId,
      stallId: b.stallId,
      stallNo,
      ...notice,
      type: 'SLIP_REVIEW',
      isRead: false,
      createdAt: now
    })
  })
}

// ─── ฝั่งผู้เช่า: การจองของฉัน ───────────────────────────────────────────────

/** ฟังการจองของตัวเองแบบ realtime ต้องมี index bookings (tenantId, createdAt DESC) */
export function subscribeMyBookings(uid, onData, onError, max = 50) {
  if (!isRealFirebaseConfigured || !db || !uid) return () => {}
  const q = query(collection(db, 'bookings'), where('tenantId', '==', uid), orderBy('createdAt', 'desc'), limit(max))
  return keepAlive(({ ok, fail }) => onSnapshot(q, (snap) => {
    ok()
    onData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }, (err) => {
    onError?.(err)
    fail(err)
  }))
}

/**
 * ส่งสลิปใหม่หลังถูกขอ: อัปเดตรูป + booking กลับเป็น pending (ล้างเหตุผล) ใน transaction เดียว
 * @param {{dataUrl, mime, bytes, hash}} slip
 */
export async function resubmitSlip({ bookingId, tenantId, tenantName = '', slip }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  if (!slip?.dataUrl) throw new Error('กรุณาแนบสลิปใหม่')
  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(bookingRef)
    if (!snap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = snap.data()
    if (b.status !== 'needs_slip') {
      const err = new Error('รายการนี้ไม่ได้อยู่ในสถานะรอสลิปใหม่แล้ว')
      err.code = 'bad-status'
      throw err
    }
    if (isHoldExpired(b)) {
      const err = new Error('หมดเวลาส่งสลิปใหม่แล้ว ช่องนี้ถูกปล่อยให้คนอื่นจองได้')
      err.code = 'hold-expired'
      throw err
    }
    const isSlot = Array.isArray(b.slots) && b.slots.length > 0
    const lockSnaps = isSlot ? await Promise.all(b.slots.map(k => tx.get(lockRef(b.stallId, k)))) : []
    if (isSlot && lockSnaps.some(ls => !ls.exists() || ls.data().bookingId !== bookingId)) {
      const err = new Error('ช่องของการจองนี้ถูกจองโดยคนอื่นไปแล้ว')
      err.code = 'hold-lost'
      throw err
    }
    const auditId = addAuditToBatch(tx, {
      actor: selfActor(tenantId, tenantName || snap.data().customerName),
      action: 'booking.slip_submit',
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: 'needs_slip' },
      after: { status: 'pending' }
    })
    tx.update(bookingRef, {
      status: 'pending',
      statusReason: deleteField(),
      slipHash: slip.hash,
      slipUploadedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastAuditId: auditId
    })
    for (const ls of lockSnaps) if (ls.data().status === 'needs_slip') tx.update(ls.ref, { status: 'pending' })
    tx.set(slipRef(bookingId), buildSlipDoc({
      tenantId,
      marketId: MARKET_ID,
      dataUrl: slip.dataUrl,
      mime: slip.mime,
      bytes: slip.bytes,
      createdAt: serverTimestamp()
    }))
  })
}

/** ยกเลิกการจองที่ยังไม่อนุมัติ (awaiting_slip / pending / needs_slip) และปล่อยแผงใน transaction เดียว */
export async function cancelMyBooking(bookingId) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const bSnap = await tx.get(bookingRef)
    if (!bSnap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = bSnap.data()
    if (!['awaiting_slip', 'pending', 'needs_slip'].includes(b.status)) {
      const err = new Error('ยกเลิกเองไม่ได้ในสถานะนี้ กรุณาติดต่อผู้ดูแลตลาด')
      err.code = 'bad-status'
      throw err
    }
    const stallRef = doc(stallsCol(), b.stallId)
    const sSnap = await tx.get(stallRef)
    if (!sSnap.exists()) throw new Error('ไม่พบแผงของรายการนี้')
    const isSlot = Array.isArray(b.slots) && b.slots.length > 0
    const lockSnaps = isSlot ? await Promise.all(b.slots.map(k => tx.get(lockRef(b.stallId, k)))) : []
    const auditId = addAuditToBatch(tx, {
      actor: selfActor(b.tenantId, b.customerName),
      action: 'booking.cancel_self',
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: b.status },
      after: { status: 'cancelled' }
    })
    // ส่งสลิปแล้วค่อยยกเลิก: ให้ admin ตรวจว่าต้องคืนเงินไหม
    const patch = { status: 'cancelled', updatedAt: serverTimestamp(), lastAuditId: auditId }
    if (b.status === 'pending') patch.refund = { status: 'pending' }
    tx.update(bookingRef, patch)
    if (isSlot) {
      // ปล่อยทุก slot ของการจองนี้ (เฉพาะ lock ที่ยังชี้การจองนี้)
      for (const ls of lockSnaps) if (ls.exists() && ls.data().bookingId === bookingId) tx.delete(ls.ref)
    } else if (sSnap.data().bookedBy?.bookingId === bookingId) {
      tx.update(stallRef, { status: 'available', bookedBy: null, updatedAt: new Date().toISOString() })
    }
  })
}

/**
 * (admin) ลบรายการจองที่ปฏิเสธ/ยกเลิกแล้วออกจากรายการ (พร้อมรูปสลิป) + audit log ใน batch เดียวกัน
 * ไม่ลบรายการ approved (แผงยังเป็นของผู้เช่า) rules บังคับซ้ำ
 * @param {Array<{id, status, stallNo}>} bookings
 * @returns {Promise<number>} จำนวนที่ลบ
 */
export async function deleteDecidedBookings(bookings, actor) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  const targets = bookings.filter(b => ['rejected', 'cancelled'].includes(b.status))
  const CHUNK = 100 // 1 รายการ = 3 การเขียน (booking, สลิป, log)
  for (let i = 0; i < targets.length; i += CHUNK) {
    const batch = writeBatch(db)
    for (const b of targets.slice(i, i + CHUNK)) {
      addAuditToBatch(batch, {
        actor,
        action: 'booking.delete',
        targetType: 'booking',
        targetId: b.id,
        bookingId: b.id,
        marketId: MARKET_ID,
        before: { status: b.status, stallNo: b.stallNo || null }
      })
      batch.delete(doc(db, 'bookings', b.id))
      batch.delete(slipRef(b.id))
    }
    await batch.commit()
  }
  return targets.length
}

/**
 * (admin) ลบรูปสลิปของการจองที่อนุมัติแล้วและเกินกำหนดเก็บ (purgeAfter <= ตอนนี้)
 * ลบเฉพาะรูปใน bookingSlips รายการจอง/ใบเสร็จ/รายงานรายได้ยังอยู่ครบ
 * @returns {Promise<number>} จำนวนรูปที่ลบ
 */
export async function purgeExpiredSlips(max = 25) {
  if (!isRealFirebaseConfigured || !db) return 0
  const snap = await getDocs(query(
    collection(db, 'bookingSlips'),
    where('purgeAfter', '<=', Timestamp.now()),
    limit(max)
  ))
  if (snap.empty) return 0
  const batch = writeBatch(db)
  snap.docs.forEach(d => batch.delete(d.ref))
  await batch.commit()
  return snap.size
}

// ─── จองตามวัน/รอบ (bookingLocks) ───────────────────────────────────────────

/**
 * จองแผงหลายวัน/รอบ: booking + lock ทุก slot + สลิป + audit log ใน transaction เดียว
 * ล้มส่วนใดส่วนหนึ่ง (เช่น มี slot ถูกจองไปก่อน) จะไม่มีอะไรค้าง
 * customerInfo.slots = ['2026-10-17_all', ...], customerInfo.slip = { dataUrl, mime, bytes, hash }
 * ปฏิทินตลาด (วันเปิด/ปิด เวลาปิดรับ) ตรวจที่ client (canBookSlot) rules ตรวจไม่ได้
 * @returns {Promise<{ bookingId: string }>}
 */
export async function bookStallSlots(stallId, customerInfo) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase จึงจองไม่ได้')
  if (!customerInfo?.tenantId) throw new Error('กรุณาเข้าสู่ระบบก่อนจอง')
  // ไม่แนบสลิป = กันแผงไว้ก่อน (awaiting_slip) แล้วส่งสลิปภายใน holdMinutes นาที
  const awaiting = !customerInfo.slip?.dataUrl
  const holdMinutes = Math.round(Number(customerInfo.holdMinutes) || 30)
  const slots = [...new Set(customerInfo.slots || [])].sort()
  if (slots.length < 1 || slots.length > 7) throw new Error('เลือกวัน/รอบได้ครั้งละ 1-7 ช่อง')

  const stallRef = doc(stallsCol(), stallId)
  const bookingRef = doc(collection(db, 'bookings'))
  const shopName = (customerInfo.shopName || '').trim().slice(0, PUBLIC_TEXT_MAX)
  const goodsType = (customerInfo.goodsType || '').trim().slice(0, PUBLIC_TEXT_MAX)

  await runTransaction(db, async (tx) => {
    const stallDoc = await tx.get(stallRef)
    if (!stallDoc.exists()) {
      throw new Error('ไม่พบข้อมูลแผงค้านี้ในระบบ (ผู้ดูแลอาจยังไม่ได้บันทึกผัง) กรุณาลองใหม่ภายหลัง')
    }
    const stall = stallDoc.data()
    if (stall.status === 'disabled') throw new Error(`แผงค้า ${stall.stallNo} ปิดให้บริการ ไม่สามารถจองได้`)
    if (stall.status === 'booked' || stall.status === 'pending') {
      throw new Error(`แผงค้า ${stall.stallNo} ถูกจองแบบเดิมไว้ ติดต่อผู้ดูแลตลาด`)
    }

    const lockSnaps = await Promise.all(slots.map(k => tx.get(lockRef(stallId, k))))
    // lock ที่รอสลิปและหมดเวลาแล้วถือว่าว่าง จองทับได้ (rules ตัดสินซ้ำด้วยเวลา server)
    const taken = slots.filter((k, i) => lockSnaps[i].exists() && !isHoldExpired(lockSnaps[i].data()))
    if (taken.length) {
      const err = new Error('มีช่องที่ถูกจองไปแล้ว')
      err.code = 'slot-taken'
      err.slots = taken
      throw err
    }

    const pricePerSlot = stall.price
    const totalAmount = pricePerSlot * slots.length
    const auditId = addAuditToBatch(tx, {
      actor: selfActor(customerInfo.tenantId, customerInfo.name),
      action: 'booking.create',
      targetType: 'booking',
      targetId: bookingRef.id,
      bookingId: bookingRef.id,
      marketId: MARKET_ID,
      after: { status: awaiting ? 'awaiting_slip' : 'pending', stallNo: stall.stallNo || null }
    })
    const bookingDoc = {
      stallId,
      stallNo: stall.stallNo || null,
      tenantId: customerInfo.tenantId,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      shopName,
      goodsType,
      slots,
      firstDate: slots[0].split('_')[0],
      lastDate: slots[slots.length - 1].split('_')[0],
      pricePerSlot,
      totalAmount,
      amountDue: totalAmount,
      createdAt: serverTimestamp(),
      status: awaiting ? 'awaiting_slip' : 'pending',
      lastAuditId: auditId
    }
    if (awaiting) {
      bookingDoc.holdStartedAt = serverTimestamp()
      bookingDoc.holdMinutes = holdMinutes
    } else {
      bookingDoc.slipHash = customerInfo.slip.hash
      bookingDoc.slipUploadedAt = serverTimestamp()
    }
    tx.set(bookingRef, bookingDoc)
    for (const key of slots) {
      const [date, roundId] = key.split('_')
      const lock = { marketId: MARKET_ID, stallId, date, roundId, slotKey: key, bookingId: bookingRef.id, status: bookingDoc.status, createdAt: serverTimestamp() }
      if (awaiting) { lock.holdStartedAt = serverTimestamp(); lock.holdMinutes = holdMinutes }
      if (shopName) lock.shopName = shopName
      if (goodsType) lock.goodsType = goodsType
      tx.set(lockRef(stallId, key), lock)
    }
    if (!awaiting) {
      tx.set(slipRef(bookingRef.id), buildSlipDoc({
        tenantId: customerInfo.tenantId,
        marketId: MARKET_ID,
        dataUrl: customerInfo.slip.dataUrl,
        mime: customerInfo.slip.mime,
        bytes: customerInfo.slip.bytes,
        createdAt: serverTimestamp()
      }))
    }
  })
  return { bookingId: bookingRef.id, status: awaiting ? 'awaiting_slip' : 'pending' }
}

/** ฟัง lock ของช่อง (วัน+รอบ) ที่เลือกแบบ realtime ใช้ระบายสีแผงบนผัง */
export function subscribeLocksForSlot(key, onData, onError) {
  if (!isRealFirebaseConfigured || !db) return () => {}
  const q = query(collection(db, 'bookingLocks'), where('slotKey', '==', key))
  return keepAlive(({ ok, fail }) => onSnapshot(q, (snap) => {
    ok()
    onData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }, (err) => {
    onError?.(err)
    fail(err)
  }))
}

/** lock ของแผงเดียวในช่วงวันที่ (อ่านครั้งเดียว) ต้องมี index bookingLocks (stallId, date) */
export async function fetchStallLocks(stallId, fromDate, toDate) {
  if (!isRealFirebaseConfigured || !db) return []
  const snap = await getDocs(query(
    collection(db, 'bookingLocks'),
    where('stallId', '==', stallId),
    where('date', '>=', fromDate),
    where('date', '<=', toDate)
  ))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

/** จำนวน lock ของรอบหนึ่งตั้งแต่วันที่ระบุ (ใช้ก่อนลบรอบออกจากตั้งค่า) ต้องมี index (roundId, date) */
export async function countFutureLocksOfRound(roundId, fromDate) {
  if (!isRealFirebaseConfigured || !db) return 0
  const snap = await getDocs(query(
    collection(db, 'bookingLocks'),
    where('roundId', '==', roundId),
    where('date', '>=', fromDate),
    limit(200)
  ))
  return snap.size
}

// ─── ส่วน 3: กันแผงรอสลิป / หมดเวลา ──────────────────────────────────────────

const noticeTo = (tx, b, { title, message, type = 'BOOKING' }) => {
  tx.set(doc(collection(db, 'notifications')), {
    tenantId: b.tenantId,
    stallId: b.stallId,
    stallNo: b.stallNo || '',
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date().toISOString()
  })
}

/**
 * ผู้เช่าแนบสลิปครั้งแรกหลังกันแผง: awaiting_slip -> pending + lock ทุกช่องเป็น pending ใน transaction เดียว
 * ถ้าหมดเวลา หรือช่องถูกจองทับไปแล้ว จะโยน error code 'hold-expired' / 'hold-lost'
 */
export async function submitHeldSlip({ bookingId, tenantId, tenantName = '', slip }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  if (!slip?.dataUrl) throw new Error('กรุณาแนบสลิปการโอนเงิน')
  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(bookingRef)
    if (!snap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = snap.data()
    if (b.status !== 'awaiting_slip') {
      const err = new Error('รายการนี้ไม่ได้อยู่ในสถานะรอส่งสลิปแล้ว')
      err.code = 'bad-status'
      throw err
    }
    if (isHoldExpired(b)) {
      const err = new Error('หมดเวลาชำระเงินแล้ว ช่องนี้ถูกปล่อยให้คนอื่นจองได้')
      err.code = 'hold-expired'
      throw err
    }
    const lockSnaps = await Promise.all(b.slots.map(k => tx.get(lockRef(b.stallId, k))))
    if (lockSnaps.some(ls => !ls.exists() || ls.data().bookingId !== bookingId)) {
      const err = new Error('ช่องของการจองนี้ถูกจองโดยคนอื่นไปแล้ว')
      err.code = 'hold-lost'
      throw err
    }
    const auditId = addAuditToBatch(tx, {
      actor: selfActor(tenantId, tenantName || b.customerName),
      action: 'booking.slip_submit',
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: 'awaiting_slip' },
      after: { status: 'pending' }
    })
    tx.update(bookingRef, {
      status: 'pending',
      slipHash: slip.hash,
      slipUploadedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastAuditId: auditId
    })
    for (const ls of lockSnaps) tx.update(ls.ref, { status: 'pending' })
    tx.set(slipRef(bookingId), buildSlipDoc({
      tenantId,
      marketId: MARKET_ID,
      dataUrl: slip.dataUrl,
      mime: slip.mime,
      bytes: slip.bytes,
      createdAt: serverTimestamp()
    }))
  })
}

/**
 * ตั้งสถานะ "หมดเวลา" ให้รายการที่หมดเวลากันแผงแล้ว (ทำเมื่อเจ้าของ/admin เปิดหน้าเว็บ ความถูกต้องของแผงไม่ขึ้นกับขั้นนี้)
 * ทำทีละไม่เกิน 20 รายการ ถ้าชนกัน (อีกคนทำไปแล้ว) หรือ rules ยังเห็นว่าไม่หมดเวลา (นาฬิกาเครื่องเร็ว) ข้ามเงียบ
 * @returns {Promise<number>} จำนวนที่ตั้งเป็นหมดเวลา
 */
export async function expireBookings(bookings, actor, offsetMs = 0) {
  if (!isRealFirebaseConfigured || !db || !actor?.uid) return 0
  const now = Date.now()
  const due = bookings.filter(b => isHoldExpired(b, now, offsetMs)).slice(0, 20)
  let done = 0
  for (const target of due) {
    try {
      await runTransaction(db, async (tx) => {
        const bookingRef = doc(db, 'bookings', target.id)
        const snap = await tx.get(bookingRef)
        if (!snap.exists()) return
        const b = snap.data()
        if (!isHoldExpired(b, now, offsetMs)) return
        const isSlot = Array.isArray(b.slots) && b.slots.length > 0
        const lockSnaps = isSlot ? await Promise.all(b.slots.map(k => tx.get(lockRef(b.stallId, k)))) : []
        const auditId = addAuditToBatch(tx, {
          actor,
          action: 'booking.expire',
          targetType: 'booking',
          targetId: target.id,
          bookingId: target.id,
          marketId: MARKET_ID,
          before: { status: b.status },
          after: { status: 'expired' }
        })
        tx.update(bookingRef, { status: 'expired', updatedAt: serverTimestamp(), lastAuditId: auditId })
        for (const ls of lockSnaps) {
          // ลบเฉพาะ lock ที่ยังชี้การจองนี้ (ถ้าถูกจองทับแล้ว lock เป็นของคนอื่น ไม่แตะ)
          if (ls.exists() && ls.data().bookingId === target.id) tx.delete(ls.ref)
        }
        if (b.tenantId !== actor.uid) {
          noticeTo(tx, b, { title: 'การจองหมดเวลา', message: `การจองแผง ${b.stallNo || ''} หมดเวลาชำระเงินแล้ว` })
        }
      })
      done++
    } catch (err) {
      if (err?.code !== 'permission-denied' && err?.code !== 'aborted') console.warn('Expire booking notice:', err?.message)
    }
  }
  return done
}

// ─── ส่วน 4: ยกเลิก + คืนเงิน ────────────────────────────────────────────────

/** ผู้เช่าขอยกเลิกการจองที่อนุมัติแล้ว (approved -> cancel_requested) พร้อมบัญชีรับเงินคืน (ไม่บังคับ) */
export async function requestCancelBooking({ bookingId, reason, account = null, tenantName = '' }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  const cleanReason = String(reason || '').trim().slice(0, 300)
  if (!cleanReason) throw new Error('กรุณาระบุเหตุผลที่ขอยกเลิก')
  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(bookingRef)
    if (!snap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = snap.data()
    if (b.status !== 'approved') {
      const err = new Error('ขอยกเลิกได้เฉพาะการจองที่อนุมัติแล้ว')
      err.code = 'bad-status'
      throw err
    }
    const auditId = addAuditToBatch(tx, {
      actor: selfActor(b.tenantId, tenantName || b.customerName),
      action: 'booking.cancel_request',
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: 'approved' },
      after: { status: 'cancel_requested' },
      reason: cleanReason
    })
    tx.update(bookingRef, {
      status: 'cancel_requested',
      cancelRequest: { reason: cleanReason, requestedAt: serverTimestamp() },
      updatedAt: serverTimestamp(),
      lastAuditId: auditId
    })
    if (account && (account.accountName || account.bank || account.accountNo)) {
      tx.set(doc(db, 'refundAccounts', bookingId), {
        tenantId: b.tenantId,
        accountName: String(account.accountName || '').trim().slice(0, 100),
        bank: String(account.bank || '').trim().slice(0, 60),
        accountNo: String(account.accountNo || '').trim().slice(0, 40)
      })
    }
  })
}

/** ผู้เช่าถอนคำขอยกเลิก (cancel_requested -> approved) */
export async function withdrawCancelRequest({ bookingId, tenantName = '' }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(bookingRef)
    if (!snap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = snap.data()
    if (b.status !== 'cancel_requested') {
      const err = new Error('รายการนี้ไม่ได้อยู่ในสถานะขอยกเลิกแล้ว')
      err.code = 'bad-status'
      throw err
    }
    const auditId = addAuditToBatch(tx, {
      actor: selfActor(b.tenantId, tenantName || b.customerName),
      action: 'booking.cancel_withdraw',
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: 'cancel_requested' },
      after: { status: 'approved' }
    })
    tx.update(bookingRef, { status: 'approved', cancelRequest: deleteField(), updatedAt: serverTimestamp(), lastAuditId: auditId })
  })
}

/**
 * admin/owner ตัดสินการยกเลิก
 *  mode 'approve' : cancel_requested -> cancelled (ปล่อยช่องที่ยังไม่ถึงวันขาย + บันทึกยอดคืนที่ต้องคืน)
 *  mode 'deny'    : cancel_requested -> approved (ต้องมีเหตุผล)
 *  mode 'direct'  : approved -> cancelled โดย admin (ต้องมีเหตุผล)
 * ยอดคืนที่แนะนำคิดจากนโยบาย ปรับได้แต่ต้องใส่ adjustReason
 */
export async function decideCancellation({ bookingId, mode, reason = '', refundAmount, adjustReason = '', policy, actor }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  if (!['approve', 'deny', 'direct'].includes(mode)) throw new Error('การตัดสินไม่ถูกต้อง')
  if (!actor?.uid) throw new Error('ไม่พบข้อมูลผู้ทำรายการ กรุณาเข้าสู่ระบบใหม่')
  const cleanReason = String(reason || '').trim().slice(0, 300)
  if ((mode === 'deny' || mode === 'direct') && !cleanReason) throw new Error('กรุณาระบุเหตุผล')

  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(bookingRef)
    if (!snap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = snap.data()
    const okStatus = mode === 'direct' ? b.status === 'approved' : b.status === 'cancel_requested'
    if (!okStatus) {
      const err = new Error('รายการนี้ถูกตัดสินไปแล้ว หรือสถานะเปลี่ยนไป')
      err.code = 'already-decided'
      throw err
    }
    const isSlot = Array.isArray(b.slots) && b.slots.length > 0
    const stallRef = doc(stallsCol(), b.stallId)
    const lockSnaps = isSlot ? await Promise.all(b.slots.map(k => tx.get(lockRef(b.stallId, k)))) : []
    const sSnap = isSlot ? null : await tx.get(stallRef)

    const common = { decidedBy: actor.uid, decidedAt: serverTimestamp(), updatedAt: serverTimestamp() }
    if (mode === 'deny') {
      const auditId = addAuditToBatch(tx, {
        actor, action: 'booking.cancel_deny', targetType: 'booking', targetId: bookingId, bookingId, marketId: MARKET_ID,
        before: { status: 'cancel_requested' }, after: { status: 'approved' }, reason: cleanReason
      })
      tx.update(bookingRef, { ...common, status: 'approved', statusReason: cleanReason, cancelRequest: deleteField(), lastAuditId: auditId })
      noticeTo(tx, b, { title: 'ไม่อนุมัติการยกเลิก', message: `คำขอยกเลิกการจองแผง ${b.stallNo || ''} ไม่ได้รับอนุมัติ (${cleanReason})`, type: 'CANCEL_REVIEW' })
      return
    }

    const suggestion = suggestRefund(b, policy || {}, new Date())
    const amount = refundAmount === undefined || refundAmount === null || refundAmount === '' ? suggestion.amount : Math.round(Number(refundAmount) * 100) / 100
    if (!Number.isFinite(amount) || amount < 0 || amount > Number(b.amountDue || 0)) throw new Error('ยอดคืนเงินต้องอยู่ระหว่าง 0 ถึงยอดที่จ่าย')
    const adjusted = amount !== suggestion.amount
    const cleanAdjust = String(adjustReason || '').trim().slice(0, 300)
    if (adjusted && !cleanAdjust) throw new Error('ยอดคืนต่างจากยอดที่แนะนำตามนโยบาย กรุณาระบุเหตุผล')
    const refund = {
      status: amount > 0 ? 'pending' : 'none',
      amount,
      suggestedAmount: suggestion.amount,
      policyText: suggestion.reasonText.slice(0, 300)
    }
    if (adjusted) refund.adjustReason = cleanAdjust

    const auditId = addAuditToBatch(tx, {
      actor,
      action: mode === 'direct' ? 'booking.cancel_admin' : 'booking.cancel_approve',
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: b.status },
      after: { status: 'cancelled', refund: `${refund.status} ${amount}` },
      reason: cleanReason || cleanAdjust
    })
    const update = { ...common, status: 'cancelled', wasApproved: true, refund, lastAuditId: auditId }
    if (cleanReason) update.statusReason = cleanReason
    if (isSlot) update.releasedSlots = suggestion.releaseSlots
    tx.update(bookingRef, update)
    if (isSlot) {
      // ปล่อยเฉพาะช่องที่ยังไม่ถึงวันขาย ช่องที่ผ่านมาแล้วยังนับเป็นรายได้
      for (const ls of lockSnaps) {
        if (ls.exists() && ls.data().bookingId === bookingId && suggestion.releaseSlots.includes(ls.data().slotKey)) tx.delete(ls.ref)
      }
    } else if (sSnap?.exists() && sSnap.data().bookedBy?.bookingId === bookingId) {
      tx.update(stallRef, { status: 'available', bookedBy: null, updatedAt: new Date().toISOString() })
    }
    noticeTo(tx, b, {
      title: 'อนุมัติการยกเลิก',
      message: refund.status === 'pending'
        ? `การจองแผง ${b.stallNo || ''} ถูกยกเลิกแล้ว จะได้รับเงินคืน ${formatBaht(amount)}`
        : `การจองแผง ${b.stallNo || ''} ถูกยกเลิกแล้ว (ไม่มียอดคืนตามนโยบาย)`,
      type: 'CANCEL_REVIEW'
    })
  })
}

/** admin/owner บันทึกว่าคืนเงินแล้ว (ยอดจริง วิธี วันที่ หมายเหตุ รูปสลิปคืนเงินไม่บังคับ) */
export async function recordRefund({ bookingId, amount, method, date, note = '', slip = null, actor }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  if (!actor?.uid) throw new Error('ไม่พบข้อมูลผู้ทำรายการ กรุณาเข้าสู่ระบบใหม่')
  if (!['transfer', 'promptpay', 'cash'].includes(method)) throw new Error('กรุณาเลือกวิธีคืนเงิน')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) throw new Error('กรุณาระบุวันที่คืนเงิน')
  const amt = Math.round(Number(amount) * 100) / 100
  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(bookingRef)
    if (!snap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = snap.data()
    if (b.status !== 'cancelled' || b.refund?.status !== 'pending') {
      const err = new Error('รายการนี้ไม่ได้อยู่ในสถานะรอคืนเงินแล้ว')
      err.code = 'already-decided'
      throw err
    }
    if (!Number.isFinite(amt) || amt < 0 || amt > Number(b.amountDue || 0)) throw new Error('ยอดที่คืนต้องไม่เกินยอดที่ผู้เช่าจ่าย')
    const refund = {
      ...b.refund,
      status: 'refunded',
      amount: amt,
      method,
      refundedDate: date,
      refundedBy: actor.uid,
      refundedAt: serverTimestamp()
    }
    const cleanNote = String(note || '').trim().slice(0, 300)
    if (cleanNote) refund.note = cleanNote
    const auditId = addAuditToBatch(tx, {
      actor, action: 'refund.record', targetType: 'booking', targetId: bookingId, bookingId, marketId: MARKET_ID,
      before: { refundStatus: 'pending' }, after: { refundStatus: 'refunded', refundAmount: amt, refundMethod: method }
    })
    tx.update(bookingRef, { refund, updatedAt: serverTimestamp(), lastAuditId: auditId })
    if (slip?.dataUrl) {
      tx.set(doc(db, 'refundSlips', bookingId), buildSlipDoc({
        tenantId: b.tenantId, marketId: MARKET_ID, dataUrl: slip.dataUrl, mime: slip.mime, bytes: slip.bytes, createdAt: serverTimestamp()
      }))
    }
    // ข้อมูลบัญชีรับเงินคืนไม่จำเป็นอีกแล้ว ลบทิ้ง
    tx.delete(doc(db, 'refundAccounts', bookingId))
    noticeTo(tx, b, { title: 'คืนเงินแล้ว', message: `คืนเงินการจองแผง ${b.stallNo || ''} แล้ว ${formatBaht(amt)}`, type: 'REFUND' })
  })
}

export async function getRefundAccount(bookingId) {
  if (!isRealFirebaseConfigured || !db) return null
  const snap = await getDoc(doc(db, 'refundAccounts', bookingId))
  return snap.exists() ? snap.data() : null
}

export async function getRefundSlip(bookingId) {
  if (!isRealFirebaseConfigured || !db) return null
  const snap = await getDoc(doc(db, 'refundSlips', bookingId))
  return snap.exists() ? snap.data() : null
}

// ─── ส่วน 5: ใบเสร็จ ─────────────────────────────────────────────────────────

/** อ่านการจองทั้งก้อนพร้อม id (เจ้าของหรือ admin เท่านั้นตาม rules) */
export async function fetchBookingFull(bookingId) {
  if (!isRealFirebaseConfigured || !db || !bookingId) return null
  const snap = await getDoc(doc(db, 'bookings', bookingId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/** ออกเลขใบเสร็จให้การจองที่อนุมัติไปก่อนมีระบบนี้ (admin/owner เท่านั้น) คืนเลขใบเสร็จ */
export async function issueReceiptNumber({ bookingId, actor }) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  if (!actor?.uid) throw new Error('ไม่พบข้อมูลผู้ทำรายการ กรุณาเข้าสู่ระบบใหม่')
  const bookingRef = doc(db, 'bookings', bookingId)
  let receiptNo = ''
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(bookingRef)
    if (!snap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = snap.data()
    if (b.receiptNo) { receiptNo = b.receiptNo; return }
    const year = thaiYearOf(todayBangkok())
    const counterRef = doc(db, 'counters', `receipts_${year}`)
    const cSnap = await tx.get(counterRef)
    const seq = (cSnap.exists() ? cSnap.data().next : 0) + 1
    receiptNo = formatReceiptNo(year, seq)
    const auditId = addAuditToBatch(tx, {
      actor, action: 'booking.receipt_issue', targetType: 'booking', targetId: bookingId, bookingId, marketId: MARKET_ID,
      after: { receiptNo }
    })
    if (cSnap.exists()) tx.update(counterRef, { next: seq })
    else tx.set(counterRef, { year, next: seq })
    tx.update(bookingRef, {
      receiptNo, receiptSeq: seq, receiptYear: year, receiptIssuedAt: serverTimestamp(),
      updatedAt: serverTimestamp(), lastAuditId: auditId
    })
  })
  return receiptNo
}

// ─── ส่วน 6: รายงานรายได้ ────────────────────────────────────────────────────

/**
 * ดึงการจองที่เกี่ยวกับช่วง [fetchFrom, to] สำหรับรายงาน (อ่านครั้งเดียว ไม่ใช่ realtime)
 * 1) การจองรายวัน/รอบ: firstDate อยู่ในช่วง (ถอยหลัง 7 วันเผื่อการจองหลายช่อง)
 * 2) การจองเก่าไม่มีวันที่: ดูจาก createdAt (กรองจริงตามวันอนุมัติที่ฝั่ง client)
 * 3) การคืนเงิน: refund.refundedAt อยู่ในช่วง
 */
export async function fetchBookingsForReport(fetchFrom, to) {
  if (!isRealFirebaseConfigured || !db) return []
  const start = Timestamp.fromDate(new Date(`${addDays(fetchFrom, -60)}T00:00:00+07:00`))
  const startRefund = Timestamp.fromDate(new Date(`${fetchFrom}T00:00:00+07:00`))
  const end = Timestamp.fromDate(new Date(`${addDays(to, 1)}T00:00:00+07:00`))
  const col = collection(db, 'bookings')
  const [bySlots, legacy, refunded] = await Promise.all([
    getDocs(query(col, where('firstDate', '>=', addDays(fetchFrom, -7)), where('firstDate', '<=', to), limit(1500))),
    getDocs(query(col, where('createdAt', '>=', start), where('createdAt', '<', end), limit(1500))),
    getDocs(query(col, where('refund.refundedAt', '>=', startRefund), where('refund.refundedAt', '<', end), limit(500)))
  ])
  const byId = new Map()
  for (const snap of [bySlots, legacy, refunded]) {
    for (const d of snap.docs) byId.set(d.id, { id: d.id, ...d.data() })
  }
  return [...byId.values()]
}

/** บันทึก audit log ว่ามีการส่งออกรายงาน (ช่วงวันที่ + จำนวนแถว) */
export async function logReportExport({ actor, from, to, rowCount, format }) {
  if (!isRealFirebaseConfigured || !db) return
  const batch = writeBatch(db)
  addAuditToBatch(batch, {
    actor,
    action: 'report.export',
    targetType: 'settings',
    targetId: 'revenue-report',
    marketId: MARKET_ID,
    after: { from, to, rows: rowCount, format }
  })
  await batch.commit()
}
