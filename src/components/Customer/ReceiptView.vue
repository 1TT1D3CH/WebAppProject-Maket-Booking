<template>
  <div v-if="receiptStore.bookingId" class="receipt-root fixed inset-0 z-[90] overflow-y-auto bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <!-- แถบปุ่ม (ไม่พิมพ์) -->
    <div class="no-print sticky top-0 z-10 flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-[max(0.5rem,env(safe-area-inset-top))]">
      <button type="button" class="min-h-[44px] px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold" @click="close">← กลับ</button>
      <div class="flex-1 min-w-0 text-sm font-bold truncate">ใบเสร็จรับเงิน {{ booking?.receiptNo || '' }}</div>
      <button v-if="canPrint" type="button" class="min-h-[44px] px-4 rounded-xl bg-indigo-600 text-white text-sm font-bold" @click="print">บันทึกเป็น PDF / พิมพ์</button>
    </div>

    <div class="p-3 sm:p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div v-if="!authStore.isAuthenticated" class="no-print max-w-md mx-auto mt-10 text-center space-y-3">
        <p class="text-sm">กรุณาเข้าสู่ระบบเพื่อดูใบเสร็จ</p>
        <button type="button" class="min-h-[44px] px-5 rounded-xl bg-indigo-600 text-white font-bold text-sm" @click="$emit('open-auth')">เข้าสู่ระบบ</button>
      </div>
      <div v-else-if="loading" class="no-print py-20 text-center text-sm text-slate-500">กำลังโหลดใบเสร็จ...</div>
      <div v-else-if="error" class="no-print max-w-md mx-auto mt-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-4 text-sm text-rose-700 dark:text-rose-300 space-y-2">
        <p>{{ error }}</p>
        <button type="button" class="underline font-semibold min-h-[36px]" @click="load">ลองใหม่</button>
      </div>
      <div v-else-if="!eligible" class="no-print max-w-md mx-auto mt-10 text-center text-sm text-slate-600 dark:text-slate-300">
        ใบเสร็จออกได้เฉพาะการจองที่อนุมัติแล้ว (สถานะปัจจุบัน: {{ statusText }})
      </div>
      <div v-else-if="!booking.receiptNo" class="no-print max-w-md mx-auto mt-10 text-center text-sm space-y-3">
        <template v-if="authStore.isAdmin">
          <p>การจองนี้อนุมัติก่อนมีระบบเลขใบเสร็จ</p>
          <button type="button" class="min-h-[44px] px-5 rounded-xl bg-indigo-600 text-white font-bold text-sm disabled:opacity-60" :disabled="issuing" @click="issue">
            {{ issuing ? 'กำลังออกเลข...' : 'ออกเลขใบเสร็จ' }}
          </button>
        </template>
        <p v-else>ใบเสร็จยังไม่ออก กรุณาติดต่อผู้ดูแล</p>
      </div>

      <!-- ใบเสร็จ -->
      <article v-else class="receipt-sheet relative mx-auto bg-white text-black rounded-lg shadow p-5 sm:p-8 text-[13px] sm:text-sm leading-relaxed" :class="paper === 'A4' ? 'max-w-[794px]' : 'max-w-[560px]'">
        <div v-if="booking.status === 'cancelled'" class="watermark" aria-hidden="true">ยกเลิก</div>

        <header class="text-center border-b border-black pb-3 mb-3">
          <div class="text-lg font-bold">{{ receiptInfo.name || marketName }}</div>
          <div v-if="receiptInfo.address" class="text-xs">{{ receiptInfo.address }}</div>
          <div class="text-xs">
            <span v-if="receiptInfo.phone">โทร {{ receiptInfo.phone }}</span>
            <span v-if="receiptInfo.taxId"> · เลขประจำตัวผู้เสียภาษี {{ receiptInfo.taxId }}</span>
          </div>
          <h1 class="text-xl font-bold mt-2">ใบเสร็จรับเงิน</h1>
        </header>

        <div class="flex justify-between gap-3 mb-3">
          <div>เลขที่: <strong class="font-mono">{{ booking.receiptNo }}</strong></div>
          <div>วันที่ออก: {{ issuedText }}</div>
        </div>
        <div class="mb-3">
          <div>ได้รับเงินจาก: <strong>{{ booking.customerName }}</strong><span v-if="booking.shopName"> (ร้าน {{ booking.shopName }})</span></div>
          <div v-if="isAdminView && booking.customerPhone" class="text-xs">โทร {{ booking.customerPhone }}</div>
        </div>

        <table class="w-full border-collapse mb-3 avoid-break">
          <thead>
            <tr class="border-y border-black text-left">
              <th class="py-1 pr-2">รายการ</th>
              <th class="py-1 px-2">วัน/รอบ</th>
              <th class="py-1 px-2 text-right">ช่อง</th>
              <th class="py-1 px-2 text-right">ราคา/ช่อง</th>
              <th class="py-1 pl-2 text-right">รวม</th>
            </tr>
          </thead>
          <tbody>
            <tr class="align-top border-b border-slate-300">
              <td class="py-1 pr-2">ค่าเช่าแผง {{ booking.stallNo }}<br /><span class="text-xs">{{ zoneName }}</span></td>
              <td class="py-1 px-2">{{ booking.slots?.length ? slotText : 'ไม่ระบุวัน (การจองแบบเดิม)' }}</td>
              <td class="py-1 px-2 text-right font-mono">{{ booking.slots?.length || 1 }}</td>
              <td class="py-1 px-2 text-right font-mono">{{ money(booking.pricePerSlot ?? booking.amountDue) }}</td>
              <td class="py-1 pl-2 text-right font-mono">{{ money(booking.amountDue) }}</td>
            </tr>
          </tbody>
        </table>

        <div class="text-right avoid-break">
          <div class="text-base font-bold">รวมทั้งสิ้น <span class="font-mono">{{ money(booking.amountDue) }}</span></div>
          <div class="text-xs">({{ bahtText(booking.amountDue) }})</div>
        </div>

        <div v-if="booking.refund" class="mt-3 border border-black p-2 text-xs avoid-break">
          <template v-if="booking.refund.status === 'refunded'">คืนเงินแล้ว <strong class="font-mono">{{ money(booking.refund.amount) }}</strong> เมื่อ {{ booking.refund.refundedDate ? formatThaiDate(booking.refund.refundedDate) : '-' }}</template>
          <template v-else-if="booking.refund.status === 'pending'">การจองนี้ถูกยกเลิก รอคืนเงิน {{ money(booking.refund.amount) }}</template>
          <template v-else>การจองนี้ถูกยกเลิก (ไม่มียอดคืนตามนโยบาย)</template>
        </div>

        <div class="mt-3 text-xs space-y-0.5 avoid-break">
          <div>วิธีชำระ: โอนเงิน / PromptPay<span v-if="paidText"> · ตามสลิปเมื่อ {{ paidText }}</span></div>
          <div>อนุมัติโดย: ผู้ดูแลตลาด<span v-if="approvedText"> · {{ approvedText }}</span></div>
        </div>
        <p class="mt-4 text-[11px] text-slate-600 avoid-break">เอกสารนี้เป็นใบเสร็จรับเงิน ไม่ใช่ใบกำกับภาษี</p>
      </article>

      <div v-if="canPrint" class="no-print max-w-[560px] mx-auto mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <p><strong>วิธีบันทึกเป็น PDF</strong></p>
        <p>iPhone / iPad: กดปุ่ม "บันทึกเป็น PDF / พิมพ์" → ถ่างนิ้วที่ตัวอย่างหน้า → แตะปุ่มแชร์ → "บันทึกลงไฟล์"</p>
        <p>คอมพิวเตอร์ / Android: ในหน้าต่างพิมพ์ เลือกเครื่องพิมพ์ "Save as PDF" (บันทึกเป็น PDF)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useReceiptStore } from '../../stores/receiptStore'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { useSlotStore } from '../../stores/slotStore'
