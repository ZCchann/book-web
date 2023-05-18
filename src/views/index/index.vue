<template>
  <div class="index">
    <img :src="img">
    <p>这里暂时想不出来写点什么</p>
    <p>先空着得了</p>
  </div>
</template>

<script>
export default {
  name:"index",
  data() {
    return{
      img:require('@/assets/unknowtext.webp')
    }
  }
}


</script>