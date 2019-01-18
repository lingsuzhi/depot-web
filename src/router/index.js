import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/view/Login'
import Main from '@/view/Main'
import Dashboard from '@/view/Dashboard'

let routes = [{
  path: '/Login',
  component: Login,
  hidden: true
}, {
  path: '/',
  component: Main,
  hidden: true,
  redirect: '/index',
  children: [{
    path: '/index',
    component: Dashboard,
    name: '首页'
  }]
}]


import {
  Router as OperateRouter
} from './operate'

OperateRouter.forEach(item => routes.push(item))

import {
  Router as ProductRouter
} from './product'

ProductRouter.forEach(item => routes.push(item))

const router = new Router({
  routes: routes,
})

router.beforeEach((to, from, next) => {
  let that = Vue.prototype
  /*
   if (that.$cookies.isKey(that.$constants.token) && to.path == '/login') {
     next({
       path: '/'
     })
     return
   }
   */
  if (!that.$cookies.isKey(that.$constants.token) && to.path != '/login') {
    next({
      path: '/login'
    })
    return
  }
  let getAdmin = ''
  let getMenu = ''
  if (sessionStorage.menuList) {
    getMenu = JSON.parse(sessionStorage.menuList).id
  }
  if (sessionStorage.user) {
    getAdmin = JSON.parse(sessionStorage.user).admin
  }
  if (to.path != '/login' && to.path != '/index' && !getAdmin && getMenu.indexOf(to.path) < 0) {
    return next({
      path: '/index'
    })
  }
  next()
})

export default router
