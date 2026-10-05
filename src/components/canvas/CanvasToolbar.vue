<template>
  <!-- ══════════════════════════════════════════════════════════════════════════
       COMPACT, COLLAPSIBLE & DOCKABLE CANVAS TOOLBAR (toolbar1.md)
       ══════════════════════════════════════════════════════════════════════════ -->
  <div 
    ref="toolbarEl"
    class="absolute z-20 transition-all duration-300 select-none pointer-events-auto"
    :class="toolbarPosition === 'bottom' ? 'bottom-4 left-4' : 'top-4 left-4'"
  >
    <!-- 👁️ Collapsed Mini-Pill State (เมื่อพับเก็บ ให้เหลือแถบเล็ก ไม่บังผัง) -->
    <div 
      v-if="isToolbarCollapsed" 
      class="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1.5 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105"
    >
      <button 
        @click="toggleToolbarCollapse"
        class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 rounded-xl text-xs font-bold transition shadow-xs"
        title="ขยายแถบเครื่องมือ (Expand Controls)"
      >
        <Layers class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span>เครื่องมือผัง</span>
        <ChevronDown v-if="toolbarPosition === 'top'" class="w-3.5 h-3.5" />
        <ChevronUp v-else class="w-3.5 h-3.5" />
      </button>

      <span class="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 px-1">
        {{ Math.round(zoomLevel * 100) }}%
      </span>

      <button 
        @click="emit('zoom-in')" 
        class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition active:scale-95"
        title="ซูมเข้า (+)"
      >
        <ZoomIn class="w-3.5 h-3.5" />
      </button>
      <button 
        @click="emit('zoom-out')" 
        class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition active:scale-95"
        title="ซูมออก (-)"
      >
        <ZoomOut class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- 📐 Expanded Integrated Controls (Compact & Clean Toolbar) -->
    <div 
      v-else 
      class="flex flex-col gap-1.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-2 rounded-2xl shadow-xl transition-all duration-200 max-w-[calc(100vw-32px)]"
    >
      <!-- Row 1: Viewport Controls (Zoom, Snap, Dimensions & Dock Switcher) -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <!-- Toggle Collapse / Minimize -->
        <button 
          @click="toggleToolbarCollapse"
          class="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all active:scale-95 flex items-center gap-1 text-xs"
          title="พับเก็บแถบเครื่องมือเพื่อดูผังเต็มตา"
        >
          <ChevronUp v-if="toolbarPosition === 'top'" class="w-4 h-4" />
          <ChevronDown v-else class="w-4 h-4" />
          <span class="text-[11px] font-semibold hidden sm:inline">พับเก็บ</span>
        </button>

        <div class="w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto"></div>

        <!-- Zoom Controls -->
        <div class="flex items-center bg-slate-100/80 dark:bg-slate-800/80 rounded-xl p-0.5 border border-slate-200/60 dark:border-slate-700/60">
          <button 
            @click="emit('zoom-out')" 
            class="p-1 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition active:scale-95"
            title="Zoom Out (-)"
          >
            <ZoomOut class="w-3.5 h-3.5" />
          </button>
          <span class="text-xs font-mono text-slate-700 dark:text-slate-200 w-11 text-center font-bold">
            {{ Math.round(zoomLevel * 100) }}%
          </span>
          <button 
            @click="emit('zoom-in')" 
            class="p-1 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition active:scale-95"
            title="Zoom In (+)"
          >
            <ZoomIn class="w-3.5 h-3.5" />
          </button>
          <button 
            @click="emit('reset-zoom')" 
            class="px-1.5 py-0.5 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] rounded-lg font-medium transition"
            title="รีเซ็ตสเกล (Reset 100%)"
          >
            1:1
          </button>
        </div>

        <div class="w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto"></div>

        <!-- Grid Snap Toggle -->
        <button
          @click="emit('toggle-snap')"
          class="px-2.5 py-1 text-xs rounded-xl border transition-all duration-150 flex items-center gap-1.5 active:scale-95"
          :class="snapToGrid 
            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 font-semibold shadow-xs' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
          :title="`สแนปกริด ${gridSnapMeters} เมตร (${snapToGrid ? 'เปิด' : 'ปิด'})`"
        >
          <Grid class="w-3.5 h-3.5" />
          <span>Snap {{ gridSnapMeters }}ม.</span>
        </button>

        <!-- Docking Placement Toggle (Top / Bottom) -->
        <button
          @click="toggleToolbarPosition"
          class="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition"
          :title="toolbarPosition === 'top' ? 'ย้ายแถบไปไว้ด้านล่างหน้าจอ' : 'ย้ายแถบไปไว้ด้านบนหน้าจอ'"
        >
          <Move class="w-3.5 h-3.5" />
        </button>

        <!-- Market Dimensions Summary -->
        <div class="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden md:flex items-center gap-1 ml-auto px-1.5">
          <Maximize2 class="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
          <span>{{ marketWidthMeters }}×{{ marketHeightMeters }}ม.</span>
        </div>
      </div>

      <!-- Row 2: Category Dropdowns & Icon-First Creation Suite -->
      <div class="flex items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/80 overflow-x-auto scrollbar-none relative">
        <!-- Quick Add Stall Button -->
        <button
          @click="emit('add-stall')"
          class="px-3 py-1 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center gap-1.5 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95 shrink-0"
          title="เพิ่มแผงค้าใหม่"
        >
          <Plus class="w-3.5 h-3.5" />
          <span>เพิ่มแผง</span>
        </button>

        <div class="w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto shrink-0"></div>

        <!-- Category Dropdowns (ทางเข้า-ออก, สิ่งอำนวยความสะดวก, โครงสร้าง) -->
        <div 
          v-for="cat in PRESET_CATEGORIES" 
          :key="cat.id"
          class="relative shrink-0"
        >
          <button
            @click.stop="toggleCategoryDropdown(cat.id)"
            class="px-2.5 py-1 text-xs rounded-xl border transition-all flex items-center gap-1.5 active:scale-95"
            :class="activeDropdown === cat.id
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 font-semibold shadow-xs'
              : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 font-medium'"
          >
            <component :is="cat.icon" class="w-3.5 h-3.5" :style="{ color: activeDropdown === cat.id ? 'currentColor' : cat.color }" />
            <span>{{ cat.label }}</span>
            <ChevronDown class="w-3 h-3 transition-transform" :class="{ 'rotate-180': activeDropdown === cat.id }" />
          </button>

          <!-- Dropdown Menu Popover -->
          <Transition name="fade">
            <div
              v-if="activeDropdown === cat.id"
              class="absolute left-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl p-2 w-56 space-y-1 animate-slide-up"
              :class="toolbarPosition === 'bottom' ? 'bottom-full mb-2' : 'top-full mt-2'"
              @click.stop
            >
              <div class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 py-0.5 tracking-wider">
                {{ cat.label }}
              </div>
              <button
                v-for="preset in cat.presets"
                :key="preset.type + preset.subType"
                @click="handleAddObjectFromDropdown(preset)"
                class="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs transition flex items-center justify-between group/item"
              >
                <div class="flex items-center gap-2">
                  <component :is="getIconComponent(preset.styleProps.icon)" class="w-4 h-4 shrink-0" :style="{ color: preset.styleProps.color }" />
                  <span class="font-medium text-[11px] group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">{{ preset.label }}</span>
                </div>
                <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                  {{ preset.widthM }}×{{ preset.heightM }}ม.
                </span>
              </button>
            </div>
          </Transition>
        </div>

        <div class="w-px h-4 bg-slate-200 dark:bg-slate-800 my-auto shrink-0 hidden sm:block"></div>

        <!-- Icon-First Quick Buttons with Tooltip (1-Click for Top Items) -->
        <div class="hidden sm:flex items-center gap-1 shrink-0">
          <div 
            v-for="preset in QUICK_PRESETS" 
            :key="'quick-' + preset.type + preset.subType"
            class="relative group/tooltip"
          >
            <button
              @click="emit('add-object', preset)"
              class="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all hover:scale-105 active:scale-95"
            >
              <component :is="getIconComponent(preset.styleProps.icon)" class="w-3.5 h-3.5" :style="{ color: preset.styleProps.color }" />
            </button>

            <!-- Tailwind Tooltip -->
            <div 
              class="absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/90 dark:bg-slate-800 text-white text-[10px] font-medium rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap z-50"
              :class="toolbarPosition === 'bottom' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'"
            >
              {{ preset.label }} ({{ preset.widthM }}×{{ preset.heightM }}ม.)
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ARCHITECTURE_PRESETS } from '../../types/market'
import { getIconComponent } from '../../utils/icons'
import {
  ZoomIn,
  ZoomOut,
  Grid,
  Maximize2,
  DoorOpen,
  Square,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Plus,
  Move
} from 'lucide-vue-next'

