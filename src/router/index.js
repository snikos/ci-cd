import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    //beforeEnter: (to, from, next) => { next('/PageNotFound') },
    name: 'home',
    component: HomeView
  },
  {
    path: '/http',
    name: 'HttpStatusCodes',
    // route level code-splitting
    // this generates a separate chunk (http.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "http" */ '@/views/HttpStatusCodes.vue')
  },
  {
    path: '/start',
    name: 'StartPage',
    component: () => import('@/pages/StartPage')
  },
  {
    path: '/vueuse',
    name: 'VueUse',
    component: () => import('@/pages/VueUse')
  },
  {
    path: '/local-json',
    name: 'LocalJson',
    component: () => import('@/pages/LocalJson')
  },
  {
    path: '/git-bash',
    name: 'GitBash',
    component: () => import('@/pages/GitBash')
  },
  {
    path: '/migration-job',
    name: 'MigrationJobJson',
    component: () => import('@/pages/MigrationJobJson')
  },
  {
    path: '/irr-verbs',
    name: 'IrregularVerbs',
    component: () => import('@/pages/IrregularVerbs')
  },
  {
    path: '/shape-word',
    name: 'ShapeWordEn',
    component: () => import('@/pages/ShapeWordEn')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import('@/pages/PageNotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})

export default router
