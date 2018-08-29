<template>
  <div class = "alert-container">
    <div class = "alert mask" v-show = "warning">
      <div class = "alert-cont">
        <i style = "color:red;" class = "text">{{warning}}</i>
        <button @click = "close" class = "btn">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit("off")
    }
  },
  props: ["warning"]
}
</script>
<style lang = "less">
</style>
