<template>
  <div
    role="toolbar"
    aria-label="เครื่องมือผัง"
    class="absolute z-20 left-4 max-w-[calc(100%-2rem)] select-none"
    :class="dock === 'bottom' ? 'bottom-4' : 'top-4'"
  >
    <!-- พับเก็บ: เหลือปุ่มขยาย + ซูม -->
    <div v-if="collapsed" :class="BAR_CLASS">
      <ToolbarButton
        :icon="dock === 'top' ? ChevronDown : ChevronUp"
        label="ขยายแถบเครื่องมือ"
        text="เครื่องมือผัง"
        @click="setCollapsed(false)"
      />
      <span :class="DIVIDER_CLASS" aria-hidden="true"></span>
      <ToolbarButton :icon="Minus" label="ซูมออก" :show-label="false" @click="emit('zoom-out')" />
      <ToolbarButton label="รีเซ็ตซูม 100%" :text="zoomText" class="min-w-[3.25rem] font-mono" @click="emit('reset-zoom')" />
      <ToolbarButton :icon="Plus" label="ซูมเข้า" :show-label="false" @click="emit('zoom-in')" />
    </div>

    <div v-else :class="BAR_CLASS">
      <!-- กลุ่ม 1: สร้าง -->
      <ToolbarButton variant="primary" :icon="Plus" label="เพิ่มแผง" @click="emit('add-stall')" />
      <ToolbarButton
        ref="addBtn"
        :icon="Shapes"
        label="เพิ่มวัตถุ"
        caret
        :active="openMenu === 'add'"
        aria-haspopup="dialog"
        :aria-expanded="openMenu === 'add'"
        @click="toggleMenu('add')"
      />

      <span :class="DIVIDER_CLASS" aria-hidden="true"></span>

      <!-- กลุ่ม 2: มุมมอง -->
      <ToolbarButton
        v-if="!inMore('pan')"
        :icon="Hand"
        label="โหมดเลื่อนผัง"
        text="เลื่อนผัง"
        toggle
        :active="isPanMode"
        :show-label="labelsVisible"
        @click="emit('toggle-pan-mode')"
      />
      <div v-if="!inMore('zoom')" class="flex items-center shrink-0">
        <ToolbarButton :icon="Minus" label="ซูมออก" :show-label="false" @click="emit('zoom-out')" />
        <ToolbarButton label="รีเซ็ตซูม 100%" :text="zoomText" class="min-w-[3.25rem] font-mono" @click="emit('reset-zoom')" />
        <ToolbarButton :icon="Plus" label="ซูมเข้า" :show-label="false" @click="emit('zoom-in')" />
      </div>
      <ToolbarButton
        v-if="!inMore('fit')"
        :icon="Scan"
        label="พอดีจอ"
        :show-label="labelsVisible"
        @click="emit('fit-to-screen')"
      />
      <div v-if="!inMore('snap')" class="flex items-center shrink-0">
        <ToolbarButton
          :icon="Grid3x3"
          :label="`สแนปกริด ${gridSnapMeters} เมตร`"
          :text="`Snap ${gridSnapMeters}ม.`"
          toggle
          :active="snapToGrid"
          :show-label="labelsVisible"
          @click="emit('toggle-snap')"
        />
        <ToolbarButton
          ref="snapBtn"
          :icon="ChevronDown"
          label="เลือกขนาดกริด"
          :show-label="false"
          compact
          :active="openMenu === 'snap'"
          aria-haspopup="dialog"
          :aria-expanded="openMenu === 'snap'"
          @click="toggleMenu('snap')"
        />
      </div>

      <span :class="DIVIDER_CLASS" aria-hidden="true"></span>

      <!-- กลุ่ม 3: ผัง -->
      <ToolbarButton
        v-if="!inMore('size')"
        :icon="Ruler"
        label="ตั้งค่าขนาดตลาด"
        :text="marketSizeText"
        :show-label="labelsVisible"
        class="font-mono"
        @click="emit('open-market-settings')"
      />
      <ToolbarButton
        ref="moreBtn"
        :icon="MoreHorizontal"
        label="เพิ่มเติม"
        :show-label="false"
        :active="openMenu === 'more'"
        aria-haspopup="dialog"
        :aria-expanded="openMenu === 'more'"
        @click="toggleMenu('more')"
      />
      <ToolbarButton
        :icon="dock === 'top' ? ChevronUp : ChevronDown"
        label="พับเก็บแถบเครื่องมือ"
        :show-label="false"
        @click="setCollapsed(true)"
      />
    </div>

    <!-- เมนู -->
    <ToolbarMenu
      :open="openMenu === 'add'"
      :anchor="addBtn?.el"
      label="เพิ่มวัตถุ"
      :placement="menuPlacement"
      :width="280"
      @close="closeMenu"
    >
      <AddObjectMenu @select="handleAddObject" />
    </ToolbarMenu>

    <ToolbarMenu
      :open="openMenu === 'snap'"
      :anchor="snapBtn?.el"
      label="ตั้งค่าสแนปกริด"
      :placement="menuPlacement"
      :width="220"
      @close="closeMenu"
    >
      <SnapOptions
        :snap-to-grid="snapToGrid"
        :grid-snap-meters="gridSnapMeters"
        @toggle-snap="emit('toggle-snap')"
        @set-snap-size="emit('set-snap-size', $event)"
      />
    </ToolbarMenu>

    <ToolbarMenu
      :open="openMenu === 'more'"
      :anchor="moreBtn?.el"
      label="เครื่องมือเพิ่มเติม"
      :placement="menuPlacement"
      :width="240"
      @close="closeMenu"
    >
      <div class="text-xs space-y-0.5">
        <button v-if="inMore('size')" type="button" :class="ROW_CLASS" @click="runAndClose('open-market-settings')">
          <Ruler class="w-4 h-4 shrink-0" />
          <span class="flex-1">ขนาดตลาด</span>
          <span class="font-mono text-slate-500 dark:text-slate-400">{{ marketSizeText }}</span>
        </button>
        <button v-if="inMore('fit')" type="button" :class="ROW_CLASS" @click="runAndClose('fit-to-screen')">
          <Scan class="w-4 h-4 shrink-0" />
          <span class="flex-1">พอดีจอ</span>
        </button>
        <button
          v-if="inMore('pan')"
          type="button"
          role="menuitemcheckbox"
          :aria-checked="isPanMode"
          :class="ROW_CLASS"
          @click="runAndClose('toggle-pan-mode')"
        >
          <Hand class="w-4 h-4 shrink-0" />
          <span class="flex-1">โหมดเลื่อนผัง</span>
          <Check v-if="isPanMode" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </button>
        <div v-if="inMore('zoom')" class="flex items-center gap-1 px-2.5 py-1">
          <span class="flex-1 font-medium text-slate-700 dark:text-slate-200">ซูม</span>
          <ToolbarButton :icon="Minus" label="ซูมออก" :show-label="false" @click="emit('zoom-out')" />
          <ToolbarButton label="รีเซ็ตซูม 100%" :text="zoomText" class="min-w-[3.25rem] font-mono" @click="emit('reset-zoom')" />
          <ToolbarButton :icon="Plus" label="ซูมเข้า" :show-label="false" @click="emit('zoom-in')" />
        </div>
        <SnapOptions
          v-if="inMore('snap')"
          :snap-to-grid="snapToGrid"
          :grid-snap-meters="gridSnapMeters"
          @toggle-snap="emit('toggle-snap')"
          @set-snap-size="emit('set-snap-size', $event)"
        />
        <div v-if="moreKeys.length" class="my-1 h-px bg-slate-200 dark:bg-slate-800"></div>
        <button type="button" :class="ROW_CLASS" @click="toggleDock">
          <component :is="dock === 'top' ? PanelBottom : PanelTop" class="w-4 h-4 shrink-0" />
          <span class="flex-1">{{ dock === 'top' ? 'ย้ายแถบไปด้านล่าง' : 'ย้ายแถบไปด้านบน' }}</span>
        </button>
      </div>
    </ToolbarMenu>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Plus,
  Minus,
  Shapes,
  Hand,
  Scan,
  Grid3x3,
  Ruler,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Check,
  PanelBottom,
  PanelTop
} from 'lucide-vue-next'
import ToolbarButton from './ToolbarButton.vue'
import ToolbarMenu from './ToolbarMenu.vue'
import AddObjectMenu from './AddObjectMenu.vue'
import SnapOptions from './SnapOptions.vue'

