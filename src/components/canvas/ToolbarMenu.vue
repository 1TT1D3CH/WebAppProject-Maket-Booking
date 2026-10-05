<template>
  <Teleport to="body">
    <!-- มือถือ: bottom sheet -->
    <div
      v-if="open && sheet"
      class="fixed inset-0 z-50 flex items-end bg-slate-900/40"
    >
      <div
        ref="menuEl"
        data-toolbar-menu
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        class="w-full max-h-[75vh] overflow-y-auto bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-2xl px-3 pt-2 animate-slide-up"
        :style="{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }"
        @keydown.esc.stop.prevent="close(true)"
      >
        <div class="mx-auto mb-2 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700"></div>
        <slot />
      </div>
    </div>

    <!-- เดสก์ท็อป: popover ยึดตำแหน่งจากปุ่ม -->
    <div
      v-else-if="open"
      ref="menuEl"
      data-toolbar-menu
      role="dialog"
      :aria-label="label"
      class="fixed z-50 overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-1.5"
      :style="popoverStyle"
      @keydown.esc.stop.prevent="close(true)"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  open: Boolean,
  // element ของปุ่มที่เปิดเมนู ใช้คำนวณตำแหน่งและคืน focus ตอนปิด
  anchor: { type: Object, default: null },
  label: { type: String, required: true },
  // ตำแหน่งที่ต้องการ: 'bottom' (ใต้ปุ่ม) หรือ 'top' (เหนือปุ่ม) จะสลับเองถ้าที่ไม่พอ
  placement: { type: String, default: 'bottom' },
  width: { type: Number, default: 240 },
  sheet: Boolean
})

const emit = defineEmits(['close'])

const menuEl = ref(null)
const popoverStyle = ref({})

function updatePosition() {
  if (props.sheet || !props.anchor) return
  const r = props.anchor.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const width = Math.min(props.width, vw - 16)
  const left = Math.min(Math.max(8, r.left), vw - width - 8)
  const spaceBelow = vh - r.bottom - 14
  const spaceAbove = r.top - 14
  const placeTop = props.placement === 'top'
    ? spaceAbove >= 200 || spaceAbove > spaceBelow
    : spaceBelow < 200 && spaceAbove > spaceBelow

  popoverStyle.value = placeTop
    ? { left: `${left}px`, bottom: `${vh - r.top + 6}px`, width: `${width}px`, maxHeight: `${spaceAbove}px` }
    : { left: `${left}px`, top: `${r.bottom + 6}px`, width: `${width}px`, maxHeight: `${spaceBelow}px` }
}

function close(restoreFocus = false) {
  emit('close')
  if (restoreFocus) props.anchor?.focus()
}

function handleOutsidePointer(e) {
  if (menuEl.value?.contains(e.target)) return
  if (props.anchor?.contains(e.target)) return // ให้ปุ่มเปิด/ปิดเองตอนคลิก
  close()
}

function handleWindowResize() {
  close()
}

function addListeners() {
  document.addEventListener('pointerdown', handleOutsidePointer, true)
  window.addEventListener('resize', handleWindowResize)
}

function removeListeners() {
  document.removeEventListener('pointerdown', handleOutsidePointer, true)
  window.removeEventListener('resize', handleWindowResize)
}

watch(() => props.open, async (isOpen) => {
  if (!isOpen) {
    removeListeners()
    return
  }
  updatePosition()
  addListeners()
  await nextTick()
  // ย้าย focus เข้าเมนู (ช่องค้นหาหรือรายการแรก)
  const target = menuEl.value?.querySelector('[data-autofocus]') ||
    menuEl.value?.querySelector('input, button:not([disabled])')
  target?.focus()
})

onBeforeUnmount(removeListeners)
</script>
