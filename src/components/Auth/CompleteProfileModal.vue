<template>
  <BaseModal :open="isOpen" title="กรอกข้อมูลติดต่อ" tone="light" size="sm" mobile-mode="sheet" @close="$emit('close')">
        <p class="text-[11px] text-slate-500 font-medium">ใช้สำหรับติดต่อเรื่องการจองแผง</p>
        <form class="mt-4 space-y-3" @submit.prevent="handleSubmit">
          <div>
            <label for="complete-profile-phone" class="block text-xs font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
            <input
              id="complete-profile-phone"
              v-model="form.phone"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              required
              placeholder="0812345678"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono transition"
            />
          </div>

          <div>
            <label for="complete-profile-name" class="block text-xs font-semibold text-slate-700 mb-1">ชื่อที่แสดง</label>
            <input
              id="complete-profile-name"
              v-model="form.displayName"
              type="text"
              autocomplete="name"
              placeholder="เช่น นายสมพงษ์ ใจดี"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          <div v-if="errorMessage" class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium">
            <AlertCircle class="w-4 h-4 shrink-0 text-rose-600" />
            <span>{{ errorMessage }}</span>
          </div>

          <button
            type="submit"
            :disabled="isSaving"
            class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200 disabled:opacity-60"
          >
            <span v-if="isSaving" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            <span>บันทึกข้อมูล</span>
          </button>
        </form>
  </BaseModal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
import { AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'

const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close', 'saved'])

const authStore = useAuthStore()
const marketStore = useMarketStore()

const form = reactive({ phone: '', displayName: '' })
const errorMessage = ref('')
const isSaving = ref(false)

// เปิดทุกครั้งเติมค่าจากโปรไฟล์ (ชื่อจาก Google) ให้แก้ต่อได้
watch(() => props.isOpen, (open) => {
  if (!open) return
  form.phone = authStore.currentUser?.phone || ''
  form.displayName = authStore.currentUser?.displayName || ''
  errorMessage.value = ''
}, { immediate: true })

async function handleSubmit() {
  errorMessage.value = ''
  const phone = form.phone.replace(/[\s-]/g, '')
  if (!/^0[0-9]{8,9}$/.test(phone)) {
    errorMessage.value = 'กรุณากรอกเบอร์โทรให้ถูกต้อง เช่น 0812345678'
    return
  }

  isSaving.value = true
  const res = await authStore.updateContactInfo({
    phone,
    displayName: form.displayName.trim() || authStore.currentUser?.displayName || ''
  })
  isSaving.value = false

  if (res.success) {
    marketStore.showNotification('บันทึกข้อมูลติดต่อเรียบร้อยแล้ว', 'success')
    emit('saved')
  } else {
    errorMessage.value = res.error
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
