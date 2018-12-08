import App from './App'
import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login/login'
import SignMakerLogin from './views/login/SignMakerLogin'
import UserIndex from './views/User/Index'
import UserEdit from './views/User/Edit'
import UserDetail from './views/User/Detail'
import UserCreat from './views/User/Creat'
import SignMaker from './views/SignMaker/Index'
import SignMakerEdit from './views/SignMaker/Edit'
import SignMakerCreat from './views/SignMaker/Creat'
import SignMakerDetail from './views/SignMaker/Detail'
import InfoLog from './views/InfoLog'
import ProduceSignCreate from './views/ProduceSign/Create'
import ProduceSignRestore from './views/ProduceSign/Restore'
import ProduceSignVerify from './views/ProduceSign/Verify'

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
        {
            path:'/signmaker',
            component: SignMaker
        },
        {
            path:'/signmaker/edit',
            component: SignMakerEdit
        },
        {
            path:'/signmaker/creat',
            component: SignMakerCreat
        },
        {
            path:'/signmaker/detail',
            component: SignMakerDetail
        },
        {
            path:'/infolog',
            component: InfoLog
        },
        {
            path:'/ProduceSign/Create',
            component: ProduceSignCreate
        },
        {
            path:'/ProduceSign/Verify',
            component: ProduceSignVerify
        },
        {
            path:'/ProduceSign/Restore',
            component: ProduceSignRestore
        },
    ]
}]
export default new Router({
    // mode: "history",
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});