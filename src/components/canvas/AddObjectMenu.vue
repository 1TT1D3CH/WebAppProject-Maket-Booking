<template>
  <div class="text-xs">
    <section v-for="cat in categories" :key="cat.id" class="py-1">
      <h4 class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {{ cat.label }}
      </h4>
      <button
        v-for="preset in cat.presets"
        :key="presetKey(preset)"
        type="button"
        class="w-full flex items-center justify-between gap-2 px-2.5 rounded-xl text-left text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        :class="large ? 'py-2.5' : 'py-1.5'"
        @click="emit('select', preset)"
      >
        <span class="flex items-center gap-2 min-w-0">
          <component :is="getIconComponent(preset.styleProps.icon)" class="w-4 h-4 shrink-0" :style="{ color: preset.styleProps.color }" />
          <span class="truncate font-medium">{{ thaiLabel(preset) }}</span>
        </span>
        <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">{{ preset.widthM }}×{{ preset.heightM }}ม.</span>
      </button>
    </section>
  </div>
</template>

<script setup>
import { ARCHITECTURE_PRESETS } from '../../types/market'
import { getIconComponent } from '../../utils/icons'

defineProps({
  // แสดงรายการสูงขึ้นสำหรับจอสัมผัส
  large: Boolean
})

const emit = defineEmits(['select'])

// หมวดเดียวกับ dropdown 3 อันเดิม
const categories = [
  {
    id: 'access',
    label: 'ทางเข้า/ออก',
    presets: ARCHITECTURE_PRESETS.filter(p => ['entrance', 'exit', 'walkway'].includes(p.type))
  },
  {
    id: 'facility',
    label: 'สิ่งอำนวยความสะดวก',
    presets: ARCHITECTURE_PRESETS.filter(p => p.type === 'facility' || p.subType === 'restroom')
  },
  {
    id: 'structure',
    label: 'โครงสร้างหลัก',
    presets: ARCHITECTURE_PRESETS.filter(p => p.type === 'restricted' && p.subType !== 'restroom')
  }
]

function presetKey(preset) {
  return `${preset.type}:${preset.subType}`
}

// ชื่อใน preset มีภาษาอังกฤษในวงเล็บต่อท้าย เช่น "ห้องน้ำ (Restroom)" ให้แสดงเฉพาะภาษาไทย
function thaiLabel(preset) {
  return preset.label.replace(/\s*\([^)]*\)\s*$/, '')
}
</script>
