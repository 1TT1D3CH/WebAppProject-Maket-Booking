<template>
  <BaseModal
    :open="isOpen && !!stall"
    :title="`จองแผงค้า ${stall?.stallNo ?? ''}`"
    tone="light"
    size="md"
    mobile-mode="fullscreen"
    @close="$emit('close')"
  >
      <!-- Auth Check Banner (NO GUEST BOOKING ENFORCEMENT) -->
      <div v-if="!authStore.isAuthenticated" class="py-4 text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <Lock class="w-6 h-6" />
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-900">ต้องเข้าสู่ระบบก่อนทำการจองแผงค้า</h3>
          <p class="text-xs text-slate-500 mt-1">เพื่อความปลอดภัยและรับการแจ้งเตือนสิทธิ์การจอง กรุณาสมัครสมาชิกหรือล็อกอินเข้าใช้งาน</p>
        </div>
        <button
          @click="$emit('open-auth')"
          class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-200"
        >
          ล็อกอิน / สมัครสมาชิกเข้าใช้งาน
        </button>
      </div>

      <!-- Form Body -->
      <form v-else id="booking-form" @submit.prevent="submitBooking" class="space-y-4 text-xs sm:text-sm">
        
        <!-- Stall Summary Card -->
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-white text-lg shadow-md"
              :style="{ backgroundColor: marketStore.pubZoneById(stall.zoneId)?.color }"
            >
              {{ stall.stallNo }}
            </div>
            <div>
              <div class="font-bold text-slate-900 text-base">แผงค้า {{ stall.stallNo }}</div>
              <div class="text-xs text-slate-500 font-medium">{{ marketStore.pubZoneById(stall.zoneId)?.name }}</div>
              <div class="text-xs text-indigo-600 font-mono font-semibold mt-0.5">
                ขนาด: {{ stallMetrics.widthM }} x {{ stallMetrics.heightM }} เมตร ({{ stallMetrics.areaSqM }} ตร.ม.)
              </div>
            </div>
          </div>
          <div class="text-right font-mono">
            <div class="text-xs text-slate-400 font-medium">อัตราค่าเช่า</div>
            <div class="text-base font-bold text-emerald-700">฿{{ stall.price }}/{{ slotStore.rounds.length > 1 ? 'รอบ' : 'วัน' }}</div>
          </div>
        </div>

        <!-- เลือกวัน / รอบ ที่ต้องการจอง (หลายช่องได้) -->
        <div class="rounded-2xl border border-slate-200 p-3 space-y-2">
          <div class="flex items-center justify-between gap-2">
            <label class="text-xs font-semibold text-slate-700">เลือกวันที่ต้องการจอง *</label>
            <span class="text-[11px] text-slate-500 font-mono">เลือกแล้ว {{ selected.length }}/{{ maxSlots }}</span>
          </div>
          <p v-if="locksLoading" class="text-xs text-slate-500">กำลังตรวจวันที่ว่าง...</p>
          <p v-else-if="locksError" class="text-xs text-rose-600">{{ locksError }}
            <button type="button" class="underline font-semibold" @click="loadLocks">ลองใหม่</button></p>
          <p v-if="!hasBookableDate" class="text-xs text-slate-500">ตอนนี้ยังไม่มีวันเปิดรับจอง</p>

          <!-- ทางลัดเลือกหลายวัน (จองยาวไม่ต้องกดทีละวัน): แสดงเมื่อจองได้เกิน 1 ช่อง -->
          <div v-if="maxSlots > 1" class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-[11px] font-semibold text-slate-600">เลือกเร็ว (นับจากวันนี้):</span>
              <button v-for="q in quickChoices" :key="q.days" type="button"
                class="min-h-[36px] px-3 rounded-full text-xs font-semibold border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 transition"
                @click="quickSelect(q.days)">{{ q.label }}</button>
              <button type="button"
                class="min-h-[36px] px-3 rounded-full text-xs font-semibold border transition"
                :class="rangeMode ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'"
                @click="rangeMode = !rangeMode">{{ rangeMode ? 'ยกเลิกเลือกช่วง' : 'เลือกเป็นช่วง' }}</button>
              <button v-if="selected.length" type="button" class="min-h-[36px] px-2 text-xs underline font-semibold text-slate-600" @click="clearSelected">ล้างทั้งหมด</button>
            </div>
            <p v-if="rangeMode" class="text-[11px] text-indigo-700">โหมดเลือกช่วง: แตะวันเริ่ม แล้วแตะวันสิ้นสุดในปฏิทิน (เลื่อนเดือนได้) ระบบข้ามวันที่ตลาดปิด/แผงไม่ว่างให้</p>
            <p v-if="bulkMsg" class="text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">{{ bulkMsg }}</p>
          </div>

          <!-- รอบเดียว: เลือกหลายวันจากปฏิทินได้เลย -->
          <BookingCalendar
            v-if="!multiRound"
            v-model="selectedDates" mode="multiple" tone="light"
            :min-date="slotStore.minDate" :max-date="slotStore.maxDate"
            :is-disabled="dayDisabled" :max-select="maxSlots"
            :range-mode="rangeMode" @pick-range="onPickRange"
          />

          <!-- หลายรอบ: เลือกวันในปฏิทินก่อน แล้วเลือกรอบของวันนั้นด้านล่าง -->
          <template v-else>
            <BookingCalendar
              v-model="activeDate" mode="single" tone="light" :marked="selectedDatesOfSlots"
              :min-date="slotStore.minDate" :max-date="slotStore.maxDate" :is-disabled="dayDisabled"
              :range-mode="rangeMode" @pick-range="onPickRange"
            />
            <div v-if="activeDate" class="flex items-center gap-2 flex-wrap pt-1">
              <span class="text-xs font-semibold text-slate-700">{{ formatThaiDate(activeDate) }}</span>
              <button
                v-for="r in slotStore.rounds" :key="r.id" type="button"
                :disabled="!slotState(activeDate, r.id).free"
                class="min-h-[44px] px-3 rounded-xl text-xs font-semibold border transition disabled:opacity-50 disabled:cursor-not-allowed"
                :class="isSelected(activeDate, r.id)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : slotState(activeDate, r.id).free ? 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400' : 'bg-slate-100 text-slate-400 border-slate-200'"
                @click="toggle(activeDate, r.id)"
              >{{ r.label }}<span v-if="slotState(activeDate, r.id).note" class="ml-1 font-normal">· {{ slotState(activeDate, r.id).note }}</span></button>
            </div>
            <p v-else class="text-[11px] text-slate-500">เลือกวันในปฏิทิน แล้วเลือกรอบที่ต้องการ</p>
          </template>
        </div>

        <!-- Strict Data Validation Form Fields -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              ชื่อ-นามสกุล ผู้จอง / ชื่อร้านค้า *
            </label>
            <input 
              v-model="customer.name"
              required
              type="text"
              placeholder="เช่น คุณสมพงษ์ ใจดี (ร้านชาไข่มุก)"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">
                เบอร์โทรศัพท์ (10 หลัก) *
              </label>
              <input 
                v-model="customer.phone"
                required
                type="tel"
                maxlength="10"
                placeholder="0812345678"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">
                เลขบัตรประชาชน (13 หลัก) *
              </label>
              <input 
                v-model="customer.citizenId"
                required
                type="text"
                maxlength="13"
                placeholder="1100200300401"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              ชื่อร้าน (ไม่บังคับ — แสดงให้ลูกค้าคนอื่นเห็นบนผัง)
            </label>
            <input
              v-model="customer.shopName"
              type="text"
              maxlength="60"
              placeholder="เช่น ข้าวมันไก่ป้าแดง"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              ประเภทสินค้า / สินค้าที่จะนำมาขาย *
            </label>
            <input 
              v-model="customer.goodsType"
              required
              maxlength="60"
              type="text"
              placeholder="เช่น ชาชงสด, ขนมปังปิ้ง, เสื้อผ้าแฟชั่น"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <!-- Payment Slip Upload & Preview -->
          <div class="pt-2">
            <div class="rounded-2xl bg-indigo-50 border border-indigo-200/80 p-3 mb-2 text-center">
              <div class="text-[11px] text-indigo-700 font-semibold">ยอดที่ต้องโอน</div>
              <div class="text-2xl font-bold font-mono text-indigo-900">฿{{ totalAmount }}</div>
              <div v-if="selected.length > 1" class="text-[11px] text-slate-600 font-mono">฿{{ stall.price }} × {{ selected.length }} ช่อง</div>
              <div class="text-[11px] text-slate-600 font-mono mt-0.5">PromptPay: 096-557-2213</div>
            </div>
            <label class="block text-xs font-semibold text-slate-800 mb-1.5">
              💳 แนบสลิปโอนเงินค่าเช่า (แนบทีหลังได้ภายใน {{ holdMinutes }} นาที)
            </label>

            <div 
              class="border-2 border-dashed rounded-2xl p-3 text-center transition cursor-pointer relative"
              :class="slipPreview ? 'border-emerald-500/60 bg-emerald-50/50' : 'border-slate-300 hover:border-indigo-400 bg-slate-50'"
              @click="!compressing && $refs.fileInput.click()"
            >
              <input 
                ref="fileInput"
                type="file" 
                accept="image/jpeg,image/png,image/webp"
                class="hidden" 
                @change="handleFileUpload"
              />

              <div v-if="compressing" class="py-6 text-xs font-medium text-slate-500">กำลังย่อรูปสลิป...</div>

              <div v-else-if="slipPreview" class="flex flex-col items-center gap-2">
                <img :src="slipPreview" alt="Slip Preview" class="max-h-36 rounded-lg object-contain border border-slate-200 shadow-xs" />
                <span class="text-xs text-emerald-700 font-semibold">✓ แนบสลิปเรียบร้อยแล้ว (แตะเพื่อเปลี่ยนรูป)</span>
              </div>

              <div v-else class="py-3 flex flex-col items-center gap-1.5 text-slate-500">
                <UploadCloud class="w-6 h-6 text-indigo-600" />
                <span class="text-xs font-medium">แตะเพื่อถ่ายรูปหรือเลือกสลิปจากคลังภาพ</span>
                <span class="text-[10px] text-slate-400">รองรับ JPG, PNG, WebP (iPhone: แคปหน้าจอสลิปแทนไฟล์ HEIC)</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Validation Error Alert -->
        <div v-if="validationError" class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium">
          <AlertCircle class="w-4 h-4 shrink-0 text-rose-600" />
          <span>{{ validationError }}</span>
        </div>

        <!-- Protection Banner -->
        <div class="bg-indigo-50 border border-indigo-200/80 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-indigo-900 font-medium">
          <ShieldCheck class="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            <template v-if="slipData">หลังส่งสลิป แผงจะถูกกันไว้ให้คุณระหว่างรอผู้ดูแลตรวจสลิป ติดตามผลได้ภายหลัง</template>
            <template v-else>ถ้ายังไม่แนบสลิป ระบบจะกันแผงไว้ให้ {{ holdMinutes }} นาที แนบสลิปได้ที่ "การจองของฉัน" เกินเวลาแล้วแผงจะว่างให้คนอื่นจอง</template>
          </p>
        </div>

      </form>

    <template v-if="authStore.isAuthenticated" #footer>
      <button
        type="button"
        @click="$emit('close')"
        class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
      >
        ยกเลิก
      </button>
      <button
        type="submit"
        form="booking-form"
        :disabled="compressing || submitting"
        class="disabled:opacity-60 disabled:cursor-not-allowed px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 text-sm transition inline-flex items-center gap-1.5 active:scale-95"
      >
        <CheckCircle class="w-4 h-4" />
        <span>{{ submitting ? 'กำลังส่ง...' : !selected.length ? 'จองแผง' : slipData ? `ส่งสลิปและจอง ${selected.length} ช่อง` : `จอง ${selected.length} ช่องและไปชำระเงิน` }}</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { useAuthStore } from '../../stores/authStore'
