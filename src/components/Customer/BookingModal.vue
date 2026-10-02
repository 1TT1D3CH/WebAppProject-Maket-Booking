<template>
  <div 
    v-if="isOpen && stall"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
  >
    <div class="bg-white border border-slate-200/80 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80">
        <div class="flex items-center gap-2">
          <ShoppingBag class="w-5 h-5 text-indigo-600" />
          <h2 class="text-base font-bold text-slate-900">แบบฟอร์มยืนยันการจองแผงค้า {{ stall.stallNo }}</h2>
        </div>
        <button @click="$emit('close')" class="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Auth Check Banner (NO GUEST BOOKING ENFORCEMENT) -->
      <div v-if="!authStore.isAuthenticated" class="p-6 text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <Lock class="w-6 h-6" />
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-900">ต้องเข้าสู่ระบบก่อนทำการจองแผงค้า</h3>
          <p class="text-xs text-slate-500 mt-1">เพื่อความปลอดภัยและรับการแจ้งเตือนสิทธิ์การจอง กรุณาสมัครสมาชิกหรือล็อกอินเข้าใช้งาน</p>
        </div>
        <button
          @click="$emit('open-auth')"
          class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-200"
        >
          ล็อกอิน / สมัครสมาชิกเข้าใช้งาน
        </button>
      </div>

      <!-- Form Body -->
      <form v-else @submit.prevent="submitBooking" class="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
        
        <!-- Stall Summary Card -->
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-white text-lg shadow-md"
              :style="{ backgroundColor: marketStore.getZoneById(stall.zoneId)?.color }"
            >
              {{ stall.stallNo }}
            </div>
            <div>
              <div class="font-bold text-slate-900 text-base">แผงค้า {{ stall.stallNo }}</div>
              <div class="text-xs text-slate-500 font-medium">{{ marketStore.getZoneById(stall.zoneId)?.name }}</div>
              <div class="text-xs text-indigo-600 font-mono font-semibold mt-0.5">
                ขนาด: {{ stallMetrics.widthM }} x {{ stallMetrics.heightM }} เมตร ({{ stallMetrics.areaSqM }} ตร.ม.)
              </div>
            </div>
          </div>
          <div class="text-right font-mono">
            <div class="text-xs text-slate-400 font-medium">อัตราค่าเช่า</div>
            <div class="text-base font-bold text-emerald-700">฿{{ stall.price }}/วัน</div>
          </div>
        </div>

        <!-- Strict Data Validation Form Fields -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              ชื่อ-นามสกุล ผู้จอง / ชื่อร้านค้า *
            </label>
            <input 
              v-model="customer.name"
              required
              type="text"
              placeholder="เช่น คุณสมพงษ์ ใจดี (ร้านชาไข่มุก)"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">
                เบอร์โทรศัพท์ (10 หลัก) *
              </label>
              <input 
                v-model="customer.phone"
                required
                type="tel"
                maxlength="10"
                placeholder="0812345678"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">
                เลขบัตรประชาชน (13 หลัก) *
              </label>
              <input 
                v-model="customer.citizenId"
                required
                type="text"
                maxlength="13"
                placeholder="1100200300401"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              ประเภทสินค้า / สินค้าที่จะนำมาขาย *
            </label>
            <input 
              v-model="customer.goodsType"
              required
              type="text"
              placeholder="เช่น ชาชงสด, ขนมปังปิ้ง, เสื้อผ้าแฟชั่น"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <!-- Payment Slip Upload & Preview -->
          <div class="pt-2">
            <label class="block text-xs font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>💳 แนบหลักฐานสลิปโอนเงินค่าเช่า (฿{{ stall.price }}) *</span>
              <span class="text-[10px] text-slate-500 font-mono">PromptPay: 081-999-8888</span>
            </label>

            <div 
              class="border-2 border-dashed rounded-2xl p-3 text-center transition cursor-pointer relative"
              :class="slipPreview ? 'border-emerald-500/60 bg-emerald-50/50' : 'border-slate-300 hover:border-indigo-400 bg-slate-50'"
              @click="$refs.fileInput.click()"
            >
              <input 
                ref="fileInput"
                type="file" 
                accept="image/*"
                class="hidden" 
                @change="handleFileUpload"
              />

              <div v-if="slipPreview" class="flex flex-col items-center gap-2">
                <img :src="slipPreview" alt="Slip Preview" class="max-h-36 rounded-lg object-contain border border-slate-200 shadow-xs" />
                <span class="text-xs text-emerald-700 font-semibold">✓ แนบสลิปเรียบร้อยแล้ว (คลิกเพื่อเปลี่ยน)</span>
              </div>

              <div v-else class="py-3 flex flex-col items-center gap-1.5 text-slate-500">
                <UploadCloud class="w-6 h-6 text-indigo-600" />
                <span class="text-xs font-medium">อัปโหลดสลิปการชำระเงิน (คลิกเพื่อเลือกไฟล์)</span>
                <span class="text-[10px] text-slate-400">รองรับไฟล์ภาพ JPG, PNG, WEBP</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Validation Error Alert -->
        <div v-if="validationError" class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5 font-medium">
          <AlertCircle class="w-4 h-4 shrink-0 text-rose-600" />
          <span>{{ validationError }}</span>
        </div>

        <!-- Protection Banner -->
        <div class="bg-indigo-50 border border-indigo-200/80 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-indigo-900 font-medium">
          <ShieldCheck class="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            ระบบจองแผงใช้ Firestore Atomic Transaction ป้องกัน Race Condition เมื่อยืนยันการจอง สิทธิ์จะถูกล็อกแบบ Real-time ทันที
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="pt-2 flex items-center justify-end gap-3">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
          >
            ยกเลิก
          </button>
          <button 
            type="submit"
            class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 text-xs transition flex items-center gap-1.5 active:scale-95"
          >
            <CheckCircle class="w-4 h-4" />
            <span>ยืนยันชำระเงินและจองแผง</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { useAuthStore } from '../../stores/authStore'
