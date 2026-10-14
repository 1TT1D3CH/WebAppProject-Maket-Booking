<template>
  <BaseModal :open="isOpen" title="ตั้งค่าการจอง (วัน / รอบตลาด)" size="lg" mobile-mode="fullscreen" @close="$emit('close')">
    <form id="booking-settings-form" class="space-y-5 text-sm" @submit.prevent="save">
      <!-- วันเปิดตลาด -->
      <section class="space-y-2">
        <h3 class="font-bold text-slate-900 dark:text-white">วันที่ตลาดเปิดขาย (ประจำสัปดาห์)</h3>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="(label, dow) in WEEKDAYS" :key="dow" type="button"
            class="min-h-[44px] min-w-[52px] px-3 rounded-xl text-xs font-bold border transition"
            :class="form.openWeekdays.includes(dow) ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'"
            @click="toggleWeekday(dow)"
          >{{ label }}</button>
        </div>
      </section>

      <!-- วันปิด / วันเปิดพิเศษ -->
      <section class="grid sm:grid-cols-2 gap-4">
        <div v-for="g in dateLists" :key="g.key" class="space-y-2">
          <h3 class="font-bold text-slate-900 dark:text-white">{{ g.title }}</h3>
          <div class="flex gap-2">
            <input v-model="g.draft.value" type="date" class="field flex-1" />
            <button type="button" class="min-h-[44px] px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold" @click="addDate(g)">เพิ่ม</button>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="d in form[g.key]" :key="d" class="inline-flex items-center gap-1 pl-3 pr-1 min-h-[36px] rounded-full bg-slate-100 dark:bg-slate-800 text-xs">
              {{ formatThaiDate(d) }}
              <button type="button" class="w-7 h-7 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" :aria-label="`ลบ ${d}`" @click="removeDate(g.key, d)">×</button>
            </span>
            <span v-if="!form[g.key].length" class="text-xs text-slate-400">ไม่มี</span>
          </div>
        </div>
      </section>

      <!-- กติกาการจอง -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">จองล่วงหน้าได้ไม่เกิน (วัน)
          <input v-model.number="form.maxAdvanceDays" type="number" min="1" max="365" class="field" />
        </label>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">จองได้สูงสุดต่อครั้ง (ช่อง, 1-{{ MAX_SLOTS_LIMIT }})
          <input v-model.number="form.maxSlotsPerBooking" type="number" min="1" :max="MAX_SLOTS_LIMIT" class="field" />
        </label>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">ปิดรับจองเวลา (ของวันก่อนวันขาย)
          <div class="flex gap-2">
            <input v-model="form.bookingCutoffTime" type="time" class="field flex-1" />
            <button v-if="form.bookingCutoffTime" type="button" class="min-h-[44px] px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs" @click="form.bookingCutoffTime = ''">ล้าง</button>
          </div>
          <span class="font-normal text-slate-400">ว่าง = ไม่จำกัด</span>
        </label>
      </section>

      <!-- รอบตลาด -->
      <section class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-slate-900 dark:text-white">รอบตลาด</h3>
          <button type="button" class="min-h-[44px] px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold disabled:opacity-50" :disabled="form.rounds.length >= MAX_ROUNDS" @click="addRound">+ เพิ่มรอบ</button>
        </div>
        <p v-if="!form.rounds.length" class="text-xs text-slate-500 dark:text-slate-400">ไม่ได้ตั้งรอบ = วันละรอบเดียว (ทั้งวัน) เพิ่มรอบเมื่ออยากให้แผงเดียวกันจองแยกเช้า/เย็นได้</p>
        <div v-for="(r, i) in form.rounds" :key="r.id" class="grid grid-cols-2 sm:grid-cols-[1fr_110px_110px_auto] gap-2 items-end">
          <label class="col-span-2 sm:col-span-1 text-[11px] font-semibold text-slate-500">ชื่อรอบ
            <input v-model="r.label" type="text" maxlength="30" class="field" placeholder="เช่น รอบเช้า" />
          </label>
          <label class="text-[11px] font-semibold text-slate-500">เริ่ม
            <input v-model="r.start" type="time" class="field" />
          </label>
          <label class="text-[11px] font-semibold text-slate-500">จบ
            <input v-model="r.end" type="time" class="field" />
          </label>
          <div class="col-span-2 sm:col-span-1 flex gap-1">
            <button type="button" class="min-h-[44px] w-11 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40" :disabled="i === 0" aria-label="เลื่อนขึ้น" @click="moveRound(i, -1)">↑</button>
            <button type="button" class="min-h-[44px] w-11 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40" :disabled="i === form.rounds.length - 1" aria-label="เลื่อนลง" @click="moveRound(i, 1)">↓</button>
            <button type="button" class="min-h-[44px] px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold" @click="removeRound(i)">ลบ</button>
          </div>
        </div>
      </section>

      <!-- เวลากันแผง -->
      <section class="space-y-2">
        <h3 class="font-bold text-slate-900 dark:text-white">เวลากันแผงรอสลิป</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">กันแผงหลังกดจอง (นาที, 10-120)
            <input v-model.number="form.paymentHoldMinutes" type="number" min="10" max="120" class="field" />
          </label>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">ให้เวลาส่งสลิปใหม่ที่ขอ (ชั่วโมง, 1-72)
            <input v-model.number="form.resubmitHours" type="number" min="1" max="72" class="field" />
          </label>
        </div>
        <p class="text-[11px] text-slate-400">หมดเวลาแล้วแผงว่างให้คนอื่นจองได้เองโดยไม่ต้องรอใครกด</p>
      </section>

      <!-- นโยบายยกเลิก / คืนเงิน -->
      <section class="space-y-2">
        <h3 class="font-bold text-slate-900 dark:text-white">นโยบายยกเลิกและคืนเงิน</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">คืนเต็มเมื่อยกเลิกก่อนวันขาย (วันขึ้นไป)
            <input v-model.number="form.cancelPolicy.fullRefundDaysBefore" type="number" min="0" max="365" class="field" />
          </label>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">ยกเลิกน้อยกว่านั้นคืน (%)
            <input v-model.number="form.cancelPolicy.partialRefundPercent" type="number" min="0" max="100" class="field" />
          </label>
        </div>
        <label class="flex items-center gap-3 min-h-[44px] text-xs font-semibold text-slate-700 dark:text-slate-200">
          <input v-model="form.cancelPolicy.noRefundOnMarketDay" type="checkbox" class="w-5 h-5 accent-indigo-600" /> วันขายและหลังจากนั้นไม่คืนเงิน
        </label>
        <label class="flex items-center gap-3 min-h-[44px] text-xs font-semibold text-slate-700 dark:text-slate-200">
          <input v-model="form.cancelPolicy.allowTenantRequest" type="checkbox" class="w-5 h-5 accent-indigo-600" /> ให้ผู้เช่าขอยกเลิกการจองที่อนุมัติแล้วเองได้
        </label>
      </section>

      <!-- ข้อมูลบนใบเสร็จ -->
      <section class="space-y-2">
        <h3 class="font-bold text-slate-900 dark:text-white">ข้อมูลบนใบเสร็จรับเงิน</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">ชื่อตลาด / ผู้รับเงิน
            <input v-model="form.receipt.name" type="text" maxlength="100" class="field" />
          </label>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">เบอร์โทร
            <input v-model="form.receipt.phone" type="text" maxlength="30" class="field" />
          </label>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300 sm:col-span-2">ที่อยู่
            <input v-model="form.receipt.address" type="text" maxlength="200" class="field" />
          </label>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">เลขประจำตัวผู้เสียภาษี (ไม่บังคับ)
            <input v-model="form.receipt.taxId" type="text" maxlength="20" class="field" />
          </label>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">ขนาดกระดาษ
            <select v-model="form.receipt.paper" class="field"><option value="A5">A5</option><option value="A4">A4</option></select>
          </label>
        </div>
        <p class="text-[11px] text-slate-400">ใบเสร็จนี้เป็นใบเสร็จรับเงิน ไม่ใช่ใบกำกับภาษี</p>
      </section>

      <p v-if="error" class="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-3 text-xs text-rose-700 dark:text-rose-300 font-medium">{{ error }}</p>
      <p class="text-[11px] text-slate-400">หมายเหตุ: ปฏิทินตลาด (วันเปิด/ปิด จองล่วงหน้า เวลาปิดรับ) ตรวจที่หน้าเว็บของผู้จอง ส่วนการกันจองซ้ำและราคาตรวจที่ฐานข้อมูล</p>
    </form>

    <template #footer>
      <button type="button" class="px-4 py-2 min-h-[44px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-sm" @click="$emit('close')">ยกเลิก</button>
      <button type="submit" form="booking-settings-form" :disabled="saving" class="px-6 py-2 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm">
        {{ saving ? 'กำลังบันทึก...' : 'บันทึกตั้งค่า' }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
import { useSlotStore } from '../../stores/slotStore'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { saveMarketSettings } from '../../services/marketSettings'
import { countFutureLocksOfRound } from '../../services/firebaseService'
import { normalizeSettings, MAX_ROUNDS, MAX_SLOTS_LIMIT } from '../../utils/marketCalendar'
import { todayBangkok, formatThaiDate } from '../../utils/date'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const slotStore = useSlotStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()

const WEEKDAYS = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
const form = reactive({ ...cloneSettings(slotStore.settings) })
const saving = ref(false)
const error = ref('')
const dateLists = [
  { key: 'closedDates', title: 'วันหยุดพิเศษ (ปิดตลาด)', draft: ref('') },
  { key: 'extraOpenDates', title: 'วันเปิดพิเศษ (นอกวันประจำ)', draft: ref('') }
]

function cloneSettings(s) {
  return JSON.parse(JSON.stringify(s))
}

watch(() => props.isOpen, (open) => {
  if (!open) return
  Object.assign(form, cloneSettings(slotStore.settings))
  error.value = ''
})

function toggleWeekday(dow) {
  form.openWeekdays = form.openWeekdays.includes(dow)
    ? form.openWeekdays.filter(d => d !== dow)
    : [...form.openWeekdays, dow].sort()
}

function addDate(g) {
  const v = g.draft.value
  if (!v || form[g.key].includes(v)) return
  form[g.key] = [...form[g.key], v].sort()
  g.draft.value = ''
}
const removeDate = (key, d) => { form[key] = form[key].filter(x => x !== d) }

// id ของรอบ: อังกฤษพิมพ์เล็ก+ตัวเลข สร้างอัตโนมัติ ไม่ซ้ำกับของเดิม (id เก่าห้ามเปลี่ยน เพราะ lock อ้างอยู่)
function addRound() {
  let n = form.rounds.length + 1
  while (form.rounds.some(r => r.id === `r${n}`)) n++
  form.rounds.push({ id: `r${n}`, label: '', start: '', end: '' })
}
function moveRound(i, step) {
  const j = i + step
  if (j < 0 || j >= form.rounds.length) return
  const next = [...form.rounds]
  ;[next[i], next[j]] = [next[j], next[i]]
  form.rounds = next
}
function removeRound(i) { form.rounds.splice(i, 1) }

async function save() {
  error.value = ''
  if (!form.openWeekdays.length && !form.extraOpenDates.length) {
    error.value = 'ต้องเลือกวันเปิดตลาดอย่างน้อย 1 วัน'
    return
  }
  const empty = form.rounds.find(r => !String(r.label).trim())
  if (empty) { error.value = 'กรุณาตั้งชื่อรอบให้ครบทุกรอบ'; return }
  const bad = form.rounds.find(r => (r.start && !r.end) || (!r.start && r.end) || (r.start && r.end && r.start >= r.end))
  if (bad) { error.value = `เวลาของ "${bad.label}" ไม่ถูกต้อง (เวลาเริ่มต้องก่อนเวลาจบ)`; return }

  saving.value = true
  try {
    // ลบรอบที่ยังมีการจองในอนาคตอยู่ไม่ได้
    const removed = slotStore.settings.rounds.filter(old => !form.rounds.some(r => r.id === old.id))
    const today = todayBangkok()
    for (const r of removed) {
      const n = await countFutureLocksOfRound(r.id, today)
      if (n > 0) {
        error.value = `ลบรอบ "${r.label}" ไม่ได้ เพราะยังมีการจองในอนาคต ${n >= 200 ? '200+' : n} ช่อง`
        return
      }
    }
    const saved = await saveMarketSettings(normalizeSettings(form), slotStore.settings, authStore.auditActor)
    slotStore.settings = saved
    marketStore.showNotification('บันทึกตั้งค่าการจองแล้ว', 'success')
    emit('close')
  } catch (err) {
    console.error('Save booking settings error:', err)
    error.value = err.code === 'permission-denied'
      ? 'ไม่มีสิทธิ์บันทึก (ต้องเป็น admin หรือ owner และ rules ต้อง deploy แล้ว)'
      : err.code === 'failed-precondition' ? 'ดัชนีฐานข้อมูลยังสร้างไม่เสร็จ กรุณารอสักครู่แล้วลองใหม่' : (err.message || 'บันทึกไม่สำเร็จ')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.field {
  display: block;
  width: 100%;
  min-height: 44px;
  margin-top: 2px;
  padding: 0 0.75rem;
  font-size: 16px;
  border-radius: 0.75rem;
  border: 1px solid rgb(203 213 225);
  background: white;
  color: rgb(15 23 42);
}
:global(.dark) .field {
  background: rgb(15 23 42);
  border-color: rgb(51 65 85);
  color: rgb(241 245 249);
}
</style>
