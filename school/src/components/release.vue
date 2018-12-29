<template>
  <div class="release-container">
    <backBar :title="title"></backBar>
    <h5 class="title">发布同学录</h5>
    <div class="release">
      <form @submit.prevent="handlePostRelease">
        <div class="form-group">
          <div class="warning" v-if="$v.text.$error">内容不能为空！</div>
          <textarea v-model="text" placeholder="请输入留言录内容" maxlength="500"></textarea>
          <label><i>{{text.length}}/500</i></label>
        </div>
        <div class="form-group">
          <input class="sub" value="确定" type="submit">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import backBar from './back_bar'
import S_Storage from '@/utils/storage/session_storage'
import getTime from '@/utils/date/get_time'
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      title: '美好回忆',
      text: '',
      id: this.$route.query.id,
    }
  },
  validations: {
    text: {
      required,
    },
  },
  computed: {
    loginUser() {
      return S_Storage.getSession('loginUser');
    },
    classmateInfo() {
      return S_Storage.getSession('classmateInfo');
    },
  },
  methods:{
    handlePostRelease() {
      this.$v.text.$touch();
      if (this.$v.text.$error) {
        return;
      }

      let release = {
        'name': this.loginUser.name, 
        'avatar': this.loginUser.avatar,
        'time': getTime(),
        'text': this.text,
      };
      this.classmateInfo.message.push(release);
      this.$axios.put('/api/user/' + this.classmateInfo._id, this.classmateInfo)
        .then((data) => {
          this.$router.go(-1);
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
