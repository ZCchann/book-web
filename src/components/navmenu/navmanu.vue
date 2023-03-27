<template>
  <el-aside width="200px">
    <el-menu default-active="1" class="el-menu-vertical-demo" router>

      <template v-for="i in getRouter">
        <el-menu-item  :index="i.path">
          {{ i.meta.title }}
        </el-menu-item>
      </template>


           <!-- 无子集
      <el-menu-item index="/index">
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/alldata">
        <span>数据管理</span>
      </el-menu-item>

      <el-menu-item index="/user">
        <span>用户管理</span>
      </el-menu-item> -->

      <!-- <el-menu-item v-for="(i, idx) in getRouter">
        {{ i.meta.title }}
      </el-menu-item> -->


    </el-menu>
  </el-aside>
</template>

<script>

export default {

  methods: {

  },
  mounted() {
  },
  computed: {
    // 动态获取路由信息
    getRouter() {
      const m = this.$router.getRoutes().filter(i => {
        return i.name === "home"
      });
      if (m.length > 0) {
        return m[0].children
      } else {
        return []
      }
    }
  }
}
</script>