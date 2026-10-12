<template>
  <section class="absolute inset-0 overflow-y-auto bg-slate-50 dark:bg-slate-950 pb-[max(1rem,env(safe-area-inset-bottom))]">
    <div v-if="!authStore.isOwner" class="h-full flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 p-6 text-center">
      หน้านี้สำหรับเจ้าของตลาด
    </div>

    <div v-else class="max-w-6xl mx-auto p-3 sm:p-4 space-y-4">
      <!-- หัว + ช่วงเวลา -->
      <header class="space-y-3">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-base font-bold text-slate-900 dark:text-white">รายงานรายได้</h2>
          <button type="button" class="min-h-[44px] px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold" :disabled="store.loading" @click="store.load(true)">
            {{ store.loading ? 'กำลังโหลด...' : 'รีเฟรช' }}
          </button>
        </div>
        <div class="flex gap-1 overflow-x-auto pb-1">
          <button
            v-for="p in presets" :key="p.key" type="button"
            class="shrink-0 min-h-[44px] px-4 rounded-xl text-xs font-semibold border transition"
            :class="store.preset === p.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'"
            @click="store.setPreset(p.key)"
          >{{ p.label }}</button>
        </div>
        <form v-if="store.preset === 'custom'" class="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto] gap-2 items-end" @submit.prevent="store.setCustom(customFrom, customTo)">
          <label class="text-[11px] text-slate-500">ตั้งแต่<input v-model="customFrom" type="date" class="field" /></label>
          <label class="text-[11px] text-slate-500">ถึง<input v-model="customTo" type="date" class="field" /></label>
          <button type="submit" class="col-span-2 sm:col-span-1 min-h-[44px] px-5 rounded-xl bg-indigo-600 text-white text-xs font-bold">ดูรายงาน</button>
        </form>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          {{ formatThaiDate(store.range.from) }} – {{ formatThaiDate(store.range.to) }} ({{ store.rangeDays }} วัน)
          · รายได้นับตามวันขายของแต่ละช่อง คืนเงินหักตามวันที่คืนจริง
        </p>
      </header>

      <div v-if="store.error" class="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-3 text-sm text-rose-700 dark:text-rose-300">
        {{ store.error }}
        <button type="button" class="block mt-1 underline font-semibold min-h-[36px]" @click="store.load(true)">ลองใหม่</button>
      </div>
      <div v-else-if="store.loading && !store.raw.length" class="py-16 text-center text-sm text-slate-500">กำลังโหลดรายงาน...</div>

      <template v-else>
        <p v-if="r.estimated" class="rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-2.5 text-xs text-amber-900 dark:text-amber-200">
          มีการจองแบบเดิมที่ไม่ระบุวัน นับตามวันที่อนุมัติ ยอดส่วนนั้นเป็นประมาณการ
        </p>

        <!-- การ์ดตัวเลข -->
        <div class="grid grid-cols-2 lg:grid-cols-6 gap-2">
          <div v-for="c in cards" :key="c.label" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
            <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{{ c.label }}</div>
            <div class="text-lg sm:text-xl font-bold font-mono mt-0.5" :class="c.tone">{{ c.value }}</div>
            <div v-if="c.change !== undefined && c.change !== null" class="text-[11px] font-semibold" :class="c.change >= 0 ? 'text-emerald-600' : 'text-rose-600'">
              {{ c.change >= 0 ? '+' : '' }}{{ c.change }}% เทียบช่วงก่อนหน้า
            </div>
            <div v-else-if="c.sub" class="text-[11px] text-slate-400">{{ c.sub }}</div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-4">
          <!-- กราฟ -->
          <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
            <div class="text-sm font-bold mb-2">{{ monthly ? 'รายได้สุทธิรายเดือน' : 'รายได้สุทธิรายวัน' }}</div>
            <div class="overflow-x-auto">
              <div class="flex items-end gap-1 h-44 pt-2" :style="{ minWidth: `${bars.length * 26}px` }" role="img" :aria-label="`กราฟรายได้ ${bars.length} แท่ง`">
                <div v-for="b in bars" :key="b.date" class="flex-1 min-w-[20px] h-full flex flex-col justify-end items-center gap-1" :title="`${b.label}: ${fmt(b.net)}`">
                  <div class="w-full rounded-t bg-indigo-500 dark:bg-indigo-400" :class="b.net < 0 ? 'bg-rose-500' : ''" :style="{ height: `${b.h}%`, minHeight: b.net ? '2px' : '0' }"></div>
                  <span class="text-[9px] text-slate-500 leading-none">{{ b.short }}</span>
                </div>
              </div>
            </div>
            <div v-if="!bars.some(b => b.net)" class="text-xs text-slate-400 text-center py-2">ไม่มีรายได้ในช่วงนี้</div>
          </div>

          <!-- ตาราง -->
          <div class="space-y-4">
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
              <div class="text-sm font-bold mb-2">แยกตามโซน</div>
              <ul class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <li v-for="z in r.byZone" :key="z.zoneName" class="flex justify-between gap-2 py-2"><span class="truncate">{{ z.zoneName }} <span class="text-xs text-slate-400">({{ z.slots }} ช่อง)</span></span><span class="font-mono font-semibold">{{ fmt(z.revenue) }}</span></li>
                <li v-if="!r.byZone.length" class="py-2 text-xs text-slate-400">ไม่มีข้อมูล</li>
              </ul>
            </div>
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
              <div class="text-sm font-bold mb-2">10 แผงที่ทำรายได้สูงสุด</div>
              <ol class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <li v-for="(s, i) in r.topStalls" :key="s.stallId || s.stallNo" class="flex justify-between gap-2 py-2"><span class="truncate">{{ i + 1 }}. แผง {{ s.stallNo }} <span class="text-xs text-slate-400">{{ s.zoneName }}</span></span><span class="font-mono font-semibold">{{ fmt(s.revenue) }}</span></li>
                <li v-if="!r.topStalls.length" class="py-2 text-xs text-slate-400">ไม่มีข้อมูล</li>
              </ol>
            </div>
            <div v-if="rounds.length > 1" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
              <div class="text-sm font-bold mb-2">แยกตามรอบ</div>
              <ul class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <li v-for="x in r.byRound" :key="x.roundId" class="flex justify-between gap-2 py-2"><span>{{ roundLabel(x.roundId) }} <span class="text-xs text-slate-400">({{ x.slots }} ช่อง)</span></span><span class="font-mono font-semibold">{{ fmt(x.revenue) }}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ส่งออก -->
        <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 space-y-2">
          <div class="text-sm font-bold">ส่งออกรายงาน</div>
          <label class="flex items-center gap-3 min-h-[44px] text-xs text-slate-700 dark:text-slate-200">
            <input v-model="includePhone" type="checkbox" class="w-5 h-5 accent-indigo-600" /> ใส่เบอร์โทรผู้เช่าในไฟล์ (ค่าเริ่มต้นไม่ใส่)
          </label>
          <div class="flex flex-col sm:flex-row gap-2">
            <button type="button" class="min-h-[48px] px-5 rounded-xl bg-emerald-600 text-white font-bold text-sm disabled:opacity-60" :disabled="store.exporting || store.loading" @click="doExport('xlsx')">
              {{ store.exporting ? 'กำลังสร้างไฟล์...' : 'ส่งออก Excel (.xlsx)' }}
            </button>
            <button type="button" class="min-h-[48px] px-5 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-sm disabled:opacity-60" :disabled="store.exporting || store.loading" @click="doExport('csv')">ส่งออก CSV (รายการจอง)</button>
          </div>
          <p v-if="exportError" class="text-xs text-rose-600 dark:text-rose-400 font-medium">{{ exportError }}</p>
          <p class="text-[11px] text-slate-400">ไฟล์ Excel มี 4 sheet: สรุป · รายวัน · รายการจอง · คืนเงิน วันที่แสดงแบบ วัน/เดือน/ปี ค.ศ.</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRevenueStore } from '../../stores/revenueStore'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { useSlotStore } from '../../stores/slotStore'
