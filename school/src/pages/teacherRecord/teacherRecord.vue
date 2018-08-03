<template>
  <div class="teacher-container">
    <backBar :title="title"></backBar>
    <div class="teacher-record">
      <ul>
        <li v-for="(item,index) in teacherRecord" :key="index">
          <div class="teacher-record-icon" :style="{backgroundImage:'url('+ item.photo + ')'}">
          </div>
          <div class="teacher-record-info">
            <p class="name">{{item.name}}<i>{{item.subject}}</i></p>
            <p>QQ：{{item.qq}}</p>
            <p>微信：{{item.wx}}</p>
            <p>手机：{{item.phone}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
export default {
  data() {
    return {
      teacherRecord:[
        {
          photo:'/static/images/photo.png',
          name:'王维蓉',
          subject:'数学',
          qq:'12345678',
          wx:'wangshuilan2011',
          phone:'18284080339'
        },    
        {
          photo:'/static/images/photo.png',
          name:'詹姆斯',
          subject:'英语',
          qq:'12345678',
          wx:'wangshuilan2011',
          phone:'18284080339'
        }      
      ],
      title:'教师录'
    }
  },
  components:{
    backBar
  }
}
</script>
<style lang="less">
</style>