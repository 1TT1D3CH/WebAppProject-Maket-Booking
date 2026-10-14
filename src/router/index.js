import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/LoginView.vue'),
    meta: { guestOnly: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isReallyLoggedIn = authStore.isAuthenticated && authStore.currentUser?.provider != null

  if (to.meta.requiresAuth && !isReallyLoggedIn) {
    // Not logged in → redirect to login
    next({ name: 'login' })
  } else if (to.meta.guestOnly && isReallyLoggedIn) {
    // Already logged in → redirect to home
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
