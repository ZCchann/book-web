<template>
  <el-dialog v-model="drawer" width="50%" draggable @close="dialogClose">
    <el-form ref="form" :model="form" :inline="true" label-position="right" label-suffix=":" label-width="120px">
      <el-form-item prop="isbn" label="ISBN">
        <el-input v-model="form.isbn" />
      </el-form-item>

      <el-form-item prop="tittle" label="书名">
        <el-input v-model="form.tittle" />
      </el-form-item>

      <el-form-item prop="price" label="标价">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item prop="press" label="出版社">
        <el-input v-model="form.press" />
      </el-form-item>
      <el-form-item prop="type" label="类型">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item prop="restriction" label="是否为限制级">
        <el-select
            v-model="form.restriction"
            placeholder="Select"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
<!--        <el-input v-model="form.restriction" />-->
      </el-form-item>
      <el-form-item prop="author" label="作者">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item prop="publication_date" label="出版日">
        <el-date-picker
        v-model="form.publication_date"
        type="date"
        placeholder="Pick a day"
        size="large"
        format="YYYY-MM-DD"
        value-format="X"
        />
      </el-form-item>

    </el-form>

    <el-button type="success" @click="submit">提交</el-button>
    <el-button type="info" @click="dialogClose">取消</el-button>
  </el-dialog>
</template>

<script>

import { addData, editData, getData } from "@/api";
import { ElMessage } from "element-plus";

export default {
  name: "GetBookEdit",
  props: {
    visible: Boolean,
    buttonType: String,
    dataID: {
      type: Number,
      default: undefined
    },
    onSuccess:Function
  },
  emits: ["update:visible"],
  data() {
    return {
      drawer: false,
      form: {
        id: 0,
        isbn: "",
        tittle: "",
        price: 0,
        press: "",
        type: "",
        restriction: 0,
        author: "",
        publication_date: ""
      },
      type: "",
      options : [{
        value:0,
        label:"否"
      },{
        value:1,
        label:"是"
      }]
    }
  },
  methods: {
    getInfo(dataId) {
      getData(dataId).then(({ data }) => {
        this.form = data;
      })
    },
    //关闭当前页面
    dialogClose() {
      this.$refs.form.resetFields();
      this.$emit('update:visible', false);
    },
    submit() {
      this.form.id = Number(this.form.id)
      this.form.price = Number(this.form.price)
      this.form.restriction = Number(this.form.restriction)
      console.log(this.form)
      if (this.buttonType === "Add") {
        addData(this.form).then(() => {
          ElMessage({
            type: 'success',
            message: '提交成功',
          })
          this.onSuccess();
        }
        )
      } else {
        editData(this.form).then(() => {
          ElMessage({
            type: 'success',
            message: '更改成功',
          })
          this.onSuccess();
        }
        )
      }
      // todo: 执行顺序问题 刷新页面在提交前面
      this.$emit('update:visible', false);
      this.$refs.form.resetFields();
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