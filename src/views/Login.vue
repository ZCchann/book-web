<template>
  <el-card header="login" style="min-width: 370px; width: 30%; margin-top: 10%; margin-left: 35%">
    <el-form ref="loginForm" :model="loginForm" label-position="right" label-width="80px" label-suffix=":">
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="loginForm.username"/>
      </el-form-item>

      <el-form-item label="密码" prop="password" required>
        <el-input v-model="loginForm.password" type="password" autocomplete="off"/>
        <span v-show="errMsg" style="color: red">{{ errMsg }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {login} from "@/api";
import {setStorage} from "@/utils/browser";
import store from "@/store";

export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      errMsg: undefined,
    }
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.loginForm)
              .then(data => {
                setStorage('user', this.loginForm.username)
                setStorage('uuid', data.uuid)
                setStorage('jwt', data.jwt)
                // store.commit("set_username", this.loginForm.username)
                // this.$router.addRoute("home", {
                //   path: '/personal',
                //   name: 'PersonalView',
                //   meta: {
                //     title: "个人信息",
                //   },
                //   component: () => import('@/views/personal/PersonalView.vue')
                // })
                // // this.$router.addRoute("home", )
                // this.$router.addRoute("home", {
                //           path: '/admin',
                //           name: 'adminMenu',
                //           meta: {title: "管理员菜单"},
                //           children: [
                //               {
                //                   path: '/alldata',
                //                   name: 'AllData',
                //                   meta: {
                //                       title: "数据管理"
                //                   },
                //                   component: () => import('@/views/admin/getbook/GetbookView.vue')
                //               },
                //               {
                //                   path: '/user',
                //                   name: 'User',
                //                   meta: {
                //                       title: "用户管理"
                //                   },
                //                   component: () => import('@/views/admin/user/UserView.vue')
                //               },
                //           ]
                //       },)
                store.dispatch("login").then(() => {
                  console.log("登陆跳转")
                  // router.push({ path: "/home" })
                  this.$router.replace("/index")
                })
              })
              .catch(data => {
                this.errMsg = data.response.data
              })
        }
      })
    }
  }
}
</script>