import BaseModal from '../ui/BaseModal.vue'
import { compressSlipImage } from '../../utils/compressImage'
import { useSlotStore } from '../../stores/slotStore'
import { useMyBookingsStore } from '../../stores/myBookingsStore'
import BookingCalendar from '../booking/BookingCalendar.vue'
import { canBookSlot, canBookDate, nextBookableDate, parseSlotKey, slotKey, formatSlotLabel } from '../../utils/marketCalendar'
import { isHoldExpired } from '../../utils/holdTimer'
import { serverNow, calibrateServerClock } from '../../utils/serverClock'
import { fetchBooking } from '../../services/firebaseService'
import { todayBangkok, addDays, formatThaiDate } from '../../utils/date'
import { ShieldCheck, CheckCircle, UploadCloud, AlertCircle, Lock } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  stall: Object
})

const emit = defineEmits(['close', 'open-auth', 'need-profile', 'open-my-bookings'])
const marketStore = useMarketStore()
const authStore = useAuthStore()
const slotStore = useSlotStore()
const myBookings = useMyBookingsStore()
const MAX_HOLDS = 2

// ─── เลือกวัน/รอบ ───────────────────────────────────────────────────────────
const selected = ref([]) // slotKey ที่เลือก
const stallLocks = ref([])
const locksLoading = ref(false)
const locksError = ref('')

