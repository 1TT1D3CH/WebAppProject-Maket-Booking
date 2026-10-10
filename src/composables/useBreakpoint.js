import { useMediaQuery } from './useMediaQuery'

/**
 * ขนาดจอสำหรับสลับ component จริง ๆ เท่านั้น (เรื่อง layout ทั่วไปใช้ class responsive ของ Tailwind)
 * isPhone < 640, isTablet 640-1023, isDesktop >= 1024, isTouch = นิ้วเป็นตัวชี้หลัก
 */
export function useBreakpoint() {
  const isPhone = useMediaQuery('(max-width: 639px)')
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTouch = useMediaQuery('(pointer: coarse)')
  return { isPhone, isTablet, isDesktop, isTouch }
}
