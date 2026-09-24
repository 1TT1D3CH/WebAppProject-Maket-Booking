<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
  >
    <div class="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60">
        <div class="flex items-center gap-2">
          <Palette class="w-5 h-5 text-purple-400" />
          <h2 class="text-base font-bold text-white">จัดการโซนสินค้าและราคาเริ่มต้น</h2>
        </div>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1 rounded-lg">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6 overflow-y-auto flex-1">
        
        <!-- Add New Zone Form -->
        <div class="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <h3 class="text-xs font-bold text-slate-300 uppercase tracking-wider">เพิ่มโซนสินค้าใหม่</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-[11px] text-slate-400 mb-1">ชื่อโซน</label>
              <input 
                v-model="newZone.name"
                type="text"
                placeholder="เช่น โซนต้นไม้ / ของแต่งบ้าน"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-[11px] text-slate-400 mb-1">ราคา/วัน (฿)</label>
              <input 
                v-model.number="newZone.pricePerDay"
                type="number"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div class="flex items-center justify-between pt-1">
            <div class="flex items-center gap-2">
              <label class="text-[11px] text-slate-400">สีประจำโซน:</label>
              <input 
                v-model="newZone.color" 
                type="color" 
                class="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-slate-700"
              />
              <span class="text-xs font-mono text-slate-300">{{ newZone.color }}</span>
            </div>

            <button
              @click="addNewZone"
              class="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl shadow-md transition flex items-center gap-1"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>เพิ่มโซน</span>
            </button>
          </div>
        </div>

        <!-- Existing Zones List -->
        <div class="space-y-3">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">รายการโซนปัจจุบัน</h3>
          
          <div 
            v-for="zone in marketStore.zones" 
            :key="zone.id"
            class="bg-slate-900 border border-slate-700/70 rounded-2xl p-3 flex items-center justify-between gap-3"
          >
            <div class="flex items-center gap-3">
              <input 
                type="color" 
                v-model="zone.color"
                @change="marketStore.updateZone(zone.id, { color: zone.color })"
                class="w-7 h-7 rounded-lg bg-transparent cursor-pointer border border-slate-700"
              />
              <div>
                <input 
                  type="text" 
                  v-model="zone.name"
                  @blur="marketStore.updateZone(zone.id, { name: zone.name })"
                  class="bg-transparent text-white font-medium text-xs border-b border-transparent focus:border-purple-500 focus:outline-none"
                />
                <div class="text-[10px] text-slate-400">
                  ราคาแนะนำ: ฿{{ zone.pricePerDay }}/วัน
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <input 
                type="number" 
                v-model.number="zone.pricePerDay"
                @blur="marketStore.updateZone(zone.id, { pricePerDay: zone.pricePerDay })"
                class="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs font-mono"
              />
              <button 
                @click="marketStore.removeZone(zone.id)"
                class="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition"
                title="ลบโซน"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-slate-700 bg-slate-900/60 flex justify-end">
        <button 
          @click="$emit('close')"
          class="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl text-xs transition"
        >
          ปิดหน้าต่าง
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMarketStore } from '../../stores/marketStore'
import { Palette, X, Plus, Trash2 } from 'lucide-vue-next'

defineProps({ isOpen: Boolean })
defineEmits(['close'])

const marketStore = useMarketStore()

const newZone = ref({
  name: '',
  color: '#0284c7',
  pricePerDay: 400
})

function addNewZone() {
  if (!newZone.value.name.trim()) return
  marketStore.addZone({ ...newZone.value })
  newZone.value = {
    name: '',
    color: '#0284c7',
    pricePerDay: 400
  }
}
</script>
