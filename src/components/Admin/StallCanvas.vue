<template>
  <div class="relative w-full h-[calc(100vh-120px)] overflow-hidden bg-slate-950 flex flex-col select-none">
    
    <!-- Canvas Floating Toolbar -->
    <div class="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-800/90 backdrop-blur border border-slate-700 p-1.5 rounded-xl shadow-xl">
      <!-- Zoom Controls -->
      <button 
        @click="zoomOut" 
        class="p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition"
        title="Zoom Out (-)"
      >
        <ZoomOut class="w-4 h-4" />
      </button>
      <span class="text-xs font-mono text-slate-300 w-12 text-center">{{ Math.round(marketStore.zoomLevel * 100) }}%</span>
      <button 
        @click="zoomIn" 
        class="p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition"
        title="Zoom In (+)"
      >
        <ZoomIn class="w-4 h-4" />
      </button>
      <button 
        @click="resetZoom" 
        class="px-2 py-1 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition"
        title="Reset Zoom"
      >
        Reset
      </button>

      <div class="w-px h-5 bg-slate-700 my-auto mx-1"></div>

      <!-- Grid Snap Toggle -->
      <button
        @click="marketStore.snapToGrid = !marketStore.snapToGrid"
        class="px-2.5 py-1 text-xs rounded-lg border transition flex items-center gap-1.5"
        :class="marketStore.snapToGrid 
          ? 'bg-sky-500/20 text-sky-400 border-sky-500/40 font-medium' 
          : 'bg-slate-700/50 text-slate-400 border-slate-600'"
      >
        <Grid class="w-3.5 h-3.5" />
        <span>Snap {{ marketStore.gridSnapMeters }} ม. ({{ marketStore.snapToGrid ? 'ON' : 'OFF' }})</span>
      </button>

      <div class="w-px h-5 bg-slate-700 my-auto mx-1 hidden sm:block"></div>

      <!-- Market Size Summary Badge -->
      <div class="text-xs text-slate-300 font-mono hidden sm:flex items-center gap-1.5 px-2">
        <Maximize2 class="w-3.5 h-3.5 text-sky-400" />
        <span>ขนาดผังตลาด: <strong>{{ marketStore.marketWidthMeters }} x {{ marketStore.marketHeightMeters }} เมตร</strong> ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)</span>
      </div>
    </div>

    <!-- Canvas Area -->
    <div 
      ref="canvasContainer"
      class="w-full h-full relative cursor-grab active:cursor-grabbing overflow-auto bg-slate-950 bg-grid-pattern"
      @mousedown="handleCanvasMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
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
          class="absolute border-2 border-dashed border-slate-700/80 rounded-3xl pointer-events-none flex flex-col justify-between p-4"
          :style="{
            left: '20px',
            top: '20px',
            width: `${marketStore.canvasWidthPx}px`,
            height: `${marketStore.canvasHeightPx}px`
          }"
        >
          <div class="flex items-start justify-between text-xs font-bold text-slate-500 tracking-wider">
            <span class="flex items-center gap-1 text-sky-400">
              📏 ผังตลาดรวม: {{ marketStore.marketWidthMeters }} x {{ marketStore.marketHeightMeters }} เมตร ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)
            </span>
            <span class="text-slate-400">🚪 ทางเข้า - ออก หลัก (Main Entrance)</span>
          </div>

          <!-- Bottom Metric Ruler Indicator -->
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-600 border-t border-slate-800 pt-2">
            <span>0.0 เมตร</span>
            <span>กว้าง {{ marketStore.marketWidthMeters / 2 }} เมตร</span>
            <span>กว้าง {{ marketStore.marketWidthMeters }} เมตร</span>
          </div>
        </div>

        <!-- STALL BLOCKS (Positioned inside the perimeter) -->
        <div
          v-for="stall in marketStore.stalls"
          :key="stall.id"
          class="absolute rounded-xl border-2 transition-all shadow-lg cursor-move flex flex-col justify-between p-2 group"
          :class="[
            marketStore.selectedStallId === stall.id 
              ? 'ring-4 ring-sky-400/80 border-sky-300 z-20 shadow-2xl scale-[1.01]' 
              : 'border-slate-700 hover:border-slate-500 z-10',
            stall.status === 'booked' ? 'opacity-90' : '',
            stall.status === 'disabled' ? 'bg-slate-900/90 border-slate-800' : ''
          ]"
          :style="{
            left: `${stall.x + 20}px`,
            top: `${stall.y + 20}px`,
            width: `${stall.width}px`,
            height: `${stall.height}px`,
            backgroundColor: getStallBgColor(stall)
          }"
          @mousedown.stop="startDragStall($event, stall)"
          @click.stop="marketStore.selectStall(stall.id)"
        >
          <!-- Top Accent Zone Line -->
          <div 
            class="h-1.5 w-full rounded-full mb-1"
            :style="{ backgroundColor: marketStore.getZoneById(stall.zoneId)?.color || '#94a3b8' }"
          ></div>

          <!-- Stall No & Real-World Dimensions in Meters -->
          <div class="flex items-center justify-between text-white font-semibold">
            <span class="text-sm tracking-wide font-mono drop-shadow">{{ stall.stallNo }}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-black/50 font-mono text-sky-300 font-normal">
              {{ marketStore.pxToM(stall.width) }}x{{ marketStore.pxToM(stall.height) }}ม.
            </span>
          </div>

          <!-- Price & Status -->
          <div class="flex items-center justify-between mt-auto">
            <span 
              class="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              :class="{
                'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40': stall.status === 'available',
                'bg-amber-500/30 text-amber-300 border border-amber-500/40': stall.status === 'booked',
                'bg-rose-500/30 text-rose-300 border border-rose-500/40': stall.status === 'disabled'
              }"
            >
              {{ getStatusLabel(stall.status) }}
            </span>

            <span class="text-[11px] font-mono text-slate-200">
              ฿{{ stall.price }}
            </span>
          </div>

          <!-- RESIZE HANDLE (Bottom-Right corner) -->
          <div 
            class="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            :class="marketStore.selectedStallId === stall.id ? 'opacity-100' : ''"
            @mousedown.stop="startResizeStall($event, stall)"
          >
            <div class="w-2.5 h-2.5 border-r-2 border-b-2 border-white rounded-br"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Quick Inspector Footer / Selection Status in Meters -->
    <div 
      v-if="marketStore.selectedStall"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-800/95 backdrop-blur border border-slate-700 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-4 text-xs"
    >
      <div class="flex items-center gap-2">
        <span 
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: marketStore.getZoneById(marketStore.selectedStall.zoneId)?.color }"
        ></span>
        <span class="font-bold text-white text-sm">แผง {{ marketStore.selectedStall.stallNo }}</span>
        <span class="text-slate-400">({{ marketStore.getZoneById(marketStore.selectedStall.zoneId)?.name }})</span>
      </div>

      <div class="h-4 w-px bg-slate-700"></div>

      <!-- Stall Real-World Metric Info -->
      <div class="flex items-center gap-3 font-mono text-slate-200">
        <span>กว้าง: <strong class="text-sky-300">{{ selectedMetrics.widthM }} ม.</strong></span>
        <span>ยาว: <strong class="text-sky-300">{{ selectedMetrics.heightM }} ม.</strong></span>
        <span>พื้นที่: <strong class="text-emerald-400">{{ selectedMetrics.areaSqM }} ตร.ม.</strong></span>
        <span class="text-slate-500 hidden md:inline">(พิกัด X: {{ selectedMetrics.xM }}ม., Y: {{ selectedMetrics.yM }}ม.)</span>
      </div>

      <div class="h-4 w-px bg-slate-700"></div>

      <div class="flex items-center gap-1.5">
        <button 
          @click="$emit('open-editor')"
          class="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg transition"
        >
          แก้ไขรายละเอียด
        </button>
        <button 
          @click="marketStore.removeStall(marketStore.selectedStall.id)"
          class="px-2 py-1 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg transition"
          title="ลบแผงค้านี้"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { ZoomIn, ZoomOut, Grid, Trash2, Maximize2 } from 'lucide-vue-next'