defineProps({
  zoomLevel: { type: Number, required: true },
  snapToGrid: Boolean,
  gridSnapMeters: { type: Number, required: true },
  marketWidthMeters: { type: Number, required: true },
  marketHeightMeters: { type: Number, required: true }
})

const emit = defineEmits(['zoom-in', 'zoom-out', 'reset-zoom', 'toggle-snap', 'add-stall', 'add-object'])

const toolbarEl = ref(null)

// ─── Toolbar State (Collapsible, Dockable & Categories) ────────────────────────
const isToolbarCollapsed = ref(localStorage.getItem('admin_toolbar_collapsed') === 'true')
const toolbarPosition = ref(localStorage.getItem('admin_toolbar_position') || 'top')
const activeDropdown = ref(null)

function toggleToolbarCollapse() {
  isToolbarCollapsed.value = !isToolbarCollapsed.value
  localStorage.setItem('admin_toolbar_collapsed', String(isToolbarCollapsed.value))
  activeDropdown.value = null
}

function toggleToolbarPosition() {
  toolbarPosition.value = toolbarPosition.value === 'top' ? 'bottom' : 'top'
  localStorage.setItem('admin_toolbar_position', toolbarPosition.value)
  activeDropdown.value = null
}

function toggleCategoryDropdown(catId) {
  activeDropdown.value = activeDropdown.value === catId ? null : catId
}

