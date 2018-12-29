<template>
  <div class="play-videos-container">
    <backBar :title="title"></backBar>
    <div class="play-videos">
      <video
        class="video"
        src="http://vjs.zencdn.net/v/oceans.mp4"
        controls="controls"
        autoplay
        height="100%"
        width="100%">您的浏览器不支持。</video>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'

export default {
  data() {
    return {
      title: '',
    }
  },
  components: {
    backBar,
  },
}
</script>
<style lang="less">
</style>
