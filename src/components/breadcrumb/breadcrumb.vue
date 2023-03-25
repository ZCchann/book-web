<template>
  <div class="breadcrumb">

    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in lists" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>

    </el-breadcrumb>


  </div>
</template>

<script>
import {ArrowRight} from '@element-plus/icons-vue'
import {defineComponent} from "vue";

export default defineComponent({
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