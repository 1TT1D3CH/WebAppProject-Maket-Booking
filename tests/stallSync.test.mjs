import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { buildStallWrites, mergeRemoteStalls, toPublicBookedBy } from '../src/utils/stallSync.js'

const stall = (id, over = {}) => ({
  id, stallNo: id.toUpperCase(), zoneId: 'z1', x: 0, y: 0, width: 100, height: 80,
  price: 500, notes: '', status: 'available', bookedBy: null, ...over
})
const snapshot = (...stalls) => Object.fromEntries(stalls.map(s => [s.id, JSON.parse(JSON.stringify(s))]))

describe('toPublicBookedBy (B9)', () => {
  test('เก็บแค่ tenantId/bookedAt/bookingId ตัดชื่อและเบอร์โทร', () => {
    assert.deepEqual(
      toPublicBookedBy({ tenantId: 't1', bookedAt: 'x', bookingId: 'b1', name: 'A', phone: '081', goodsType: 'g' }),
      { tenantId: 't1', bookedAt: 'x', bookingId: 'b1' }
    )
  })
  test('null เมื่อไม่มีผู้จอง และรองรับฟิลด์ uid แบบเก่า', () => {
    assert.equal(toPublicBookedBy(null), null)
    assert.equal(toPublicBookedBy({ uid: 'u1', bookedAt: 'x' }).tenantId, 'u1')
  })
})

describe('buildStallWrites (C4: ไม่เขียนทับการจอง)', () => {
  test('ไม่มีการเปลี่ยนแปลง -> ไม่เขียนอะไร', () => {
    const a = stall('a')
    assert.deepEqual(buildStallWrites([a], snapshot(a)), { upserts: [], deletes: [] })
  })

  test('ย้ายตำแหน่ง -> เขียนเฉพาะ x/y ไม่แตะ status/bookedBy', () => {
    const a = stall('a')
    const moved = { ...a, x: 40, y: 20 }
    const { upserts } = buildStallWrites([moved], snapshot(a))
    assert.deepEqual(upserts, [{ id: 'a', data: { x: 40, y: 20 } }])
  })

  test('ลูกค้าจองแผงระหว่างที่ admin แก้ตำแหน่ง: admin save ไม่ทับสถานะ booked', () => {
    // state ในเครื่อง admin ยังเป็น available (ยังไม่เห็นการจอง) แต่ admin แก้แค่ตำแหน่ง
    const initial = snapshot(stall('a'))
    const local = [stall('a', { x: 10 })]
    const { upserts } = buildStallWrites(local, initial)
    assert.equal('status' in upserts[0].data, false)
    assert.equal('bookedBy' in upserts[0].data, false)
  })

  test('admin ยกเลิกการจอง -> เขียน status=available, bookedBy=null', () => {
    const booked = stall('a', { status: 'booked', bookedBy: { tenantId: 't1', bookedAt: 'x' } })
    const { upserts } = buildStallWrites([{ ...booked, status: 'available', bookedBy: null }], snapshot(booked))
    assert.deepEqual(upserts, [{ id: 'a', data: { status: 'available', bookedBy: null } }])
  })

  test('แผงใหม่ -> เขียนทุกฟิลด์ และ bookedBy ไม่มีชื่อ/เบอร์โทร', () => {
    const n = stall('n', { status: 'booked', bookedBy: { tenantId: 't1', bookedAt: 'x', name: 'A', phone: '081' } })
    const { upserts } = buildStallWrites([n], {})
    assert.equal(upserts[0].data.stallNo, 'N')
    assert.deepEqual(upserts[0].data.bookedBy, { tenantId: 't1', bookedAt: 'x' })
  })

  test('แผงที่ถูกลบในเครื่อง -> อยู่ใน deletes', () => {
    const a = stall('a'), b = stall('b')
    assert.deepEqual(buildStallWrites([a], snapshot(a, b)).deletes, ['b'])
  })

  test('ยังไม่มีแผงใน Firestore (initial ว่าง) -> เขียนทุกแผง', () => {
    const { upserts } = buildStallWrites([stall('a'), stall('b')], {})
    assert.equal(upserts.length, 2)
  })
})

describe('mergeRemoteStalls (C5: ไม่ทับงานที่ยังไม่ได้บันทึก)', () => {
  test('ไม่มีงานค้าง -> ใช้ remote ทั้งหมด', () => {
    const remote = [stall('a', { x: 5 })]
    const r = mergeRemoteStalls([stall('a')], remote, snapshot(stall('a')), false)
    assert.deepEqual(r.stalls, remote)
    assert.equal(r.initial, null)
  })

  test('admin ลากแผง A ค้างไว้ ลูกค้าจองแผง B -> เก็บตำแหน่งที่ลาก และได้สถานะจองของ B', () => {
    const a = stall('a'), b = stall('b')
    const initial = snapshot(a, b)
    const local = [{ ...a, x: 77 }, b]
    const booking = { tenantId: 't9', bookedAt: 'now', bookingId: 'bk' }
    const remote = [a, { ...b, status: 'booked', bookedBy: booking }]

    const r = mergeRemoteStalls(local, remote, initial, true)
    assert.equal(r.stalls.find(s => s.id === 'a').x, 77)
    assert.equal(r.stalls.find(s => s.id === 'b').status, 'booked')
    // และถือว่าการจองของ B ไม่ใช่งานที่ admin แก้ -> บันทึกแล้วไม่เขียนสถานะ B
    assert.deepEqual(buildStallWrites(r.stalls, r.initial).upserts.map(u => u.id), ['a'])
  })

  test('admin เปลี่ยนสถานะแผงเองไว้ (เช่น ปิดแผง) -> ไม่ถูก remote ทับ', () => {
    const a = stall('a')
    const local = [{ ...a, status: 'disabled' }]
    const r = mergeRemoteStalls(local, [a], snapshot(a), true)
    assert.equal(r.stalls[0].status, 'disabled')
  })

  test('แผงที่ admin ลบไว้ในเครื่อง ไม่ถูกฟื้นจาก remote', () => {
    const a = stall('a'), b = stall('b')
    const r = mergeRemoteStalls([a], [a, b], snapshot(a, b), true)
    assert.deepEqual(r.stalls.map(s => s.id), ['a'])
  })

  test('แผงใหม่ที่ผู้อื่นเพิ่ม -> รับเข้ามา; แผงใหม่ที่ admin เพิ่มเอง (ยังไม่บันทึก) -> เก็บไว้', () => {
    const a = stall('a'), mine = stall('mine'), theirs = stall('theirs')
    const r = mergeRemoteStalls([a, mine], [a, theirs], snapshot(a), true)
    assert.deepEqual(r.stalls.map(s => s.id).sort(), ['a', 'mine', 'theirs'])
  })
})
