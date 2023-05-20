<template>
  <el-row>
    <el-col :span="2">
      <el-button
          size="large"
          type="primary"
          @click="tableExportList"
      >导出勾选订单
      </el-button>
    </el-col>
  </el-row>
  <el-table
      :data="orderData"
      border
      style="width: 100%"
      height="790px"
      @selection-change="tableHandleSelectionChange"
  >
    <el-table-column type="selection" width="55"/>
    <el-table-column prop="number" label="订单号" sortable width="260"/>
    <el-table-column prop="create_time" label="下单时间" sortable :formatter="formatterDate" width="180"/>
    <el-table-column prop="addressee" sortable label="收件人"/>
    <el-table-column prop="telephone" sortable label="电话"/>
    <el-table-column prop="address" sortable label="收件地址"/>
    <el-table-column fixed="right" label="订单详情" width="200">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="large"
            @click="tableDetailed(scope.row)"
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

  <exportOrderView
      :visible="ExportListVisible"
      :orderNumberList="numberList"
      @update:visible="ExportListVisible = $event"
      @update:orderNumberList="numberList = $event"
  />
</template>

<script>
import {formatterDate} from "@/utils/format";
import {getAllOrder} from "@/api";
import OrderList from "@/views/order/orderList/orderDetailed.vue";
import ExportOrderView from "@/views/order/orderList/exportOrder.vue";

export default {
  name: "AllOrder",
  components: {ExportOrderView, OrderList},
  data() {
    return {
      orderData: [],
      orderListVisible: false,
      ExportListVisible: false,
      orderNumber: undefined,
      Information: {
        name: "",
        telephone: "",
        address: ""
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      SelectionList: [], //多选框列表
      numberList: ""
    }
  },
  methods: {
    //多选框触发事件
    tableHandleSelectionChange(val) {
      this.SelectionList = val;
    },
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
      // 获取所有订单
      getAllOrder(this.page, this.pageSize).then((data) => {
            this.orderData = data.data
            this.total = data.total
          }
      )
    },
    tableDetailed(row) {
      //点击订单详情中的“查看详情”
      this.orderListVisible = !this.orderListVisible;
      this.orderNumber = row.number;
      this.Information.name = row.addressee;
      this.Information.telephone = row.telephone;
      this.Information.address = row.address;
    },

    tableExportList() {
      //点击顶部的"导出勾选订单"

      //数据格式转换一下
      for (let i = 0; i < this.SelectionList.length; i++) {
        this.numberList = this.numberList + this.SelectionList[i].number + ","
      }
      this.numberList = this.numberList.substring(0, this.numberList.length - 1);

      this.ExportListVisible = !this.ExportListVisible;
    }

  },
  mounted() {
    this.getAllOrder()
  }
}
</script>

<style scoped>

</style>