// ตัวช่วยสำหรับคีย์ลัดของหน้าผัง

export function isTypingTarget(el) {
  if (!el) return false
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)
}

// ถ้ามี modal (overlay fixed inset-0 z-50) หรือแผงแก้ไขด้านข้างเปิดอยู่ ไม่ให้คีย์ลัดทำงานกับผัง
export function isModalOpen() {
  return !!document.querySelector('.fixed.inset-0.z-50, [role="dialog"][aria-modal="true"], [data-editor-panel]')
}

// คีย์ที่กดขณะ focus อยู่ในช่องพิมพ์, modal หรือเมนูของ toolbar ไม่ใช่คีย์ลัดของผัง
export function isShortcutBlocked(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return true
  if (isTypingTarget(e.target) || isModalOpen()) return true
  return !!e.target?.closest?.('[data-toolbar-menu]')
}
