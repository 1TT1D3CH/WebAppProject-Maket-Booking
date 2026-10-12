import { defineStore } from 'pinia'

// ใบเสร็จเปิดเป็นหน้าเต็มตาม ?receipt=<bookingId> (ไม่มี router ในโปรเจกต์นี้) ลิงก์เปิดตรงได้ และกลับมาหน้าเดิมได้
function readUrl() {
  try { return new URLSearchParams(window.location.search).get('receipt') || '' } catch { return '' }
}

function writeUrl(id) {
  try {
    const url = new URL(window.location.href)
    if (id) url.searchParams.set('receipt', id)
    else url.searchParams.delete('receipt')
    window.history.pushState(null, '', url)
  } catch { /* ไม่มี URL ให้เขียน (เช่น ทดสอบ) */ }
}

export const useReceiptStore = defineStore('receipt', {
  state: () => ({ bookingId: readUrl() }),
  actions: {
    open(id) {
      this.bookingId = id
      writeUrl(id)
    },
    close() {
      this.bookingId = ''
      writeUrl('')
    },
    syncFromUrl() {
      this.bookingId = readUrl()
    }
  }
})
