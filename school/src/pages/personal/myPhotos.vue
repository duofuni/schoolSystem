<template>
  <div class = "myPhotos-container">
    <backBar :title = "title"></backBar>
    <div class = "up-load">
      <span class = "up-load-photo">{{ uploadstate }}</span>
      <input type = "file" name = "file" @change = "uploadPhoto($event)" multiple = "multiple" />
    </div>
    <div class = "myPhotos">
      <div
      v-for = "(item,index1) in myData.photoList"
      :key = "index1"
      class = "photo-item">
        <i>{{ item.time }}</i>
        <router-link
        v-for = "(photo,index2) in item.photos"
        :key = "index2"
        :to = "{ path:'/myPhotoDetail/', query: { itemId: id, group: index1, id: index2 } }">
          <img :src = "photo"/>
        </router-link>
      </div>
      <div class = "blank f-l" v-if = "!myData.photoList.length">相册为空...</div>
    </div>
    <alert :warning = "warning" @off = "close"></alert>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import alert from '@/components/alert'
import S_Storage from '@/utils/storage/sessionStorage'
import imgVerify from '@/utils/verify/imgVerify'
import imgSrc from '@/utils/fileReader/imgSrc'
import getTime from '@/utils/date/getTime'
export default {
  data() {
    return {
      title: '我的相册',
      id: this.$route.query.id,
      uploadstate: '点我上传照片',
      photoList: {},
      warning: ''
    }
  },
  computed: {
    myData() {
      return this.$store.getters.getUserInfo
    }
  },
  created(){
    this.queryData()
  },
  methods: {
    queryData() {
      this.$store.commit("updateData")
    },
    uploadPhoto(e){
      this.photoList = {}
      this.warning = imgVerify(e, this.warning)
      if (!this.warning) {
        imgSrc(e).then(urls => {
          if (urls.length > 3) {//限制
            this.warning = "单次只能上传3张照片！"
            return false
          }
          this.photoList.time = getTime()
          this.photoList.url = []
          urls.forEach((url) => {
            this.photoList.url.push(url)
          })
          this.$store.commit("uploadPhoto", this.photoList)
        })
      }
    },
    close(){
      this.warning = ''
    }
  },
  components:{
    backBar,
    alert
  }
}
</script>
<style lang = "less">
</style>
