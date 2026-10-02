<template>
  <div class="flex flex-col h-[calc(100vh-112px)] bg-slate-50 dark:bg-slate-950 select-none transition-colors duration-300">
    
    <!-- Filter & Search Bar Header (Glassmorphism Clean Style) -->
    <div class="glass-panel dark:glass-panel-dark border-b border-slate-200/80 dark:border-slate-800/80 p-3 sm:p-4 sticky top-0 z-20 shadow-xs transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        <!-- Search Input -->
        <div class="relative flex-1 min-w-[180px]">
          <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            v-model="marketStore.searchQuery"
            type="text" 
            placeholder="ค้นหาหมายเลขแผงค้า (เช่น A01, B02)..."
            class="w-full bg-slate-100/90 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 focus:outline-none transition-all shadow-inner"
          />
        </div>

        <!-- Zone Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            @click="marketStore.filterZoneId = 'all'"
            class="px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-150"
            :class="marketStore.filterZoneId === 'all' 
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'"
          >
            ทุกโซนสินค้า
          </button>
          
          <button
            v-for="zone in marketStore.zones"
            :key="zone.id"
            @click="marketStore.filterZoneId = zone.id"
            class="px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 border"
            :class="marketStore.filterZoneId === zone.id 
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'"
          >
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: zone.color }"></span>
            <span>{{ zone.name }}</span>
          </button>
        </div>

        <!-- Status Filter Switcher -->
        <div class="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <button
            @click="marketStore.filterStatus = 'all'"
            class="px-3 py-1 rounded-xl text-xs font-semibold transition-all"
            :class="marketStore.filterStatus === 'all' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            ทั้งหมด
          </button>
          <button
            @click="marketStore.filterStatus = 'available'"
            class="px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            :class="marketStore.filterStatus === 'available' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
            <span>เฉพาะว่าง</span>
          </button>
        </div>

      </div>
    </div>

    <!-- Customer Interactive Canvas Area with Dynamic Dot-Grid Background -->
    <div 
      class="flex-1 relative overflow-auto p-4 sm:p-6 transition-colors duration-300"
      :class="marketStore.isDark ? 'bg-slate-950 bg-dot-pattern' : 'bg-slate-50 bg-dot-pattern-light'"
    >
      
      <!-- Layout Container -->
      <div 
        class="relative mx-auto scale-90 origin-top-left sm:scale-100"
        :style="{
          width: `${marketStore.canvasWidthPx + 60}px`,
          height: `${marketStore.canvasHeightPx + 60}px`
        }"
      >
        
        <!-- Legend Overlay Floating Pill -->
        <div class="absolute top-4 left-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-3 rounded-2xl shadow-md flex items-center gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-lg bg-emerald-500 border border-emerald-400"></span>
            <span class="font-semibold">ว่าง (แตะเพื่อจอง)</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></span>
            <span class="font-medium">ถูกจองแล้ว</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-lg bg-rose-100 dark:bg-rose-950 border border-rose-200 dark:border-rose-800"></span>
            <span class="text-rose-600 dark:text-rose-400 font-medium">ปิดให้บริการ</span>
          </div>
        </div>

        <!-- Perimeter Boundary Box -->
        <div 
          class="absolute border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl pointer-events-none p-4 bg-white/40 dark:bg-slate-900/30 shadow-xs"
          :style="{
            left: '10px',
            top: '10px',
            width: `${marketStore.canvasWidthPx}px`,
            height: `${marketStore.canvasHeightPx}px`
          }"
        >
          <div class="text-right text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
            ขนาดผังตลาด: {{ marketStore.marketWidthMeters }} × {{ marketStore.marketHeightMeters }} ม. ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)
          </div>
        </div>

        <!-- ─── ARCHITECTURE OBJECTS LAYER (Landmarks & Walkways for Customer View) ─── -->
        <div
          v-for="obj in marketStore.layoutObjects"
          :key="obj.id"
          class="absolute rounded-2xl border transition-all pointer-events-auto flex items-center justify-center p-2 shadow-xs backdrop-blur-xs"
          :class="[
            obj.type === 'walkway' ? 'bg-slate-200/50 dark:bg-slate-800/50 border-dashed border-slate-300 dark:border-slate-700' : '',
            obj.type === 'entrance' ? 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-400/80' : '',
            obj.type === 'exit' ? 'bg-amber-50/90 dark:bg-amber-950/80 border-amber-400/80' : '',
            obj.type === 'restricted' ? 'bg-slate-200/80 dark:bg-slate-900/90 border-slate-300 dark:border-slate-700' : '',
            obj.type === 'facility' ? 'bg-sky-50/90 dark:bg-sky-950/80 border-sky-400/80' : ''
          ]"
          :style="{
            left: `${obj.x + 10}px`,
            top: `${obj.y + 10}px`,
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            transform: `rotate(${obj.rotation || 0}deg)`
          }"
          @click="showFacilityToast(obj)"
        >
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
            <component :is="getIconComponent(obj.styleProps?.icon)" class="w-4 h-4 shrink-0" :style="{ color: obj.styleProps?.color }" />
            <span class="truncate tracking-tight text-[11px]">{{ obj.label }}</span>
          </div>
        </div>

        <!-- ─── STALL INTERACTIVE CARDS ─── -->
        <div
          v-for="stall in marketStore.filteredStalls"
          :key="stall.id"
          class="absolute rounded-2xl border-2 transition-all duration-200 shadow-xs hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between p-2.5 group backdrop-blur-xs"
          :class="[
            selectedCustomerStallId === stall.id 
              ? 'ring-4 ring-indigo-600 border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/90 scale-105 z-20 shadow-xl' 
              : getCustomerStallClasses(stall),
          ]"
          :style="{
            left: `${stall.x + 10}px`,
            top: `${stall.y + 10}px`,
            width: `${stall.width}px`,
            height: `${stall.height}px`
          }"
          @click="onSelectStall(stall)"
        >
          <!-- Zone Header Pill Line -->
          <div 
            class="h-1.5 w-full rounded-full mb-1 transition-transform group-hover:scale-x-105 shadow-xs"
            :style="{ backgroundColor: marketStore.getZoneById(stall.zoneId)?.color }"
          ></div>

          <!-- Stall No & Price Badge -->
          <div class="flex items-center justify-between leading-relaxed">
            <span class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono tracking-tight drop-shadow-xs pt-0.5">{{ stall.stallNo }}</span>
            <span 
              class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-transform group-hover:scale-105 shadow-xs"
              :class="stall.status === 'available' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'"
            >
              ฿{{ stall.price }}
            </span>
          </div>

          <!-- Stall Meter Dimensions -->
          <div class="my-1">
            <span class="text-[10px] px-1.5 py-0.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono font-semibold shadow-xs">
              {{ marketStore.pxToM(stall.width) }}×{{ marketStore.pxToM(stall.height) }} ม.
            </span>
          </div>

          <!-- Status & Booking Action Hint -->
          <div class="flex items-center justify-between mt-auto">
            <span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[80px]">
              {{ marketStore.getZoneById(stall.zoneId)?.name }}
            </span>
            <span 
              v-if="stall.status === 'available'"
              class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5"
            >
              จองแผง <ChevronRight class="w-3 h-3" />
            </span>
            <span v-else-if="stall.status === 'booked'" class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
              จองแล้ว
            </span>
            <span v-else-if="stall.status === 'disabled'" class="text-[10px] text-rose-500 dark:text-rose-400 font-semibold">
              ปิดบริการ
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- Mobile & Desktop Sliding Bottom Sheet / Floating Footer -->
    <div 
      v-if="selectedStall"
      class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 fixed bottom-0 inset-x-0 z-40 shadow-2xl animate-slide-up rounded-t-3xl sm:rounded-none text-slate-800 dark:text-slate-100"
    >
      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <!-- Stall Info Block -->
        <div class="flex items-start sm:items-center gap-3">
          <div 
            class="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-md font-mono shrink-0"
            :style="{ backgroundColor: marketStore.getZoneById(selectedStall.zoneId)?.color }"
          >
            {{ selectedStall.stallNo }}
          </div>
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">แผงค้า {{ selectedStall.stallNo }}</h3>
              <span class="text-[11px] px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 font-medium">
                {{ marketStore.getZoneById(selectedStall.zoneId)?.name }}
              </span>
              <span class="text-[11px] px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 font-mono font-semibold">
                ขนาด {{ selectedStallMetrics.widthM }} × {{ selectedStallMetrics.heightM }} ม. ({{ selectedStallMetrics.areaSqM }} ตร.ม.)
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">
              อัตราค่าเช่า: <strong class="text-emerald-700 dark:text-emerald-400 font-mono text-sm font-bold">฿{{ selectedStall.price }}</strong> / วัน 
              <span v-if="selectedStall.notes" class="ml-2 text-slate-500 dark:text-slate-400 font-normal">({{ selectedStall.notes }})</span>
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <div class="flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
          <button
            @click="selectedCustomerStallId = null"
            class="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition sm:hidden"
          >
            ปิด
          </button>

          <button 
            v-if="selectedStall.status === 'available'"
            @click="$emit('open-booking-modal', selectedStall)"
            class="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <ShoppingBag class="w-4 h-4" />
            <span>ดำเนินการจองแผงนี้</span>
          </button>

          <span v-else class="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium">
            แผงนี้ไม่สามารถจองได้ ({{ selectedStall.status === 'booked' ? 'มีผู้จองแล้ว' : 'ปิดใช้งาน' }})
          </span>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { 
  Search, 
  ChevronRight, 
  ShoppingBag, 
  DoorOpen, 
  LogOut, 
  Footprints, 
  Square, 
  Bath, 
  Mic, 
  Trash2 as TrashIcon, 
  CreditCard, 
  HelpCircle, 
  Cross 
} from 'lucide-vue-next'

