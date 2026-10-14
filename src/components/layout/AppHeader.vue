<template>
  <header class="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs sticky top-0 z-30 transition-colors duration-300">
    <div class="h-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 md:gap-4 lg:gap-6">

      <!-- Left: Brand + status dot -->
      <div class="flex items-center gap-2.5 min-w-0 shrink-0">
        <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-none shrink-0 transition-transform hover:scale-105">
          <LayoutGrid class="w-5 h-5" />
        </div>
        <div class="flex items-center gap-1.5 min-w-0">
          <span
            class="text-sm font-bold text-slate-900 dark:text-white truncate"
            style="max-width: 180px"
            :title="marketStore.marketName"
          >{{ marketStore.marketName }}</span>
          <span
            class="w-2 h-2 rounded-full shrink-0"
            :class="isOnline ? 'bg-emerald-500' : 'bg-rose-500'"
            :title="isOnline ? 'เชื่อมต่อแล้ว' : 'ออฟไลน์'"
            role="status"
          ></span>
          <span v-if="!isOnline" class="text-[11px] font-semibold text-rose-600 dark:text-rose-400 whitespace-nowrap">ออฟไลน์</span>
          <span class="sr-only">{{ isOnline ? 'เชื่อมต่อแล้ว' : 'ออฟไลน์' }}</span>
        </div>
      </div>

      <!-- Center: Nav Tabs (desktop/tablet, hidden on mobile) -->
      <HeaderNavTabs
        class="hidden md:flex flex-1 min-w-0 justify-center"
        :tabs="tabs"
        :active-mode="marketStore.activeMode"
        @change-mode="marketStore.setMode($event)"
      />

      <!-- Right: actions -->
      <div class="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
        <!-- การจองของฉัน (desktop) -->
        <button
          v-if="authStore.isAuthenticated"
          @click="$emit('open-my-bookings')"
          class="hidden md:flex relative items-center gap-1.5 h-9 px-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="การจองของฉัน"
          aria-label="การจองของฉัน"
        >
          <ClipboardList class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span class="hidden lg:inline text-xs font-semibold whitespace-nowrap">การจองของฉัน</span>
          <span
            v-if="myBookingsStore.needsSlipCount > 0"
            class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >{{ myBookingsStore.needsSlipCount }}</span>
        </button>

        <!-- Notifications -->
        <button
          @click="$emit('open-notifications')"
          class="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="การแจ้งเตือน"
          aria-label="การแจ้งเตือน"
        >
          <Bell class="w-4 h-4" />
          <span
            v-if="unreadCount > 0"
            class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse"
          >{{ unreadCount }}</span>
        </button>

        <!-- User Menu (desktop) -->
        <UserMenu class="hidden md:block" @open-auth="$emit('open-auth')" />

        <!-- Firebase Config (dev only, desktop) -->
        <button
          v-if="isDev"
          @click="$emit('open-firebase-config')"
          class="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="ตั้งค่า Firebase Config"
          aria-label="ตั้งค่า Firebase Config"
        >
          <Settings class="w-4 h-4" />
        </button>

        <!-- Mobile: hamburger -->
        <button
          class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="เมนู"
          :aria-expanded="drawerOpen"
          @click="drawerOpen = !drawerOpen"
        >
          <component :is="drawerOpen ? X : MenuIcon" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="drawerOpen" class="fixed inset-0 z-[55] md:hidden">
          <div class="absolute inset-0 bg-black/40" @click="drawerOpen = false"></div>
          <div class="absolute top-0 right-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto flex flex-col">
            <!-- Drawer header -->
            <div class="h-14 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
              <span class="text-sm font-semibold text-slate-900 dark:text-white">เมนู</span>
              <button
                @click="drawerOpen = false"
                class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="ปิดเมนู"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- User info -->
            <div v-if="authStore.isAuthenticated" class="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {{ (authStore.userName || '?').charAt(0).toUpperCase() }}
                </span>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">{{ authStore.userName }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ mobileRoleLabel }}</p>
                </div>
              </div>
            </div>

            <!-- Tabs navigation -->
            <nav v-if="tabs.length" class="px-2 py-2 border-b border-slate-100 dark:border-slate-800" aria-label="เมนูหลัก">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="marketStore.setMode(tab.key); drawerOpen = false"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                :class="marketStore.activeMode === tab.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
                :aria-current="marketStore.activeMode === tab.key ? 'page' : undefined"
              >
                <component :is="tab.icon" class="w-5 h-5 shrink-0" />
                <span class="flex-1">{{ tab.label }}</span>
                <span
                  v-if="tab.badge"
                  class="min-w-[20px] h-5 px-1.5 rounded-full bg-rose-600 text-white text-[11px] font-bold font-mono flex items-center justify-center"
                >{{ tab.badge }}</span>
              </button>
            </nav>

            <!-- การจองของฉัน -->
            <div class="px-2 py-1.5">
              <button
                v-if="authStore.isAuthenticated"
                @click="$emit('open-my-bookings'); drawerOpen = false"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ClipboardList class="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span class="flex-1">การจองของฉัน</span>
                <span
                  v-if="myBookingsStore.needsSlipCount > 0"
                  class="min-w-[20px] h-5 px-1.5 rounded-full bg-amber-500 text-white text-[11px] font-bold font-mono flex items-center justify-center"
                >{{ myBookingsStore.needsSlipCount }}</span>
              </button>
            </div>

            <div class="my-0.5 h-px mx-4 bg-slate-100 dark:bg-slate-800"></div>

            <!-- Theme toggle -->
            <div class="px-2 py-1.5">
              <button
                @click="marketStore.toggleTheme()"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Sun v-if="marketStore.isDark" class="w-5 h-5 text-amber-400" />
                <Moon v-else class="w-5 h-5 text-indigo-600" />
                <span>{{ marketStore.isDark ? 'โหมดสว่าง' : 'โหมดมืด' }}</span>
              </button>
            </div>

            <!-- Firebase config (dev only) -->
            <div v-if="isDev" class="px-2 py-1.5">
              <button
                @click="$emit('open-firebase-config'); drawerOpen = false"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings class="w-5 h-5" />
                <span>ตั้งค่า Firebase</span>
              </button>
            </div>

            <div class="flex-1"></div>

            <!-- Login / Logout -->
            <div class="px-2 py-3 border-t border-slate-100 dark:border-slate-800">
              <button
                v-if="authStore.isAuthenticated"
                @click="authStore.logout(); drawerOpen = false"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut class="w-5 h-5" />
                <span>ออกจากระบบ</span>
              </button>
              <button
                v-else
                @click="$emit('open-auth'); drawerOpen = false"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
              >
                <LogIn class="w-5 h-5" />
                <span>เข้าสู่ระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { useAuthStore } from '../../stores/authStore'