import { groupMonthly, percentChange } from '../../utils/revenue'
import { formatBaht } from '../../utils/receipt'
import { formatThaiDate } from '../../utils/date'
import { getRounds } from '../../utils/marketCalendar'

const store = useRevenueStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()
const slotStore = useSlotStore()

const presets = [
  { key: 'today', label: 'วันนี้' }, { key: 'week', label: 'สัปดาห์นี้' }, { key: 'thisMonth', label: 'เดือนนี้' },
  { key: 'lastMonth', label: 'เดือนที่แล้ว' }, { key: 'custom', label: 'เลือกเอง' }
]
const customFrom = ref(store.range.from)
const customTo = ref(store.range.to)
const includePhone = ref(false)
const exportError = ref('')

const fmt = (n) => formatBaht(n)
const r = computed(() => store.report)
const prev = computed(() => store.prevReport)
const rounds = computed(() => getRounds(slotStore.settings))
const roundLabel = (id) => rounds.value.find(x => x.id === id)?.label || (id === 'all' ? 'ทั้งวัน' : id)

const cards = computed(() => [
  { label: 'รายได้รวม', value: fmt(r.value.gross), change: percentChange(r.value.gross, prev.value.gross), tone: 'text-slate-900 dark:text-white' },
  { label: 'คืนเงิน', value: fmt(r.value.refunds), sub: 'หักตามวันที่คืนจริง', tone: 'text-rose-600' },
  { label: 'รายได้สุทธิ', value: fmt(r.value.net), change: percentChange(r.value.net, prev.value.net), tone: 'text-emerald-600' },
  { label: 'จำนวนการจอง', value: String(r.value.bookingCount), sub: `${r.value.slotCount} ช่อง` },
  { label: 'อัตราการใช้แผง', value: store.utilization === null ? '-' : `${Math.round(store.utilization * 1000) / 10}%`, sub: 'ช่องที่ขาย / ช่องที่เปิดขาย' },
  { label: 'รอตรวจสลิป', value: fmt(r.value.pendingAmount), sub: 'ยังไม่นับเป็นรายได้', tone: 'text-amber-600' }
])

