<template>
  <div
    class="relative w-full h-app-view overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col select-none transition-colors duration-300"
    :style="isMobile ? { paddingBottom: MOBILE_TOOLBAR_SPACE } : null"
  >
    
    <CanvasToolbar
      :zoom-level="marketStore.zoomLevel"
      :snap-to-grid="marketStore.snapToGrid"
      :grid-snap-meters="marketStore.gridSnapMeters"
      :market-width-meters="marketStore.marketWidthMeters"
      :market-height-meters="marketStore.marketHeightMeters"
      :is-pan-mode="isPanMode || isSpacePan"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @reset-zoom="resetZoom"
      @fit-to-screen="fitToScreen"
      @toggle-snap="marketStore.snapToGrid = !marketStore.snapToGrid"
      @set-snap-size="setSnapSize"
      @toggle-pan-mode="isPanMode = !isPanMode"
      @open-market-settings="$emit('open-market-settings')"
      @add-stall="marketStore.addStall()"
      @add-object="marketStore.addLayoutObject($event)"
      @pan-hold="setSpacePan"
    />

    <!-- โหมดเลื่อนผัง: ชั้นโปร่งใสรับการลากทั้งผัง (ลากโดนแผงก็เลื่อนผัง ไม่ย้ายแผง) -->
    <div
      v-if="isPanMode || isSpacePan"
      class="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
      @mousedown="startPan($event.clientX, $event.clientY)"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      @touchstart.prevent="$event.touches.length === 1 && startPan($event.touches[0].clientX, $event.touches[0].clientY)"
      @touchmove.prevent="handleTouchMove"
      @touchend="handleMouseUp"
    ></div>

    <!-- Canvas Area with Dynamic Grid (Light / Dark Grid) -->
    <div 
      ref="canvasContainer"
      class="w-full h-full relative cursor-grab active:cursor-grabbing overflow-auto transition-colors duration-300"
      :class="marketStore.isDark ? 'bg-slate-950 bg-dot-pattern' : 'bg-slate-50 bg-dot-pattern-light'"
      @mousedown="handleCanvasMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleMouseUp"
    >
      <div 
        class="absolute origin-top-left transition-transform duration-75"
        :style="{
          transform: `scale(${marketStore.zoomLevel}) translate(${marketStore.panOffset.x}px, ${marketStore.panOffset.y}px)`,
          width: `${marketStore.canvasWidthPx + 100}px`,
          height: `${marketStore.canvasHeightPx + 100}px`
        }"
      >
        <!-- Market Map Perimeter Boundary Box -->
        <div 
          class="absolute border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl pointer-events-none flex flex-col justify-between p-4 bg-white/40 dark:bg-slate-900/30 shadow-xs"
          :style="{
            left: '20px',
            top: '20px',
            width: `${marketStore.canvasWidthPx}px`,
            height: `${marketStore.canvasHeightPx}px`
          }"
        >
          <div class="flex items-start justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide">
            <span class="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold">
              📐 พื้นที่ตลาดรวม: {{ marketStore.marketWidthMeters }} × {{ marketStore.marketHeightMeters }} เมตร ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)
            </span>
          </div>

          <!-- Bottom Metric Ruler Indicator -->
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200/80 dark:border-slate-800 pt-2">
            <span>0.0 ม.</span>
            <span>กว้าง {{ marketStore.marketWidthMeters / 2 }} ม.</span>
            <span>กว้าง {{ marketStore.marketWidthMeters }} ม.</span>
          </div>
        </div>

        <!-- ─── ARCHITECTURE OBJECTS LAYER (Walkways, Entrances, Facilities, Obstacles) ─── -->
        <div
          v-for="obj in marketStore.layoutObjects"
          :key="obj.id"
          class="absolute rounded-2xl border-2 transition-all duration-200 cursor-move flex flex-col justify-between p-2 group shadow-sm backdrop-blur-xs"
          :class="[
            marketStore.selectedObjectId === obj.id 
              ? 'ring-4 ring-indigo-500 border-indigo-500 z-20 shadow-xl scale-[1.02]' 
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 z-10',
            obj.type === 'walkway' ? 'bg-slate-200/60 dark:bg-slate-800/60 border-dashed' : '',
            obj.type === 'entrance' ? 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-400' : '',
            obj.type === 'exit' ? 'bg-amber-50/90 dark:bg-amber-950/80 border-amber-400' : '',
            obj.type === 'restricted' ? 'bg-slate-300/80 dark:bg-slate-900/90 border-slate-400' : '',
            obj.type === 'facility' ? 'bg-sky-50/90 dark:bg-sky-950/80 border-sky-400' : ''
          ]"
          :style="{
            left: `${obj.x + 20}px`,
            top: `${obj.y + 20}px`,
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            transform: `rotate(${obj.rotation || 0}deg)`
          }"
          @mousedown.stop="startDragObject($event, obj)"
          @touchstart.stop="startTouchDragObject($event, obj)"
          @click.stop="marketStore.selectLayoutObject(obj.id)"
        >
          <!-- Active Selection Handles -->
          <template v-if="marketStore.selectedObjectId === obj.id">
            <div class="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md animate-pulse"></div>
            <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"></div>
          </template>

          <div class="flex items-center gap-1.5 font-bold text-xs text-slate-800 dark:text-slate-100">
            <component :is="getIconComponent(obj.styleProps?.icon)" class="w-4 h-4 shrink-0" :style="{ color: obj.styleProps?.color }" />
            <span class="truncate tracking-tight">{{ obj.label }}</span>
          </div>

          <div class="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-auto">
            <span>{{ marketStore.pxToM(obj.width) }}×{{ marketStore.pxToM(obj.height) }}ม.</span>
            <span v-if="obj.rotation" class="font-bold text-indigo-600 dark:text-indigo-400">{{ obj.rotation }}°</span>
          </div>

          <!-- RESIZE HANDLE -->
          <div 
            class="absolute -bottom-2 -right-2 w-5 h-5 bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 resize-handle rounded-full cursor-se-resize flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900 transition-all duration-150 z-30"
            :class="marketStore.selectedObjectId === obj.id ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'"
            title="ปรับขนาด"
            @mousedown.stop="startResizeObject($event, obj)"
            @touchstart.stop="startTouchResizeObject($event, obj)"
          >
            <div class="w-1.5 h-1.5 border-r-2 border-b-2 border-current"></div>
          </div>
        </div>

        <!-- ─── STALL BLOCKS LAYER ─── -->
        <div
          v-for="stall in marketStore.stalls"
          :key="stall.id"
          class="absolute rounded-2xl border-2 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:shadow-xl cursor-move flex flex-col justify-between p-2.5 group backdrop-blur-xs"
          :class="[
            marketStore.selectedStallId === stall.id 
              ? 'ring-4 ring-indigo-500/80 border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/80 z-20 shadow-xl scale-[1.02]' 
              : getStallStatusClasses(stall),
          ]"
          :style="{
            left: `${stall.x + 20}px`,
            top: `${stall.y + 20}px`,
            width: `${stall.width}px`,
            height: `${stall.height}px`
          }"
          @mousedown.stop="startDragStall($event, stall)"
          @touchstart.stop="startTouchDragStall($event, stall)"
          @click.stop="marketStore.selectStall(stall.id)"
        >
          <!-- Active Selection Corner Handle Decorators -->
          <template v-if="marketStore.selectedStallId === stall.id">
            <div class="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md animate-pulse"></div>
            <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"></div>
            <div class="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 border-2 border-white rounded-full z-30 shadow-md"></div>
          </template>

          <!-- Top Accent Zone Indicator Pill -->
          <div 
            class="h-1.5 w-full rounded-full mb-1 transition-transform group-hover:scale-x-105 shadow-xs"
            :style="{ backgroundColor: marketStore.getZoneById(stall.zoneId)?.color || '#94a3b8' }"
          ></div>

          <!-- Stall No & Real-World Dimensions -->
          <div class="flex items-center justify-between text-slate-900 dark:text-white font-semibold gap-1 leading-relaxed">
            <span class="text-xs sm:text-sm font-bold font-mono tracking-tight drop-shadow-xs pt-0.5">{{ stall.stallNo }}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-300 font-semibold shadow-xs">
              {{ marketStore.pxToM(stall.width) }}×{{ marketStore.pxToM(stall.height) }}ม.
            </span>
          </div>

          <!-- Price & Status Badge -->
          <div class="flex items-center justify-between mt-auto gap-1">
            <span 
              class="text-[10px] px-2 py-0.5 rounded-full font-bold border shadow-xs transition-colors"
              :class="{
                'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800': stall.status === 'available',
                'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700': stall.status === 'booked',
                'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800': stall.status === 'disabled'
              }"
            >
              {{ getStatusLabel(stall.status) }}
            </span>

            <span class="text-[11px] font-mono text-slate-800 dark:text-slate-200 font-bold">
              ฿{{ stall.price }}
            </span>
          </div>

          <!-- RESIZE HANDLE -->
          <div 
            class="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 text-white resize-handle rounded-full cursor-se-resize flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-950 transition-all duration-150 z-30"
            :class="marketStore.selectedStallId === stall.id ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'"
            title="ลากเพื่อปรับขนาด (Resize)"
            @mousedown.stop="startResizeStall($event, stall)"
            @touchstart.stop="startTouchResizeStall($event, stall)"
          >
            <div class="w-2 h-2 border-r-2 border-b-2 border-white"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Quick Stall Inspector Floating Pill Footer -->
    <div 
      v-if="marketStore.selectedStall"
      :style="inspectorStyle"
      class="absolute bottom-2 inset-x-2 sm:bottom-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 max-h-[50dvh] overflow-y-auto z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 px-3 sm:px-5 py-2.5 rounded-2xl shadow-xl flex flex-col lg:flex-row lg:items-center gap-x-4 gap-y-2.5 text-xs animate-slide-up text-slate-800 dark:text-slate-200"
    >
      <div class="flex items-center gap-2">
        <span 
          class="w-3 h-3 rounded-full shadow-xs"
          :style="{ backgroundColor: marketStore.getZoneById(marketStore.selectedStall.zoneId)?.color }"
        ></span>
        <span class="font-bold text-slate-900 dark:text-white text-sm">แผง {{ marketStore.selectedStall.stallNo }}</span>
        <span class="text-slate-500 dark:text-slate-400 font-medium">({{ marketStore.getZoneById(marketStore.selectedStall.zoneId)?.name }})</span>
      </div>

      <div class="hidden lg:block h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0"></div>

      <!-- Stall Real-World Metric Info -->
      <div class="grid grid-cols-3 lg:flex lg:items-center gap-x-3 gap-y-1 font-mono text-slate-700 dark:text-slate-300 font-semibold [&>span]:whitespace-nowrap">
        <span>กว้าง: <strong class="text-indigo-600 dark:text-indigo-400">{{ selectedMetrics.widthM }} ม.</strong></span>
        <span>ยาว: <strong class="text-indigo-600 dark:text-indigo-400">{{ selectedMetrics.heightM }} ม.</strong></span>
        <span>พื้นที่: <strong class="text-emerald-600 dark:text-emerald-400">{{ selectedMetrics.areaSqM }} ตร.ม.</strong></span>
      </div>

      <div class="hidden lg:block h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0"></div>

      <div class="flex items-stretch gap-2 [&>button]:whitespace-nowrap [&>button]:min-h-[44px] [&>button]:inline-flex [&>button]:items-center [&>button]:justify-center [&>button:first-child]:flex-1 lg:[&>button]:min-h-0 lg:[&>button:first-child]:flex-none">
        <button 
          @click="$emit('open-editor')"
          class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          แก้ไขรายละเอียด
        </button>
        <button 
          @click="marketStore.removeStall(marketStore.selectedStall.id)"
          class="p-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl transition-all duration-150 hover:scale-105"
          title="ลบแผงค้านี้ (Delete)"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Quick Architecture Object Inspector Floating Pill Footer -->
    <div 
      v-if="marketStore.selectedObject"
      :style="inspectorStyle"
      class="absolute bottom-2 inset-x-2 sm:bottom-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 max-h-[50dvh] overflow-y-auto z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 px-3 sm:px-5 py-2.5 rounded-2xl shadow-xl flex flex-col lg:flex-row lg:items-center gap-x-4 gap-y-2.5 text-xs animate-slide-up text-slate-800 dark:text-slate-200"
    >
      <div class="flex items-center gap-2">
        <component :is="getIconComponent(marketStore.selectedObject.styleProps?.icon)" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span class="font-bold text-slate-900 dark:text-white text-sm">{{ marketStore.selectedObject.label }}</span>
      </div>

      <div class="hidden lg:block h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0"></div>

      <div class="grid grid-cols-2 lg:flex lg:items-center gap-x-3 gap-y-1 font-mono text-slate-700 dark:text-slate-300 font-semibold [&>span]:whitespace-nowrap">
        <span>ขนาด: <strong>{{ selectedObjectMetrics.widthM }} × {{ selectedObjectMetrics.heightM }} ม.</strong></span>
        <span>หมุน: <strong class="text-indigo-600 dark:text-indigo-400">{{ marketStore.selectedObject.rotation || 0 }}°</strong></span>
      </div>

      <div class="hidden lg:block h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0"></div>

      <div class="flex items-stretch gap-2 [&>button]:whitespace-nowrap [&>button]:min-h-[44px] [&>button]:inline-flex [&>button]:items-center [&>button]:justify-center [&>button:first-child]:flex-1 lg:[&>button]:min-h-0 lg:[&>button:first-child]:flex-none">
        <button 
          @click="marketStore.rotateLayoutObject(marketStore.selectedObject.id)"
          class="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-all duration-150"
          title="หมุนวัตถุ 90°"
        >
          <RotateCw class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </button>

        <button 
          @click="$emit('open-object-editor')"
          class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          แก้ไขวัตถุ
        </button>

        <button 
          @click="marketStore.removeLayoutObject(marketStore.selectedObject.id)"
          class="p-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl transition-all duration-150 hover:scale-105"
          title="ลบวัตถุนี้"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { Trash2, RotateCw } from 'lucide-vue-next'
