<template>
  <div v-if="classmateInfo.photoList" class="photoDetail-container">
    <backBar :title="title"></backBar>
    <img @click="next" :src="src" alt="">
  </div>
</template>
<script>
import backBar from '@/components/backBar'
export default {
  data() {
    return {
      itemId:this.$route.query.itemId,
      group:this.$route.query.group,
      id:this.$route.query.id,
    }
  },
  computed:{
    classmateInfo(){
      return this.$store.getters.getClassmateInfo
    },
    title(){
      return this.classmateInfo.photoList[this.group].time
    },
    src(){
      return this.classmateInfo.photoList[this.group].photos[this.id]
    }
  },
  created(){
    this.qustClassmate()
  },
  methods:{
    qustClassmate(){
      this.$axios.get('userData/'+this.itemId)
        .then((data)=>{
          this.$store.commit('storageClassmate',data.data)
        })
    },
    next(){
      if(this.id<this.classmateInfo.photoList[this.group].photos.length-1){
        this.id+=1
      }
    }
  },
  components:{
    backBar
  }
}
</script>
<style lang="less">
</style>