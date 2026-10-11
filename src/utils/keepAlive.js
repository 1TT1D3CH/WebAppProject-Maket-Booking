// ทำให้ onSnapshot listener ฟื้นเองเมื่อสะดุด (เน็ตหลุด, index ยังไม่เสร็จ, token หมดอายุ)
// แทนที่จะตายถาวรจนผู้ใช้ต้องกด F5
//   open({ ok, fail }) -> unsubscribe
//   เรียก ok() ทุกครั้งที่ได้ข้อมูล, fail(err) เมื่อ listener พัง
// ลองใหม่ด้วย backoff (2s, 4s ... สูงสุด 30s) และลองใหม่ทันทีเมื่อกลับมาออนไลน์/กลับมาที่แท็บ

export function nextDelay(attempts, base = 2000, max = 30000) {
  return Math.min(max, base * 2 ** Math.max(0, attempts))
}

export function keepAlive(open, { base = 2000, max = 30000 } = {}) {
  let unsub = null
  let timer = null
  let stopped = false
  let failed = false
  let attempts = 0

  const clear = () => { if (timer) { clearTimeout(timer); timer = null } }

  const start = () => {
    if (stopped) return
    clear()
    if (unsub) { try { unsub() } catch { /* ปิดไปแล้ว */ } unsub = null }
    failed = false
    unsub = open({
      ok: () => { attempts = 0; failed = false },
      fail: () => {
        if (stopped || failed) return
        failed = true
        timer = setTimeout(start, nextDelay(attempts++, base, max))
      }
    })
  }

  const retryNow = () => { if (failed && !stopped) { attempts = 0; start() } }
  const onVisible = () => { if (typeof document !== 'undefined' && document.visibilityState === 'visible') retryNow() }

  if (typeof window !== 'undefined') window.addEventListener('online', retryNow)
  if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisible)
  start()

  return () => {
    stopped = true
    clear()
    if (unsub) { try { unsub() } catch { /* ปิดไปแล้ว */ } unsub = null }
    if (typeof window !== 'undefined') window.removeEventListener('online', retryNow)
    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisible)
  }
}
