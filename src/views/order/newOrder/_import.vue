<template>
  <el-dialog v-model="drawer" width="70%" draggable @close="dialogClose">
    <el-input
        v-model="textarea"
        :rows="5"
        type="textarea"
        placeholder="Please input"
    />
    <el-button
    @click="importSubmit"
    >提交</el-button>

  </el-dialog>
</template>

<script>
import {textProps} from "element-plus";

export default {
  name: "_import",
  data() {
    return {
      drawer: false,
      textarea: ""
    }
  },
  props: {
    visible: Boolean,
  },
  methods: {
    dialogClose() {
      this.$emit('update:visible', false);
    },
    importSubmit() {
      console.log(textProps)
    }
  },
  watch: {
    visible(val) {
      this.drawer = val;

        }
      }

    }
</script>

<style scoped>

</style>