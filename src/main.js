// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import VueMeta from 'vue-meta'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)
Vue.use(VueMeta)
Vue.use(Croppa)
/* eslint-disable no-new */

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
