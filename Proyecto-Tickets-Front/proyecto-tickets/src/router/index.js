import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tickets from '../views/Tickets/Tickets.vue'
import AgregarTickets from '../views/Tickets/AgregarTickets.vue'
import EditarTickets from '../views/Tickets/EditarTickets.vue'
import Personal from '../views/Personal/Personal.vue'
import AgregarPersona from '../views/Personal/AgregarPersona.vue'
import EditarPersona from '../views/Personal/EditarPersona.vue'
import Categorias from '../views/Categorias/Categorias.vue'
import AgregarCategoria from '../views/Categorias/AgregarCategoria.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets
  },
  {
    path: '/tickets/agregar',
    name: 'AgregarTickets',
    component: AgregarTickets
  },
  {
    path: '/tickets/editarTickets/:id',
    name: 'EditarTickets',
    component: EditarTickets
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/personal/agregar',
    name: 'AgregarPersona',
    component: AgregarPersona
  },
  {
    path: '/personal/editarPersona/:id',
    name: 'EditarPersona',
    component: EditarPersona
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: Categorias
  },
  {
    path: '/categorias/agregar',
    name: 'AgregarCategoria',
    component: AgregarCategoria
  },
]

const router = new VueRouter({
  routes
})

export default router