import CanvasToolbar from '../canvas/CanvasToolbar.vue'
import { getIconComponent } from '../../utils/icons'
import { useMediaQuery } from '../../composables/useMediaQuery'
import { isShortcutBlocked } from '../../utils/keyboard'

const marketStore = useMarketStore()
const canvasContainer = ref(null)

defineEmits(['open-editor', 'open-object-editor', 'open-market-settings'])

// มือถือ: toolbar ติดขอบล่างจอ (สูง ~60px) ต้องเว้นที่ไม่ให้ทับผังและแถบข้อมูลแผง
const isMobile = useMediaQuery('(max-width: 639px)')
const MOBILE_TOOLBAR_SPACE = 'calc(60px + env(safe-area-inset-bottom))'
const inspectorStyle = computed(() =>
  isMobile.value ? { bottom: 'calc(72px + env(safe-area-inset-bottom))' } : null
)

// โหมดเลื่อนผัง (toggle จาก toolbar) และเลื่อนชั่วคราวขณะกด Space ค้าง
const isPanMode = ref(false)
const isSpacePan = ref(false)

function setSpacePan(held) {
  if (held && (isDragging.value || isResizing.value)) return
  isSpacePan.value = held
  if (!held && !isPanMode.value) isPanning.value = false
}

function startPan(clientX, clientY) {
  isPanning.value = true
  panStart.value = {
    x: clientX - marketStore.panOffset.x,
    y: clientY - marketStore.panOffset.y
  }
}

