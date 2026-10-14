<template>
  <div class="relative">
    <button
      v-if="!authStore.isAuthenticated"
      @click="$emit('open-auth')"
      class="flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <LogIn class="w-4 h-4" />
      <span class="whitespace-nowrap">เข้าสู่ระบบ</span>
    </button>

    <button
      v-else
      ref="btnRef"
      @click="toggleMenu"
      class="flex items-center gap-1.5 h-9 px-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      :aria-expanded="menuOpen"
      aria-haspopup="true"
    >
      <span class="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
        {{ initials }}
      </span>
      <span class="hidden sm:inline max-w-[100px] truncate">{{ authStore.userName }}</span>
      <span
        v-if="authStore.userRole === 'owner' || authStore.userRole === 'admin'"
        class="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded-full font-bold"
        :class="authStore.userRole === 'owner'
          ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
          : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'"
      >{{ authStore.userRole === 'owner' ? 'Owner' : 'Admin' }}</span>
      <ChevronDown class="w-3.5 h-3.5 shrink-0 text-slate-400" />
    </button>

    <Teleport to="body">
      <template v-if="menuOpen">
        <div class="fixed inset-0 z-[60]" @click="menuOpen = false" aria-hidden="true"></div>
        <div
          ref="menuRef"
          class="fixed z-[61] min-w-[220px] py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl"
          :style="menuStyle"
          role="menu"
          @keydown="handleKeys"
        >
          <div class="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
            <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">{{ authStore.userName }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ roleLabel }}</p>
          </div>

          <button
            role="menuitem"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
            @click="marketStore.toggleTheme(); menuOpen = false"
          >
            <Sun v-if="marketStore.isDark" class="w-4 h-4 text-amber-400" />
            <Moon v-else class="w-4 h-4 text-indigo-600" />
            <span>{{ marketStore.isDark ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด' }}</span>
          </button>

          <div class="my-0.5 h-px bg-slate-100 dark:bg-slate-800"></div>

          <button
            role="menuitem"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
            @click="handleLogout"
          >
            <LogOut class="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </template>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { ChevronDown, Sun, Moon, LogOut, LogIn } from 'lucide-vue-next'

const authStore = useAuthStore()
const marketStore = useMarketStore()

defineEmits(['open-auth'])

const btnRef = ref(null)
const menuRef = ref(null)
const menuOpen = ref(false)
const menuStyle = ref({})

const initials = computed(() => (authStore.userName || '?').charAt(0).toUpperCase())

const roleLabel = computed(() => {
  const r = authStore.userRole
  if (r === 'owner') return 'Owner'
  if (r === 'admin') return 'Admin'
  return 'Tenant'
})

function toggleMenu() {
  if (menuOpen.value) { menuOpen.value = false; return }
  const rect = btnRef.value?.getBoundingClientRect()
  if (rect) {
    menuStyle.value = {
      top: `${rect.bottom + 4}px`,
      right: `${window.innerWidth - rect.right}px`,
    }
  }
  menuOpen.value = true
  nextTick(() => menuRef.value?.querySelector('[role="menuitem"]')?.focus())
}

function handleKeys(e) {
  if (e.key === 'Escape') { menuOpen.value = false; btnRef.value?.focus(); return }
  const items = [...(menuRef.value?.querySelectorAll('[role="menuitem"]') || [])]
  const idx = items.indexOf(document.activeElement)
  if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus() }
  else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus() }
}

function handleLogout() {
  menuOpen.value = false
  authStore.logout()
}
</script>
