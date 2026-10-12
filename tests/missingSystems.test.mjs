import assert from 'node:assert/strict'
import { test } from 'node:test'
import { remainingMs, isHoldExpired, formatCountdown, countdownLevel } from '../src/utils/holdTimer.js'
import { suggestRefund } from '../src/utils/refundPolicy.js'
import { bahtText, formatReceiptNo, thaiYearOf } from '../src/utils/receipt.js'
import { computeRevenue, capacitySlots, percentChange, previousRange, groupMonthly } from '../src/utils/revenue.js'
import { buildXlsx, crc32, toCsv, excelDateSerial, colName } from '../src/utils/xlsx.js'
import { normalizeSettings } from '../src/utils/marketCalendar.js'

// ─── หมดเวลากันแผง ─────────────────────────────────────────────────────────
test('holdTimer: เวลาเหลือและสถานะหมดอายุ', () => {
  const start = Date.UTC(2026, 9, 12, 10, 0, 0)
  assert.equal(remainingMs(start, 30, start + 10 * 60000), 20 * 60000)
  assert.equal(remainingMs(start, 30, start + 31 * 60000), 0)
  assert.equal(remainingMs(undefined, 30, start), null)
  // offset: นาฬิกาเครื่องช้ากว่า server 2 นาที
  assert.equal(remainingMs(start, 30, start + 10 * 60000, 2 * 60000), 18 * 60000)
  const awaiting = { status: 'awaiting_slip', holdStartedAt: start, holdMinutes: 30 }
  assert.equal(isHoldExpired(awaiting, start + 29 * 60000), false)
  assert.equal(isHoldExpired(awaiting, start + 30 * 60000), true)
  assert.equal(isHoldExpired({ ...awaiting, status: 'pending' }, start + 99 * 60000), false, 'ส่งสลิปแล้วไม่หมดอายุ')
  assert.equal(isHoldExpired({ status: 'needs_slip' }, start), false, 'needs_slip เก่าที่ไม่มีเวลา ไม่หมดอายุ')
})

test('holdTimer: ข้อความนับถอยหลังและระดับเตือน', () => {
  assert.equal(formatCountdown(29 * 60000 + 41000), '29:41')
  assert.equal(formatCountdown(23 * 3600000 + 12 * 60000), '23 ชม. 12 นาที')
  assert.equal(formatCountdown(-5), '00:00')
  assert.equal(countdownLevel(10 * 60000), 'ok')
  assert.equal(countdownLevel(4 * 60000), 'warn')
  assert.equal(countdownLevel(30000), 'danger')
  assert.equal(countdownLevel(0), 'expired')
})

test('normalizeSettings: ค่ากันแผง/นโยบาย/ใบเสร็จมีค่าเริ่มต้นและถูกจำกัดช่วง', () => {
  const s = normalizeSettings(undefined)
  assert.equal(s.paymentHoldMinutes, 30)
  assert.equal(s.resubmitHours, 24)
  assert.equal(s.cancelPolicy.fullRefundDaysBefore, 3)
  assert.equal(s.receipt.paper, 'A5')
  const t = normalizeSettings({ paymentHoldMinutes: 5, resubmitHours: 999, cancelPolicy: { partialRefundPercent: 500 }, receipt: { paper: 'A4', name: ' ตลาด ' } })
  assert.equal(t.paymentHoldMinutes, 10)
  assert.equal(t.resubmitHours, 72)
  assert.equal(t.cancelPolicy.partialRefundPercent, 100)
  assert.equal(t.receipt.paper, 'A4')
  assert.equal(t.receipt.name, 'ตลาด')
})

// ─── นโยบายคืนเงิน ─────────────────────────────────────────────────────────
const policy = { fullRefundDaysBefore: 3, partialRefundPercent: 50, noRefundOnMarketDay: true }
const now = new Date('2026-10-12T05:00:00Z') // 12 ต.ค. 2026 เวลาไทย
const bk = (slots) => ({ slots, pricePerSlot: 500, totalAmount: 500 * slots.length, amountDue: 500 * slots.length })