import { ShoppingBag, X, ShieldCheck, CheckCircle, UploadCloud, AlertCircle, Lock } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  stall: Object
})

const emit = defineEmits(['close', 'open-auth'])
const marketStore = useMarketStore()
const authStore = useAuthStore()

const slipPreview = ref('')
const validationError = ref('')

const customer = ref({
  name: '',
  phone: '',
  citizenId: '',
  goodsType: ''
})

watch(() => authStore.currentUser, (user) => {
  if (user) {
    customer.value.name = user.displayName || customer.value.name
    customer.value.phone = user.phone || customer.value.phone
    customer.value.citizenId = user.citizenId || customer.value.citizenId
  }
}, { immediate: true })

const stallMetrics = computed(() => {
  return marketStore.getStallMetrics(props.stall)
})

function handleFileUpload(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (evt) => {
      slipPreview.value = evt.target.result
    }
    reader.readAsDataURL(file)
  }
}

async function submitBooking() {
  validationError.value = ''

  if (!customer.value.name || customer.value.name.trim().length < 2) {
    validationError.value = 'กรุณาระบุชื่อ-นามสกุล ผู้จองให้ถูกต้อง'
    return
  }

  if (!/^0[0-9]{9}$/.test(customer.value.phone)) {
    validationError.value = 'กรุณาระบุเบอร์โทรศัพท์ 10 หลัก (ขึ้นต้นด้วย 0)'
    return
  }

  if (!/^[0-9]{13}$/.test(customer.value.citizenId)) {
    validationError.value = 'กรุณาระบุเลขบัตรประชาชน 13 หลักเป็นตัวเลขเท่านั้น'
    return
  }

  if (!customer.value.goodsType) {
    validationError.value = 'กรุณาระบุประเภทสินค้าที่จะนำมาขาย'
    return
  }

  if (!slipPreview.value) {
    validationError.value = 'กรุณาอัปโหลดสลิปหลักฐานการโอนเงิน'
    return
  }

  if (!props.stall) return

  const bookingPayload = {
    ...customer.value,
    tenantId: authStore.currentUser?.uid || 'tenant-anon',
    slipUrl: slipPreview.value
  }

  const success = await marketStore.bookStall(props.stall.id, bookingPayload)
  if (success) {
    slipPreview.value = ''
    emit('close')
  }
}
</script>
