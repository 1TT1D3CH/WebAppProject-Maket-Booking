<template>
  <BaseModal :open="isOpen" title="การจองของฉัน" size="lg" mobile-mode="fullscreen" @close="$emit('close')">
    <div class="space-y-3 text-sm">
      <div v-if="store.error" class="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-3 text-rose-700 dark:text-rose-300">
        {{ store.error }}
        <button type="button" class="block mt-2 underline font-semibold min-h-[36px]" @click="store.start(authStore.currentUser?.uid)">ลองใหม่</button>
      </div>
      <div v-else-if="!store.loaded" class="py-10 text-center text-slate-500">กำลังโหลดรายการจอง...</div>
      <template v-else>
        <!-- แท็บ -->
        <div class="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 sticky top-0 z-10">
          <button
            v-for="t in tabs" :key="t.key" type="button"
            class="min-h-[44px] rounded-xl text-[11px] sm:text-xs font-semibold transition leading-tight px-1"
            :class="tab === t.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'"
            @click="tab = t.key"
          >{{ t.label }}<span v-if="t.count" class="ml-0.5 font-mono">({{ t.count }})</span></button>
        </div>

        <div v-if="!store.items.length" class="py-10 text-center text-slate-500 dark:text-slate-400">ยังไม่มีรายการจอง</div>
        <div v-else-if="!list.length" class="py-10 text-center text-slate-500 dark:text-slate-400">ไม่มีรายการในแท็บนี้</div>

        <article
          v-for="b in list" :key="b.id"
          class="rounded-2xl border p-4 space-y-3"
          :class="needsAction(b)
            ? 'border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/20'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="font-bold text-slate-900 dark:text-white">แผง {{ b.stallNo || '-' }}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">{{ zoneOf(b) }} · จองเมื่อ {{ timeOf(b) }}</div>
              <div v-if="b.slots?.length" class="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">วันที่จอง: {{ slotText(b) }}</div>
              <div v-else class="text-[11px] text-slate-400 mt-0.5">การจองแบบเดิม (ไม่ระบุวัน)</div>
              <div v-if="b.receiptNo" class="text-[11px] text-slate-400 font-mono mt-0.5">ใบเสร็จ {{ b.receiptNo }}</div>
            </div>
            <div class="text-right shrink-0">
              <div class="font-mono font-bold text-indigo-700 dark:text-indigo-300">{{ money(b.amountDue) }}</div>
              <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold" :class="info(b).badge">{{ info(b).label }}</span>
            </div>
          </div>

          <!-- นับถอยหลัง -->
          <div v-if="holdLeft(b) !== null && !expiredNow(b)"
               class="rounded-xl px-3 py-2 text-xs font-bold flex items-center justify-between gap-2"
               :class="levelClass(holdLeft(b))">
            <span>{{ b.status === 'awaiting_slip' ? 'ชำระเงินและแนบสลิปภายใน' : 'ส่งสลิปใหม่ภายใน' }}</span>
            <span class="font-mono text-base">{{ formatCountdown(holdLeft(b)) }}</span>
          </div>
          <p v-else-if="expiredNow(b)" class="rounded-xl px-3 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            หมดเวลาแล้ว ช่องนี้ถูกปล่อยให้คนอื่นจองได้ (กำลังอัปเดตสถานะ) หากต้องการจอง กรุณาจองใหม่
          </p>

          <p v-if="b.statusReason && ['needs_slip', 'rejected', 'cancelled'].includes(b.status)"
             class="rounded-xl px-3 py-2 text-xs font-medium"
             :class="b.status === 'needs_slip' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'">
            เหตุผล: {{ b.statusReason }}
          </p>
          <p v-if="b.status === 'approved' && b.statusReason" class="rounded-xl px-3 py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            ผู้ดูแลไม่อนุมัติคำขอยกเลิกครั้งก่อน: {{ b.statusReason }}
          </p>
          <p v-if="b.status === 'cancel_requested'" class="rounded-xl px-3 py-2 text-xs font-medium bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200">
            รอผู้ดูแลอนุมัติการยกเลิก · เหตุผลที่คุณแจ้ง: {{ b.cancelRequest?.reason }} (แผงยังเป็นของคุณจนกว่าจะอนุมัติ)
          </p>

          <!-- สถานะเงินคืน -->
          <div v-if="b.refund" class="rounded-xl px-3 py-2 text-xs font-semibold"
               :class="b.refund.status === 'refunded' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'">
            <template v-if="b.refund.status === 'refunded'">คืนเงินแล้ว {{ money(b.refund.amount) }} · {{ refundMethod(b.refund.method) }} · {{ b.refund.refundedDate ? formatThaiDate(b.refund.refundedDate) : '' }}</template>
            <template v-else-if="b.refund.status === 'pending'">รอผู้ดูแลโอนเงินคืน {{ b.refund.amount !== undefined ? money(b.refund.amount) : '(ผู้ดูแลจะตรวจสอบยอด)' }}</template>
            <template v-else>ไม่มียอดคืนตามนโยบาย</template>
            <div v-if="b.refund.policyText" class="font-normal mt-0.5 opacity-80">{{ b.refund.policyText }}</div>
          </div>

          <!-- สลิปของตัวเอง -->
          <div v-if="opened === b.id">
            <div v-if="slipState.loading" class="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500">กำลังโหลดรูปสลิป...</div>
            <div v-else-if="slipState.error" class="text-xs text-rose-600 dark:text-rose-400">{{ slipState.error }}</div>
            <img v-else-if="slipState.dataUrl" :src="slipState.dataUrl" alt="สลิป" class="max-h-80 w-full object-contain rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div v-else class="text-xs text-slate-500">ไม่พบรูปสลิป</div>
          </div>

          <!-- แนบสลิป / ส่งสลิปใหม่ -->
          <div v-if="canPay(b)" class="space-y-2">
            <div v-if="resub.id === b.id && resub.preview" class="flex items-center gap-3">
              <img :src="resub.preview" alt="สลิปที่จะส่ง" class="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-700" />
              <span class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">แนบสลิปแล้ว</span>
            </div>
            <input :ref="el => setFileInput(b.id, el)" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onPickFile($event, b)" />
            <div class="flex flex-col sm:flex-row gap-2">
              <button type="button" class="btn bg-white dark:bg-slate-900 border border-amber-400 text-amber-800 dark:text-amber-300 flex-1" :disabled="busyId === b.id || compressing" @click="fileInputs[b.id]?.click()">
                {{ compressing && resub.id === b.id ? 'กำลังย่อรูป...' : resub.id === b.id && resub.preview ? 'เปลี่ยนรูปสลิป' : b.status === 'awaiting_slip' ? 'แนบสลิปโอนเงิน' : 'เลือกรูปสลิปใหม่' }}
              </button>
              <button v-if="resub.id === b.id && resub.slip" type="button" class="btn bg-indigo-600 text-white flex-1" :disabled="busyId === b.id" @click="submitSlip(b)">
                {{ busyId === b.id ? 'กำลังส่ง...' : 'ส่งสลิป' }}
              </button>
            </div>
          </div>

          <!-- ฟอร์มขอยกเลิก -->
          <div v-if="cancelForm.id === b.id" class="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 p-3 space-y-2">
            <div class="text-xs font-bold text-rose-800 dark:text-rose-200">ขอยกเลิกการจอง</div>
            <div class="text-xs text-slate-700 dark:text-slate-200">
              ยอดที่คาดว่าจะได้คืนตามนโยบาย: <strong class="font-mono">{{ money(suggestFor(b).amount) }}</strong>
              <div class="text-[11px] text-slate-500">{{ suggestFor(b).reasonText }} (ผู้ดูแลเป็นผู้ยืนยันยอดสุดท้าย)</div>
            </div>
            <textarea v-model="cancelForm.reason" rows="2" maxlength="300" placeholder="เหตุผลที่ขอยกเลิก (จำเป็น)" class="field"></textarea>
            <div class="text-[11px] font-semibold text-slate-500">บัญชีรับเงินคืน (ไม่บังคับ แต่ช่วยให้โอนคืนได้เร็ว)</div>
            <input v-model="cancelForm.accountName" type="text" maxlength="100" placeholder="ชื่อบัญชี" class="field" />
            <div class="grid grid-cols-2 gap-2">
              <input v-model="cancelForm.bank" type="text" maxlength="60" placeholder="ธนาคาร / PromptPay" class="field" />
              <input v-model="cancelForm.accountNo" type="text" inputmode="numeric" maxlength="40" placeholder="เลขบัญชี / เบอร์" class="field" />
            </div>
            <div class="flex gap-2">
              <button type="button" class="btn bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" @click="cancelForm.id = ''">ปิด</button>
              <button type="button" class="btn flex-1 bg-rose-600 text-white" :disabled="busyId === b.id || !cancelForm.reason.trim()" @click="submitCancelRequest(b)">
                {{ busyId === b.id ? 'กำลังส่ง...' : 'ส่งคำขอยกเลิก' }}
              </button>
            </div>
          </div>

          <p v-if="errors[b.id]" class="text-xs text-rose-600 dark:text-rose-400 font-medium">{{ errors[b.id] }}</p>

          <!-- ไทม์ไลน์ -->
          <ol v-if="timelineOpen === b.id" class="text-xs space-y-1 border-l-2 border-slate-200 dark:border-slate-700 pl-3">
            <li v-for="(ev, i) in timeline(b)" :key="i"><span class="font-semibold text-slate-700 dark:text-slate-200">{{ ev.label }}</span> <span class="text-slate-500">{{ ev.time }}</span></li>
          </ol>

          <div class="flex flex-wrap gap-2">
            <button v-if="b.slipHash || b.status !== 'awaiting_slip'" type="button" class="btn-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" @click="toggleSlip(b)">
              {{ opened === b.id ? 'ซ่อนสลิป' : 'ดูสลิป' }}
            </button>
            <button type="button" class="btn-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" @click="timelineOpen = timelineOpen === b.id ? '' : b.id">
              {{ timelineOpen === b.id ? 'ซ่อนประวัติ' : 'ประวัติสถานะ' }}
            </button>
            <button v-if="b.refund?.status === 'refunded'" type="button" class="btn-sm bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300" @click="toggleRefundSlip(b)">
              {{ refundSlipOpen === b.id ? 'ซ่อนสลิปคืนเงิน' : 'ดูสลิปคืนเงิน' }}
            </button>
            <button v-if="hasReceipt(b)" type="button" class="btn-sm bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300" @click="openReceipt(b)">ใบเสร็จ</button>
            <button v-if="b.stallId && ['approved', 'cancelled', 'expired', 'rejected', 'confirmed'].includes(b.status || 'confirmed')" type="button" class="btn-sm bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300" @click="$emit('rebook', b.stallId)">จองแผงนี้อีกครั้ง</button>

            <template v-if="canCancel(b)">
              <button v-if="confirming !== b.id" type="button" class="btn-sm bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300" @click="confirming = b.id">ยกเลิกการจอง</button>
              <template v-else>
                <span class="text-xs font-semibold text-rose-700 dark:text-rose-300 self-center">ยืนยันยกเลิกและปล่อยแผงนี้?</span>
                <button type="button" class="btn-sm bg-rose-600 text-white" :disabled="busyId === b.id" @click="doCancel(b)">{{ busyId === b.id ? 'กำลังยกเลิก...' : 'ยืนยัน' }}</button>
                <button type="button" class="btn-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" @click="confirming = ''">ไม่ยกเลิก</button>
              </template>
            </template>
            <template v-if="b.status === 'approved'">
              <button v-if="policy.allowTenantRequest" type="button" class="btn-sm bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300" @click="openCancelForm(b)">ขอยกเลิก</button>
              <span v-else class="text-xs text-slate-500 self-center">ต้องการยกเลิก กรุณาติดต่อผู้ดูแลตลาด</span>
            </template>
            <button v-if="b.status === 'cancel_requested'" type="button" class="btn-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" :disabled="busyId === b.id" @click="doWithdraw(b)">ถอนคำขอยกเลิก</button>
          </div>

          <!-- สลิปคืนเงิน -->
          <div v-if="refundSlipOpen === b.id">
            <div v-if="refundSlipState.loading" class="h-24 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500">กำลังโหลด...</div>
            <img v-else-if="refundSlipState.dataUrl" :src="refundSlipState.dataUrl" alt="สลิปคืนเงิน" class="max-h-80 w-full object-contain rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div v-else class="text-xs text-slate-500">{{ refundSlipState.error || 'ผู้ดูแลไม่ได้แนบสลิปคืนเงิน' }}</div>
          </div>
        </article>

        <button v-if="store.items.length >= store.pageSize" type="button" class="w-full min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold" @click="store.loadMore()">
          แสดง {{ store.items.length }} รายการล่าสุด · โหลดเพิ่ม
        </button>
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
import { useMyBookingsStore } from '../../stores/myBookingsStore'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { useSlotStore } from '../../stores/slotStore'
import { useReceiptStore } from '../../stores/receiptStore'
import { compressSlipImage } from '../../utils/compressImage'
import { formatThaiDateTime, formatThaiDate, todayBangkok } from '../../utils/date'
import { formatSlotsSummary } from '../../utils/marketCalendar'
import { formatCountdown, countdownLevel, remainingMs, isHoldExpired, HOLD_STATUSES } from '../../utils/holdTimer'
import { suggestRefund } from '../../utils/refundPolicy'
import { formatBaht } from '../../utils/receipt'
import { useNow } from '../../composables/useNow'

