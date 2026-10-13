<template>
  <section class="absolute inset-0 flex flex-col bg-slate-50 dark:bg-slate-950">
    <div class="shrink-0 p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-bold text-slate-900 dark:text-white">บันทึกการทำงาน</h2>
        <span class="text-[11px] text-slate-500 dark:text-slate-400">โหลดแล้ว {{ store.rows.length }} รายการ</span>
      </div>
      <!-- เฉพาะ owner: ลบบันทึกที่แสดงอยู่ทั้งหมด (ตามตัวกรอง) -->
      <div v-if="authStore.isOwner && store.visible.length" class="flex items-center justify-between gap-2 rounded-xl border border-rose-200 dark:border-rose-900 px-3 py-2">
        <span class="text-xs text-slate-600 dark:text-slate-300">ลบบันทึกที่แสดงอยู่ {{ store.visible.length }} รายการ</span>
        <button type="button" class="min-h-[44px] px-4 rounded-xl border-2 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-sm font-semibold inline-flex items-center gap-1.5" :disabled="deleting" @click="removeMany">
          <Trash2 class="w-4 h-4" /> {{ deleting ? 'กำลังลบ...' : 'ลบทั้งหมดที่แสดง' }}
        </button>
      </div>

      <form class="grid grid-cols-2 lg:grid-cols-6 gap-2" @submit.prevent="store.load()">
        <label class="text-[11px] text-slate-500 dark:text-slate-400">ตั้งแต่วันที่
          <input v-model="store.filters.from" type="date" class="field" />
        </label>
        <label class="text-[11px] text-slate-500 dark:text-slate-400">ถึงวันที่
          <input v-model="store.filters.to" type="date" class="field" />
        </label>
        <label class="text-[11px] text-slate-500 dark:text-slate-400">การกระทำ
          <select v-model="store.filters.action" class="field" :disabled="!!store.filters.bookingId.trim()">
            <option value="">ทั้งหมด</option>
            <option v-for="(label, key) in AUDIT_ACTIONS" :key="key" :value="key">{{ label }}</option>
          </select>
        </label>
        <label class="text-[11px] text-slate-500 dark:text-slate-400">เลขการจอง (ตรงตัว)
          <input v-model="store.filters.bookingId" type="text" class="field" placeholder="เช่น 7Xk2..." />
        </label>
        <label class="text-[11px] text-slate-500 dark:text-slate-400">คนทำ (ชื่อ)
          <input v-model="store.filters.actor" type="text" class="field" />
        </label>
        <label class="text-[11px] text-slate-500 dark:text-slate-400">ค้นหา เลขแผง / เหตุผล
          <input v-model="store.filters.text" type="text" class="field" placeholder="เช่น A-01" />
        </label>
        <button type="submit" class="col-span-2 lg:col-span-6 min-h-[44px] rounded-xl bg-indigo-600 text-white text-sm font-semibold">ค้นหา</button>
      </form>
    </div>

    <div class="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div v-if="store.error" class="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-3 text-sm text-rose-700 dark:text-rose-300">
        {{ store.error }}
        <button type="button" class="block mt-2 underline font-semibold min-h-[36px]" @click="store.load()">ลองใหม่</button>
      </div>
      <div v-else-if="!store.rows.length && store.loading" class="py-10 text-center text-sm text-slate-500">กำลังโหลด...</div>
      <div v-else-if="!store.visible.length" class="py-10 text-center text-sm text-slate-500">ไม่พบรายการ</div>

      <!-- คอม / iPad แนวนอน: ตาราง -->
      <table v-else-if="isDesktop" class="w-full text-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <thead class="text-left text-[11px] uppercase text-slate-500 bg-slate-100 dark:bg-slate-800">
          <tr>
            <th class="p-3">เวลา</th><th class="p-3">คนทำ</th><th class="p-3">การกระทำ</th>
            <th class="p-3">เป้าหมาย</th><th class="p-3">การเปลี่ยนแปลง</th><th class="p-3">เหตุผล</th>
            <th v-if="authStore.isOwner" class="p-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in store.visible" :key="r.id" class="border-t border-slate-100 dark:border-slate-800 align-top">
            <td class="p-3 whitespace-nowrap text-xs">{{ timeOf(r) }}</td>
            <td class="p-3">{{ r.actorName || '-' }}<div class="text-[11px] text-slate-500">{{ ROLE_LABEL[r.actorRole] || r.actorRole }}</div></td>
            <td class="p-3 font-semibold">{{ actionLabel(r.action) }}</td>
            <td class="p-3 text-xs">{{ targetOf(r) }}</td>
            <td class="p-3 text-xs">{{ changeOf(r) }}</td>
            <td class="p-3 text-xs">{{ r.reason || '-' }}</td>
            <td v-if="authStore.isOwner" class="p-3">
              <button type="button" class="w-11 h-11 inline-flex items-center justify-center rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40" aria-label="ลบบันทึกนี้" :disabled="deleting" @click="removeOne(r)"><Trash2 class="w-4 h-4" /></button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- มือถือ: การ์ด -->
      <div v-else class="space-y-2">
        <div v-for="r in store.visible" :key="r.id" class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-sm text-slate-900 dark:text-white">{{ actionLabel(r.action) }}</span>
            <span class="text-[11px] text-slate-500 shrink-0">{{ timeOf(r) }}</span>
          </div>
          <div class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            {{ r.actorName || '-' }} · {{ ROLE_LABEL[r.actorRole] || r.actorRole }} · {{ targetOf(r) }}
          </div>
          <div v-if="changeOf(r)" class="text-xs text-indigo-700 dark:text-indigo-300 mt-1">{{ changeOf(r) }}</div>
          <div v-if="r.reason" class="text-xs text-slate-500 mt-1">เหตุผล: {{ r.reason }}</div>
          <button v-if="authStore.isOwner" type="button" class="mt-2 min-h-[44px] px-3 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-semibold inline-flex items-center gap-1.5 border border-rose-200 dark:border-rose-900" :disabled="deleting" @click="removeOne(r)">
            <Trash2 class="w-4 h-4" /> ลบบันทึกนี้
          </button>
        </div>
      </div>

      <button
        v-if="store.rows.length && !store.done" type="button" :disabled="store.loading"
        class="w-full mt-3 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200"
        @click="store.loadMore()"
      >{{ store.loading ? 'กำลังโหลด...' : 'โหลดเพิ่ม' }}</button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import { useAuditLogStore } from '../../stores/auditLogStore'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'
