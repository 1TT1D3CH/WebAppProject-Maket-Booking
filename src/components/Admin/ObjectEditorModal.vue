<template>
  <div 
    v-if="isOpen && object"
    class="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-transform text-slate-800 dark:text-slate-100"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90">
      <div class="flex items-center gap-2">
        <component :is="getIconComponent(object.styleProps?.icon)" class="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 class="text-base font-bold text-slate-900 dark:text-white">แก้ไขโครงสร้าง: {{ form.label }}</h2>
      </div>
      <button @click="$emit('close')" class="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg transition">
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Form Content -->
    <div class="p-6 space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm">
      
      <!-- Label -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ชื่อเรียก / ข้อความระบุบนผัง</label>
        <input 
          v-model="form.label"
          type="text" 
          placeholder="เช่น ทางเข้าหลัก A / ห้องน้ำสาธารณะ"
          class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
      </div>

      <!-- Type & Rotation -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">หมุนทิศทาง (Rotation)</label>
          <button 
            type="button"
            @click="rotateObject"
            class="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-semibold flex items-center justify-center gap-2 transition"
          >
            <RotateCw class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{{ form.rotation }}° องศา</span>
          </button>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">สีประจำวัตถุ (Color)</label>
          <div class="flex items-center gap-2">
            <input 
              v-model="form.color" 
              type="color" 
              class="w-10 h-9 rounded-xl bg-transparent cursor-pointer border border-slate-200 dark:border-slate-700 p-0.5"
            />
            <span class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{{ form.color }}</span>
          </div>
        </div>
      </div>

      <!-- Real-world Metric Dimensions (Meters / ตร.ม.) -->
      <div class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Maximize2 class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>ขนาดวัตถุจริง (หน่วย: เมตร)</span>
          </h3>
          <span class="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
            {{ calculatedAreaSqM }} ตร.ม.
          </span>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1">ความกว้าง W (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.widthM" 
                type="number"
                step="0.1"
                min="0.5"
                class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1">ความยาว H (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.heightM" 
                type="number"
                step="0.1"
                min="0.5"
                class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>

          <div>
            <label class="block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1">พิกัดแนวนอน X (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.xM" 
                type="number"
                step="0.5"
                class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1">พิกัดแนวตั้ง Y (เมตร)</label>
            <div class="relative">
              <input 
                v-model.number="form.yM" 
                type="number"
                step="0.5"
                class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 pr-7 py-1.5 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">ม.</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer Actions -->
    <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-3">
      <button 
        @click="deleteObject"
        class="px-3 py-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl font-semibold text-xs transition flex items-center gap-1"
      >
        <Trash2 class="w-4 h-4" />
        <span>ลบวัตถุนี้</span>
      </button>

      <div class="flex items-center gap-2">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs transition"
        >
          ยกเลิก
        </button>
        <button 
          @click="saveChanges"
          class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 dark:shadow-none transition flex items-center gap-1.5 active:scale-95"
        >
          <Check class="w-4 h-4" />
          <span>บันทึกวัตถุ</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { 
  X, 
  Trash2, 
  Check, 
  Maximize2, 
  RotateCw, 
  DoorOpen, 
  LogOut, 
  Footprints, 
  Square, 
  Bath, 
  Mic, 
  Trash2 as TrashIcon, 
  CreditCard, 
  HelpCircle, 
  Cross 
} from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  objectId: String
})

const emit = defineEmits(['close'])
const marketStore = useMarketStore()
const object = ref(null)

const form = ref({
  label: '',
  rotation: 0,
  color: '#6366f1',
  widthM: 3.0,
  heightM: 2.0,
  xM: 0,
  yM: 0
})

watch(() => props.objectId, (newId) => {
  if (newId) {
    const found = marketStore.layoutObjects.find(o => o.id === newId)
    if (found) {
      object.value = found
      const metrics = marketStore.getObjectMetrics(found)
      form.value = { 
        label: found.label,
        rotation: found.rotation || 0,
        color: found.styleProps?.color || '#6366f1',
        widthM: metrics.widthM,
        heightM: metrics.heightM,
        xM: metrics.xM,
        yM: metrics.yM
      }
    }
  } else {
    object.value = null
  }
}, { immediate: true })

const calculatedAreaSqM = computed(() => {
  const w = Number(form.value.widthM) || 0
  const h = Number(form.value.heightM) || 0
  return Math.round((w * h) * 10) / 10
})

function rotateObject() {
  form.value.rotation = (form.value.rotation + 90) % 360
}

function saveChanges() {
  if (object.value) {
    marketStore.updateLayoutObject(object.value.id, { 
      label: form.value.label,
      rotation: form.value.rotation,
      widthM: form.value.widthM,
      heightM: form.value.heightM,
      xM: form.value.xM,
      yM: form.value.yM,
      styleProps: {
        ...object.value.styleProps,
        color: form.value.color
      }
    })
    marketStore.showNotification(`แก้ไขวัตถุ ${form.value.label} แล้ว`, 'success')
    emit('close')
  }
}

function deleteObject() {
  if (object.value) {
    marketStore.removeLayoutObject(object.value.id)
    emit('close')
  }
}

function getIconComponent(iconName) {
  switch (iconName) {
    case 'door-open': return DoorOpen
    case 'log-out': return LogOut
    case 'footprints': return Footprints
    case 'bath': return Bath
    case 'mic': return Mic
    case 'trash-2': return TrashIcon
    case 'credit-card': return CreditCard
    case 'help-circle': return HelpCircle
    case 'cross': return Cross
    default: return Square
  }
}
</script>
