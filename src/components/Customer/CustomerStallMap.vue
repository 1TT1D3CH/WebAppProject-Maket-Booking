<template>
  <div class="flex flex-col h-[calc(100vh-120px)] bg-slate-950 select-none">
    
    <!-- Filter & Search Bar Header -->
    <div class="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-20 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        <!-- Search Input -->
        <div class="relative flex-1 min-w-[200px]">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            v-model="marketStore.searchQuery"
            type="text" 
            placeholder="ค้นหาหมายเลขแผงค้า (เช่น A01, B02)..."
            class="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <!-- Zone Filter Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            @click="marketStore.filterZoneId = 'all'"
            class="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition"
            :class="marketStore.filterZoneId === 'all' 
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
              : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'"
          >
            ทุกโซนสินค้า
          </button>
          
          <button
            v-for="zone in marketStore.zones"
            :key="zone.id"
            @click="marketStore.filterZoneId = zone.id"
            class="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 border"
            :class="marketStore.filterZoneId === zone.id 
              ? 'bg-slate-800 text-white border-emerald-500 shadow-sm' 
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700'"
          >
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: zone.color }"></span>
            <span>{{ zone.name }}</span>
          </button>
        </div>

        <!-- Status Filter Switcher -->
        <div class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            @click="marketStore.filterStatus = 'all'"
            class="px-2.5 py-1 rounded-lg text-xs font-medium transition"
            :class="marketStore.filterStatus === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'"
          >
            ทั้งหมด
          </button>
          <button
            @click="marketStore.filterStatus = 'available'"
            class="px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1"
            :class="marketStore.filterStatus === 'available' ? 'bg-emerald-600 text-white' : 'text-slate-400'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>เฉพาะว่าง</span>
          </button>
        </div>

      </div>
    </div>

    <!-- Customer Interactive Canvas Area -->
    <div class="flex-1 relative overflow-auto bg-slate-950 bg-grid-pattern p-6">
      
      <!-- Layout Container -->
      <div 
        class="relative mx-auto scale-90 origin-top-left sm:scale-100"
        :style="{
          width: `${marketStore.canvasWidthPx + 60}px`,
          height: `${marketStore.canvasHeightPx + 60}px`
        }"
      >
        
        <!-- Legend Overlay -->
        <div class="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur border border-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-4 text-xs">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded bg-emerald-500/80 border border-emerald-400"></span>
            <span class="text-slate-300">ว่าง (คลิกเพื่อจอง)</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded bg-amber-500/80 border border-amber-400"></span>
            <span class="text-slate-300">ถูกจองแล้ว</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span>
            <span class="text-slate-400">ปิดให้บริการ</span>
          </div>
        </div>

        <!-- Perimeter Area Box -->
        <div 
          class="absolute border-2 border-dashed border-slate-700/60 rounded-3xl pointer-events-none p-4"
          :style="{
            left: '10px',
            top: '10px',
            width: `${marketStore.canvasWidthPx}px`,
            height: `${marketStore.canvasHeightPx}px`
          }"
        >
          <div class="text-right text-xs text-slate-500 font-medium">
            ขนาดผังตลาด: {{ marketStore.marketWidthMeters }} x {{ marketStore.marketHeightMeters }} เมตร ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)
          </div>
        </div>

        <!-- STALL INTERACTIVE CARDS -->
        <div
          v-for="stall in marketStore.filteredStalls"
          :key="stall.id"
          class="absolute rounded-xl border-2 transition-all shadow-lg flex flex-col justify-between p-2.5 cursor-pointer group"
          :class="[
            selectedCustomerStallId === stall.id 
              ? 'ring-4 ring-emerald-400 border-emerald-300 scale-105 z-20 shadow-2xl' 
              : 'hover:scale-[1.02] border-slate-700 z-10',
            stall.status === 'available' ? 'hover:border-emerald-400' : '',
            stall.status === 'booked' ? 'cursor-not-allowed opacity-75' : '',
            stall.status === 'disabled' ? 'cursor-not-allowed opacity-50 bg-slate-900' : ''
          ]"
          :style="{
            left: `${stall.x + 10}px`,
            top: `${stall.y + 10}px`,
            width: `${stall.width}px`,
            height: `${stall.height}px`,
            backgroundColor: getCustomerStallBg(stall)
          }"
          @click="onSelectStall(stall)"
        >
          <!-- Zone Header Indicator -->
          <div 
            class="h-1.5 w-full rounded-full mb-1"
            :style="{ backgroundColor: marketStore.getZoneById(stall.zoneId)?.color }"
          ></div>

          <!-- Stall No & Price Tag -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-white font-mono drop-shadow">{{ stall.stallNo }}</span>
            <span 
              class="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold"
              :class="stall.status === 'available' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'"
            >
              ฿{{ stall.price }}
            </span>
          </div>

          <!-- Stall Meter Dimensions -->
          <div class="text-[10px] text-sky-300 font-mono">
            {{ marketStore.pxToM(stall.width) }}x{{ marketStore.pxToM(stall.height) }} ม.
          </div>

          <!-- Status & Booking Trigger -->
          <div class="flex items-center justify-between mt-auto">
            <span class="text-[10px] text-slate-300 truncate max-w-[80px]">
              {{ marketStore.getZoneById(stall.zoneId)?.name }}
            </span>
            <span 
              v-if="stall.status === 'available'"
              class="text-[10px] font-bold text-emerald-300 group-hover:underline flex items-center gap-0.5"
            >
              จองแผง <ChevronRight class="w-3 h-3" />
            </span>
            <span v-else-if="stall.status === 'booked'" class="text-[10px] text-amber-400 font-medium">
              ถูกจองแล้ว
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- Selected Stall Customer Action Bar Footer -->
    <div 
      v-if="selectedStall"
      class="bg-slate-900 border-t border-slate-800 p-4 sticky bottom-0 z-30 shadow-2xl"
    >
      <div class="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-md font-mono"
            :style="{ backgroundColor: marketStore.getZoneById(selectedStall.zoneId)?.color }"
          >
            {{ selectedStall.stallNo }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold text-white">แผงค้า {{ selectedStall.stallNo }}</h3>
              <span class="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md">
                {{ marketStore.getZoneById(selectedStall.zoneId)?.name }}
              </span>
              <span class="text-xs px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded-md border border-sky-500/20 font-mono">
                ขนาด {{ selectedStallMetrics.widthM }} x {{ selectedStallMetrics.heightM }} ม. ({{ selectedStallMetrics.areaSqM }} ตร.ม.)
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              ราคาเช่า: <strong class="text-emerald-400 font-mono">฿{{ selectedStall.price }}</strong> / วัน 
              <span v-if="selectedStall.notes" class="ml-2 text-slate-500">({{ selectedStall.notes }})</span>
            </p>
          </div>
        </div>

        <div>
          <button 
            v-if="selectedStall.status === 'available'"
            @click="$emit('open-booking-modal', selectedStall)"
            class="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 text-xs sm:text-sm"
          >
            <ShoppingBag class="w-4 h-4" />
            <span>ดำเนินการจองแผงนี้</span>
          </button>

          <span v-else class="text-xs text-amber-400 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/30">
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
import { Search, ChevronRight, ShoppingBag } from 'lucide-vue-next'

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

function getCustomerStallBg(stall) {
  if (stall.status === 'booked') return '#78350f22'
  if (stall.status === 'disabled') return '#0f172a'
  const zone = marketStore.getZoneById(stall.zoneId)
  return zone?.color ? `${zone.color}25` : '#0284c725'
}
</script>
