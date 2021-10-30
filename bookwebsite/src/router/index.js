import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/welcome.component.vue'
import Ebooks from '../components/ebooks.component.vue'
import Contact from '../components/contact.component.vue'
import manageBooks from '../components/admin/manageBooks.component.vue'
import manageContacts from '../components/admin/manageContacts.component.vue'

import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    components: {
      default: Home,
    },
  },
  {
    path: '/about',
    name: 'About',
    components: {
      default: About,

    },
  },
  {
    path: '/Ebooks',
    name: 'Ebooks',
    components: {
      default: Ebooks,
    },
  },
  {
    path: '/Contact',
    name: 'Contact',
    components: {
      default: Contact,
    },
  },
  {
    path: '/manageBooks',
    name: 'manageBooks',
    components: {
      default: manageBooks,
    },
  },
  {
    path: '/manageContacts',
    name: 'manageContacts',
    components: {
      default: manageContacts,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/auth/login.component.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/auth/register.component.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router