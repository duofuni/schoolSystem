<template>
  <div class="release-container">
    <backBar :title="title"></backBar>
    <h5 class="title">发布同学录</h5>
    <div class="release">
      <form @submit.prevent="postRelease">
        <div class="form-group">
          <textarea v-model="text" placeholder="请输入留言录内容" maxlength="500"></textarea>
          <label><i>{{text.length}}/500</i></label>
        </div>
        <div class="form-group">
          <input class="sub" value="确定" type="submit">
        </div>
      </form>
    </div>
  </div>
</template> 
<script>
import backBar from './backBar'
import S_Storage from '@/utils/storage/sessionStorage'
export default {
  data() {
    return {
      title:'美好回忆',
      text:'',
      id:this.$route.query.id,
      info:{}
    }
  },
  computed:{

  },
  created(){
    this.qustInfo()
  },
  methods:{
    qustInfo(){
      this.$axios.get('userData/'+this.id)
        .then((data)=>{
          this.info=data.data
        })
    },
    postRelease(){
      var date = new Date()
      let arr={
          "name":S_Storage.getSession("userInfo").personalInfo.name,
          "photo":S_Storage.getSession("userInfo").personalInfo.photo,
          "time":date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
          "text":this.text
        }
      this.info.message.push(arr)
      this.$axios.put('userData/'+this.id,this.info)
        .then((data)=>{
          this.$router.go(-1)
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