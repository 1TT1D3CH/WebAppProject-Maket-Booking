import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { snapshotLayout, draftFromPublished, patchPublishedStall } from '../src/utils/publishedLayout.js'

const draft = () => ({
  stalls: [{ id: 'a', x: 0, y: 0, status: 'available', bookedBy: null }],
  zones: [{ id: 'z1', name: 'อาหาร' }],
  layoutObjects: [{ id: 'o1', x: 5 }],
  marketName: 'ตลาด', marketWidthMeters: 30, marketHeightMeters: 20, gridSnapMeters: 0.5
})

describe('ผังเผยแพร่แยกจาก draft', () => {
  test('แก้ draft ภายหลังไม่กระทบผังที่ลูกค้าเห็น', () => {
    const d = draft()
    const pub = snapshotLayout(d)
    d.stalls[0].x = 999
    d.zones[0].name = 'เปลี่ยน'
    d.layoutObjects.push({ id: 'o2' })
    assert.equal(pub.stalls[0].x, 0)
    assert.equal(pub.zones[0].name, 'อาหาร')
    assert.equal(pub.layoutObjects.length, 1)
  })

  test('ยกเลิกการแก้ไข: draft กลับเป็นค่าที่เผยแพร่ล่าสุด และเป็นสำเนาใหม่', () => {
    const pub = snapshotLayout(draft())
    const restored = draftFromPublished(pub)
    restored.stalls[0].x = 50
    assert.equal(pub.stalls[0].x, 0)
    assert.equal(draftFromPublished(pub).stalls[0].x, 0)
  })

  test('สถานะการจองใหม่อัปเดตผังเผยแพร่โดยไม่ทับตำแหน่ง', () => {
    const pub = snapshotLayout(draft())
    patchPublishedStall(pub, 'a', { status: 'pending', bookedBy: { tenantId: 't' } })
    assert.equal(pub.stalls[0].status, 'pending')
    assert.equal(pub.stalls[0].x, 0)
  })
})
