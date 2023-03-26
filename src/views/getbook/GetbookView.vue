<template>


  <div class="table">
    <el-row>
      <el-col :span="5">
        <!--   搜索框     -->
        <el-input
            type="text"
            v-model="searchInput"
            class="w-50 m-2"
            size="large"
            placeholder="Please Input"
            :prefix-icon="Search"
            @keyup.enter="search"
        >
          <!--  搜索按钮-->
          <template #append>
            <el-button
                :icon="Search"
                @click="search"
            />
          </template>

        </el-input>
      </el-col>

      <!--   搜索框旁按钮   -->
      <el-col :span="4">
        <el-button
            type="primary"
            size="large"
            :icon="Plus"
            @click="tableHandleAdd"
        >新增
        </el-button>
        <el-button
            type="danger"
            size="large"
            :icon="Delete"
            @click="tableHandleDelete"
        >删除
        </el-button>
      </el-col>

    </el-row>
    <el-table
        :data="tableData"
        @selection-change="tableHandleSelectionChange"
        border style="width: 100%"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="isbn" label="ISBN" width="140"/>
      <el-table-column prop="tittle" label="书名"/>
      <el-table-column prop="price" label="标价" width="80"/>
      <el-table-column prop="press" label="出版社" width="120"/>
      <el-table-column prop="type" label="类型" width="120"/>
      <el-table-column prop="restriction" label="是否为限制级" width="120"/>
      <el-table-column prop="author" label="作者" width="120"/>
      <el-table-column prop="publication_date" label="出版日"/>
      <el-table-column label="编辑">
        <template #default="scope">
          <el-button size="small" @click="tableHandleEdit(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

  <div class="demo-pagination-block">
    <el-pagination background v-model:current-page="currentpage" v-model:page-size="pageSize"
                   :page-sizes="[10, 20, 50, 100]" :background="background"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total" @size-change="footerSizeChange" @current-change="footerCurrentChange"/>
  </div>

  <GetBookEdit
      :visible="formVisible"
      :BookData="compData"
      :buttonType="buttonType"
      @update:visible="formVisible = $event"
      @update:checkType="checkType = $event"
  />


</template>

<script>
import {getAllData, delData} from "@/api";
import {ElMessage, ElMessageBox} from 'element-plus'
import {Delete, Plus, Search} from "@element-plus/icons-vue";
import GetBookEdit from "@/views/getbook/_edit.vue"
import bookData from "@/class/bookdata"
import {ref} from 'vue'

export default {
  name: "getbook",
  components: {GetBookEdit},
  computed: {
    Plus() {
      return Plus
    },
    Delete() {
      return Delete
    },
    Search() {
      return Search
    }

  },
  data() {
    return {
      tableData: [],
      page: 1,
      currentpage: 1,
      pageSize: 10,
      total: 0,
      searchInput: ref(''), //搜索框文本
      formVisible: false,
      compData: undefined,
      checkType: false, //点击提交后刷新页面
      buttonType: "",//窗口状态
      SelectionList: [] //多选框列表
    }
  },
  methods: {
    getData(page, pageSize) {
      getAllData(page, pageSize).then(data => {
        this.tableData = data.data
        this.total = data.total
      })
    },
    handleDelete(row) {
      ElMessageBox.confirm(
          '确定要删除这条数据?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        delData(row["id"])
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
        this.total = this.total - 1 //用于触发页面刷新
      })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
    },

    // 点击页码触发事件
    footerCurrentChange(val) {
      this.page = val
    },
    // 更改每页显示数量触发事件
    footerSizeChange(val) {
      this.pageSize = val;
    },

    tableHandleDelete() {
      let data = this.SelectionList;
      ElMessageBox.confirm(
          '确定要删除这些数据?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        for (let i = 0; i < data.length; i++) {
          delData(data[i].id)
        }
        this.total = this.total - 1 //触发页面刷新
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
    },

    search() {
      console.log(this.searchInput);
    },

    tableHandleAdd() {
      this.formVisible = !this.formVisible;
      this.compData = bookData;
      this.buttonType = "Add";
    },
    tableHandleEdit(row) {
      this.formVisible = !this.formVisible;
      this.buttonType = "Edit";
      this.compData = row;
    },
    // 多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },

  },
  mounted() {
    this.getData(this.page, this.pageSize)
  },
  watch: {
    page() {
      this.getData(this.page, this.pageSize)
    },
    pageSize() {
      this.getData(this.page, this.pageSize)
    },
    total() {
      this.getData(this.page, this.pageSize)
    },
    checkType() {
      this.getData(this.page, this.pageSize)
    }
  }


}
</script>

<style scoped>

</style>