<template>
  <div class="personalInfo-container">
    <backBar :title="title"></backBar>
    <div class="personalInfo-list">
      <form @submit.prevent="handlePreservation">
        <div class="form-group">
          <label>姓名：</label>
          <input v-model="editUser.name" type="text" readonly="readonly">
        </div>
        <div class="form-group">
          <label>账号：</label>
          <input v-model="editUser.account" type="text" readonly="readonly">
        </div>
        <div class="form-group sex">
          <span>性别：</span>
          <label>男</label>
          <input v-model="editUser.sex" name="sex" type="radio" value="男">
          <label>女</label>
          <input v-model="editUser.sex" name="sex" type="radio" value="女">
        </div>
        <div class="form-group">
          <label>手机：</label>
          <input v-model="editUser.phone" type="text">
        </div>
        <div class="form-group">
          <label>QQ：</label>
          <input v-model="editUser.qq" type="text">
        </div>
        <div class="form-group">
          <label>微信：</label>
          <input v-model="editUser.weChat" type="text">
        </div>
        <div class="form-group">
          <label>星座：</label>
          <span class="constellation">
            <select v-model="editUser.constellation">
              <option
                v-for="(item,index) in constellationList"
                :key="index"
                :value="item.value">{{ item.label }}</option>
            </select>
          </span>
        </div>
        <div class="form-group">
          <label>爱好：</label>
          <textarea v-model="editUser.hobby"></textarea>
        </div>
        <div class="form-group">
          <label>特长：</label>
          <textarea v-model="editUser.speciality"></textarea>
        </div>
        <div class="form-group">
          <label>地址：</label>
          <textarea v-model="editUser.address"></textarea>
        </div>
        <div class="form-group">
          <input type="submit" class="sub" value="保存">
        </div>
      </form>
    </div>
    <alert :warning="warning" @off="handleClose"></alert>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import S_Storage from '@/utils/storage/session_storage'
import alert from '@/components/alert'

export default {
  data() {
    return {
      title: '个人信息',
      phoneRegExp: /^(13|15|17|18)\d{9}$/,
      constellationList: [],
      warning: '',
    }
  },
  computed: {
    editUser() {
      return S_Storage.getSession('loginUser');
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
    handlePreservation() {
      if (!this.phoneRegExp.test(this.editUser.phone)) {
        this.warning = '请填写有效的手机号码！';
      } else {
        this.$axios.put('/api/user/' + this.editUser._id, this.editUser)
          .then((data) => {
            if (!data.status) {
              this.warning = data.msg;
              sessionStorage.removeItem('x_access_token');
              S_Storage.clearSession('loginUser');
              setTimeout(() => {
                this.$router.push('/login');
              }, 1000);
              return;
            }

            S_Storage.setSession('loginUser', data.user);
            this.warning = '信息修改成功！';
            setTimeout(() => {
              this.$router.push('/personal');
            }, 1200);
          });
      }
    },
    handleClose() {
      this.warning = "";
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
