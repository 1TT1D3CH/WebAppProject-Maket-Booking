<template>
  <BaseModal
    :open="isOpen"
    :title="forced ? 'ตั้งรหัสผ่านใหม่ก่อนใช้งาน' : 'เปลี่ยนรหัสผ่าน'"
    :dismissible="!forced"
    size="sm"
    mobile-mode="sheet"
    @close="$emit('close')"
  >
    <form id="change-password-form" @submit.prevent="submit" class="space-y-3">
      <div>
        <p v-if="forced" class="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          บัญชีนี้ใช้รหัสผ่านเริ่มต้น กรุณาตั้งรหัสใหม่อย่างน้อย 10 ตัวอักษร
        </p>
      </div>

      <input v-model="current" type="password" required autocomplete="current-password" placeholder="รหัสผ่านปัจจุบัน" :class="inputClass" />
      <input v-model="next" type="password" required minlength="10" autocomplete="new-password" placeholder="รหัสผ่านใหม่ (10 ตัวขึ้นไป)" :class="inputClass" />
      <input v-model="confirm" type="password" required autocomplete="new-password" placeholder="ยืนยันรหัสผ่านใหม่" :class="inputClass" />

      <p v-if="error" class="text-xs text-rose-600 font-medium">{{ error }}</p>

      <button v-if="forced" type="button" @click="authStore.logout()" class="w-full text-[11px] text-slate-500 hover:text-rose-600 underline">ออกจากระบบ</button>
    </form>
    <template #footer>
      <button v-if="!forced" type="button" @click="$emit('close')" class="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">ยกเลิก</button>
      <button type="submit" form="change-password-form" :disabled="busy" class="px-6 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50">
          {{ busy ? 'กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่' }}
        </button>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from '../ui/BaseModal.vue'
import { ref } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'

defineProps({ isOpen: Boolean, forced: Boolean })
const emit = defineEmits(['close'])

const authStore = useAuthStore()
const marketStore = useMarketStore()

const current = ref('')
const next = ref('')
const confirm = ref('')
const error = ref('')
const busy = ref(false)

const inputClass = 'w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500'

async function submit() {
  error.value = ''
  if (next.value.length < 10) return (error.value = 'รหัสผ่านใหม่ต้องยาวอย่างน้อย 10 ตัวอักษร')
  if (next.value !== confirm.value) return (error.value = 'รหัสผ่านใหม่ไม่ตรงกัน')
  if (next.value === current.value) return (error.value = 'รหัสผ่านใหม่ต้องไม่เหมือนรหัสเดิม')

  busy.value = true
  const res = await authStore.changePassword(current.value, next.value)
  busy.value = false
  if (!res.success) {
    error.value = res.error
    return
  }
  current.value = next.value = confirm.value = ''
  marketStore.showNotification('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว', 'success')
  emit('close')
}
</script>
