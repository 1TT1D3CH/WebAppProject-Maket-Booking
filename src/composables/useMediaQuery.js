import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * คืนค่า ref<boolean> ที่อัปเดตตาม media query เช่น useMediaQuery('(max-width: 639px)')
 */
export function useMediaQuery(query) {
  const mql = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query) : null
  const matches = ref(mql ? mql.matches : false)

  function update(e) {
    matches.value = e.matches
  }

  onMounted(() => mql?.addEventListener('change', update))
  onBeforeUnmount(() => mql?.removeEventListener('change', update))

  return matches
}
