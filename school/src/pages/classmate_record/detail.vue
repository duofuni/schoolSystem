<template>
  <div class="classmate-record-container">
    <backBar :title="title"></backBar>
    <div class="detail-header" style="backgroundImage: url('/static/images/classmate_record_bg.png')">
      <div class="head" v-if="detail">
        <img :src="url" alt=""/>
        <i>{{ detail.name }}</i>
      </div>
    </div>
    <nav>
      <ul>
        <li
          v-for="(item,index) in nav"
          :key="index"
          :class="{ active: currIndex === index }"
          @click="handleControl(index)">{{ item.title }}</li>
        <router-link
          tag="li"
          :to="{ path:'/release', query: { id: this.id } }">写同学录</router-link>
      </ul>
    </nav>
    <div class="cont">
      <ul :style="left" class="slide-ul" v-if="detail.photoList">
        <li class="my-photos f-l">
          <div
            v-for="(item,index1) in detail.photoList"
            :key="index1"
            class="photo-item">
            <i>{{ item.time }}</i>
            <router-link
              v-for="(photo,index2) in item.photos"
              :key="index2"
              :to="{ path:'/photo_detail/', query: { itemId: id, group: index1, id: index2 } }">
                <img :src="photo"/>
            </router-link>
          </div>
          <div class="blank f-l" v-if="!detail.photoList.length">相册为空...</div>
        </li>
        <li class="my-info f-l">
          <div>
            <h4>{{ detail.name }}</h4>
            <i :class="{ tag1: detail.tag, 'f-r': true }">{{ detail.tag }}</i>
          </div>
          <div><span>QQ号码：</span>{{ detail.qq }}</div>
          <div><span>微信号码：</span>{{ detail.weChat }}</div>
          <div><span>手机号码</span>{{ detail.phone }}</div>
          <div><span>星座：</span>{{ detail.constellation }}</div>
          <div><span>地址：</span>{{ detail.address }}</div>
          <div><span>爱好：</span>{{ detail.hobby }}</div>
          <div><span>特长：</span>{{ detail.speciality }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import S_Storage from '@/utils/storage/session_storage'

export default {
  data() {
    return {
      title: '主页',
      id: this.$route.query.id,
      nav: [
        {title: '我的相册'},
        {title: '个人信息'}
      ],
      detail: {},
      left: 'left: 0%;',
      currIndex: 0,
    }
  },
  created() {
    this.qustDetail();
  },
  computed: {
    url() {
      const avatar = S_Storage.getSession('classmateInfo').avatar;
      // console.log(S_Storage.getSession('classmateInfo'));
      return avatar ? avatar : '/static/images/avatar.png';
    },
  },
  methods: {
    qustDetail() {
      this.$axios.get('/api/classmateDetail/' + this.id)
        .then((data) => {
          this.detail = data.user;
          S_Storage.setSession('classmateInfo', data.user)
        });
    },
    handleControl(i) {
      this.currIndex = i;
      if (i == 1) {
        this.left = 'left: -100%;';
      } else {
        this.left = 'left:0%;';
      }
    }
  },
  components: {
    backBar,
  },
}
</script>
<style lang="less">
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
