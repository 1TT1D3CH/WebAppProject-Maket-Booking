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
    bookedBy: { tenantId: 'demo-tenant-001', name: 'คุณสมชาย (ร้านชาไข่มุก)', phone: '081-234-5678', bookedAt: '2026-09-24' },
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

/**
 * Initial Market Architecture Objects (Entrances, Walkways, Restricted Zones, Landmarks)
 */
export const DEFAULT_LAYOUT_OBJECTS = [
  {
    id: 'obj-entrance-main',
    type: 'entrance',
    subType: 'gate',
    label: 'ทางเข้าหลัก A (Main Gate)',
    x: 40,
    y: 20,
    width: 160,
    height: 48,
    rotation: 0,
    styleProps: { color: '#10b981', icon: 'door-open' }
  },
  {
    id: 'obj-exit-parking',
    type: 'exit',
    subType: 'gate',
    label: 'ทางออกฝั่งลานจอดรถ',
    x: 880,
    y: 620,
    width: 160,
    height: 48,
    rotation: 0,
    styleProps: { color: '#f59e0b', icon: 'log-out' }
  },
  {
    id: 'obj-walkway-main',
    type: 'walkway',
    subType: 'main_path',
    label: 'ทางเดินหลัก (Central Walkway)',
    x: 470,
    y: 100,
    width: 80,
    height: 360,
    rotation: 0,
    styleProps: { color: '#64748b', icon: 'footprints' }
  },
  {
    id: 'obj-restroom',
    type: 'restricted',
    subType: 'restroom',
    label: 'โซนห้องน้ำสาธารณะ',
    x: 880,
    y: 100,
    width: 120,
    height: 90,
    rotation: 0,
    styleProps: { color: '#0284c7', icon: 'bath' }
  },
  {
    id: 'obj-stage',
    type: 'restricted',
    subType: 'stage',
    label: 'เวทีแสดงดนตรีสด & กิจกรรม',
    x: 580,
    y: 350,
    width: 180,
    height: 110,
    rotation: 0,
    styleProps: { color: '#8b5cf6', icon: 'mic' }
  },
  {
    id: 'obj-atm-station',
    type: 'facility',
    subType: 'atm',
    label: 'จุดตู้ ATM / โอนเงิน',
    x: 230,
    y: 20,
    width: 110,
    height: 45,
    rotation: 0,
    styleProps: { color: '#0ea5e9', icon: 'credit-card' }
  },
  {
    id: 'obj-info-center',
    type: 'facility',
    subType: 'info',
    label: 'จุดประชาสัมพันธ์ (Info)',
    x: 360,
    y: 20,
    width: 130,
    height: 45,
    rotation: 0,
    styleProps: { color: '#6366f1', icon: 'help-circle' }
  }
]

/**
 * Helper options for architecture object creation
 */
export const ARCHITECTURE_PRESETS = [
  {
    type: 'entrance',
    subType: 'gate',
    label: 'ทางเข้าหลัก (Entrance)',
    widthM: 4.0,
    heightM: 1.2,
    styleProps: { color: '#10b981', icon: 'door-open' }
  },
  {
    type: 'exit',
    subType: 'gate',
    label: 'ทางออก (Exit)',
    widthM: 4.0,
    heightM: 1.2,
    styleProps: { color: '#f59e0b', icon: 'log-out' }
  },
  {
    type: 'walkway',
    subType: 'main_path',
    label: 'ทางเดินผู้ซื้อ (Walkway)',
    widthM: 2.0,
    heightM: 8.0,
    styleProps: { color: '#64748b', icon: 'footprints' }
  },
  {
    type: 'restricted',
    subType: 'pillar',
    label: 'เสาอาคาร (Pillar)',
    widthM: 1.5,
    heightM: 1.5,
    styleProps: { color: '#475569', icon: 'square' }
  },
  {
    type: 'restricted',
    subType: 'restroom',
    label: 'ห้องน้ำ (Restroom)',
    widthM: 3.0,
    heightM: 2.5,
    styleProps: { color: '#0284c7', icon: 'bath' }
  },
  {
    type: 'restricted',
    subType: 'stage',
    label: 'เวทีกลางแจ้ง (Stage)',
    widthM: 4.5,
    heightM: 3.0,
    styleProps: { color: '#8b5cf6', icon: 'mic' }
  },
  {
    type: 'restricted',
    subType: 'trash',
    label: 'จุดทิ้งขยะ (Trash Area)',
    widthM: 2.0,
    heightM: 1.5,
    styleProps: { color: '#64748b', icon: 'trash-2' }
  },
  {
    type: 'facility',
    subType: 'atm',
    label: 'ตู้ ATM',
    widthM: 2.5,
    heightM: 1.2,
    styleProps: { color: '#0ea5e9', icon: 'credit-card' }
  },
  {
    type: 'facility',
    subType: 'info',
    label: 'จุดประชาสัมพันธ์ (Info)',
    widthM: 3.0,
    heightM: 1.2,
    styleProps: { color: '#6366f1', icon: 'help-circle' }
  },
  {
    type: 'facility',
    subType: 'firstaid',
    label: 'จุดปฐมพยาบาล (First Aid)',
    widthM: 2.5,
    heightM: 2.0,
    styleProps: { color: '#ef4444', icon: 'cross' }
  }
]
