<template>
  <div class="permission-table">

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
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="tableHandleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="id" label="权限组ID"/>
        <el-table-column prop="rulename" label="权限组名称"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="tableHandleEdit(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div class="drawer">
      <el-drawer
          v-model="drawer"
          :direction="direction"
      >
        <el-table :data="editData">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="data" label="数据管理" width="140"/>
          <el-table-column prop="order" label="订单管理" width="140"/>
          <el-table-column prop="permission" label="权限管理" width="140"/>
          <el-table-column prop="user" label="用户管理" width="140"/>

        </el-table>

      </el-drawer>
    </div>

  </div>
</template>

<script>
import { get_permissions_by_id, get_permissions_id_name} from "@/api";


export default {
  name: "permissions",
  data() {
    return {
      tableData: [],
      editData:[],
      dataId: undefined,
      drawer: false,
      direction: "rtl",

    }
  },
  methods: {
    getAllData() {
      get_permissions_id_name().then(data => {
        console.log(data.data)
        this.tableData = data.data
      })
    },
    tableHandleEdit(row) {
      this.dataId = row.id

      get_permissions_by_id(this.dataId).then(data => {
        this.drawer = true
        this.editData = [data.data]
      })

    }
  },
  mounted() {
    this.getAllData()
  }
}
</script>

<style scoped>

</style>