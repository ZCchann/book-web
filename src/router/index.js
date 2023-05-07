import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../components/home.vue'
import LoginView from '../views/Login.vue'
import {getStorage} from "@/utils/browser";

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
            //     {
            //     {
            //         path: '/admin',
            //         name: 'adminMenu',
            //         meta: {title: "管理员菜单"},
            //         children: [
            //             {
            //                 path: '/alldata',
            //                 name: 'AllData',
            //                 meta: {
            //                     title: "数据管理"
            //                 },
            //                 component: () => import('@/views/admin/getbook/GetbookView.vue')
            //             },
            //             {
            //                 path: '/user',
            //                 name: 'User',
            //                 meta: {
            //                     title: "用户管理"
            //                 },
            //                 component: () => import('@/views/admin/user/UserView.vue')
            //             },
            //         ]
            //     },
            //     {
            //         path: '/order',
            //         name: 'orderMenu',
            //         meta: {title: "订单管理"},
            //         children: [
            //             {
            //                 path: '/neworder',
            //                 name: 'NewOrderView',
            //                 meta: {
            //                     title: "新增订单"
            //                 },
            //                 component: () => import('@/views/order/newOrder/newOrderView.vue')
            //             },
            //             {
            //                 path: '/orderlist',
            //                 name: 'OrderListView',
            //                 meta: {
            //                     title: "已下单"
            //                 },
            //                 component: () => import('@/views/order/OrderView.vue')
            //             },
            //
            //         ]
            //     },
            //     {
            //         path: '/personal',
            //         name: 'PersonalView',
            //         meta: {
            //             title: "个人信息",
            //         },
            //         component: () => import('@/views/personal/PersonalView.vue')
            //     },
            //
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

export const authRouter = [
// 模拟登陆时动态添加的路由表
    {
        path: '/admin',
        name: 'adminMenu',
        meta: {title: "管理员菜单"},
        children: [
            {
                path: '/alldata',
                name: 'AllData',
                meta: {
                    title: "数据管理"
                },
                component: () => import('@/views/admin/getbook/GetbookView.vue')
            },
            {
                path: '/user',
                name: 'User',
                meta: {
                    title: "用户管理"
                },
                component: () => import('@/views/admin/user/UserView.vue')
            },
        ]
    },
    {
        path: '/order',
        name: 'orderMenu',
        meta: {title: "订单管理"},
        children: [
            {
                path: '/neworder',
                name: 'NewOrderView',
                meta: {
                    title: "新增订单"
                },
                component: () => import('@/views/order/newOrder/newOrderView.vue')
            },
            {
                path: '/orderlist',
                name: 'OrderListView',
                meta: {
                    title: "已下单"
                },
                component: () => import('@/views/order/OrderView.vue')
            },

        ]
    },
    {
        path: '/personal',
        name: 'PersonalView',
        meta: {
            title: "个人信息",
        },
        component: () => import('@/views/personal/PersonalView.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log("index是否存在 ", router.hasRoute('Index')) //检查路由是否存在
    console.log("用户详情页是否存在 ", router.hasRoute('PersonalView')) //检查路由是否存在
    console.log("router: ", router.getRoutes())
    let user = getStorage("user") //测试  获取user是否存在
    if (!user) {
        // 若user不存在 强制跳转login页面
        if (to.path === "/login") {
            next()
        } else {
            next("/login")
        }
    } else {
        // 浏览器中已存在user 跳转至path的目标
        // todo: 有个bug需要修复 需要检测jwt token是否过期
        next()
    }
})

export default router
