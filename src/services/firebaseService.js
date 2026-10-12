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
  serverTimestamp
} from 'firebase/firestore'
import { toPublicBookedBy, PUBLIC_TEXT_MAX } from '../utils/stallSync'
import { slipRef, buildSlipDoc } from './slipStorage'
import { keepAlive } from '../utils/keepAlive'
import { addAuditToBatch } from './auditLog'

const MARKET_ID = 'main-layout'
const BATCH_LIMIT = 450 // เพดานจริงของ Firestore คือ 500 การเขียนต่อ batch

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
      actor: { uid: customerInfo.tenantId, name: customerInfo.name, role: 'tenant' },
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
export async function decideBooking({ bookingId, decision, reason = '', actor }) {
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
    tx.update(bookingRef, update)

    const now = new Date().toISOString()
    if (decision === 'approved') tx.update(stallRef, { status: 'booked', updatedAt: now })
    if (decision === 'rejected') tx.update(stallRef, { status: 'available', bookedBy: null, updatedAt: now })

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
export function subscribeMyBookings(uid, onData, onError) {
  if (!isRealFirebaseConfigured || !db || !uid) return () => {}
  const q = query(collection(db, 'bookings'), where('tenantId', '==', uid), orderBy('createdAt', 'desc'), limit(50))
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
    if (snap.data().status !== 'needs_slip') {
      const err = new Error('รายการนี้ไม่ได้อยู่ในสถานะรอสลิปใหม่แล้ว')
      err.code = 'bad-status'
      throw err
    }
    const auditId = addAuditToBatch(tx, {
      actor: { uid: tenantId, name: tenantName || snap.data().customerName, role: 'tenant' },
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

/** ยกเลิกการจองที่ยังรอตรวจ (pending / needs_slip) และปล่อยแผงใน transaction เดียว */
export async function cancelMyBooking(bookingId) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  const bookingRef = doc(db, 'bookings', bookingId)
  await runTransaction(db, async (tx) => {
    const bSnap = await tx.get(bookingRef)
    if (!bSnap.exists()) throw new Error('ไม่พบรายการจองนี้')
    const b = bSnap.data()
    if (!['pending', 'needs_slip'].includes(b.status)) {
      const err = new Error('ยกเลิกเองไม่ได้ในสถานะนี้ กรุณาติดต่อผู้ดูแลตลาด')
      err.code = 'bad-status'
      throw err
    }
    const stallRef = doc(stallsCol(), b.stallId)
    const sSnap = await tx.get(stallRef)
    if (!sSnap.exists()) throw new Error('ไม่พบแผงของรายการนี้')
    const auditId = addAuditToBatch(tx, {
      actor: { uid: b.tenantId, name: b.customerName, role: 'tenant' },
      action: 'booking.cancel_self',
      targetType: 'booking',
      targetId: bookingId,
      bookingId,
      marketId: MARKET_ID,
      before: { status: b.status },
      after: { status: 'cancelled' }
    })
    tx.update(bookingRef, { status: 'cancelled', updatedAt: serverTimestamp(), lastAuditId: auditId })
    if (sSnap.data().bookedBy?.bookingId === bookingId) {
      tx.update(stallRef, { status: 'available', bookedBy: null, updatedAt: new Date().toISOString() })
    }
  })
}
