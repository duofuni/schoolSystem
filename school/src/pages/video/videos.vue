<template>
  <div class = "videos-container">
    <backBar :title = "title"></backBar>
    <div class = "video-cont">
      <router-link tag = "div" to = "/playVideo" class = "video-item">
        <span class = "btn">
          <svg xmlns = "http://www.w3.org/2000/svg" width = "40" height = "40" viewBox = "0 0 24 24" className = "rh5v-Overlay_icon" fill = "#fff">
            <path d = "M8.016 5.016L18.985 12 8.016 18.984V5.015z" />
          </svg>
        </span>
      </router-link>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
export default {
  data() {
    return {
      title: '视频',
    }
  },
  components:{
    backBar
  }
}
</script>
<style lang = "less">

</style>
