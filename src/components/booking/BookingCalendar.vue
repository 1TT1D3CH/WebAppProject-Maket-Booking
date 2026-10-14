<template>
  <div class="w-full max-w-[360px] mx-auto select-none">
    <!-- หัว: เลื่อนเดือน / ชื่อเดือน / วันนี้ -->
    <div class="flex items-center gap-1 mb-2">
      <button type="button" :class="tone === 'light' ? 'nav-btn' : 'nav-btn nav-btn-dark'" :disabled="!canPrev" aria-label="เดือนก่อนหน้า" @click="go(-1)">
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button type="button" :class="tn('flex-1 min-h-[40px] rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition')"
        :aria-expanded="pickingMonth" @click="pickingMonth = !pickingMonth">
        {{ formatMonthTitle(view) }}
      </button>
      <button type="button" :class="tone === 'light' ? 'nav-btn' : 'nav-btn nav-btn-dark'" :disabled="!canNext" aria-label="เดือนถัดไป" @click="go(1)">
        <ChevronRight class="w-4 h-4" />
      </button>
      <button type="button" :class="tn('min-h-[40px] px-3 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-indigo-400 transition')"
        @click="goToday">วันนี้</button>
    </div>

    <!-- เลือกเดือน/ปี (ช่วงจองยาว 1 ปี เลื่อนไกล ๆ ได้เร็ว) -->
    <div v-if="pickingMonth" class="grid grid-cols-3 gap-1.5" role="listbox" aria-label="เลือกเดือน">
      <button v-for="m in monthChoices" :key="`${m.year}-${m.month}`" type="button" role="option"
        :aria-selected="m.year === view.year && m.month === view.month"
        class="min-h-[44px] rounded-xl text-xs font-semibold border transition"
        :class="m.year === view.year && m.month === view.month
          ? 'bg-indigo-600 text-white border-indigo-600'
          : tn('bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400')"
        @click="chooseMonth(m)">
        {{ THAI_MONTHS_FULL[m.month - 1] }}<span class="block text-[10px] opacity-70">{{ m.year + 543 }}</span>
      </button>
    </div>

    <template v-else>
      <div :class="tn('grid grid-cols-7 text-center text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1')" aria-hidden="true">
        <div v-for="w in THAI_WEEKDAYS_SHORT" :key="w" class="py-1">{{ w }}</div>
      </div>

      <div ref="gridEl" role="grid" :aria-label="formatMonthTitle(view)" class="grid grid-cols-7 gap-y-1" @keydown="onKey">
        <template v-for="(d, i) in cells" :key="i">
          <div v-if="!d" role="gridcell" class="h-10" />
          <div v-else role="gridcell" class="flex justify-center">
            <button
              type="button" :data-date="d" :tabindex="d === focusDate ? 0 : -1"
              :aria-label="ariaLabel(d)" :aria-pressed="isChosen(d)" :aria-disabled="state(d).disabled"
              :title="state(d).disabled ? state(d).reason : ''"
              class="relative w-10 h-10 rounded-full text-sm font-mono transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              :class="dayClass(d)"
              @click="onPick(d)"
            >
              {{ Number(d.slice(8)) }}
              <span v-if="dot(d)" class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" :class="dot(d)" />
              <span v-if="state(d).disabled && state(d).mark === 'x'" class="absolute inset-0 flex items-center justify-center text-rose-400 text-base leading-none pointer-events-none">✕</span>
            </button>
          </div>
        </template>
      </div>

      <!-- เหตุผลที่จองไม่ได้ (มือถือไม่มี hover) -->
      <p :class="tn('min-h-[18px] mt-2 text-[11px] text-slate-500 dark:text-slate-400')" aria-live="polite">{{ hint }}</p>
    </template>

    <!-- โหมดเลือกหลายวัน: สรุปที่เลือก -->
    <div v-if="mode === 'multiple'" class="mt-1 flex items-start justify-between gap-2 text-xs">
      <div :class="tn('text-slate-700 dark:text-slate-200')">
        <template v-if="selectedList.length">เลือกแล้ว {{ selectedList.length }} วัน: <span class="font-semibold">{{ summary }}</span></template>
        <template v-else><span class="text-slate-400">ยังไม่ได้เลือกวัน</span></template>
      </div>
      <button v-if="selectedList.length" type="button" :class="tn('shrink-0 underline font-semibold text-slate-600 dark:text-slate-300')" @click="clearAll">ล้างทั้งหมด</button>
    </div>
    <p v-if="limitMsg" class="mt-1 text-[11px] text-rose-600">{{ limitMsg }}</p>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { todayBangkok, formatThaiDate } from '../../utils/date'
