import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
// import getters from './getters'

Vue.use(Vuex)

const state = {
	loginStatus: false,  // false:未登录 true：已登录
	loginPower: 0, // 0:管理员 1:普通用户
	makerCertSN:null,
	ValidateCode:null
}

export default new Vuex.Store({
	strict: true,
	state,
	mutations
})
