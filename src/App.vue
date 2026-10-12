<template>
  <div class="min-h-screen min-h-dvh bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-['Prompt',sans-serif] transition-colors duration-300">
    
    <!-- Top Navigation Header -->
    <Navbar 
      @open-zone-manager="isZoneManagerOpen = true"
      @open-market-settings="isMarketSettingsOpen = true"
      @open-booking-settings="isBookingSettingsOpen = true"
      @open-firebase-config="isFirebaseConfigOpen = true"
      @open-auth="isAuthOpen = true"
      @open-notifications="isNotificationsOpen = true"
      @open-my-bookings="isMyBookingsOpen = true"
    />

    <!-- Main Content Area: Switches between Admin Builder & Customer View -->
    <main class="flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <!-- Admin Dynamic Layout Builder -->
      <StallCanvas 
        v-if="marketStore.activeMode === 'admin' && authStore.isAdmin"
        @open-editor="isStallEditorOpen = true"
        @open-object-editor="isObjectEditorOpen = true"
        @open-market-settings="isMarketSettingsOpen = true"
      />

      <!-- Member list (owner/admin only) -->
      <MembersPanel v-else-if="marketStore.activeMode === 'members' && authStore.isAdmin" />

      <!-- ตรวจสลิปโอนเงิน (owner/admin only) -->
      <SlipReviewPanel v-else-if="marketStore.activeMode === 'slips' && authStore.isAdmin" />

      <!-- บันทึกการทำงาน / audit log (owner/admin only) -->
      <AuditLogPanel v-else-if="marketStore.activeMode === 'audit' && authStore.isAdmin" />

      <!-- Customer Interactive Booking View -->
      <CustomerStallMap 
        v-else
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

    <BookingSettingsModal
      :is-open="isBookingSettingsOpen"
      @close="isBookingSettingsOpen = false"
    />

    <BookingModal 
      :is-open="isBookingModalOpen"
      :stall="bookingTargetStall"
      @close="isBookingModalOpen = false"
      @open-auth="isAuthOpen = true"
      @need-profile="isProfileForced = true"
    />

    <FirebaseSettingsModal 
      v-if="isDev"
      :is-open="isFirebaseConfigOpen"
      @close="isFirebaseConfigOpen = false"
    />

    <AuthModal 
      :is-open="isAuthOpen"
      @close="isAuthOpen = false"
      @open-change-password="isChangePasswordOpen = true"
    />

    <ChangePasswordModal
      :is-open="mustChangePassword || isChangePasswordOpen"
      :forced="mustChangePassword"
      @close="isChangePasswordOpen = false"
    />

    <CompleteProfileModal
      :is-open="showCompleteProfile"
      @close="closeCompleteProfile"
      @saved="handleProfileSaved"
    />

    <MyBookingsModal
      :is-open="isMyBookingsOpen"
      @close="isMyBookingsOpen = false"
    />

    <NotificationCenter 
      :is-open="isNotificationsOpen"
      @close="isNotificationsOpen = false"
    />

    <!-- Toast Notification Banner -->
    <Transition name="fade">
      <div 
        v-if="marketStore.notification"
        class="fixed bottom-6 right-6 z-[70] px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold tracking-tight transition-colors duration-300"
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useMarketStore } from './stores/marketStore'
import { useNotificationStore } from './stores/notificationStore'
import { useAuthStore } from './stores/authStore'

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
import CompleteProfileModal from './components/Auth/CompleteProfileModal.vue'
import NotificationCenter from './components/Auth/NotificationCenter.vue'
import ChangePasswordModal from './components/Auth/ChangePasswordModal.vue'
import MembersPanel from './components/Admin/MembersPanel.vue'
import SlipReviewPanel from './components/Admin/SlipReviewPanel.vue'
import AuditLogPanel from './components/Admin/AuditLogPanel.vue'
import BookingSettingsModal from './components/Admin/BookingSettingsModal.vue'
import { useSlotStore } from './stores/slotStore'
import MyBookingsModal from './components/Customer/MyBookingsModal.vue'
import { useMyBookingsStore } from './stores/myBookingsStore'
import { useSlipReviewStore } from './stores/slipReviewStore'

const marketStore = useMarketStore()
const authStore = useAuthStore()

const isStallEditorOpen = ref(false)
const isObjectEditorOpen = ref(false)
const isZoneManagerOpen = ref(false)
const isMarketSettingsOpen = ref(false)
const isBookingSettingsOpen = ref(false)
const isBookingModalOpen = ref(false)
const isFirebaseConfigOpen = ref(false)
const isAuthOpen = ref(false)
const isNotificationsOpen = ref(false)
const isMyBookingsOpen = ref(false)
const isChangePasswordOpen = ref(false)
const isDev = import.meta.env.DEV
const bookingTargetStall = ref(null)

