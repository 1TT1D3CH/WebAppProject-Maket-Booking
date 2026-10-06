import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const REQUIRED_ENV = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
]

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // build จริงต้องมี config ครบ ไม่งั้นเว็บที่ deploy ขึ้นไปจะใช้งานไม่ได้
  if (command === 'build') {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    const missing = REQUIRED_ENV.filter(k => !env[k])
    if (missing.length) {
      throw new Error(`Build หยุด: ไม่พบค่า ${missing.join(', ')} ใน .env หรือ .env.production`)
    }
  }

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
