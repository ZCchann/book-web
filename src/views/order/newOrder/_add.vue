<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <el-row :gutter="22">
      <el-col :span="20">
        <!--   搜索框     -->
        <el-input type="text" v-model="searchInput" class="w-50 m-2" size="large" placeholder="请输入书名"
                  :prefix-icon="Search" @keyup.enter="search">
          <!--  搜索按钮-->
          <template #append>
            <el-button :icon="Search" @click="search"/>

          </template>

        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button
            :icon="Plus"
            type="primary"
            @click="tableHandAdd"
            size="large"
        > 批量添加
        </el-button>
      </el-col>
    </el-row>


    <el-table
        :data="tableData"
        @selection-change="tableHandleSelectionChange"
        border
        style="width: 100%"
        height="790"
        ref="multipleTable"
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

      <el-table-column label="单条添加">
        <template #default="scope">
          <el-button size="small" @click="tableHandleAdd(scope.row)" type="primary">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-block">
      <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize"
                     :page-sizes="[10, 20, 50, 100]" :background="background"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total" @size-change="footerSizeChange" @current-change="footerCurrentChange"/>
    </div>
  </el-dialog>
</template>

<script>
import {Plus, Search} from "@element-plus/icons-vue";
import {getAllData, searchData} from "@/api";

export default {
  name: "_add",
  computed: {
    Plus() {
      return Plus
    },
    Search() {
      return Search
    }
  },
  props: {
    visible: Boolean,
    formatterDate: Function,
    restrictionFormat: Function,
  },
  data() {
    return {
      drawer: false,
      searchInput: "",
      tableData: [],  // 表格内的图书数据
      SelectionList: [],  // 选择器勾选的数据
      orderList: [],  // 返回去主页面的数据
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    getAllData() {
      getAllData(this.page, this.pageSize).then(data => {
        this.tableData = data.data;
        this.total = data.total;
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

    //表格内的添加按钮
    tableHandleAdd(data) {
      let check = this.orderList.includes(data)
      if (!check) {
        data.amount = 1
        this.orderList.push(data)
        this.$emit("update:orderDate", this.orderList)
      }
    },

    dialogClose() {
      this.SelectionList = []
      this.$refs.multipleTable.clearSelection()
      this.$emit('update:visible', false);
    },
    search() {
      if (this.searchInput === "") {
        this.getAllData()
      } else {
        searchData(this.searchInput, this.page, this.pageSize).then(
            (data) => {
              this.tableData = data.data;
              this.total = data.total;
            }
        )
      }
    },
    // 多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },
    //批量添加按钮
    tableHandAdd() {
      for (let i = 0; i < this.SelectionList.length; i++) {
        let check = this.orderList.includes(this.SelectionList[i])
        if (!check) {
          this.SelectionList[i].amount = 1;
          this.orderList.push(this.SelectionList[i]);
        }
      }
      this.$emit("update:orderDate", this.orderList);
    }
  },
  mounted() {
    this.getAllData()

  },
  watch: {
    visible(val) {
      this.drawer = val;
      console.log(this.SelectionList)
    }
  }
}
</script>

<style scoped>

</style>