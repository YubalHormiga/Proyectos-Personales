import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookingsLayout from '../views/bookings/BookingsLayout.vue'
import AuthAPI from '../api/AuthAPI.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservas',
      name: 'bookings',
      component: BookingsLayout,
      meta: { requieresAuth: true },
      children: [
        {
          path: '',
          name: 'my-bookings',
          component: () => import('../views/bookings/myBookingsView.vue')
        },
        {
          path: 'nueva',
          component: () => import('../views/bookings/NewBookingLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-booking',
              component: () => import('../views/bookings/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'booking-details',
              component: () => import('../views/bookings/BookingView.vue')
            },
          ]
        },
        {
          path:':id/editar',
          component: ()=> import('../views/bookings/EditBookingLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-booking',
              component: () => import('../views/bookings/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'edit-booking-details',
              component: () => import('../views/bookings/BookingView.vue')
            },
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayaout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
      ]
    }
  ]
})

router.beforeEach(async (to, front, next) => {
  const requieresAuth = to.matched.some(url => url.meta.requieresAuth)
  if (requieresAuth) {
    try {
      await AuthAPI.auth()
      next()
    } catch (error) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
