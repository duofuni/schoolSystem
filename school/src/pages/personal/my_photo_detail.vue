<template>
  <div v-if="myInfo.photoList" class="my-photo-detail-container">
    <backBar :title="title"></backBar>
    <img @click="handleNext" :src="src" alt="">
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import S_Storage from '@/utils/storage/session_storage'

export default {
  data() {
    return {
      itemId: this.$route.query.itemId,
      group: this.$route.query.group,
      id: this.$route.query.id,
    }
  },
  computed: {
    myInfo() {
      return S_Storage.getSession('loginUser');
    },
    title() {
      return this.myInfo.photoList[this.group].time;
    },
    src() {
      return this.myInfo.photoList[this.group].photos[this.id];
    },
  },
  methods: {
    handleNext(){
      if (this.id < this.myInfo.photoList[this.group].photos.length - 1) {
        this.id += 1;
      }
    },
  },
  components: {
    backBar,
  }
}
</script>
<style lang="less">
</style>
