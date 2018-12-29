<template>
  <div class="class-photos-container">
    <backBar :title="title"></backBar>
    <div class="class-photos-list">
    </div>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'

export default {
  data() {
    return {
      title: '班级相册',
    }
  },
  components: {
    backBar,
  },
}
</script>
<style lang="less">

</style>