const props = defineProps({ isOpen: Boolean })
defineEmits(['close', 'rebook'])

const store = useMyBookingsStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()
const slotStore = useSlotStore()
const receiptStore = useReceiptStore()

const slotText = (b) => formatSlotsSummary(slotStore.settings, b.slots)
const policy = computed(() => slotStore.settings.cancelPolicy)
const money = (n) => (n === undefined || n === null ? '-' : formatBaht(n))
const refundMethod = (m) => ({ transfer: 'โอนเงิน', promptpay: 'PromptPay', cash: 'เงินสด' }[m] || '')

// ─── นาฬิกา (นับถอยหลัง) ────────────────────────────────────────────────────
const { nowMs, start: startClock, stop: stopClock, tick } = useNow(1000)
const holdLeft = (b) => (HOLD_STATUSES.includes(b.status) ? remainingMs(b.holdStartedAt, b.holdMinutes, nowMs.value) : null)
const expiredNow = (b) => isHoldExpired(b, nowMs.value)
const levelClass = (ms) => ({
  ok: 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200',
  warn: 'bg-orange-200 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200',
  danger: 'bg-rose-200 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200',
  expired: 'bg-slate-200 text-slate-700'
}[countdownLevel(ms)])

// ─── แท็บ ───────────────────────────────────────────────────────────────────
const tab = ref('todo')
const today = computed(() => todayBangkok(new Date(nowMs.value)))
const isTodo = (b) => HOLD_STATUSES.includes(b.status) && !expiredNow(b)
const isClosed = (b) => ['cancelled', 'rejected', 'expired'].includes(b.status) || (HOLD_STATUSES.includes(b.status) && expiredNow(b))
const isPast = (b) => !isClosed(b) && !isTodo(b) && b.lastDate && b.lastDate < today.value
const groups = computed(() => {
  const g = { todo: [], upcoming: [], past: [], closed: [] }
  for (const b of store.items) {
    if (isClosed(b)) g.closed.push(b)
    else if (isTodo(b)) g.todo.push(b)
    else if (isPast(b)) g.past.push(b)
    else g.upcoming.push(b)
  }
  return g
})
const tabs = computed(() => [
  { key: 'todo', label: 'ต้องทำ', count: groups.value.todo.length },
  { key: 'upcoming', label: 'กำลังจะถึง', count: groups.value.upcoming.length },
  { key: 'past', label: 'ที่ผ่านมา', count: 0 },
  { key: 'closed', label: 'ยกเลิก/หมดเวลา', count: 0 }
])
const list = computed(() => groups.value[tab.value])
const needsAction = (b) => isTodo(b) || b.status === 'cancel_requested'

