import { defineStore } from 'pinia'
import { subscribeMarketSettings } from '../services/marketSettings'
import { subscribeLocksForSlot, bookStallSlots, fetchStallLocks } from '../services/firebaseService'
import {
  normalizeSettings, getRounds, slotKey, parseSlotKey, canBookSlot, canBookDate, nextBookableDate,
  maxBookableDate, isMarketOpen, DEFAULT_ROUND_ID
} from '../utils/marketCalendar'
import { todayBangkok, addDays, isDateKey } from '../utils/date'
import { isHoldExpired, HOLD_STATUSES, holdExpiresAtMs } from '../utils/holdTimer'
import { serverNow } from '../utils/serverClock'

// ตัวเดียวทั้งหน้า: ปลุกตอน lock ที่ใกล้หมดเวลาที่สุดหมดอายุ แล้ววาดสีแผงใหม่ (ไม่ใช่ timer ต่อแผง)
let expiryTimer = null
// วันที่เลือกมาจาก ?date= ใน URL (ต้องตรวจว่ายังจองได้) ถ้าเป็นค่าเริ่มต้น (วันนี้) คงไว้แม้ตลาดปิด
let urlDateRequested = false

// วัน/รอบที่เลือกเก็บใน query ของ URL (?date=2026-10-17&round=morning) ไม่ใช้ router
function readUrlSelection() {
  try {
    const q = new URLSearchParams(window.location.search)
    const date = q.get('date')
    return { date: isDateKey(date) ? date : '', round: q.get('round') || '' }
  } catch {
    return { date: '', round: '' }
  }
}

function writeUrlSelection(date, round) {
  try {
    const url = new URL(window.location.href)
    url.searchParams.set('date', date)
    if (round && round !== DEFAULT_ROUND_ID) url.searchParams.set('round', round)
    else url.searchParams.delete('round')
    window.history.replaceState(null, '', url)
  } catch { /* ไม่มี URL ให้เขียน (เช่น ทดสอบ) ข้ามได้ */ }
}

