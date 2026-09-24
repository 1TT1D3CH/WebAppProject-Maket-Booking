<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
  >
    <div class="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60">
        <div class="flex items-center gap-2">
          <Maximize2 class="w-5 h-5 text-sky-400" />
          <h2 class="text-base font-bold text-white">ตั้งค่าขนาดและพื้นที่ตลาดรวม (เมตร / ตร.ม.)</h2>
        </div>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1 rounded-lg">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="saveDimensions" class="p-6 space-y-5 text-xs sm:text-sm">
        
        <!-- Market Name -->
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">ชื่อผังตลาด</label>
          <input 
            v-model="form.name"
            type="text"
            required
            class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <!-- Real-world Dimensions (Width & Height in Meters) -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">
              ความกว้างตลาดรวม (เมตร) <span class="text-rose-400">*</span>
            </label>
            <div class="relative">
              <input 
                v-model.number="form.widthMeters"
                type="number"
                step="0.5"
                min="5"
                max="200"
                required
                class="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-8 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">ม.</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">
              ความยาว/ลึกรวม (เมตร) <span class="text-rose-400">*</span>
            </label>
            <div class="relative">
              <input 
                v-model.number="form.heightMeters"
                type="number"
                step="0.5"
                min="5"
                max="200"
                required
                class="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-8 py-2 text-white font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">ม.</span>
            </div>
          </div>
        </div>

        <!-- Calculated Total Area & Scale Preview -->
        <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
              ㎡
            </div>
            <div>
              <div class="text-xs text-slate-400">พื้นที่รวมผังตลาดทั้งหมด</div>
              <div class="text-base font-bold text-white font-mono">
                {{ calculatedArea }} <span class="text-xs font-normal text-slate-400">ตารางเมตร (ตร.ม.)</span>
              </div>
            </div>
          </div>
          <div class="text-right text-[11px] text-slate-400 font-mono">
            1 เมตร = 40px
          </div>
        </div>

        <!-- Grid Snapping Step in Meters -->
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">ความละเอียดระยะกะ Snap (เมตร)</label>
          <select 
            v-model.number="form.gridSnapMeters"
            class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option :value="0.25">0.25 เมตร (25 เซนติเมตร - ละเอียดมาก)</option>
            <option :value="0.5">0.50 เมตร (50 เซนติเมตร - แนะนำ)</option>
            <option :value="1.0">1.00 เมตร (1 เมตร - ผังใหญ่)</option>
          </select>
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
            class="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl text-xs shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"
          >
            <Check class="w-4 h-4" />
            <span>ปรับขนาดตลาด</span>
          </button>
        </div>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { Maximize2, X, Check } from 'lucide-vue-next'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])
const marketStore = useMarketStore()

const form = ref({
  name: '',
  widthMeters: 30,
  heightMeters: 20,
  gridSnapMeters: 0.5
})

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = {
      name: marketStore.marketName,
      widthMeters: marketStore.marketWidthMeters,
      heightMeters: marketStore.marketHeightMeters,
      gridSnapMeters: marketStore.gridSnapMeters
    }
  }
}, { immediate: true })

const calculatedArea = computed(() => {
  const w = Number(form.value.widthMeters) || 0
  const h = Number(form.value.heightMeters) || 0
  return (w * h).toLocaleString('th-TH')
})

function saveDimensions() {
  marketStore.updateMarketDimensions({ ...form.value })
  emit('close')
}
</script>
