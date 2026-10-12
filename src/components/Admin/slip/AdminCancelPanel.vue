<template>
  <section class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 space-y-3 text-sm">
    <!-- ใบเสร็จ -->
    <div v-if="hasReceipt" class="flex items-center justify-between gap-2">
      <span class="text-xs text-slate-500 dark:text-slate-400">ใบเสร็จ {{ booking.receiptNo || '(ยังไม่ออกเลข)' }}</span>
      <button type="button" class="min-h-[44px] px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold" @click="receiptStore.open(booking.id)">เปิดใบเสร็จ</button>
    </div>

    <!-- คำขอยกเลิกจากผู้เช่า -->
    <template v-if="booking.status === 'cancel_requested'">
      <div class="rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 p-3 text-xs text-sky-900 dark:text-sky-200">
        <div class="font-bold mb-1">ผู้เช่าขอยกเลิกการจอง</div>
        <div>เหตุผล: {{ booking.cancelRequest?.reason }}</div>
      </div>
      <div v-if="account" class="rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs">
        <div class="font-bold mb-1">บัญชีรับเงินคืน</div>
        <div>{{ account.accountName }} · {{ account.bank }} · <span class="font-mono">{{ account.accountNo }}</span></div>
      </div>
      <div v-if="accountError" class="text-xs text-rose-600">{{ accountError }}</div>

      <template v-if="mode !== 'deny'">
        <RefundFields v-model:amount="refundAmount" v-model:adjust="adjustReason" :suggestion="suggestion" :paid="booking.amountDue" />
        <div class="flex gap-2">
          <button type="button" class="btn bg-slate-100 dark:bg-slate-800" :disabled="busy" @click="mode = 'deny'">ไม่อนุมัติ</button>
          <button type="button" class="btn flex-1 bg-emerald-600 text-white" :disabled="busy || !amountOk" @click="approve">{{ busy ? 'กำลังบันทึก...' : 'อนุมัติการยกเลิก' }}</button>
        </div>
      </template>
      <template v-else>
        <textarea v-model="reason" rows="2" maxlength="300" placeholder="เหตุผลที่ไม่อนุมัติ (ผู้เช่าจะเห็น)" class="field"></textarea>
        <div class="flex gap-2">
          <button type="button" class="btn bg-slate-100 dark:bg-slate-800" :disabled="busy" @click="mode = ''">กลับ</button>
          <button type="button" class="btn flex-1 bg-rose-600 text-white" :disabled="busy || !reason.trim()" @click="deny">{{ busy ? 'กำลังบันทึก...' : 'ยืนยันไม่อนุมัติ' }}</button>
        </div>
      </template>
    </template>

    <!-- ผู้ดูแลยกเลิกเอง (การจองที่อนุมัติแล้ว) -->
    <template v-else-if="booking.status === 'approved'">
      <button v-if="mode !== 'direct'" type="button" class="btn w-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800" @click="mode = 'direct'">ยกเลิกการจองนี้ (ผู้ดูแล)</button>
      <template v-else>
        <textarea v-model="reason" rows="2" maxlength="300" placeholder="เหตุผลที่ยกเลิก เช่น ตลาดปิดฉุกเฉิน (จำเป็น)" class="field"></textarea>
        <RefundFields v-model:amount="refundAmount" v-model:adjust="adjustReason" :suggestion="suggestion" :paid="booking.amountDue" />
        <div class="flex gap-2">
          <button type="button" class="btn bg-slate-100 dark:bg-slate-800" :disabled="busy" @click="mode = ''">กลับ</button>
          <button type="button" class="btn flex-1 bg-rose-600 text-white" :disabled="busy || !reason.trim() || !amountOk" @click="direct">{{ busy ? 'กำลังบันทึก...' : 'ยืนยันยกเลิก' }}</button>
        </div>
      </template>
    </template>

    <!-- ยกเลิกแล้ว: รอคืนเงิน / คืนแล้ว -->
    <template v-else-if="booking.status === 'cancelled' && booking.refund">
      <div class="text-xs rounded-xl p-3 border" :class="booking.refund.status === 'refunded' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'">
        <template v-if="booking.refund.status === 'refunded'">คืนเงินแล้ว {{ money(booking.refund.amount) }} · {{ methodText(booking.refund.method) }} · {{ booking.refund.refundedDate }}<div v-if="booking.refund.note">หมายเหตุ: {{ booking.refund.note }}</div></template>
        <template v-else-if="booking.refund.status === 'pending'">
          ต้องคืนเงิน {{ booking.refund.amount !== undefined ? money(booking.refund.amount) : '(ยังไม่กำหนดยอด)' }}
          <div v-if="booking.refund.policyText" class="opacity-80">{{ booking.refund.policyText }}</div>
          <div v-if="booking.refund.adjustReason">เหตุผลที่ปรับยอด: {{ booking.refund.adjustReason }}</div>
        </template>
        <template v-else>ไม่มียอดคืนตามนโยบาย</template>
      </div>

      <template v-if="booking.refund.status === 'pending'">
        <div v-if="account" class="rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs">
          <div class="font-bold mb-1">โอนคืนที่</div>
          <div>{{ account.accountName }} · {{ account.bank }} · <span class="font-mono">{{ account.accountNo }}</span></div>
        </div>
        <div class="text-[11px] text-slate-500">ระบบไม่โอนเงินให้ โอนคืนนอกระบบแล้วบันทึกที่นี่</div>
        <div class="grid grid-cols-2 gap-2">
          <label class="lbl">ยอดที่คืนจริง (บาท)
            <input v-model.number="rf.amount" type="number" min="0" step="0.01" class="field" />
          </label>
          <label class="lbl">วิธีคืน
            <select v-model="rf.method" class="field">
              <option value="transfer">โอนเงิน</option>
              <option value="promptpay">PromptPay</option>
              <option value="cash">เงินสด</option>
            </select>
          </label>
        </div>
        <label class="lbl">วันที่คืน
          <input v-model="rf.date" type="date" class="field" />
        </label>
        <label class="lbl">หมายเหตุ (ไม่บังคับ)
          <input v-model="rf.note" type="text" maxlength="300" class="field" />
        </label>
        <div>
          <input ref="slipInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="pickSlip" />
          <div class="flex items-center gap-2">
            <button type="button" class="btn bg-slate-100 dark:bg-slate-800" :disabled="compressing" @click="slipInput.click()">{{ compressing ? 'กำลังย่อรูป...' : rf.slip ? 'เปลี่ยนสลิปคืนเงิน' : 'แนบสลิปคืนเงิน (ไม่บังคับ)' }}</button>
            <img v-if="rf.slip" :src="rf.slip.dataUrl" alt="สลิปคืนเงิน" class="h-12 w-12 object-cover rounded-lg border" />
          </div>
        </div>
        <button type="button" class="btn w-full bg-emerald-600 text-white" :disabled="busy || !refundOk" @click="record">{{ busy ? 'กำลังบันทึก...' : 'บันทึกว่าคืนเงินแล้ว' }}</button>
      </template>
    </template>

    <p v-if="error" class="text-xs text-rose-600 dark:text-rose-400 font-medium">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import RefundFields from './RefundFields.vue'