test('refundPolicy: ก่อนวันขาย 5 วัน คืนเต็ม', () => {
  const r = suggestRefund(bk(['2026-10-17_all']), policy, now)
  assert.equal(r.amount, 500)
  assert.equal(r.percent, 100)
  assert.deepEqual(r.releaseSlots, ['2026-10-17_all'])
})
test('refundPolicy: 1-2 วันก่อน คืน 50% / วันขายและวันที่ผ่านมาแล้วไม่คืน', () => {
  assert.equal(suggestRefund(bk(['2026-10-14_all']), policy, now).amount, 250)
  const same = suggestRefund(bk(['2026-10-12_all']), policy, now)
  assert.equal(same.amount, 0)
  assert.deepEqual(same.releaseSlots, [], 'วันขายถึงแล้วไม่ปล่อยช่อง')
  assert.equal(suggestRefund(bk(['2026-10-10_all']), policy, now).amount, 0)
})
test('refundPolicy: หลายช่องผสม และวันขายคืนบางส่วนเมื่อไม่ตั้งห้าม', () => {
  const r = suggestRefund(bk(['2026-10-12_all', '2026-10-14_all', '2026-10-20_all']), policy, now)
  assert.equal(r.amount, 750)
  assert.equal(r.paid, 1500)
  assert.equal(r.percent, 50)
  assert.equal(suggestRefund(bk(['2026-10-12_all']), { ...policy, noRefundOnMarketDay: false }, now).amount, 250)
})
test('refundPolicy: การจองเก่าไม่มีวัน คืนเต็มและไม่มีช่องให้ปล่อย', () => {
  const r = suggestRefund({ amountDue: 300 }, policy, now)
  assert.equal(r.amount, 300)
  assert.deepEqual(r.releaseSlots, [])
})
test('refundPolicy: เวลา 23:30 UTC ถือเป็นวันถัดไปตามเวลาไทย', () => {
  const lateUtc = new Date('2026-10-12T23:30:00Z') // 13 ต.ค. 06:30 ไทย
  assert.equal(suggestRefund(bk(['2026-10-13_all']), policy, lateUtc).amount, 0)
})

// ─── ใบเสร็จ ───────────────────────────────────────────────────────────────
test('bahtText', () => {
  assert.equal(bahtText(0), 'ศูนย์บาทถ้วน')
  assert.equal(bahtText(21), 'ยี่สิบเอ็ดบาทถ้วน')
  assert.equal(bahtText(100), 'หนึ่งร้อยบาทถ้วน')
  assert.equal(bahtText(500), 'ห้าร้อยบาทถ้วน')
  assert.equal(bahtText(11), 'สิบเอ็ดบาทถ้วน')
  assert.equal(bahtText(1000000), 'หนึ่งล้านบาทถ้วน')
  assert.equal(bahtText(1250.5), 'หนึ่งพันสองร้อยห้าสิบบาทห้าสิบสตางค์')
  assert.equal(bahtText(1000001), 'หนึ่งล้านเอ็ดบาทถ้วน')
  assert.equal(bahtText(0.25), 'ศูนย์บาทยี่สิบห้าสตางค์')
})
test('เลขใบเสร็จและปี พ.ศ.', () => {
  assert.equal(formatReceiptNo(2569, 123), 'R2569-000123')
  assert.equal(thaiYearOf('2026-10-12'), 2569)
})

// ─── รายงานรายได้ ──────────────────────────────────────────────────────────
const ts = (iso) => ({ toDate: () => new Date(iso) })
const stalls = { s1: { stallNo: 'A-01', zoneName: 'โซนอาหาร' }, s2: { stallNo: 'B-01', zoneName: 'โซนของใช้' } }

