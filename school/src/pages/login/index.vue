<template>
  <div class="container login-container">
    <backBar :title="title"></backBar>
    <div class="login-form">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>账号:
            <input v-model="user.account" type="text" name="username" placeholder="请输入账号">
          </label>
        </div>
        <div class="form-group">
          <label>密码:
            <input v-model="user.password" type="password" name="password" placeholder="请输入密码">
          </label>
        </div>
        <div class="form-group warning" v-show="warning">
         {{ warning }}
        </div>
        <div class="form-group">
          <input class="sub" value="登录" type="submit" name="submit">
        </div>
        <router-link class="register-btn f-r" tag="div" to="/register">注册</router-link>
      </form>
    </div>
    <div class="alert mask" v-show="successed">
      <div class="alert-cont">
        <i style="backgroundImage: url('static/images/login_success.png')"></i>
        <p>恭喜你，登陆成功！</p>
      </div>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import S_Storage from '@/utils/storage/session_storage'

const mustBePassword = value => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(value);
const mustBeAccount = value => /^[a-zA-z]\w{3,15}$/.test(value);

export default {
  name: 'Login',
  data() {
    return {
      user: {
        account: '',
        password: '',
      },
      successed: false,
      title: '登陆',
      warning: '',
    }
  },
  validations: {
    user: {
      account: {
        mustBeAccount,
      },
      password: {
        mustBePassword,
      },
    },
  },
  methods: {
    handleLogin() {
      this.$v.user.$touch();
      if (this.$v.user.account.$error) {
        this.warning = '请输入4〜14位由字母开头、数字、下划线组成的账号！';
        return;
      } else if (this.$v.user.password.$error) {
        this.warning = '请输入6〜14位的字母或数字与字母组合的密码！';
        return;
      }
      this.$axios.post('/api/login', this.user)
        .then((data) => {
          console.log(data);
          switch (data.status) {
            case 404:
              this.warning = "账号不存在！";
              return
              break;
            case 0:
              this.warning = "密码错误！";
              return
              break;
            case 401:
              this.warning = "没有权限！";
              return
              break;
            default:
          };
          this.warning = "";
          this.successed = !this.successed;
          sessionStorage.setItem('x_access_token', data.token); // 存储token
          S_Storage.setSession('loginUser', data.user);
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        });
    },
  },
  components: {
    backBar,
  },
}
</script>
<style lang="less">

</style>
