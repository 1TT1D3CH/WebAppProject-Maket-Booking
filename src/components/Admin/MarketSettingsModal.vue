<template>
  <BaseModal :open="isOpen" title="ตั้งค่าขนาดและพื้นที่ตลาดรวม (เมตร / ตร.ม.)" tone="light" size="md" mobile-mode="fullscreen" @close="$emit('close')">
      <form id="market-settings-form" @submit.prevent="saveDimensions" class="space-y-5 text-xs sm:text-sm">
        
        <!-- Market Name -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">ชื่อผังตลาด</label>
          <input 
            v-model="form.name"
            type="text"
            required
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <!-- Real-world Dimensions (Width & Height in Meters) -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              ความกว้างตลาดรวม (เมตร) <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <input 
                v-model.number="form.widthMeters"
                type="number"
                step="0.5"
                min="5"
                max="200"
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">ม.</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              ความยาว/ลึกรวม (เมตร) <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <input 
                v-model.number="form.heightMeters"
                type="number"
                step="0.5"
                min="5"
                max="200"
                required
                class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">ม.</span>
            </div>
          </div>
        </div>

        <!-- Calculated Total Area & Scale Preview -->
        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
              ㎡
            </div>
            <div>
              <div class="text-xs text-slate-500 font-medium">พื้นที่รวมผังตลาดทั้งหมด</div>
              <div class="text-base font-bold text-slate-900 font-mono">
                {{ calculatedArea }} <span class="text-xs font-normal text-slate-500">ตารางเมตร (ตร.ม.)</span>
              </div>
            </div>
          </div>
          <div class="text-right text-[11px] text-slate-400 font-mono">
            1 เมตร = 40px
          </div>
        </div>

        <!-- Grid Snapping Step in Meters -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">ความละเอียดระยะกะ Snap (เมตร)</label>
          <select 
            v-model.number="form.gridSnapMeters"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          >
            <option :value="0.25">0.25 เมตร (25 เซนติเมตร - ละเอียดมาก)</option>
            <option :value="0.5">0.50 เมตร (50 เซนติเมตร - แนะนำ)</option>
            <option :value="1.0">1.00 เมตร (1 เมตร - ผังใหญ่)</option>
          </select>
        </div>

      </form>

      <!-- เติมชื่อร้าน/ประเภทสินค้าให้การจองเก่า (กดเองเท่านั้น) -->
      <div v-if="authStore.isAdmin" class="mt-5 pt-4 border-t border-slate-200 text-xs space-y-2">
        <div class="font-semibold text-slate-700">เติมข้อมูลร้านค้าให้การจองเก่า</div>
        <p class="text-slate-500">การจองที่ทำก่อนมีฟีเจอร์ "ดูว่าแผงขายอะไร" จะแสดง "ไม่ได้ระบุ" กดปุ่มนี้เพื่อคัดลอกประเภทสินค้า/ชื่อร้านจากรายการจองมาแสดงบนแผง (ไม่แสดงชื่อจริงหรือเบอร์โทร)</p>
        <button
          type="button"
          :disabled="backfilling"
          @click="runBackfill"
          class="px-4 py-2 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition disabled:opacity-50"
        >
          {{ backfilling ? 'กำลังเติมข้อมูล...' : 'เติมข้อมูลร้านค้าให้การจองเก่า' }}
        </button>
      </div>
    <template #footer>
      <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
          >
            ยกเลิก
          </button>
      <button 
            type="submit" form="market-settings-form"
            class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition flex items-center gap-1.5 active:scale-95"
          >
            <Check class="w-4 h-4" />
            <span>ปรับขนาดตลาด</span>
          </button>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from '../ui/BaseModal.vue'
import { ref, computed, watch } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { useAuthStore } from '../../stores/authStore'
import { backfillPublicBookingInfo } from '../../services/firebaseService'
import { Maximize2, X, Check } from 'lucide-vue-next'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])
const marketStore = useMarketStore()
const authStore = useAuthStore()
const backfilling = ref(false)

async function runBackfill() {
  backfilling.value = true
  try {
    const { updated, skipped } = await backfillPublicBookingInfo()
    marketStore.showNotification(`เติมข้อมูลร้านค้าแล้ว ${updated} แผง (ข้าม ${skipped})`, 'success')
  } catch (err) {
    console.error('Backfill error:', err)
    marketStore.showNotification(err.message || 'เติมข้อมูลไม่สำเร็จ', 'error')
  } finally {
    backfilling.value = false
  }
}

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
