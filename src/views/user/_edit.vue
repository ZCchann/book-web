<template>
  <el-dialog
      v-model="drawer"
      width="50%"
      draggable
      @close="dialogClose"
  >

    <el-form
        ref="form"
        :model="form"
        :inline="true"
        label-position="left"
        label-suffix=":"
        label-width="120px"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>

    </el-form>

    <el-button type="success" @click="submit">提交</el-button>
    <el-button type="info" @click="dialogClose">取消</el-button>
  </el-dialog>

</template>

<script>
import {getOneUserData} from "@/api";
import {ElMessage} from "element-plus";

export default {
  name: "UserEdit",
  props: {
    visible: Boolean,
    dataID:{
      type:String,
      default: undefined
    }
  },
  data() {
    return {
      drawer: false,
      form: {
        username:"",
        password:"",
        email:""
      },
      buttonType:""
    }
  },
  methods: {
    getInfo() {
      getOneUserData(this.dataID).then(
        ({data}) => this.form = data[0]
      )
    },
    //关闭当前页面
    dialogClose() {
      this.$emit('update:visible', false);
    },
    submit() {
      if (this.buttonType === "Add") {
        addData(this.form).then(() => {
              ElMessage({
                type: 'success',
                message: '提交成功',
              })
            }
        )
      } else {
        editData(this.form).then(() => {
              ElMessage({
                type: 'success',
                message: '更改成功',
              })
            }
        )
      }
      console.log("start ",this.checkType)
      this.$emit('update:visible', false);
      this.$emit('update:checkType', !this.checkType);
      console.log("end ",this.checkType)
    }
  },
  watch:{
    visible(val) {
      this.drawer = val;
      this.getInfo()
    }
  }
}
</script>

<style scoped>

</style>