import {
  THAI_MONTHS_FULL, THAI_WEEKDAYS_SHORT, buildMonthGrid, compareMonth, formatLongThaiDate,
  formatMonthTitle, monthOf, monthsBetween, moveByKey, shiftMonth
} from '../../utils/calendarGrid'

const props = defineProps({
  // single: 'yyyy-mm-dd' | multiple: string[]
  modelValue: { type: [String, Array], default: '' },
  mode: { type: String, default: 'single' },
  minDate: { type: String, required: true },
  maxDate: { type: String, required: true },
  // (dateKey) => { disabled, reason?, mark?: 'x' }
  isDisabled: { type: Function, default: () => ({ disabled: false }) },
  // (dateKey) => 'free' | 'partial' | 'full' | 'taken' | null
  dayStatus: { type: Function, default: () => null },
  // วันที่มีการเลือกอยู่ (ใช้เมื่อค่าที่เลือกจริงเป็น slot หลายรอบ ไม่ใช่วันเดียว)
  marked: { type: Array, default: () => [] },
  maxSelect: { type: Number, default: 7 },
  // เลือกเป็นช่วง: แตะวันเริ่มแล้วแตะวันสิ้นสุด -> emit pick-range { from, to } (ตัวแม่ตัดสินว่าวันไหนเพิ่มได้)
  rangeMode: { type: Boolean, default: false },
  // 'light' = อยู่บนพื้นขาวตลอด (เช่น BookingModal tone=light) ไม่ใช้สี dark: ; 'auto' = ตามธีม
  tone: { type: String, default: 'auto' }
})

// ตัดคลาส dark:* ออกเมื่อ tone='light' (พื้นหลังขาวเสมอ ตัวอักษรสีอ่อนจะมองไม่เห็น)
const tn = (cls) => (props.tone === 'light' ? cls.split(' ').filter((c) => !c.includes('dark:')).join(' ') : cls)
const emit = defineEmits(['update:modelValue', 'month-change', 'pick-range'])
const rangeStart = ref('')

const today = computed(() => todayBangkok())
const selectedList = computed(() => props.mode === 'multiple' ? [...(props.modelValue || [])].sort() : [])
const anchor = () => (props.mode === 'single' ? props.modelValue : selectedList.value[0]) || today.value
const clampDate = (d) => (d < props.minDate ? props.minDate : d > props.maxDate ? props.maxDate : d)

const view = ref(monthOf(clampDate(anchor())))
const focusDate = ref(clampDate(anchor()))
const pickingMonth = ref(false)
const hint = ref('')
const limitMsg = ref('')
const gridEl = ref(null)

const minMonth = computed(() => monthOf(props.minDate))
const maxMonth = computed(() => monthOf(props.maxDate))
const canPrev = computed(() => compareMonth(view.value, minMonth.value) > 0)
const canNext = computed(() => compareMonth(view.value, maxMonth.value) < 0)
const cells = computed(() => buildMonthGrid(view.value.year, view.value.month))
const monthChoices = computed(() => monthsBetween(props.minDate, props.maxDate))

watch(() => props.rangeMode, () => { rangeStart.value = ''; hint.value = '' })
watch(view, (v) => emit('month-change', { year: v.year, month: v.month }), { immediate: true })

function setView(v) {
  view.value = v
  hint.value = ''
  // ให้ focus อยู่ในเดือนที่แสดงเสมอ
  const inView = (d) => d && d.startsWith(`${v.year}-${String(v.month).padStart(2, '0')}`)
  if (!inView(focusDate.value)) focusDate.value = clampDate(`${v.year}-${String(v.month).padStart(2, '0')}-01`)
}
function go(delta) {
  const next = shiftMonth(view.value, delta)
  if (compareMonth(next, minMonth.value) < 0 || compareMonth(next, maxMonth.value) > 0) return
  setView(next)
}
function chooseMonth(m) {
  setView({ year: m.year, month: m.month })
  pickingMonth.value = false
}
function goToday() {
  pickingMonth.value = false
  setView(monthOf(clampDate(today.value)))
  focusDate.value = clampDate(today.value)
}

