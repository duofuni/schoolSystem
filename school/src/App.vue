<template>
  <div id="app">
    <!-- <iscroll-view :options="{preventDefault: false}" class="scroll-view"> -->
      <router-view></router-view>
    <!-- </iscroll-view>             -->
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app{
  display: block;
  height: 100%;
}
.scroll-view {
  touch-action: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.scroll-view>div{
  /*height: 101%;*/
}
</style>
