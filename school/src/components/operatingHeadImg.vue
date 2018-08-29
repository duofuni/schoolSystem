<template>
  <div v-show = "ShowHeadImg" class = "operation-head-container">
    <div class = "operation-head mask"></div>
    <div v-if = "ifSeeHeadImg" class = "headImg">
      <img :src = "url"/>
      <button class = "go-back" @click = "seeHeadImg">返回</button>
    </div>
    <div v-else class = "operation-head-cont">
      <ul>
        <li @click = "seeHeadImg" class = "see">查看头像</li>
        <li @click = "showCropper" class = "modify">
          <input type = "file" @change = "uploadPhoto($event)"/>
          <span>修改头像</span>
        </li>
        <li @click = "close" class = "cancel">取消</li>
      </ul>
    </div>
    <div v-if = "ifUploadHeadImg" class = "uploadHeadImg">
        <div class = "cut-box">
          <vueCropper
            ref = "cropper"
            :img = "option.img"
            :outputSize = "example2.size"
            :info = "example2.info"
            :canScale = "example2.canScale"
            :autoCrop = "example2.autoCrop"
            :autoCropWidth = "example2.autoCropWidth"
            :autoCropHeight = "example2.autoCropHeight"
            :fixed = "example2.fixed"
          ></vueCropper>
        </div>
        <button class = "Confirm" @click = "confirmCropper">{{uploadState}}</button>
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropper'
import imgVerify from '@/utils/verify/imgVerify'
import imgSrc from '@/utils/fileReader/imgSrc'
export default {
  data() {
    return {
      uploadState: '确认',
      ifSeeHeadImg: false,
      ifUploadHeadImg: false,
      example2: {
        info: true,
        size: 1,
        canScale: false,
        autoCrop: true,
        autoCropWidth: 300,
        autoCropHeight: 250,
        fixed: true
      },
      option: {
        img: ''
      },
    }
  },
  computed: {
  },
  methods: {
    close(){
      this.$emit("off")
    },
    seeHeadImg() {
      this.ifSeeHeadImg = !this.ifSeeHeadImg
    },
    showCropper() {
      this.ifUploadHeadImg = !this.ifUploadHeadImg
    },
    confirmCropper() {
      if (this.option.img) {
        this.$refs.cropper.getCropData((data) => {
          this.uploadState = '上传中...'
          setTimeout(() => {
            this.option.img = ''
            this.$store.commit('updateHeadImg', data)
            this.uploadState = '确认'
          },1000)
        })
      }
      setTimeout(() => {
        this.ifUploadHeadImg = !this.ifUploadHeadImg
      },1000)
    },
    uploadPhoto(e){
      this.warning = imgVerify(e, this.warning)
      if (!this.warning) {
        imgSrc(e).then((data) => {
          this.option.img = data[0]
        })
      }
    }
  },
  components:{
    VueCropper
  },
  props:["ShowHeadImg", "url"]
}
</script>
<style lang = "less">
</style>
