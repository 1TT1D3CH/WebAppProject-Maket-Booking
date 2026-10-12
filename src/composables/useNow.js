import { ref, onMounted, onBeforeUnmount } from 'vue'
import { serverNow } from '../utils/serverClock'

/**
 * เวลา server ปัจจุบัน (ms) แบบ reactive สำหรับนับถอยหลัง
 * คำนวณใหม่จากนาฬิกาทุกครั้ง (ไม่สะสม) และคำนวณทันทีเมื่อกลับมาที่แอป (visibilitychange)
 * active = false จะไม่เดิน timer (เช่น modal ปิดอยู่)
 */
export function useNow(intervalMs = 1000) {
  const nowMs = ref(serverNow())
  let timer = null
  const tick = () => { nowMs.value = serverNow() }
  const onVisible = () => { if (document.visibilityState === 'visible') tick() }

  const start = () => {
    if (timer) return
    tick()
    timer = setInterval(tick, intervalMs)
  }
  const stop = () => {
    if (timer) clearInterval(timer)
    timer = null
  }

  onMounted(() => document.addEventListener('visibilitychange', onVisible))
  onBeforeUnmount(() => {
    stop()
    document.removeEventListener('visibilitychange', onVisible)
  })
  return { nowMs, start, stop, tick }
}
