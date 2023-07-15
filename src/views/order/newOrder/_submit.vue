<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <el-steps :space="200" :active="active" finish-status="success" simple>
      <el-step title="选择地址"></el-step>
      <!--active为0时，为选中状态-->
      <el-step title="确认清单"></el-step>
      <!--active为1时，为选中状态-->
    </el-steps>

    <div class="check-Address">
      <el-table
          :data="addressTable"
          style="width: 100%"
          height="352"
          highlight-current-row
          @current-change="handleCurrentChange"
          v-if="active===0">
        <el-table-column prop="addressee" label="收件人" width="180"/>
        <el-table-column prop="telephone" label="电话" width="180"/>
        <el-table-column prop="address" label="地址"/>
      </el-table>

      <el-button
          type="success"
          :icon="ArrowRightBold"
          size="large"
          @click="stepNext"
          v-if="active===0"
      > 下一步
      </el-button>
    </div>


    <div class="check-Order">
      <el-table
          :data="orderData"
          border style="width: 100%"
          height="790"
          show-summary
          :summary-method="getSummaries"
          v-if="active===1"
      >
        <el-table-column prop="isbn" label="ISBN" width="140"/>
        <el-table-column prop="title" label="书名"/>
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
          type="info"
          :icon="ArrowLeftBold"
          size="large"
          @click="stepSub"
          v-if="active===1"
      > 上一步
      </el-button>

      <el-button
          type="primary"
          :icon="ShoppingTrolley"
          size="large"
          @click="submit"
          v-if="active===1"
      > 提交订单
      </el-button>
    </div>

  </el-dialog>
</template>

<script>
import {ArrowLeftBold, ArrowRightBold, Plus, Search, ShoppingTrolley} from "@element-plus/icons-vue";
import {createOrder, getUserAllAddress} from "@/api";
import {ElMessage} from "element-plus";

export default {
  name: "_submit",
  computed: {
    ArrowLeftBold() {
      return ArrowLeftBold
    },
    ArrowRightBold() {
      return ArrowRightBold
    },
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
    orderData: Array
  },
  data() {
    return {
      drawer: false,
      active: 0,
      addressTable: [],
      submitForm: {
        order_data: undefined,
        addressee: "",
        telephone: "",
        address: "",
      },
      checkForm: {
        addressee: "",
        telephone: "",
        address: "",
      }
    }
  },
  methods: {
    dialogClose() {
      this.$emit('update:visible', false);
      this.active = 0;
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
    stepNext() {
      if (this.checkForm.address === "") {
        ElMessage({
          type: 'error',
          message: ("你还没有选择地址！！！"),
        })
      } else {
        this.active++;
      }
    },
    stepSub() {
      this.active--;
    },
    submit() {
      this.submitForm.order_data = this.orderData;
      this.submitForm.addressee = this.checkForm.addressee;
      this.submitForm.telephone = this.checkForm.telephone;
      this.submitForm.address = this.checkForm.address;

      createOrder(this.submitForm).then(() => {
        ElMessage({
          type: 'success',
          message: '提交成功',
        })
      })
      this.$emit("update:orderDate", [])
      this.dialogClose()
    },
    getAddress() {
      getUserAllAddress().then(({data}) => {
        this.addressTable = data
      })
    },
    handleCurrentChange(val) {
      this.checkForm = val;
    }

  },
  watch: {
    visible(val) {
      this.drawer = val;
      this.getAddress();
    }
  }
}
</script>

<style scoped>

</style>