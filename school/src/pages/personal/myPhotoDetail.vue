<template>
  <div v-if="myInfo.photoList" class="myPhotoDetail-container">
    <backBar :title="title"></backBar>
    <img @click="next" :src="src" alt="">
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'
export default {
  data() {
    return {
      itemId:this.$route.query.itemId,
      group:this.$route.query.group,
      id:this.$route.query.id,
    }
  },
  computed:{
    myInfo(){
      return S_Storage.getSession("userInfo")
    },
    title(){
      return this.myInfo.photoList[this.group].time
    },
    src(){
      return this.myInfo.photoList[this.group].photos[this.id]
    }
  },
  created(){
  },
  methods:{
    next(){
      if(this.id<this.myInfo.photoList[this.group].photos.length-1){
        this.id+=1
      }
    }
  },
  components:{
    backBar
  }
}
</script>
<style lang="less">
</style>