const maxSlots = computed(() => slotStore.settings.maxSlotsPerBooking)
const totalAmount = computed(() => (props.stall?.price || 0) * selected.value.length)
const holdMinutes = computed(() => slotStore.settings.paymentHoldMinutes)
// lock ที่รอสลิปและหมดเวลาแล้วถือว่าว่าง จองทับได้
const takenKeys = computed(() => new Set(stallLocks.value.filter(l => !isHoldExpired(l, serverNow())).map(l => l.slotKey)))
const multiRound = computed(() => slotStore.rounds.length > 1)
const activeDate = ref('') // โหมดหลายรอบ: วันที่กำลังเลือกรอบ
const hasBookableDate = computed(() => !!nextBookableDate(slotStore.settings, addDays(todayBangkok(), -1), 1))

// โหมดรอบเดียว: ปฏิทินเลือกวัน -> slotKey (รอบเดียวของตลาด)
const selectedDates = computed({
  get: () => selected.value.map(k => parseSlotKey(k)?.date).filter(Boolean),
  set: (dates) => { selected.value = dates.map(d => slotKey(d, slotStore.rounds[0].id)).sort() }
})
const selectedDatesOfSlots = computed(() => [...new Set(selectedDates.value)])

// ─── เลือกหลายวันรวดเดียว (เลือกเร็ว / เลือกเป็นช่วง) ───────────────────────────
const rangeMode = ref(false)
const bulkMsg = ref('')
const quickChoices = computed(() => [
  { days: 30, label: '30 วัน' }, { days: 90, label: '3 เดือน' }, { days: 180, label: '6 เดือน' }, { days: 365, label: '1 ปี' }
].filter(q => q.days <= slotStore.settings.maxAdvanceDays + 1))

