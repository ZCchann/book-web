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

      <!--   搜索框旁按钮   -->
      <el-col :span="6">
        <el-button type="primary" size="large" :icon="Plus" @click="tableHandleAdd">新增
        </el-button>
        <el-button type="danger" size="large" :icon="Delete" @click="tableHandleDelete">删除
        </el-button>
        <el-button type="success" size="large" :icon="DocumentAdd" @click="tableHandleImport">导入
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="large" :icon="Plus" @click="tableHandleSubmit">提交订单</el-button>
      </el-col>
    </el-row>
    <el-table
        :data="tableData"
        @selection-change="tableHandleSelectionChange"
        border
        style="width: 100%"
        height="790"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="isbn" label="ISBN" width="140"/>
      <el-table-column prop="tittle" label="书名"/>
      <el-table-column prop="price" label="标价" width="80"/>
      <el-table-column prop="press" label="出版社" width="120"/>
      <el-table-column prop="type" label="类型" width="120"/>
      <el-table-column prop="restriction" label="是否为限制级" width="120" :formatter="restrictionFormat"/>
      <el-table-column prop="author" label="作者" width="120"/>
      <el-table-column prop="publication_date" label="出版日" :formatter="formatterDate"/>
      <el-table-column label="数量">
        <template #default="scope">
          <el-input-number
              v-model="scope.row.amount"
              prop="scope.row.amount"
              :min="0"
              :max="99"
              :value-on-clear="0"

          />
        </template>
      </el-table-column>


      <el-table-column label="编辑">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

  <AddOrder
      :visible="AddVisible"
      :formatterDate="formatterDate"
      :restrictionFormat="restrictionFormat"
      @update:visible="AddVisible = $event"
      @update:orderDate="tableData = $event"
  />
  <Submit
      :visible="submitVisible"
      :formatterDate="formatterDate"
      :restrictionFormat="restrictionFormat"
      :orderDate="tableData"
      @update:visible="submitVisible = $event"
  />


</template>

<script>
import {searchData} from "@/api";
import {ElMessageBox} from 'element-plus'
import {Delete, DocumentAdd, Plus, Search} from "@element-plus/icons-vue";
import AddOrder from "./_add.vue";
import Submit from "./_submit.vue";
import {formatterDate, restrictionFormat} from "@/utils/format";


export default {
  name: "NewOrder",
  components: {AddOrder, Submit},
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
      tableData: [], //订单数据
      page: 1,
      currentPage: 1,
      pageSize: 10,
      dataId: undefined,
      searchInput: "", //搜索框文本
      AddVisible: false, // 新增/修改 窗口是否显示
      importVisible: false,
      submitVisible: false,
      buttonType: "",//窗口状态
      SelectionList: [], //多选框列表
      tempList: []
    }
  },
  methods: {
    restrictionFormat,
    formatterDate,
    getData() {
      this.search()
    },
    getAllData() {
      this.tableData = this.tempList
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
        this.tableData.splice(row.$index, 1)
      })
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
            let temp = []
            for (let x = 0; x < this.tableData.length; x++) {
              for (let i = 0; i < data.length; i++) {
                if (data[i] !== this.tableData[x]) {
                  temp.push(this.tableData[x])
                }
              }
            }
            this.tableData = temp;
          }
      )
    },

    search() {
      if (this.searchInput === "") {
        this.getAllData()
      } else {
        this.tempList = this.tableData
        searchData(this.searchInput, this.page, this.pageSize).then(
            (data) => {
              this.tableData = data.data;
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
    },
    tableHandleEdit(row) {
      this.AddVisible = !this.AddVisible;
      this.buttonType = "Edit";
      this.dataId = row.id
    },
    tableHandleSubmit() {
      //计算一下每一个书本数量*单价后的结果 加入数组中
      let data = this.tableData;
      for (let i = 0;i < data.length; i++) {
        data[i].total = data[i].price * data[i].amount;
      }
      this.submitVisible = !this.submitVisible;

    },
    //多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },
  },
  mounted() {
    this.getAllData()
  }


}
</script>

<style scoped></style>