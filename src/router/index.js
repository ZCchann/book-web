import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../components/home.vue'
import LoginView from '../views/Login.vue'
import AboutView from "@/views/about/AboutView.vue";
import {getStorage} from "@/utils/browser";
import store from "@/store";
import {getNav} from "@/api/getnav";

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        redirect: '/index', //定义一个跳转 访问"/"的时候直接跳转去/index
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: "首页",
                    isTrue: 1
                },
                component: () => import('../views/index/index.vue')
            },
            {
                path: '/personal',
                name: 'PersonalView',
                meta: {
                    title: "个人信息",
                    isTrue: 1
                },
                component: () => import('@/views/personal/PersonalView.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 处理动态引入组件函数

const getComponent = (data) => {
    data.map(item => {
        if (item.children) {
            item.children.forEach((i) => {
                let imp = i.component
                i.component = () => import (`@/views/${imp}`)
            })
        } else {
            let imp = item.component
            item.component.component = () => import (`@/views/${imp}`)
        }
    })
    return data
}

const RouterAdd = (data) => {
    let routers = JSON.parse(JSON.stringify(data))
    let routerList = getComponent(routers)
    // 先添加主路由 再添加404页面 避免刷新页面后404错误
    routerList.forEach((i) => {
        router.addRoute('home', i)
    })
    router.addRoute({
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../components/404.vue')
    })
    // menu的排序问题 目前看来是由路由的添加循序决定的 about先放这里 后续要想下怎么改
    router.addRoute("home",{
        path: '/about',
        name: 'about',
        meta: {
            title: "关于本系统",
            isTrue: 1
        },
        component: AboutView
    })
}

router.beforeEach(async (to, from, next) => {
    let user = getStorage("user") //测试  获取user是否存在
    if (!user) {
        // 若user不存在 强制跳转login页面
        if (to.path === "/login") {
            next()
        } else {
            next("/login")
        }
    } else {
        let r = router.getRoutes() //判断一下当前有几条路由
        let storeRouter = store.state.userInfo.routerList // 取出vuex中存储的路由
        if (storeRouter.length > 0) {
            if (r.length > 4) {
                //判断一下 如果vuex中有数据,并且路由已经加载过了 直接跳过
                next()
            } else {
                //说明是从登陆页面来的 加载一下路由
                RouterAdd(storeRouter)
                next({...to, replace: true})
            }
        } else {
            // 已经登录过 但是刷新了页面
            let uuid = getStorage("uuid")
            await getNav(uuid).then(data => {
                store.commit("set_routerList", data.data)
                RouterAdd(data.data)
            })
            next({...to, replace: true})
        }
    }
})

export default router
