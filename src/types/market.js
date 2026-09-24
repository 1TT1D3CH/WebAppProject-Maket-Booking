/**
 * Initial Zone Definitions for Market Layout
 */
export const DEFAULT_ZONES = [
  { id: 'zone-food', name: 'โซนอาหาร & เครื่องดื่ม (Food & Drink)', color: '#ef4444', pricePerDay: 500 },
  { id: 'zone-fashion', name: 'โซนแฟชั่น & เครื่องแต่งกาย (Fashion)', color: '#ec4899', pricePerDay: 400 },
  { id: 'zone-tech', name: 'โซนไอที & กัดเจ็ต (Gadgets & Tech)', color: '#3b82f6', pricePerDay: 450 },
  { id: 'zone-craft', name: 'โซนงานแฮนด์เมด & ของสะสม (Craft & Vintage)', color: '#10b981', pricePerDay: 350 },
  { id: 'zone-general', name: 'โซนทั่วไป (General Zone)', color: '#8b5cf6', pricePerDay: 300 }
]

/**
 * Initial Demo Stalls for Market Builder
 */
export const DEFAULT_STALLS = [
  {
    id: 'stall-A01',
    stallNo: 'A01',
    zoneId: 'zone-food',
    x: 100,
    y: 100,
    width: 100,
    height: 80,
    price: 500,
    status: 'available', // available | booked | disabled | pending
    bookedBy: null,
    notes: 'ใกล้ประตูทางเข้าหลัก'
  },
  {
    id: 'stall-A02',
    stallNo: 'A02',
    zoneId: 'zone-food',
    x: 220,
    y: 100,
    width: 100,
    height: 80,
    price: 500,
    status: 'booked',
    bookedBy: { name: 'คุณสมชาย (ร้านชาไข่มุก)', phone: '081-234-5678', bookedAt: '2026-09-24' },
    notes: 'มีปลั๊กไฟ 15A'
  },
  {
    id: 'stall-A03',
    stallNo: 'A03',
    zoneId: 'zone-food',
    x: 340,
    y: 100,
    width: 100,
    height: 80,
    price: 500,
    status: 'available',
    bookedBy: null,
    notes: ''
  },
  {
    id: 'stall-B01',
    stallNo: 'B01',
    zoneId: 'zone-fashion',
    x: 100,
    y: 220,
    width: 120,
    height: 90,
    price: 400,
    status: 'available',
    bookedBy: null,
    notes: 'เหมาะตั้งราวเสื้อผ้า'
  },
  {
    id: 'stall-B02',
    stallNo: 'B02',
    zoneId: 'zone-fashion',
    x: 240,
    y: 220,
    width: 120,
    height: 90,
    price: 400,
    status: 'disabled',
    bookedBy: null,
    notes: 'ปิดซ่อมบำรุงไฟ'
  },
  {
    id: 'stall-C01',
    stallNo: 'C01',
    zoneId: 'zone-tech',
    x: 100,
    y: 340,
    width: 140,
    height: 100,
    price: 450,
    status: 'available',
    bookedBy: null,
    notes: 'มีสายแลนเต้ารับไฮสปีด'
  }
]