import { useBreakpoint } from '../../composables/useBreakpoint'
import { AUDIT_ACTIONS, ROLE_LABEL, STATUS_LABEL_TH, actionLabel } from '../../constants/auditActions'
import { summarizeChange } from '../../utils/auditDiff'
import { formatThaiDateTime } from '../../utils/date'

const store = useAuditLogStore()
const authStore = useAuthStore()
const marketStore = useMarketStore()
const deleting = ref(false)
const { isDesktop } = useBreakpoint()

onMounted(() => { if (!store.rows.length) store.load() })

// ลบบันทึกการทำงาน (เฉพาะ owner) ยืนยัน 2 รอบ กู้คืนไม่ได้ แต่จะเหลือบันทึก "ลบบันทึกการทำงาน" ไว้ 1 รายการ
async function runRemove(rows, label) {
  if (deleting.value || !rows.length) return
  if (!window.confirm(`ลบ${label}?
ลบแล้วกู้คืนไม่ได้`)) return
  if (!window.confirm(`ยืนยันอีกครั้ง: ลบ${label} จริง ๆ ใช่ไหม?`)) return
  deleting.value = true
  try {
    const n = await store.remove(rows, authStore.auditActor)
    marketStore.showNotification(`ลบบันทึกการทำงาน ${n} รายการ`, 'success')
  } catch (err) {
    console.error('Delete audit logs error:', err)
    marketStore.showNotification(err.code === 'permission-denied' ? 'ไม่มีสิทธิ์ลบ (เฉพาะ owner หรือ rules ยังไม่ได้ deploy)' : (err.message || 'ลบไม่สำเร็จ'), 'error')
  } finally {
    deleting.value = false
  }
}
const removeOne = (r) => runRemove([r], `บันทึก "${actionLabel(r.action)}" รายการนี้`)
const removeMany = () => runRemove([...store.visible], `บันทึกการทำงานที่แสดงอยู่ ${store.visible.length} รายการ`)

const timeOf = (r) => (r.at?.toDate ? formatThaiDateTime(r.at.toDate()) : '-')

function targetOf(r) {
  const stallNo = r.after?.stallNo || r.before?.stallNo
  if (r.targetType === 'booking') return `การจอง ${stallNo ? `แผง ${stallNo} · ` : ''}${String(r.targetId).slice(0, 8)}`
  if (r.targetType === 'user') return `ผู้ใช้ ${String(r.targetId).slice(0, 8)}`
  return `${r.targetType} ${r.targetId}`
}

const FIELD_LABEL = { status: 'สถานะ', role: 'สิทธิ์' }
function changeOf(r) {
  const { stallNo, ...after } = r.after || {}
  const fmt = (k, v) => (k === 'status' ? STATUS_LABEL_TH[v] || v : k === 'role' ? ROLE_LABEL[v] || v : v)
  const labelled = (o) => Object.fromEntries(Object.entries(o || {}).map(([k, v]) => [FIELD_LABEL[k] || k, v]))
  const f = (k, v) => fmt(Object.keys(FIELD_LABEL).find(x => FIELD_LABEL[x] === k) || k, v)
  return summarizeChange(labelled(r.before), labelled(after), f)
}
</script>

<style scoped>
.field {
  display: block;
  width: 100%;
  min-height: 44px;
  margin-top: 2px;
  padding: 0 0.75rem;
  font-size: 16px;
  border-radius: 0.75rem;
  border: 1px solid rgb(203 213 225);
  background: white;
  color: rgb(15 23 42);
}
:global(.dark) .field {
  background: rgb(15 23 42);
  border-color: rgb(51 65 85);
  color: rgb(241 245 249);
}
</style>
