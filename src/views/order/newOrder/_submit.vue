<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <el-table :data="orderDate"  border style="width: 100%" height="790">
      <el-table-column prop="isbn" label="ISBN" width="140"/>
      <el-table-column prop="tittle" label="书名"/>
      <el-table-column prop="price" label="标价" width="80"/>
      <el-table-column prop="press" label="出版社" width="120"/>
      <el-table-column prop="type" label="类型" width="120"/>
      <el-table-column prop="restriction" label="是否为限制级" width="120" :formatter="restrictionFormat"/>
      <el-table-column prop="author" label="作者" width="120"/>
      <el-table-column prop="publication_date" label="出版日" :formatter="formatterDate"/>
      <el-table-column prop="amount" label="数量"/>
      <el-table-column prop="total" label="总价"/>
    </el-table>

  </el-dialog>
</template>

<script>
import {Plus, Search} from "@element-plus/icons-vue";

export default {
  name: "_submit",
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
    orderDate:Array
  },
  data() {
    return {
      drawer: false,
      searchInput: "",
      tableData: [],
      SelectionList: [],
      orderList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    dialogClose() {
      this.$emit('update:visible', false);
    },

  },
  mounted() {

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