import { fetchBookingFull, issueReceiptNumber } from '../../services/firebaseService'
import { bahtText, formatBaht } from '../../utils/receipt'
import { formatSlotsSummary } from '../../utils/marketCalendar'
import { formatThaiDate, formatThaiDateTime } from '../../utils/date'

defineEmits(['open-auth'])

const receiptStore = useReceiptStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()
const slotStore = useSlotStore()

const booking = ref(null)
const loading = ref(false)
const error = ref('')
const issuing = ref(false)

const money = (n) => formatBaht(n)
const receiptInfo = computed(() => slotStore.settings.receipt)
const paper = computed(() => receiptInfo.value.paper)
const marketName = computed(() => marketStore.marketName || 'ตลาด')
const isAdminView = computed(() => authStore.isAdmin)
const zoneName = computed(() => {
  const stall = marketStore.pub.stalls.find(s => s.id === booking.value?.stallId)
  return (stall && marketStore.pubZoneById(stall.zoneId)?.name) || ''
})
const slotText = computed(() => formatSlotsSummary(slotStore.settings, booking.value?.slots))
const tsText = (t) => (t?.toDate ? formatThaiDateTime(t.toDate()) : '')
const issuedText = computed(() => tsText(booking.value?.receiptIssuedAt))
const paidText = computed(() => tsText(booking.value?.slipUploadedAt))
const approvedText = computed(() => tsText(booking.value?.decidedAt))
const statusText = computed(() => booking.value?.status || 'ยืนยันแล้ว')
const eligible = computed(() => {
  const b = booking.value
  if (!b) return false
  return !b.status || ['approved', 'cancel_requested'].includes(b.status) || (b.status === 'cancelled' && b.wasApproved === true)
})
const canPrint = computed(() => !!booking.value?.receiptNo && eligible.value)

