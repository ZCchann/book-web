<template>
    <div class="common-layout">
        <el-container class="layout-container-demo" style="height: 100%">
            <el-header>
                <!-- 头部内容 -->
            </el-header>

            <el-container>
                <el-aside width="200px">
                    <el-link href="https://element-plus.org" target="_blank">首页</el-link>
                    <el-scrollbar>
                        <el-menu :default-openeds="['1', '4']">
                            <el-sub-menu index="1">
                                <template #title>
                                    <el-icon>
                                        <message />
                                    </el-icon>数据管理
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1">Option 1</el-menu-item>
                                    <el-menu-item index="1-2">Option 2</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>

                    </el-scrollbar>
                </el-aside>


                <el-main>Main</el-main>


            </el-container>
        </el-container>
    </div>
</template>
  
  
<script>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

//   const item = {
//     date: '2016-05-02',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   }
//   const tableData = ref(Array.from({ length: 20 }).fill(item))
export default {
    data() {
        return {
            item: {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            tableData: [{
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            }]
        }
    }
}
</script>
  
<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>