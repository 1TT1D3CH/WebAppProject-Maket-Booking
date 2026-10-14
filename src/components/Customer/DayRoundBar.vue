<template>
  <div class="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 px-3 sm:px-4 py-2">
    <div class="max-w-7xl mx-auto space-y-2">
      <div class="flex items-center gap-2">
        <button type="button" class="shrink-0 min-h-[44px] px-3 rounded-xl text-xs font-bold border transition"
          :class="slots.selectedDate === today ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'"
          @click="slots.goToday()">วันนี้</button>

        <!-- ‹ วันเปิดก่อนหน้า | ปุ่มวัน (เปิดปฏิทิน) | วันเปิดถัดไป › -->
        <div class="relative flex-1 min-w-0 flex items-center gap-1.5">
          <button type="button" class="shrink-0 w-11 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center disabled:opacity-30"
            :disabled="!hasPrev" aria-label="วันเปิดตลาดก่อนหน้า" @click="slots.selectOpenDay(-1)">
            <ChevronLeft class="w-4 h-4" />
          </button>

          <button type="button" class="flex-1 min-w-0 min-h-[44px] px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2"
            :aria-expanded="calOpen" aria-haspopup="dialog" @click="calOpen = !calOpen">
            <CalendarDays class="w-4 h-4 shrink-0 text-indigo-600" />
            <span class="truncate">{{ formatThaiDate(slots.selectedDate) }}</span>
            <ChevronDown class="w-4 h-4 shrink-0 opacity-60" />
          </button>

          <button type="button" class="shrink-0 w-11 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center disabled:opacity-30"
            :disabled="!hasNext" aria-label="วันเปิดตลาดถัดไป" @click="slots.selectOpenDay(1)">
            <ChevronRight class="w-4 h-4" />
          </button>

          <!-- ปฏิทิน: คอม = popover ใต้ปุ่ม, มือถือ = bottom sheet -->
          <template v-if="calOpen">
            <div class="fixed inset-0 z-40 bg-black/40 sm:bg-transparent" @click="calOpen = false" />
            <div role="dialog" aria-label="เลือกวันขาย"
              class="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl sm:rounded-2xl sm:absolute sm:inset-x-auto sm:bottom-auto sm:top-full sm:left-1/2 sm:-translate-x-1/2 sm:mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:w-[360px]">
              <BookingCalendar
                mode="single" :model-value="slots.selectedDate" :min-date="slots.minDate" :max-date="slots.maxDate"
                :is-disabled="slots.dayDisabled" @update:model-value="onPickDate"
              />
              <button type="button" class="sm:hidden mt-3 w-full min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200" @click="calOpen = false">ปิด</button>
            </div>
          </template>
        </div>
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
import { computed, ref } from 'vue'
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import BookingCalendar from '../booking/BookingCalendar.vue'
import { useSlotStore } from '../../stores/slotStore'
import { todayBangkok, formatThaiDate } from '../../utils/date'
import { nextBookableDate } from '../../utils/marketCalendar'

const slots = useSlotStore()
const today = computed(() => todayBangkok())
const calOpen = ref(false)

const hasPrev = computed(() => !!nextBookableDate(slots.settings, slots.selectedDate, -1))
const hasNext = computed(() => !!nextBookableDate(slots.settings, slots.selectedDate, 1))

function onPickDate(date) {
  if (date) slots.selectDate(date)
  calOpen.value = false
}
</script>
