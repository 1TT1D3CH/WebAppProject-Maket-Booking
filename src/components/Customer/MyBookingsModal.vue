<template>
  <BaseModal :open="isOpen" title="การจองของฉัน" size="lg" mobile-mode="fullscreen" @close="$emit('close')">
    <div class="space-y-3 text-sm">
      <div v-if="store.error" class="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-3 text-rose-700 dark:text-rose-300">
        {{ store.error }}
        <button type="button" class="block mt-2 underline font-semibold min-h-[36px]" @click="store.start(authStore.currentUser?.uid)">ลองใหม่</button>
      </div>
      <div v-else-if="!store.loaded" class="py-10 text-center text-slate-500">กำลังโหลดรายการจอง...</div>
      <div v-else-if="!store.items.length" class="py-10 text-center text-slate-500 dark:text-slate-400">ยังไม่มีรายการจอง</div>

      <article
        v-for="b in store.items" :key="b.id"
        class="rounded-2xl border p-4 space-y-3"
        :class="b.status === 'needs_slip'
          ? 'border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/20'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="font-bold text-slate-900 dark:text-white">แผง {{ b.stallNo || '-' }}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">{{ zoneOf(b) }} · จองเมื่อ {{ timeOf(b) }}</div>
          </div>
          <div class="text-right shrink-0">
            <div class="font-mono font-bold text-indigo-700 dark:text-indigo-300">฿{{ b.amountDue ?? '-' }}</div>
            <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold" :class="info(b).badge">{{ info(b).label }}</span>
          </div>
        </div>

        <p v-if="b.statusReason && (b.status === 'needs_slip' || b.status === 'rejected')"
           class="rounded-xl px-3 py-2 text-xs font-medium"
           :class="b.status === 'rejected' ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'">
          เหตุผล: {{ b.statusReason }}
        </p>
        <p v-if="b.status === 'approved'" class="text-xs text-slate-500 dark:text-slate-400">ต้องการยกเลิก กรุณาติดต่อผู้ดูแลตลาด</p>

        <!-- สลิปของตัวเอง -->
        <div v-if="opened === b.id">
          <div v-if="slipState.loading" class="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500">กำลังโหลดรูปสลิป...</div>
          <div v-else-if="slipState.error" class="text-xs text-rose-600 dark:text-rose-400">{{ slipState.error }}</div>
          <img v-else-if="slipState.dataUrl" :src="slipState.dataUrl" alt="สลิปของฉัน" class="max-h-80 w-full object-contain rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div v-else class="text-xs text-slate-500">ไม่พบรูปสลิป</div>
        </div>

        <!-- ส่งสลิปใหม่ -->
        <div v-if="b.status === 'needs_slip'" class="space-y-2">
          <div v-if="resub.id === b.id && resub.preview" class="flex items-center gap-3">
            <img :src="resub.preview" alt="สลิปใหม่" class="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-700" />
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">แนบสลิปใหม่แล้ว</span>
          </div>
          <input :ref="el => setFileInput(b.id, el)" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onPickFile($event, b)" />
          <div class="flex flex-col sm:flex-row gap-2">
            <button type="button" class="btn bg-white dark:bg-slate-900 border border-amber-400 text-amber-800 dark:text-amber-300 flex-1" :disabled="busyId === b.id || compressing" @click="fileInputs[b.id]?.click()">
              {{ compressing && resub.id === b.id ? 'กำลังย่อรูป...' : resub.id === b.id && resub.preview ? 'เปลี่ยนรูปสลิป' : 'เลือกรูปสลิปใหม่' }}
            </button>
            <button v-if="resub.id === b.id && resub.slip" type="button" class="btn bg-indigo-600 text-white flex-1" :disabled="busyId === b.id" @click="submitResub(b)">
              {{ busyId === b.id ? 'กำลังส่ง...' : 'ส่งสลิปใหม่' }}
            </button>
          </div>
        </div>

        <p v-if="errors[b.id]" class="text-xs text-rose-600 dark:text-rose-400 font-medium">{{ errors[b.id] }}</p>

        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" @click="toggleSlip(b)">
            {{ opened === b.id ? 'ซ่อนสลิป' : 'ดูสลิป' }}
          </button>
          <template v-if="canCancel(b)">
            <button v-if="confirming !== b.id" type="button" class="btn-sm bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300" @click="confirming = b.id">ยกเลิกการจอง</button>
            <template v-else>
              <span class="text-xs font-semibold text-rose-700 dark:text-rose-300 self-center">ยืนยันยกเลิกและปล่อยแผงนี้?</span>
              <button type="button" class="btn-sm bg-rose-600 text-white" :disabled="busyId === b.id" @click="doCancel(b)">{{ busyId === b.id ? 'กำลังยกเลิก...' : 'ยืนยัน' }}</button>
              <button type="button" class="btn-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" @click="confirming = ''">ไม่ยกเลิก</button>
            </template>
          </template>
        </div>
      </article>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
