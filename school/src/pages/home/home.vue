<template>
  <div>
    <carousel></carousel>
    <loginBar></loginBar>
    <navigation></navigation>
    <classVideos></classVideos>
  </div>
</template>

<script>
import carousel from '@/components/carousel'
import loginBar from '@/components/loginBar'
import navigation from '@/components/navigation'
import classVideos from '@/components/classVideos'

export default {
  name: 'home',
  components: {
    carousel,
    loginBar,
    navigation,
    classVideos,
  }
}
</script>

<style>
</style>