// กราฟ: ช่วงยาวกว่า 62 วันรวมเป็นรายเดือน
const monthly = computed(() => store.rangeDays > 62)
const bars = computed(() => {
  const rows = monthly.value ? groupMonthly(r.value.daily) : r.value.daily
  const max = Math.max(1, ...rows.map(d => Math.abs(d.net)))
  return rows.map(d => ({
    date: d.date,
    net: d.net,
    h: Math.round(Math.abs(d.net) / max * 100),
    label: monthly.value ? d.date : formatThaiDate(d.date),
    short: monthly.value ? d.date.slice(5) : d.date.slice(8)
  }))
})

async function doExport(format) {
  exportError.value = ''
  try {
    await store.exportFile(format, includePhone.value)
    marketStore.showNotification('ส่งออกรายงานแล้ว', 'success')
  } catch (err) {
    console.error('Export report error:', err)
    exportError.value = err?.message || 'ส่งออกไม่สำเร็จ'
  }
}

onMounted(() => { if (authStore.isOwner) store.load() })
</script>

<style scoped>
.field { display: block; width: 100%; min-height: 44px; margin-top: 2px; padding: 0 12px; font-size: 16px; border-radius: 12px; border: 1px solid rgb(203 213 225); background: white; color: rgb(15 23 42); }
:global(.dark) .field { background: rgb(15 23 42); border-color: rgb(51 65 85); color: rgb(241 245 249); }
</style>
