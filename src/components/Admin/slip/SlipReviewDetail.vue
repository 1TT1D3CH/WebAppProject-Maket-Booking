<template>
  <div class="flex flex-col h-full min-h-0 bg-slate-50 dark:bg-slate-950">
    <!-- แถบหัว -->
    <header class="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pt-[max(0.5rem,env(safe-area-inset-top))] lg:pt-2">
      <button v-if="showBack" type="button" class="icon-btn" aria-label="กลับ" @click="$emit('back')"><ArrowLeft class="w-5 h-5" /></button>
      <div class="min-w-0 flex-1">
        <div class="font-bold text-sm text-slate-900 dark:text-white truncate">แผง {{ booking.stallNo || '-' }} · {{ booking.customerName }}</div>
        <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">{{ statusLabel }} · จองเมื่อ {{ createdText }}</div>
      </div>
      <button type="button" class="icon-btn" aria-label="รายการก่อนหน้า" :disabled="!hasPrev" @click="$emit('prev')"><ChevronLeft class="w-5 h-5" /></button>
      <button type="button" class="icon-btn" aria-label="รายการถัดไป" :disabled="!hasNext" @click="$emit('next')"><ChevronRight class="w-5 h-5" /></button>
    </header>

    <div class="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden lg:flex">
      <!-- รูปสลิป -->
      <div class="h-[55dvh] lg:h-full lg:flex-1 p-3 shrink-0">
        <div v-if="slipLoading" class="h-full rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm text-slate-500">กำลังโหลดรูปสลิป...</div>
        <div v-else-if="slipError" class="h-full rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex flex-col items-center justify-center gap-2 p-4 text-center text-sm text-rose-700 dark:text-rose-300">
          <span>{{ slipError }}</span>
          <button type="button" class="px-4 min-h-[44px] rounded-xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 font-semibold" @click="loadSlip">ลองอีกครั้ง</button>
        </div>
        <div v-else-if="!slip" class="h-full rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm text-slate-500">ไม่พบรูปสลิปของรายการนี้</div>
        <SlipImageViewer v-else :src="slip.dataUrl" @fullscreen="fullscreen = true" />
      </div>

      <!-- ข้อมูลประกอบการตัดสิน -->
      <div class="lg:w-[360px] lg:shrink-0 lg:overflow-y-auto px-3 pb-4 space-y-3">
        <div class="rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 p-4 text-center">
          <div class="text-xs font-semibold text-indigo-700 dark:text-indigo-300">ยอดที่ต้องได้รับ</div>
          <div class="text-3xl font-bold font-mono text-indigo-900 dark:text-white">฿{{ booking.amountDue ?? '-' }}</div>
        </div>

        <div v-if="duplicates.length" class="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700 p-3 text-xs text-rose-800 dark:text-rose-200">
          <div class="flex items-center gap-1.5 font-bold mb-1"><AlertTriangle class="w-4 h-4" /> พบสลิปไฟล์เดียวกันในการจองอื่น</div>
          <button v-for="d in duplicates" :key="d.id" type="button" class="block underline min-h-[32px] text-left" @click="$emit('open', d.id)">
            แผง {{ d.stallNo || '-' }} · {{ d.customerName }} ({{ d.status }})
          </button>
        </div>

        <dl class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 text-sm">
          <div class="row"><dt>แผง / โซน</dt><dd>{{ booking.stallNo || '-' }} · {{ zoneName }}</dd></div>
          <div class="row"><dt>ผู้เช่า</dt><dd>{{ booking.customerName }}</dd></div>
          <div class="row"><dt>เบอร์โทร</dt><dd><a :href="`tel:${booking.customerPhone}`" class="text-indigo-600 dark:text-indigo-400 underline font-mono">{{ booking.customerPhone }}</a></dd></div>
          <div class="row"><dt>สินค้า</dt><dd>{{ booking.goodsType || '-' }}</dd></div>
          <div class="row"><dt>เวลาที่จอง</dt><dd>{{ createdText }}</dd></div>
          <div v-if="booking.statusReason" class="row"><dt>เหตุผล</dt><dd>{{ booking.statusReason }}</dd></div>
        </dl>

        <div v-if="canDecide" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 space-y-1">
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">ตรวจด้วยตา (ไม่บันทึก)</div>
          <label v-for="(label, i) in checklist" :key="i" class="flex items-center gap-3 min-h-[44px] text-sm cursor-pointer">
            <input v-model="checks[i]" type="checkbox" class="w-5 h-5 accent-indigo-600" />
            <span>{{ label }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- ปุ่มตัดสิน ติดล่าง -->
    <footer v-if="canDecide" class="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div v-if="reasonMode" class="mb-3 space-y-2">
        <div class="text-xs font-bold text-slate-700 dark:text-slate-200">{{ reasonMode === 'rejected' ? 'เหตุผลที่ปฏิเสธ' : 'เหตุผลที่ขอสลิปใหม่' }}</div>
        <div class="flex flex-wrap gap-2">
          <button v-for="q in quickReasons" :key="q" type="button" class="chip" @click="reason = q">{{ q }}</button>
        </div>
        <textarea v-model="reason" rows="2" maxlength="300" placeholder="ระบุเหตุผล (ผู้เช่าจะเห็นข้อความนี้)" class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
        <div class="flex gap-2">
          <button type="button" class="btn bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" :disabled="busy" @click="closeReason">ยกเลิก</button>
          <button type="button" class="btn flex-1 text-white" :class="reasonMode === 'rejected' ? 'bg-rose-600' : 'bg-amber-600'" :disabled="busy || !reason.trim()" @click="submit(reasonMode)">
            {{ busy ? 'กำลังบันทึก...' : reasonMode === 'rejected' ? 'ยืนยันปฏิเสธ' : 'ยืนยันขอสลิปใหม่' }}
          </button>
        </div>
      </div>
      <div v-else class="flex gap-2">
        <button type="button" class="btn bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800" :disabled="busy" @click="openReason('rejected')">ปฏิเสธ</button>
        <button v-if="booking.status === 'pending'" type="button" class="btn bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700" :disabled="busy" @click="openReason('needs_slip')">
          ขอสลิปใหม่<kbd class="kbd">R</kbd>
        </button>
        <button v-if="booking.status === 'pending'" type="button" class="btn flex-1 bg-emerald-600 text-white" :disabled="busy" @click="submit('approved')">
          {{ busy ? 'กำลังบันทึก...' : 'อนุมัติ' }}<kbd class="kbd">A</kbd>
        </button>
      </div>
      <p v-if="actionError" class="mt-2 text-xs text-rose-600 dark:text-rose-400 font-medium">{{ actionError }}</p>
    </footer>

    <SlipImageViewer v-if="fullscreen && slip" :src="slip.dataUrl" fullscreen @close="fullscreen = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-vue-next'
import SlipImageViewer from './SlipImageViewer.vue'
import { useSlipReviewStore } from '../../../stores/slipReviewStore'
import { useMarketStore } from '../../../stores/marketStore'
import { useAuthStore } from '../../../stores/authStore'
import { useBreakpoint } from '../../../composables/useBreakpoint'
import { formatThaiDateTime } from '../../../utils/date'
import { isShortcutBlocked } from '../../../utils/keyboard'

const props = defineProps({
  booking: { type: Object, required: true },
  hasPrev: Boolean,
  hasNext: Boolean,
  showBack: Boolean,
  nextId: String
})
const emit = defineEmits(['back', 'prev', 'next', 'open', 'decided'])

const store = useSlipReviewStore()
const marketStore = useMarketStore()
const authStore = useAuthStore()
const { isDesktop } = useBreakpoint()

const slip = ref(null)
const slipLoading = ref(false)
const slipError = ref('')
const duplicates = ref([])
const fullscreen = ref(false)
const reasonMode = ref('')
const reason = ref('')
const busy = ref(false)
const actionError = ref('')

const checklist = ['ยอดเงินตรงกับที่ต้องได้รับ', 'ชื่อผู้รับตรงกับของตลาด', 'เวลาโอนอยู่หลังเวลาที่จอง', 'ไม่ใช่สลิปซ้ำ']
const checks = ref([false, false, false, false])
const quickReasons = computed(() => reasonMode.value === 'rejected'
  ? ['ยอดไม่ตรงและไม่ได้รับเงิน', 'ไม่ใช่สลิปที่ถูกต้อง', 'สลิปซ้ำกับการจองอื่น']
  : ['ยอดไม่ตรง', 'รูปไม่ชัด', 'ไม่ใช่สลิปของการจองนี้'])

const STATUS_LABEL = { pending: 'รอตรวจสลิป', needs_slip: 'รอผู้เช่าส่งสลิปใหม่', approved: 'อนุมัติแล้ว', rejected: 'ปฏิเสธแล้ว' }
const statusLabel = computed(() => STATUS_LABEL[props.booking.status] || props.booking.status)
const canDecide = computed(() => props.booking.status === 'pending' || props.booking.status === 'needs_slip')
const createdText = computed(() => {
  const t = props.booking.createdAt
  return t?.toDate ? formatThaiDateTime(t.toDate()) : '-'
})
const zoneName = computed(() => {
  const stall = marketStore.stalls.find(s => s.id === props.booking.stallId)
  return (stall && marketStore.getZoneById(stall.zoneId)?.name) || '-'
})

function describeError(err) {
  if (err?.code === 'permission-denied') return 'ไม่มีสิทธิ์อ่านรูปสลิป'
  if (err?.code === 'unavailable') return 'เชื่อมต่อไม่ได้ ตรวจสอบอินเทอร์เน็ตแล้วลองใหม่'
  return err?.message || 'โหลดรูปสลิปไม่สำเร็จ'
}

async function loadSlip() {
  const id = props.booking.id
  slipLoading.value = true
  slipError.value = ''
  slip.value = null
  try {
    const result = await store.loadSlip(id)
    if (id === props.booking.id) slip.value = result
  } catch (err) {
    console.error('Load slip error:', err)
    if (id === props.booking.id) slipError.value = describeError(err)
  } finally {
    if (id === props.booking.id) slipLoading.value = false
  }
  if (props.nextId) store.prefetch(props.nextId)
}

async function loadDuplicates() {
  const id = props.booking.id
  duplicates.value = []
  try {
    const found = await store.duplicatesOf(props.booking)
    if (id === props.booking.id) duplicates.value = found
  } catch (err) {
    console.warn('Duplicate slip check notice:', err.message) // เตือนอย่างเดียว ไม่ขวางการตรวจ
  }
}

// เปลี่ยนรายการ หรือผู้เช่าส่งสลิปใหม่ระหว่างที่เปิดดู -> โหลดรูปใหม่เอง
watch(() => [props.booking.id, props.booking.slipHash, props.booking.slipUploadedAt?.toMillis?.() ?? 0], (now, before) => {
  // รอบแรก (immediate) before เป็น undefined ต้องไม่ destructure ตรง ๆ
  const id = now[0]
  const prevId = before ? before[0] : undefined
  if (id !== prevId) {
    closeReason()
    actionError.value = ''
    checks.value = [false, false, false, false]
    fullscreen.value = false
  }
  loadSlip()
  loadDuplicates()
}, { immediate: true })

function openReason(mode) { reasonMode.value = mode; reason.value = ''; actionError.value = '' }
function closeReason() { reasonMode.value = ''; reason.value = '' }

async function submit(decision) {
  if (busy.value) return
  busy.value = true
  actionError.value = ''
  try {
    await store.decide(props.booking, decision, reason.value, authStore.currentUser?.uid)
    marketStore.showNotification(
      decision === 'approved' ? `อนุมัติการจองแผง ${props.booking.stallNo} แล้ว`
        : decision === 'rejected' ? `ปฏิเสธการจองแผง ${props.booking.stallNo} แล้ว` : 'ส่งคำขอสลิปใหม่แล้ว',
      'success'
    )
    closeReason()
    emit('decided')
  } catch (err) {
    console.error('Decide booking error:', err)
    if (err.code === 'already-decided') {
      actionError.value = 'รายการนี้ถูกตรวจไปแล้วโดยผู้ดูแลคนอื่น'
    } else if (err.code === 'permission-denied') {
      actionError.value = 'ไม่มีสิทธิ์ตัดสินรายการนี้ (หรือ rules ยังไม่ได้ deploy)'
    } else {
      actionError.value = err.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่'
    }
  } finally {
    busy.value = false
  }
}

// คีย์ลัดบนคอม: A อนุมัติ, R ขอสลิปใหม่, J/K ถัดไป/ก่อนหน้า (ไม่ทำงานตอนพิมพ์ในช่องข้อความ)
function onKey(e) {
  if (!isDesktop.value || isShortcutBlocked(e) || fullscreen.value) return
  const k = e.key.toLowerCase()
  if (k === 'j' && props.hasNext) emit('next')
  else if (k === 'k' && props.hasPrev) emit('prev')
  else if (k === 'a' && props.booking.status === 'pending' && !reasonMode.value) submit('approved')
  else if (k === 'r' && props.booking.status === 'pending' && !reasonMode.value) { e.preventDefault(); openReason('needs_slip') }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.icon-btn { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; color: rgb(71 85 105); }
.icon-btn:disabled { opacity: 0.35; }
.icon-btn:active:not(:disabled) { background: rgb(226 232 240); }
.row { display: flex; justify-content: space-between; gap: 12px; padding: 10px 14px; }
.row dt { color: rgb(100 116 139); flex-shrink: 0; }
.row dd { text-align: right; font-weight: 600; min-width: 0; overflow-wrap: anywhere; }
.btn { min-height: 48px; padding: 0 16px; border-radius: 14px; font-weight: 700; font-size: 14px; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
.btn:disabled { opacity: 0.5; }
.chip { min-height: 36px; padding: 0 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: rgb(241 245 249); color: rgb(51 65 85); }
.kbd { display: none; font-size: 10px; padding: 1px 5px; border-radius: 4px; background: rgb(0 0 0 / 0.12); }
@media (min-width: 1024px) and (pointer: fine) { .kbd { display: inline-block; } }
</style>
