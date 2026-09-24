<template>
  <div 
    v-if="isOpen && stall"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
  >
    <div class="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60">
        <div class="flex items-center gap-2">
          <ShoppingBag class="w-5 h-5 text-emerald-400" />
          <h2 class="text-base font-bold text-white">แบบฟอร์มยืนยันการจองแผงค้า {{ stall.stallNo }}</h2>
        </div>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1 rounded-lg">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="submitBooking" class="p-6 space-y-5 text-xs sm:text-sm">
        
        <!-- Stall Summary Card -->
        <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-white text-lg shadow-md"
              :style="{ backgroundColor: marketStore.getZoneById(stall.zoneId)?.color }"
            >
              {{ stall.stallNo }}
            </div>
            <div>
              <div class="font-bold text-white text-base">แผงค้า {{ stall.stallNo }}</div>
              <div class="text-xs text-slate-400">{{ marketStore.getZoneById(stall.zoneId)?.name }}</div>
              <div class="text-xs text-sky-400 font-mono mt-0.5">
                ขนาด: {{ stallMetrics.widthM }} x {{ stallMetrics.heightM }} เมตร ({{ stallMetrics.areaSqM }} ตร.ม.)
              </div>
            </div>
          </div>
          <div class="text-right font-mono">
            <div class="text-xs text-slate-400">อัตราค่าเช่า</div>
            <div class="text-base font-bold text-emerald-400">฿{{ stall.price }}/วัน</div>
          </div>
        </div>

        <!-- Customer Form Fields -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">
              ชื่อ-นามสกุล ผู้จอง / ชื่อร้านค้า <span class="text-rose-400">*</span>
            </label>
            <input 
              v-model="customer.name"
              required
              type="text"
              placeholder="เช่น คุณสมชาย (ร้านชาไข่มุกหวานน้อย)"
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">
              เบอร์โทรศัพท์ติดต่อ <span class="text-rose-400">*</span>
            </label>
            <input 
              v-model="customer.phone"
              required
              type="tel"
              placeholder="เช่น 081-234-5678"
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">
              ประเภทสินค้า / สินค้าที่นำมาขาย
            </label>
            <input 
              v-model="customer.goodsType"
              type="text"
              placeholder="เช่น เครื่องดื่มสมุนไพร, เสื้อผ้าแฟชั่นมือสอง"
              class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Real-Time Race Condition Protection Alert -->
        <div class="bg-sky-500/10 border border-sky-500/30 rounded-xl p-3 flex items-start gap-2 text-xs text-sky-300">
          <ShieldCheck class="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p>
            ระบบจองแผงใช้ระบบ Real-time Atomic Transaction เพื่อป้องกันการจองซ้ำ (Race Condition) บน Firebase Firestore
          </p>
        </div>

        <!-- Buttons -->
        <div class="pt-2 flex items-center justify-end gap-3">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-xl text-xs transition"
          >
            ยกเลิก
          </button>
          <button 
            type="submit"
            class="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-xs transition flex items-center gap-1.5"
          >
            <CheckCircle class="w-4 h-4" />
            <span>ยืนยันการจอง</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { ShoppingBag, X, ShieldCheck, CheckCircle } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  stall: Object
})

const emit = defineEmits(['close'])
const marketStore = useMarketStore()

const customer = ref({
  name: '',
  phone: '',
  goodsType: ''
})

const stallMetrics = computed(() => {
  return marketStore.getStallMetrics(props.stall)
})

function submitBooking() {
  if (!props.stall) return
  const success = marketStore.bookStall(props.stall.id, customer.value)
  if (success) {
    customer.value = { name: '', phone: '', goodsType: '' }
    emit('close')
  }
}
</script>
