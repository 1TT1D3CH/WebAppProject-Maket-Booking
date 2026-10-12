import { db, isRealFirebaseConfigured } from '../firebase/config'
import { doc, onSnapshot, writeBatch } from 'firebase/firestore'
import { keepAlive } from '../utils/keepAlive'
import { normalizeSettings } from '../utils/marketCalendar'
import { diffFields } from '../utils/auditDiff'
import { addAuditToBatch } from './auditLog'

const MARKET_ID = 'main-layout'
const marketRef = () => doc(db, 'markets', MARKET_ID)

const SETTING_KEYS = ['openWeekdays', 'closedDates', 'extraOpenDates', 'maxAdvanceDays', 'bookingCutoffTime', 'maxSlotsPerBooking', 'rounds',
  'paymentHoldMinutes', 'resubmitHours', 'cancelPolicy', 'receipt']

/**
 * ฟังตั้งค่าตลาด (markets/main-layout.settings) แบบ realtime
 * ตัวฟังแยกจากตัวฟังผัง (ไม่แตะโค้ดโหลดผัง) ค่าที่ได้ผ่าน normalizeSettings แล้วเสมอ
 */
export function subscribeMarketSettings(onData, onError) {
  if (!isRealFirebaseConfigured || !db) {
    onData(normalizeSettings(undefined))
    return () => {}
  }
  return keepAlive(({ ok, fail }) => onSnapshot(marketRef(), (snap) => {
    ok()
    onData(normalizeSettings(snap.exists() ? snap.data().settings : undefined))
  }, (err) => {
    onError?.(err)
    fail(err)
  }))
}

/**
 * บันทึกตั้งค่าตลาด (admin) พร้อม audit log ใน batch เดียว
 * เขียนเฉพาะฟิลด์ settings ของเอกสารผัง ไม่แตะฟิลด์ผังอื่น
 */
export async function saveMarketSettings(nextSettings, prevSettings, actor) {
  if (!isRealFirebaseConfigured || !db) throw new Error('ยังไม่ได้ตั้งค่า Firebase')
  const next = normalizeSettings(nextSettings)
  const prev = normalizeSettings(prevSettings)
  const { before, after } = diffFields(prev, next, SETTING_KEYS)
  const batch = writeBatch(db)
  batch.update(marketRef(), { settings: next })
  addAuditToBatch(batch, {
    actor,
    action: 'settings.update',
    targetType: 'settings',
    targetId: MARKET_ID,
    marketId: MARKET_ID,
    before,
    after
  })
  await batch.commit()
  return next
}
