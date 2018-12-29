<template>
  <header class="top-header">
    <em
      @click="handleBack"
      style="background-image:url('/static/images/back_icon.png');"></em>
    <div class="topBar">
      <span>{{title}}</span>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
  props: ['title'],
}
</script>
<style lang="less">
</style>
