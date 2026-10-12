// ใบเสร็จรับเงิน: เลขที่ใบเสร็จ และจำนวนเงินตัวหนังสือไทย
const DIGITS = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
const UNITS = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน']

function readBelowMillion(n) {
  const s = String(n)
  let out = ''
  for (let i = 0; i < s.length; i++) {
    const d = Number(s[i])
    const pos = s.length - i - 1
    if (d === 0) continue
    if (pos === 0 && d === 1 && s.length > 1) out += 'เอ็ด'
    else if (pos === 1 && d === 2) out += 'ยี่สิบ'
    else if (pos === 1 && d === 1) out += 'สิบ'
    else out += DIGITS[d] + UNITS[pos]
  }
  return out
}

function readInt(n) {
  if (n === 0) return DIGITS[0]
  let out = ''
  let rest = n
  const parts = []
  while (rest > 0) { parts.unshift(rest % 1000000); rest = Math.floor(rest / 1000000) }
  parts.forEach((p, i) => {
    if (p > 0) out += (i > 0 && p === 1) ? 'เอ็ด' : readBelowMillion(p)
    if (i < parts.length - 1) out += 'ล้าน'
  })
  return out
}

/** 1250.5 -> "หนึ่งพันสองร้อยห้าสิบบาทห้าสิบสตางค์" ; 500 -> "ห้าร้อยบาทถ้วน" */
export function bahtText(amount) {
  const n = Math.round(Math.abs(Number(amount) || 0) * 100)
  const baht = Math.floor(n / 100)
  const satang = n % 100
  let out = readInt(baht) + 'บาท'
  out += satang ? readInt(satang) + 'สตางค์' : 'ถ้วน'
  return (Number(amount) < 0 ? 'ลบ' : '') + out
}

/** ปี พ.ศ. ของวันที่ตามเวลาไทย (รับ 'YYYY-MM-DD') */
export const thaiYearOf = (dateKey) => Number(String(dateKey).slice(0, 4)) + 543

/** (2569, 123) -> 'R2569-000123' */
export const formatReceiptNo = (year, seq) => `R${year}-${String(seq).padStart(6, '0')}`

export const formatBaht = (n) =>
  `฿${Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