function clearSelected() { selected.value = []; bulkMsg.value = ''; validationError.value = '' }

/** เติมทุกวัน (ทุกรอบที่ว่าง) ในช่วง from..to ที่จองได้ ข้ามวันที่จองไม่ได้ และไม่เกินเพดานต่อการจอง */
function addRange(from, to) {
  const cap = maxSlots.value
  const next = new Set(selected.value)
  const before = next.size
  const skipped = { closed: 0, taken: 0 }
  let capped = false
  for (let d = from; d <= to; d = addDays(d, 1)) {
    const states = slotStore.rounds.map(r => ({ key: slotKey(d, r.id), st: slotState(d, r.id) }))
    const free = states.filter(x => x.st.free)
    if (!free.length) {
      if (states.every(x => x.st.note === 'จองแล้ว')) skipped.taken++
      else skipped.closed++
      continue
    }
    for (const x of free) {
      if (next.has(x.key)) continue
      if (next.size >= cap) { capped = true; break }
      next.add(x.key)
    }
    if (capped) break
  }
  selected.value = [...next].sort()
  validationError.value = ''
  const added = next.size - before
  const parts = [`เพิ่ม ${added} ช่อง`]
  if (skipped.closed) parts.push(`ข้าม ${skipped.closed} วัน (ตลาดปิด/ปิดรับจอง)`)
  if (skipped.taken) parts.push(`ข้าม ${skipped.taken} วัน (แผงนี้ไม่ว่าง)`)
  if (capped) parts.push(`ครบเพดาน ${cap} ช่องต่อการจองแล้ว`)
  bulkMsg.value = `${parts.join(' · ')} · รวมเลือกแล้ว ${next.size} ช่อง`
}

function quickSelect(days) {
  const from = slotStore.minDate
  const to = addDays(from, days - 1) > slotStore.maxDate ? slotStore.maxDate : addDays(from, days - 1)
  addRange(from, to)
}
function onPickRange({ from, to }) {
  addRange(from, to)
  rangeMode.value = false
}

/** วันนี้เลือกไม่ได้เมื่อทุกรอบจองไม่ได้ (ตลาดปิด/เกินกำหนด/แผงนี้ไม่ว่างทุกรอบ) */
function dayDisabled(date) {
  const states = slotStore.rounds.map(r => ({ r, st: slotState(date, r.id) }))
  if (states.some(x => x.st.free)) return { disabled: false }
  if (states.every(x => x.st.note === 'จองแล้ว')) return { disabled: true, reason: 'แผงนี้ไม่ว่างวันนั้น', mark: 'x' }
  const check = canBookDate(slotStore.settings, date)
  return { disabled: true, reason: check.reason || 'จองไม่ได้' }
}

