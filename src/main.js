// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import 'font-awesome/css/font-awesome.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.prototype.$cookies = VueCookies


import moment from 'moment'

Vue.prototype.$moment = moment

import axios from 'axios'
Vue.prototype.$constants = {
  auth: 'Authorization',
  token: 'AUTHO_TOKEN'
}
Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'

let headers = axios.defaults.headers
if (Vue.prototype.$cookies.isKey(Vue.prototype.$constants.token)) {
  headers[Vue.prototype.$constants.auth] = Vue.prototype.$cookies.get(Vue.prototype.$constants.token)
}

axios.interceptors.response.use(res => {
  if (!res.data)
    return res
  if (!res.data || !res.data.code || res.data.code != 401)
    return res
  console.log('=========未获取到身份认证========')
  if (Vue.prototype.$cookies.isKey(Vue.prototype.$constants.token)) {
    Vue.prototype.$cookies.remove(Vue.prototype.$constants.token)
  }
  location.reload()
  return Promise.reject(res)
})
Vue.prototype.$webpackConfig = require('../package.json')
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
