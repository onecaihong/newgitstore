import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

// Vue.use(VueRouter)
// const router = new VueRouter({
// 	routes,
	
// })

// new Vue({
// 	router,
// }).$mount('#app')
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// let vm = new Vue({
//   el: '#app',
//   router,
//   render (createElement) {
//     return createElement(App)
//   }
// })

// Vue.use({
//   vm
// })