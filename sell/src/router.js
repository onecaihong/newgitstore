import App from './App'
import Vue from 'vue'
import Router from 'vue-router'

import Login from './page/login/login'
import SignMakerLogin from './page/login/SignMakerLogin'

Vue.use(Router)

export const constantRouterMap =[{
    path:'/',
    component:App,
    children: [
        {
            path:'',
            redirect:'/login'
        },
        {
            path:'/login',
            component: Login
        },
        {
            path:'/signMakerLogin',
            component: SignMakerLogin
        },
    ]
}]
export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});