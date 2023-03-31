<template>
  <el-table :data="orderData" border style="width: 100%">
    <el-table-column prop="orderID" label="订单号" width="260"/>
    <el-table-column prop="orderTime" label="下单时间" :formatter="formatterDate" width="180"/>
    <el-table-column prop="status" label="订单状态" />
    <el-table-column fixed="right" label="订单详情" width="200">
      <template #default>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {formatterDate} from "@/utils/format";

export default {
  name: "OrderListView",
  data() {
    return {
      orderData: [{
        orderID:"123456",
        orderTime:"1680183295",
        status:"进行中"
        }]

    }
  },
  methods: {
    formatterDate

  }
}
</script>

<style scoped>

</style>