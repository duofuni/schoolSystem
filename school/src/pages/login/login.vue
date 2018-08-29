<template>
  <div class = "container login-container">
    <backBar :title = "title"></backBar>
    <img class = "login-icon" src = "static/images/login.png"/>
    <div class = "login-form">
      <form @submit.prevent = "login">
        <div class = "form-group">
          <label>账号:
            <input v-model = "user.account" type = "text" name = "username" placeholder = "请输入账号">
          </label>
        </div>
        <div class = "form-group">
          <label>密码:
            <input v-model = "user.password" type = "password" name = "password" placeholder = "请输入密码">
          </label>
        </div>
        <div class = "form-group warning" v-show = "warning">
         {{ warning }}
        </div>
        <div class = "form-group">
          <input class = "sub" value = "登录" type = "submit" name = "submit">
        </div>
        <router-link class = "register-btn f-r" tag = "span" to = "/register">注册</router-link>
      </form>
    </div>
    <div class = "alert mask" v-show = "successed">
      <div class = "alert-cont">
        <i style = "backgroundImage: url('static/images/login_success.png')"></i>
        <p>恭喜你，登陆成功！</p>
      </div>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import verify from '@/utils/verify/verify'
export default {
  data() {
    return {
      user:{
        account: '',
        password: ''
      },
      successed: false,
      title: '登陆',
      warning: ''
    }
  },
  created() {
    this.queryUsers()
  },
  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin
    }
  },
  methods: {
    queryUsers() {
      this.$axios.get('userData')
        .then((data) => {
          this.$store.commit("storageUsers", data.data)
        })
    },
    login() {
      this.warning = verify(this.user, this.warning)
      if (!this.warning) {
        this.$store.commit("verification", this.user)
        if (this.isLogin) {
          this.warning = ""
          this.successed = !this.successed
          setTimeout(() => {
            this.$router.push("/")
          }, 2000)
        } else {
          this.warning = "账号或密码不正确"
        }
      }
    }
  },
  components: {
    backBar
  }
}
</script>
<style lang = "less">

</style>
