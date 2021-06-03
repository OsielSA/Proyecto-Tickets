import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "about" */ '../views/Personal.vue')
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import(/* webpackChunkName: "about" */ '../views/Categorias.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