// Drag & Resize State
const isDragging = ref(false)
const isResizing = ref(false)
const isPanning = ref(false)
const dragType = ref('stall') // 'stall' | 'object'

const dragTarget = ref(null)
const startPos = ref({ x: 0, y: 0 })
const initialRect = ref({ x: 0, y: 0, w: 0, h: 0 })
const panStart = ref({ x: 0, y: 0 })

const selectedMetrics = computed(() => {
  return marketStore.getStallMetrics(marketStore.selectedStall)
})

const selectedObjectMetrics = computed(() => {
  return marketStore.getObjectMetrics(marketStore.selectedObject)
})

function getStallStatusClasses(stall) {
  if (stall.status === 'booked') {
    return 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 opacity-90 hover:border-slate-400'
  }
  if (stall.status === 'disabled') {
    return 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 border-slate-300 dark:border-slate-700 opacity-60'
  }
  // Available
  return 'bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:border-emerald-500 shadow-xs'
}

function getStatusLabel(status) {
  switch (status) {
    case 'available': return 'ว่าง'
    case 'booked': return 'จองแล้ว'
    case 'disabled': return 'ปิดบริการ'
    default: return status
  }
}

// Zoom controls
function zoomIn() {
  marketStore.zoomLevel = Math.min(2.0, marketStore.zoomLevel + 0.15)
}
function zoomOut() {
  marketStore.zoomLevel = Math.max(0.4, marketStore.zoomLevel - 0.15)
}
function resetZoom() {
  marketStore.zoomLevel = 1.0
  marketStore.panOffset = { x: 0, y: 0 }
}

