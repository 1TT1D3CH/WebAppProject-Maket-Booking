import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

function showFatalError(err) {
  console.error('เริ่มแอปไม่สำเร็จ:', err)
  const el = document.getElementById('app')
  el.className = 'min-h-screen flex items-center justify-center bg-slate-50 text-slate-700 font-sans'
  el.textContent = 'ระบบขัดข้อง กรุณาลองใหม่ภายหลัง'
}

// โหลด App แบบ dynamic เพื่อดักข้อผิดพลาดตอนเริ่ม (เช่น config ไม่ครบ)
// production: แสดงหน้าขัดข้องเรียบ ๆ ไม่เปิดเผยชื่อ key/ไฟล์ .env ; dev: โยน error ให้เห็นเต็ม ๆ
import('./App.vue')
  .then(({ default: App }) => {
    const app = createApp(App)
    app.use(createPinia())
    app.mount('#app')
  })
  .catch((err) => {
    if (import.meta.env.DEV) throw err
    showFatalError(err)
  })
