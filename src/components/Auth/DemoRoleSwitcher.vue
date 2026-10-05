<template>
  <div class="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
    <span class="text-[10px] text-indigo-700 font-bold uppercase tracking-wider block mb-2">
      ⚡ สลับบทบาททดสอบด่วน (Quick Demo Role Switch):
    </span>
    <div class="grid grid-cols-3 gap-1.5">
      <button
        @click="handleDemoSwitch('owner')"
        class="px-2 py-1.5 rounded-xl text-[11px] font-bold border transition"
        :class="authStore.userRole === 'owner' 
          ? 'bg-purple-600 text-white border-purple-600 shadow-xs' 
          : 'bg-white text-slate-700 border-slate-200 hover:border-purple-400 hover:bg-purple-50/50'"
      >
        👑 Owner
      </button>
      <button
        @click="handleDemoSwitch('admin')"
        class="px-2 py-1.5 rounded-xl text-[11px] font-bold border transition"
        :class="authStore.userRole === 'admin' 
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
          : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50'"
      >
        🛡️ Admin
      </button>
      <button
        @click="handleDemoSwitch('tenant')"
        class="px-2 py-1.5 rounded-xl text-[11px] font-bold border transition"
        :class="authStore.userRole === 'tenant' 
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'"
      >
        🛍️ Tenant
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'

const emit = defineEmits(['switched'])

const authStore = useAuthStore()
const marketStore = useMarketStore()

function handleDemoSwitch(role) {
  if (!authStore.switchDemoRole(role)) return
  marketStore.showNotification(`สลับเข้าสู่บทบาท: ${role.toUpperCase()} (${authStore.userName})`, 'success')
  emit('switched')
}
</script>
