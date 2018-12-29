<template>
  <div class="personal-container">
    <backBar :title="title"></backBar>
    <div class="detail-header" style="backgroundImage: url('/static/images/personal_banner.png')">
      <div class="head" v-if="token">
        <img @click="handleOperation" :src="url" alt="">
        <i>{{ myInfo.name }}</i>
      </div>
      <button @click="handelLogOut" class="quit">退出</button>
    </div>
    <div class="personal-body">
      <router-link
      v-for="(item,index) in personalList"
      :key="index"
      :to="'/' + item.path">
        <i
        :style="{ backgroundImage: 'url(/static/images/' + item.img + '.png)' }"
        ></i>
        <span>{{ item.text }}</span>
      </router-link>
    </div>
    <alert :warning="warning" @off="handleClose"></alert>
    <operatingAvatar
      @updateAvatar="handleUpdateAvatar"
      :ShowAvatar="ShowAvatar"
      :url="url"
      @off="handleCancel"></operatingAvatar>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import alert from '@/components/alert'
import operatingAvatar from '@/components/operating_avatar'
import S_Storage from '@/utils/storage/session_storage'

export default {
  data() {
    return {
      title: '个人中心',
      personalList: [
        { img: 'myInfo', text: '用户信息', path: 'myInfo' },
        { img: 'myPhotos', text: '我的相册', path: 'myPhotos' },
        { img: 'myMessage', text: '同学留言', path: 'myQuotation' },
        { img: 'modifyPassword', text: '修改密码', path: 'modifyPassword' },
      ],
      ShowAvatar: false,
      warning: '',
      time: 3,
      myInfo: S_Storage.getSession('loginUser'),
    }
  },
  computed: {
    url() {
      const avatar = this.myInfo.avatar;
      return avatar ? avatar : '/static/images/avatar.png';
    },
    token() {
      return sessionStorage.getItem('x_access_token');
    },
  },
  methods: {
    handelLogOut() {
      sessionStorage.removeItem('x_access_token');
      S_Storage.clearSession('loginUser');
      let timer = setInterval(() => {
        this.warning = `您已退出！${this.time}秒后跳转到首页`;
        this.time -= 1;
        if (this.time <= -2) {
          clearInterval(timer);
          this.$router.push('/');
        }
      }, 1000);
    },
    handleClose() {
      this.warning = '';
    },
    handleCancel() {
      this.ShowAvatar = !this.ShowAvatar;
    },
    handleUpdateAvatar(event) {
      this.myInfo.avatar = event;
    },
    handleOperation() {
      this.ShowAvatar = !this.ShowAvatar;
    },
  },
  components: {
    backBar,
    alert,
    operatingAvatar,
  },
}
</script>
<style lang="less">

</style>