import { useMyBookingsStore } from '../../stores/myBookingsStore'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { compressSlipImage } from '../../utils/compressImage'
import { formatThaiDateTime } from '../../utils/date'

const props = defineProps({ isOpen: Boolean })
defineEmits(['close'])

const store = useMyBookingsStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()

const opened = ref('')
const slipState = reactive({ loading: false, error: '', dataUrl: '' })
const resub = reactive({ id: '', slip: null, preview: '' })
const compressing = ref(false)
const busyId = ref('')
const confirming = ref('')
const errors = reactive({})
const fileInputs = {}
const setFileInput = (id, el) => { if (el) fileInputs[id] = el }

// การจองเก่าก่อนมีระบบตรวจสลิป ไม่มี status = ยืนยันแล้ว
const INFO = {
  pending: { label: 'รอตรวจสลิป', badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
  needs_slip: { label: 'ขอสลิปใหม่', badge: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300' },
  approved: { label: 'อนุมัติแล้ว', badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
  rejected: { label: 'ถูกปฏิเสธ', badge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' },
  cancelled: { label: 'ยกเลิกแล้ว', badge: 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
  confirmed: { label: 'ยืนยันแล้ว', badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' }
}
const info = (b) => INFO[b.status || 'confirmed'] || INFO.confirmed
const canCancel = (b) => b.status === 'pending' || b.status === 'needs_slip'
const timeOf = (b) => (b.createdAt?.toDate ? formatThaiDateTime(b.createdAt.toDate()) : '-')
const zoneOf = (b) => {
  const stall = marketStore.stalls.find(s => s.id === b.stallId)
  return (stall && marketStore.getZoneById(stall.zoneId)?.name) || '-'
}

function errText(err) {
  if (err?.code === 'permission-denied') return 'ทำรายการไม่ได้ (สถานะอาจเปลี่ยนไปแล้ว) กรุณาลองใหม่'
  if (err?.code === 'unavailable') return 'เชื่อมต่อไม่ได้ ตรวจสอบอินเทอร์เน็ตแล้วลองใหม่'
  return err?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่'
}

async function toggleSlip(b) {
  if (opened.value === b.id) { opened.value = ''; return }
  opened.value = b.id
  Object.assign(slipState, { loading: true, error: '', dataUrl: '' })
  try {
    const slip = await store.loadSlip(b.id)
    if (opened.value === b.id) slipState.dataUrl = slip?.dataUrl || ''
  } catch (err) {
    console.error('Load my slip error:', err)
    if (opened.value === b.id) slipState.error = errText(err)
  } finally {
    if (opened.value === b.id) slipState.loading = false
  }
}

async function onPickFile(e, b) {
  const input = e.target
  const file = input.files[0]
  input.value = ''
  if (!file) return
  errors[b.id] = ''
  compressing.value = true
  resub.id = b.id
  try {
    const slip = await compressSlipImage(file)
    resub.slip = slip
    resub.preview = slip.dataUrl
  } catch (err) {
    console.error('Compress resubmit slip error:', err)
    resub.slip = null
    resub.preview = ''
    errors[b.id] = err.message
  } finally {
    compressing.value = false
  }
}

async function submitResub(b) {
  if (busyId.value || !resub.slip) return
  busyId.value = b.id
  errors[b.id] = ''
  try {
    await store.resubmit(b, resub.slip, authStore.currentUser?.uid)
    marketStore.showNotification('ส่งสลิปใหม่แล้ว รอผู้ดูแลตรวจสอบ', 'success')
    Object.assign(resub, { id: '', slip: null, preview: '' })
    if (opened.value === b.id) opened.value = ''
  } catch (err) {
    console.error('Resubmit slip error:', err)
    errors[b.id] = errText(err)
  } finally {
    busyId.value = ''
  }
}

async function doCancel(b) {
  if (busyId.value) return
  busyId.value = b.id
  errors[b.id] = ''
  try {
    await store.cancel(b)
    marketStore.showNotification(`ยกเลิกการจองแผง ${b.stallNo} แล้ว`, 'success')
    confirming.value = ''
  } catch (err) {
    console.error('Cancel booking error:', err)
    errors[b.id] = errText(err)
  } finally {
    busyId.value = ''
  }
}

watch(() => props.isOpen, (open) => {
  if (!open) {
    opened.value = ''
    confirming.value = ''
    Object.assign(resub, { id: '', slip: null, preview: '' })
  }
})
</script>

<style scoped>
.btn { min-height: 48px; padding: 0 16px; border-radius: 14px; font-weight: 700; font-size: 14px; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; }
.btn-sm { min-height: 44px; padding: 0 14px; border-radius: 12px; font-weight: 600; font-size: 13px; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; }
.btn:disabled, .btn-sm:disabled { opacity: 0.5; }
</style>
