import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    //beforeEnter: (to, from, next) => { next('/PageNotFound') },
    name: 'home',
    meta: {
      title: 'Home Page',
    },
    component: HomeView
  },
  {
    path: '/http',
    name: 'HttpStatusCodes',
    meta: {
      title: 'Http Status Codes | Table',
    },
    // route level code-splitting
    // this generates a separate chunk (http.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "http" */ '@/views/HttpStatusCodes.vue')
  },
  {
    path: '/start',
    name: 'StartPage',
    meta: {
      title: 'CiCd',
    },
    component: () => import('@/pages/StartPage')
  },
  {
    path: '/vueuse',
    name: 'VueUse',
    meta: {
      title: 'VueUse',
    },
    component: () => import('@/pages/VueUse')
  },
  {
    path: '/local-json',
    name: 'LocalJson',
    meta: {
      title: 'Local Json',
    },
    component: () => import('@/pages/LocalJson')
  },
  {
    path: '/git-bash',
    name: 'GitBash',
    meta: {
      title: 'Git Bash',
    },
    component: () => import('@/pages/GitBash')
  },
  {
    path: '/nvm',
    name: 'NvmWindows',
    meta: {
      title: 'Nvm for Windows',
    },
    component: () => import('@/pages/Nvm')
  },
  {
    path: '/migration-job',
    name: 'MigrationJobJson',
    meta: {
      title: 'Migration Job',
    },
    component: () => import('@/pages/MigrationJobJson')
  },
  {
    path: '/irr-verbs',
    name: 'IrregularVerbs',
    meta: {
      title: 'Irregular Verbs | English',
    },
    component: () => import('@/pages/IrregularVerbs')
  },
  {
    path: '/shape-word',
    name: 'ShapeWordEn',
    meta: {
      title: 'Shape Words',
    },
    component: () => import('@/pages/ShapeWordEn')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    meta: {
      title: 'dead end',
    },
    component: () => import('@/pages/PageNotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

export default router
