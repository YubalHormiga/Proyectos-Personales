import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookingsLayout from '../views/bookings/BookingsLayout.vue'

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
      children: [
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
              component: () => import('../views/bookings/BokkingView.vue')
            }

          ]
        }
      ]
    },
    {
      path:'/auth',
      name: 'auth',
      component: ()=>import('../views/auth/AuthLayaout.vue'),
      children:[
        {
          path:'registro',
          name: 'register',
          component: ()=>import('../views/auth/RegisterView.vue'),
        },
        {
          path:'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: ()=>import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path:'login',
          name: 'login',
          component: ()=>import('../views/auth/LoginView.vue'),
        },
      ]
    }
  ]
})

export default router
