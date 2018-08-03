<template>
  <div class="personalInfo-container">
    <backBar :title="title"></backBar>
    <div class="personalInfo-list">
      <form @submit.prevent="preservation">
        <div class="form-group">
          <label>姓名：</label>
          <input v-model="editUser.personalInfo.name" type="text" readonly="readonly">
        </div>
        <div class="form-group">
          <label>账号：</label>
          <input v-model="editUser.personalInfo.account" type="text" readonly="readonly">
        </div>
        <div class="form-group sex">
          <span>性别：</span>
          <label>男</label>
          <input v-model="editUser.personalInfo.sex" name="sex" type="radio" value="男">
          <label>女</label>
          <input v-model="editUser.personalInfo.sex" name="sex" type="radio" value="女">
        </div>
        <div class="form-group">
          <label>手机：</label>
          <input v-model="editUser.personalInfo.phone" type="text">
        </div>
        <div class="form-group">
          <label>QQ：</label>
          <input v-model="editUser.personalInfo.QQ" type="text">
        </div>
        <div class="form-group">
          <label>微信：</label>
          <input v-model="editUser.personalInfo.weChat" type="text">
        </div>
        <div class="form-group">
          <label>星座：</label>
          <span class="constellation">
            <select v-model="editUser.personalInfo.constellation">
              <option v-for="(item,index) in constellationList" :key="index" :value="item.value">{{item.label}}</option>
            </select>
          </span>
        </div>
        <div class="form-group">
          <label>爱好：</label>
          <textarea v-model="editUser.personalInfo.hobby"></textarea>
        </div>
        <div class="form-group">
          <label>特长：</label>
          <textarea v-model="editUser.personalInfo.speciality"></textarea>
        </div>
        <div class="form-group">
          <label>地址：</label>
          <textarea v-model="editUser.personalInfo.address"></textarea>
        </div>
        <div class="form-group">
          <input type="submit" class="sub" value="保存">
        </div>
      </form>
    </div>
    <alert :warning="warning" @off="close"></alert>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'
import alert from '@/components/alert'
export default {
  data() {
    return {
      title:'个人信息',
      // editUser:{},
      phoneRegExp:/^(13|15|17|18)\d{9}$/,
      constellationList:[],
      warning:''
    }
  },
  computed:{
    editUser(){
      return S_Storage.getSession("userInfo")
    }
  },
  created(){
    // this.questUser()
    this.queryConstellationList()
  },
  methods:{
    // questUser(){
    //   this.editUser=this.userInfo
    // },
    queryConstellationList(){
      this.$axios.get('constellationList')
        .then((data)=>{
          this.constellationList=data.data
        })
    },
    preservation(){
      if(!this.phoneRegExp.test(this.editUser.personalInfo.phone)){
        this.warning="请填写有效的手机号码！"
      }else{
        this.$axios.put('userData/'+this.editUser.id,this.editUser)
          .then((data)=>{
            this.$store.commit("modifyUserInfo",data.data) 
            this.warning="信息修改成功！"
            setTimeout(()=>{
              this.$router.push('/personal')
            },1200)
          })
      }
    },
    close(){
      this.warning=""
    }
  },
  components:{
    backBar,
    alert
  }
}
</script>
<style lang="less">

</style>