function slotState(date, roundId) {
  const key = slotKey(date, roundId)
  if (takenKeys.value.has(key)) return { free: false, note: 'จองแล้ว' }
  const check = canBookSlot(slotStore.settings, key)
  if (!check.ok) return { free: false, note: check.reason === 'ปิดรับจองรอบนี้แล้ว' ? 'ปิดรับ' : '' }
  return { free: true, note: '' }
}
const isSelected = (date, roundId) => selected.value.includes(slotKey(date, roundId))

function toggle(date, roundId) {
  const key = slotKey(date, roundId)
  if (selected.value.includes(key)) {
    selected.value = selected.value.filter(k => k !== key)
    return
  }
  if (selected.value.length >= maxSlots.value) {
    validationError.value = `เลือกได้ไม่เกิน ${maxSlots.value} ช่องต่อการจอง`
    return
  }
  validationError.value = ''
  selected.value = [...selected.value, key].sort()
}

async function loadLocks() {
  if (!props.stall) return
  locksLoading.value = true
  locksError.value = ''
  try {
    stallLocks.value = await slotStore.loadStallLocks(props.stall.id)
  } catch (err) {
    console.error('Load stall locks error:', err)
    locksError.value = err?.code === 'failed-precondition' ? 'ดัชนีฐานข้อมูลยังสร้างไม่เสร็จ กรุณารอสักครู่' : 'ตรวจวันที่ว่างไม่สำเร็จ'
  } finally {
    locksLoading.value = false
  }
}

// เปิดหน้าจอง: ติ๊กวัน/รอบที่เลือกอยู่บนผังไว้ให้ (ถ้าจองได้) และโหลดวันที่ว่างของแผงนี้
watch(() => [props.isOpen, props.stall?.id], async ([open]) => {
  if (!open || !props.stall) return
  selected.value = []
  stallLocks.value = []
  await loadLocks()
  const key = slotStore.selectedSlotKey
  if (slotStore.selectedCheck.ok && !takenKeys.value.has(key)) selected.value = [key]
  activeDate.value = selected.value.length ? slotStore.selectedDate : ''
  rangeMode.value = false
  bulkMsg.value = ''
}, { immediate: true })

const slipPreview = ref('')
const slipData = ref(null)
const compressing = ref(false)
const submitting = ref(false)
const validationError = ref('')

const customer = ref({
  name: '',
  phone: '',
  citizenId: '',
  shopName: '',
  goodsType: ''
})

watch(() => authStore.currentUser, (user) => {
  if (user) {
    customer.value.name = user.displayName || customer.value.name
    customer.value.phone = user.phone || customer.value.phone
    customer.value.citizenId = user.citizenId || customer.value.citizenId
  } else {
    // logout: ไม่ให้ข้อมูลของผู้ใช้เดิมค้างในฟอร์ม
    customer.value = { name: '', phone: '', citizenId: '', shopName: '', goodsType: '' }
    slipPreview.value = ''
    slipData.value = null
  }
}, { immediate: true })

const stallMetrics = computed(() => {
  return marketStore.getStallMetrics(props.stall)
})

async function handleFileUpload(e) {
  const input = e.target
  const file = input.files[0]
  input.value = '' // เลือกไฟล์เดิมซ้ำได้
  if (!file) return
  validationError.value = ''
  compressing.value = true
  try {
    const slip = await compressSlipImage(file)
    slipData.value = slip
    slipPreview.value = slip.dataUrl
  } catch (err) {
    console.error('Compress slip error:', err)
    slipData.value = null
    slipPreview.value = ''
    validationError.value = err.message || 'อ่านรูปสลิปไม่ได้ กรุณาลองรูปอื่น'
  } finally {
    compressing.value = false
  }
}

