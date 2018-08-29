<template>
  <div class = "modifyPassword-container">
    <backBar :title = "title"></backBar>
    <div class = "modifyPassword-list">
      <form @submit.prevent = "modifyPassword">
        <div class = "form-group">
          <label>旧密码：</label>
          <input placeholder = "请输入旧密码" v-model = "passwords.originalPassword" type = "password">
        </div>
        <div class = "form-group">
          <label>新密码：</label>
          <input placeholder = "请输入新密码" v-model = "passwords.newPassword" type = "password">
        </div>
        <div class="form-group">
          <label>确认密码：</label>
          <input placeholder = "请输入确认密码" v-model = "passwords.reNewPassword" type = "password">
        </div>
        <div class = "form-group">
          <input value = "确定" type = "submit" class = "sub">
        </div>
      </form>
    </div>
    <alert :warning = "warning" @off = "close"></alert>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'
import alert from '@/components/alert'
import verify from '@/utils/verify/verify'
export default {
  data() {
    return {
      title: '修改密码',
      passwords: {
        originalPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      regExp: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/,
      warning: '',
      time: 3
    }
  },
  computed: {
    userInfo() {
      return S_Storage.getSession("userInfo")
    }
  },
  created() {
  },
  methods: {
    modifyPassword() {
      this.warning = verify(this.passwords)
      if (!this.warning) {
        let oldPassword = this.userInfo.personalInfo.password
        let id = this.userInfo.id
        if (this.passwords.originalPassword==oldPassword) {
          this.userInfo.personalInfo.password = this.passwords.newPassword
          this.$axios.put('userData/' + id, this.userInfo)
            .then((data) => {
              this.$store.commit("modifyPassword")
              let timer = setInterval(() => {
                this.warning = `密码修改成功！${this.time}秒后请从新登录`
                this.time -= 1
                if (this.time <= -2) {
                  clearInterval(timer)
                  this.$router.push('/')
                }
              }, 1000)
            })
        } else {
          this.warning = "旧密码不存在！"
        }
      }
    },
    close() {
      this.warning = ''
    }
  },
  components: {
    backBar,
    alert
  }
}
</script>
<style lang = "less">

</style>
