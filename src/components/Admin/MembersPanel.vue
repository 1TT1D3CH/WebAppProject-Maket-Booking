<template>
  <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h2 class="text-base font-bold text-slate-900 dark:text-white">รายชื่อสมาชิก (Members)</h2>
        <p class="text-[11px] text-slate-500 dark:text-slate-400">
          {{ filtered.length }} / {{ members.length }} คน
          <span v-if="!authStore.isOwner">· เฉพาะ Owner เท่านั้นที่กำหนดสิทธิ์ Admin ได้</span>
        </p>
      </div>
      <div class="flex items-center gap-2">
        <input
          v-model="keyword"
          type="search"
          placeholder="ค้นหาชื่อ / อีเมล / เบอร์"
          class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          @click="load"
          :disabled="isLoading"
          class="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          {{ isLoading ? 'กำลังโหลด...' : 'รีเฟรช' }}
        </button>
      </div>
    </div>

    <p v-if="error" class="mb-3 text-xs text-rose-600 dark:text-rose-400">{{ error }}</p>

    <div class="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-x-auto shadow-xs">
      <table class="w-full text-xs">
        <thead class="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-left">
          <tr>
            <th class="px-4 py-2.5 font-semibold">ชื่อ</th>
            <th class="px-4 py-2.5 font-semibold">อีเมล / ชื่อผู้ใช้</th>
            <th class="px-4 py-2.5 font-semibold">เบอร์โทร</th>
            <th class="px-4 py-2.5 font-semibold">สิทธิ์</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in filtered" :key="m.uid" class="border-t border-slate-100 dark:border-slate-800">
            <td class="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">{{ m.displayName || '-' }}</td>
            <td class="px-4 py-2.5 text-slate-600 dark:text-slate-400">{{ m.username || m.email }}</td>
            <td class="px-4 py-2.5 text-slate-600 dark:text-slate-400">{{ m.phone || '-' }}</td>
            <td class="px-4 py-2.5">
              <select
                v-if="canEditRole(m)"
                :value="m.role"
                :disabled="savingUid === m.uid"
                @change="setRole(m, $event.target.value)"
                class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="tenant">🛍️ User</option>
                <option value="admin">🛡️ Admin</option>
              </select>
              <span v-else class="font-semibold">{{ roleLabel[m.role] || m.role }}</span>
            </td>
          </tr>
          <tr v-if="!filtered.length && !isLoading">
            <td colspan="4" class="px-4 py-8 text-center text-slate-400">ไม่พบสมาชิก</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db, isRealFirebaseConfigured } from '../../firebase/config'
import { useAuthStore } from '../../stores/authStore'
import { useMarketStore } from '../../stores/marketStore'

const authStore = useAuthStore()
const marketStore = useMarketStore()

const roleLabel = { owner: '👑 Owner', admin: '🛡️ Admin', tenant: '🛍️ User' }
const members = ref([])
const keyword = ref('')
const isLoading = ref(false)
const savingUid = ref(null)
const error = ref('')

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return members.value
  return members.value.filter(m =>
    [m.displayName, m.email, m.username, m.phone].some(v => String(v || '').toLowerCase().includes(k))
  )
})

// เปลี่ยนได้เฉพาะ owner กับบัญชีที่เป็น admin/tenant (ไม่ใช่ owner/superUser/ตัวเอง) — rules บังคับซ้ำฝั่งเซิร์ฟเวอร์
function canEditRole(m) {
  return authStore.isOwner
    && m.uid !== authStore.currentUser?.uid
    && !m.superUser
    && ['admin', 'tenant'].includes(m.role)
}

async function load() {
  if (!isRealFirebaseConfigured || !db) {
    error.value = 'ยังไม่ได้ตั้งค่า Firebase จึงโหลดรายชื่อสมาชิกไม่ได้'
    return
  }
  isLoading.value = true
  error.value = ''
  try {
    const snap = await getDocs(collection(db, 'users'))
    const order = { owner: 0, admin: 1, tenant: 2 }
    members.value = snap.docs
      .map(d => ({ ...d.data(), uid: d.id }))
      .sort((a, b) => (order[a.role] ?? 3) - (order[b.role] ?? 3) || String(a.displayName).localeCompare(String(b.displayName)))
  } catch (err) {
    console.error('Load members error:', err)
    error.value = 'โหลดรายชื่อสมาชิกไม่สำเร็จ: ' + err.message
  } finally {
    isLoading.value = false
  }
}

async function setRole(m, role) {
  if (role === m.role) return
  savingUid.value = m.uid
  try {
    await updateDoc(doc(db, 'users', m.uid), { role })
    m.role = role
    marketStore.showNotification(`ตั้ง ${m.displayName || m.email} เป็น ${roleLabel[role]} แล้ว`, 'success')
  } catch (err) {
    console.error('Set role error:', err)
    marketStore.showNotification('เปลี่ยนสิทธิ์ไม่สำเร็จ: ' + err.message, 'error')
    await load()
  } finally {
    savingUid.value = null
  }
}

onMounted(load)
</script>
