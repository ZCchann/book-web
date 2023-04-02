<template>
  <el-dialog v-model="drawer" width="50%" draggable @close="dialogClose">

    <el-form ref="form" :model="addressForm" label-width="120px">
      <el-col :span="12">
        <el-form-item prop="name"
                      label="收件人"
                      :rules="[{
              required: true,
              message: '请输入收件人',
              trigger: 'blur',
            }]">
          <el-input v-model=" addressForm.name" required/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="telephone"
                      label="电话"
                      :rules="[{
              required: true,
              message: '请输入电话',
              trigger: 'blur',
            }]">
          <el-input v-model=" addressForm.telephone" required/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="address" label="详细地址" :rules="[{
              required: true,
              message: '请输入详细地址',
              trigger: 'blur',
            }] ">
          <el-input v-model="addressForm.address"/>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
import {getUserAddress, updateUserAddress} from "@/api";
import {ElMessage} from "element-plus";

export default {
  name: "Personal_edit_View",
  props: {
    visible: Boolean,
    dataID: {
      type: Number,
      default: undefined
    },
    onSuccess: Function
  },
  data() {
    return {
      drawer: false,
      addressForm: {
        address_id: undefined,
        name: "", //收件人
        address: "",  //地址
        telephone: "" //收件电话
      },
    }
  },
  methods: {
    //关闭当前页面
    dialogClose() {
      this.$refs.form.resetFields();
      this.$emit('update:visible', false);
    },
    submit() {
      updateUserAddress(this.addressForm).then(() => {
        ElMessage({
          type: 'success',
          message: '提交成功',
        })
        this.$refs.form.resetFields();
        this.onSuccess();
        this.$emit('update:visible', false);
      })
    },
    getInfo(dataID) {
      getUserAddress(dataID).then(({data}) => {
        this.addressForm = data;
      })
    }
  },
  watch: {
    visible(val) {
      this.drawer = val;
      if (val && this.dataID) {
        this.getInfo(this.dataID)
      }
    }
  }
}
</script>

<style scoped>

</style>