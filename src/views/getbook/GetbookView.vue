<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="isbn" label="ISBN" width="140" />
        <el-table-column prop="tittle" label="书名" />
        <el-table-column prop="price" label="标价" width="80" />
        <el-table-column prop="press" label="出版社" width="120" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="restriction" label="是否为限制级" width="120" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="publication_date" label="出版日" />
        <el-table-column label="编辑">
            <template #default="scope">
                <el-button size="small">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination background v-model:current-page="currentpage" v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]" :background="background" layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script>
import { getalldata, deldata } from "@/api";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    name: "getbook",
    data() {
        return {
            tableData: [],
            page: 1,
            currentpage: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        getData(page, pageSize) {
            getalldata(page, pageSize).then(data => {
                this.tableData = data.data
                this.total = data.total
            })
        },
        handleDelete(row) {
            ElMessageBox.confirm(
                '确定要删除这条数据?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            ).then(() => {
                deldata(row["isbn"])
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                })
                this.total =this.total -1 //用于触发页面刷新
            })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        },
        
        // 点击页码触发事件
        handleCurrentChange(val) {
            this.page = val
        },
        // 更改每页显示数量触发事件
        handleSizeChange(val) {
            this.pageSize = val
        }

    },
    mounted() {
        this.getData(this.page, this.pageSize)
    },
    watch: {
        page() {
            this.getData(this.page, this.pageSize)
        },
        pageSize() {
            this.getData(this.page, this.pageSize)
        },
        total() {
            this.getData(this.page, this.pageSize)
        }
    }


}
</script>