async function load() {
  const id = receiptStore.bookingId
  booking.value = null
  error.value = ''
  if (!id || !authStore.isAuthenticated) return
  loading.value = true
  try {
    const b = await fetchBookingFull(id)
    if (receiptStore.bookingId !== id) return
    if (!b) error.value = 'ไม่พบใบเสร็จนี้'
    booking.value = b
  } catch (err) {
    console.error('Load receipt error:', err)
    error.value = err?.code === 'permission-denied' ? 'ไม่มีสิทธิ์ดูใบเสร็จนี้ (ดูได้เฉพาะเจ้าของการจองและผู้ดูแล)' : (err?.message || 'โหลดใบเสร็จไม่สำเร็จ')
  } finally {
    loading.value = false
  }
}

async function issue() {
  issuing.value = true
  try {
    await issueReceiptNumber({ bookingId: booking.value.id, actor: authStore.auditActor })
    await load()
  } catch (err) {
    console.error('Issue receipt error:', err)
    error.value = err?.code === 'permission-denied' ? 'ไม่มีสิทธิ์ออกเลขใบเสร็จ (ต้องเป็นผู้ดูแล และ rules ต้อง deploy แล้ว)' : (err?.message || 'ออกเลขใบเสร็จไม่สำเร็จ')
  } finally {
    issuing.value = false
  }
}

// ชื่อไฟล์ PDF = เลขใบเสร็จ และขนาดกระดาษตามตั้งค่า (A5 ค่าเริ่มต้น)
let styleEl = null
let prevTitle = ''
function applyPrintSetup() {
  if (!styleEl) {
    styleEl = document.createElement('style')
    document.head.appendChild(styleEl)
  }
  styleEl.textContent = `@page { size: ${paper.value} portrait; margin: 10mm; }`
  if (booking.value?.receiptNo) {
    if (!prevTitle) prevTitle = document.title
    document.title = booking.value.receiptNo
  }
}
function cleanupPrintSetup() {
  styleEl?.remove()
  styleEl = null
  if (prevTitle) document.title = prevTitle
  prevTitle = ''
}

function print() {
  applyPrintSetup()
  window.print()
}

function close() {
  cleanupPrintSetup()
  receiptStore.close()
}

watch([() => receiptStore.bookingId, () => authStore.isAuthenticated], load, { immediate: true })
watch(booking, () => { if (booking.value?.receiptNo) applyPrintSetup() })
window.addEventListener('popstate', () => receiptStore.syncFromUrl())
onBeforeUnmount(cleanupPrintSetup)
</script>

<style scoped>
.receipt-sheet { position: relative; overflow: hidden; }
.watermark {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-size: 110px; font-weight: 800; color: rgba(220, 38, 38, 0.18); transform: rotate(-25deg); pointer-events: none;
}
.avoid-break { break-inside: avoid; page-break-inside: avoid; }
</style>

<style>
@media print {
  body * { visibility: hidden !important; }
  .receipt-root, .receipt-root .receipt-sheet, .receipt-root .receipt-sheet * { visibility: visible !important; }
  .receipt-root { position: absolute !important; inset: 0 !important; overflow: visible !important; background: #fff !important; }
  .receipt-root .no-print { display: none !important; }
  .receipt-root > div { padding: 0 !important; }
  .receipt-root .receipt-sheet { box-shadow: none !important; border-radius: 0 !important; max-width: none !important; padding: 0 !important; color: #000 !important; }
  html, body { background: #fff !important; }
}
</style>
