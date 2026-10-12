/**
 * ดาวน์โหลดไฟล์จากข้อมูลในเครื่อง
 * ปกติใช้ <a download>; ถ้าเบราว์เซอร์ไม่รองรับ (บาง Safari เก่า) หรือสั่งไม่สำเร็จ ใช้ navigator.share({ files }) เป็นทางสำรอง
 */
export async function downloadBytes(bytes, fileName, mime) {
  const blob = new Blob([bytes], { type: mime })
  const supportsDownload = typeof document !== 'undefined' && 'download' in document.createElement('a')
  if (supportsDownload) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 60000)
    return 'download'
  }
  const file = new File([blob], fileName, { type: mime })
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: fileName })
    return 'share'
  }
  throw new Error('เบราว์เซอร์นี้ดาวน์โหลดไฟล์ไม่ได้ ลองเปิดด้วยคอมพิวเตอร์หรือ Chrome/Safari เวอร์ชันล่าสุด')
}

export const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
export const CSV_MIME = 'text/csv;charset=utf-8'
