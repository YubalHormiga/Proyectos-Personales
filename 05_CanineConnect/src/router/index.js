import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/informacion',
      name: 'information',

      component: () => import('../views/Information/InformationView.vue'),
      children:[
       { path: '/razas',
        name: 'breeds',
       
        component: () => import('../views/Information/BreddsView.vue')}
      ]
    }
  ]
})

export default router