// ซูมให้ทั้งผังพอดีกับพื้นที่ที่มองเห็น แล้วจัดให้อยู่กลาง
function fitToScreen() {
  const el = canvasContainer.value
  if (!el) return
  const mapW = marketStore.canvasWidthPx
  const mapH = marketStore.canvasHeightPx
  const padding = 40
  const fit = Math.min(
    (el.clientWidth - padding * 2) / mapW,
    (el.clientHeight - padding * 2) / mapH
  )
  const zoom = Math.round(Math.min(2.0, Math.max(0.4, fit)) * 100) / 100
  marketStore.zoomLevel = zoom
  // แผนที่เริ่มที่ 20px และ translate ถูกคูณด้วย scale
  marketStore.panOffset = {
    x: Math.round((el.clientWidth - mapW * zoom) / (2 * zoom) - 20),
    y: Math.round((el.clientHeight - mapH * zoom) / (2 * zoom) - 20)
  }
}

function setSnapSize(size) {
  marketStore.gridSnapMeters = size
  marketStore.snapToGrid = true
  marketStore.markUnsaved()
}

// Touch Event Handlers
const touchStartDistance = ref(0)

function handleTouchStart(e) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    if (e.target === canvasContainer.value || e.target.classList.contains('bg-dot-pattern') || e.target.classList.contains('bg-dot-pattern-light')) {
      marketStore.deselectAll()
      isPanning.value = true
      panStart.value = { 
        x: touch.clientX - marketStore.panOffset.x, 
        y: touch.clientY - marketStore.panOffset.y 
      }
    }
  } else if (e.touches.length === 2) {
    isPanning.value = false
    const dx = e.touches[0].clientX - e.touches[1].clientX
    const dy = e.touches[0].clientY - e.touches[1].clientY
    touchStartDistance.value = Math.hypot(dx, dy)
  }
}

