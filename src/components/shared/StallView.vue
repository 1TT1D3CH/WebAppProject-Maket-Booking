<template>
  <!-- ตัววาดแผงตัวเดียวของทั้งหน้าลูกค้า (mode="view") และ Admin Builder (mode="edit")
       ของแก้ไข (จุดจับ/กรอบ) ใส่ผ่าน slot เป็น layer ซ้อนด้านบน ไม่แย่งพื้นที่ข้อความในแผง -->
  <div
    :title="title"
    :aria-label="title"
    role="button"
    class="absolute rounded-2xl border-2 transition-all duration-200 shadow-xs hover:shadow-xl group backdrop-blur-xs"
    :class="[
      mode === 'edit' ? 'cursor-move hover:-translate-y-0.5' : 'cursor-pointer hover:-translate-y-1',
      selected
        ? 'ring-4 ring-indigo-600 border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 z-20 shadow-xl ' + (mode === 'edit' ? 'scale-[1.02]' : 'scale-105')
        : statusClasses
    ]"
    :style="{
      left: `${stall.x + offset}px`,
      top: `${stall.y + offset}px`,
      width: `${stall.width}px`,
      height: `${stall.height}px`
    }"
  >
    <!-- ข้อความอยู่ในกล่องที่ตัดส่วนเกิน (overflow-hidden) แยกจาก slot เพื่อให้จุดจับล้นกรอบแผงได้ -->
    <div
      class="absolute inset-0 rounded-[14px] overflow-hidden flex flex-col justify-between pointer-events-none"
      :class="nameOnly ? 'items-center justify-center p-0.5' : 'p-2'"
    >
      <!-- แผงเล็ก: ชื่อแผงบรรทัดเดียว ตัดท้ายเป็น … ไม่ขึ้นบรรทัดใหม่ -->
      <span
        v-if="nameOnly"
        class="w-full text-center font-bold font-mono tracking-tight whitespace-nowrap overflow-hidden text-ellipsis leading-tight text-slate-900 dark:text-white"
        :class="isTinyStall(stall.width) ? 'text-[10px]' : 'text-xs'"
      >{{ stall.stallNo }}</span>

      <template v-else>
        <div class="h-1 w-full rounded-full shrink-0 shadow-xs" :style="{ backgroundColor: zone?.color || '#94a3b8' }"></div>

        <div class="flex items-center justify-between gap-1 min-w-0">
          <span class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono tracking-tight truncate whitespace-nowrap">{{ stall.stallNo }}</span>
          <span
            class="text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold shadow-xs shrink-0 whitespace-nowrap"
            :class="stall.status === 'available' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'"
          >฿{{ stall.price }}</span>
        </div>

        <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate whitespace-nowrap">{{ zone?.name }}</span>

        <span
          v-if="stall.status === 'available'"
          class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap flex items-center gap-0.5"
        >{{ mode === 'edit' ? 'ว่าง' : 'จองแผง' }}<ChevronRight v-if="mode !== 'edit'" class="w-3 h-3" /></span>
        <span
          v-else
          class="text-[10px] font-semibold whitespace-nowrap truncate"
          :class="stall.status === 'pending' ? 'text-amber-600 dark:text-amber-400' : stall.status === 'disabled' ? 'text-rose-500 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'"
        >{{ statusText(stall.status) }}</span>
      </template>
    </div>

    <!-- layer ของแก้ไข (จุดจับ ฯลฯ) -->
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { pickStallLabelMode, isTinyStall } from '../../utils/stallLabel'

const props = defineProps({
  stall: { type: Object, required: true },
  zone: { type: Object, default: null },
  mode: { type: String, default: 'view' }, // 'view' | 'edit'
  selected: Boolean,
  offset: { type: Number, default: 10 }
})

const STATUS_TEXT = { available: 'ว่าง', pending: 'รอตรวจสลิป', booked: 'จองแล้ว', disabled: 'ปิดบริการ' }
const statusText = (status) => STATUS_TEXT[status] || ''

const nameOnly = computed(() => pickStallLabelMode(props.stall.width, props.stall.height) === 'name')
const title = computed(() =>
  `${props.stall.stallNo} · ${props.zone?.name || ''} · ${statusText(props.stall.status)} · ฿${props.stall.price}`
)

const statusClasses = computed(() => {
  switch (props.stall.status) {
    case 'pending':
      return 'bg-amber-50/90 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
    case 'booked':
      return 'bg-slate-100/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 opacity-75'
    case 'disabled':
      return 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 border-slate-300 dark:border-slate-700 opacity-50'
    default:
      return 'bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300/90 dark:border-emerald-800 hover:border-emerald-500 hover:bg-emerald-100/80 shadow-xs'
  }
})
</script>
