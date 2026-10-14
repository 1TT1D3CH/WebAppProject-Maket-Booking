<template>
  <nav
    v-if="tabs.length"
    ref="navRef"
    class="flex items-center min-w-0 overflow-hidden"
    aria-label="เมนูหลัก"
  >
    <div ref="innerRef" class="flex items-center gap-1">
      <button
        v-for="tab in visibleTabs"
        :key="tab.key"
        @click="$emit('change-mode', tab.key)"
        class="relative flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        :class="activeMode === tab.key
          ? 'bg-indigo-600/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'"
        :aria-current="activeMode === tab.key ? 'page' : undefined"
        :title="!showLabels ? tab.label : undefined"
        :aria-label="!showLabels ? tab.label : undefined"
      >
        <component :is="tab.icon" class="w-4 h-4 shrink-0" />
        <span v-if="showLabels">{{ tab.label }}</span>
        <span
          v-if="tab.badge"
          class="min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold font-mono flex items-center justify-center"
        >{{ tab.badge }}</span>
        <span
          v-if="activeMode === tab.key"
          class="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
        ></span>
      </button>
    </div>

    <div v-if="overflowTabs.length" class="relative ml-1 shrink-0">
      <button
        ref="moreBtnRef"
        @click="toggleMore"
        class="flex items-center gap-1 h-9 px-2.5 rounded-lg text-xs font-semibold whitespace-nowrap text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        :class="{ 'bg-slate-100 dark:bg-slate-800': moreOpen }"
        aria-haspopup="true"
        :aria-expanded="moreOpen"
      >
        เพิ่มเติม
        <ChevronDown class="w-3.5 h-3.5" />
      </button>

      <Teleport to="body">
        <template v-if="moreOpen">
          <div class="fixed inset-0 z-[60]" @click="moreOpen = false" aria-hidden="true"></div>
          <div
            ref="menuRef"
            class="fixed z-[61] min-w-[180px] py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl"
            :style="menuStyle"
            role="menu"
            @keydown="handleMenuKeys"
          >
            <button
              v-for="tab in overflowTabs"
              :key="tab.key"
              role="menuitem"
              class="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
              :class="activeMode === tab.key
                ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/30'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
              @click="$emit('change-mode', tab.key); moreOpen = false"
            >
              <component :is="tab.icon" class="w-4 h-4 shrink-0" />
              <span>{{ tab.label }}</span>
              <span
                v-if="tab.badge"
                class="min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold font-mono flex items-center justify-center"
              >{{ tab.badge }}</span>
            </button>
          </div>
        </template>
      </Teleport>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  tabs: { type: Array, required: true },
  activeMode: { type: String, required: true }
})

defineEmits(['change-mode'])

const navRef = ref(null)
const innerRef = ref(null)
const moreBtnRef = ref(null)
const menuRef = ref(null)
const moreOpen = ref(false)
const menuStyle = ref({})

// overflow level: 0 = labels, 1 = icons only, 2+ = move tabs to overflow
const level = ref(0)
const showLabels = computed(() => level.value === 0)
const overflowCount = computed(() => Math.max(0, level.value - 1))

const tabSplit = computed(() => {
  const all = props.tabs
  const count = overflowCount.value
  if (count === 0) return { visible: all, overflow: [] }

  const active = props.activeMode
  const visible = []
  const overflow = []
  let remaining = count

  for (let i = all.length - 1; i >= 0; i--) {
    if (remaining > 0 && all[i].key !== active) {
      overflow.unshift(all[i])
      remaining--
    } else {
      visible.unshift(all[i])
    }
  }
  return { visible, overflow }
})

const visibleTabs = computed(() => tabSplit.value.visible)
const overflowTabs = computed(() => tabSplit.value.overflow)

let fitting = false
let refitQueued = false

async function refit() {
  if (fitting) { refitQueued = true; return }
  if (!navRef.value) return
  fitting = true
  level.value = 0
  await nextTick()
  const maxLevel = props.tabs.length
  while (
    navRef.value &&
    navRef.value.scrollWidth > navRef.value.clientWidth + 1 &&
    level.value < maxLevel
  ) {
    level.value++
    await nextTick()
  }
  fitting = false
  if (refitQueued) { refitQueued = false; refit() }
}

let resizeObs = null
function observe() {
  resizeObs?.disconnect()
  const el = navRef.value?.parentElement
  if (!el || typeof ResizeObserver === 'undefined') return
  resizeObs = new ResizeObserver(() => refit())
  resizeObs.observe(el)
}

onMounted(observe)
onBeforeUnmount(() => resizeObs?.disconnect())

watch(() => [props.tabs.length, props.activeMode], () => {
  moreOpen.value = false
  refit()
})

function toggleMore() {
  if (moreOpen.value) { moreOpen.value = false; return }
  const rect = moreBtnRef.value?.getBoundingClientRect()
  if (rect) {
    menuStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
    }
  }
  moreOpen.value = true
  nextTick(() => menuRef.value?.querySelector('[role="menuitem"]')?.focus())
}

function handleMenuKeys(e) {
  if (e.key === 'Escape') {
    moreOpen.value = false
    moreBtnRef.value?.focus()
    return
  }
  const items = [...(menuRef.value?.querySelectorAll('[role="menuitem"]') || [])]
  const idx = items.indexOf(document.activeElement)
  if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus() }
  else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus() }
}
</script>
