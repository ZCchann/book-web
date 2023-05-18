<template>
  <el-table :data="orderData" border style="width: 100%">
    <el-table-column prop="number" label="订单号" width="260"/>
    <el-table-column prop="create_time" label="下单时间" :formatter="formatterDate" width="180"/>
    <el-table-column prop="addressee" label="收件人"/>
    <el-table-column prop="telephone" label="电话"/>
    <el-table-column prop="address" label="收件地址"/>
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
      :formatterDate="formatterDate"
      :Information="Information"
      @update:visible="orderListVisible = $event"/>
</template>

<script>
import {formatterDate} from "@/utils/format";
import {getAllOrder, getOrder} from "@/api";
import OrderList from "@/views/order/orderList/orderList.vue";

export default {
  name: "AllOrder",
  components: {OrderList},
  data() {
    return {
      orderData: [],
      orderListVisible: false,
      orderNumber: undefined,
      Information:{
        name:"",
        telephone:"",
        address:""
      }
    }
  },
  methods: {
    formatterDate,
    getAllOrder() {
      getAllOrder().then(({data}) => {
            this.orderData = data
          }
      )
    },
    tableHandleDetailed(row) {
      this.orderListVisible = !this.orderListVisible;
      this.orderNumber = row.number;
      this.Information.name = row.addressee;
      this.Information.telephone = row.telephone;
      this.Information.address = row.address;
    }

  },
  mounted() {
    this.getAllOrder()
  }
}
</script>

<style scoped>

</style>