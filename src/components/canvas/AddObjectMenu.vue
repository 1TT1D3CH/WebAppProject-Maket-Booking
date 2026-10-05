<template>
  <div class="text-xs" @keydown="handleKeydown">
    <!-- ค้นหา -->
    <div class="relative p-1">
      <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
      <input
        v-model="search"
        data-autofocus
        type="search"
        role="combobox"
        aria-label="ค้นหาวัตถุ"
        aria-autocomplete="list"
        :aria-controls="listId"
        aria-expanded="true"
        :aria-activedescendant="activeOptionId"
        placeholder="ค้นหา..."
        class="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-8 pr-2.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
        :class="large ? 'h-11 text-sm' : 'h-8'"
      />
    </div>

    <div :id="listId" role="listbox" aria-label="วัตถุที่เพิ่มได้">
      <section v-for="section in sections" :key="section.id" class="py-1" role="group" :aria-label="section.label">
        <h4 class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Clock v-if="section.id === 'recent'" class="w-3 h-3" />
          {{ section.label }}
        </h4>
        <div :class="section.id === 'recent' ? 'grid grid-cols-2 gap-0.5' : ''">
          <button
            v-for="item in section.items"
            :id="item.optionId"
            :key="item.optionId"
            type="button"
            role="option"
            tabindex="-1"
            :aria-selected="item.index === activeIndex"
            class="w-full flex items-center justify-between gap-2 px-2.5 rounded-xl text-left text-slate-700 dark:text-slate-200 transition-colors"
            :class="[
              large ? 'py-2.5' : 'py-1.5',
              item.index === activeIndex ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            ]"
            @mouseenter="activeIndex = item.index"
            @click="select(item.preset)"
          >
            <span class="flex items-center gap-2 min-w-0">
              <component :is="getIconComponent(item.preset.styleProps.icon)" class="w-4 h-4 shrink-0" :style="{ color: item.preset.styleProps.color }" />
              <span class="truncate font-medium">{{ thaiLabel(item.preset) }}</span>
            </span>
            <span
              v-if="section.id !== 'recent'"
              class="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0"
            >
              {{ item.preset.widthM }}×{{ item.preset.heightM }}ม.
            </span>
          </button>
        </div>
      </section>

      <p v-if="flatItems.length === 0" class="px-2.5 py-4 text-center text-slate-500 dark:text-slate-400">
        ไม่พบวัตถุที่ค้นหา
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { Search, Clock } from 'lucide-vue-next'
import { ARCHITECTURE_PRESETS } from '../../types/market'
import { getIconComponent } from '../../utils/icons'

defineProps({
  // แสดงรายการสูงขึ้นสำหรับจอสัมผัส
  large: Boolean
})

const emit = defineEmits(['select'])

const RECENT_KEY = 'admin_recent_objects'
const RECENT_LIMIT = 4
// ค่าเริ่มต้นของ "ใช้ล่าสุด" = ปุ่มไอคอนด่วนเดิม
const DEFAULT_RECENT = ['walkway:main_path', 'entrance:gate', 'restricted:restroom', 'restricted:stage']

const listId = `add-object-list-${Math.random().toString(36).slice(2, 8)}`

// หมวดเดียวกับ dropdown 3 อันเดิม
const CATEGORIES = [
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

function loadRecent() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENT_KEY))
    if (Array.isArray(parsed)) return parsed.filter(k => typeof k === 'string')
  } catch {
    // ข้อมูลเสียหรือไม่มี localStorage ใช้ค่าเริ่มต้น
  }
  return DEFAULT_RECENT
}

function saveRecent(keys) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(keys))
  } catch {
    // จำไม่ได้ก็ไม่เป็นไร
  }
}

const recentKeys = ref(loadRecent())
const search = ref('')
const activeIndex = ref(0)

const recentPresets = computed(() =>
  recentKeys.value
    .map(key => ARCHITECTURE_PRESETS.find(p => presetKey(p) === key))
    .filter(Boolean)
    .slice(0, RECENT_LIMIT)
)

// ค้นได้ทั้งชื่อไทยและอังกฤษ
const sections = computed(() => {
  const q = search.value.trim().toLowerCase()
  const raw = q
    ? CATEGORIES.map(cat => ({
        ...cat,
        presets: cat.presets.filter(p => p.label.toLowerCase().includes(q))
      }))
    : [{ id: 'recent', label: 'ใช้ล่าสุด', presets: recentPresets.value }, ...CATEGORIES]

  let index = 0
  return raw
    .filter(section => section.presets.length > 0)
    .map(section => ({
      id: section.id,
      label: section.label,
      items: section.presets.map(preset => ({
        preset,
        index: index++,
        optionId: `${listId}-${section.id}-${presetKey(preset)}`
      }))
    }))
})

const flatItems = computed(() => sections.value.flatMap(s => s.items))
const activeOptionId = computed(() => flatItems.value[activeIndex.value]?.optionId)

watch(search, () => {
  activeIndex.value = 0
})

function scrollActiveIntoView() {
  nextTick(() => {
    const id = activeOptionId.value
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'nearest' })
  })
}

function handleKeydown(e) {
  const count = flatItems.value.length
  if (e.key === 'ArrowDown' && count) {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % count
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp' && count) {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + count) % count
    scrollActiveIntoView()
  } else if (e.key === 'Enter') {
    const item = flatItems.value[activeIndex.value]
    if (item) {
      e.preventDefault()
      select(item.preset)
    }
  }
}

function select(preset) {
  const key = presetKey(preset)
  recentKeys.value = [key, ...recentKeys.value.filter(k => k !== key)].slice(0, RECENT_LIMIT)
  saveRecent(recentKeys.value)
  emit('select', preset)
}
</script>
