<template>
  <div class="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
    <div class="h-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">

      <!-- Left: page title + inline stats -->
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <span class="text-sm font-semibold text-slate-900 dark:text-white whitespace-nowrap shrink-0">ผังตลาด</span>

        <!-- Desktop stats -->
        <span class="hidden md:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap min-w-0">
          <span class="font-semibold tabular-nums text-slate-700 dark:text-slate-200">{{ stats.total }}</span> แผง
          <span class="mx-0.5">·</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          <span>ว่าง <strong class="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">{{ stats.available }}</strong></span>
          <span class="mx-0.5">·</span>
          <span class="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
          <span>จองแล้ว <strong class="font-semibold tabular-nums text-slate-700 dark:text-slate-300">{{ stats.booked }}</strong></span>
          <span class="mx-0.5">·</span>
          <span class="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
          <span>ปิดบริการ <strong class="font-semibold tabular-nums text-rose-700 dark:text-rose-400">{{ stats.disabled }}</strong></span>
          <template v-if="showRevenue">
            <span class="mx-0.5">·</span>
            <span>รายได้ <strong class="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">฿{{ stats.totalRevenue.toLocaleString() }}</strong></span>
          </template>
        </span>

        <!-- Mobile stats (collapsed) -->
        <button
          class="md:hidden flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          @click="statsPopoverOpen = !statsPopoverOpen"
          :aria-expanded="statsPopoverOpen"
        >
          <span class="font-semibold tabular-nums text-slate-700 dark:text-slate-200">{{ stats.total }}</span> แผง
          <span class="mx-0.5">·</span>
          <span>ว่าง <strong class="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">{{ stats.available }}</strong></span>
          <ChevronDown class="w-3 h-3" />
        </button>

        <!-- Stats popover (mobile) -->
        <Teleport to="body">
          <template v-if="statsPopoverOpen">
            <div class="fixed inset-0 z-[60]" @click="statsPopoverOpen = false" aria-hidden="true"></div>
            <div class="fixed z-[61] left-4 right-4 top-28 mx-auto max-w-sm p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-slate-400"></span> ทั้งหมด: <strong class="tabular-nums">{{ stats.total }}</strong> แผง</div>
              <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> ว่าง: <strong class="tabular-nums text-emerald-700 dark:text-emerald-400">{{ stats.available }}</strong></div>
              <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-slate-400"></span> จองแล้ว: <strong class="tabular-nums">{{ stats.booked }}</strong></div>
              <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-rose-500"></span> ปิดบริการ: <strong class="tabular-nums text-rose-700 dark:text-rose-400">{{ stats.disabled }}</strong></div>
              <div v-if="showRevenue" class="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">💰 รายได้รวม: <strong class="tabular-nums text-emerald-700 dark:text-emerald-400">฿{{ stats.totalRevenue.toLocaleString() }}</strong></div>
            </div>
          </template>
        </Teleport>
      </div>

      <!-- Right: actions -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Ghost buttons (desktop) -->
        <button
          @click="$emit('open-booking-settings')"
          class="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="ตั้งค่าการจอง"
        >
          <CalendarDays class="w-3.5 h-3.5" />
          <span class="hidden lg:inline whitespace-nowrap">ตั้งค่าการจอง</span>
        </button>

        <button
          @click="$emit('open-zone-manager')"
          class="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="จัดการโซน"
        >
          <Palette class="w-3.5 h-3.5" />
          <span class="hidden lg:inline whitespace-nowrap">จัดการโซน</span>
        </button>

        <!-- More menu ⋯ -->
        <div class="relative">
          <button
            ref="moreBtnRef"
            @click="toggleMoreMenu"
            class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="เพิ่มเติม"
            aria-label="เพิ่มเติม"
            aria-haspopup="true"
            :aria-expanded="moreMenuOpen"
          >
            <MoreHorizontal class="w-4 h-4" />
          </button>
          <Teleport to="body">
            <template v-if="moreMenuOpen">
              <div class="fixed inset-0 z-[60]" @click="moreMenuOpen = false" aria-hidden="true"></div>
              <div
                ref="moreMenuRef"
                class="fixed z-[61] min-w-[200px] py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl"
                :style="moreMenuStyle"
                role="menu"
                @keydown="handleMoreKeys"
              >
                <!-- Mobile-only: booking settings & zone manager -->
                <button
                  role="menuitem"
                  class="sm:hidden w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                  @click="$emit('open-booking-settings'); moreMenuOpen = false"
                >
                  <CalendarDays class="w-4 h-4" />
                  <span>ตั้งค่าการจอง</span>
                </button>
                <button
                  role="menuitem"
                  class="sm:hidden w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                  @click="$emit('open-zone-manager'); moreMenuOpen = false"
                >
                  <Palette class="w-4 h-4" />
                  <span>จัดการโซน</span>
                </button>

                <!-- Discard changes (when dirty) -->
                <button
                  v-if="hasUnsaved"
                  role="menuitem"
                  class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                  @click="confirmDiscard"
                >
                  <Undo2 class="w-4 h-4" />
                  <span>ยกเลิกการแก้ไข</span>
                </button>

                <div class="my-1 h-px bg-slate-200 dark:bg-slate-800"></div>

                <!-- Reset layout (danger) -->
                <button
                  role="menuitem"
                  class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-500"
                  @click="confirmReset"
                >
                  <RotateCcw class="w-4 h-4" />
                  <span>รีเซ็ตผัง</span>
                </button>
              </div>
            </template>
          </Teleport>
        </div>

        <!-- Save status -->
        <span
          v-if="hasUnsaved"
          class="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 whitespace-nowrap"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          ยังไม่บันทึก
        </span>
        <span
          v-else
          class="hidden sm:inline text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap"
        >บันทึกแล้ว</span>

        <!-- Save button (primary) -->
        <button
          @click="marketStore.saveLayoutToFirestore()"
          :disabled="marketStore.isSaving"
          class="flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-bold text-white transition-all duration-200 active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 shadow-sm"
          :class="hasUnsaved
            ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200 dark:shadow-none'
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none'"
        >
          <Save class="w-4 h-4" />
          <span v-if="marketStore.isSaving" class="whitespace-nowrap">กำลังบันทึก...</span>
          <span v-else class="whitespace-nowrap">บันทึกผัง</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { useAuthStore } from '../../stores/authStore'
