<template>
  <el-container>
    <el-main>
      <slot name="header" />

      <slot name="default" />

      <slot name="footer" />

      <slot name="widget" />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "MainView",
}
</script>

<style scoped>
</style>