const props = defineProps({
  zoomLevel: { type: Number, required: true },
  snapToGrid: Boolean,
  gridSnapMeters: { type: Number, required: true },
  marketWidthMeters: { type: Number, required: true },
  marketHeightMeters: { type: Number, required: true },
  isPanMode: Boolean
})

const emit = defineEmits([
  'zoom-in',
  'zoom-out',
  'reset-zoom',
  'fit-to-screen',
  'toggle-snap',
  'set-snap-size',
  'toggle-pan-mode',
  'open-market-settings',
  'add-stall',
  'add-object'
])

const BAR_CLASS = 'flex items-center gap-1 h-12 px-2 w-max max-w-full overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-lg'
const DIVIDER_CLASS = 'mx-1 h-5 w-px shrink-0 bg-slate-200 dark:bg-slate-700'
const ROW_CLASS = 'w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'

function readStorage(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // ไม่มี localStorage ก็ยังใช้งานได้ แค่จำค่าไม่ได้
  }
}

// ─── สถานะของ toolbar (จำไว้ในเครื่อง) ─────────────────────────────────────
const collapsed = ref(readStorage('admin_toolbar_collapsed', 'false') === 'true')
const dock = ref(readStorage('admin_toolbar_position', 'top') === 'bottom' ? 'bottom' : 'top')
const openMenu = ref(null) // null | 'add' | 'snap' | 'more'