import {
  CalendarDays,
  Palette,
  MoreHorizontal,
  Save,
  ChevronDown,
  Undo2,
  RotateCcw
} from 'lucide-vue-next'

const marketStore = useMarketStore()
const authStore = useAuthStore()

defineEmits(['open-booking-settings', 'open-zone-manager', 'open-market-settings'])

const moreBtnRef = ref(null)
const moreMenuRef = ref(null)
const moreMenuOpen = ref(false)
const moreMenuStyle = ref({})
const statsPopoverOpen = ref(false)

const stats = computed(() => marketStore.stats)
const hasUnsaved = computed(() => marketStore.hasUnsavedChanges)
const showRevenue = computed(() => authStore.isAdmin || authStore.isOwner)

function toggleMoreMenu() {
  if (moreMenuOpen.value) { moreMenuOpen.value = false; return }
  const rect = moreBtnRef.value?.getBoundingClientRect()
  if (rect) {
    moreMenuStyle.value = {
      top: `${rect.bottom + 4}px`,
      right: `${window.innerWidth - rect.right}px`,
    }
  }
  moreMenuOpen.value = true
  nextTick(() => moreMenuRef.value?.querySelector('[role="menuitem"]')?.focus())
}

function handleMoreKeys(e) {
  if (e.key === 'Escape') { moreMenuOpen.value = false; moreBtnRef.value?.focus(); return }
  const items = [...(moreMenuRef.value?.querySelectorAll('[role="menuitem"]') || [])]
  const idx = items.indexOf(document.activeElement)
  if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus() }
  else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus() }
}

function confirmDiscard() {
  moreMenuOpen.value = false
  if (window.confirm('ยกเลิกการแก้ไขที่ยังไม่บันทึกทั้งหมด และกลับเป็นผังที่บันทึกล่าสุด?')) {
    marketStore.discardChanges()
  }
}

function confirmReset() {
  moreMenuOpen.value = false
  if (window.confirm('รีเซ็ตผังทั้งหมดกลับเป็นค่าเริ่มต้น? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
    marketStore.resetToDefaults()
  }
}
</script>
