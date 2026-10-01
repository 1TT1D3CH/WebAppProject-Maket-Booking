import { defineStore } from 'pinia'
import { auth, db, isRealFirebaseConfigured } from '../firebase/config'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const DEMO_USERS = {
  owner: {
    uid: 'demo-owner-001',
    email: 'owner@market.com',
    displayName: 'คุณวิชัย (เจ้าของตลาด Walking Street)',
    role: 'owner',
    phone: '081-999-8888',
    citizenId: '1100200300401'
  },
  admin: {
    uid: 'demo-admin-001',
    email: 'admin@market.com',
    displayName: 'คุณสมชาย (ผู้ดูแลระบบผังตลาด)',
    role: 'admin',
    phone: '082-777-6666',
    citizenId: '1100200300402'
  },
  tenant: {
    uid: 'demo-tenant-001',
    email: 'tenant@market.com',
    displayName: 'คุณสมพงษ์ (พ่อค้าชาไข่มุก)',
    role: 'tenant',
    phone: '083-555-4444',
    citizenId: '1100200300403'
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const savedUser = localStorage.getItem('auth_user')
    return {
      currentUser: savedUser ? JSON.parse(savedUser) : DEMO_USERS.tenant, // Default to demo tenant for immediate usability
      isAuthenticated: true,
      isLoading: false,
      authError: null
    }
  },

  getters: {
    userRole: (state) => state.currentUser?.role || 'tenant',
    isOwner: (state) => state.currentUser?.role === 'owner',
    isAdmin: (state) => state.currentUser?.role === 'admin' || state.currentUser?.role === 'owner',
    isTenant: (state) => state.currentUser?.role === 'tenant',
    userName: (state) => state.currentUser?.displayName || state.currentUser?.email || 'ผู้ใช้งานทั่วไป'
  },

  actions: {
    setUser(user) {
      this.currentUser = user
      this.isAuthenticated = !!user
      if (user) {
        localStorage.setItem('auth_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('auth_user')
      }
    },

    // Demo Mode Quick Switcher for instant testing of all 3 Roles
    switchDemoRole(role) {
      if (DEMO_USERS[role]) {
        this.setUser(DEMO_USERS[role])
        return true
      }
      return false
    },

    async register({ email, password, displayName, phone, citizenId, role = 'tenant' }) {
      this.isLoading = true
      this.authError = null

      try {
        if (isRealFirebaseConfigured && auth) {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user

          const userProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName,
            phone,
            citizenId,
            role,
            createdAt: new Date().toISOString()
          }

          if (db) {
            await setDoc(doc(db, 'users', firebaseUser.uid), userProfile)
          }

          this.setUser(userProfile)
          return { success: true, user: userProfile }
        } else {
          // Local Mode Fallback
          const mockUser = {
            uid: `local-${Date.now()}`,
            email,
            displayName,
            phone,
            citizenId,
            role,
            createdAt: new Date().toISOString()
          }
          this.setUser(mockUser)
          return { success: true, user: mockUser }
        }
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
        if (isRealFirebaseConfigured && auth) {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const firebaseUser = userCredential.user

          let userProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || email.split('@')[0],
            role: 'tenant'
          }

          if (db) {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
            if (userDoc.exists()) {
              userProfile = { ...userProfile, ...userDoc.data() }
            }
          }

          this.setUser(userProfile)
          return { success: true, user: userProfile }
        } else {
          // Local Mode Fallback login matching demo accounts
          const foundKey = Object.keys(DEMO_USERS).find(
            k => DEMO_USERS[k].email.toLowerCase() === email.toLowerCase()
          )
          const userProfile = foundKey ? DEMO_USERS[foundKey] : {
            uid: `local-${Date.now()}`,
            email,
            displayName: email.split('@')[0],
            role: 'tenant'
          }
          this.setUser(userProfile)
          return { success: true, user: userProfile }
        }
      } catch (err) {
        console.error('Login error:', err)
        this.authError = err.message
        return { success: false, error: err.message }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        if (isRealFirebaseConfigured && auth) {
          await signOut(auth)
        }
      } catch (err) {
        console.warn('Signout notice:', err)
      } finally {
        this.setUser(null)
      }
    }
  }
})
