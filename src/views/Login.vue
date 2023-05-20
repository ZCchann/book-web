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
import {hexPassword} from "@/utils/hex";

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
          // 拷贝出来一下 然后密码拿去加密
          // 不拷贝的话 密码输错了 页面的密码栏里字符串会变很长
          let form = {
            username: '',
            password: ''
          }
          form.username = this.loginForm.username
          form.password = hexPassword(this.loginForm.password)
          login(form)
              .then(data => {
                setStorage('user', this.loginForm.username)
                setStorage('uuid', data.uuid)
                setStorage('jwt', data.jwt)
                store.dispatch("login").then(() => {
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
