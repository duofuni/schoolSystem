<template>
  <div class="classmateRecord-container">
    <backBar :title="title"></backBar>
    <div class="prompt">可爱的童鞋们!</div>
    <div class="classmateRecord">
      <ul>
        <router-link
          v-for="( item, index ) in userData"
          :to="{ path:'detail/', query: { id: item._id } }"
          tag="li"
          :key="index">
          <img
            :src="item.avatar ? item.avatar : '/static/images/avatar.png'"
            alt="">
          <i :class="{ tag:item.tag }">{{ item.tag }}</i>
          <h5>{{ item.name }}</h5>
        </router-link>
      </ul>
    </div>
    <div class="prompt">点击头像可以看她哦~~</div>
  </div>
</template>
<script>
import backBar from '@/components/backBar'
import S_Storage from '@/utils/storage/sessionStorage'

export default {
  data() {
    return {
      userData: [],
      title: '同学录',
      id: S_Storage.getSession('loginUser')._id,
    }
  },
  created() {
    this.queryUserData();
  },
  methods: {
    queryUserData() {
      this.$axios.get('/api/users')
        .then((data) => {
          data.forEach((item, index) => {
            if (item._id == this.id) {
              data.splice(index, 1);
            }
          })
          this.userData = data;
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
