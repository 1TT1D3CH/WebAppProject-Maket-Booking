<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Prompt',sans-serif]">
    
    <!-- Top Navigation Header -->
    <Navbar 
      @open-zone-manager="isZoneManagerOpen = true"
      @open-market-settings="isMarketSettingsOpen = true"
      @open-firebase-config="isFirebaseConfigOpen = true"
    />

    <!-- Main Content Area: Switches between Admin Builder & Customer View -->
    <main class="flex-1 relative overflow-hidden">
      <!-- Admin Dynamic Layout Builder -->
      <StallCanvas 
        v-if="marketStore.activeMode === 'admin'"
        @open-editor="isStallEditorOpen = true"
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
    />

    <FirebaseSettingsModal 
      :is-open="isFirebaseConfigOpen"
      @close="isFirebaseConfigOpen = false"
    />

    <!-- Toast Notification Banner -->
    <Transition name="fade">
      <div 
        v-if="marketStore.notification"
        class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center gap-2.5 text-xs font-medium"
        :class="{
          'bg-emerald-950/90 text-emerald-300 border-emerald-500/40': marketStore.notification.type === 'success',
          'bg-rose-950/90 text-rose-300 border-rose-500/40': marketStore.notification.type === 'error',
          'bg-sky-950/90 text-sky-300 border-sky-500/40': marketStore.notification.type === 'info',
          'bg-amber-950/90 text-amber-300 border-amber-500/40': marketStore.notification.type === 'warning'
        }"
      >
        <span class="w-2 h-2 rounded-full animate-ping" :class="{
          'bg-emerald-400': marketStore.notification.type === 'success',
          'bg-rose-400': marketStore.notification.type === 'error',
          'bg-sky-400': marketStore.notification.type === 'info',
          'bg-amber-400': marketStore.notification.type === 'warning'
        }"></span>
        <span>{{ marketStore.notification.msg }}</span>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMarketStore } from './stores/marketStore'

import Navbar from './components/Navbar.vue'
import StallCanvas from './components/Admin/StallCanvas.vue'
import StallEditorModal from './components/Admin/StallEditorModal.vue'
import ZoneManagerModal from './components/Admin/ZoneManagerModal.vue'
import MarketSettingsModal from './components/Admin/MarketSettingsModal.vue'
import CustomerStallMap from './components/Customer/CustomerStallMap.vue'
import BookingModal from './components/Customer/BookingModal.vue'
import FirebaseSettingsModal from './components/FirebaseSettingsModal.vue'

const marketStore = useMarketStore()

const isStallEditorOpen = ref(false)
const isZoneManagerOpen = ref(false)
const isMarketSettingsOpen = ref(false)
const isBookingModalOpen = ref(false)
const isFirebaseConfigOpen = ref(false)
const bookingTargetStall = ref(null)

onMounted(() => {
  marketStore.initFirebaseSync()
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
