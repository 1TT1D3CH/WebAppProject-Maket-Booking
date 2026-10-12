/** คืน { before, after } เฉพาะฟิลด์ที่ค่าต่างกันจริง */
export function diffFields(before, after, fields) {
  const b = {}
  const a = {}
  for (const f of fields) {
    const vb = before?.[f]
    const va = after?.[f]
    if (JSON.stringify(vb ?? null) !== JSON.stringify(va ?? null)) {
      if (vb !== undefined) b[f] = vb
      if (va !== undefined) a[f] = va
    }
  }
  return { before: b, after: a }
}

/** สรุป before -> after เป็นข้อความอ่านง่าย เช่น "status: รอตรวจสลิป → อนุมัติแล้ว" */
export function summarizeChange(before, after, format = (k, v) => v) {
  const keys = [...new Set([...Object.keys(before || {}), ...Object.keys(after || {})])]
  return keys
    .map((k) => {
      const hasB = before && k in before
      const hasA = after && k in after
      if (hasB && hasA) return `${k}: ${format(k, before[k])} → ${format(k, after[k])}`
      if (hasA) return `${k}: ${format(k, after[k])}`
      return `${k}: ${format(k, before[k])} → (ลบ)`
    })
    .join(' · ')
}
