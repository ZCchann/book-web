import {createStore} from 'vuex'
import router, {authRouter} from "@/router";

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
        add_route() {
            console.log("路由添加前", router.getRoutes())
            if (router.getRoutes().length === 5) {
                authRouter.forEach((i) => {
                    console.log("添加路由", i)
                    router.addRoute('home', i)
                })
            }
            console.log("路由添加后", router.getRoutes())
        },
        reset_userInfo(state) {
            state.userInfo = {
                // username: "",
                // uuid: "",
                // jwt: "",
                routerList: []
            }
        }

    },
    actions: {
        login({commit}) {
            return new Promise((resolve) => {
                // 存储路由表到vuex
                commit("set_routerList", authRouter)
                resolve()
            })
        },
        logout() {

        },
        //添加路由
        addRoute({commit}) {
            commit("add_route")
        },
        delRoute({commit}) {
            commit("reset_userInfo")
        }
    },
    modules: {}
})
