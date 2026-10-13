<template>
  <BaseModal
    :open="open"
    :title="step === 1 ? 'ลบการจองนี้ถาวร?' : 'ยืนยันครั้งสุดท้าย'"
    size="sm"
    mobile-mode="sheet"
    :dismissible="!busy"
    @close="close"
  >
    <!-- ขั้นที่ 1: สรุปสิ่งที่จะลบ + เหตุผล -->
    <div v-if="step === 1" class="space-y-3 text-sm">
      <dl class="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
        <div class="row"><dt>แผง</dt><dd>{{ booking.stallNo || '-' }}</dd></div>
        <div class="row"><dt>ผู้เช่า</dt><dd>{{ booking.customerName || '-' }}</dd></div>
        <div class="row"><dt>ยอดเงิน</dt><dd>฿{{ booking.amountDue ?? '-' }}</dd></div>
        <div class="row"><dt>จองเมื่อ</dt><dd>{{ createdText }}</dd></div>
        <div class="row"><dt>สถานะ</dt><dd>{{ statusText }}</dd></div>
      </dl>
      <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-300">
        <li>ลบข้อมูลการจองและรูปสลิป กู้คืนไม่ได้ (ยังมีบันทึกใน "บันทึกการทำงาน")</li>
        <li>แผงจะกลับเป็นว่าง ถ้าแผงยังเป็นของการจองนี้</li>
        <li>ไม่แจ้งผู้เช่า ถ้าต้องการแจ้งให้ใช้ "ยกเลิกการจอง" แทน</li>
        <li v-if="booking.receiptNo" class="text-rose-700 dark:text-rose-300 font-semibold">เลขใบเสร็จ {{ booking.receiptNo }} จะหายจากรายงานรายได้</li>
      </ul>
      <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300">
        เหตุผลการลบ (จำเป็น)
        <textarea
          v-model="reason"
          rows="2"
          :maxlength="DELETE_REASON_MAX"
          placeholder="เช่น รายการทดสอบ / จองซ้ำ"
          class="mt-1 block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-base text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-500"
        ></textarea>
      </label>
    </div>

    <!-- ขั้นที่ 2: พิมพ์รหัสแผง -->
    <div v-else class="space-y-3 text-sm">
      <p>
        พิมพ์รหัสแผง <span class="font-mono font-bold text-rose-700 dark:text-rose-300">{{ code }}</span> เพื่อยืนยันการลบ
      </p>
      <input
        v-model="typed"
        type="text"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        inputmode="text"
        :disabled="busy"
        class="block w-full min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-base font-mono text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-rose-500"
        @keydown.enter.prevent
      />
      <p v-if="error" class="text-xs text-rose-600 dark:text-rose-400 font-medium">{{ error }}</p>
    </div>

    <template #footer>
      <template v-if="step === 1">
        <button type="button" class="btn bg-emerald-600 text-white" @click="close">ยกเลิก</button>
        <button type="button" class="btn bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700" :disabled="reason.trim().length < DELETE_REASON_MIN" @click="goStep2">ถัดไป</button>
      </template>
      <template v-else>
        <button type="button" class="btn bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" :disabled="busy" @click="step = 1">กลับ</button>
        <button type="button" class="btn bg-rose-600 text-white" :disabled="!canConfirm" @click="confirm">
          {{ busy ? 'กำลังลบ...' : countdown > 0 ? `ลบถาวร (${countdown})` : 'ลบถาวร' }}
        </button>
      </template>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import BaseModal from '../../ui/BaseModal.vue'
import { useSlipReviewStore } from '../../../stores/slipReviewStore'
import { useAuthStore } from '../../../stores/authStore'
import { useMarketStore } from '../../../stores/marketStore'
import { formatThaiDateTime } from '../../../utils/date'
import { STATUS_LABEL_TH } from '../../../constants/auditActions'
import { confirmCodeMatches, deleteConfirmCode, DELETE_REASON_MIN, DELETE_REASON_MAX } from '../../../utils/bookingDelete'

const props = defineProps({
  open: Boolean,
  booking: { type: Object, required: true }
})
const emit = defineEmits(['close', 'deleted'])

const store = useSlipReviewStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()

const step = ref(1)
const reason = ref('')
const typed = ref('')
const busy = ref(false)
const error = ref('')
const countdown = ref(0)
let timer = null

const code = computed(() => deleteConfirmCode(props.booking))
const statusText = computed(() => STATUS_LABEL_TH[props.booking.status] || props.booking.status || 'อนุมัติแล้ว')
const createdText = computed(() => {
  const t = props.booking.createdAt
  return t?.toDate ? formatThaiDateTime(t.toDate()) : '-'
})
const canConfirm = computed(() => !busy.value && countdown.value === 0 && confirmCodeMatches(typed.value, code.value))

function stopTimer() {
  if (timer) clearInterval(timer)
  timer = null
}

// ปุ่มลบถาวรกดได้หลังเปิดขั้นที่ 2 แล้ว 3 วินาที (กันกดรัว)
function goStep2() {
  if (reason.value.trim().length < DELETE_REASON_MIN) return
  step.value = 2
  typed.value = ''
  error.value = ''
  countdown.value = 3
  stopTimer()
  timer = setInterval(() => {
    countdown.value = Math.max(0, countdown.value - 1)
    if (countdown.value === 0) stopTimer()
  }, 1000)
}

function reset() {
  stopTimer()
  step.value = 1
  reason.value = ''
  typed.value = ''
  error.value = ''
  countdown.value = 0
  busy.value = false
}

// เปิดใหม่ทุกครั้งเริ่มที่ขั้นที่ 1 สะอาด; เปลี่ยนรายการระหว่างเปิดอยู่ก็รีเซ็ต
watch(() => [props.open, props.booking.id], reset)
onBeforeUnmount(stopTimer)

function close() {
  if (busy.value) return
  emit('close')
}

function describeError(err) {
  if (err?.code === 'permission-denied') return 'คุณไม่มีสิทธิ์ลบการจองนี้ (หรือ rules ยังไม่ได้ deploy)'
  if (err?.code === 'unavailable') return 'เชื่อมต่อไม่ได้ ยังไม่ได้ลบ ลองใหม่อีกครั้ง'
  if (err?.code === 'cannot-delete') return 'การจองนี้เปลี่ยนสถานะแล้ว กรุณาปิดแล้วเปิดใหม่'
  return err?.message || 'ลบไม่สำเร็จ กรุณาลองใหม่'
}

async function confirm() {
  if (!canConfirm.value) return
  busy.value = true
  error.value = ''
  try {
    const { stallNo } = await store.deleteBooking(props.booking, { reason: reason.value, confirmStallCode: typed.value }, authStore.auditActor)
    marketStore.showNotification(`ลบการจองแผง ${stallNo || code.value} แล้ว`, 'success')
    busy.value = false
    emit('deleted')
  } catch (err) {
    console.error('Delete booking permanently error:', err)
    error.value = describeError(err)
    busy.value = false
  }
}
</script>

<style scoped>
.row { display: flex; justify-content: space-between; gap: 12px; padding: 8px 12px; font-size: 13px; }
.row dt { color: rgb(100 116 139); flex-shrink: 0; }
.row dd { text-align: right; font-weight: 600; min-width: 0; overflow-wrap: anywhere; }
.btn { min-height: 44px; padding: 0 16px; border-radius: 14px; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; }
.btn:disabled { opacity: 0.5; }
</style>
