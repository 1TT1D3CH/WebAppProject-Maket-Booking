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
                {{ authStore.isAuthenticated ? 'บัญชีผู้ใช้งาน' : isResetMode ? 'ลืมรหัสผ่าน' : isRegister ? 'สมัครสมาชิกผู้ใช้งานใหม่' : 'เข้าสู่ระบบ (Sign In)' }}
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

        <!-- Quick Demo Switcher Section (โหลดเฉพาะ dev / VITE_DEMO_MODE=true) -->
        <DemoRoleSwitcher v-if="DemoRoleSwitcher" @switched="emit('close')" />

        <!-- Signed-in Profile -->
        <div v-if="authStore.isAuthenticated" class="mt-4 space-y-3">
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
            <div class="font-bold text-slate-900">{{ authStore.userName }}</div>
            <div class="text-slate-500">{{ authStore.currentUser?.email }}</div>
            <div class="text-slate-600 font-semibold">
              บทบาท: {{ authStore.userRole === 'owner' ? '👑 Owner' : authStore.userRole === 'admin' ? '🛡️ Admin' : '🛍️ Tenant' }}
              <span v-if="authStore.currentUser?.isDemo" class="text-amber-600">(บัญชีทดสอบ)</span>
            </div>
          </div>
          <button
            type="button"
            @click="emit('open-change-password'); emit('close')"
            class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-xs"
          >
            เปลี่ยนรหัสผ่าน
          </button>
          <button
            @click="handleLogout"
            class="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl transition text-xs flex items-center justify-center gap-2"
          >
            <LogOut class="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>

        <!-- เข้าสู่ระบบด้วย Google (ทั้งแท็บเข้าสู่ระบบและสมัครสมาชิก) -->
        <div v-if="!authStore.isAuthenticated && !isResetMode" class="mt-4">
          <button
            type="button"
            :disabled="isBusy"
            class="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold rounded-xl transition text-xs flex items-center justify-center gap-2.5 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            @click="handleGoogleLogin"
          >
            <span v-if="authStore.isGoogleLoading" class="animate-spin w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full"></span>
            <svg v-else class="w-4 h-4 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            <span>{{ authStore.isGoogleLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Google' }}</span>
          </button>

          <div v-if="noticeMessage" class="mt-2 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-medium">
            {{ noticeMessage }}
          </div>

          <div class="flex items-center gap-3 mt-4 text-[11px] font-medium text-slate-500">
            <span class="h-px flex-1 bg-slate-200"></span>
            <span>หรือ</span>
            <span class="h-px flex-1 bg-slate-200"></span>
          </div>
        </div>

        <!-- Auth Form -->
        <form v-if="!authStore.isAuthenticated && !isResetMode" @submit.prevent="handleSubmit" class="mt-4 space-y-3">
          
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
              :type="isRegister ? 'email' : 'text'"
              autocomplete="username"
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
            <div v-if="!isRegister" class="mt-1 text-right">
              <button
                type="button"
                class="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                @click="openResetMode"
              >
                ลืมรหัสผ่าน?
              </button>
            </div>
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

          <!-- Error Alert -->
          <div v-if="errorMessage" class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium">
            <AlertCircle class="w-4 h-4 shrink-0 text-rose-600" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="isBusy"
            class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200 active:scale-95"
          >
            <span v-if="authStore.isLoading" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ isRegister ? 'ยืนยันการสมัครสมาชิก' : 'เข้าสู่ระบบ' }}</span>
          </button>
        </form>

        <!-- ลืมรหัสผ่าน -->
        <form v-if="!authStore.isAuthenticated && isResetMode" class="mt-4 space-y-3" @submit.prevent="handleSendReset">
          <p class="text-xs text-slate-600">กรอกอีเมลที่ใช้สมัคร เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้</p>
          <div>
            <label for="reset-email" class="block text-xs font-semibold text-slate-700 mb-1">อีเมล (Email) *</label>
            <input
              id="reset-email"
              v-model="resetEmail"
              type="email"
              required
              autocomplete="email"
              placeholder="example@market.com"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          <div v-if="resetSentMessage" class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-1.5">
            <MailCheck class="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{{ resetSentMessage }}</span>
          </div>
          <div v-if="errorMessage" class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium">
            <AlertCircle class="w-4 h-4 shrink-0 text-rose-600" />
            <span>{{ errorMessage }}</span>
          </div>

          <button
            type="submit"
            :disabled="isSendingReset || resetCooldown > 0"
            class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="isSendingReset" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ resetCooldown > 0 ? `ส่งอีกครั้งได้ใน ${resetCooldown} วินาที` : 'ส่งลิงก์ตั้งรหัสผ่านใหม่' }}</span>
          </button>

          <p class="text-[11px] text-slate-500">ถ้าสมัครด้วย Google ให้กดเข้าสู่ระบบด้วย Google แทน</p>

          <div class="pt-3 border-t border-slate-200/80 text-center">
            <button type="button" class="text-xs text-slate-600 hover:text-indigo-600 transition font-medium" @click="closeResetMode">
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </div>
        </form>

        <!-- Toggle Register/Login -->
        <div v-if="!authStore.isAuthenticated && !isResetMode" class="mt-4 pt-3 border-t border-slate-200/80 text-center">
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
import { ref, reactive, computed, watch, onBeforeUnmount, defineAsyncComponent } from 'vue'
import { useAuthStore, DEMO_ENABLED } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { UserCheck, X, AlertCircle, LogOut, MailCheck } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close', 'open-change-password'])

