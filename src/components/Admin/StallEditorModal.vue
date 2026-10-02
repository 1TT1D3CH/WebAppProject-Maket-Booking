<template>
  <div 
    v-if="isOpen && stall"
    class="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white border-l border-slate-200/90 shadow-2xl flex flex-col transition-transform text-slate-800"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/80">
      <div class="flex items-center gap-2">
        <Sliders class="w-5 h-5 text-indigo-600" />
        <h2 class="text-base font-bold text-slate-900">แก้ไขข้อมูลแผงค้า {{ form.stallNo }}</h2>
      </div>
      <button @click="$emit('close')" class="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition">
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Form Content -->
    <div class="p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm">
      
      <!-- Stall No & Zone -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">หมายเลขแผงค้า (Stall No.)</label>
          <input 
            v-model="form.stallNo"
            type="text" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">โซนสินค้า (Zone)</label>
          <select 
            v-model="form.zoneId"
            @change="onZoneChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          >
            <option v-for="zone in marketStore.zones" :key="zone.id" :value="zone.id">
              {{ zone.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Price & Status -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">ราคาค่าเช่าต่อวัน (บาท)</label>
          <input 
            v-model.number="form.price"
            type="number" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">สถานะแผง (Status)</label>
          <select 
            v-model="form.status"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition font-medium"
          >
            <option value="available">🟢 ว่าง (Available)</option>
            <option value="booked">🟠 จองแล้ว (Booked)</option>
            <option value="disabled">🔴 ปิดใช้งาน (Disabled)</option>
          </select>
        </div>
      </div>

      <!-- Real-world Metric Dimensions (Meters / ตร.ม.) -->
      <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Maximize2 class="w-3.5 h-3.5 text-indigo-600" />
            <span>ขนาดแผงค้าจริง (หน่วย: เมตร)</span>
          </h3>
          <span class="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
            {{ calculatedAreaSqM }} ตร.ม.
          </span>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] text-slate-500 font-medium mb-1">ความกว้าง W (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.widthM" 
                type="number"
                step="0.1"
                min="0.5"
                class="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-500 font-medium mb-1">ความยาว H (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.heightM" 
                type="number"
                step="0.1"
                min="0.5"
                class="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>

          <div>
            <label class="block text-[11px] text-slate-500 font-medium mb-1">พิกัดแนวนอน X (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.xM" 
                type="number"
                step="0.5"
                class="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-500 font-medium mb-1">พิกัดแนวตั้ง Y (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.yM" 
                type="number"
                step="0.5"
                class="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes / Details -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">หมายเหตุเพิ่มเติม</label>
        <textarea 
          v-model="form.notes"
          rows="2"
          placeholder="เช่น มีเต้ารับไฟฟ้า 15A / ติดทางเดินหลัก"
          class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        ></textarea>
      </div>

      <!-- Booked Customer Details (If booked) -->
      <div v-if="form.status === 'booked'" class="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
        <h4 class="text-xs font-bold text-amber-900 flex items-center gap-1.5">
          <User class="w-4 h-4 text-amber-600" />
          <span>ข้อมูลผู้จอง</span>
        </h4>
        <div v-if="form.bookedBy" class="text-xs text-slate-700 space-y-1 font-medium">
          <p><strong>ชื่อผู้จอง:</strong> {{ form.bookedBy.name }}</p>
          <p><strong>เบอร์โทรศัพท์:</strong> {{ form.bookedBy.phone }}</p>
          <p><strong>ประเภทสินค้า:</strong> {{ form.bookedBy.goodsType || 'ไม่ระบุ' }}</p>
          <p class="text-[11px] text-slate-500"><strong>เวลาที่จอง:</strong> {{ formatDate(form.bookedBy.bookedAt) }}</p>
        </div>
        <div v-else class="text-xs text-slate-500 italic">ไม่มีข้อมูลผู้จอง</div>

        <button 
          @click="cancelBooking"
          class="w-full mt-2 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs transition shadow-sm"
        >
          ยกเลิกการจองแผงนี้
        </button>
      </div>

    </div>

    <!-- Footer Actions -->
    <div class="p-4 border-t border-slate-200/80 bg-slate-50/80 flex items-center justify-between gap-3">
      <button 
        @click="deleteStall"
        class="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-semibold text-xs transition flex items-center gap-1"
      >
        <Trash2 class="w-4 h-4" />
        <span>ลบแผงค้า</span>
      </button>

      <div class="flex items-center gap-2">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition"
        >
          ยกเลิก
        </button>
        <button 
          @click="saveChanges"
          class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition flex items-center gap-1.5 active:scale-95"
        >
          <Check class="w-4 h-4" />
          <span>บันทึกการปรับเปลี่ยน</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { Sliders, X, User, Trash2, Check, Maximize2 } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  stallId: String
})

const emit = defineEmits(['close'])
const marketStore = useMarketStore()
const stall = ref(null)

const form = ref({
  stallNo: '',
  zoneId: '',
  price: 0,
  status: 'available',
  xM: 0,
  yM: 0,
  widthM: 2.5,
  heightM: 2.0,
  notes: '',
  bookedBy: null
})

watch(() => props.stallId, (newId) => {
  if (newId) {
    const found = marketStore.stalls.find(s => s.id === newId)
    if (found) {
      stall.value = found
      const metrics = marketStore.getStallMetrics(found)
      form.value = { 
        ...found,
        widthM: metrics.widthM,
        heightM: metrics.heightM,
        xM: metrics.xM,
        yM: metrics.yM
      }
    }
  } else {
    stall.value = null
  }
}, { immediate: true })

const calculatedAreaSqM = computed(() => {
  const w = Number(form.value.widthM) || 0
  const h = Number(form.value.heightM) || 0
  return Math.round((w * h) * 10) / 10
})

function onZoneChange() {
  const zone = marketStore.getZoneById(form.value.zoneId)
  if (zone && zone.pricePerDay) {
    form.value.price = zone.pricePerDay
  }
}

function saveChanges() {
  if (stall.value) {
    marketStore.updateStall(stall.value.id, { ...form.value })
    marketStore.showNotification(`แก้ไขแผง ${form.value.stallNo} แล้ว — กด "บันทึกผัง" เพื่อยืนยัน`, 'warning')
    emit('close')
  }
}

function deleteStall() {
  if (stall.value) {
    marketStore.removeStall(stall.value.id)
    emit('close')
  }
}

function cancelBooking() {
  if (stall.value) {
    marketStore.cancelBooking(stall.value.id)
    form.value.status = 'available'
    form.value.bookedBy = null
  }
}

function formatDate(isoStr) {
  if (!isoStr) return '-'
  try {
    return new Date(isoStr).toLocaleString('th-TH')
  } catch {
    return isoStr
  }
}
</script>
