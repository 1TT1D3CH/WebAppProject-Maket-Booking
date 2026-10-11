import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  isSupportedImageType, fitWithin, compressionSteps, dataUrlBytes,
  MAX_SIDE_PX, MIN_SIDE_PX
} from '../src/utils/compressImage.js'

test('รับเฉพาะ jpg/png/webp', () => {
  assert.equal(isSupportedImageType('image/jpeg'), true)
  assert.equal(isSupportedImageType('image/PNG'), true)
  assert.equal(isSupportedImageType('image/webp'), true)
  assert.equal(isSupportedImageType('image/heic'), false)
  assert.equal(isSupportedImageType('application/pdf'), false)
  assert.equal(isSupportedImageType(''), false)
})

test('fitWithin ย่อด้านยาวสุดและคงสัดส่วน ไม่ขยายรูปเล็ก', () => {
  assert.deepEqual(fitWithin(4000, 2000), { width: 1600, height: 800 })
  assert.deepEqual(fitWithin(1000, 3200), { width: 500, height: 1600 })
  assert.deepEqual(fitWithin(800, 600), { width: 800, height: 600 })
})

test('compressionSteps เริ่มดีที่สุด ไม่ต่ำกว่าด้านยาวขั้นต่ำ', () => {
  const steps = compressionSteps()
  assert.equal(steps[0].side, MAX_SIDE_PX)
  assert.ok(steps.every(s => s.side >= MIN_SIDE_PX && s.quality > 0 && s.quality < 1))
  assert.equal(steps.at(-1).side, MIN_SIDE_PX)
})

test('dataUrlBytes คำนวณขนาดจาก base64', () => {
  assert.equal(dataUrlBytes('data:image/webp;base64,QUJD'), 3)
  assert.equal(dataUrlBytes('data:image/webp;base64,QUI='), 2)
  assert.equal(dataUrlBytes('data:image/webp;base64,QQ=='), 1)
})
