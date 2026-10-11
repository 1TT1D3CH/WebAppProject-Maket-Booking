// บีบอัดรูปสลิปให้เก็บใน Firestore ได้ (เอกสารละไม่เกิน 1 MiB)
// ฟังก์ชันล้วนด้านบนทดสอบด้วย node --test ส่วนที่ใช้ canvas ต้องรันใน browser

export const ACCEPTED_MIME = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_DATA_URL_CHARS = 700000
export const MAX_SIDE_PX = 1600
export const MIN_SIDE_PX = 900
export const UNSUPPORTED_MESSAGE = 'รองรับเฉพาะรูป JPG, PNG, WebP (บน iPhone ให้แคปหน้าจอสลิปแทนการแนบไฟล์ HEIC)'

/** ชนิดไฟล์ที่รับได้หรือไม่ */
export function isSupportedImageType(mime) {
  return ACCEPTED_MIME.includes(String(mime || '').toLowerCase())
}

/** ขนาดใหม่โดยย่อให้ด้านยาวสุดไม่เกิน maxSide (ไม่ขยายรูปเล็ก) */
export function fitWithin(width, height, maxSide = MAX_SIDE_PX) {
  const longest = Math.max(width, height)
  if (!longest || longest <= maxSide) return { width, height }
  const scale = maxSide / longest
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) }
}

/** ลำดับ [ด้านยาวสุด, quality] ที่ลองเรียงจากดีที่สุดไปประหยัดที่สุด */
export function compressionSteps() {
  const steps = []
  for (const side of [MAX_SIDE_PX, 1300, 1100, MIN_SIDE_PX]) {
    for (const q of [0.85, 0.75, 0.65, 0.55, 0.45]) steps.push({ side, quality: q })
  }
  return steps
}

/** ขนาดจริงของ base64 data URL เป็น byte (ประมาณ) */
export function dataUrlBytes(dataUrl) {
  const i = String(dataUrl).indexOf(',')
  const b64 = i >= 0 ? dataUrl.slice(i + 1) : ''
  const pad = b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0
  return Math.max(0, Math.floor((b64.length * 3) / 4) - pad)
}

/** SHA-256 (hex) ของไฟล์ต้นฉบับ ใช้ตรวจสลิปซ้ำ */
export async function hashFile(file) {
  const buf = await file.arrayBuffer()
  const digest = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => { URL.revokeObjectURL(url); resolve(img) }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error(UNSUPPORTED_MESSAGE)) }
    img.src = url
  })
}

function canvasToDataUrl(img, side, quality) {
  const { width, height } = fitWithin(img.naturalWidth, img.naturalHeight, side)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(img, 0, 0, width, height)
  let url = canvas.toDataURL('image/webp', quality)
  if (!url.startsWith('data:image/webp')) url = canvas.toDataURL('image/jpeg', quality)
  return url
}

/**
 * @returns {Promise<{dataUrl: string, mime: string, bytes: number, hash: string}>}
 * @throws Error ข้อความไทย เมื่อชนิดไฟล์ไม่รองรับ อ่านไม่ได้ หรือบีบอัดแล้วยังใหญ่เกิน
 */
export async function compressSlipImage(file) {
  if (!file || !isSupportedImageType(file.type)) throw new Error(UNSUPPORTED_MESSAGE)
  const hash = await hashFile(file)
  const img = await loadImage(file)

  for (const { side, quality } of compressionSteps()) {
    const dataUrl = canvasToDataUrl(img, side, quality)
    if (dataUrl.length <= MAX_DATA_URL_CHARS) {
      const mime = dataUrl.slice(5, dataUrl.indexOf(';'))
      return { dataUrl, mime, bytes: dataUrlBytes(dataUrl), hash }
    }
  }
  throw new Error('รูปมีรายละเอียดมากเกินไป ไม่สามารถย่อให้เล็กพอได้ กรุณาแคปหน้าจอสลิปแล้วแนบแทน')
}
