<template>
  <div class="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 px-3 sm:px-4 py-2">
    <div class="max-w-7xl mx-auto space-y-2">
      <div class="flex items-center gap-2">
        <button type="button" class="shrink-0 min-h-[44px] px-3 rounded-xl text-xs font-bold border transition"
          :class="slots.selectedDate === today ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'"
          @click="slots.goToday()">วันนี้</button>

        <!-- วันเปิดตลาด 14 วันถัดไป เลื่อนแนวนอน -->
        <div class="flex-1 min-w-0 flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5" role="listbox" aria-label="เลือกวันขาย">
          <button
            v-for="d in dates" :key="d" type="button" role="option" :aria-selected="d === slots.selectedDate"
            class="shrink-0 min-h-[44px] min-w-[52px] px-2 rounded-xl border text-center leading-tight transition"
            :class="d === slots.selectedDate
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'"
            @click="slots.selectDate(d)"
          >
            <div class="text-[10px] opacity-80">{{ parts(d).dow }}</div>
            <div class="text-sm font-bold font-mono">{{ parts(d).day }}</div>
            <div class="text-[10px] opacity-80">{{ parts(d).month }}</div>
          </button>
        </div>

        <!-- เลือกวันอื่นจากปฏิทิน -->
        <label class="shrink-0 min-h-[44px] px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer">
          <CalendarDays class="w-4 h-4" />
          <span class="hidden sm:inline">วันอื่น</span>
          <input type="date" class="sr-only" :min="today" :value="slots.selectedDate" @change="onPickDate" />
        </label>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs font-bold text-slate-800 dark:text-slate-100">{{ formatThaiDate(slots.selectedDate) }}</span>

        <div v-if="slots.rounds.length > 1" class="flex gap-1.5 overflow-x-auto">
          <button
            v-for="r in slots.rounds" :key="r.id" type="button"
            class="shrink-0 min-h-[44px] px-3 rounded-xl text-xs font-semibold border transition"
            :class="r.id === slots.selectedRoundId ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'"
            @click="slots.setRound(r.id)"
          >{{ r.label }}<span v-if="r.start && r.end" class="ml-1 opacity-75 font-mono">{{ r.start }}-{{ r.end }}</span></button>
        </div>

        <span v-if="!slots.isSelectedDayOpen" class="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">ตลาดไม่เปิดวันนี้</span>
        <span v-else-if="!slots.selectedCheck.ok" class="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">{{ slots.selectedCheck.reason }}</span>
        <span v-if="slots.locksError" class="text-[11px] text-rose-600 dark:text-rose-400">{{ slots.locksError }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CalendarDays } from 'lucide-vue-next'
import { useSlotStore } from '../../stores/slotStore'
import { todayBangkok, formatThaiDate } from '../../utils/date'

const slots = useSlotStore()
const today = computed(() => todayBangkok())

// วันที่เลือกอยู่ (ถ้าไม่อยู่ใน 14 วัน เช่น เลือกจากปฏิทิน) ต่อท้ายแถบให้เห็นว่าเลือกอะไรอยู่
const dates = computed(() => {
  const list = [...slots.quickDates]
  if (!list.includes(slots.selectedDate)) list.push(slots.selectedDate)
  return list.sort()
})

function parts(key) {
  const [dow, day, month] = formatThaiDate(key).split(' ')
  return { dow, day, month }
}

function onPickDate(e) {
  if (e.target.value) slots.selectDate(e.target.value)
}
</script>
