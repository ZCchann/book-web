import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../components/home.vue'
import LoginView from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {title: "首页"},
                component: () => import('../views/index/index.vue')
            },
            {
                path: '/alldata',
                name: 'AllData',
                meta: {
                    title: "数据管理"
                },
                component: () => import('../views/getbook/GetbookView.vue')
            },
            {
                path: '/user',
                name: 'User',
                meta: {
                    title: "用户管理"
                },
                component: () => import('@/views/user/UserView.vue')
            },
            {
                path: '/personal',
                name: 'PersonalView',
                meta: {
                    title: "个人信息"
                },
                component: () => import('@/views/personal/PersonalView.vue')
            },
            {
                path: '/orderlist',
                name: 'OrderListView',
                meta: {
                    title: "订单管理"
                },
                component: () => import('@/views/order/OrderView.vue')
            },
            {
                path: '/neworder',
                name: 'NewOrderView',
                meta: {
                    title: "新增订单"
                },
                component: () => import('@/views/order/newOrder/newOrderView.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: LoginView
    },
{
    path: '/:pathMatch(.*)*',
        name: 'NotFound',
    component: () => import('../components/404.vue')
}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
