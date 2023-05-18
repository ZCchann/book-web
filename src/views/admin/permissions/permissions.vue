<template>
  <div class="permission-table">

    <div class="table-header">
      <el-row>
<!--    偷懒了暂时不想做搜索框了 有需求了下次再写= =    -->
<!--        <el-col :span="5">-->
<!--          &lt;!&ndash;   搜索框     &ndash;&gt;-->
<!--          <el-input-->
<!--              type="text"-->
<!--              v-model="searchInput"-->
<!--              class="w-50 m-2"-->
<!--              size="large"-->
<!--              placeholder="Please Input"-->
<!--              :prefix-icon="Search"-->
<!--              @keyup.enter="search"-->
<!--          >-->
<!--            &lt;!&ndash;  搜索按钮&ndash;&gt;-->
<!--            <template #append>-->
<!--              <el-button-->
<!--                  :icon="Search"-->
<!--                  @click="search"-->
<!--              />-->
<!--            </template>-->

<!--          </el-input>-->
<!--        </el-col>-->

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
            <el-button size="small" type="danger" @click="tableDeleteButton(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div class="edit-drawer">
      <el-drawer
          v-model="edit_drawer"
          :direction="direction"
          :before-close="editClose"
          close-on-click-modal
          close-on-press-escape
      >
        <el-input v-model="editData.rule_name" placeholder="请输入权限名称" clearable/>

        <el-tree
            :data="editData.permissions"
            :props="props"
            node-key="name"
            :default-checked-keys="default_checked_keys"
            show-checkbox
            @check-change="handleCheckChange"
        />

        <el-button
            type="primary"
            @click="editSaveButton"
        >
          保存
        </el-button>
      </el-drawer>
    </div>

    <div class="add-drawer">
      <el-drawer
          v-model="add_drawer"
          :direction="direction"
          :before-close="addClose"
          close-on-click-modal
          close-on-press-escape
      >
        <el-input v-model="editData.rule_name" placeholder="请输入权限名称" clearable/>

        <el-tree
            :data="editData.permissions"
            :props="props"
            node-key="name"
            :default-checked-keys="default_checked_keys"
            show-checkbox
            @check-change="handleCheckChange"
        />
        <el-button
            type="primary"
            @click="addSaveButton"
        >
          保存
        </el-button>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  add_permissions_by_id, del_permissions_by_id,
  get_permissions_by_id,
  get_permissions_demo,
  get_permissions_id_name, searchUserData,
  update_permissions_by_id
} from "@/api";
import {Delete, Plus, Search} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";


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
      edit_drawer: false, // 编辑菜单的抽屉状态
      add_drawer: false, // 添加菜单的抽屉状态
      direction: "rtl",
      input_text: "", //添加页面的输入框文本
      props: {
        label: 'name',
      },
      SelectionList: [],
      searchInput:""
    }
  },
  methods: {
    getAllData() {
      get_permissions_id_name().then(data => {
        this.tableData = data.data
      })
    },
    tableHandleEdit(row) {
      this.dataId = row.id
      get_permissions_by_id(this.dataId).then(data => {
        this.edit_drawer = !this.edit_drawer
        this.editData = data.data
        // 把为true的ID丢到列表中 页面会自动渲染为已勾选
        this.editData.permissions.forEach((i) => {
          if (i.state) {
            this.default_checked_keys.push(i.name)
          }
        })
      })
    },
    editClose() {
      //关闭抽屉事件
      this.default_checked_keys = []
      this.input_text = ""
      this.edit_drawer = false
    },
    addClose() {
      //关闭抽屉事件
      this.default_checked_keys = []
      this.input_text = ""
      this.add_drawer = false
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
    editSaveButton() {
      //编辑菜单保存按钮
      update_permissions_by_id(this.editData).then(() => {
            ElMessage({
              type: 'success',
              message: '保存完成',
            });
            this.editClose()
          }
      ).catch(data => {
            let errorMessage = data.data
            ElMessage({
              type: 'success',
              message: `保存失败, ${errorMessage}`,
            })
            this.editClose()
          }
      )
    },
    addSaveButton() {
      // 新增菜单保存按钮
      add_permissions_by_id(this.editData).then(() => {
            ElMessage({
              type: 'success',
              message: '添加完成',
            });
            this.addClose()
            this.getAllData()
          }
      ).catch(data => {
            let errorMessage = data.data
            ElMessage({
              type: 'success',
              message: `添加失败, ${errorMessage}`,
            })
            this.addClose()
          }
      )
    },

    tableHandleAdd() {
      // 搜索框旁添加按钮
      get_permissions_demo().then(data => {
        this.editData = data.data
        this.add_drawer = true
      })
    },
    tableDeleteButton(row) {
      ElMessageBox.confirm(
          '确定要删除这条数据?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        //表格内删除按钮
        let resData = [row] //给单个数据套个数组 匹配API接口数据格式
        del_permissions_by_id(resData).then(() => {
          ElMessage({
            type: 'success',
            message: '删除完成',
          })
          this.getAllData()
        }).catch(data => {
          ElMessage({
            type: 'error',
            message: `删除失败, ${data.message}`,
          })
          this.getAllData()
        })
      })

    },
    tableHandleDelete() {
      // 搜索框删除按钮
      ElMessageBox.confirm(
          '确定要删除这些数据?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        del_permissions_by_id(this.SelectionList).then(() => {
          ElMessage({
            type: 'success',
            message: '删除完成',
          })
          this.getAllData()
        }).catch(data => {
          ElMessage({
            type: 'error',
            message: `删除失败, ${data.message}`,
          })
          this.getAllData()
        })
      })

    },
  },
  mounted() {
    this.getAllData()
  }
}
</script>

<style scoped>

</style>