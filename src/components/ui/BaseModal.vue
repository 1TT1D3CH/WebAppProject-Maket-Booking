<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 flex bg-slate-900/50 backdrop-blur-sm"
      :class="[
        Z_MODAL,
        mobileMode === 'fullscreen' ? 'items-stretch sm:items-center' : 'items-end sm:items-center',
        'justify-center sm:p-4'
      ]"
      @mousedown.self="onBackdrop"
      @touchstart.self="onBackdrop"
    >
      <div
        ref="panelRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        class="flex flex-col w-full min-h-0 overflow-hidden shadow-2xl sm:border sm:rounded-3xl sm:max-h-[calc(100dvh-48px)] sm:h-auto"
        :class="[
          sizeClass,
          tone === 'light'
            ? 'bg-white text-slate-800 border-slate-200/80'
            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200/80 dark:border-slate-800',
          mobileMode === 'fullscreen'
            ? 'h-dvh max-h-dvh rounded-none'
            : 'max-h-[90dvh] rounded-t-3xl'
        ]"
        tabindex="-1"
      >
        <!-- ขีดจับ (เฉพาะ sheet บนมือถือ) -->
        <div v-if="mobileMode === 'sheet'" class="sm:hidden flex justify-center pt-2 shrink-0" aria-hidden="true">
          <span class="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
        </div>

        <!-- Header: ติดบนเสมอ -->
        <header
          class="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200/80 shrink-0"
          :class="[
            tone === 'light' ? '' : 'dark:border-slate-800',
            mobileMode === 'fullscreen' ? 'pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3' : ''
          ]"
        >
          <div class="min-w-0 flex-1">
            <slot name="header">
              <h2 :id="titleId" class="text-base font-bold truncate">{{ title }}</h2>
            </slot>
          </div>
          <button
            v-if="dismissible"
            ref="closeRef"
            type="button"
            class="no-tap shrink-0 w-11 h-11 -mr-2 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="ปิด"
            @click="emitClose"
          >
            <X class="w-5 h-5" />
          </button>
        </header>

        <!-- Body: เลื่อนได้เฉพาะส่วนนี้ -->
        <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4">
          <slot />
        </div>

        <!-- Footer: ติดล่างเสมอ มือถือเรียงแนวตั้ง ≥sm เรียงแนวนอนชิดขวา -->
        <footer
          v-if="$slots.footer"
          :class="tone === 'light' ? 'bg-white' : 'bg-white dark:bg-slate-900 dark:border-slate-800'"
          class="modal-footer shrink-0 px-4 sm:px-6 py-3 border-t border-slate-200/80 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script>
// ล็อกการเลื่อนหน้าหลังแบบนับชั้น (เปิดซ้อนหลาย pop up ได้) ใช้ได้บน iOS Safari ด้วย position: fixed
let lockCount = 0
let savedScrollY = 0
let savedBody = null

export function lockBodyScroll() {
  if (typeof document === 'undefined') return
  if (lockCount === 0) {
    savedScrollY = window.scrollY
    const s = document.body.style
    savedBody = { position: s.position, top: s.top, left: s.left, right: s.right, width: s.width, overflow: s.overflow }
    s.position = 'fixed'
    s.top = `-${savedScrollY}px`
    s.left = '0'
    s.right = '0'
    s.width = '100%'
    s.overflow = 'hidden'
  }
  lockCount++
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined' || lockCount === 0) return
  lockCount--
  if (lockCount === 0) {
    Object.assign(document.body.style, savedBody)
    window.scrollTo(0, savedScrollY)
    savedBody = null
  }
}

export function getBodyLockCount() {
  return lockCount
}

let uid = 0
</script>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'md' }, // 'sm' | 'md' | 'lg' | 'full'
  mobileMode: { type: String, default: 'fullscreen' }, // 'sheet' | 'fullscreen'
  dismissible: { type: Boolean, default: true },
  // 'light' = เนื้อหาข้างในเขียนสีสำหรับพื้นขาวอย่างเดียว (ยังไม่รองรับ dark) / 'auto' = มี dark: ครบ
  tone: { type: String, default: 'auto' },
  zIndex: { type: String, default: 'z-[60]' }
})
const emit = defineEmits(['close'])

