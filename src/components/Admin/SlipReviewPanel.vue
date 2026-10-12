<template>
  <section class="absolute inset-0 flex bg-slate-50 dark:bg-slate-950">
    <!-- รายการ -->
    <div
      v-show="isDesktop || !selected"
      class="flex flex-col min-h-0 w-full lg:w-[340px] lg:shrink-0 lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
    >
      <div class="shrink-0 p-3 border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-base font-bold text-slate-900 dark:text-white">ตรวจสลิปโอนเงิน</h2>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">รอตรวจ {{ store.pendingCount }} · ขอยกเลิก {{ store.cancelReq.length }} · รอคืนเงิน {{ store.refundPending.length }}</span>
        </div>
        <button
          v-if="tab === 'decided' && store.rejectedList.length"
          type="button" :disabled="clearing"
          class="w-full mb-2 min-h-[44px] rounded-xl border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold"
          @click="clearRejected"
        >{{ clearing ? 'กำลังลบ...' : `ล้างรายการที่ปฏิเสธทั้งหมด (${store.rejectedList.length})` }}</button>
        <div class="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950">
          <button
            v-for="t in tabs" :key="t.key" type="button"
            class="min-h-[44px] rounded-xl text-xs font-semibold transition"
            :class="tab === t.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'"
            @click="tab = t.key"
          >{{ t.label }}<span v-if="t.count" class="ml-1 font-mono">({{ t.count }})</span></button>
        </div>
      </div>

      <div class="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div v-if="store.error" class="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-3 text-sm text-rose-700 dark:text-rose-300">
          {{ store.error }}
          <button type="button" class="block mt-2 underline font-semibold min-h-[36px]" @click="store.start()">ลองใหม่</button>
        </div>
        <div v-else-if="store.isLoading" class="py-10 text-center text-sm text-slate-500">กำลังโหลดรายการ...</div>
        <div v-else-if="!list.length" class="py-10 text-center text-sm text-slate-500">{{ emptyText }}</div>

        <button
          v-for="b in list" :key="b.id" type="button"
          class="w-full text-left rounded-2xl border p-3 transition min-h-[64px]"
          :class="b.id === selected?.id
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'"
          @click="store.selectedId = b.id"
        >
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-sm text-slate-900 dark:text-white truncate">แผง {{ b.stallNo || '-' }} · {{ b.customerName }}</span>
            <span class="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-300 shrink-0">฿{{ b.amountDue ?? '-' }}</span>
          </div>
          <div class="flex items-center justify-between gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span class="truncate">{{ b.customerPhone }} · {{ timeOf(b) }}<template v-if="b.slots?.length"> · วันที่ {{ slotText(b) }}</template></span>
            <span class="shrink-0 font-semibold" :class="badgeClass(b.status)">{{ STATUS_LABEL[b.status] || b.status }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- รายละเอียด -->
    <div v-if="selected" class="flex-1 min-w-0 min-h-0">
      <SlipReviewDetail
        :key="selected.id"
        :booking="selected"
        :has-prev="index > 0"
        :has-next="index < list.length - 1"
        :next-id="list[index + 1]?.id"
        :show-back="!isDesktop"
        @back="store.selectedId = null"
        @prev="go(-1)"
        @next="go(1)"
        @open="openOther"
        @decided="afterDecided"
      />
    </div>
    <div v-else-if="isDesktop" class="flex-1 flex items-center justify-center text-sm text-slate-400">เลือกรายการทางซ้ายเพื่อตรวจสลิป</div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SlipReviewDetail from './slip/SlipReviewDetail.vue'
import { useSlipReviewStore } from '../../stores/slipReviewStore'
import { useBreakpoint } from '../../composables/useBreakpoint'
import { formatThaiDateTime } from '../../utils/date'
import { useSlotStore } from '../../stores/slotStore'
import { formatSlotsSummary } from '../../utils/marketCalendar'

const slotStore = useSlotStore()
const slotText = (b) => formatSlotsSummary(slotStore.settings, b.slots)
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'

const store = useSlipReviewStore()
const { isDesktop } = useBreakpoint()

const STATUS_LABEL = {
  pending: 'รอตรวจ', needs_slip: 'ขอสลิปใหม่', approved: 'อนุมัติแล้ว', rejected: 'ปฏิเสธแล้ว',
  awaiting_slip: 'รอชำระเงิน', cancel_requested: 'ขอยกเลิก', cancelled: 'ยกเลิกแล้ว'
}
const tab = ref('pending')
const authStore = useAuthStore()
const marketStore = useMarketStore()
const clearing = ref(false)

// ลบรายการที่ปฏิเสธแล้วทั้งหมดออกจากรายการ (ส่วนที่อนุมัติแล้วไม่ถูกลบ เพราะแผงยังเป็นของผู้เช่า)
async function clearRejected() {
  const items = store.rejectedList
  if (!items.length || clearing.value) return
  if (!window.confirm(`ลบรายการที่ปฏิเสธแล้ว ${items.length} รายการ (รวมรูปสลิป)?
ลบแล้วกู้คืนไม่ได้ แต่ยังมีบันทึกใน "บันทึกการทำงาน"`)) return
  clearing.value = true
  try {
    const n = await store.removeDecided(items, authStore.auditActor)
    marketStore.showNotification(`ลบรายการที่ปฏิเสธแล้ว ${n} รายการ`, 'success')
  } catch (err) {
    console.error('Clear rejected error:', err)
    marketStore.showNotification(err.code === 'permission-denied' ? 'ไม่มีสิทธิ์ลบ (หรือ rules ยังไม่ได้ deploy)' : (err.message || 'ลบไม่สำเร็จ'), 'error')
  } finally {
    clearing.value = false
  }
}

const tabs = computed(() => [
  { key: 'pending', label: 'รอตรวจ', count: store.pending.length },
  { key: 'needsSlip', label: 'ขอสลิปใหม่', count: store.needsSlip.length },
  { key: 'cancelReq', label: 'ขอยกเลิก', count: store.cancelReq.length },
  { key: 'refundPending', label: 'รอคืนเงิน', count: store.refundPending.length },
  { key: 'awaiting', label: 'รอชำระเงิน', count: store.awaiting.length },
  { key: 'decided', label: 'ตัดสินแล้ว', count: 0 }
])
const list = computed(() => store[tab.value])
const emptyText = computed(() => ({
  pending: 'ไม่มีรายการรอตรวจสลิป',
  needsSlip: 'ไม่มีรายการที่รอสลิปใหม่',
  cancelReq: 'ไม่มีคำขอยกเลิก',
  refundPending: 'ไม่มีรายการรอคืนเงิน',
  awaiting: 'ไม่มีการจองที่กันแผงรอผู้เช่าชำระเงิน',
  decided: 'ยังไม่มีรายการที่ตัดสินแล้ว'
}[tab.value]))

// รายการที่เลือก: หาจากรายการทั้งหมด (เปิดจากลิงก์สลิปซ้ำข้ามแท็บได้)
const selected = computed(() => (store.selectedId ? store.byId(store.selectedId) : null))
const index = computed(() => list.value.findIndex(b => b.id === store.selectedId))

// บนคอมให้เลือกรายการแรกอัตโนมัติ เพื่อเห็นรูปทันที
watch([list, isDesktop], () => {
  if (isDesktop.value && !selected.value && list.value.length) store.selectedId = list.value[0].id
}, { immediate: true })
watch(tab, () => {
  if (list.value.some(b => b.id === store.selectedId)) return
  store.selectedId = isDesktop.value && list.value.length ? list.value[0].id : null
})

function go(step) {
  const next = list.value[index.value + step]
  if (next) store.selectedId = next.id
}

// ตัดสินเสร็จ -> ไปรายการถัดไปในแท็บเดียวกัน (รายการเดิมหลุดจากแท็บเองผ่าน realtime)
function afterDecided() {
  const nextItem = list.value[index.value + 1] || list.value[index.value - 1]
  store.selectedId = nextItem && nextItem.id !== selected.value?.id ? nextItem.id : null
}

function openOther(id) {
  const b = store.byId(id)
  if (!b) return
  tab.value = ({ pending: 'pending', needs_slip: 'needsSlip', cancel_requested: 'cancelReq', awaiting_slip: 'awaiting' })[b.status]
    || (b.status === 'cancelled' && b.refund?.status === 'pending' ? 'refundPending' : 'decided')
  store.selectedId = id
}

function timeOf(b) {
  return b.createdAt?.toDate ? formatThaiDateTime(b.createdAt.toDate()) : '-'
}
function badgeClass(status) {
  return {
    pending: 'text-amber-600 dark:text-amber-400',
    needs_slip: 'text-orange-600 dark:text-orange-400',
    approved: 'text-emerald-600 dark:text-emerald-400',
    rejected: 'text-rose-600 dark:text-rose-400',
    cancel_requested: 'text-sky-600 dark:text-sky-400',
    awaiting_slip: 'text-amber-600 dark:text-amber-400'
  }[status] || 'text-slate-500'
}
</script>