function handleTouchMove(e) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    if (isDragging.value && dragTarget.value) {
      const dx = (touch.clientX - startPos.value.x) / marketStore.zoomLevel
      const dy = (touch.clientY - startPos.value.y) / marketStore.zoomLevel
      if (dragType.value === 'stall') {
        marketStore.updateStallPosition(dragTarget.value.id, initialRect.value.x + dx, initialRect.value.y + dy)
      } else {
        marketStore.updateLayoutObjectPosition(dragTarget.value.id, initialRect.value.x + dx, initialRect.value.y + dy)
      }
    } else if (isResizing.value && dragTarget.value) {
      const dx = (touch.clientX - startPos.value.x) / marketStore.zoomLevel
      const dy = (touch.clientY - startPos.value.y) / marketStore.zoomLevel
      if (dragType.value === 'stall') {
        marketStore.updateStallSize(dragTarget.value.id, initialRect.value.w + dx, initialRect.value.h + dy)
      } else {
        marketStore.updateLayoutObjectSize(dragTarget.value.id, initialRect.value.w + dx, initialRect.value.h + dy)
      }
    } else if (isPanning.value) {
      marketStore.panOffset = {
        x: touch.clientX - panStart.value.x,
        y: touch.clientY - panStart.value.y
      }
    }
  } else if (e.touches.length === 2 && touchStartDistance.value > 0) {
    const dx = e.touches[0].clientX - e.touches[1].clientX
    const dy = e.touches[0].clientY - e.touches[1].clientY
    const dist = Math.hypot(dx, dy)
    const delta = (dist - touchStartDistance.value) * 0.005
    marketStore.zoomLevel = Math.min(2.5, Math.max(0.4, marketStore.zoomLevel + delta))
    touchStartDistance.value = dist
  }
}

