<template>
  <el-aside width="200px">
    <el-menu default-active="1" class="el-menu-vertical-demo" router>
      <template v-for="i in getRouter">
        <!--    第一层      -->
        <el-sub-menu v-if="i.children && i.children.length > 0" :index="i.name">
          <template #title>
            <el-icon>
              <Menu/>
            </el-icon>
            <span>{{ i.meta.title }}</span>
          </template>
          <el-menu-item-group>

            <el-menu-item
                v-for="c in i.children"
                :index="c.path">
              {{ c.meta.title }}
            </el-menu-item>

          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="i.path">
          {{ i.meta.title }}
        </el-menu-item>

      </template>

    </el-menu>
  </el-aside>
</template>

<script>

export default {

  methods: {},
  mounted() {
  },
  computed: {
    // 动态获取路由信息
    getRouter() {
      const m = this.$router.getRoutes().filter(i => {
        return i.meta.isTrue === 1
      });
      if (m.length > 0) {
        return m
      } else {
        return []
      }
    }
  }
}
</script>