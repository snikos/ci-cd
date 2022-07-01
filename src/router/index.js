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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/start',
    name: 'StartPage',
    component: () => import('@/pages/StartPage')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/AdminPage')
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
    path: '/mongolia',
    name: 'MongoliaJson',
    component: () => import('@/pages/MongoliaJson')
  },
  {
    path: '/irr-verbs',
    name: 'IrregularVerbs',
    component: () => import('@/pages/IrregularVerbs')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import('@/pages/PageNotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
