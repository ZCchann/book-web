<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <el-table
        :data="orderDate"
        border style="width: 100%"
        height="790"
        show-summary
        :summary-method="getSummaries"
    >
      <el-table-column prop="isbn" label="ISBN" width="140"/>
      <el-table-column prop="tittle" label="书名"/>
      <el-table-column prop="price" label="标价" width="80"/>
      <el-table-column prop="press" label="出版社" width="120"/>
      <el-table-column prop="type" label="类型" width="120"/>
      <el-table-column prop="restriction" label="是否为限制级" width="120" :formatter="restrictionFormat"/>
      <el-table-column prop="author" label="作者" width="120"/>
      <el-table-column prop="publication_date" label="出版日" :formatter="formatterDate"/>
      <el-table-column prop="amount" label="数量"/>
      <el-table-column prop="total_price" label="总价"/>
    </el-table>

    <el-button
        type="success"
        :icon="ShoppingTrolley"
        size="large"
        @click="submit"
    > 提交订单
    </el-button>
  </el-dialog>
</template>

<script>
import {Plus, Search, ShoppingTrolley} from "@element-plus/icons-vue";
import {createOrder} from "@/api";
import {ElMessage} from "element-plus";

export default {
  name: "_submit",
  computed: {
    ShoppingTrolley() {
      return ShoppingTrolley
    },
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
    orderDate: Array
  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    dialogClose() {
      this.$emit('update:visible', false);
    },
    getSummaries(data) {
      const sums = ["合计", "", "", "", "", "", "", ""] // 前8列都不是数值类型 填入空值让他保持为空
      let tt = 0; //总价
      let n = 0; // 合计本数
      for (let i = 0; i < data.data.length; i++) {
        let total = data.data[i].total_price;
        let amount = data.data[i].amount;
        tt += total;
        n += amount;
      }
      sums.push(n, tt);
      return sums
    },
    submit() {
      createOrder(this.orderDate).then(() => {
        ElMessage({
          type: 'success',
          message: '提交成功',
        })
      })
      this.dialogClose()
    }

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