const notificationStore = useNotificationStore()
const slipReviewStore = useSlipReviewStore()
const myBookingsStore = useMyBookingsStore()
const mustChangePassword = computed(() => authStore.currentUser?.mustChangePassword === true)

// เตือนก่อนปิดแท็บ/รีเฟรชถ้า admin ยังมีผังที่แก้แล้วไม่ได้บันทึก
function warnUnsavedLayout(e) {
  if (!marketStore.hasUnsavedChanges) return
  e.preventDefault()
  e.returnValue = ''
}

onBeforeUnmount(() => window.removeEventListener('beforeunload', warnUnsavedLayout))

onMounted(() => {
  window.addEventListener('beforeunload', warnUnsavedLayout)
  authStore.initAuth()
  marketStore.initFirebaseSync()
  useSlotStore().startSettings() // ตั้งค่าตลาด (วัน/รอบ) ใช้ทั้งหน้าลูกค้า หน้าจอง การจองของฉัน และ admin

  // กลับมาจาก signInWithRedirect (ใช้เมื่อ popup ถูกบล็อก)
  authStore.completeRedirectSignIn().then((res) => {
    if (!res) return
    if (res.success) {
      marketStore.showNotification(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${res.user.displayName}`, 'success')
    } else {
      marketStore.showNotification(res.error, 'error')
    }
  })
})

// ฟังแจ้งเตือนใหม่ทุกครั้งที่ผู้ใช้/สิทธิ์เปลี่ยน
watch(
  () => authStore.currentUser?.uid,
  (uid) => notificationStore.initNotificationSync(uid),
  { immediate: true }
)

// ผู้ที่ล็อกอินจริงฟังการจองของตัวเอง (ใช้ทำหน้า "การจองของฉัน" และ badge)
watch(
  () => [authStore.currentUser?.uid, authStore.isAuthenticated],
  ([uid, authed]) => {
    if (uid && authed) myBookingsStore.start(uid)
    else myBookingsStore.stop()
  },
  { immediate: true }
)

// admin/owner ฟังรายการรอตรวจสลิป (ใช้ทำ badge บนเมนู) ออกจากระบบแล้วหยุดฟัง
watch(
  () => [authStore.currentUser?.uid, authStore.isAdmin],
  ([uid, isAdmin]) => {
    if (uid && isAdmin) slipReviewStore.start()
    else slipReviewStore.stop()
  },
  { immediate: true }
)

// logout / ถูกลดสิทธิ์ขณะอยู่โหมด admin ให้กลับไปหน้าลูกค้า
watch(() => authStore.isAdmin, (isAdmin) => {
  if (!isAdmin && ['admin', 'members', 'slips'].includes(marketStore.activeMode)) {
    marketStore.setMode('customer')
  }
})

// ─── ขอเบอร์โทรหลังล็อกอินครั้งแรก ─────────────────────────────────────────
// เปิดเองเมื่อยังไม่มีเบอร์ ปิดได้ แต่ถ้ากดจองแผงจะถูกเปิดอีกครั้ง (isProfileForced)
const isProfilePromptDismissed = ref(false)
const isProfileForced = ref(false)
const pendingBookingStall = ref(null)

// รอให้หน้าล็อกอินปิดก่อน ไม่ให้ซ้อนกัน
const showCompleteProfile = computed(() =>
  authStore.needsPhone &&
  !isAuthOpen.value &&
  !authStore.isGoogleLoading &&
  (isProfileForced.value || !isProfilePromptDismissed.value)
)

watch(() => authStore.currentUser?.uid, () => {
  isProfilePromptDismissed.value = false
  isProfileForced.value = false
  pendingBookingStall.value = null
})

function closeCompleteProfile() {
  isProfilePromptDismissed.value = true
  isProfileForced.value = false
  pendingBookingStall.value = null
}

function handleProfileSaved() {
  isProfileForced.value = false
  // กดจองค้างไว้ก่อนกรอกเบอร์ ทำต่อจากจุดนั้น
  if (pendingBookingStall.value) {
    handleOpenBooking(pendingBookingStall.value)
    pendingBookingStall.value = null
  }
}

function handleOpenBooking(stall) {
  if (authStore.needsPhone) {
    pendingBookingStall.value = stall
    isProfileForced.value = true
    return
  }
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
