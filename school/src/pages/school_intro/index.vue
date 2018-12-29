<template>
  <div class="schoolIntro-container">
    <backBar :title="title"></backBar>
    <carousel></carousel>
    <div class="introTitle">桐梓县荣兴中学</div>
    <div class="intro">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;桐梓县荣兴中学是一所大型民办公助高级中学。坐落于桐梓县城内，前临凤鸣山，背靠溱溪河，环境优美，交通方便。学校距离重庆180公里，距离贵阳190公里，距离遵义51公里。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学校由贵州省荣兴集团出资8000余万元，于二0 0一年七月修建完工，并于当年八月正式投入使用。学校占地面积60余亩，建筑面积37000平米。拥有两幢教学大楼，60间宽大明亮的教室，二幢综合大楼，三间物理实验室，三间化学实验室，两间生物实验室，两间多媒体阶梯大教室，以及微机教室，图书馆，服务中心学校餐饮大楼可容纳2000多名师生同时就餐，学生宿舍大楼可容纳5000名学生住宿。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学校运动场地有：6个篮球场，一个足球场，200环形跑道等，均为全塑胶铺垫。其他设施如标准乒乓球台，羽毛球场，单，双杠等，为全体师生提供良好的学习生活环境</p>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import carousel from '@/components/carousel'
import iscrollView from 'vue-iscroll-view'

export default {
  data() {
    return {
      title: '学校简介',
    }
  },
  components: {
    backBar,
    carousel,
  }
}
</script>
<style lang="less">
</style>
