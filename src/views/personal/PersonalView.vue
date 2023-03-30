<template>

  <el-form :model="form" label-width="120px">
    <el-col :span="8">
      <el-form-item label="用户名">
        <el-input v-model="form.username"/>
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="密码">
        <el-input
            type="password"
            show-password
            placeholder="请输入密码"
            v-model="form.password"/>
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-button @click="save">保存</el-button>
    </el-col>

  </el-form>
</template>

<script>
import {editUser, getOneUserData} from "@/api";
import {getStorage} from "@/utils/browser";
import {ElMessage} from "element-plus";

export default {
  name: "PersonalView",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: ""
      }
    }
  },
  methods: {
    getData() {
      let uuid = getStorage('uuid');
      getOneUserData(uuid).then(({data}) => {
        this.form = data
      })
    },
    save() {
      editUser(this.form).then(() => {
            ElMessage({
              type: 'success',
              message: '保存成功',
            })
            this.handleSuccess();
          }
      )
    }

  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>