<template>
  <el-dialog v-model="drawer" :title="buttonType" width="50%" draggable @close="dialogClose">


    <el-form ref="form" :model="form" :inline="true" label-position="right" label-suffix=":" label-width="120px">

      <el-form-item label="用户名" prop="username">
        <!--   todo:后续更改为 管理员可更改username     -->
        <el-input v-model="form.username"/>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]">
        <el-input v-model="form.email"/>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password/>
      </el-form-item>
      <el-button type="primary" @click="generateRandomString">生成随机密码</el-button>
      <el-form-item label="权限">
        <el-select v-model="form.permissions" class="m-2" placeholder="Select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="submit">提交</el-button>
    <el-button type="info" @click="dialogClose">取消</el-button>
  </el-dialog>
</template>

<script>
import {getOneUserData, addUser, editUser} from "@/api";
import {ElMessage} from "element-plus";

export default {
  name: "UserEdit",
  props: {
    visible: Boolean,
    buttonType: String,
    dataID: {
      type: String,
      default: undefined
    },
    onSuccess: Function,
    PermissionsList:Array
  },
  data() {
    return {
      drawer: false,
      form: {
        username: "",
        password: "",
        email: "",
        permissions:0
      },
      resetPassword: false,
      options:[]
    }
  },
  methods: {
    handleSuccess() {
      if (this.onSuccess) {
        this.onSuccess()
      }
      this.dialogClose()
    },
    getInfo(dataID) {
      getOneUserData(dataID).then(({data}) => {
            this.form = data;
          }
      )
    },
    //关闭当前页面
    dialogClose() {
      this.$refs.form.resetFields()
      this.options = []
      this.$emit('update:visible', false)

    },
    submit() {
      if (this.buttonType === "Add") {
        addUser(this.form).then(() => {
              ElMessage({
                type: 'success',
                message: '提交成功',
              })
              this.handleSuccess()
            }
        )
      } else {
        editUser(this.form).then(() => {
              ElMessage({
                type: 'success',
                message: '更改成功',
              })
              this.handleSuccess();
            }
        )
      }
    },
    generateRandomString() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.form.password = result;
    },
    toOptions() {
      this.PermissionsList.forEach((i) => {
        this.options.push({
          value:i.id,
          label:i.rule_name
        })
      })
    }
  },
  watch: {
    visible(val) {
      this.drawer = val;
      if (val && this.dataID) {
        this.getInfo(this.dataID)
      }
      this.toOptions()
    }
  }
}
</script>

<style scoped></style>