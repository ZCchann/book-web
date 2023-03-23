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
</template>

<script>
import { getalldata, deldata } from "@/api";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    name: "getbook",
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        getData() {
            getalldata().then(data => {
                this.tableData = data.data
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
            )
                .then(() => {
                    var msa = ""
                    console.log(row["isbn"] + "1")
                    deldata(row["isbn"] + "1").then(ret => {this.msa = ret.message})
                    if (msa = "success") {
                        ElMessage({
                        type: 'success',
                        message: 'Delete completed',
                    })
                    }else{
                        ElMessage({
                        type: 'error',
                        message: msa,
                    })
                    }
                    
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        }

    },
    mounted() {
        this.getData()
    }

}
</script>