<template>
  <Transition name="slide-left">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs"
    >
      <div 
        class="w-full max-w-md bg-white border-l border-slate-200/90 h-full flex flex-col shadow-2xl text-slate-800"
        @click.stop
      >
        <!-- Header -->
        <div class="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80">
          <div class="flex items-center gap-2">
            <Bell class="w-5 h-5 text-amber-500" />
            <h2 class="text-sm font-bold text-slate-900">การแจ้งเตือนสำหรับผู้เช่า</h2>
            <span 
              v-if="unreadCount > 0"
              class="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-xs"
            >
              {{ unreadCount }} ใหม่
            </span>
          </div>
          <button 
            @click="$emit('close')"
            class="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Controls Bar with Clear All Button -->
        <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
          <span class="text-slate-500 font-medium">ทั้งหมด {{ list.length }} รายการ</span>
          
          <div class="flex items-center gap-2 sm:gap-3">
            <button 
              v-if="unreadCount > 0"
              @click="handleMarkAllAsRead"
              class="text-indigo-600 hover:text-indigo-700 font-semibold transition flex items-center gap-1"
            >
              <CheckCheck class="w-3.5 h-3.5" />
              <span>อ่านทั้งหมด</span>
            </button>

            <!-- ลบทั้งหมด (Clear All) Button -->
            <button 
              v-if="list.length > 0"
              @click="handleClearAll"
              class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition flex items-center gap-1"
              title="ลบรายการแจ้งเตือนทั้งหมด"
            >
              <Trash2 class="w-3.5 h-3.5" />
              <span>ลบข้อความทั้งหมด</span>
            </button>
          </div>
        </div>

        <!-- Notification List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          <div 
            v-if="list.length === 0"
            class="text-center py-16 text-slate-400 text-xs space-y-3"
          >
            <CheckCircle2 class="w-10 h-10 text-slate-300 mx-auto" />
            <p class="font-medium text-slate-500">ยังไม่มีการแจ้งเตือนในขณะนี้</p>
          </div>

          <div 
            v-for="item in list" 
            :key="item.id"
            class="p-3.5 rounded-2xl border transition-all relative group"
            :class="[
              item.isRead 
                ? 'bg-white border-slate-200/80 opacity-80 shadow-xs' 
                : 'bg-white border-amber-300 shadow-md shadow-amber-500/5 ring-1 ring-amber-200'
            ]"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2">
                <span 
                  class="w-2 h-2 rounded-full"
                  :class="item.isRead ? 'bg-slate-300' : 'bg-amber-500 animate-pulse'"
                ></span>
                <h4 class="text-xs font-bold text-slate-900 leading-tight">{{ item.title }}</h4>
                <span 
                  v-if="item.type === 'LAYOUT_UPDATE'" 
                  class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 shrink-0"
                >
                  ผังตลาด
                </span>
              </div>
              <button 
                @click="notificationStore.deleteNotification(item.id)"
                class="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="ลบการแจ้งเตือนนี้"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>

            <p class="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">{{ item.message }}</p>

            <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono font-medium">
              <span>แผงค้า: {{ item.stallNo }}</span>
              <span>{{ formatDate(item.createdAt) }}</span>
            </div>

            <button 
              v-if="!item.isRead"
              @click="notificationStore.markAsRead(item.id)"
              class="mt-2 text-[10px] text-amber-600 hover:underline block font-semibold"
            >
              ทบทวน / รับทราบแล้ว
            </button>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useNotificationStore } from '../../stores/notificationStore'
import { Bell, X, Trash2, CheckCircle2, CheckCheck } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})
defineEmits(['close'])

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const isAdminOrOwner = computed(() => {
  return authStore.isAdmin || authStore.isOwner
})

const list = computed(() => {
  return notificationStore.tenantNotifications(authStore.currentUser?.uid, isAdminOrOwner.value)
})

const unreadCount = computed(() => {
  return notificationStore.unreadCount(authStore.currentUser?.uid, isAdminOrOwner.value)
})

function handleMarkAllAsRead() {
  notificationStore.markAllAsRead(authStore.currentUser?.uid, isAdminOrOwner.value)
}

async function handleClearAll() {
  await notificationStore.clearAllNotifications()
}

function formatDate(isoStr) {
  if (!isoStr) return ''
  try {
    return new Date(isoStr).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  } catch (e) {
    return isoStr
  }
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
