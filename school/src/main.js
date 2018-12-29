// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'reset-css'
import './assets/css/index.less'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Flexible from '@/utils/adaptation/flexible'
import S_Storage from '@/utils/storage/session_storage'
import Vuelidate from 'vuelidate'
import axios from './axios'

Vue.use(Vuelidate)
Vue.use(VueAwesomeSwiper)
const url='http://localhost:3004/';


Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>',
});