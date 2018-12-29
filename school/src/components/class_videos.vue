<template>
  <div class="video-container">
    <div class="title">
      <h3>
        <em></em>
        <span>最新班级视频</span>
        <em></em>
      </h3>
    </div>
    <router-link
      tag="div"
      to="/play_video"
      class="video-item">
      <span class="btn">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          className="rh5v-Overlay_icon"
          fill="#fff">
            <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />
        </svg>
      </span>
    </router-link>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
</style>
