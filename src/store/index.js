import {createStore} from 'vuex'
import router, {authRouter} from "@/router";
import {getNav} from "@/api/getnav";
import createPersistedState from 'vuex-persistedstate'


export default createStore({
    state: {
        userInfo: {
            routerList: []
        }
    },
    getters: {
        getuserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        set_routerList(state, val) {
            state.userInfo.routerList = val;
        },
        add_route(status) {
            const getComponent = (data) => {
                data.map(item => {
                    if (item.children) {
                        item.children.forEach((i) => {
                            let imp = i.component
                            i.component = () => import (`@/views/${imp}`)
                        })
                    }else{
                        let imp = item.component
                        item.component.component = () => import (`@/views/${imp}`)
                    }
                })
                return data
            }

            console.log("路由添加前", router.getRoutes())
            if (router.getRoutes().length === 5) {
                let routers = JSON.parse(JSON.stringify(status.userInfo.routerList))
                let routerList = getComponent(routers)
                routerList.forEach((i) => {
                    router.addRoute('home', i)
                })
            }
            console.log("路由添加后", router.getRoutes())
        },
        reset_userInfo(state) {
            state.userInfo = {
                routerList: []
            }
        }

    },
    actions: {
        login({commit}) {
            return new Promise((resolve) => {
                // 存储路由表到vuex
                getNav().then(data => {
                    console.log(data.data)
                    // let routers = JSON.parse(JSON.stringify(data))
                    commit("set_routerList", data.data)
                    resolve()
                })

            })
        },
        logout({ commit, state }) {
            return new Promise((resolve) => {
                //拷贝一下
                const delRouterList = JSON.parse(
                    JSON.stringify(state.userInfo.routerList)
                )
                //删除添加的路由，如果路由是多层的 递归下。。
                delRouterList.forEach((route) => {
                    router.removeRoute(route.name)
                })
                //删除路由
                commit("set_routerList", {
                    routerList: []
                })
                resolve("注销 success， 清空路由，用户信息")
            })
        },
        //添加路由
        addRoute({commit}) {
            commit("add_route")
        },
        delRoute({commit}) {
            commit("reset_userInfo")
        }
    },
    modules: {},
    plugins: [createPersistedState()] //加载vuex持久化插件 实现刷新页面路由不丢失
})
