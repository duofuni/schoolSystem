<template>
  <div class="classmateRecord-container">   
    <backBar :title="title"></backBar>
    <div class="prompt">可爱的童鞋们!</div>
    <div class="classmateRecord">
      <ul>
        <router-link 
        v-for="(item,index) in userData"        
        :to="{path:'detail/',query:{id:index+1}}" 
        tag="li" 
        :key="index">
          <img v-if="!item.personalInfo.photo" src="/static/images/photo.png" alt="">
          <img v-else :src="item.personalInfo.photo" alt="">
          <i :class="{tag:item.tag}">{{item.tag}}</i>
          <h5>{{item.personalInfo.name}}</h5>
        </router-link>
      </ul>
    </div> 
    <div class="prompt">点击头像可以看她哦~~</div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
export default {
  data() {
    return {
      userData:[],
      title:'同学录',
    }
  },
  created(){
    this.queryUserData()
  },
  methods:{
    queryUserData(){
      this.$axios.get('/userData')
        .then((data)=>{
          this.userData=data.data
        })
    }
  },
  components:{
    backBar
  }
}
</script>
<style lang="less">
</style>