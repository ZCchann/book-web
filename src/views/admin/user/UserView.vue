<template>

  <div class="user-table">

    <div class="table-header">
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
    </div>

    <div class="table">
      <!-- 多选按钮 -->
      <el-table
          :data="userDataTable"
          border
          style="width: 100%"
          @selection-change="tableHandleSelectionChange"
          height="790px"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="authorityid" label="权限" :formatter="permissionsFormat"/>
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
  </div>
  <UserEdit
      :visible="formVisible"
      :dataID="dataId"
      :on-Success="getAllData"
      :button-Type="buttonType"
      :PermissionsList="PermissionsList"
      @update:visible="formVisible = $event"
  />
</template>

<script>
import {Delete, Plus, Search} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from 'element-plus'
import UserEdit from "./_edit.vue"
import {getAllUser, delUser, searchUserData, get_permissions_id_name} from "@/api";
import {getRuleNameById} from "@/utils/format";

export default {
  name: "UserView.vue",
  computed: {
    Delete() {
      return Delete
    },
    Plus() {
      return Plus
    },
    Search() {
      return Search
    }
  },
  components: {UserEdit},
  data() {
    return {
      userDataTable: [],
      dataId: undefined,
      formVisible: false,
      buttonType: "",//窗口状态
      searchInput: "", //搜索框文本
      SelectionList: [], //多选框列表
      PermissionsList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    permissionsFormat(row, column, value) {
      //权限名称清洗 将权限ID转换为权限名称
      return getRuleNameById(value, this.PermissionsList)
    },
    getData() {
      this.search()
    },
    getAllData() {
      getAllUser(this.page, this.pageSize).then(data => {
        this.userDataTable = data.data
        this.total = data.total
      })
    },
    tableHandleEdit(row) {
      this.formVisible = true;
      this.dataId = row.uuid;
      this.buttonType = "Edit";
    },
    handleDelete(row) {
      ElMessageBox.confirm(
          '确定要删除这个用户?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        delUser(row["uuid"]).then(() => {
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
    //表格头新建按钮
    tableHandleAdd() {
      this.formVisible = !this.formVisible;
      this.buttonType = "Add";
      this.dataId = undefined;
    },
    // 批量删除
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
          delUser(data[i].uuid);
        }
        this.getAllData();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
    },
    //搜索
    search() {
      if (this.searchInput === "") {
        this.getAllData()
      } else {
        searchUserData(this.searchInput, this.page, this.pageSize).then(
            (data) => {
              this.userDataTable = data.data;
              this.total = data.total;
            }
        )
      }
    },
    // 多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },
    getAllPermissions() {
      get_permissions_id_name().then(data => {
        this.PermissionsList = data.data
      })
    },
    // 更改每页显示数量触发事件
    footerSizeChange(val) {
      this.pageSize = val;
      this.getAllData();
    },
    // 点击页码触发事件
    footerCurrentChange(val) {
      this.page = val;
      this.getAllData();
    },
  },
  mounted() {
    this.getAllData()
    this.getAllPermissions()
  }

}
</script>

<style scoped>

</style>