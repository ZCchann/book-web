<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h2 :id="titleId" :class="titleClass">订单详情</h2>
      </div>
      <el-button @click="exportExcel" type="primary">导出订单</el-button>
    </template>
    <el-table
        :data="orderDate"
        border style="width: 100%"
        height="790"
        show-summary
        :summary-method="getSummaries"
        id="exporttableId"
    >
      <el-table-column prop="isbn" label="ISBN" width="140"/>
      <el-table-column prop="title" label="书名"/>
      <!--      <el-table-column prop="price" label="标价" width="80"/>-->
      <el-table-column prop="press" label="出版社" width="120"/>
      <el-table-column prop="type" label="类型" width="120"/>
      <!--      <el-table-column prop="publication_date" label="出版日" :formatter="formatterDate"/>-->
      <el-table-column prop="total_amount" label="总数"/>
    </el-table>

  </el-dialog>
</template>

<script>
import {exportOrderData} from "@/api";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default {
  name: "exportOrderView",
  props: {
    visible: Boolean,
    formatterDate: Function,
    orderNumberList: {
      type: String,
      default: undefined
    },
  },
  data() {
    return {
      drawer: false,
      orderDate: [],
      address: []
    }
  },
  methods: {
    dialogClose() {
      this.orderDate = []
      this.address = []
      this.$emit('update:visible', false);
      this.$emit('update:orderNumberList', "")
    },
    getSummaries(data) {
      const sums = ["", "", "", "", "", "", ""] // 前8列都不是数值类型 填入空值让他保持为空
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
    exportExcel() {
      //转换成excel时，使用原始的格式
      let xlsxParam = {raw: true};
      let fix = document.querySelector(".el-table__fixed");
      let wb;
      //判断有无fixed定位，如果有的话去掉，后面再加上，不然数据会重复
      if (fix) {
        wb = XLSX.utils.table_to_book(
            document.querySelector("#exporttableId").removeChild(fix), xlsxParam
        );
        document.querySelector("#exporttableId").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#exporttableId"), xlsxParam);
      }
      let ws = wb.Sheets["Sheet1"];

      // 获取表格的最大行数和最大列数
      let range = XLSX.utils.decode_range(ws['!ref']);
      let maxRow = range.e.r + 1;
      let maxCol = range.e.c + 1;
      // 将数据写入表格的最后一行
      let newRow = maxRow + 1;

      //更新表格范围
      ws['!ref'] = XLSX.utils.encode_range({s: range.s, e: {r: newRow, c: maxCol}});

      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        let filename = "订单详情.xlsx"
        FileSaver.saveAs(
            new Blob([wbout], {type: "application/octet-stream"}),
            filename
        ); //文件名
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  },
  watch: {
    visible(val) {
      this.drawer = val;
      if (val && this.orderNumberList) {
        exportOrderData(this.orderNumberList).then(({data}) => {
          this.orderDate = data;
        })

      }
    }
  }
}
</script>

<style scoped>

</style>