<template>
  <button
    ref="buttonEl"
    type="button"
    class="inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
    :class="[sizeClass, variantClass]"
    :aria-label="ariaLabel"
    :aria-pressed="toggle ? active : undefined"
    :title="label"
  >
    <component :is="icon" v-if="icon" class="w-4 h-4 shrink-0" />
    <span v-if="showLabel">{{ text ?? label }}</span>
    <ChevronDown v-if="caret" class="w-3 h-3 shrink-0 opacity-70" />
  </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  // ชื่อที่ใช้กับ screen reader และ tooltip
  label: { type: String, required: true },
  // ข้อความที่แสดงบนปุ่ม (ถ้าไม่ระบุใช้ label)
  text: { type: String, default: null },
  icon: { type: [Object, Function], default: null },
  // 'primary' ใช้กับปุ่มหลักปุ่มเดียว (เพิ่มแผง) ที่เหลือเป็น 'ghost'
  variant: { type: String, default: 'ghost' },
  active: Boolean,
  toggle: Boolean,
  showLabel: { type: Boolean, default: true },
  caret: Boolean,
  // 'md' = 32px (เดสก์ท็อป), 'lg' = 44px (มือถือ)
  size: { type: String, default: 'md' },
  // ปุ่มแคบสำหรับลูกศรเปิดเมนูที่ติดกับปุ่มอื่น
  compact: Boolean
})

const buttonEl = ref(null)

const iconOnly = computed(() => !props.showLabel && !props.caret)

// ถ้าไม่มีข้อความบนปุ่ม หรือข้อความไม่ได้บอกความหมาย (เช่น "100%") ให้ใช้ label เป็น aria-label
const ariaLabel = computed(() =>
  !props.showLabel || (props.text && props.text !== props.label) ? props.label : undefined
)

const sizeClass = computed(() => {
  if (props.size === 'lg') return iconOnly.value ? 'h-11 w-11' : 'h-11 px-3'
  if (props.compact) return 'h-8 w-6'
  return iconOnly.value ? 'h-8 w-8' : 'h-8 px-2.5'
})

const variantClass = computed(() => {
  if (props.variant === 'primary') {
    return 'bg-indigo-600 hover:bg-indigo-700 text-white'
  }
  return props.active
    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
})

defineExpose({ el: buttonEl })
</script>
