<template>
  <div class="myPhotos-container">
    <backBar :title="title"></backBar>
    <div class="up-load">
      <span class="up-load-photo">{{ uploadstate }}</span>
      <input
        type="file"
        name="file"
        @change="handleUploadPhoto($event)"
        multiple="multiple" />
    </div>
    <div class="myPhotos">
      <div
        v-for="(item,index1) in photoList"
        :key="index1"
        class="photo-item">
          <i>{{ item.time }}</i>
          <router-link
            v-for="(photo,index2) in item.photos"
            :key="index2"
            :to="{ path:'/myPhotoDetail/', query: { itemId: id, group: index1, id: index2 } }">
          <img :src="photo"/>
        </router-link>
      </div>
      <div class="blank f-l" v-if="!photoList.length">相册为空...</div>
    </div>
    <alert :warning="warning" @off="handleClose"></alert>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import alert from '@/components/alert'
import S_Storage from '@/utils/storage/session_storage'
import imgVerify from '@/utils/verify/img_verify'
import getTime from '@/utils/date/get_time'

export default {
  data() {
    return {
      title: '我的相册',
      id: this.$route.query.id,
      uploadstate: '点我上传照片',
      warning: '',
      photoList: S_Storage.getSession('loginUser').photoList,
    }
  },
  methods: {
    handleUploadPhoto(e) {
      this.warning = imgVerify(e, this.warning);
      if (!this.warning) {
        let formData = new FormData();
        const data = e.target.files[0];
        const loginUser = S_Storage.getSession('loginUser');
        formData.append("imgFile", data, data.ame);
        this.$axios.post('/api/user/uploadPhoto/' + loginUser._id, formData)
          .then((response)=>{
            if (!response.status) {
              this.warning = response.msg;
              return;
            }
            S_Storage.setSession('loginUser', response.user);
            this.photoList = S_Storage.getSession('loginUser').photoList; // 更新数据
          });
      }
    },
    handleClose() {
      this.warning = '';
    },
  },
  components: {
    backBar,
    alert,
  }
}
</script>
<style lang="less">
</style>