import { useSlipReviewStore } from '../../../stores/slipReviewStore'
import { useAuthStore } from '../../../stores/authStore'
import { useMarketStore } from '../../../stores/marketStore'
import { useSlotStore } from '../../../stores/slotStore'
import { useReceiptStore } from '../../../stores/receiptStore'
import { suggestRefund } from '../../../utils/refundPolicy'
import { compressSlipImage } from '../../../utils/compressImage'
import { formatBaht } from '../../../utils/receipt'
import { todayBangkok } from '../../../utils/date'

const props = defineProps({ booking: { type: Object, required: true } })
const emit = defineEmits(['done'])

const store = useSlipReviewStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()
const slotStore = useSlotStore()
const receiptStore = useReceiptStore()

const money = (n) => formatBaht(n)
const methodText = (m) => ({ transfer: 'โอนเงิน', promptpay: 'PromptPay', cash: 'เงินสด' }[m] || '')
const mode = ref('')
const busy = ref(false)
const error = ref('')
const reason = ref('')
const account = ref(null)
const accountError = ref('')
const slipInput = ref(null)
const compressing = ref(false)

const hasReceipt = computed(() => ['approved', 'cancel_requested'].includes(props.booking.status) || (props.booking.status === 'cancelled' && props.booking.wasApproved))
const suggestion = computed(() => suggestRefund(props.booking, slotStore.settings.cancelPolicy, new Date()))
const refundAmount = ref(suggestion.value.amount)
const adjustReason = ref('')
const amountOk = computed(() => {
  const a = Number(refundAmount.value)
  if (!Number.isFinite(a) || a < 0 || a > Number(props.booking.amountDue || 0)) return false
  return a === suggestion.value.amount || adjustReason.value.trim().length > 0
})

