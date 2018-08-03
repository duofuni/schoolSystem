<template>
  <header class="top-header">
    <em
    @click="back"
    style="background-image:url('/static/images/back_icon.png');"></em>
    <div class="topBar">
      <span>{{title}}</span>
    </div>
  </header>
</template>
<script>
export default {
  data() {  
    return {
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  },
  props:["title"]
}
</script>
<style lang="less">
</style>