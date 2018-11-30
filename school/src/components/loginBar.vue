<template>
  <div class="loginBar-container">
    <span class="text-ellipsis">桐梓县荣兴中学</span>
    <span class="text-ellipsis">高三一班</span>
    <router-link v-if="!token" class="login-btn" to="/login">登录</router-link>
    <router-link v-else class="login-btn" to="/personal">
      <span v-if="loginUser">{{loginUser.name}}</span>
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
  created() {
  },
  computed:{
    token() {
      return sessionStorage.getItem('x_access_token');
    },
    loginUser() {
      return S_Storage.getSession('loginUser');
    },
  },
  methods: {
  },
}
</script>
<style lang="less">
</style>
