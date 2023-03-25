<template>
  <div class="common-layout">
    <el-container>
      <NavMenu/>
      <el-container>
        <el-header>
          <Breadcrumb/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "./navmenu/navmanu.vue"
import Breadcrumb from "./breadcrumb/breadcrumb.vue";

export default {
  components: {
    Breadcrumb,
    NavMenu
  }
}

</script>

<style scoped>
.common-layout .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.common-layout .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  height: 100vh;
}

.common-layout .el-menu {
  border-right: none;
  height: 100%;
}

.common-layout .el-main {
  padding: 0;
}

</style>