test('revenue: หลายวันข้ามเดือน นับตามวันขายของแต่ละช่อง', () => {
  const b = [{ id: 'b1', status: 'approved', stallId: 's1', slots: ['2026-10-30_all', '2026-10-31_all', '2026-11-01_all'], pricePerSlot: 500 }]
  const oct = computeRevenue(b, { from: '2026-10-01', to: '2026-10-31' }, { stalls })
  assert.equal(oct.gross, 1000)
  assert.equal(oct.slotCount, 2)
  const nov = computeRevenue(b, { from: '2026-11-01', to: '2026-11-30' }, { stalls })
  assert.equal(nov.gross, 500)
  assert.equal(nov.daily.find(d => d.date === '2026-11-01').revenue, 500)
})
test('revenue: ยกเลิกบางช่อง (ช่องที่ปล่อยไม่นับ ช่องที่ผ่านแล้วยังนับ)', () => {
  const b = [{ id: 'b1', status: 'cancelled', wasApproved: true, stallId: 's1', slots: ['2026-10-10_all', '2026-10-20_all'], releasedSlots: ['2026-10-20_all'], pricePerSlot: 500 }]
  const r = computeRevenue(b, { from: '2026-10-01', to: '2026-10-31' }, { stalls })
  assert.equal(r.gross, 500)
  assert.equal(r.slotCount, 1)
  // ยกเลิกก่อนอนุมัติ (ไม่เคยได้รับเงิน) ไม่นับ
  const never = computeRevenue([{ id: 'b2', status: 'cancelled', stallId: 's1', slots: ['2026-10-10_all'], pricePerSlot: 500 }], { from: '2026-10-01', to: '2026-10-31' }, { stalls })
  assert.equal(never.gross, 0)
})
test('revenue: คืนเงินคนละเดือนกับวันขาย หักตามวันที่คืนจริง', () => {
  const b = [{ id: 'b1', status: 'cancelled', wasApproved: true, stallId: 's1', slots: ['2026-10-20_all'], releasedSlots: [], pricePerSlot: 500,
    refund: { status: 'refunded', amount: 300, refundedAt: ts('2026-11-02T03:00:00Z') } }]
  const oct = computeRevenue(b, { from: '2026-10-01', to: '2026-10-31' }, { stalls })
  assert.equal(oct.gross, 500)
  assert.equal(oct.refunds, 0)
  const nov = computeRevenue(b, { from: '2026-11-01', to: '2026-11-30' }, { stalls })
  assert.equal(nov.gross, 0)
  assert.equal(nov.refunds, 300)
  assert.equal(nov.net, -300)
  assert.equal(nov.daily.find(d => d.date === '2026-11-02').refund, 300)
})
test('revenue: การจองเก่าไม่มีวันที่ นับตามวันอนุมัติและทำเครื่องหมายประมาณการ', () => {
  const b = [{ id: 'old', stallId: 's2', amountDue: 200, decidedAt: ts('2026-10-05T04:00:00Z') }, { id: 'old2', status: 'approved', stallId: 's2', amountDue: 200, createdAt: ts('2026-09-30T04:00:00Z') }]
  const r = computeRevenue(b, { from: '2026-10-01', to: '2026-10-31' }, { stalls })
  assert.equal(r.gross, 200)
  assert.equal(r.estimated, true)
})
test('revenue: รอตรวจสลิปไม่นับเป็นรายได้ แต่แสดงเป็นยอดค้าง / โซน / แผงขายดี', () => {
  const b = [
    { id: 'p', status: 'pending', stallId: 's1', slots: ['2026-10-15_all'], pricePerSlot: 500 },
    { id: 'a', status: 'approved', stallId: 's1', slots: ['2026-10-16_morning', '2026-10-16_evening'], pricePerSlot: 300 },
    { id: 'c', status: 'approved', stallId: 's2', slots: ['2026-10-16_morning'], pricePerSlot: 400 }
  ]
  const r = computeRevenue(b, { from: '2026-10-01', to: '2026-10-31' }, { stalls })
  assert.equal(r.gross, 1000)
  assert.equal(r.pendingAmount, 500)
  assert.equal(r.bookingCount, 2)
  assert.equal(r.byZone[0].zoneName, 'โซนอาหาร')
  assert.equal(r.topStalls[0].stallNo, 'A-01')
  assert.equal(r.byRound.find(x => x.roundId === 'morning').revenue, 700)
})
test('revenue: ช่วงก่อนหน้า, เปอร์เซ็นต์, ความจุ, รายเดือน', () => {
  assert.deepEqual(previousRange({ from: '2026-10-01', to: '2026-10-31' }), { from: '2026-08-31', to: '2026-09-30' })
  assert.equal(percentChange(112, 100), 12)
  assert.equal(percentChange(95, 100), -5)
  assert.equal(percentChange(5, 0), null)
  assert.equal(capacitySlots({ openWeekdays: [6, 0] }, { from: '2026-10-01', to: '2026-10-31' }, 10), 9 * 10) // เสาร์-อาทิตย์ 9 วัน
  const m = groupMonthly([{ date: '2026-10-30', revenue: 1, refund: 0, slots: 1 }, { date: '2026-11-01', revenue: 2, refund: 1, slots: 1 }])
  assert.deepEqual(m.map(x => [x.date, x.net]), [['2026-10', 1], ['2026-11', 1]])
})

