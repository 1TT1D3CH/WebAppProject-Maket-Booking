<template>
  <div 
    v-if="isOpen && stall"
    class="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-slate-800 border-l border-slate-700 shadow-2xl flex flex-col transition-transform"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/50">
      <div class="flex items-center gap-2">
        <Sliders class="w-5 h-5 text-sky-400" />
        <h2 class="text-base font-bold text-white">แก้ไขข้อมูลแผงค้า {{ form.stallNo }}</h2>
      </div>
      <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1 rounded-lg">
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Form Content -->
    <div class="p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm">
      
      <!-- Stall No & Zone -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">หมายเลขแผงค้า (Stall No.)</label>
          <input 
            v-model="form.stallNo"
            type="text" 
            class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">โซนสินค้า (Zone)</label>
          <select 
            v-model="form.zoneId"
            @change="onZoneChange"
            class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
          <label class="block text-xs font-medium text-slate-300 mb-1">ราคาค่าเช่าต่อวัน (บาท)</label>
          <input 
            v-model.number="form.price"
            type="number" 
            class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">สถานะแผง (Status)</label>
          <select 
            v-model="form.status"
            class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="available">🟢 ว่าง (Available)</option>
            <option value="booked">🟠 จองแล้ว (Booked)</option>
            <option value="disabled">🔴 ปิดใช้งาน (Disabled)</option>
          </select>
        </div>
      </div>

      <!-- Real-world Metric Dimensions (Meters / ตร.ม.) -->
      <div class="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Maximize2 class="w-3.5 h-3.5 text-sky-400" />
            <span>ขนาดแผงค้าจริง (หน่วย: เมตร)</span>
          </h3>
          <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {{ calculatedAreaSqM }} ตร.ม.
          </span>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] text-slate-400 mb-1">ความกว้าง W (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.widthM" 
                type="number"
                step="0.1"
                min="0.5"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">ม.</span>
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-400 mb-1">ความยาว H (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.heightM" 
                type="number"
                step="0.1"
                min="0.5"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">ม.</span>
            </div>
          </div>

          <div>
            <label class="block text-[11px] text-slate-400 mb-1">พิกัดแนวนอน X (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.xM" 
                type="number"
                step="0.5"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">ม.</span>
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-400 mb-1">พิกัดแนวตั้ง Y (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.yM" 
                type="number"
                step="0.5"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">ม.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes / Details -->
      <div>
        <label class="block text-xs font-medium text-slate-300 mb-1">หมายเหตุเพิ่มเติม</label>
        <textarea 
          v-model="form.notes"
          rows="2"
          placeholder="เช่น มีเต้ารับไฟฟ้า 15A / ติดทางเดินหลัก"
          class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        ></textarea>
      </div>

      <!-- Booked Customer Details (If booked) -->
      <div v-if="form.status === 'booked'" class="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-2">
        <h4 class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
          <User class="w-4 h-4" />
          <span>ข้อมูลผู้จอง</span>
        </h4>
        <div v-if="form.bookedBy" class="text-xs text-slate-300 space-y-1">
          <p><strong>ชื่อผู้จอง:</strong> {{ form.bookedBy.name }}</p>
          <p><strong>เบอร์โทรศัพท์:</strong> {{ form.bookedBy.phone }}</p>
          <p><strong>ประเภทสินค้า:</strong> {{ form.bookedBy.goodsType || 'ไม่ระบุ' }}</p>
          <p class="text-[11px] text-slate-400"><strong>เวลาที่จอง:</strong> {{ formatDate(form.bookedBy.bookedAt) }}</p>
        </div>
        <div v-else class="text-xs text-slate-400 italic">ไม่มีข้อมูลผู้จอง</div>

        <button 
          @click="cancelBooking"
          class="w-full mt-2 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white font-medium rounded-lg text-xs transition"
        >
          ยกเลิกการจองแผงนี้
        </button>
      </div>

    </div>

    <!-- Footer Actions -->
    <div class="p-4 border-t border-slate-700 bg-slate-900/80 flex items-center justify-between gap-3">
      <button 
        @click="deleteStall"
        class="px-3 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 rounded-xl font-medium text-xs transition flex items-center gap-1"
      >
        <Trash2 class="w-4 h-4" />
        <span>ลบแผงค้า</span>
      </button>

      <div class="flex items-center gap-2">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium text-xs transition"
        >
          ยกเลิก
        </button>
        <button 
          @click="saveChanges"
          class="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl text-xs shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"
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
    marketStore.showNotification(`อัปเดตข้อมูลแผง ${form.value.stallNo} สำเร็จ (ขนาด ${form.value.widthM}x${form.value.heightM} ม.)`, 'success')
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