const marketStore = useMarketStore()
const canvasContainer = ref(null)

defineEmits(['open-editor'])

// Drag & Resize State
const isDragging = ref(false)
const isResizing = ref(false)
const isPanning = ref(false)

const dragTarget = ref(null)
const startPos = ref({ x: 0, y: 0 })
const initialStallRect = ref({ x: 0, y: 0, w: 0, h: 0 })
const panStart = ref({ x: 0, y: 0 })

const selectedMetrics = computed(() => {
  return marketStore.getStallMetrics(marketStore.selectedStall)
})

function getStallBgColor(stall) {
  const zone = marketStore.getZoneById(stall.zoneId)
  const baseHex = zone?.color || '#3b82f6'
  return `${baseHex}22`
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

// Mouse Event Handlers
function startDragStall(e, stall) {
  if (e.button !== 0) return
  isDragging.value = true
  dragTarget.value = stall
  startPos.value = { x: e.clientX, y: e.clientY }
  initialStallRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
}

function startResizeStall(e, stall) {
  if (e.button !== 0) return
  isResizing.value = true
  dragTarget.value = stall
  startPos.value = { x: e.clientX, y: e.clientY }
  initialStallRect.value = { x: stall.x, y: stall.y, w: stall.width, h: stall.height }
}

function handleCanvasMouseDown(e) {
  if (e.target === canvasContainer.value || e.target.classList.contains('bg-grid-pattern')) {
    marketStore.selectedStallId = null
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
    
    const newX = initialStallRect.value.x + dx
    const newY = initialStallRect.value.y + dy
    
    marketStore.updateStallPosition(dragTarget.value.id, newX, newY)
  } else if (isResizing.value && dragTarget.value) {
    const dx = (e.clientX - startPos.value.x) / marketStore.zoomLevel
    const dy = (e.clientY - startPos.value.y) / marketStore.zoomLevel
    
    const newW = initialStallRect.value.w + dx
    const newH = initialStallRect.value.h + dy
    
    marketStore.updateStallSize(dragTarget.value.id, newW, newH)
  } else if (isPanning.value) {
    marketStore.panOffset = {
      x: e.clientX - panStart.value.x,
      y: e.clientY - panStart.value.y
    }
  }
}

function handleMouseUp() {
  if (isDragging.value || isResizing.value) {
    marketStore.saveLayoutToFirestore()
  }
  isDragging.value = false
  isResizing.value = false
  isPanning.value = false
  dragTarget.value = null
}
</script>
