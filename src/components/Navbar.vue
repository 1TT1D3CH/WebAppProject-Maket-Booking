<template>
  <header class="glass-panel dark:glass-panel-dark sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors duration-300">
    
    <!-- Global Header Row 1 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-3">
        
        <!-- App Title & Database Status Badge -->
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-none shrink-0 transition-transform hover:scale-105">
            <LayoutGrid class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {{ marketStore.marketName }}
              <span 
                class="px-2.5 py-0.5 text-[10px] font-semibold rounded-full hidden sm:inline-flex items-center gap-1.5 transition-colors"
                :class="isRealFirebaseConfigured 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="isRealFirebaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"></span>
                {{ isRealFirebaseConfigured ? 'Firestore Online' : 'Local Mode' }}
              </span>
            </h1>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block">
              ขนาดผังรวม: <strong class="text-indigo-600 dark:text-indigo-400 font-mono font-semibold">{{ marketStore.marketWidthMeters }} × {{ marketStore.marketHeightMeters }} ม.</strong> ({{ marketStore.totalMarketAreaSqM }} ตร.ม.)
            </p>
          </div>
        </div>

        <!-- Mode Toggle Switcher (Admin Builder / Customer Map) -->
        <div class="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-inner">
          <button
            @click="marketStore.setMode('admin')"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            :class="marketStore.activeMode === 'admin' 
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <Wrench class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Admin Builder</span>
          </button>
          
          <button
            @click="marketStore.setMode('customer')"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            :class="marketStore.activeMode === 'customer' 
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200 dark:shadow-none' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            <ShoppingBag class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Customer Map</span>
          </button>
        </div>

        <!-- User Profile, Theme Switcher, Notifications & Config -->
        <div class="flex items-center space-x-2">
          
          <!-- 🌓 Theme Switcher Button (Dark / Light Mode) -->
          <button 
            @click="marketStore.toggleTheme()"
            class="p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
            :title="marketStore.isDark ? 'สลับเป็น Light Mode' : 'สลับเป็น Dark Mode'"
          >
            <Sun v-if="marketStore.isDark" class="w-4 h-4 text-amber-400" />
            <Moon v-else class="w-4 h-4 text-indigo-600" />
          </button>

          <!-- Notifications Trigger Button with Badge -->
          <button 
            @click="$emit('open-notifications')"
            class="relative p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all duration-200 hover:scale-105 active:scale-95"
            title="การแจ้งเตือน"
          >
            <Bell class="w-4 h-4 text-amber-500" />
            <span 
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse"
            >
              {{ unreadCount }}
            </span>
          </button>

          <!-- User Role Badge & Auth Button -->
          <button 
            @click="$emit('open-auth')"
            class="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 hover:border-slate-300 dark:hover:border-slate-700"
          >
            <span class="text-xs">
              {{ authStore.userRole === 'owner' ? '👑 Owner' : authStore.userRole === 'admin' ? '🛡️ Admin' : '🛍️ Tenant' }}
            </span>
            <span class="max-w-[80px] sm:max-w-[120px] truncate hidden sm:inline text-slate-500 dark:text-slate-400 font-medium">
              {{ authStore.userName }}
            </span>
          </button>

          <!-- Firebase Config Settings -->
          <button
            @click="$emit('open-firebase-config')"
            class="p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs transition-all duration-200 hover:scale-105"
            title="ตั้งค่า Firebase Config"
          >
            <Settings class="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>

    <!-- Row 2: Admin Editing Toolbar & Summary Metrics Bar -->
    <div class="bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200/60 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 text-xs backdrop-blur-sm transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        <!-- Summary Metrics Counter (Includes ทั้งหมด, ว่าง, จองแล้ว, ปิดบริการ) -->
        <div class="flex items-center gap-2.5 sm:gap-3 text-slate-600 dark:text-slate-400 flex-wrap">
          <div class="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>ทั้งหมด: <strong class="text-slate-900 dark:text-white font-mono font-bold">{{ marketStore.stats.total }}</strong> แผง</span>
          </div>
          <div class="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-xl border border-emerald-200/80 dark:border-emerald-800 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ว่าง: <strong class="font-mono font-bold text-emerald-700 dark:text-emerald-400">{{ marketStore.stats.available }}</strong></span>
          </div>
          <div class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>จองแล้ว: <strong class="font-mono font-bold text-slate-700 dark:text-slate-300">{{ marketStore.stats.booked }}</strong></span>
          </div>
          <div class="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 px-2.5 py-1 rounded-xl border border-rose-200/80 dark:border-rose-800 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>ปิดบริการ: <strong class="font-mono font-bold text-rose-700 dark:text-rose-400">{{ marketStore.stats.disabled }}</strong></span>
          </div>

          <!-- Revenue Stats for Owner & Admin -->
          <div v-if="authStore.isAdmin || authStore.isOwner" class="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-mono bg-emerald-100/80 dark:bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-xs font-semibold">
            <span>💰 รายได้รวม: <strong>฿{{ marketStore.stats.totalRevenue.toLocaleString() }}</strong></span>
          </div>
        </div>

        <!-- Canvas Toolbar Action Buttons (Only shown in Admin mode) -->
        <div v-if="marketStore.activeMode === 'admin'" class="flex items-center space-x-2">
          
          <!-- Secondary Ghost Button: Market Size -->
          <button
            @click="$emit('open-market-settings')"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-800 transition shadow-xs"
            title="ตั้งค่าขนาดตลาดรวม"
          >
            <Maximize2 class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{{ marketStore.marketWidthMeters }}×{{ marketStore.marketHeightMeters }}ม.</span>
          </button>

          <!-- Secondary Ghost Button: Zone Manager -->
          <button
            @click="$emit('open-zone-manager')"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-800 transition shadow-xs"
            title="จัดการโซนสินค้า"
          >
            <Palette class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>จัดการโซน</span>
          </button>

          <!-- Secondary Ghost Button: Add Stall -->
          <button
            @click="marketStore.addStall()"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200/90 dark:border-slate-800 transition shadow-xs"
            title="เพิ่มแผงใหม่"
          >
            <Plus class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span class="hidden sm:inline">เพิ่มแผง</span>
          </button>

          <!-- PRIMARY ACTION ACCENT BUTTON: Save Layout -->
          <button
            @click="marketStore.saveLayoutToFirestore()"
            :disabled="marketStore.isSaving"
            class="relative flex items-center gap-1.5 px-4 py-1.5 font-bold text-xs rounded-xl shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50"
            :class="marketStore.hasUnsavedChanges
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-200 animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'"
          >
            <Save class="w-4 h-4" />
            <span v-if="marketStore.isSaving">กำลังบันทึก...</span>
            <span v-else-if="marketStore.hasUnsavedChanges">บันทึกผัง *</span>
            <span v-else>บันทึกผัง</span>
            <span
              v-if="marketStore.hasUnsavedChanges && !marketStore.isSaving"
              class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-950 rounded-full"
            ></span>
          </button>

          <button 
            @click="marketStore.resetToDefaults()" 
            class="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 underline transition text-[11px] ml-1 hidden lg:inline font-medium"
          >
            รีเซ็ตผัง
          </button>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useMarketStore } from '../stores/marketStore'
import { useAuthStore } from '../stores/authStore'
import { useNotificationStore } from '../stores/notificationStore'
import { isRealFirebaseConfigured } from '../firebase/config'
import { 
  LayoutGrid, 
  Wrench, 
  ShoppingBag, 
  Plus, 
  Save, 
  Palette, 
  Settings,
  Maximize2,
  Bell,
  Sun,
  Moon
} from 'lucide-vue-next'

const marketStore = useMarketStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

defineEmits([
  'open-zone-manager', 
  'open-firebase-config', 
  'open-market-settings',
  'open-auth',
  'open-notifications'
])

const unreadCount = computed(() => {
  return notificationStore.unreadCount(authStore.currentUser?.uid, authStore.isAdmin || authStore.isOwner)
})
</script>
