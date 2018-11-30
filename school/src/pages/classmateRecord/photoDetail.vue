<template>
  <div v-if="classmateInfo.photoList" class="photoDetail-container">
    <backBar :title="title"></backBar>
    <img @click="handleNext" :src="src" alt="">
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'

export default {
  data() {
    return {
      itemId: this.$route.query.itemId,
      group: this.$route.query.group,
      id: this.$route.query.id,
    }
  },
  computed: {
    classmateInfo() {
      return S_Storage.getSession('classmateInfo');
    },
    title() {
      return this.classmateInfo.photoList[this.group].time;
    },
    src() {
      return this.classmateInfo.photoList[this.group].photos[this.id];
    },
  },
  methods: {
    handleNext() {
      if (this.id < this.classmateInfo.photoList[this.group].photos.length - 1) {
        this.id += 1;
      }
    },
  },
  components: {
    backBar,
  },
}
</script>
<style lang="less">
</style>
