import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由懒加载
const Login = ()=> import('../views/Login')
const Home = ()=> import('../views/Home')

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/home',
        component:Home
    }
]

const router = new Router({
    routes,
    mode:"history"
})

export default router