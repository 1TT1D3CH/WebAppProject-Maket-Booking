import { defineStore } from 'pinia'
import { auth, db } from '../firebase/config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// ปุ่มสลับบทบาททดสอบใช้ได้เฉพาะตอน dev หรือเมื่อเปิด VITE_DEMO_MODE=true เท่านั้น
export const DEMO_ENABLED = import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE === 'true'

// ผู้ใช้ทดสอบมีอยู่แค่ฝั่ง UI (ไม่ได้ล็อกอิน Firebase จริง) จึงเขียน Firestore ไม่ได้ตาม rules
export const DEMO_USERS = DEMO_ENABLED
  ? {
      owner: {
        uid: 'demo-owner-001',
        email: 'owner@market.com',
        displayName: 'คุณวิชัย (เจ้าของตลาด Walking Street)',
        role: 'owner'
      },
      admin: {
        uid: 'demo-admin-001',
        email: 'admin@market.com',
        displayName: 'คุณสมชาย (ผู้ดูแลระบบผังตลาด)',
        role: 'admin'
      },
      tenant: {
        uid: 'demo-tenant-001',
        email: 'tenant@market.com',
        displayName: 'คุณสมพงษ์ (พ่อค้าชาไข่มุก)',
        role: 'tenant'
      }
    }
  : {}

// ใช้กันผลลัพธ์ของการโหลด profile ที่ช้ากว่ามาเขียนทับของใหม่
let profileLoadSeq = 0
let unsubscribeAuth = null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    isAuthenticated: false,
    isAuthReady: false,
    isLoading: false,
    authError: null
  }),

  getters: {
    userRole: (state) => state.currentUser?.role || null,
    isOwner: (state) => state.currentUser?.role === 'owner',
    isAdmin: (state) => state.currentUser?.role === 'admin' || state.currentUser?.role === 'owner',
    isTenant: (state) => state.currentUser?.role === 'tenant',
    userName: (state) => state.currentUser?.displayName || state.currentUser?.email || 'ผู้ใช้งานทั่วไป'
  },

  actions: {
    setUser(user) {
      this.currentUser = user
      this.isAuthenticated = !!user
    },

    /**
     * ใช้ onAuthStateChanged เป็นแหล่งความจริงเดียวของสถานะล็อกอิน
     * role อ่านจาก users/{uid} ใน Firestore เท่านั้น (ไม่เชื่อค่าจาก localStorage)
     */
    initAuth() {
      // ลบค่าเก่าที่เคยเก็บ role ไว้ในเครื่อง
      localStorage.removeItem('auth_user')

      if (unsubscribeAuth || !auth) return
      unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
        // ผู้ใช้ anonymous ไม่นับว่าล็อกอิน และไม่มีสิทธิ์จอง
        if (!firebaseUser || firebaseUser.isAnonymous) {
          profileLoadSeq++
          this.setUser(null)
        } else {
          await this._loadProfile(firebaseUser)
        }
        this.isAuthReady = true
      })
    },

    async _loadProfile(firebaseUser) {
      const seq = ++profileLoadSeq
      let profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
        role: 'tenant'
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          profile = { ...profile, ...userDoc.data(), uid: firebaseUser.uid }
        }
      } catch (err) {
        console.error('โหลดข้อมูลผู้ใช้ไม่สำเร็จ:', err)
      }

      if (seq !== profileLoadSeq) return
      this.setUser(profile)
    },

    // Demo Mode Quick Switcher (เฉพาะ dev / VITE_DEMO_MODE)
    switchDemoRole(role) {
      if (DEMO_ENABLED && DEMO_USERS[role]) {
        profileLoadSeq++
        this.setUser({ ...DEMO_USERS[role], isDemo: true })
        return true
      }
      return false
    },

    async register({ email, password, displayName, phone, citizenId }) {
      this.isLoading = true
      this.authError = null

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const firebaseUser = userCredential.user

        // สมัครได้เฉพาะ tenant เท่านั้น การเลื่อนสิทธิ์ทำโดย owner
        const userProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName,
          phone,
          citizenId,
          role: 'tenant',
          createdAt: new Date().toISOString()
        }

        await setDoc(doc(db, 'users', firebaseUser.uid), userProfile)
        await this._loadProfile(firebaseUser)
        return { success: true, user: this.currentUser }
      } catch (err) {
        console.error('Registration error:', err)
        this.authError = err.message
        return { success: false, error: err.message }
      } finally {
        this.isLoading = false
      }
    },

    async login(email, password) {
      this.isLoading = true
      this.authError = null

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        await this._loadProfile(userCredential.user)
        return { success: true, user: this.currentUser }
      } catch (err) {
        console.error('Login error:', err)
        this.authError = err.message
        return { success: false, error: err.message }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      profileLoadSeq++
      try {
        if (auth?.currentUser) {
          await signOut(auth)
        }
      } catch (err) {
        console.error('ออกจากระบบไม่สำเร็จ:', err)
      } finally {
        this.setUser(null)
      }
    }
  }
})
