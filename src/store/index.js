import {createStore} from 'vuex'
import router from "@/router";
import {getNav} from "@/api/getnav";
import {getStorage} from "@/utils/browser";


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
        reset_userInfo(state) {
            state.userInfo = {
                routerList: []
            }
        }

    },
    actions: {
        routerInit({commit}) {
            commit(
                'add_route'
            )
        },
        login({commit}) {
            return new Promise((resolve) => {
                // 存储路由表到vuex
                let uuid = getStorage("uuid")
                getNav(uuid).then(data => {
                    commit("set_routerList", data.data)
                    resolve()
                })

            })
        },
        logout({commit, state}) {
            return new Promise((resolve) => {
                //拷贝一下
                const delRouterList = JSON.parse(
                    JSON.stringify(state.userInfo.routerList)
                )
                // //删除添加的路由，如果路由是多层的 递归下。。
                delRouterList.forEach((route) => {
                    router.removeRoute(route.name)
                })

                router.removeRoute("NotFound") //因为404是动态添加的 这里需要多删一个404
                router.removeRoute("about") // about也是动态加的 这里也要删掉一下
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
    // plugins: [createPersistedState()] //加载vuex持久化插件 实现刷新页面路由不丢失
})
