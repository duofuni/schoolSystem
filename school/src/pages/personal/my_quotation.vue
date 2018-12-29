<template>
  <div class="quotation-container">
    <backBar :title="title"></backBar>
    <div class="quotation-header" style="backgroundImage: url('/static/images/classmate_record_bg.png')"></div>
    <div v-if="loginUser.message.length" class="quotation-list">
      <ul>
        <li v-for="(item,index) in loginUser.message" :key="index">
          <img :src="item.avatar" alt="">
          <div class="box">
            <h5>{{ item.name }}<i class="time f-r">{{ item.time }}</i></h5>
            <p class="text">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="blank f-l">留言为空...</div>
  </div>
</template>
<script>
import backBar from '@/components/back_bar'
import S_Storage from '@/utils/storage/session_storage'

export default {
  data() {
    return {
      title: '同学寄语',
    }
  },
  computed: {
    loginUser() {
      return S_Storage.getSession("loginUser");
    },
  },
  components: {
    backBar
  }
}
</script>
<style lang="less">

</style>