async function submitBooking() {
  validationError.value = ''

  // ยังไม่มีเบอร์ในโปรไฟล์ ต้องกรอกก่อน ยังไม่สร้าง booking
  if (authStore.needsPhone) {
    emit('need-profile')
    return
  }

  if (!customer.value.name || customer.value.name.trim().length < 2) {
    validationError.value = 'กรุณาระบุชื่อ-นามสกุล ผู้จองให้ถูกต้อง'
    return
  }

  if (!/^0[0-9]{9}$/.test(customer.value.phone)) {
    validationError.value = 'กรุณาระบุเบอร์โทรศัพท์ 10 หลัก (ขึ้นต้นด้วย 0)'
    return
  }

  if (!/^[0-9]{13}$/.test(customer.value.citizenId)) {
    validationError.value = 'กรุณาระบุเลขบัตรประชาชน 13 หลักเป็นตัวเลขเท่านั้น'
    return
  }

  if (!customer.value.goodsType) {
    validationError.value = 'กรุณาระบุประเภทสินค้าที่จะนำมาขาย'
    return
  }

  if (!selected.value.length) {
    validationError.value = 'กรุณาเลือกวันที่ต้องการจองอย่างน้อย 1 ช่อง'
    return
  }

  if (!props.stall) return

  // กันแผงรอสลิปค้างได้ไม่เกิน 2 รายการพร้อมกัน (ตรวจที่ client; rules ตรวจนับจำนวนไม่ได้)
  if (!slipData.value) {
    const holding = myBookings.items.filter(b => b.status === 'awaiting_slip' && !isHoldExpired(b, serverNow())).length
    if (holding >= MAX_HOLDS) {
      validationError.value = `มีการจองที่กันแผงรอชำระเงินอยู่ ${holding} รายการแล้ว (สูงสุด ${MAX_HOLDS}) กรุณาแนบสลิปหรือยกเลิกรายการเดิมก่อน หรือแนบสลิปตอนจองเลย`
      return
    }
  }

  // ตรวจปฏิทินอีกรอบตอนกดส่ง (เวลาอาจผ่านเส้นปิดรับจองระหว่างที่เปิดหน้าไว้)
  for (const key of selected.value) {
    const check = canBookSlot(slotStore.settings, key)
    if (!check.ok) {
      validationError.value = `${formatSlotLabel(slotStore.settings, key)}: ${check.reason}`
      return
    }
  }

  const bookingPayload = {
    ...customer.value,
    tenantId: authStore.currentUser?.uid,
    slots: selected.value,
    slip: slipData.value,
    holdMinutes: holdMinutes.value
  }

  submitting.value = true
  try {
    const before = Date.now()
    const { bookingId, status } = await slotStore.book(props.stall.id, bookingPayload)
    if (status === 'awaiting_slip') {
      // เทียบเวลา server กับนาฬิกาเครื่อง เพื่อให้นับถอยหลังตรงกับที่ rules ตัดสิน
      const after = Date.now()
      const saved = await fetchBooking(bookingId)
      if (saved?.holdStartedAt?.toMillis) calibrateServerClock(saved.holdStartedAt.toMillis(), before, after)
      marketStore.showNotification(`กันแผง ${props.stall.stallNo} ไว้ให้ ${holdMinutes.value} นาที กรุณาแนบสลิปที่ "การจองของฉัน"`, 'success')
      emit('open-my-bookings')
    } else {
      marketStore.showNotification(`ส่งการจองแผง ${props.stall.stallNo} (${selected.value.length} ช่อง) แล้ว รอผู้ดูแลตรวจสลิป`, 'success')
    }
    slipPreview.value = ''
    slipData.value = null
    selected.value = []
    emit('close')
  } catch (err) {
    console.error('Booking Error:', err)
    if (err.code === 'slot-taken') {
      const labels = err.slots.map(k => formatSlotLabel(slotStore.settings, k)).join(', ')
      validationError.value = `มีคนจองช่องนี้ไปแล้ว: ${labels} กรุณาเลือกใหม่`
      selected.value = selected.value.filter(k => !err.slots.includes(k))
      await loadLocks()
    } else if (err.code === 'permission-denied') {
      validationError.value = 'จองไม่ได้ (อาจมีคนจองช่องนี้ไปก่อน, ช่องนี้เพิ่งหมดเวลากันแผงและยังถูกกันอยู่อีกไม่กี่วินาที, หรือระบบเพิ่งอัปเดต) ลองใหม่อีกครั้งในอีกสักครู่ หากยังไม่ได้ให้รีเฟรชหน้า'
      await loadLocks()
    } else {
      validationError.value = err.message || 'เกิดข้อผิดพลาดในการจองแผงค้า'
    }
  } finally {
    submitting.value = false
  }
}
</script>
