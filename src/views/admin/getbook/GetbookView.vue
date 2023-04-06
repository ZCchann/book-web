<template>
  <div class="table">
    <el-row>
      <el-col :span="5">
        <!--   搜索框     -->
        <el-input type="text" v-model="searchInput" class="w-50 m-2" size="large" placeholder="请输入书名"
                  :prefix-icon="Search" @keyup.enter="search">
          <!--  搜索按钮-->
          <template #append>
            <el-button :icon="Search" @click="search"/>
          </template>

        </el-input>
      </el-col>

      <el-col :span="6">
        <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="To"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="large"
            value-format="X"
        />

      </el-col>
      <!--   搜索框旁按钮   -->
      <el-col :span="6">
        <el-button type="primary" size="large" :icon="Plus" @click="tableHandleAdd">新增
        </el-button>
        <el-button type="danger" size="large" :icon="Delete" @click="tableHandleDelete">删除
        </el-button>
        <el-button type="success" size="large" :icon="DocumentAdd" @click="tableHandleImport">导入
        </el-button>
      </el-col>


    </el-row>
    <el-table :data="tableData" @selection-change="tableHandleSelectionChange" border style="width: 100%" height="790">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="isbn" label="ISBN" width="140"/>
      <el-table-column prop="tittle" label="书名"/>
      <el-table-column prop="price" label="标价" width="80"/>
      <el-table-column prop="press" label="出版社" width="120" sortable/>
      <el-table-column prop="type" label="类型" width="120" sortable/>
      <el-table-column prop="restriction" label="是否为限制级" width="120" :formatter="restrictionFormat"/>
      <el-table-column prop="author" label="作者" width="120"/>
      <el-table-column prop="publication_date" label="出版日" :formatter="formatterDate" sortable>
      </el-table-column>
      <el-table-column label="编辑">
        <template #default="scope">
          <el-button size="small" @click="tableHandleEdit(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

  <div class="pagination-block">
    <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize"
                   :page-sizes="[10, 20, 50, 100]" :background="background"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total" @size-change="footerSizeChange" @current-change="footerCurrentChange"/>
  </div>

  <GetBookEdit
      :visible="AddVisible"
      :button-Type="buttonType"
      :on-Success="getData"
      :data-ID="dataId"
      @update:visible="AddVisible = $event"/>
  <importForm
      :visible="importVisible"
      :on-Success="getData"
      @update:visible="importVisible = $event"/>
  />
</template>

<script>
import {getAllData, delData, searchData} from "@/api";
import {ElMessage, ElMessageBox} from 'element-plus'
import {Delete, DocumentAdd, Plus, Search} from "@element-plus/icons-vue";
import GetBookEdit from "@/views/admin/getbook/_edit.vue";
import ImportForm from "@/views/admin/getbook/_import.vue";
import {formatterDate, restrictionFormat} from "@/utils/format";


export default {
  name: "getbook",
  components: {ImportForm, GetBookEdit},
  computed: {
    DocumentAdd() {
      return DocumentAdd
    },
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
      time: [],
      tableData: [],
      page: 1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dataId: undefined,
      searchInput: "", //搜索框文本
      AddVisible: false, // 新增/修改 窗口是否显示
      importVisible: false,
      buttonType: "",//窗口状态
      SelectionList: [] //多选框列表
    }
  },
  methods: {
    restrictionFormat,
    formatterDate,
    getData() {
      this.search()
    },
    getAllData() {
      getAllData(this.page, this.pageSize).then(data => {
        this.tableData = data.data;
        this.total = data.total;
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
        delData(row["id"]).then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          });
          //用于触发页面刷新
          this.getAllData();
        })
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
      this.page = val;
      this.getAllData();
    },
    // 更改每页显示数量触发事件
    footerSizeChange(val) {
      this.pageSize = val;
      this.getAllData();
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
          // todo: 需要更改请求方式 更改为发送数组 然后在返回的then里面刷新页面
          delData(data[i].id);
        }
        this.getAllData();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
    },

    search() {
      let start;
      let end;
      //一个bug 日期选择器清空时 V-model会变为null 需要重新赋值
      if (this.time == null) {
        this.time = undefined
      }
      if (this.time !== undefined) {
        start = this.time[0]
        end = this.time[1]
      }

      if (this.searchInput === "") {
        this.getAllData()
      } else {
        searchData(this.searchInput, this.page, this.pageSize, start, end).then(
            (data) => {
              this.tableData = data.data;
              this.total = data.total;
            }
        )
      }
    },

    tableHandleAdd() {
      this.AddVisible = !this.AddVisible;
      this.buttonType = "Add";
      this.dataId = undefined;
    },
    tableHandleImport() {
      this.importVisible = !this.importVisible;
      // this.buttonType = "Add";
      // this.dataId = undefined;
    },
    tableHandleEdit(row) {
      this.AddVisible = !this.AddVisible;
      this.buttonType = "Edit";
      this.dataId = row.id
    },
    // 多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },
  },
  mounted() {
    this.getAllData()

  },

  watch: {
    page() {
      this.getAllData()
    },

  },


}
</script>

<style scoped></style>