const rf = reactive({ amount: props.booking.refund?.amount ?? 0, method: 'transfer', date: todayBangkok(), note: '', slip: null })
const refundOk = computed(() => {
  const a = Number(rf.amount)
  return Number.isFinite(a) && a >= 0 && a <= Number(props.booking.amountDue || 0) && !!rf.date && !compressing.value
})

async function loadAccount() {
  account.value = null
  accountError.value = ''
  if (!['cancel_requested', 'cancelled'].includes(props.booking.status)) return
  if (props.booking.status === 'cancelled' && props.booking.refund?.status !== 'pending') return
  try {
    account.value = await store.loadRefundAccount(props.booking.id)
  } catch (err) {
    console.error('Load refund account error:', err)
    accountError.value = 'โหลดบัญชีรับเงินคืนไม่สำเร็จ'
  }
}
onMounted(loadAccount)
watch(() => props.booking.status, () => { mode.value = ''; loadAccount() })

function fail(err) {
  console.error('Cancel/refund action error:', err)
  error.value = err?.code === 'permission-denied'
    ? 'ไม่มีสิทธิ์ทำรายการนี้ (สถานะอาจเปลี่ยนไปแล้ว หรือ rules ยังไม่ได้ deploy)'
    : err?.code === 'already-decided' ? 'รายการนี้ถูกตัดสินไปแล้ว กรุณารีเฟรช' : (err?.message || 'ทำรายการไม่สำเร็จ')
}

async function run(fn, okMsg) {
  if (busy.value) return
  busy.value = true
  error.value = ''
  try {
    await fn()
    marketStore.showNotification(okMsg, 'success')
    emit('done')
  } catch (err) {
    fail(err)
  } finally {
    busy.value = false
  }
}

const approve = () => run(
  () => store.decideCancel(props.booking, 'approve', { refundAmount: refundAmount.value, adjustReason: adjustReason.value }, authStore.auditActor),
  'อนุมัติการยกเลิกแล้ว'
)
const deny = () => run(() => store.decideCancel(props.booking, 'deny', { reason: reason.value }, authStore.auditActor), 'ไม่อนุมัติการยกเลิกแล้ว')
const direct = () => run(
  () => store.decideCancel(props.booking, 'direct', { reason: reason.value, refundAmount: refundAmount.value, adjustReason: adjustReason.value }, authStore.auditActor),
  'ยกเลิกการจองแล้ว'
)

async function pickSlip(e) {
  const input = e.target
  const file = input.files[0]
  input.value = ''
  if (!file) return
  compressing.value = true
  try {
    rf.slip = await compressSlipImage(file)
  } catch (err) {
    error.value = err.message
  } finally {
    compressing.value = false
  }
}

const record = () => run(
  () => store.recordRefund(props.booking, { amount: rf.amount, method: rf.method, date: rf.date, note: rf.note, slip: rf.slip }, authStore.auditActor),
  'บันทึกการคืนเงินแล้ว'
)
</script>

<style scoped>
.btn { min-height: 48px; padding: 0 16px; border-radius: 14px; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; }
.btn:disabled { opacity: 0.5; }
.lbl { display: block; font-size: 11px; font-weight: 600; color: rgb(100 116 139); }
.field { display: block; width: 100%; min-height: 44px; margin-top: 2px; padding: 8px 12px; font-size: 16px; border-radius: 12px; border: 1px solid rgb(203 213 225); background: white; color: rgb(15 23 42); }
:global(.dark) .field { background: rgb(15 23 42); border-color: rgb(51 65 85); color: rgb(241 245 249); }
</style>
