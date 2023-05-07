<template>


    <el-header style="text-align: right; font-size: 12px">

      <div class="breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="item in lists" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px"
        ><setting
        /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>个人中心</span>
    </el-header>

</template>

<script>
import {ArrowRight, Setting} from '@element-plus/icons-vue'
import {defineComponent} from "vue";

export default defineComponent({
  components: {Setting},
  data() {
    return {
      lists: []
    }
  },
  methods: {},
  mounted() {
    this.lists = this.$route.matched;
  },
  computed: {
    ArrowRight() {
      return ArrowRight
    }
  },
  watch: {
    $route(to,from) {
      this.lists = to.matched;
    }
  }
})


</script>