// ─── สถานะ ──────────────────────────────────────────────────────────────────
const INFO = {
  awaiting_slip: { label: 'รอชำระเงิน', badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
  pending: { label: 'รอตรวจสลิป', badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
  needs_slip: { label: 'ขอสลิปใหม่', badge: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300' },
  approved: { label: 'อนุมัติแล้ว', badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
  cancel_requested: { label: 'รอผู้ดูแลอนุมัติการยกเลิก', badge: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
  rejected: { label: 'ถูกปฏิเสธ', badge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' },
  cancelled: { label: 'ยกเลิกแล้ว', badge: 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
  expired: { label: 'หมดเวลา', badge: 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
  confirmed: { label: 'ยืนยันแล้ว', badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' }
}
// การจองเก่าก่อนมีระบบตรวจสลิป ไม่มี status = ยืนยันแล้ว
const info = (b) => (expiredNow(b) ? INFO.expired : INFO[b.status || 'confirmed'] || INFO.confirmed)
const canPay = (b) => isTodo(b)
const canCancel = (b) => (b.status === 'pending' || isTodo(b))
const hasReceipt = (b) => (b.status === 'approved' || b.status === 'confirmed' || b.status === 'cancel_requested' || !b.status || (b.status === 'cancelled' && b.wasApproved))

const tsOf = (t) => (t?.toDate ? formatThaiDateTime(t.toDate()) : '')
const timeOf = (b) => tsOf(b.createdAt) || '-'
const zoneOf = (b) => {
  const stall = marketStore.pub.stalls.find(s => s.id === b.stallId)
  return (stall && marketStore.pubZoneById(stall.zoneId)?.name) || '-'
}
const STATUS_EVENT = { approved: 'อนุมัติ', rejected: 'ปฏิเสธ', needs_slip: 'ขอสลิปใหม่', cancelled: 'ยกเลิก', expired: 'หมดเวลา', approved_again: 'อนุมัติ' }
function timeline(b) {
  const ev = []
  if (b.createdAt) ev.push({ t: b.createdAt, label: b.status === 'awaiting_slip' || b.holdStartedAt ? 'จอง (กันแผงรอชำระเงิน)' : 'จอง', time: tsOf(b.createdAt) })
  if (b.slipUploadedAt) ev.push({ t: b.slipUploadedAt, label: 'ส่งสลิป', time: tsOf(b.slipUploadedAt) })
  if (b.decidedAt) ev.push({ t: b.decidedAt, label: `ผู้ดูแล${STATUS_EVENT[b.status] || 'ตัดสิน'}`, time: tsOf(b.decidedAt) })
  if (b.cancelRequest?.requestedAt) ev.push({ t: b.cancelRequest.requestedAt, label: 'ขอยกเลิก', time: tsOf(b.cancelRequest.requestedAt) })
  if (b.refund?.refundedAt) ev.push({ t: b.refund.refundedAt, label: 'คืนเงิน', time: tsOf(b.refund.refundedAt) })
  if (b.receiptIssuedAt) ev.push({ t: b.receiptIssuedAt, label: `ออกใบเสร็จ ${b.receiptNo || ''}`, time: tsOf(b.receiptIssuedAt) })
  if (b.updatedAt && ['expired', 'cancelled', 'rejected'].includes(b.status) && !b.decidedAt) ev.push({ t: b.updatedAt, label: STATUS_EVENT[b.status], time: tsOf(b.updatedAt) })
  return ev.sort((a, c) => (a.t.toMillis?.() ?? 0) - (c.t.toMillis?.() ?? 0))
}

// ─── ฟอร์ม/สถานะหน้าจอ ──────────────────────────────────────────────────────
const opened = ref('')
const timelineOpen = ref('')
const refundSlipOpen = ref('')
const slipState = reactive({ loading: false, error: '', dataUrl: '' })
const refundSlipState = reactive({ loading: false, error: '', dataUrl: '' })
const resub = reactive({ id: '', slip: null, preview: '' })
const cancelForm = reactive({ id: '', reason: '', accountName: '', bank: '', accountNo: '' })
const compressing = ref(false)
const busyId = ref('')
const confirming = ref('')
const errors = reactive({})
const fileInputs = {}
const setFileInput = (id, el) => { if (el) fileInputs[id] = el }

const suggestFor = (b) => suggestRefund(b, policy.value, new Date())

function errText(err) {
  const code = err?.code ? ` [${err.code}]` : ''
  if (err?.code === 'hold-expired') return 'หมดเวลาแล้ว ช่องนี้ถูกปล่อยให้คนอื่นจองได้ กรุณาจองใหม่'
  if (err?.code === 'hold-lost') return 'ช่องของการจองนี้ถูกจองโดยคนอื่นไปแล้ว กรุณาจองใหม่'
  if (err?.code === 'permission-denied') return `ไม่มีสิทธิ์ทำรายการนี้ (สถานะอาจเปลี่ยนไปแล้ว หรือหมดเวลาแล้ว) กรุณารีเฟรชหน้าแล้วลองใหม่ หากยังไม่ได้ให้แจ้งผู้ดูแล${code}`
  if (err?.code === 'unavailable') return 'เชื่อมต่อไม่ได้ ตรวจสอบอินเทอร์เน็ตแล้วลองใหม่'
  return (err?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่') + code
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

async function toggleRefundSlip(b) {
  if (refundSlipOpen.value === b.id) { refundSlipOpen.value = ''; return }
  refundSlipOpen.value = b.id
  Object.assign(refundSlipState, { loading: true, error: '', dataUrl: '' })
  try {
    const slip = await store.loadRefundSlip(b.id)
    if (refundSlipOpen.value === b.id) refundSlipState.dataUrl = slip?.dataUrl || ''
  } catch (err) {
    console.error('Load refund slip error:', err)
    if (refundSlipOpen.value === b.id) refundSlipState.error = errText(err)
  } finally {
    if (refundSlipOpen.value === b.id) refundSlipState.loading = false
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
    console.error('Compress slip error:', err)
    resub.slip = null
    resub.preview = ''
    errors[b.id] = err.message
  } finally {
    compressing.value = false
  }
}

async function submitSlip(b) {
  if (busyId.value || !resub.slip) return
  busyId.value = b.id
  errors[b.id] = ''
  try {
    const uid = authStore.currentUser?.uid
    if (b.status === 'awaiting_slip') await store.paySlip(b, resub.slip, uid)
    else await store.resubmit(b, resub.slip, uid)
    marketStore.showNotification('ส่งสลิปแล้ว รอผู้ดูแลตรวจสอบ', 'success')
    Object.assign(resub, { id: '', slip: null, preview: '' })
    if (opened.value === b.id) opened.value = ''
  } catch (err) {
    console.error('Submit slip error:', err)
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

function openCancelForm(b) {
  Object.assign(cancelForm, { id: b.id, reason: '', accountName: '', bank: '', accountNo: '' })
  errors[b.id] = ''
}

async function submitCancelRequest(b) {
  if (busyId.value) return
  busyId.value = b.id
  errors[b.id] = ''
  try {
    await store.requestCancel(b, cancelForm.reason, {
      accountName: cancelForm.accountName, bank: cancelForm.bank, accountNo: cancelForm.accountNo
    })
    marketStore.showNotification('ส่งคำขอยกเลิกแล้ว รอผู้ดูแลอนุมัติ', 'success')
    cancelForm.id = ''
  } catch (err) {
    console.error('Request cancel error:', err)
    errors[b.id] = errText(err)
  } finally {
    busyId.value = ''
  }
}

async function doWithdraw(b) {
  if (busyId.value) return
  busyId.value = b.id
  errors[b.id] = ''
  try {
    await store.withdrawCancel(b)
    marketStore.showNotification('ถอนคำขอยกเลิกแล้ว การจองกลับเป็นอนุมัติแล้ว', 'success')
  } catch (err) {
    console.error('Withdraw cancel error:', err)
    errors[b.id] = errText(err)
  } finally {
    busyId.value = ''
  }
}

function openReceipt(b) {
  receiptStore.open(b.id)
}

watch(() => props.isOpen, (open) => {
  if (open) {
    startClock()
    tick()
    // เปิดแท็บ "ต้องทำ" ถ้ามีงานค้าง ไม่งั้นแท็บ "กำลังจะถึง"
    tab.value = groups.value.todo.length ? 'todo' : 'upcoming'
    store.sweepExpired()
  } else {
    stopClock()
    opened.value = ''
    confirming.value = ''
    cancelForm.id = ''
    refundSlipOpen.value = ''
    Object.assign(resub, { id: '', slip: null, preview: '' })
  }
}, { immediate: true })

// หมดเวลาระหว่างเปิดหน้านี้อยู่ -> ตั้งสถานะ "หมดเวลา" (ทีละไม่เกิน 20 รายการ)
watch(() => store.items.filter(b => isHoldExpired(b, nowMs.value)).length, (n) => { if (n) store.sweepExpired() })
</script>

<style scoped>
.btn { min-height: 48px; padding: 0 16px; border-radius: 14px; font-weight: 700; font-size: 14px; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; }
.btn-sm { min-height: 44px; padding: 0 14px; border-radius: 12px; font-weight: 600; font-size: 13px; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; }
.btn:disabled, .btn-sm:disabled { opacity: 0.5; }
.field { display: block; width: 100%; min-height: 44px; padding: 8px 12px; font-size: 16px; border-radius: 12px; border: 1px solid rgb(203 213 225); background: white; color: rgb(15 23 42); }
:global(.dark) .field { background: rgb(15 23 42); border-color: rgb(51 65 85); color: rgb(241 245 249); }
</style>
