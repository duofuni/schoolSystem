<template>
  <div class="myPhotos-container">
    <backBar :title="title"></backBar>
    <div class="myPhotos">
      <div 
      v-for="(item,index1) in myData.photoList" 
      :key="index1" 
      class="photo-item">
        <i>{{item.time}}</i> 
        <router-link 
        v-for="(photo,index2) in item.photos" 
        :key="index2" 
        :to="{path:'/myPhotoDetail/',query:{itemId:id,group:index1,id:index2}}">
          <img :src="photo"/>
        </router-link>
      </div>
      <div class="blank f-l" v-if="!myData.photoList.length">相册为空...</div>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'
export default { 
  data() {
    return {
      title:'我的相册',
      id:this.$route.query.id
    }
  },
  computed:{
    myData(){
      return S_Storage.getSession("userInfo")
    }
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