import { useNotificationStore } from '../../stores/notificationStore'
import { useMyBookingsStore } from '../../stores/myBookingsStore'
import { useSlipReviewStore } from '../../stores/slipReviewStore'
import { isRealFirebaseConfigured } from '../../firebase/config'
import HeaderNavTabs from './HeaderNavTabs.vue'
import UserMenu from './UserMenu.vue'
import {
  LayoutGrid,
  ClipboardList,
  Bell,
  Settings,
  Menu as MenuIcon,
  X,
  Sun,
  Moon,
  LogOut,
  LogIn,
  Wrench,
  Users,
  ReceiptText,
  History,
  BarChart3,
  ShoppingBag
} from 'lucide-vue-next'

const isDev = import.meta.env.DEV
const marketStore = useMarketStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const myBookingsStore = useMyBookingsStore()
const slipReviewStore = useSlipReviewStore()

defineEmits(['open-notifications', 'open-my-bookings', 'open-auth', 'open-firebase-config'])

const isOnline = computed(() => isRealFirebaseConfigured)
const unreadCount = computed(() => notificationStore.unreadCount(authStore.currentUser?.uid))
const drawerOpen = ref(false)

const tabs = computed(() => {
  if (!authStore.isAdmin) return []
  const list = [
    { key: 'admin', icon: Wrench, label: 'ผังตลาด' },
    { key: 'members', icon: Users, label: 'สมาชิก' },
    { key: 'slips', icon: ReceiptText, label: 'ตรวจสลิป', badge: slipReviewStore.actionCount || 0 },
    { key: 'audit', icon: History, label: 'บันทึกการทำงาน' },
  ]
  if (authStore.isOwner) {
    list.push({ key: 'revenue', icon: BarChart3, label: 'รายงานรายได้' })
  }
  list.push({ key: 'customer', icon: ShoppingBag, label: 'แผนที่ลูกค้า' })
  return list
})

const mobileRoleLabel = computed(() => {
  const r = authStore.userRole
  if (r === 'owner') return 'Owner'
  if (r === 'admin') return 'Admin'
  return 'Tenant'
})
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-enter-active > :last-child,
.drawer-leave-active > :last-child {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from > :last-child {
  transform: translateX(100%);
}
.drawer-leave-to > :last-child {
  transform: translateX(100%);
}
</style>
