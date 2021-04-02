import Vue from 'vue'
import VueRouter from 'vue-router'
import AddJob from '../views/Addjob.vue'
import JobList from '../views/Joblist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/addjob',
    name: 'Addjob',
    component: AddJob
  },
  {
    path: '/joblist',
    name: 'Joblist',
    component: JobList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