// ─── xlsx / csv ────────────────────────────────────────────────────────────
function readZip(bytes) {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const eocd = bytes.length - 22
  assert.equal(dv.getUint32(eocd, true), 0x06054b50)
  const count = dv.getUint16(eocd + 10, true)
  let p = dv.getUint32(eocd + 16, true)
  const out = {}
  for (let i = 0; i < count; i++) {
    assert.equal(dv.getUint32(p, true), 0x02014b50)
    const crc = dv.getUint32(p + 16, true)
    const size = dv.getUint32(p + 24, true)
    const nameLen = dv.getUint16(p + 28, true)
    const off = dv.getUint32(p + 42, true)
    const name = new TextDecoder().decode(bytes.subarray(p + 46, p + 46 + nameLen))
    assert.equal(dv.getUint32(off, true), 0x04034b50)
    const dataStart = off + 30 + dv.getUint16(off + 26, true) + dv.getUint16(off + 28, true)
    const data = bytes.subarray(dataStart, dataStart + size)
    assert.equal(crc32(data), crc, `CRC ของ ${name}`)
    out[name] = new TextDecoder().decode(data)
    p += 46 + nameLen
  }
  return out
}

test('xlsx: โครงไฟล์ถูกต้อง ภาษาไทย เงินเป็นตัวเลข วันที่เป็นเลขวันของ Excel', () => {
  const bytes = buildXlsx([
    { name: 'สรุป', header: true, rows: [['รายการ', 'ยอด'], ['รายได้ <รวม> & "ทดสอบ"', { v: 1234.5, fmt: 'money' }], ['วันที่', { date: '2026-10-12' }]] },
    { name: 'รายวัน', rows: [[1, 2]] }
  ])
  const files = readZip(bytes)
  assert.deepEqual(Object.keys(files).sort(), [
    '[Content_Types].xml', '_rels/.rels', 'xl/_rels/workbook.xml.rels', 'xl/styles.xml',
    'xl/workbook.xml', 'xl/worksheets/sheet1.xml', 'xl/worksheets/sheet2.xml'
  ])
  assert.match(files['xl/workbook.xml'], /name="สรุป"/)
  const s1 = files['xl/worksheets/sheet1.xml']
  assert.match(s1, /รายได้ &lt;รวม&gt; &amp; &quot;ทดสอบ&quot;/)
  assert.match(s1, /<c r="B2" s="2"><v>1234.5<\/v><\/c>/, 'เงินเป็นตัวเลขจริง')
  assert.match(s1, /<c r="B3" s="3"><v>46307<\/v><\/c>/, 'วันที่ 12 ต.ค. 2026')
  assert.match(s1, /state="frozen"/)
  assert.equal(excelDateSerial('2026-10-12'), 46307)
  assert.equal(colName(0), 'A')
  assert.equal(colName(27), 'AB')
})
test('csv: BOM, เครื่องหมายคำพูด และกัน formula injection', () => {
  const csv = toCsv([['ชื่อ', 'ยอด'], ['ร้าน "A", B', { v: 5 }], ['=cmd()', 1]])
  assert.equal(csv.charCodeAt(0), 0xfeff)
  assert.match(csv, /"ร้าน ""A"", B",5/)
  assert.match(csv, /'=cmd\(\),1/)
})

// ─── sheet รายงาน / ชื่อไฟล์ / chunk ────────────────────────────────────────
import { buildReportSheets, reportFileName, countReportRows } from '../src/utils/reportSheets.js'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

const reportFixture = () => {
  const bookings = [
    { id: 'b1', status: 'approved', stallId: 's1', slots: ['2026-10-16_morning', '2026-10-17_morning'], pricePerSlot: 300, shopName: 'ร้านชา', customerName: 'สมชาย', customerPhone: '0811111111', receiptNo: 'R2569-000001', decidedAt: ts('2026-10-10T03:00:00Z'), decidedBy: 'u1' },
    { id: 'b2', status: 'cancelled', wasApproved: true, stallId: 's2', slots: ['2026-10-20_evening'], releasedSlots: [], pricePerSlot: 400, amountDue: 400, customerName: 'สมหญิง',
      refund: { status: 'refunded', amount: 200, method: 'promptpay', refundedDate: '2026-10-25', refundedBy: 'u1', refundedAt: ts('2026-10-25T03:00:00Z'), adjustReason: 'หักค่าดำเนินการ' } }
  ]
  const settings = normalizeSettings({ rounds: [{ id: 'morning', label: 'รอบเช้า' }, { id: 'evening', label: 'รอบเย็น' }] })
  const report = computeRevenue(bookings, { from: '2026-10-01', to: '2026-10-31' }, { stalls })
  return { report, settings }
}

test('reportSheets: 4 sheet หัวตารางตามสเปก เงินเป็นตัวเลข ไม่ใส่เบอร์โดยค่าเริ่มต้น', () => {
  const { report, settings } = reportFixture()
  const sheets = buildReportSheets(report, { settings, marketName: 'ตลาดทดสอบ', exportedBy: 'เจ้าของ', exportedAt: new Date('2026-10-31T10:00:00Z'), utilization: 0.25 })
  assert.deepEqual(sheets.map(s => s.name), ['สรุป', 'รายวัน', 'รายการจอง', 'คืนเงิน'])
  assert.deepEqual(sheets[1].rows[0], ['วันที่', 'รอบ', 'จำนวนช่องที่จอง', 'รายได้', 'คืนเงิน', 'สุทธิ'])
  assert.deepEqual(sheets[2].rows[0], ['เลขการจอง', 'เลขใบเสร็จ', 'แผง', 'โซน', 'ชื่อร้าน', 'ผู้เช่า', 'วัน/รอบ', 'ยอดในช่วงนี้', 'สถานะ', 'วันอนุมัติ', 'ผู้อนุมัติ (uid)'])
  assert.deepEqual(sheets[3].rows[0], ['เลขการจอง', 'ยอดจ่าย', 'ยอดคืน', 'วิธี', 'วันที่คืน', 'ผู้บันทึก (uid)', 'เหตุผล/หมายเหตุ'])
  const sum = Object.fromEntries(sheets[0].rows.filter(r => r.length === 2).map(r => [r[0], r[1]]))
  assert.deepEqual(sum['รายได้รวม (บาท)'], { v: 1000, fmt: 'money' })
  assert.deepEqual(sum['คืนเงิน (บาท)'], { v: 200, fmt: 'money' })
  assert.deepEqual(sum['รายได้สุทธิ (บาท)'], { v: 800, fmt: 'money' })
  assert.equal(sum['อัตราการใช้แผง (%)'], 25)
  // รายการจอง: แถว b1 ยอด 600 (2 ช่อง) ไม่มีเบอร์โทรในแถว
  const b1 = sheets[2].rows.find(r => r[0] === 'b1')
  assert.deepEqual(b1[7], { v: 600, fmt: 'money' })
  assert.ok(!JSON.stringify(sheets).includes('0811111111'), 'ห้ามมีเบอร์โทรเมื่อไม่ติ๊กเลือก')
  // รายวัน: แถวคืนเงินวันที่ 25 มีรอบ "-" และยอดสุทธิติดลบ
  const refundRow = sheets[1].rows.find(r => r[1] === '-')
  assert.deepEqual(refundRow[0], { date: '2026-10-25' })
  assert.deepEqual(refundRow[5], { v: -200, fmt: 'money' })
  assert.equal(sheets[3].rows[1][3], 'PromptPay')
  assert.match(sheets[3].rows[1][6], /หักค่าดำเนินการ/)
  assert.equal(countReportRows(sheets), (sheets[1].rows.length - 1) + (sheets[2].rows.length - 1) + (sheets[3].rows.length - 1))
})

test('reportSheets: ติ๊กใส่เบอร์โทรแล้วมีคอลัมน์เบอร์', () => {
  const { report, settings } = reportFixture()
  const sheets = buildReportSheets(report, { settings, includePhone: true })
  assert.ok(sheets[2].rows[0].includes('เบอร์โทร'))
  assert.ok(JSON.stringify(sheets[2].rows).includes('0811111111'))
})

test('reportSheets: เขียนเป็น xlsx ได้จริงจากทุก sheet', () => {
  const { report, settings } = reportFixture()
  const bytes = buildXlsx(buildReportSheets(report, { settings, marketName: 'ตลาด', exportedAt: new Date() }))
  const files = readZip(bytes)
  assert.ok(files['xl/worksheets/sheet4.xml'])
  assert.match(files['xl/worksheets/sheet3.xml'], /R2569-000001/)
})

test('ชื่อไฟล์รายงาน', () => {
  assert.equal(reportFileName('ตลาด KKU', { from: '2026-10-01', to: '2026-10-31' }), 'revenue-kku-2569-10.xlsx')
  assert.equal(reportFileName('ตลาดไทย', { from: '2026-10-01', to: '2026-10-31' }), 'revenue-market-2569-10.xlsx')
  assert.equal(reportFileName('Walking Street', { from: '2026-10-05', to: '2026-10-31' }), 'revenue-walking-street-20261005-20261031.xlsx')
  assert.equal(reportFileName('x', { from: '2026-02-01', to: '2026-02-28' }, 'csv'), 'revenue-x-2569-02.csv')
})

test('build: ตัวเขียน xlsx แยก chunk ไม่รวมในไฟล์หลัก (ข้ามถ้ายังไม่ได้ build)', { skip: !existsSync('dist/assets') }, () => {
  const files = readdirSync('dist/assets').filter(f => f.endsWith('.js'))
  const withXlsx = files.filter(f => readFileSync(`dist/assets/${f}`, 'utf8').includes('spreadsheetml.worksheet+xml'))
  assert.equal(withXlsx.length, 1, 'ต้องมี chunk เดียวที่มีตัวเขียน xlsx')
  assert.ok(!/^(index|App)-/.test(withXlsx[0]), `ตัวเขียน xlsx ต้องไม่อยู่ใน ${withXlsx[0]}`)
})
