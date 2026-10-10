<template>
  <BaseModal :open="isOpen" title="ตั้งค่าการเชื่อมต่อ Firebase Firestore" tone="light" size="sm" mobile-mode="sheet" @close="$emit('close')">
      <div class="space-y-4 text-xs sm:text-sm">
        <p class="text-slate-600 leading-relaxed font-medium">
          ปัจจุบันระบบทำงานในโหมด <strong class="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Local PoC Mode</strong> โดยจะบันทึกข้อมูลผังตลาดและสถานะการจองลงใน Browser LocalStorage 
        </p>

        <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
          <h3 class="text-xs font-bold text-slate-800">หากต้องการเชื่อมต่อกับ Firebase Project จริง:</h3>
          <ol class="list-decimal list-inside text-slate-600 space-y-1 text-xs font-medium">
            <li>สร้างไฟล์ <code class="text-indigo-600 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">.env</code> ใน Root โฟลเดอร์ของโปรเจกต์</li>
            <li>เพิ่ม Key ด้านล่างนี้พร้อมค่าที่ได้จาก Firebase Console:</li>
          </ol>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-400 space-y-1 overflow-x-auto shadow-inner">
          <p>VITE_FIREBASE_API_KEY=AIzaSy...</p>
          <p>VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com</p>
          <p>VITE_FIREBASE_PROJECT_ID=your-project-id</p>
          <p>VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com</p>
          <p>VITE_FIREBASE_MESSAGING_SENDER_ID=123456789</p>
          <p>VITE_FIREBASE_APP_ID=1:123456789:web:abcdef</p>
        </div>
      </div>
    <template #footer>
      <button 
            @click="$emit('close')"
            class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition active:scale-95"
          >
            เข้าใจแล้ว
          </button>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './ui/BaseModal.vue'
import { Flame, X } from 'lucide-vue-next'
defineProps({ isOpen: Boolean })
defineEmits(['close'])
</script>