// Drag & Resize Stall Handlers
function startTouchDragStall(e, stall) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    marketStore.snapshotStallIfNew(stall.id)
    isDragging.value = true
    dragType.value = 'stall'
    dragTarget.value = stall
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
  }
}

function startTouchResizeStall(e, stall) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    marketStore.snapshotStallIfNew(stall.id)
    isResizing.value = true
    dragType.value = 'stall'
    dragTarget.value = stall
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
  }
}

function startDragStall(e, stall) {
  if (e.button !== 0) return
  marketStore.snapshotStallIfNew(stall.id)
  isDragging.value = true
  dragType.value = 'stall'
  dragTarget.value = stall
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
}

function startResizeStall(e, stall) {
  if (e.button !== 0) return
  marketStore.snapshotStallIfNew(stall.id)
  isResizing.value = true
  dragType.value = 'stall'
  dragTarget.value = stall
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
}

// Drag & Resize Architecture Object Handlers
function startDragObject(e, obj) {
  if (e.button !== 0) return
  isDragging.value = true
  dragType.value = 'object'
  dragTarget.value = obj
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
}

function startTouchDragObject(e, obj) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    isDragging.value = true
    dragType.value = 'object'
    dragTarget.value = obj
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
  }
}

function startResizeObject(e, obj) {
  if (e.button !== 0) return
  isResizing.value = true
  dragType.value = 'object'
  dragTarget.value = obj
  startPos.value = { x: e.clientX, y: e.clientY }
  initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
}

function startTouchResizeObject(e, obj) {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    isResizing.value = true
    dragType.value = 'object'
    dragTarget.value = obj
    startPos.value = { x: touch.clientX, y: touch.clientY }
    initialRect.value = { x: obj.x, y: obj.y, w: obj.width, h: obj.height }
  }
}

function handleCanvasMouseDown(e) {
  if (e.target === canvasContainer.value || e.target.classList.contains('bg-dot-pattern') || e.target.classList.contains('bg-dot-pattern-light')) {
    marketStore.deselectAll()
    isPanning.value = true
    panStart.value = { 
      x: e.clientX - marketStore.panOffset.x, 
      y: e.clientY - marketStore.panOffset.y 
    }
  }
}

