// ตัวเขียนไฟล์ .xlsx แบบเล็ก ไม่พึ่ง library (ZIP แบบ store ไม่บีบอัด + XML ตาม Open XML)
// เซลล์: string | number | null | { v: number, fmt: 'money' } | { date: 'YYYY-MM-DD' }
// sheet: { name, rows: cell[][], header?: boolean (แถวแรกตัวหนา + ตรึง), widths?: number[] }

const enc = new TextEncoder()

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

export function crc32(bytes) {
  let c = 0xffffffff
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const xmlEscape = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  // ตัวอักษรควบคุมที่ XML ไม่รับ
  // eslint-disable-next-line no-control-regex
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')

export function colName(i) {
  let n = i + 1
  let s = ''
  while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = Math.floor((n - 1) / 26) }
  return s
}

/** 'YYYY-MM-DD' -> เลขวันแบบ Excel (นับจาก 1899-12-30) */
export function excelDateSerial(key) {
  const [y, m, d] = key.split('-').map(Number)
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 86400000)
}

// สไตล์: 0 ปกติ, 1 ตัวหนา, 2 เงิน #,##0.00, 3 วันที่ dd/mm/yyyy, 4 ตัวหนา+เงิน
const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="dd/mm/yyyy"/></numFmts>
<fonts count="2"><font><sz val="11"/><name val="Tahoma"/></font><font><b/><sz val="11"/><name val="Tahoma"/></font></fonts>
<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="5">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="4" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyNumberFormat="1"/>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`

function cellXml(cell, ref, bold) {
  if (cell === null || cell === undefined || cell === '') return ''
  if (typeof cell === 'number') {
    if (!Number.isFinite(cell)) return ''
    return `<c r="${ref}"${bold ? ' s="1"' : ''}><v>${cell}</v></c>`
  }
  if (typeof cell === 'object') {
    if (cell.date) return `<c r="${ref}" s="3"><v>${excelDateSerial(cell.date)}</v></c>`
    if (typeof cell.v === 'number' && Number.isFinite(cell.v)) return `<c r="${ref}" s="${bold ? 4 : 2}"><v>${cell.v}</v></c>`
    return ''
  }
  return `<c r="${ref}"${bold ? ' s="1"' : ''} t="inlineStr"><is><t xml:space="preserve">${xmlEscape(cell)}</t></is></c>`
}

const textLen = (cell) => {
  if (cell === null || cell === undefined) return 0
  if (typeof cell === 'object') return cell.date ? 12 : String(cell.v ?? '').length + 4
  return String(cell).length
}

function sheetXml(sheet) {
  const rows = sheet.rows || []
  const colCount = rows.reduce((m, r) => Math.max(m, r.length), 0)
  const widths = Array.from({ length: colCount }, (_, c) => {
    if (sheet.widths?.[c]) return sheet.widths[c]
    const max = rows.reduce((m, r) => Math.max(m, textLen(r[c])), 8)
    return Math.min(60, max + 3)
  })
  let xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
  if (sheet.header && rows.length) {
    xml += '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>'
  }
  if (colCount) {
    xml += '<cols>' + widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('') + '</cols>'
  }
  xml += '<sheetData>'
  rows.forEach((row, r) => {
    const bold = sheet.header && r === 0
    xml += `<row r="${r + 1}">` + row.map((cell, c) => cellXml(cell, `${colName(c)}${r + 1}`, bold)).join('') + '</row>'
  })
  return xml + '</sheetData></worksheet>'
}

const u16 = (n) => [n & 0xff, (n >>> 8) & 0xff]
const u32 = (n) => [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]

/** ZIP แบบ store (ไม่บีบอัด) files = [{ name, data: Uint8Array }] */
export function zipStore(files) {
  const chunks = []
  const central = []
  let offset = 0
  const push = (arr) => { const u = arr instanceof Uint8Array ? arr : Uint8Array.from(arr); chunks.push(u); offset += u.length }
  for (const f of files) {
    const name = enc.encode(f.name)
    const crc = crc32(f.data)
    const local = [
      ...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21),
      ...u32(crc), ...u32(f.data.length), ...u32(f.data.length), ...u16(name.length), ...u16(0)
    ]
    central.push({ name, crc, size: f.data.length, offset })
    push(local); push(name); push(f.data)
  }
  const cdStart = offset
  for (const c of central) {
    push([
      ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21),
      ...u32(c.crc), ...u32(c.size), ...u32(c.size), ...u16(c.name.length), ...u16(0), ...u16(0),
      ...u16(0), ...u16(0), ...u32(0), ...u32(c.offset)
    ])
    push(c.name)
  }
  const cdSize = offset - cdStart
  push([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(central.length), ...u16(central.length), ...u32(cdSize), ...u32(cdStart), ...u16(0)])
  const out = new Uint8Array(offset)
  let p = 0
  for (const ch of chunks) { out.set(ch, p); p += ch.length }
  return out
}

const safeSheetName = (name, i) => String(name || `Sheet${i + 1}`).replace(/[:\\/?*[\]]/g, ' ').slice(0, 31) || `Sheet${i + 1}`

/** @returns {Uint8Array} ไฟล์ .xlsx */
export function buildXlsx(sheets) {
  if (!sheets.length) throw new Error('ต้องมีอย่างน้อย 1 sheet')
  const names = sheets.map((s, i) => safeSheetName(s.name, i))
  const files = [
    {
      name: '[Content_Types].xml',
      data: enc.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
        + sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')
        + '</Types>')
    },
    {
      name: '_rels/.rels',
      data: enc.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>')
    },
    {
      name: 'xl/workbook.xml',
      data: enc.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'
        + names.map((n, i) => `<sheet name="${xmlEscape(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')
        + '</sheets></workbook>')
    },
    {
      name: 'xl/_rels/workbook.xml.rels',
      data: enc.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        + sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')
        + `<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`)
    },
    { name: 'xl/styles.xml', data: enc.encode(STYLES_XML) },
    ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: enc.encode(sheetXml(s)) }))
  ]
  return zipStore(files)
}

/** CSV (UTF-8 พร้อม BOM เพื่อให้ Excel อ่านภาษาไทยถูก) จากแถวของ sheet */
export function toCsv(rows) {
  const esc = (cell) => {
    let v = cell
    if (v && typeof v === 'object') v = v.date ?? v.v
    v = v === null || v === undefined ? '' : String(v)
    // กัน CSV injection ในโปรแกรมตารางคำนวณ
    if (/^[=+\-@]/.test(v) && Number.isNaN(Number(v))) v = `'${v}`
    return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v
  }
  return '﻿' + rows.map(r => r.map(esc).join(',')).join('\r\n')
}
