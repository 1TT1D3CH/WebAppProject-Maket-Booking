import { defineStore } from 'pinia'
import { db, isRealFirebaseConfigured } from '../firebase/config'
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs, 
  writeBatch,
  query,
  orderBy,
  limit 
} from 'firebase/firestore'

// กรองขยะใน localStorage ถ้ามีสะสมเกิน 50 รายการ
function getInitialLocalNotifications() {
  try {
    const raw = localStorage.getItem('tenant_notifications')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      // ถ้ามีขยะสะสมเป็นร้อยรายการ ให้เคลียร์ทิ้ง
      if (parsed.length > 50) {
        localStorage.removeItem('tenant_notifications')
        localStorage.removeItem('tenant_notifications_deleted')
        return []
      }
      return parsed
    }
  } catch (e) {
    localStorage.removeItem('tenant_notifications')
  }
  return []
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: getInitialLocalNotifications(),
    deletedIds: JSON.parse(localStorage.getItem('tenant_notifications_deleted')) || [],
    unsubscribeListener: null,
    isPurging: false
  }),

  getters: {
    unreadCount: (state) => (tenantId, isAdminOrOwner = false) => {
      if (isAdminOrOwner) {
        return state.notifications.filter(n => !n.isRead).length
      }
      const targetId = tenantId || 'demo-tenant-001'
      return state.notifications.filter(
        n => !n.isRead && (n.tenantId === targetId || n.tenantId === 'demo-tenant-001')
      ).length
    },

    tenantNotifications: (state) => (tenantId, isAdminOrOwner = false) => {
      let list = state.notifications
      if (!isAdminOrOwner) {
        const idToMatch = tenantId || 'demo-tenant-001'
        list = state.notifications.filter(
          n => n.tenantId === idToMatch || n.tenantId === 'demo-tenant-001'
        )
      }
      return [...list].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    }
  },

  actions: {
    persistLocal() {
      try {
        localStorage.setItem('tenant_notifications', JSON.stringify(this.notifications.slice(0, 50)))
        localStorage.setItem('tenant_notifications_deleted', JSON.stringify(this.deletedIds.slice(0, 100)))
      } catch (err) {
        console.warn('Notification storage notice:', err)
      }
    },

    /**
     * Start Real-Time Listener for Firestore Notifications
     * จำกัดเฉพาะ 30 รายการล่าสุด ป้องกันการดึงขยะ 490 รายการ
     */
    initNotificationSync() {
      if (!isRealFirebaseConfigured || !db) return

      // ถ้าใน Firestore มีขยะสะสมมากกว่า 50 รายการ ให้ล้างขยะเก่าทิ้งทันที
      this.autoCleanupIfSpammed()

      if (!this.unsubscribeListener) {
        try {
          const notifCollection = collection(db, 'notifications')
          this.unsubscribeListener = onSnapshot(notifCollection, (snapshot) => {
            const remoteItems = []
            snapshot.forEach((docSnap) => {
              const data = docSnap.data()
              const id = docSnap.id
              if (!this.deletedIds.includes(id)) {
                remoteItems.push({ id, ...data })
              }
            })

            // เรียงลำดับจากใหม่สุดไปเก่าสุด และจำกัดไม่เกิน 30 รายการ
            remoteItems.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            const trimmed = remoteItems.slice(0, 30)

            this.notifications = trimmed
            this.persistLocal()
          }, (err) => {
            console.warn('Notification snapshot notice:', err.message)
          })
        } catch (e) {
          console.warn('Init notification sync error:', e)
        }
      }
    },

    /**
     * ตรวจสอบและล้าง notifications ขยะอัตโนมัติหากพบว่ามีเอกสารตกค้างจำนวนมาก
     */
    async autoCleanupIfSpammed() {
      if (!isRealFirebaseConfigured || !db || this.isPurging) return
      try {
        const snapshot = await getDocs(collection(db, 'notifications'))
        if (snapshot.size > 40) {
          console.log(`🧹 พบ notifications ตกค้าง ${snapshot.size} รายการ กำลังล้างทำความสะอาด...`)
          await this.clearAllNotifications()
        }
      } catch (err) {
        console.warn('Auto cleanup notice:', err)
      }
    },

    /**
     * Send Batch / Consolidated Notifications on Save Layout
     * Complies with notification1.md schema:
     * { tenantId, stallId, stallNo, title, message, type: 'LAYOUT_UPDATE', createdAt, isRead: false }
     */
    async sendBatchLayoutNotifications(notificationsList) {
      if (!notificationsList || notificationsList.length === 0) return

      for (const item of notificationsList) {
        const notifItem = {
          id: `notif-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
          tenantId: item.tenantId || 'demo-tenant-001',
          stallId: item.stallId || 'N/A',
          stallNo: item.stallNo || 'N/A',
          title: item.title || 'อัปเดตข้อมูลแผงค้า',
          message: item.message || 'แผงค้าของคุณได้รับการอัปเดตจากผู้ดูแลระบบ',
          type: item.type || 'LAYOUT_UPDATE',
          isRead: false,
          createdAt: item.createdAt || new Date().toISOString()
        }

        this.notifications.unshift(notifItem)

        if (isRealFirebaseConfigured && db) {
          try {
            await addDoc(collection(db, 'notifications'), {
              ...notifItem,
              createdAt: notifItem.createdAt
            })
          } catch (err) {
            console.warn('Firestore notification batch add notice:', err.message)
          }
        }
      }

      this.persistLocal()
    },

    async sendStallShiftNotification({ tenantId, stallNo, title, message, type = 'LAYOUT_UPDATE', details = {} }) {
      const targetTenantId = tenantId || 'demo-tenant-001'

      const notifItem = {
        id: `notif-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
        tenantId: targetTenantId,
        stallId: details.stallId || stallNo || 'N/A',
        stallNo: stallNo || 'N/A',
        title: title || `⚠️ อัปเดตข้อมูลแผงค้า ${stallNo}`,
        message: message || `แผงค้า ${stallNo} ของคุณได้รับการปรับปรุงข้อมูลบนผังตลาด`,
        type,
        isRead: false,
        details,
        createdAt: new Date().toISOString()
      }

      this.notifications.unshift(notifItem)
      this.persistLocal()

      if (isRealFirebaseConfigured && db) {
        try {
          await addDoc(collection(db, 'notifications'), notifItem)
        } catch (err) {
          console.warn('Firestore notification add notice:', err.message)
        }
      }
    },

    markAsRead(id) {
      const idx = this.notifications.findIndex(n => n.id === id)
      if (idx !== -1) {
        this.notifications[idx].isRead = true
        this.persistLocal()
      }
      if (isRealFirebaseConfigured && db) {
        try {
          updateDoc(doc(db, 'notifications', id), { isRead: true }).catch(() => {})
        } catch (e) {}
      }
    },

    markAllAsRead(tenantId, isAdminOrOwner = false) {
      this.notifications.forEach(n => {
        if (isAdminOrOwner || !tenantId || n.tenantId === tenantId || n.tenantId === 'demo-tenant-001') {
          n.isRead = true
        }
      })
      this.persistLocal()
    },

    deleteNotification(id) {
      if (!this.deletedIds.includes(id)) {
        this.deletedIds.push(id)
      }
      this.notifications = this.notifications.filter(n => n.id !== id)
      this.persistLocal()

      if (isRealFirebaseConfigured && db) {
        try {
          deleteDoc(doc(db, 'notifications', id)).catch(() => {})
        } catch (e) {}
      }
    },

    // ลบการแจ้งเตือนทั้งหมดทันที (ทั้ง state + localStorage + Firestore)
    async clearAllNotifications() {
      this.isPurging = true
      this.notifications = []
      this.deletedIds = []
      localStorage.removeItem('tenant_notifications')
      localStorage.removeItem('tenant_notifications_deleted')

      if (isRealFirebaseConfigured && db) {
        try {
          const snapshot = await getDocs(collection(db, 'notifications'))
          const batch = writeBatch(db)
          snapshot.forEach(docSnap => {
            batch.delete(docSnap.ref)
          })
          await batch.commit()
          console.log(`✅ Cleared all ${snapshot.size} notifications from Firestore`)
        } catch (err) {
          console.warn('Error clearing Firestore notifications:', err)
        }
      }
      this.isPurging = false
    }
  }
})
