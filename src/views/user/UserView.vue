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
      <el-table
          :data="userDataTable"
          border
          style="width: 100%"
          @selection-change="tableHandleSelectionChange"

      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column label="编辑">
          <template #default="scope">
            <el-button size="small" @click="tableHandleEdit(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
  <UserEdit
      :visible="formVisible"
      @update:visible="formVisible = $event"
  />
</template>

<script>
import {Delete, Plus, Search} from "@element-plus/icons-vue";
import UserEdit from "./_edit.vue"
import {getAllUser} from "@/api";
import {ref} from "vue";

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
      total: 0,
      page: 1,
      currentpage: 1,
      pageSize: 10,
      formVisible: false,
      searchInput: ref(''), //搜索框文本
      SelectionList: [] //多选框列表

    }
  },
  methods: {
    getAllUserData(page, pageSize) {
      getAllUser(page, pageSize).then(data => {
        this.userDataTable = data.data
        this.total = data.total
      })
    },
    tableHandleEdit(row) {

    },
    handleDelete(row) {

    },
    tableHandleAdd() {
      this.formVisible = !this.formVisible;
    },
    tableHandleDelete() {

    },
    search() {

    },
    // 多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },

  },
  mounted() {
    this.getAllUserData(this.page, this.pageSize)
  }

}
</script>

<style scoped>

</style>