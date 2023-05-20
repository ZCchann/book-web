<template>
  <el-table :data="orderData" border style="width: 100%" height="830px">
    <el-table-column prop="number" label="订单号" sortable width="260"/>
    <el-table-column prop="create_time" label="下单时间" sortable :formatter="formatterDate" width="180"/>
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
  <div class="pagination-block">
    <el-pagination background v-model:current-page="currentPage" v-model:page-size="pageSize"
                   :page-sizes="[10, 20, 50, 100]" :background="background"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total" @size-change="footerSizeChange" @current-change="footerCurrentChange"/>
  </div>

  <orderList
      :visible="orderListVisible"
      :orderNumber="orderNumber"
      :formatterDate="formatterDate"
      :Information="Information"
      @update:visible="orderListVisible = $event"/>
</template>

<script>
import {formatterDate} from "@/utils/format";
import {getOrder} from "@/api";
import OrderList from "@/views/order/orderList/orderDetailed.vue";

export default {
  name: "OrderListView",
  components: {OrderList},
  data() {
    return {
      orderData: [],
      orderListVisible: false,
      orderNumber: undefined,
      Information: {
        name: "",
        telephone: "",
        address: ""
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    // 更改每页显示数量触发事件
    footerSizeChange(val) {
      this.pageSize = val;
      this.getAllOrder();
    },
    // 点击页码触发事件
    footerCurrentChange(val) {
      this.page = val;
      this.getAllOrder();
    },
    formatterDate, // 日期格式化
    getAllOrder() {
      getOrder(this.page, this.pageSize).then((data) => {
            this.orderData = data.data
            this.total = data.total
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