const authStore = useAuthStore()

// ไม่รวมโค้ดส่วนนี้ใน production build ถ้าไม่ได้เปิด demo mode
const DemoRoleSwitcher = DEMO_ENABLED
  ? defineAsyncComponent(() => import('./DemoRoleSwitcher.vue'))
  : null
const marketStore = useMarketStore()

const isRegister = ref(false)
const errorMessage = ref('')
const noticeMessage = ref('')

// กันกดซ้ำระหว่างรอ ทั้งปุ่ม Google และปุ่มของฟอร์ม
const isBusy = computed(() => authStore.isLoading || authStore.isGoogleLoading)

const form = reactive({
  email: '',
  password: '',
  displayName: '',
  phone: '',
  citizenId: ''
})


async function handleLogout() {
  await authStore.logout()
  marketStore.showNotification('ออกจากระบบเรียบร้อยแล้ว', 'info')
  emit('close')
}

// ─── ลืมรหัสผ่าน ───────────────────────────────────────────────────────────
const RESET_COOLDOWN_SECONDS = 60
const isResetMode = ref(false)
const resetEmail = ref('')
const resetSentMessage = ref('')
const isSendingReset = ref(false)
const resetCooldown = ref(0)
let cooldownTimer = null

function openResetMode() {
  isResetMode.value = true
  resetEmail.value = form.email
  resetSentMessage.value = ''
  errorMessage.value = ''
}

function closeResetMode() {
  isResetMode.value = false
  resetSentMessage.value = ''
  errorMessage.value = ''
}

function startResetCooldown() {
  clearInterval(cooldownTimer)
  resetCooldown.value = RESET_COOLDOWN_SECONDS
  cooldownTimer = setInterval(() => {
    resetCooldown.value--
    if (resetCooldown.value <= 0) clearInterval(cooldownTimer)
  }, 1000)
}

async function handleSendReset() {
  errorMessage.value = ''
  resetSentMessage.value = ''
  isSendingReset.value = true
  const res = await authStore.sendPasswordReset(resetEmail.value)
  isSendingReset.value = false

  if (res.success) {
    resetSentMessage.value = 'ถ้ามีบัญชีที่ใช้อีเมลนี้ เราได้ส่งลิงก์ตั้งรหัสผ่านใหม่ไปแล้ว กรุณาเช็กกล่องจดหมายและจดหมายขยะ'
    startResetCooldown()
  } else {
    errorMessage.value = res.error
  }
}

// ปิด modal แล้วเปิดใหม่ให้กลับมาหน้าเข้าสู่ระบบ (นับถอยหลังส่งซ้ำยังนับต่อ)
watch(() => props.isOpen, (open) => {
  if (!open) closeResetMode()
})

onBeforeUnmount(() => clearInterval(cooldownTimer))

async function handleGoogleLogin() {
  errorMessage.value = ''
  noticeMessage.value = ''

  const res = await authStore.loginWithGoogle()
  if (res.success) {
    marketStore.showNotification(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${res.user.displayName}`, 'success')
    emit('close')
  } else if (res.redirecting) {
    noticeMessage.value = res.error
  } else if (res.error) {
    // ผู้ใช้ปิด popup เอง จะไม่มีข้อความ
    errorMessage.value = res.error
  }
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
