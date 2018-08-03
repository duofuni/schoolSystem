<template>
  <div class="personal-container">
    <backBar :title="title"></backBar>
    <div class="detail-header" style="backgroundImage:url('/static/images/personal_banner.png')">
      <div class="head" v-if="isLogin">
        <img :src="myInfo.personalInfo.photo" alt="">
        <i>{{myInfo.personalInfo.name}}</i>
      </div>
      <button @click="quit" class="quit">退出</button>
    </div>
    <div class="personal-body">
      <router-link 
      v-for="(item,index) in personalList" 
      :key="index"
      :to="'/'+item.path">
        <i 
        :style="{backgroundImage:'url(/static/images/'+item.img+'.png)'}"
        ></i>
        <span>{{item.text}}</span>        
      </router-link>
    </div>
    <alert :warning="warning" @off="close"></alert>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import alert from '@/components/alert'
import S_Storage from '@/utils/storage/sessionStorage'
export default {
  data() {
    return {
      title:'个人中心',
      personalList:[
        {img:'myInfo',text:'用户信息',path:'myInfo'},
        {img:'myPhotos',text:'我的相册',path:'myPhotos'},
        {img:'myMessage',text:'同学留言',path:'myQuotation'},
        {img:'modifyPassword',text:'修改密码',path:'modifyPassword'}
      ],
      warning:'',
      time:3
    }
  },
  computed:{
    myInfo(){
      return S_Storage.getSession("userInfo")
    },
    isLogin(){
      return S_Storage.getSession("isLogin")
    }
  },
  created(){
  },
  methods:{
    quit(){
      S_Storage.clearSession('userInfo')
      let timer=setInterval(()=>{
        this.warning=`退出成功！${this.time}秒后跳转到首页`
        this.time-=1
        if(this.time<=-2){
          clearInterval(timer)
          S_Storage.setSession('isLogin',false)
          this.$router.push('/')            
        }
      },1000)
    },
    close(){
      this.warning=''
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