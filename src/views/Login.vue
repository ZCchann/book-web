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
