<template>
  <div class="loginBar-container">
    <span class="text-ellipsis">桐梓县荣兴中学</span>
    <span class="text-ellipsis">高三一班</span>
    <router-link v-if="!isLogin" class="login-btn" to="/login">登录</router-link>
    <router-link v-else class="login-btn" to="/personal">
      <span v-if="userInfo">{{userInfo.personalInfo.name}}</span>
    </router-link>
  </div>
</template>
<script>
import S_Storage from '@/utils/storage/sessionStorage'
export default {
  data() {
    return {
    }
  },
  created(){
  },
  computed:{
    isLogin(){
      return S_Storage.getSession("isLogin")
    },
    userInfo(){
      return S_Storage.getSession("userInfo")
    }
  },
  methods:{
  }
}
</script>
<style lang="less">
</style>