const emit = defineEmits(['open-booking-modal'])
const marketStore = useMarketStore()
const selectedCustomerStallId = ref(null)

const selectedStall = computed(() => {
  return marketStore.stalls.find(s => s.id === selectedCustomerStallId.value)
})

const selectedStallMetrics = computed(() => {
  return marketStore.getStallMetrics(selectedStall.value)
})

function onSelectStall(stall) {
  selectedCustomerStallId.value = stall.id
}

function showFacilityToast(obj) {
  marketStore.showNotification(`📍 ${obj.label}`, 'info')
}

function getCustomerStallClasses(stall) {
  if (stall.status === 'booked') {
    return 'bg-slate-100/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 opacity-75 cursor-not-allowed'
  }
  if (stall.status === 'disabled') {
    return 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 border-slate-300 dark:border-slate-700 opacity-50 cursor-not-allowed'
  }
  // Available
  return 'bg-emerald-50/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300/90 dark:border-emerald-800 hover:border-emerald-500 hover:bg-emerald-100/80 shadow-xs'
}

function getIconComponent(iconName) {
  switch (iconName) {
    case 'door-open': return DoorOpen
    case 'log-out': return LogOut
    case 'footprints': return Footprints
    case 'bath': return Bath
    case 'mic': return Mic
    case 'trash-2': return TrashIcon
    case 'credit-card': return CreditCard
    case 'help-circle': return HelpCircle
    case 'cross': return Cross
    default: return Square
  }
}
</script>
