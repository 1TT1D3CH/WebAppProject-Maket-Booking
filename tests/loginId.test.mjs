import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { toLoginEmail, isStaffEmail } from '../src/utils/loginId.js'

const D = 'staff.example.test'

describe('toLoginEmail', () => {
  test('อีเมลคงเดิม (ตัดช่องว่างหัวท้าย)', () => {
    assert.equal(toLoginEmail('  user@gmail.com ', D), 'user@gmail.com')
  })
  test('username แปลงเป็นอีเมลภายใน และเป็นตัวพิมพ์เล็ก', () => {
    assert.equal(toLoginEmail('Owner001', D), `owner001@${D}`)
  })
  test('username ที่รูปแบบไม่ถูกต้องคืน null', () => {
    assert.equal(toLoginEmail('ab', D), null)
    assert.equal(toLoginEmail('has space', D), null)
    assert.equal(toLoginEmail('', D), null)
    assert.equal(toLoginEmail(null, D), null)
    assert.equal(toLoginEmail('x'.repeat(33), D), null)
  })
})

describe('isStaffEmail', () => {
  test('ตรวจโดเมนภายใน ไม่สนตัวพิมพ์', () => {
    assert.equal(isStaffEmail(`Owner001@${D.toUpperCase()}`, D), true)
    assert.equal(isStaffEmail('user@gmail.com', D), false)
    assert.equal(isStaffEmail(null, D), false)
  })
})