export const useSlotStore = defineStore('slots', {
  state: () => ({
    settings: normalizeSettings(undefined),
    settingsLoaded: false,
    selectedDate: todayBangkok(),
    selectedRoundId: DEFAULT_ROUND_ID,
    locks: [], // lock ของช่องที่เลือก
    locksLoaded: false,
    locksError: '',
    nowMs: serverNow(),
    unsubSettings: null,
    unsubLocks: null
  }),

  getters: {
    rounds: (s) => getRounds(s.settings),
    selectedSlotKey: (s) => slotKey(s.selectedDate, s.selectedRoundId),
    selectedCheck(state) {
      return canBookSlot(state.settings, this.selectedSlotKey)
    },
    isSelectedDayOpen: (s) => isMarketOpen(s.settings, s.selectedDate),
    // ช่วงวันที่เลือกในปฏิทินได้: วันนี้ -> วันนี้ + maxAdvanceDays
    minDate: () => todayBangkok(),
    maxDate: (s) => maxBookableDate(s.settings),
    // lock ที่รอสลิปแล้วหมดเวลา = แผงว่าง (คำนวณที่ client; rules ตัดสินซ้ำตอนจองทับ)
    lockByStall: (s) => Object.fromEntries(
      s.locks.filter(l => !isHoldExpired(l, s.nowMs)).map(l => [l.stallId, l])
    )
  },

  actions: {
    startSettings() {
      if (this.unsubSettings) return
      this.unsubSettings = subscribeMarketSettings((settings) => {
        const firstLoad = !this.settingsLoaded
        this.settings = settings
        this.settingsLoaded = true
        // ?date= ใน URL เกินช่วงจอง/ตลาดปิด -> เด้งไปวันเปิดถัดไปที่จองได้ (ทำครั้งแรกที่ได้ settings จริง)
        if (firstLoad && urlDateRequested) this.fixSelectedDate()
        // รอบที่เลือกถูกลบออกจากตั้งค่า -> กลับไปรอบแรก
        if (!this.rounds.some(r => r.id === this.selectedRoundId)) this.setRound(this.rounds[0].id)
      }, (err) => console.error('Market settings listener error:', err))
    },

    stopSettings() {
      this.unsubSettings?.()
      this.unsubSettings = null
    },

    /** เริ่มจากค่าใน URL (ถ้ามี) แล้วฟัง lock ของช่องที่เลือก */
    startLocks() {
      const fromUrl = readUrlSelection()
      urlDateRequested = !!fromUrl.date
      if (fromUrl.date) this.selectedDate = fromUrl.date
      if (fromUrl.round && this.rounds.some(r => r.id === fromUrl.round)) this.selectedRoundId = fromUrl.round
      this.listenLocks()
    },

    scheduleExpiryTick() {
      if (expiryTimer) clearTimeout(expiryTimer)
      expiryTimer = null
      const now = serverNow()
      const next = this.locks
        .filter(l => HOLD_STATUSES.includes(l.status))
        .map(l => holdExpiresAtMs(l.holdStartedAt, l.holdMinutes))
        .filter(t => t !== null && t > now)
        .sort((a, b) => a - b)[0]
      this.nowMs = now
      if (next === undefined) return
      // setTimeout สูงสุดราว 24.8 วัน; ปลุกช้ากว่าเวลาหมดอายุเล็กน้อยกันนาฬิกาเหลื่อม
      expiryTimer = setTimeout(() => { this.nowMs = serverNow(); this.scheduleExpiryTick() }, Math.min(next - now + 300, 2 ** 30))
    },

    stopLocks() {
      if (expiryTimer) clearTimeout(expiryTimer)
      expiryTimer = null
      this.unsubLocks?.()
      this.unsubLocks = null
      this.locks = []
      this.locksLoaded = false
    },

    listenLocks() {
      this.unsubLocks?.()
      this.locksLoaded = false
      this.locksError = ''
      this.locks = []
      this.unsubLocks = subscribeLocksForSlot(this.selectedSlotKey, (rows) => {
        this.locks = rows
        this.locksLoaded = true
        this.locksError = ''
        this.scheduleExpiryTick()
      }, (err) => {
        console.error('Locks listener error:', err)
        this.locksError = 'โหลดสถานะแผงของวันนี้ไม่สำเร็จ'
      })
    },

    selectDate(date) {
      if (!isDateKey(date) || date === this.selectedDate) return
      this.selectedDate = date
      writeUrlSelection(this.selectedDate, this.selectedRoundId)
      this.listenLocks()
    },

    setRound(roundId) {
      if (roundId === this.selectedRoundId) return
      this.selectedRoundId = roundId
      writeUrlSelection(this.selectedDate, this.selectedRoundId)
      this.listenLocks()
    },

    /** วันที่เลือกอยู่จองไม่ได้ (เกินช่วง/ตลาดปิด/ผ่านมาแล้ว) -> ย้ายไปวันเปิดที่จองได้ถัดไป ไม่มีก็คงเดิม */
    fixSelectedDate() {
      if (canBookDate(this.settings, this.selectedDate).ok) return
      // วันที่อยู่นอกช่วง (ผ่านมาแล้ว/เกินกำหนด) นับใหม่จากวันนี้ นอกนั้นหาถัดจากวันที่เลือก
      const from = this.selectedDate < this.minDate || this.selectedDate > this.maxDate ? addDays(this.minDate, -1) : this.selectedDate
      const next = nextBookableDate(this.settings, from, 1)
      if (next) this.selectDate(next)
    },

    /** เลื่อนไปวันเปิดขายที่จองได้ก่อนหน้า/ถัดไป (step = -1 | 1) */
    selectOpenDay(step) {
      const next = nextBookableDate(this.settings, this.selectedDate, step)
      if (next) this.selectDate(next)
    },

    /** ใช้กับปฏิทิน: วันนี้จองได้ไหม + เหตุผล */
    dayDisabled(date) {
      const r = canBookDate(this.settings, date)
      return r.ok ? { disabled: false } : { disabled: true, reason: r.reason }
    },

    goToday() {
      this.selectDate(todayBangkok())
    },

    nextDay(step = 1) {
      this.selectDate(addDays(this.selectedDate, step))
    },

    /** lock ของแผงเดียวในช่วง "วันนี้ → วันนี้ + maxAdvanceDays" (เปิดหน้าจอง) */
    async loadStallLocks(stallId) {
      const today = todayBangkok()
      return fetchStallLocks(stallId, today, addDays(today, this.settings.maxAdvanceDays))
    },

    parseKey: parseSlotKey,

    book: (stallId, info) => bookStallSlots(stallId, info)
  }
})
