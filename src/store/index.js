import {createStore} from 'vuex'

export default createStore({
    state: {
        userInfo: {
            // username: "",
            // uuid: "",
            // jwt: "",
            routerList:[]
        }
    },
    getters: {
        // getuserInfo(state) {
        //     return state.userInfo
        // }
    },
    mutations: {
        // set_username(state, val) {
        //     state.userInfo.username = val;
        // }
    },
    actions: {},
    modules: {}
})