function handleMouseMove(e) {
  if (isDragging.value && dragTarget.value) {
    const dx = (e.clientX - startPos.value.x) / marketStore.zoomLevel
    const dy = (e.clientY - startPos.value.y) / marketStore.zoomLevel
    const newX = initialRect.value.x + dx
    const newY = initialRect.value.y + dy

    if (dragType.value === 'stall') {
      marketStore.updateStallPosition(dragTarget.value.id, newX, newY)
    } else {
      marketStore.updateLayoutObjectPosition(dragTarget.value.id, newX, newY)
    }
  } else if (isResizing.value && dragTarget.value) {
    const dx = (e.clientX - startPos.value.x) / marketStore.zoomLevel
    const dy = (e.clientY - startPos.value.y) / marketStore.zoomLevel
    const newW = initialRect.value.w + dx
    const newH = initialRect.value.h + dy

    if (dragType.value === 'stall') {
      marketStore.updateStallSize(dragTarget.value.id, newW, newH)
    } else {
      marketStore.updateLayoutObjectSize(dragTarget.value.id, newW, newH)
    }
  } else if (isPanning.value) {
    marketStore.panOffset = {
      x: e.clientX - panStart.value.x,
      y: e.clientY - panStart.value.y
    }
  }
}

function handleMouseUp() {
  isDragging.value = false
  isResizing.value = false
  isPanning.value = false
  dragTarget.value = null
  touchStartDistance.value = 0
}

// ─── Keyboard: ลูกศรเลื่อนแผง/วัตถุที่เลือก, Delete ลบ ─────────────────────────
const ARROW_DIRECTIONS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0]
}

function handleKeyDown(e) {
  if (isShortcutBlocked(e)) return
  if (isDragging.value || isResizing.value) return

  const stall = marketStore.selectedStall
  const obj = marketStore.selectedObject
  if (!stall && !obj) return

  const dir = ARROW_DIRECTIONS[e.key]
  if (dir) {
    e.preventDefault()
    // สแนปเปิด: ทีละช่องกริด, ปิด: ทีละ 0.1 ม. / กด Shift: ทีละ 1 ม.
    const step = e.shiftKey
      ? marketStore.mToPx(1)
      : marketStore.snapToGrid && marketStore.gridSizePx > 0
        ? marketStore.gridSizePx
        : marketStore.mToPx(0.1)
    const [dx, dy] = dir

    if (stall) {
      marketStore.snapshotStallIfNew(stall.id)
      marketStore.updateStallPosition(stall.id, stall.x + dx * step, stall.y + dy * step)
    } else {
      marketStore.updateLayoutObjectPosition(obj.id, obj.x + dx * step, obj.y + dy * step)
    }
    return
  }

  if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault()
    if (stall) {
      if (stall.status === 'booked' && !window.confirm(`แผง ${stall.stallNo} มีผู้จองอยู่ ต้องการลบแผงนี้หรือไม่?`)) return
      marketStore.removeStall(stall.id)
    } else {
      marketStore.removeLayoutObject(obj.id)
    }
  }
}

// จอเล็ก/iPad: เปิดมาให้ผังพอดีจอ และ fit ใหม่ตอนหมุนจอ ถ้าผู้ใช้ยังไม่ได้ซูม/เลื่อนเอง
let lastFit = null
function autoFit() {
  if (window.innerWidth >= 1024) return
  const untouched = !lastFit ||
    (marketStore.zoomLevel === lastFit.zoom &&
      marketStore.panOffset.x === lastFit.x && marketStore.panOffset.y === lastFit.y)
  if (!untouched) return
  fitToScreen()
  lastFit = { zoom: marketStore.zoomLevel, x: marketStore.panOffset.x, y: marketStore.panOffset.y }
}
let fitTimer = null
function onResizeFit() {
  clearTimeout(fitTimer)
  fitTimer = setTimeout(autoFit, 150)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('resize', onResizeFit)
  window.addEventListener('orientationchange', onResizeFit)
  nextTick(autoFit)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('resize', onResizeFit)
  window.removeEventListener('orientationchange', onResizeFit)
  clearTimeout(fitTimer)
})
</script>
