import Vue from 'vue'
import VueRouter from 'vue-router'
import AddJob from '../views/Addjob.vue'
import JobList from '../views/Joblist.vue'
import EditJob from '../views/Editjob.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/addjob',
    name: 'Addjob',
    component: AddJob
  },
  {
    path: '/',
    name: 'Joblist',
    component: JobList
  },
  {
    path: '/editjob/:id',
    name: 'Editjob',
    component: EditJob
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
