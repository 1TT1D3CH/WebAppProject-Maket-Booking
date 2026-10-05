<template>
  <Teleport to="body">
    <div
      v-if="tip"
      ref="tipEl"
      role="tooltip"
      class="fixed z-[60] pointer-events-none flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
      :style="style"
    >
      <span>{{ tip.label }}</span>
      <kbd
        v-if="tip.shortcut"
        class="px-1 rounded font-mono text-[10px] leading-4 bg-white/15 text-slate-200 dark:bg-slate-900/10 dark:text-slate-700"
      >{{ tip.shortcut }}</kbd>
    </div>
  </Teleport>
</template>

<script setup>
// tooltip ตัวเดียวใช้ร่วมกันทุกปุ่มที่มี data-tooltip (และ data-shortcut)
// แสดงทั้งตอน hover และตอน focus ด้วยคีย์บอร์ด หน่วงประมาณ 400ms
// อยู่ใน body จึงไม่ถูกตัดโดย overflow-hidden ของแถบเครื่องมือ
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const SHOW_DELAY = 400
const GAP = 6

const tip = ref(null) // { label, shortcut }
const tipEl = ref(null)
const style = ref({})

let currentEl = null
let timer = null

function tooltipTarget(node) {
  return node?.closest?.('[data-tooltip]') ?? null
}

function schedule(el) {
  if (el === currentEl) return
  hide()
  currentEl = el
  timer = setTimeout(() => show(el), SHOW_DELAY)
}

async function show(el) {
  if (!el.isConnected) return hide()
  tip.value = { label: el.dataset.tooltip, shortcut: el.dataset.shortcut || '' }
  style.value = { visibility: 'hidden' }
  await nextTick()
  if (!tipEl.value || currentEl !== el) return

  const r = el.getBoundingClientRect()
  const t = tipEl.value.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const left = Math.min(Math.max(8, r.left + r.width / 2 - t.width / 2), vw - t.width - 8)
  // วางใต้ปุ่ม ถ้าที่ไม่พอให้วางเหนือปุ่ม
  const top = r.bottom + GAP + t.height <= vh - 8 ? r.bottom + GAP : r.top - GAP - t.height
  style.value = { left: `${left}px`, top: `${Math.max(8, top)}px` }
}

function hide() {
  clearTimeout(timer)
  timer = null
  currentEl = null
  tip.value = null
}

function onPointerOver(e) {
  if (e.pointerType === 'touch') return
  const el = tooltipTarget(e.target)
  if (el) schedule(el)
}

function onPointerOut(e) {
  if (currentEl && !currentEl.contains(e.relatedTarget)) hide()
}

function onFocusIn(e) {
  const el = tooltipTarget(e.target)
  if (!el) return
  // แสดงเฉพาะตอน focus ด้วยคีย์บอร์ด ไม่ใช่ตอนคลิก
  let keyboardFocus = true
  try {
    keyboardFocus = el.matches(':focus-visible')
  } catch {
    // เบราว์เซอร์เก่าไม่รู้จัก :focus-visible
  }
  if (keyboardFocus) schedule(el)
}

function onFocusOut(e) {
  if (currentEl && !currentEl.contains(e.relatedTarget)) hide()
}

function onKeyDown(e) {
  if (e.key === 'Escape') hide()
}

const LISTENERS = [
  [document, 'pointerover', onPointerOver],
  [document, 'pointerout', onPointerOut],
  [document, 'focusin', onFocusIn],
  [document, 'focusout', onFocusOut],
  [document, 'pointerdown', hide, true],
  [document, 'keydown', onKeyDown, true],
  [window, 'scroll', hide, true],
  [window, 'resize', hide]
]

onMounted(() => LISTENERS.forEach(([target, type, fn, capture]) => target.addEventListener(type, fn, !!capture)))
onBeforeUnmount(() => {
  LISTENERS.forEach(([target, type, fn, capture]) => target.removeEventListener(type, fn, !!capture))
  clearTimeout(timer)
})
</script>
