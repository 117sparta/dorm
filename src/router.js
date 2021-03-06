import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: login
    },
    {
      path: '/SQInterface',
      name: 'SQInterface',
      component: () => import('@/views/SQFiles/studentQuery')
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/visitorInfo',
      name: 'visitorInfo',
      component: () => import('@/views/visitorInfo/visitorRecord')
    },
    {
      path: '/manager',
      name: 'manager',
      component: () => import('@/views/manager'),
      children: [
        {
          path: 'checkInManager',
          name: 'checkInManager',
          component: () => import('@/views/manager/checkInManager')
        },
        {
          path: 'studentManager',
          name: 'studentManager',
          component: () => import('@/views/manager/studentManager')
        },
        {
          path: 'dormManager',
          name: 'dormManager',
          component: () => import('@/views/manager/dormManager')
        }
      ]
    }
  ]
})