const addBtn = ref(null)
const snapBtn = ref(null)
const moreBtn = ref(null)

const menuPlacement = computed(() => (dock.value === 'bottom' ? 'top' : 'bottom'))
const zoomText = computed(() => `${Math.round(props.zoomLevel * 100)}%`)
const marketSizeText = computed(() => `${props.marketWidthMeters}×${props.marketHeightMeters}ม.`)

// ─── ซ่อนป้าย / ย้ายปุ่มเข้าเมนู "⋯" เมื่อที่ไม่พอ ──────────────────────────
// ลำดับที่ย้ายเข้า "⋯" ก่อน -> หลัง
const OVERFLOW_ORDER = ['size', 'fit', 'snap', 'pan', 'zoom']
// 0 = แสดงครบ, 1 = ซ่อนป้ายข้อความ, 2+ = ย้ายปุ่มเข้า "⋯" ทีละอัน
const overflowLevel = ref(0)

const labelsVisible = computed(() => overflowLevel.value === 0)
const moreKeys = computed(() => OVERFLOW_ORDER.slice(0, Math.max(0, overflowLevel.value - 1)))

function inMore(key) {
  return moreKeys.value.includes(key)
}

// ─── Actions ────────────────────────────────────────────────────────────────
function toggleMenu(name) {
  openMenu.value = openMenu.value === name ? null : name
}

function closeMenu() {
  openMenu.value = null
}

function runAndClose(eventName) {
  emit(eventName)
  closeMenu()
}

function handleAddObject(preset) {
  emit('add-object', preset)
  closeMenu()
}

function setCollapsed(value) {
  collapsed.value = value
  writeStorage('admin_toolbar_collapsed', String(value))
  closeMenu()
}

function toggleDock() {
  dock.value = dock.value === 'top' ? 'bottom' : 'top'
  writeStorage('admin_toolbar_position', dock.value)
  closeMenu()
}
</script>
