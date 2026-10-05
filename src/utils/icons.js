import {
  DoorOpen,
  LogOut,
  Footprints,
  Square,
  Bath,
  Mic,
  Trash2,
  CreditCard,
  HelpCircle,
  Cross
} from 'lucide-vue-next'

// แปลงชื่อไอคอนที่เก็บใน styleProps.icon ของวัตถุในผัง เป็น component ของ lucide
const ICONS = {
  'door-open': DoorOpen,
  'log-out': LogOut,
  'footprints': Footprints,
  'bath': Bath,
  'mic': Mic,
  'trash-2': Trash2,
  'credit-card': CreditCard,
  'help-circle': HelpCircle,
  'cross': Cross
}

export function getIconComponent(iconName) {
  return ICONS[iconName] || Square
}
