<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
  >
    <div class="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-900/60">
        <div class="flex items-center gap-2">
          <Flame class="w-5 h-5 text-amber-500" />
          <h2 class="text-base font-bold text-white">ตั้งค่าการเชื่อมต่อ Firebase Firestore</h2>
        </div>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white p-1 rounded-lg">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Body -->
      <div class="p-6 space-y-4 text-xs sm:text-sm">
        <p class="text-slate-300 leading-relaxed">
          ปัจจุบันระบบทำงานในโหมด <strong class="text-amber-400">Local PoC Mode</strong> โดยจะบันทึกข้อมูลผังตลาดและสถานะการจองลงใน Browser LocalStorage 
        </p>

        <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 space-y-2">
          <h3 class="text-xs font-bold text-slate-200">หากต้องการเชื่อมต่อกับ Firebase Project จริง:</h3>
          <ol class="list-decimal list-inside text-slate-400 space-y-1 text-xs">
            <li>สร้างไฟล์ <code class="text-sky-400 font-mono bg-slate-950 px-1 py-0.5 rounded">.env</code> ใน Root โฟลเดอร์ของโปรเจกต์</li>
            <li>เพิ่ม Key ด้านล่างนี้พร้อมค่าที่ได้จาก Firebase Console:</li>
          </ol>
        </div>

        <div class="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-400 space-y-1 overflow-x-auto">
          <p>VITE_FIREBASE_API_KEY=AIzaSy...</p>
          <p>VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com</p>
          <p>VITE_FIREBASE_PROJECT_ID=your-project-id</p>
          <p>VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com</p>
          <p>VITE_FIREBASE_MESSAGING_SENDER_ID=123456789</p>
          <p>VITE_FIREBASE_APP_ID=1:123456789:web:abcdef</p>
        </div>

        <div class="pt-2 flex justify-end">
          <button 
            @click="$emit('close')"
            class="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl text-xs transition"
          >
            เข้าใจแล้ว
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Flame, X } from 'lucide-vue-next'
defineProps({ isOpen: Boolean })
defineEmits(['close'])
</script>
