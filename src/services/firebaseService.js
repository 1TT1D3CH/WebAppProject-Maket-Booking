import { db, isRealFirebaseConfigured } from '../firebase/config'
import {
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  writeBatch,
  collection,
  deleteField,
  serverTimestamp
} from 'firebase/firestore'
import { toPublicBookedBy } from '../utils/stallSync'

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
      name: marketData?.name,
      zones: marketData?.zones || [],
      stalls: inSub ? stallDocs : (marketData?.stalls || []),
      stallsInFirestore: inSub,
      layoutObjects: marketData?.layoutObjects || [],
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

  const unsubMarket = onSnapshot(marketRef(), (snap) => {
    marketData = snap.exists() ? snap.data() : null
    marketReady = true
    emit()
  }, fail)

  const unsubStalls = onSnapshot(stallsCol(), (snap) => {
    stallDocs = snap.docs.map(d => ({ ...d.data(), id: d.id }))
    emit()
  }, fail)

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
export async function saveMarketLayoutToFirestore(marketName, zones, dimensions = {}, layoutObjects = [], stallWrites = { upserts: [], deletes: [] }) {
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

    const ops = [
      ...stallWrites.upserts.map(({ id, data }) => ({ type: 'set', ref: doc(stallsCol(), id), data: sanitizeData(data) })),
      ...stallWrites.deletes.map(id => ({ type: 'delete', ref: doc(stallsCol(), id) }))
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
 * จองแผงด้วย transaction: เปลี่ยนเฉพาะสถานะของแผงนั้น + สร้างรายการจองในครั้งเดียว
 * rules ฝั่งเซิร์ฟเวอร์บังคับว่าผู้เช่าเปลี่ยนได้แค่ available -> booked ของตัวเอง
 * (ไม่แตะ zones/ชื่อผัง/แผงอื่น — C6)
 */
export async function bookStallWithTransaction(stallId, customerInfo) {
  if (!isRealFirebaseConfigured || !db) {
    throw new Error('ยังไม่ได้ตั้งค่า Firebase จึงจองไม่ได้')
  }
  if (!customerInfo?.tenantId) {
    throw new Error('กรุณาเข้าสู่ระบบก่อนจอง')
  }

  const stallRef = doc(stallsCol(), stallId)
  const bookingRef = doc(collection(db, 'bookings'))

  await runTransaction(db, async (transaction) => {
    const stallDoc = await transaction.get(stallRef)
    if (!stallDoc.exists()) {
      throw new Error('ไม่พบข้อมูลแผงค้านี้ในระบบ (ผู้ดูแลอาจยังไม่ได้บันทึกผัง) กรุณาลองใหม่ภายหลัง')
    }

    const stall = stallDoc.data()
    if (stall.status === 'booked') {
      throw new Error(`แผงค้า ${stall.stallNo} ถูกผู้อื่นจองไปก่อนหน้านี้แล้ว!`)
    }
    if (stall.status === 'disabled') {
      throw new Error(`แผงค้า ${stall.stallNo} ปิดให้บริการ ไม่สามารถจองได้`)
    }

    const bookedBy = toPublicBookedBy({
      tenantId: customerInfo.tenantId,
      bookedAt: new Date().toISOString(),
      bookingId: bookingRef.id
    })

    transaction.update(stallRef, { status: 'booked', bookedBy, updatedAt: new Date().toISOString() })
    transaction.set(bookingRef, {
      stallId,
      stallNo: stall.stallNo || null,
      tenantId: customerInfo.tenantId,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      goodsType: customerInfo.goodsType || '',
      createdAt: serverTimestamp(),
      status: 'confirmed'
    })
  })

  const snap = await getDoc(stallRef)
  return { success: true, mode: 'firestore', bookedBy: snap.exists() ? snap.data().bookedBy : null }
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
