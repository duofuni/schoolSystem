<template>
  <swiper :options="swiperOption"  ref="mySwiper">
    <!-- 这部分放你要渲染的那些内容 -->
    <swiper-slide v-for="(item, index) in carousels" :key="index">
      <img :src="item" alt="">
    </swiper-slide>
    <!-- 这是轮播的小圆点 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import '../assets/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data() {
    return {
      carousels: [
        'http://pic2.ooopic.com/12/42/25/02bOOOPIC95_1024.jpg',
        'http://img3.imgtn.bdimg.com/it/u=2687172757,261921406&fm=27&gp=0.jpg',
        'http://pic1.16pic.com/00/04/78/16pic_478386_b.jpg',
      ],
      swiperOption: {
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: 2000,
      },
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
}
</script>
<style lang="less">
</style>
