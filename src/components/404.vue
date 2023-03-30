<template>
  <img :src="img">
  <h1>404 Not Found</h1>
  <h1>页面不存在</h1>
</template>

<script>
export default {
  name: "404",
  data(){
    return{
      img: require('@/assets/404.webp')
    }
  }
}
</script>

<style scoped>

</style>