function handleAddObjectFromDropdown(preset) {
  emit('add-object', preset)
  activeDropdown.value = null
}

// Grouped Categories according to toolbar1.md
const PRESET_CATEGORIES = computed(() => [
  {
    id: 'access',
    label: 'ทางเข้า/ออก',
    icon: DoorOpen,
    color: '#10b981',
    presets: ARCHITECTURE_PRESETS.filter(p => ['entrance', 'exit', 'walkway'].includes(p.type))
  },
  {
    id: 'facility',
    label: 'สิ่งอำนวยความสะดวก',
    icon: HelpCircle,
    color: '#0ea5e9',
    presets: ARCHITECTURE_PRESETS.filter(p => p.type === 'facility' || p.subType === 'restroom')
  },
  {
    id: 'structure',
    label: 'โครงสร้างหลัก',
    icon: Square,
    color: '#8b5cf6',
    presets: ARCHITECTURE_PRESETS.filter(p => p.type === 'restricted' && p.subType !== 'restroom')
  }
])

// Quick Top-used Presets for 1-click icon mode
const QUICK_PRESETS = computed(() => {
  return [
    ARCHITECTURE_PRESETS.find(p => p.type === 'walkway') || ARCHITECTURE_PRESETS[2],
    ARCHITECTURE_PRESETS.find(p => p.type === 'entrance') || ARCHITECTURE_PRESETS[0],
    ARCHITECTURE_PRESETS.find(p => p.subType === 'restroom') || ARCHITECTURE_PRESETS[4],
    ARCHITECTURE_PRESETS.find(p => p.subType === 'stage') || ARCHITECTURE_PRESETS[5],
    ARCHITECTURE_PRESETS.find(p => p.subType === 'atm') || ARCHITECTURE_PRESETS[7]
  ].filter(Boolean)
})

// คลิกนอก toolbar ให้ปิด dropdown
function handleOutsidePointer(e) {
  if (toolbarEl.value && !toolbarEl.value.contains(e.target)) activeDropdown.value = null
}
onMounted(() => document.addEventListener('pointerdown', handleOutsidePointer))
onBeforeUnmount(() => document.removeEventListener('pointerdown', handleOutsidePointer))
</script>
