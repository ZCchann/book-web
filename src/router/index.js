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
                path: '/admin',
                name: 'adminMenu',
                meta: {title: "管理员菜单"},
                children:[
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

// router.beforeEach(async (to, from, next) => {
//     if (store && store.state.nav.length === 0) {
//         let res = await getNav();
//         let routerData = addr(res.data);
//         router.addRoute(routerData);
//
//         await store.dispatch('SETNAV', res.data)
//         next({...to})
//     } else {
//         next()
//     }
//
// })
//
// function addr(navData) {
//     navData.forEach(v => {
//         routes[0].children.push({
//             path: v.path,
//             name: v.name,
//             meta: {title: v.title},
//             component: () => import('@/views/' + v.component)
//         })
//     })
//
//
//     return router;
// }

export default router
