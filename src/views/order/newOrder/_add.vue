<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <el-col :span="22">
      <!--   搜索框     -->
      <el-input type="text" v-model="searchInput" class="w-50 m-2" size="large" placeholder="请输入书名"
                :prefix-icon="Search" @keyup.enter="search">
        <!--  搜索按钮-->
        <template #append>
          <el-button :icon="Search" @click="search"/>
        </template>

      </el-input>
    </el-col>

    <el-table :data="tableData" @selection-change="tableHandleSelectionChange" border style="width: 100%" height="790">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="isbn" label="ISBN" width="140"/>
      <el-table-column prop="tittle" label="书名"/>
      <el-table-column prop="price" label="标价" width="80"/>
      <el-table-column prop="press" label="出版社" width="120"/>
      <el-table-column prop="type" label="类型" width="120"/>
      <el-table-column prop="restriction" label="是否为限制级" width="120" :formatter="restrictionFormat"/>
      <el-table-column prop="author" label="作者" width="120"/>
      <el-table-column prop="publication_date" label="出版日" :formatter="formatterDate" />

      <el-table-column label="编辑">
        <template #default="scope">
          <el-button size="small" @click="tableHandleAdd(scope.row)" type="primary">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-dialog>
</template>

<script>
import {Search} from "@element-plus/icons-vue";
import {getAllData, searchData} from "@/api";

export default {
  name: "_add",
  computed: {
    Search() {
      return Search
    }
  },
  props: {
    visible: Boolean,
    formatterDate: Function,
    restrictionFormat:Function
  },
  data() {
    return {
      drawer: false,
      searchInput: "",
      tableData: [],
      SelectionList:[],
      orderList:[]
    }
  },
  methods: {
    getAllData() {
      getAllData(this.page, this.pageSize).then(data => {
        this.tableData = data.data;
        this.total = data.total;
      })
    },
    tableHandleAdd(data) {
      data.amount = 0
      console.log(data)
      this.orderList.push(data)
      this.$emit("update:orderDate",this.orderList)

    },

    dialogClose() {
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
  },
  mounted() {
    this.getAllData()

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