const Z_MODAL = props.zIndex
const titleId = `modal-title-${++uid}`
const panelRef = ref(null)
const closeRef = ref(null)
let lastFocused = null
let locked = false

const sizeClass = computed(() => ({
  sm: 'sm:max-w-[400px]',
  md: 'sm:max-w-[560px]',
  lg: 'sm:max-w-[760px]',
  full: 'sm:max-w-[calc(100vw-48px)] sm:h-[calc(100dvh-48px)]'
}[props.size] || 'sm:max-w-[560px]'))

function emitClose() {
  if (props.dismissible) emit('close')
}

function onBackdrop() {
  emitClose()
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

function onKeydown(e) {
  if (!props.open) return
  // ปิดเฉพาะ modal บนสุด: ตรวจว่า panel นี้เป็นตัวสุดท้ายของ dialog ใน DOM
  const dialogs = document.querySelectorAll('[role="dialog"][aria-modal="true"]')
  if (dialogs[dialogs.length - 1] !== panelRef.value) return

  if (e.key === 'Escape') {
    if (props.dismissible) {
      e.stopPropagation()
      emit('close')
    }
    return
  }
  if (e.key !== 'Tab' || !panelRef.value) return
  const items = [...panelRef.value.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null)
  if (items.length === 0) {
    e.preventDefault()
    panelRef.value.focus()
    return
  }
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.value)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

// แตะช่องกรอกแล้วเลื่อนให้อยู่กลางพื้นที่ที่เห็น (คีย์บอร์ดมือถือ)
function onFocusIn(e) {
  const el = e.target
  if (!(el instanceof HTMLElement) || !panelRef.value?.contains(el)) return
  if (!el.matches('input,select,textarea')) return
  setTimeout(() => el.scrollIntoView?.({ block: 'center', behavior: 'smooth' }), 300)
}

function onViewportResize() {
  // ให้ panel เต็มเฉพาะส่วนที่มองเห็นเมื่อคีย์บอร์ดขึ้น (iOS)
  const vv = window.visualViewport
  if (!vv || !panelRef.value) return
  const isFull = props.mobileMode === 'fullscreen' && window.innerWidth < 640
  const shrink = window.innerHeight - vv.height
  panelRef.value.style.maxHeight = shrink > 80 ? `${vv.height}px` : ''
  if (isFull) panelRef.value.style.height = shrink > 80 ? `${vv.height}px` : ''
}

function attach() {
  if (locked) return
  locked = true
  lockBodyScroll()
  lastFocused = document.activeElement
  document.addEventListener('keydown', onKeydown, true)
  document.addEventListener('focusin', onFocusIn)
  window.visualViewport?.addEventListener('resize', onViewportResize)
  nextTick(() => {
    const target = panelRef.value?.querySelector('input:not([type="hidden"]),select,textarea') || closeRef.value || panelRef.value
    target?.focus?.({ preventScroll: true })
  })
}

function detach() {
  if (!locked) return
  locked = false
  document.removeEventListener('keydown', onKeydown, true)
  document.removeEventListener('focusin', onFocusIn)
  window.visualViewport?.removeEventListener('resize', onViewportResize)
  unlockBodyScroll()
  if (lastFocused && document.contains(lastFocused)) lastFocused.focus?.({ preventScroll: true })
  lastFocused = null
}

watch(() => props.open, (v) => (v ? attach() : detach()), { immediate: true, flush: 'post' })
onBeforeUnmount(detach)
</script>

<style>
/* ปุ่มใน footer: ห้ามตัดคำ มือถือกว้างเต็ม สูง >= 44px */
.modal-footer > button,
.modal-footer > a {
  white-space: nowrap;
  min-height: 44px;
  justify-content: center;
}
@media (max-width: 639px) {
  .modal-footer > button,
  .modal-footer > a {
    width: 100%;
  }
}
</style>
