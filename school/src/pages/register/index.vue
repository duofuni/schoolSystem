<template>
  <div class="register-container">
    <backBar :title="title"></backBar>
    <div class="register-form">
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label><i>*</i>姓名：</label>
          <input v-model="user.name" type="text" placeholder="请输入你的姓名">
        </div>
        <div class="form-group">
          <label><i>*</i>账号：</label>
          <input v-model="user.account" type="text" placeholder="请输入你的账号">
        </div>
        <div class="form-group">
          <label><i>*</i>密码：</label>
          <input v-model="user.password" type="password" placeholder="请输入你的密码">
        </div>
        <div class="form-group sex">
          <span><i>*</i>性别：</span>
          <label>男</label>
          <input v-model="user.sex" type="radio" name="sex" value="男">
          <label>女</label>
          <input v-model="user.sex" type="radio" name="sex" value="女">
       </div>
        <div class="form-group">
          <label><i>*</i>电话：</label>
          <input v-model="user.phone" type="text" placeholder="请输入你的电话">
        </div>
        <div class="form-group">
          <label>微信：</label>
          <input v-model="user.weChat" type="text" placeholder="请输入你的微信">
        </div>
        <div class="form-group">
          <label>QQ：</label>
          <input v-model="user.qq" type="text" placeholder="请输入你的QQ">
        </div>
        <div class="form-group">
          <label>住址：</label>
          <textarea placeholder="请输入你的住址" v-model="user.address" maxlength="500"></textarea>
        </div>
        <div class="form-group">
          <label>星座：</label>
          <span class="constellation">
            <select v-model="user.constellation">
              <option 
                v-for="(item,index) in constellationList"
                :key="index"
                :value="item.value">{{ item.label }}</option>
            </select>
          </span>
        </div>
        <div class="form-group">
          <label>爱好：</label>
          <textarea v-model="user.hobby" maxlength="500" placeholder="请输入你的爱好"></textarea>
        </div>
        <div class="form-group">
          <label>特长：</label>
          <textarea v-model="user.speciality" maxlength="500" placeholder="请输入你的特长"></textarea>
        </div>
        <div class="form-group register">
          <input class="sub" type="submit">
        </div>
      </form>
    </div>
    <alert :warning="warning" @off="handleClose"></alert>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import alert from '@/components/alert'
import { required } from 'vuelidate/lib/validators';

const mustBePassword = value => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(value);
const mustBeAccount = value => /^[a-zA-z]\w{3,15}$/.test(value);
const mustBeChinese = value => /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(value);
const mustBePhone = value => /^(13|15|17|18)\d{9}$/.test(value);

export default {
  data() {
    return {
      title: '注册',
      user: {
        name: '',
        avatar: '',
        account: '',
        password: '',
        sex: '',
        phone: '',
        weChat: '',
        qq: '',
        address: '',
        constellation: '0',
        hobby: '',
        speciality: '',
        photoList: [],
        message: [],
      },
      warning: '',
      time: 3,
      constellationList: [],
    }
  },
  validations: {
    user: {
      name: {
        mustBeChinese,
      },
      account: {
        mustBeAccount,
      },
      password: {
        mustBePassword,
      },
      sex: {
        required,
      },
      phone: {
        mustBePhone,
      },
    },
  },
  created() {
    this.queryConstellationList();
  },
  methods: {
    queryConstellationList() {
      this.$axios.get('/api/constellation')
        .then((data) => {
          this.constellationList = data;
        });
    },
    handleRegister() {
      this.$v.user.$touch();
      if (this.$v.user.name.$error) {
        this.warning = '请输入正确姓名！';
        return;
      } else if (this.$v.user.account.$error) {
        this.warning = '请输入4〜14位由字母开头、数字、下划线组成的账号！';
        return;
      } else if (this.$v.user.password.$error) {
        this.warning = '请输入6〜14位的字母或数字与字母组合的密码！';
        return;
      } else if (this.$v.user.sex.$error) {
        this.warning = '请填写性别！';
        return;
      } else if (this.$v.user.phone.$error) {
        this.warning = '请填写有效的手机号码！';
        return;
      }
      this.$axios.post('/api/register', this.user)
        .then((data) => {
          let timer = setInterval(() => {
            this.warning = `注册成功！${this.time}秒后跳转到登陆页`;
            this.time -= 1;
            if (this.time == - 2) {
              clearInterval(timer);
              this.$router.go(-1);
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
  },
}
</script>
<style lang="less">

</style>
