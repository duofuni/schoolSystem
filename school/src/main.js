// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'reset-css'
import './assets/css/index.less'
import router from './router/router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Flexible from '@/utils/adaptation/flexible'
import S_Storage from '@/utils/storage/session_storage'
import Vuelidate from 'vuelidate'

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
})

axios.interceptors.request.use(
  (config) => {
    const x_access_token = sessionStorage.getItem('x_access_token');
    if (x_access_token) { // 有token时
      config.headers['x_access_token'] = x_access_token; // 给请求头加token
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status == 401) { // 没有token
      sessionStorage.removeItem('x_access_token');
      console.log(res.msg);
      vm.$router.push('/login');
    } else {
      return response.data
    }
  },
  error => {
    const {status} = error.response|| {}
    switch (+status) {
      case 401:
        sessionStorage.removeItem('x_access_token');
        return vm.$router.push('/login');
      default:
        Promise.reject(error)
    }
  }
);
