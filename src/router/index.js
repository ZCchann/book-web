import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../components/home.vue'
import LoginView from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta:{title:"首页"},
        children: [
            {
                path: '/index',
                name: 'Index',

                component: () => import('../views/index/index.vue')
            },
            {
                path: '/alldata',
                name: 'AllData',
                meta: {
                    title: "数据管理"
                },
                component: () => import('../views/getbook/GetbookView.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: LoginView
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
