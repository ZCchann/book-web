<template>


  <el-header style="text-align: right; font-size: 12px">

    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in lists" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown>
      <el-button type="primary">
        个人中心
        <el-icon class="el-icon--right">
          <arrow-down/>
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
              @click="toPersonal"
          >个人信息
          </el-dropdown-item>
          <el-dropdown-item
              @click="logOut">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>

</template>

<script>
import {ArrowDown, ArrowRight, Setting} from '@element-plus/icons-vue'
import {defineComponent} from "vue";
import store from "@/store";
import {logout} from "@/api";

export default defineComponent({
  components: {ArrowDown, Setting},
  data() {
    return {
      lists: []
    }
  },
  methods: {
    toPersonal() {
      this.$router.replace("/personal")
    },
    logOut() {
      logout().then(() => {
        localStorage.clear()
        store.dispatch("delRoute")
        this.$router.replace("/login")
      })

    }
  },
  mounted() {
    this.lists = this.$route.matched;
  },
  computed: {
    ArrowRight() {
      return ArrowRight
    }
  },
  watch: {
    $route(to, from) {
      this.lists = to.matched;
    }
  }
})


</script>