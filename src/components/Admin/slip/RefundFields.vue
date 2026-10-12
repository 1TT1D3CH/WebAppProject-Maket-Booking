<template>
  <div class="rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 space-y-2 text-xs">
    <div>
      <span class="font-semibold">ยอดคืนที่แนะนำตามนโยบาย:</span>
      <strong class="font-mono ml-1">{{ fmt(suggestion.amount) }}</strong>
      <span class="text-slate-500"> จากที่จ่าย {{ fmt(paid) }}</span>
      <div class="text-slate-500">{{ suggestion.reasonText }}</div>
    </div>
    <label class="block font-semibold text-slate-600 dark:text-slate-300">ยอดที่จะคืน (บาท)
      <input :value="amount" type="number" min="0" step="0.01" class="field" @input="$emit('update:amount', $event.target.value === '' ? '' : Number($event.target.value))" />
    </label>
    <label v-if="differs" class="block font-semibold text-amber-700 dark:text-amber-300">ยอดต่างจากที่แนะนำ ต้องระบุเหตุผล *
      <input :value="adjust" type="text" maxlength="300" class="field" placeholder="เช่น หักค่าดำเนินการ / คืนเต็มเพราะตลาดปิด" @input="$emit('update:adjust', $event.target.value)" />
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatBaht } from '../../../utils/receipt'

const props = defineProps({
  amount: { type: [Number, String], default: 0 },
  adjust: { type: String, default: '' },
  suggestion: { type: Object, required: true },
  paid: { type: [Number, String], default: 0 }
})
defineEmits(['update:amount', 'update:adjust'])

const fmt = (n) => formatBaht(n)
const differs = computed(() => Number(props.amount) !== props.suggestion.amount)
</script>

<style scoped>
.field { display: block; width: 100%; min-height: 44px; margin-top: 2px; padding: 8px 12px; font-size: 16px; border-radius: 12px; border: 1px solid rgb(203 213 225); background: white; color: rgb(15 23 42); }
:global(.dark) .field { background: rgb(15 23 42); border-color: rgb(51 65 85); color: rgb(241 245 249); }
</style>
