<template>
  <div class="modifyPassword-container">
    <backBar :title="title"></backBar>
    <div class="modifyPassword-list">
      <form @submit.prevent="handleModifyPassword">
        <div class="form-group">
          <label>旧密码：</label>
          <input
            placeholder="请输入旧密码"
            v-model="passwords.originalPassword"
            type="password">
        </div>
        <div class="form-group">
          <label>新密码：</label>
          <input placeholder="请输入新密码" v-model="passwords.newPassword" type="password">
        </div>
        <div class="form-group">
          <label>确认密码：</label>
          <input placeholder="请输入确认密码" v-model="passwords.reNewPassword" type="password">
        </div>
        <div class="form-group">
          <input value="确定" type="submit" class="sub">
        </div>
      </form>
    </div>
    <alert :warning="warning" @off="handleClose"></alert>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'
import alert from '@/components/alert'
import { required, sameAs } from 'vuelidate/lib/validators';
const mustBePassword = value => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(value);

export default {
  data() {
    return {
      title: '修改密码',
      passwords: {
        originalPassword: '',
        newPassword: '',
        reNewPassword: '',
      },
      warning: '',
      time: 3,
    }
  },
  validations: {
    passwords: {
      originalPassword: {
        mustBePassword,
      },
      newPassword: {
        mustBePassword,
      },
      reNewPassword: {
        mustBePassword,
        sameAsPassword: sameAs('newPassword'),
      },
    },
  },
  computed: {
    loginUser() {
      return S_Storage.getSession('loginUser');
    },
  },
  created() {
  },
  methods: {
    handleModifyPassword() {
      this.$v.passwords.$touch();
      if (this.$v.passwords.originalPassword.$error) {
        this.warning = '请输入正确旧密码！';
        return;
      } else if (this.$v.passwords.newPassword.$error) {
        this.warning = '请输入6〜14位的字母或数字与字母组合的新密码！';
        return;
      } else if (this.$v.passwords.reNewPassword.$error) {
        this.warning = '两次密码不一致！';
        return;
      }
      this.$axios.put('/api/resetPassword/' + this.loginUser._id, this.passwords)
        .then((data) => {
          console.log(data);
          if (!data.status) {
            this.warning = '请输入正确旧密码！';
            return;
          }
          sessionStorage.removeItem('x_access_token');
          S_Storage.clearSession('loginUser');
          let timer = setInterval(() => {
            this.warning = `密码修改成功！${this.time}秒后请从新登录`;
            this.time -= 1;
            if (this.time <= -2) {
              clearInterval(timer);
              this.$router.push('/');
            }
          }, 1000);
        });
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
