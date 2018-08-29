<template>
  <div class = "register-container">
    <backBar :title = "title"></backBar>
    <div class = "register-form">
      <form @submit.prevent = "register">
        <div class = "form-group">
          <label><i>*</i>姓名：</label><input v-model = "user.personalInfo.name" type = "text" placeholder = "请输入你的姓名">
        </div>
        <div class = "form-group">
          <label><i>*</i>账号：</label><input v-model = "user.personalInfo.account" type = "text" placeholder = "请输入你的账号">
        </div>
        <div class = "form-group">
          <label><i>*</i>密码：</label><input v-model = "user.personalInfo.password" type = "password" placeholder = "请输入你的密码">
        </div>
        <div class = "form-group sex">
          <span><i>*</i>性别：</span>
          <label>男</label><input v-model = "user.personalInfo.sex" type = "radio" name = "sex" value = "男">
          <label>女</label><input v-model = "user.personalInfo.sex" type = "radio" name = "sex" value = "女">
       </div>
        <div class = "form-group">
          <label><i>*</i>电话：</label><input v-model = "user.personalInfo.phone" type = "text" placeholder = "请输入你的电话">
        </div>
        <div class = "form-group">
          <label>微信：</label><input v-model = "user.personalInfo.weChat" type = "text" placeholder = "请输入你的微信">
        </div>
        <div class = "form-group">
          <label>QQ：</label><input v-model = "user.personalInfo.QQ" type = "text" placeholder = "请输入你的QQ">
        </div>
        <div class = "form-group">
          <label>住址：</label><textarea placeholder = "请输入你的住址" v-model = "user.personalInfo.address" maxlength = "500"></textarea>
        </div>
        <div class = "form-group">
          <label>星座：</label>
          <span class = "constellation">
            <select v-model = "user.personalInfo.constellation">
              <option v-for = "(item,index) in constellationList" :key = "index" :value = "item.value">{{ item.label }}</option>
            </select>
          </span>
        </div>
        <div class = "form-group">
          <label>爱好：</label><textarea v-model = "user.personalInfo.hobby" maxlength = "500" placeholder = "请输入你的爱好"></textarea>
        </div>
        <div class = "form-group">
          <label>特长：</label><textarea v-model = "user.personalInfo.speciality" maxlength = "500" placeholder = "请输入你的特长"></textarea>
        </div>
        <div class = "form-group register">
          <input class = "sub" type = "submit">
        </div>
      </form>
    </div>
    <alert :warning = "warning" @off = "close"></alert>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import alert from '@/components/alert'
import verify from '@/utils/verify/verify'
export default {
  data() {
    return {
      title: '注册',
      user: {
        personalInfo: {
          name: "",
          photo: "",
          account: "",
          password: "",
          sex: "",
          phone: "",
          weChat: "",
          QQ: "",
          address: "",
          constellation: "0",
          hobby: "",
          speciality: "",
        },
        photoList: [],
        tag: '',
        message: []
      },
      warning: '',
      time: 3,
      constellationList: []
    }
  },
  created(){
    this.queryConstellationList()
  },
  methods:{
    queryConstellationList(){
      this.$axios.get('constellationList')
        .then((data) => {
          this.constellationList = data.data
        })
    },
    register(){
      this.warning = verify(this.user.personalInfo, this.warning)
      if (!this.warning) {
        this.$axios.post('userData/', this.user)
          .then((data) => {
            let timer = setInterval(() => {
              this.warning = `注册成功！${this.time}秒后跳转到登陆页`
              this.time -= 1
              if (this.time == - 2) {
                clearInterval(timer)
                this.$router.go(-1)
              }
            }, 1000)
          })
      }
    },
    close(){
      this.warning = ''
    }
  },
  components:{
    backBar,
    alert
  }
}
</script>
<style lang = "less">

</style>
