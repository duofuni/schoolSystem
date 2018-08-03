<template>
  <div class="classPhotos-container">
    <backBar :title="title"></backBar>
    <div class="classPhotos-list">
    </div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
export default {
  data() {
    return {
      title:'班级相册',
    }
  },
  computed:{
  },
  created(){
  },
  methods:{
  },
  components:{
    backBar
  }
}
</script>
<style lang="less">

</style>