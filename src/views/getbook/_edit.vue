<template>

  <el-dialog
      v-model="drawer"
      titel="新增"
      width="50%"
  >

    <el-form
        ref="form"
        :model="form"
        :inline="true"
        label-position="right"
        label-suffix=":"
        label-width="120px"
    >
      <el-form-item label="ISBN">
        <el-input v-model="form.isbn"/>
      </el-form-item>

      <el-form-item label="书名">
        <el-input v-model="form.tittle"/>
      </el-form-item>

      <el-form-item label="标价">
        <el-input v-model="form.price"/>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="form.type"/>
      </el-form-item>
      <el-form-item label="是否为限制级">
        <el-input v-model="form.restriction"/>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"/>
      </el-form-item>
      <el-form-item label="出版日">
        <el-input v-model="form.publication_date"/>
      </el-form-item>

    </el-form>

    <el-button type="success" @click="submit">提交</el-button>
    <el-button type="info" @click="dialogClose">取消</el-button>
  </el-dialog>


</template>

<script>

import {editData, getData} from "@/api";
import {ElMessage} from "element-plus";

export default {
  name: "GetBookEdit",
  props: {
    visible: Boolean,
    dataID: {
      type: String,
      default: undefined
    }
  },
  emits: ["update:visible"],
  data() {
    return {
      drawer: false,
      form: {
        isbn: "",
        tittle: "",
        price: 0,
        press: "",
        type: "",
        restriction: 0,
        author: "",
        publication_date: ""
      }
    }
  },
  methods: {
    getInfo() {
      getData(this.dataID).then(({data}) => {
        this.form = data[0]
      })
    },
    dialogClose() {
      this.$emit('update:visible', false);
    },
    submit() {
      this.form.price = Number(this.form.price)
      this.form.restriction = Number(this.form.restriction)
      editData(this.form).then(() => {
            ElMessage({
              type: 'success',
              message: '更改成功',
            })
          }
      )

      this.$emit('update:visible', false);

    }
  },
  watch: {
    visible(val) {
      this.drawer = val;
      if (val && this.dataID) {
        this.getInfo()
      }
    }
  }
}

</script>