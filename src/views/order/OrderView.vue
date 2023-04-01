<template>
  <el-table :data="orderData" border style="width: 100%">
    <el-table-column prop="number" label="订单号" width="260"/>
    <el-table-column prop="create_time" label="下单时间" :formatter="formatterDate" width="180"/>
    <el-table-column prop="status" label="订单状态"/>
    <el-table-column fixed="right" label="订单详情" width="200">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="large"
            @click="tableHandleDetailed(scope.row)"
        >查看详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <orderList
      :visible="orderListVisible"
      :orderNumber="orderNumber"
      @update:visible="orderListVisible = $event"/>
</template>

<script>
import {formatterDate} from "@/utils/format";
import {getOrder} from "@/api";
import OrderList from "@/views/order/orderList/orderList.vue";

export default {
  name: "OrderListView",
  components: {OrderList},
  data() {
    return {
      orderData: [],
      orderListVisible: false,
      orderNumber:undefined
    }
  },
  methods: {
    formatterDate,
    getAllOrder() {
      getOrder().then(({data}) => {

            this.orderData = data
          }
      )
    },
    tableHandleDetailed(row) {
      this.orderListVisible = !this.orderListVisible;
      this.orderNumber = row.number
    }

  },
  mounted() {
    this.getAllOrder()
  }
}
</script>

<style scoped>

</style>