// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'reset-css'
import './assets/css/index.less'
import router from './router/router'
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import iscrollView from 'vue-iscroll-view'
import iscroll from 'iscroll'
import Flexible from '@/utils/adaptation/flexible'
Vue.use(VueAwesomeSwiper)
Vue.use(iscrollView, iscroll)
axios.defaults.baseURL = 'http://localhost:3004/'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
