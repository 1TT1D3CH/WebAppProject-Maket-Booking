<template>
  <div role="group" aria-label="สแนปกริด" class="text-xs">
    <button
      type="button"
      role="menuitemcheckbox"
      :aria-checked="snapToGrid"
      class="w-full flex items-center gap-2 px-2.5 rounded-xl text-left text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      :class="large ? 'py-3' : 'py-2'"
      @click="emit('toggle-snap')"
    >
      <Grid3x3 class="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
      <span class="flex-1 font-medium">สแนปกริด</span>
      <span
        class="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
        :class="snapToGrid
          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'"
      >
        {{ snapToGrid ? 'เปิด' : 'ปิด' }}
      </span>
    </button>

    <div class="px-2.5 pt-1.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      ขนาดช่องกริด
    </div>
    <div class="grid grid-cols-4 gap-1 px-1.5 pb-1">
      <button
        v-for="size in sizes"
        :key="size"
        type="button"
        role="menuitemradio"
        :aria-checked="size === gridSnapMeters"
        class="rounded-lg font-mono font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        :class="[
          large ? 'h-11' : 'h-8',
          size === gridSnapMeters
            ? 'bg-indigo-600 border-indigo-600 text-white'
            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
        ]"
        @click="emit('set-snap-size', size)"
      >
        {{ size }}ม.
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Grid3x3 } from 'lucide-vue-next'

const props = defineProps({
  snapToGrid: Boolean,
  gridSnapMeters: { type: Number, required: true },
  large: Boolean
})

const emit = defineEmits(['toggle-snap', 'set-snap-size'])

const SNAP_SIZES = [0.25, 0.5, 1, 2]

// รวมค่าปัจจุบันด้วย เผื่อค่าที่บันทึกไว้ไม่อยู่ในรายการ
const sizes = computed(() =>
  [...new Set([...SNAP_SIZES, props.gridSnapMeters])].sort((a, b) => a - b)
)
</script>
