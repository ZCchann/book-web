<template>
  <el-dialog v-model="drawer" width="50%" draggable @close="dialogClose">
    <el-row>
      <el-upload
          action="/"
          :auto-upload="false"
          :show-file-list="false"
          :on-success="handleChange"
          accept=".xls, .xlsx"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>

    </el-row>

    <el-button type="success" @click="submit">提交</el-button>
    <el-button type="info" @click="dialogClose">取消</el-button>
  </el-dialog>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "importForm",
  props: {
    visible: Boolean,
    buttonType: String,
    onSuccess:Function
  },
  data(){
    return{
      drawer: false,
      fileList:[],
      tableHead: [], //表头
      tableData: [] // 表数据
    }
  },

  methods:{
    submit() {

    },
    dialogClose() {
      // this.$refs.form.resetFields();
      this.$emit('update:visible', false);
    },
    handleChange( file, fileList) {
      this.$confirm().then(()=> {
        this.fileData = file
        console.log(file)
        console.log(this.fileData)

      })

    },
  },
  watch: {
    visible(val) {
      this.drawer = val;
    }
  }
}
</script>

<style scoped>

</style>