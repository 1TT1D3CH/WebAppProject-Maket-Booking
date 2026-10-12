<template>
  <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
    <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">ประวัติการดำเนินการ</div>
    <div v-if="loading" class="text-xs text-slate-500">กำลังโหลด...</div>
    <div v-else-if="error" class="text-xs text-rose-600 dark:text-rose-400">
      {{ error }} <button type="button" class="underline font-semibold" @click="load">ลองใหม่</button>
    </div>
    <div v-else-if="!rows.length" class="text-xs text-slate-500">ยังไม่มีบันทึก (การจองก่อนเริ่มใช้ audit log)</div>
    <ol v-else class="space-y-2">
      <li v-for="r in rows" :key="r.id" class="text-xs">
        <div class="font-semibold text-slate-800 dark:text-slate-100">{{ actionLabel(r.action) }}</div>
        <div class="text-slate-500 dark:text-slate-400">
          {{ r.actorName || '-' }} ({{ ROLE_LABEL[r.actorRole] || r.actorRole }}) · {{ r.at?.toDate ? formatThaiDateTime(r.at.toDate()) : '-' }}
        </div>
        <div v-if="r.reason" class="text-slate-600 dark:text-slate-300">เหตุผล: {{ r.reason }}</div>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { fetchAuditPage } from '../../../services/auditLog'
import { actionLabel, ROLE_LABEL } from '../../../constants/auditActions'
import { formatThaiDateTime } from '../../../utils/date'

const props = defineProps({ bookingId: { type: String, required: true }, refreshKey: { type: [String, Number], default: '' } })

const rows = ref([])
const loading = ref(false)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    rows.value = (await fetchAuditPage({ bookingId: props.bookingId, pageSize: 20 })).rows
  } catch (err) {
    console.error('Booking audit history error:', err)
    error.value = err?.code === 'failed-precondition' ? 'ดัชนียังสร้างไม่เสร็จ' : 'โหลดประวัติไม่สำเร็จ'
  } finally {
    loading.value = false
  }
}

watch(() => [props.bookingId, props.refreshKey], load, { immediate: true })
</script>
