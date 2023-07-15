<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <div class="_import">
      <div class="upload-button">
        <el-col :span="1">
          <el-upload
              ref="upload"
              :action="uploadUrl"
              :headers="headerObj"
              :on-success="onUpload"
              :limit="1"
          >
            <el-button slot="trigger" size="large" type="primary">上传Excel文件</el-button>
            <el-button slot="trigger" size="large" type="primary" @click="downloadDemo">下载demo文件</el-button>
          </el-upload>
        </el-col>
      </div>

      <div class="book-data-table">
        <el-table :data="tableData" border style="width: 100%" height="600">
          <el-table-column prop="isbn" label="ISBN" width="140"/>
          <el-table-column prop="title" label="书名"/>
          <el-table-column prop="price" label="标价" width="80"/>
          <el-table-column prop="press" label="出版社" width="120"/>
          <el-table-column prop="type" label="类型" width="120"/>
          <el-table-column prop="restriction" label="是否为限制级" width="120"/>
          <el-table-column prop="author" label="作者" width="120"/>
          <el-table-column prop="publication_date" label="出版日" :formatter="formatterDate"/>
        </el-table>
      </div>
    </div>

    <el-button type="success" @click="submit">提交</el-button>
    <el-button type="info" @click="dialogClose">取消</el-button>
  </el-dialog>
</template>


<script>
import {addData} from "@/api";
import {ElMessage} from "element-plus";
import {getStorage} from "@/utils/browser";
import {formatterDate} from "@/utils/format";

export default {
  name: "importForm",
  props: {
    visible: Boolean,
    buttonType: String,
    onSuccess: Function
  },
  data() {
    return {
      drawer: false,
      tableData: [],
      headerObj: {
        Authorization: getStorage('jwt')
      },
      uploadUrl: process.env.VUE_APP_BASE_API + "/book/fileUpdate"
    }
  },

  methods: {
    formatterDate, // 日期格式化
    downloadDemo() {
      window.location.href = "/file/demo.xlsx";
    },
    onUpload(UploadFile) {
      this.tableData = UploadFile.data;
      this.$refs.upload.clearFiles();
    },
    // 多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },
    submit() {
      let n = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        addData(this.tableData[i])
        n += 1;
      }
      ElMessage({
        type: 'success',
        message: n + '条数据 提交成功',
      })
      this.onSuccess();
      this.$emit('update:visible', false);

    },
    // 关闭窗口
    dialogClose() {
      this.tableData.splice(0, this.tableData.length);
      this.onSuccess();
      this.$emit('update:visible', false);
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