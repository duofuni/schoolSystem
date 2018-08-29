<template>
  <div class = "classmateRecord-container">
    <backBar :title = "title"></backBar>
    <div class = "detail-header" style = "backgroundImage: url('/static/images/classmate_record_bg.png')">
      <div class = "head" v-if = "detail.personalInfo">
        <img :src = "detail.personalInfo.photo" />
        <i>{{ detail.personalInfo.name }}</i>
      </div>
    </div>
    <nav>
      <ul>
        <li
        v-for = "(item,index) in nav"
        :key = "index"
        :class = "{ active:currIndex === index }"
        @click = "control(index)"
        >{{ item.title }}</li>
        <router-link
        tag = "li"
        :to = "{ path:'/release', query: { id: this.id } }"
        >写同学录</router-link>
      </ul>
    </nav>
    <div class = "cont">
      <ul :style = "left" class = "slide-ul" v-if = "detail.photoList">
        <li class = "my-photos f-l">
          <div
          v-for = "(item,index1) in detail.photoList"
          :key = "index1"
          class = "photo-item">
            <i>{{ item.time }}</i>
            <router-link
            v-for = "(photo,index2) in item.photos"
            :key = "index2"
            :to = "{ path:'/photoDetail/', query: { itemId: id, group: index1, id: index2 } }">
              <img :src = "photo"/>
            </router-link>
          </div>
          <div class = "blank f-l" v-if = "!detail.photoList.length">相册为空...</div>
        </li>
        <li class = "my-info f-l">
          <div>
            <h4>{{ detail.personalInfo.name }}</h4>
            <i :class = "{ tag1: detail.tag, 'f-r': true }">{{ detail.tag }}</i>
          </div>
          <div><span>QQ号码：</span>{{ detail.personalInfo.QQ }}</div>
          <div><span>微信号码：</span>{{ detail.personalInfo.weChat }}</div>
          <div><span>手机号码</span>{{ detail.personalInfo.phone }}</div>
          <div><span>星座：</span>{{ detail.personalInfo.constellation }}</div>
          <div><span>地址：</span>{{ detail.personalInfo.address }}</div>
          <div><span>爱好：</span>{{ detail.personalInfo.hobby }}</div>
          <div><span>特长：</span>{{ detail.personalInfo.speciality }}</div>
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
      title: '主页',
      id: this.$route.query.id,
      nav: [
        { title: "我的相册" },
        { title: "个人信息" }
      ],
      detail: {},
      left: 'left: 0%;',
      currIndex: 0
    }
  },
  created() {
    this.qustDetail()
  },
  methods: {
    qustDetail() {
      this.$axios.get( 'userData/'+ this.id )
        .then((data) => {
          this.detail = data.data
        })
    },
    control(i) {
      this.currIndex = i
      if (this.left == 'left: 0%;' && i == 1) {
        this.left = 'left: -100%;'
      } else if (this.left == 'left: -100%;' && i == 0) {
        this.left = 'left:0%;'
      }
    }
  },
  computed: {
  },
  components: {
    backBar
  }
}
</script>
<style lang = "less">
.slide-enter-to {
  transition: all 400ms ease;
  transform: translateX(0%);
}

.slide-leave-active {
  transition: all 400ms ease;
  transform: translateX(-100%)
}

.slide-enter {
  transform: translateX(100%)
}

.slide-leave {
  transform: translateX(0%)
}

</style>
