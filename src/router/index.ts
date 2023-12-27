import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CviceniView from '../views/CviceniView.vue'
import PrehledView from '@/views/PrehledView.vue'
import AddExerciseView from '@/views/AddExerciseView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
