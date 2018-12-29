<template>
  <div v-show="ShowAvatar" class="operation-head-container">
    <div class="operation-head mask"></div>
    <div v-if="ifSeeAvatar" class="headImg">
      <img :src="url"/>
      <button class="go-back" @click="handleSeeAvatar">返回</button>
    </div>
    <div v-else class="operation-head-cont">
      <ul>
        <li @click="handleSeeAvatar" class="see">查看头像</li>
        <li @click="handleShowCropper" class="modify">
          <input type="file" @change="handleUploadAvatar($event)"/>
          <span>修改头像</span>
        </li>
        <li @click="handleClose" class="cancel">取消</li>
      </ul>
    </div>
    <div v-if="ifUploadAvatar" class="uploadHeadImg">
        <div class="cut-box">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="example2.size"
            :info="example2.info"
            :canScale="example2.canScale"
            :autoCrop="example2.autoCrop"
            :autoCropWidth="example2.autoCropWidth"
            :autoCropHeight="example2.autoCropHeight"
            :fixed="example2.fixed"
          ></vueCropper>
        </div>
        <button class="Confirm" @click="handleConfirmCropper">{{uploadState}}</button>
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropper'
import imgVerify from '@/utils/verify/img_verify'
import imgSrc from '@/utils/file_reader/img_src'
import S_Storage from '@/utils/storage/session_storage'
import fs from 'fs'

export default {
  data() {
    return {
      uploadState: '确认',
      ifSeeAvatar: false,
      ifUploadAvatar: false,
      fileName: '',
      example2: {
        info: true,
        size: 1,
        canScale: false,
        autoCrop: true,
        autoCropWidth: 300,
        autoCropHeight: 250,
        fixed: true,
      },
      option: {
        img: '',
      },
    }
  },
  computed: {
    loginUser() {
      return S_Storage.getSession('loginUser');
    },
  },
  methods: {
    handleClose() {
      this.$emit('off');
    },
    handleSeeAvatar() {
      this.ifSeeAvatar = !this.ifSeeAvatar;
    },
    handleShowCropper() {
      this.ifUploadAvatar = !this.ifUploadAvatar;
    },
    handleConfirmCropper() {
      if (this.option.img) {
        let formData = new FormData();
        this.$refs.cropper.getCropBlob((data) => {
          this.uploadState = '上传中...';
          setTimeout(() => {
            let img = window.URL.createObjectURL(data);
            this.model = true; 
            this.modelSrc = img; 
            this.option.img = '';
            this.loginUser.avatar = data;
            formData.append("imgFile", data, this.fileName);
            this.$axios.put('/api/user/uploadAvatar/' + this.loginUser._id, formData)
              .then((response)=>{
                S_Storage.setSession('loginUser', response.user);
                this.$emit('updateAvatar', response.user.avatar)
                this.warning = '信息修改成功！';
                setTimeout(() => {
                  this.$router.push('/personal');
                }, 1200);
              });
            this.uploadState = '确认';
          },1000);
        });
      }
      setTimeout(() => {
        this.ifUploadAvatar = !this.ifUploadAvatar;
      },1000);
    },
    handleUploadAvatar(e) {
      this.fileName = e.target.files[0].name;
      this.warning = imgVerify(e, this.warning);
      if (!this.warning) {
        imgSrc(e).then((data) => {
          this.option.img = data[0];
        });
      }
    },
  },
  components: {
    VueCropper,
  },
  props: ['ShowAvatar', 'url'],
}
</script>
<style lang="less">
</style>
