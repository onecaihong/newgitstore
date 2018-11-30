import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	loginStatus: true,  // false:未登录 true：已登录
    loginPower: 1 // 1:管理员 0:普通用户
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
