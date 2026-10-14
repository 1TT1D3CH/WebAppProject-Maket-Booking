<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-['Prompt',sans-serif]">
    
    <!-- Decorative Background Dots -->
    <div class="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"></div>
    
    <!-- Glow Effects -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Main Card -->
    <div class="relative w-full max-w-md">
      
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="inline-flex w-16 h-16 rounded-2xl bg-indigo-600 items-center justify-center shadow-xl shadow-indigo-500/30 mb-4">
          <LayoutGrid class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-white tracking-tight">WalkStreet Market</h1>
        <p class="text-slate-400 text-sm mt-1">ระบบจองแผงตลาดออนไลน์</p>
      </div>

      <!-- Card -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl">

        <!-- Tab Switcher -->
        <div class="flex bg-slate-800/60 rounded-2xl p-1 mb-6 gap-1">
          <button
            @click="mode = 'login'"
            class="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            :class="mode === 'login' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
              : 'text-slate-400 hover:text-white'"
          >
            เข้าสู่ระบบ
          </button>
          <button
            @click="mode = 'register'"
            class="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            :class="mode === 'register' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
              : 'text-slate-400 hover:text-white'"
          >
            สมัครสมาชิก
          </button>
        </div>

        <!-- Google Login Button -->
        <button
          @click="handleGoogleLogin"
          :disabled="isLoading"
          class="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span v-if="isGoogleLoading" class="flex items-center gap-2">
            <span class="animate-spin w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full"></span>
            กำลังเชื่อมต่อ...
          </span>
          <span v-else>{{ mode === 'register' ? 'สมัครสมาชิกด้วย Google' : 'เข้าสู่ระบบด้วย Google' }}</span>
        </button>

        <!-- Divider -->
        <div class="flex items-center gap-3 mb-4">
          <div class="flex-1 h-px bg-white/10"></div>
          <span class="text-xs text-slate-500 font-medium">หรือใช้อีเมล</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-3">

          <!-- Display Name (Register only) -->
          <Transition name="slide-down">
            <div v-if="mode === 'register'">
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">ชื่อ-นามสกุล จริง *</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  v-model="form.displayName"
                  type="text"
                  required
                  placeholder="เช่น นายสมพงษ์ ใจดี"
                  class="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                />
              </div>
            </div>
          </Transition>

          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">อีเมล (Email) *</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="example@market.com"
                class="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">รหัสผ่าน (Password) *</label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                minlength="6"
                class="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                <Eye v-if="!showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Register Extra Fields -->
          <Transition name="slide-down">
            <div v-if="mode === 'register'" class="space-y-3">
              
              <!-- Phone & Citizen ID -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">เบอร์โทร (10 หลัก) *</label>
                  <div class="relative">
                    <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      v-model="form.phone"
                      type="tel"
                      required
                      maxlength="10"
                      placeholder="0812345678"
                      class="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-mono transition"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1.5">เลขบัตรประชาชน</label>
                  <div class="relative">
                    <CreditCard class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      v-model="form.citizenId"
                      type="text"
                      maxlength="13"
                      placeholder="1100200300401"
                      class="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-mono transition"
                    />
                  </div>
                </div>
              </div>

              <!-- Role Selector -->
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1.5">บทบาทของคุณ *</label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="r in roles"
                    :key="r.value"
                    type="button"
                    @click="form.role = r.value"
                    class="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all duration-150"
                    :class="form.role === r.value
                      ? `${r.activeBg} ${r.activeText} ${r.activeBorder} shadow-sm`
                      : 'bg-slate-800/40 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'"
                  >
                    <span class="text-lg">{{ r.icon }}</span>
                    <span>{{ r.label }}</span>
                  </button>
                </div>
              </div>

            </div>
          </Transition>

          <!-- Error Alert -->
          <Transition name="fade-error">
            <div v-if="errorMessage" class="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              <AlertCircle class="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{{ errorMessage }}</span>
            </div>
          </Transition>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold rounded-2xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            <span v-if="isLoading && !isGoogleLoading" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            <LogIn v-else-if="mode === 'login'" class="w-4 h-4" />
            <UserPlus v-else class="w-4 h-4" />
            <span>{{ mode === 'register' ? 'ยืนยันการสมัครสมาชิก' : 'เข้าสู่ระบบ' }}</span>
          </button>

        </form>

      </div>

      <!-- Footer -->
      <p class="text-center text-slate-600 text-xs mt-5">
        ระบบจองแผงตลาด WalkStreet &copy; {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { 
  LayoutGrid, User, Mail, Lock, Phone, CreditCard,
  Eye, EyeOff, AlertCircle, LogIn, UserPlus
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Start on register tab if navigated to /register
const mode = ref(route.name === 'register' ? 'register' : 'login')

watch(mode, (val) => {
  errorMessage.value = ''
  router.replace({ name: val === 'register' ? 'register' : 'login' })
})

const isLoading = ref(false)
const isGoogleLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: '',
  displayName: '',
  phone: '',
  citizenId: '',
  role: 'tenant'
})

const roles = [
  { value: 'tenant',  icon: '🛍️', label: 'ผู้เช่า',   activeBg: 'bg-emerald-500/20', activeText: 'text-emerald-300', activeBorder: 'border-emerald-500/50' },
  { value: 'admin',   icon: '🛡️', label: 'แอดมิน',  activeBg: 'bg-indigo-500/20',  activeText: 'text-indigo-300',  activeBorder: 'border-indigo-500/50' },
  { value: 'owner',   icon: '👑', label: 'เจ้าของ',  activeBg: 'bg-amber-500/20',   activeText: 'text-amber-300',   activeBorder: 'border-amber-500/50' },
]

async function handleGoogleLogin() {
  errorMessage.value = ''
  isGoogleLoading.value = true
  isLoading.value = true
  const res = await authStore.loginWithGoogle()
  isLoading.value = false
  isGoogleLoading.value = false

  if (res.success) {
    router.push({ name: 'home' })
  } else if (res.error && res.error !== 'ยกเลิกการเข้าสู่ระบบ') {
    errorMessage.value = res.error
  }
}

async function handleSubmit() {
  errorMessage.value = ''

  if (mode.value === 'register') {
    // Client-side validation
    if (!form.displayName.trim()) {
      errorMessage.value = 'กรุณาระบุชื่อ-นามสกุล'
      return
    }
    if (form.phone && !/^0[0-9]{9}$/.test(form.phone)) {
      errorMessage.value = 'เบอร์โทรศัพท์ต้องมี 10 หลัก และขึ้นต้นด้วย 0'
      return
    }
    if (form.citizenId && !/^[0-9]{13}$/.test(form.citizenId)) {
      errorMessage.value = 'เลขบัตรประชาชนต้องมี 13 หลักเป็นตัวเลขเท่านั้น'
      return
    }
    if (form.password.length < 6) {
      errorMessage.value = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
      return
    }

    isLoading.value = true
    const res = await authStore.register({ ...form })
    isLoading.value = false

    if (res.success) {
      router.push({ name: 'home' })
    } else {
      errorMessage.value = res.error
    }
  } else {
    isLoading.value = true
    const res = await authStore.login(form.email, form.password)
    isLoading.value = false

    if (res.success) {
      router.push({ name: 'home' })
    } else {
      errorMessage.value = res.error
    }
  }
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}
.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 500px;
}

.fade-error-enter-active,
.fade-error-leave-active {
  transition: opacity 0.2s ease;
}
.fade-error-enter-from,
.fade-error-leave-to {
  opacity: 0;
}
</style>
