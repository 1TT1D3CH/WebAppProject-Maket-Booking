import { defineStore } from 'pinia'
import { subscribeMarketSettings } from '../services/marketSettings'
import { subscribeLocksForSlot, bookStallSlots, fetchStallLocks } from '../services/firebaseService'
import {
  normalizeSettings, getRounds, slotKey, parseSlotKey, canBookSlot, openDatesFrom,
  isMarketOpen, DEFAULT_ROUND_ID
} from '../utils/marketCalendar'
import { todayBangkok, addDays, isDateKey } from '../utils/date'

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
    // วันเปิดขาย 14 วันถัดไป (รวมวันนี้ถ้าเปิด) สำหรับแถบเลือกวัน
    quickDates: (s) => openDatesFrom(s.settings, todayBangkok(), 14),
    lockByStall: (s) => Object.fromEntries(s.locks.map(l => [l.stallId, l]))
  },

  actions: {
    startSettings() {
      if (this.unsubSettings) return
      this.unsubSettings = subscribeMarketSettings((settings) => {
        this.settings = settings
        this.settingsLoaded = true
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
      if (fromUrl.date) this.selectedDate = fromUrl.date
      if (fromUrl.round && this.rounds.some(r => r.id === fromUrl.round)) this.selectedRoundId = fromUrl.round
      this.listenLocks()
    },

    stopLocks() {
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
