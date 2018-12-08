import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store/store'
import router from './router'
// import VueAxios from 'vue-axios'
import global_ from './config/global'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
axios.defaults.withCredentials=true

// Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

