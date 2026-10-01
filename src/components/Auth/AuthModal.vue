<template>
  <Transition name="fade">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
    >
      <div 
        class="bg-white border border-slate-200/80 w-full max-w-md rounded-3xl shadow-2xl p-6 relative overflow-hidden text-slate-800"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200/80">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
              <UserCheck class="w-4 h-4" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">
                {{ isRegister ? 'สมัครสมาชิกผู้ใช้งานใหม่' : 'เข้าสู่ระบบ (Sign In)' }}
              </h3>
              <p class="text-[11px] text-slate-500 font-medium">ระบบจองแผงตลาด WalkStreet System</p>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Quick Demo Switcher Section (FOR EASY TEST & EVALUATION) -->
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

        <!-- Auth Form -->
        <form @submit.prevent="handleSubmit" class="mt-4 space-y-3">
          
          <div v-if="isRegister">
            <label class="block text-xs font-semibold text-slate-700 mb-1">ชื่อ-นามสกุล จริง *</label>
            <input 
              v-model="form.displayName"
              type="text" 
              required
              placeholder="เช่น นายสมพงษ์ ใจดี"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">อีเมล (Email) *</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              placeholder="example@market.com"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">รหัสผ่าน (Password) *</label>
            <input 
              v-model="form.password"
              type="password" 
              required
              placeholder="••••••••"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          <div v-if="isRegister" class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์ (10 หลัก) *</label>
              <input 
                v-model="form.phone"
                type="tel" 
                required
                maxlength="10"
                placeholder="0812345678"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono transition"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">เลขบัตรประชาชน (13 หลัก)</label>
              <input 
                v-model="form.citizenId"
                type="text" 
                maxlength="13"
                placeholder="1100200300401"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono transition"
              />
            </div>
          </div>

          <div v-if="isRegister">
            <label class="block text-xs font-semibold text-slate-700 mb-1">เลือกบทบาท (Role) *</label>
            <select
              v-model="form.role"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium"
            >
              <option value="tenant">ผู้เช่า / พ่อค้าแม่ค้า (Tenant)</option>
              <option value="admin">ผู้ดูแลระบบผังตลาด (Admin)</option>
              <option value="owner">เจ้าของตลาด (Market Owner)</option>
            </select>
          </div>

          <!-- Error Alert -->
          <div v-if="errorMessage" class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium">
            <AlertCircle class="w-4 h-4 shrink-0 text-rose-600" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200 active:scale-95"
          >
            <span v-if="authStore.isLoading" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ isRegister ? 'ยืนยันการสมัครสมาชิก' : 'เข้าสู่ระบบ' }}</span>
          </button>
        </form>

        <!-- Toggle Register/Login -->
        <div class="mt-4 pt-3 border-t border-slate-200/80 text-center">
          <button 
            @click="isRegister = !isRegister"
            class="text-xs text-slate-600 hover:text-indigo-600 transition font-medium"
          >
            {{ isRegister ? 'มีบัญชีผู้ใช้อยู่แล้ว? คลิกเข้าสู่ระบบ' : 'ยังไม่มีบัญชีผู้ใช้? คลิกสมัครสมาชิก' }}
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { UserCheck, X, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close'])

const authStore = useAuthStore()
const marketStore = useMarketStore()

const isRegister = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: '',
  displayName: '',
  phone: '',
  citizenId: '',
  role: 'tenant'
})

function handleDemoSwitch(role) {
  authStore.switchDemoRole(role)
  marketStore.showNotification(`สลับเข้าสู่บทบาท: ${role.toUpperCase()} (${authStore.userName})`, 'success')
  emit('close')
}

async function handleSubmit() {
  errorMessage.value = ''

  if (isRegister.value) {
    if (form.phone && !/^0[0-9]{9}$/.test(form.phone)) {
      errorMessage.value = 'กรุณาระบุเบอร์โทรศัพท์ 10 หลักขึ้นต้นด้วย 0'
      return
    }
    if (form.citizenId && !/^[0-9]{13}$/.test(form.citizenId)) {
      errorMessage.value = 'กรุณาระบุเลขบัตรประชาชน 13 หลักเป็นตัวเลขเท่านั้น'
      return
    }

    const res = await authStore.register({ ...form })
    if (res.success) {
      marketStore.showNotification(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${res.user.displayName}`, 'success')
      emit('close')
    } else {
      errorMessage.value = res.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
    }
  } else {
    const res = await authStore.login(form.email, form.password)
    if (res.success) {
      marketStore.showNotification(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${res.user.displayName}`, 'success')
      emit('close')
    } else {
      errorMessage.value = res.error || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
