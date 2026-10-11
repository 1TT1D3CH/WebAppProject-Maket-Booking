// ผังที่ "เผยแพร่แล้ว" (สิ่งที่ลูกค้าเห็น) แยกจาก draft ที่ admin กำลังแก้ในเครื่อง
// ลูกค้าเห็นผังใหม่ก็ต่อเมื่อ admin กดบันทึกสำเร็จ หรือมี snapshot จาก Firestore เข้ามา

const clone = (v) => JSON.parse(JSON.stringify(v))

/** คัดลอกผังจาก state (draft หรือ snapshot ของ Firestore) เป็นผังเผยแพร่ */
export function snapshotLayout(src) {
  return {
    stalls: clone(src.stalls || []),
    zones: clone(src.zones || []),
    layoutObjects: clone(src.layoutObjects || []),
    marketName: src.marketName,
    marketWidthMeters: src.marketWidthMeters,
    marketHeightMeters: src.marketHeightMeters,
    gridSnapMeters: src.gridSnapMeters
  }
}

/** ผังเผยแพร่ -> ฟิลด์ draft (ใช้ตอน "ยกเลิกการแก้ไข") */
export function draftFromPublished(published) {
  return snapshotLayout(published)
}

/** อัปเดตสถานะการจองของแผงเดียวในผังเผยแพร่ (หลังลูกค้าจองสำเร็จ) ไม่แตะตำแหน่ง */
export function patchPublishedStall(published, stallId, patch) {
  const s = published.stalls.find(x => x.id === stallId)
  if (s) Object.assign(s, clone(patch))
}
