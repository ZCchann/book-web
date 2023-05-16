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
        <el-table-column prop="rule_name" label="权限组名称"/>
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
          :before-close="handleClose"
          close-on-click-modal
          close-on-press-escape
      >
        <el-button
            type="primary"
            @click="treeSave"
        >
          保存
        </el-button>
        <el-tree
            :data="editData.permissions"
            :props="props"
            node-key="name"
            :default-checked-keys="default_checked_keys"
            show-checkbox
            @check-change="handleCheckChange"
        />
      </el-drawer>
    </div>

  </div>
</template>

<script>
import {get_permissions_by_id, get_permissions_id_name, update_permissions_by_id} from "@/api";
import {Delete, Plus, Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";


export default {
  name: "permissions",
  computed: {
    Search() {
      return Search
    },
    Plus() {
      return Plus
    },
    Delete() {
      return Delete
    }
  },
  data() {
    return {
      tableData: [],
      editData: null,
      default_checked_keys: [],
      dataId: undefined,
      drawer: false,
      direction: "rtl",
      props: {
        label: 'name',
      }
    }
  },
  methods: {
    getAllData() {
      get_permissions_id_name().then(data => {
        console.log("data.data",data.data)
        this.tableData = data.data
        console.log("all data ",this.tableData)
      })
      console.log("all data2 ",this.tableData)
    },
    tableHandleEdit(row) {
      this.dataId = row.id
      get_permissions_by_id(this.dataId).then(data => {
        this.drawer = true
        this.editData = data.data
        // 把为true的ID丢到列表中 页面会自动渲染为已勾选
        this.editData.permissions.forEach((i) => {
          if (i.state) {
            this.default_checked_keys.push(i.name)
          }
        })
      })
    },
    handleClose() {
      //关闭抽屉事件
      this.default_checked_keys = []
      this.drawer = false
    },
    tableHandleSelectionChange(val) {
      //多选框触发事件
      this.SelectionList = val;
    },
    handleCheckChange(data, checked) {
      //选择器 选中事件
      this.editData.permissions.forEach((i) => {
        if (i.name === data.name) {
          i.state = checked
        }
      })
    },
    treeSave() {
      update_permissions_by_id(this.editData).then(() => {
            ElMessage({
              type: 'success',
              message: '保存完成',
            });
            this.handleClose()
          }
      ).catch(data => {
        let errorMessage = data.data
            ElMessage({
              type: 'success',
              message: `保存失败, ${errorMessage}`,
            })
          }
      )

    }
  },
  mounted() {
    this.getAllData()
  }
}
</script>

<style scoped>

</style>