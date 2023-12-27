import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CviceniView from '../views/CviceniView.vue'
import PrehledView from '@/views/PrehledView.vue'
import AddExerciseView from '@/views/AddExerciseView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addExercise',
      name: 'addExercise',
      component: AddExerciseView
    },
    {
      path: '/prehled',
      name: 'prehled',
      component: PrehledView
    },
    {
      path: '/cviceni',
      name: 'cviceni',
      component: CviceniView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
