<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-['Prompt',sans-serif] transition-colors duration-300">
    
    <!-- Top Navigation Header -->
    <Navbar 
      @open-zone-manager="isZoneManagerOpen = true"
      @open-market-settings="isMarketSettingsOpen = true"
      @open-firebase-config="isFirebaseConfigOpen = true"
      @open-auth="isAuthOpen = true"
      @open-notifications="isNotificationsOpen = true"
    />

    <!-- Main Content Area: Switches between Admin Builder & Customer View -->
    <main class="flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <!-- Admin Dynamic Layout Builder -->
      <StallCanvas 
        v-if="marketStore.activeMode === 'admin'"
        @open-editor="isStallEditorOpen = true"
        @open-object-editor="isObjectEditorOpen = true"
      />

      <!-- Customer Interactive Booking View -->
      <CustomerStallMap 
        v-else-if="marketStore.activeMode === 'customer'"
        @open-booking-modal="handleOpenBooking"
      />
    </main>

    <!-- Modals & Drawers -->
    <StallEditorModal 
      :is-open="isStallEditorOpen"
      :stall-id="marketStore.selectedStallId"
      @close="isStallEditorOpen = false"
    />

    <ObjectEditorModal 
      :is-open="isObjectEditorOpen"
      :object-id="marketStore.selectedObjectId"
      @close="isObjectEditorOpen = false"
    />

    <ZoneManagerModal 
      :is-open="isZoneManagerOpen"
      @close="isZoneManagerOpen = false"
    />

    <MarketSettingsModal 
      :is-open="isMarketSettingsOpen"
      @close="isMarketSettingsOpen = false"
    />

    <BookingModal 
      :is-open="isBookingModalOpen"
      :stall="bookingTargetStall"
      @close="isBookingModalOpen = false"
      @open-auth="isAuthOpen = true"
    />

    <FirebaseSettingsModal 
      :is-open="isFirebaseConfigOpen"
      @close="isFirebaseConfigOpen = false"
    />

    <AuthModal 
      :is-open="isAuthOpen"
      @close="isAuthOpen = false"
    />

    <NotificationCenter 
      :is-open="isNotificationsOpen"
      @close="isNotificationsOpen = false"
    />

    <!-- Toast Notification Banner -->
    <Transition name="fade">
      <div 
        v-if="marketStore.notification"
        class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold tracking-tight transition-colors duration-300"
        :class="{
          'bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 shadow-emerald-500/10': marketStore.notification.type === 'success',
          'bg-rose-50/95 dark:bg-rose-950/90 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700 shadow-rose-500/10': marketStore.notification.type === 'error',
          'bg-sky-50/95 dark:bg-sky-950/90 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-700 shadow-sky-500/10': marketStore.notification.type === 'info',
          'bg-amber-50/95 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 shadow-amber-500/10': marketStore.notification.type === 'warning'
        }"
      >
        <span class="w-2 h-2 rounded-full animate-ping" :class="{
          'bg-emerald-500': marketStore.notification.type === 'success',
          'bg-rose-500': marketStore.notification.type === 'error',
          'bg-sky-500': marketStore.notification.type === 'info',
          'bg-amber-500': marketStore.notification.type === 'warning'
        }"></span>
        <span>{{ marketStore.notification.msg }}</span>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMarketStore } from './stores/marketStore'
import { useNotificationStore } from './stores/notificationStore'

import Navbar from './components/Navbar.vue'
import StallCanvas from './components/Admin/StallCanvas.vue'
import StallEditorModal from './components/Admin/StallEditorModal.vue'
import ObjectEditorModal from './components/Admin/ObjectEditorModal.vue'
import ZoneManagerModal from './components/Admin/ZoneManagerModal.vue'
import MarketSettingsModal from './components/Admin/MarketSettingsModal.vue'
import CustomerStallMap from './components/Customer/CustomerStallMap.vue'
import BookingModal from './components/Customer/BookingModal.vue'
import FirebaseSettingsModal from './components/FirebaseSettingsModal.vue'
import AuthModal from './components/Auth/AuthModal.vue'
import NotificationCenter from './components/Auth/NotificationCenter.vue'

const marketStore = useMarketStore()

const isStallEditorOpen = ref(false)
const isObjectEditorOpen = ref(false)
const isZoneManagerOpen = ref(false)
const isMarketSettingsOpen = ref(false)
const isBookingModalOpen = ref(false)
const isFirebaseConfigOpen = ref(false)
const isAuthOpen = ref(false)
const isNotificationsOpen = ref(false)
const bookingTargetStall = ref(null)

const notificationStore = useNotificationStore()

onMounted(() => {
  marketStore.initFirebaseSync()
  notificationStore.initNotificationSync()
})

function handleOpenBooking(stall) {
  bookingTargetStall.value = stall
  isBookingModalOpen.value = true
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
