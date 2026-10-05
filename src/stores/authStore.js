import { defineStore } from 'pinia'
import { auth, db } from '../firebase/config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { authErrorMessage, REDIRECT_FALLBACK_CODES } from '../utils/authErrors'

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
    isGoogleLoading: false,
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

    /**
     * สร้าง users/{uid} ครั้งแรกเท่านั้น ถ้ามีอยู่แล้วไม่เขียนทับ (โดยเฉพาะ role)
     * role เป็น 'tenant' เสมอ ไม่รับค่าจากภายนอก การเลื่อนสิทธิ์ทำโดย owner
     * ถ้าสร้างไม่สำเร็จจะ signOut ไม่ปล่อยให้ค้างในสถานะล็อกอินแต่ไม่มีโปรไฟล์
     * @param {'google' | 'password'} provider
     */
    async ensureUserProfile(firebaseUser, provider, { displayName, phone, citizenId } = {}) {
      const userRef = doc(db, 'users', firebaseUser.uid)
      try {
        const existing = await getDoc(userRef)
        if (existing.exists()) return

        await setDoc(userRef, {
          uid: firebaseUser.uid,
          displayName: displayName ?? firebaseUser.displayName ?? '',
          email: firebaseUser.email ?? '',
          photoURL: firebaseUser.photoURL ?? null,
          phone: phone ?? '',
          citizenId: citizenId ?? '',
          role: 'tenant',
          provider,
          createdAt: serverTimestamp()
        })
      } catch (err) {
        console.error('สร้างข้อมูลผู้ใช้ไม่สำเร็จ:', err)
        profileLoadSeq++
        await signOut(auth).catch(() => {})
        this.setUser(null)
        const error = new Error('Profile creation failed')
        error.code = 'app/profile-create-failed'
        throw error
      }
    },

    async register({ email, password, displayName, phone, citizenId }) {
      this.isLoading = true
      this.authError = null

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const firebaseUser = userCredential.user

        await this.ensureUserProfile(firebaseUser, 'password', { displayName, phone, citizenId })
        await this._loadProfile(firebaseUser)
        return { success: true, user: this.currentUser }
      } catch (err) {
        const message = authErrorMessage(err, 'เกิดข้อผิดพลาดในการสมัครสมาชิก')
        this.authError = message
        return { success: false, error: message }
      } finally {
        this.isLoading = false
      }
    },

    /**
     * เข้าสู่ระบบด้วย Google
     * ใช้ popup เป็นหลัก แม้บนมือถือ เพราะ redirect ต้องอ่าน cookie ของ authDomain
     * (xxx.firebaseapp.com) ข้ามโดเมน ซึ่งเบราว์เซอร์รุ่นใหม่ (Safari, Chrome ที่บล็อก
     * third-party cookie) มักบล็อก ทำให้กลับมาจาก Google แล้วไม่ได้ล็อกอิน
     * ถ้า authDomain ไม่ตรงกับโดเมนที่ host แอป redirect จะใช้ไม่ได้ จึงใช้เป็นทางสำรองเท่านั้น
     * เมื่อ popup ถูกบล็อกหรือใช้ไม่ได้ในสภาพแวดล้อมนั้น
     * ถ้าตอนนี้เป็น anonymous อยู่ จะล็อกอิน Google ทับไปเลย (ไม่ link กับ anonymous)
     */
    async loginWithGoogle() {
      this.isGoogleLoading = true
      this.authError = null

      const provider = new GoogleAuthProvider()
      // ให้เลือกบัญชีทุกครั้ง เผื่อเครื่องเดียวมีหลายบัญชี Google
      provider.setCustomParameters({ prompt: 'select_account' })

      try {
        let userCredential
        try {
          userCredential = await signInWithPopup(auth, provider)
        } catch (err) {
          if (!REDIRECT_FALLBACK_CODES.includes(err.code)) throw err
          // ผลลัพธ์จะถูกจับโดย completeRedirectSignIn() ตอนหน้าโหลดใหม่
          await signInWithRedirect(auth, provider)
          return { success: false, redirecting: true, error: authErrorMessage(err) }
        }

        await this.ensureUserProfile(userCredential.user, 'google')
        await this._loadProfile(userCredential.user)
        return { success: true, user: this.currentUser }
      } catch (err) {
        const message = authErrorMessage(err)
        this.authError = message || null
        return { success: false, error: message }
      } finally {
        this.isGoogleLoading = false
      }
    },

    /**
     * เรียกครั้งเดียวตอนเริ่มแอป เพื่อจับผล (หรือ error) ของ signInWithRedirect
     * คืน null ถ้าไม่ได้มาจาก redirect
     */
    async completeRedirectSignIn() {
      if (!auth) return null
      try {
        const userCredential = await getRedirectResult(auth)
        if (!userCredential) return null
        await this.ensureUserProfile(userCredential.user, 'google')
        await this._loadProfile(userCredential.user)
        return { success: true, user: this.currentUser }
      } catch (err) {
        const message = authErrorMessage(err)
        return message ? { success: false, error: message } : null
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
        const message = authErrorMessage(err)
        this.authError = message
        return { success: false, error: message }
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
