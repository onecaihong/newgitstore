import App from './App'
import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login/login'
import SignMakerLogin from './views/login/SignMakerLogin'
import UserIndex from './views/User/Index'
import UserEdit from './views/User/Edit'
import UserDetail from './views/User/Detail'
import UserCreat from './views/User/Creat'

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
        {
            path:'/user',
            component: UserIndex
        },
        {
            path:'/user/edit',
            component: UserEdit
        },
        {
            path:'/user/detail',
            component: UserDetail
        },
        {
            path:'/user/creat',
            component: UserCreat
        },
    ]
}]
export default new Router({
    // mode: "history",
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});