// ติดตามค่าที่เลือกจากภายนอก (เช่น เปิดหน้าจองแล้วค่อยมีวันที่เลือกไว้) ให้ปฏิทินกระโดดไปเดือนนั้น
watch(() => (props.mode === 'single' ? props.modelValue : selectedList.value[0]), (d) => {
  if (d && d >= props.minDate && d <= props.maxDate && compareMonth(monthOf(d), view.value) !== 0) setView(monthOf(d))
})

function state(d) {
  if (d < props.minDate || d > props.maxDate) {
    return { disabled: true, reason: d < props.minDate ? 'วันที่ผ่านมาแล้ว' : 'เกินช่วงที่จองล่วงหน้าได้' }
  }
  const r = props.isDisabled(d) || {}
  return { disabled: !!r.disabled, reason: r.reason || 'จองไม่ได้', mark: r.mark }
}
const isChosen = (d) => d === rangeStart.value || (props.mode === 'single' ? props.modelValue === d : selectedList.value.includes(d)) || props.marked.includes(d)

function dayClass(d) {
  const st = state(d)
  if (isChosen(d)) return 'bg-indigo-600 text-white font-bold'
  const ring = d === today.value ? ' ring-1 ring-indigo-400' : ''
  if (st.disabled) return tn(`text-slate-300 dark:text-slate-600 cursor-not-allowed${ring}`)
  return tn(`text-slate-800 dark:text-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-800${ring}`)
}
function dot(d) {
  if (isChosen(d)) return ''
  const s = props.dayStatus(d)
  return s === 'partial' ? 'bg-amber-400' : s === 'full' ? 'bg-rose-500' : ''
}
function ariaLabel(d) {
  const st = state(d)
  return `${formatLongThaiDate(d)}${st.disabled ? ` จองไม่ได้: ${st.reason}` : ''}`
}

// เลือกหลายวัน (สูงสุดได้ถึง 365) แสดงแค่ 6 วันแรก ที่เหลือบอกเป็นจำนวน
const SUMMARY_MAX = 6
const summary = computed(() => {
  const list = selectedList.value
  const text = list.slice(0, SUMMARY_MAX).map((d) => formatThaiDate(d).split(' ').slice(1, 3).join(' ')).join(', ')
  return list.length > SUMMARY_MAX ? `${text} และอีก ${list.length - SUMMARY_MAX} วัน` : text
})

function onPick(d) {
  focusDate.value = d
  limitMsg.value = ''
  const st = state(d)
  if (st.disabled) { hint.value = `${formatThaiDate(d)}: ${st.reason}`; return }
  hint.value = ''
  if (props.rangeMode) {
    if (!rangeStart.value) { rangeStart.value = d; hint.value = `เริ่ม ${formatThaiDate(d)} · แตะวันสิ้นสุดของช่วง`; return }
    const [from, to] = [rangeStart.value, d].sort()
    rangeStart.value = ''
    emit('pick-range', { from, to })
    return
  }
  if (props.mode === 'single') { emit('update:modelValue', d); return }
  const list = selectedList.value
  if (list.includes(d)) { emit('update:modelValue', list.filter((x) => x !== d)); return }
  if (list.length >= props.maxSelect) { limitMsg.value = `เลือกได้สูงสุด ${props.maxSelect} วันต่อการจอง`; return }
  emit('update:modelValue', [...list, d].sort())
}
function clearAll() { limitMsg.value = ''; emit('update:modelValue', []) }

async function onKey(e) {
  const target = e.target?.dataset?.date
  const next = target && moveByKey(target, e.key)
  if (!next) return
  e.preventDefault()
  if (next < props.minDate || next > props.maxDate) return
  focusDate.value = next
  const m = monthOf(next)
  if (compareMonth(m, view.value) !== 0) setView(m)
  focusDate.value = next
  await nextTick()
  gridEl.value?.querySelector(`[data-date="${next}"]`)?.focus()
}
</script>

<style scoped>
.nav-btn {
  @apply w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 border border-slate-300 bg-white transition hover:border-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed;
}
.nav-btn-dark {
  @apply dark:text-slate-200 dark:border-slate-700 dark:bg-slate-900;
}
</style>
