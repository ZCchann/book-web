<template>

  <el-aside width="200px">
    <el-menu
        default-active="1"
        class="el-menu-vertical-demo" router>

<!--      无子集-->
      <el-menu-item index="/index">
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/alldata">
        <span>数据管理</span>
      </el-menu-item>

      <el-menu-item index="/user">
        <span>用户管理</span>
      </el-menu-item>

    </el-menu>
  </el-aside>

</template>

<script>
</script>