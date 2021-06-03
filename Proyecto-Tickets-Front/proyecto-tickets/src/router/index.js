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
    component: () => import('../views/Personal/Personal.vue')
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('../views/Categorias.vue')
  },
  {
    path: '/personal/agregar',
    name: 'AgregarPersona',
    component: () => import('../views/Personal/AgregarPersona.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
