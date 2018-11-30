<template>
  <div class="nav-container">
    <ul>
      <li
        class="f-l"
        v-for="(item,index) in imgUrl.length"
        :key="index">
        <router-link :to="'/'+imgUrl[index].icon">
          <i
            :style="{backgroundImage:'url(static/images/'+ imgUrl[index].icon + '.png)'}"></i>
          <span>{{imgUrl[index].name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: [
        {icon: 'schoolIntro', name: '学校'},
        {icon: 'videos', name: '视频'},
        {icon: 'teacherRecord', name: '老师录'},
        {icon: 'classmateRecord', name: '同学录'},
        {icon: 'classPhotos', name: '班级相册'},
        {icon: 'myQuotation', name: '同学寄语'},
        {icon: 'location', name: '我的位置'},
        {icon: 'personal', name: '个人中心'},
      ],
    }
  },
}
</script>
<style lang="less">
</style>
