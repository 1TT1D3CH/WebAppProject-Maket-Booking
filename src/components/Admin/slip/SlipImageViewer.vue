<template>
  <div class="relative w-full h-full bg-slate-900 overflow-hidden select-none" :class="fullscreen ? 'fixed inset-0 z-[80]' : 'rounded-2xl'">
    <div
      ref="stageRef"
      class="absolute inset-0 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
      @wheel.prevent="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @dblclick="toggleZoom"
    >
      <img
        v-if="src"
        :src="src"
        alt="สลิปโอนเงิน"
        draggable="false"
        class="max-w-full max-h-full object-contain will-change-transform"
        :style="{ transform: `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotation}deg)` }"
      />
    </div>

    <div class="absolute right-2 top-2 flex flex-col gap-2" :class="fullscreen ? 'pt-[env(safe-area-inset-top)]' : ''">
      <button type="button" class="vbtn" aria-label="ขยาย" @click="zoomBy(1.4)"><ZoomIn class="w-5 h-5" /></button>
      <button type="button" class="vbtn" aria-label="ย่อ" @click="zoomBy(1 / 1.4)"><ZoomOut class="w-5 h-5" /></button>
      <button type="button" class="vbtn" aria-label="หมุน 90 องศา" @click="rotate"><RotateCw class="w-5 h-5" /></button>
      <button type="button" class="vbtn" aria-label="รีเซ็ต" @click="reset"><Maximize2 class="w-5 h-5" /></button>
      <button v-if="fullscreen" type="button" class="vbtn" aria-label="ปิดเต็มจอ" @click="$emit('close')"><X class="w-5 h-5" /></button>
      <button v-else type="button" class="vbtn" aria-label="เต็มจอ" @click="$emit('fullscreen')"><Expand class="w-5 h-5" /></button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ZoomIn, ZoomOut, RotateCw, Maximize2, X, Expand } from 'lucide-vue-next'

const props = defineProps({ src: String, fullscreen: Boolean })
defineEmits(['fullscreen', 'close'])

const scale = ref(1)
const tx = ref(0)
const ty = ref(0)
const rotation = ref(0)
const stageRef = ref(null)

const MIN = 1
const MAX = 6
const clamp = (v) => Math.min(MAX, Math.max(MIN, v))

function reset() { scale.value = 1; tx.value = 0; ty.value = 0; rotation.value = 0 }
function rotate() { rotation.value = (rotation.value + 90) % 360 }
function zoomBy(f) {
  scale.value = clamp(scale.value * f)
  if (scale.value === 1) { tx.value = 0; ty.value = 0 }
}
function toggleZoom() {
  if (scale.value > 1) { scale.value = 1; tx.value = 0; ty.value = 0 } else { scale.value = 2.5 }
}
function onWheel(e) { zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15) }

// ลาก 1 นิ้ว/เมาส์ = เลื่อนรูป, 2 นิ้ว = pinch zoom
const pointers = new Map()
let pinchStart = 0
let pinchScale = 1

function onPointerDown(e) {
  stageRef.value?.setPointerCapture?.(e.pointerId)
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()]
    pinchStart = Math.hypot(a.x - b.x, a.y - b.y)
    pinchScale = scale.value
  }
}

function onPointerMove(e) {
  const prev = pointers.get(e.pointerId)
  if (!prev) return
  const cur = { x: e.clientX, y: e.clientY }
  if (pointers.size === 2) {
    pointers.set(e.pointerId, cur)
    const [a, b] = [...pointers.values()]
    const dist = Math.hypot(a.x - b.x, a.y - b.y)
    if (pinchStart > 0) scale.value = clamp(pinchScale * (dist / pinchStart))
    return
  }
  if (scale.value > 1) {
    tx.value += cur.x - prev.x
    ty.value += cur.y - prev.y
  }
  pointers.set(e.pointerId, cur)
}

function onPointerUp(e) {
  pointers.delete(e.pointerId)
  if (scale.value === 1) { tx.value = 0; ty.value = 0 }
}

watch(() => props.src, reset)
</script>

<style scoped>
.vbtn {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: rgb(15 23 42 / 0.7);
  color: #fff;
  backdrop-filter: blur(4px);
}
.vbtn:active { background: rgb(79 70 229 / 0.9); }
</style>
