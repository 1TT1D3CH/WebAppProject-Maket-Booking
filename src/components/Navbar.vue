<template>
  <header class="bg-slate-800 border-b border-slate-700 sticky top-0 z-30 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- App Title & Mode Badge -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20">
            <LayoutGrid class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-lg font-bold text-white leading-tight flex items-center gap-2">
              {{ marketStore.marketName }}
              <span 
                class="px-2 py-0.5 text-xs font-medium rounded-full"
                :class="isRealFirebaseConfigured ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'"
              >
                {{ isRealFirebaseConfigured ? '🔥 Firebase Online' : '⚡ Local PoC Mode' }}
              </span>
            </h1>
            <p class="text-xs text-slate-400 hidden sm:block">
              ขนาดตลาดรวม: <strong class="text-sky-300 font-mono">{{ marketStore.marketWidthMeters }} x {{ marketStore.marketHeightMeters }} เมตร</strong> ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)
            </p>
          </div>
        </div>

        <!-- Mode Toggle Switcher -->
        <div class="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700/80">
          <button
            @click="marketStore.setMode('admin')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
            :class="marketStore.activeMode === 'admin' 
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
              : 'text-slate-400 hover:text-slate-200'"
          >
            <Wrench class="w-4 h-4" />
            <span>Admin Builder</span>
          </button>
          
          <button
            @click="marketStore.setMode('customer')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
            :class="marketStore.activeMode === 'customer' 
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
              : 'text-slate-400 hover:text-slate-200'"
          >
            <ShoppingBag class="w-4 h-4" />
            <span>Customer View</span>
          </button>
        </div>

        <!-- Action Tools & Buttons -->
        <div class="flex items-center space-x-2">
          <template v-if="marketStore.activeMode === 'admin'">
            <button
              @click="$emit('open-market-settings')"
              class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-sky-300 text-xs font-medium rounded-lg border border-slate-600 transition"
              title="ตั้งค่าความกว้าง x ความยาวตลาดรวม"
            >
              <Maximize2 class="w-4 h-4 text-sky-400" />
              <span>ขนาดตลาด {{ marketStore.marketWidthMeters }}x{{ marketStore.marketHeightMeters }}ม.</span>
            </button>

            <button
              @click="$emit('open-zone-manager')"
              class="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-600 transition"
              title="จัดการโซนสินค้าและราคา"
            >
              <Palette class="w-4 h-4 text-purple-400" />
              <span>จัดการโซน</span>
            </button>

            <button
              @click="marketStore.addStall()"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-lg shadow-md shadow-sky-600/20 transition"
            >
              <Plus class="w-4 h-4" />
              <span class="hidden sm:inline">เพิ่มแผงค้า</span>
            </button>

            <button
              @click="marketStore.saveLayoutToFirestore()"
              :disabled="marketStore.isSaving"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg shadow-md shadow-emerald-600/20 transition disabled:opacity-50"
            >
              <Save class="w-4 h-4" />
              <span class="hidden sm:inline">{{ marketStore.isSaving ? 'กำลังบันทึก...' : 'บันทึกผัง' }}</span>
            </button>
          </template>

          <button
            @click="$emit('open-firebase-config')"
            class="p-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-600 transition"
            title="ตั้งค่า Firebase Config"
          >
            <Settings class="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>

    <!-- Sub-bar Stats & Notifications -->
    <div class="bg-slate-900/90 border-t border-slate-800 px-4 py-2 text-xs">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-4 text-slate-400">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>ทั้งหมด: <strong class="text-white">{{ marketStore.stats.total }}</strong> แผง</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ว่าง: <strong class="text-emerald-400">{{ marketStore.stats.available }}</strong></span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>จองแล้ว: <strong class="text-amber-400">{{ marketStore.stats.booked }}</strong></span>
          </div>
          <div class="flex items-center gap-1.5 hidden md:flex">
            <span class="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>ปิดใช้งาน: <strong class="text-rose-400">{{ marketStore.stats.disabled }}</strong></span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div v-if="marketStore.lastSavedTime" class="text-slate-500 hidden sm:block">
            บันทึกล่าสุด: {{ marketStore.lastSavedTime }}
          </div>
          <button 
            v-if="marketStore.activeMode === 'admin'"
            @click="marketStore.resetToDefaults()" 
            class="text-slate-400 hover:text-rose-400 underline transition"
          >
            รีเซ็ตผังเริ่มต้น
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useMarketStore } from '../stores/marketStore'
import { isRealFirebaseConfigured } from '../firebase/config'
import { 
  LayoutGrid, 
  Wrench, 
  ShoppingBag, 
  Plus, 
  Save, 
  Palette, 
  Settings,
  Maximize2
} from 'lucide-vue-next'

const marketStore = useMarketStore()

defineEmits(['open-zone-manager', 'open-firebase-config', 'open-market-settings'])
</script>
