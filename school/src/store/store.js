import Vue from 'vue'
import Vuex from 'vuex'
import S_Storage from '@/utils/storage/sessionStorage'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    users:[],
    userInfo:[],
    classmateInfo:[],
    isLogin:false
  },
  getters:{
    getIsLogin:(state)=>state.isLogin,
    getUserInfo:(state)=>state.userInfo,
    getClassmateInfo:(state)=>state.classmateInfo
  },
  mutations:{
    storageClassmate(state,data){
      state.classmateInfo=data
    },
    storageUsers(state,data){
      state.users=data
    },
    verification(state,data){
      let arr=[]
      arr=state.users.filter((item)=>{
        return item.personalInfo.account==data.account&&item.personalInfo.password==data.password
      })
      if(arr.length>0){
        state.isLogin=true
        S_Storage.setSession("userInfo",arr[0])
        S_Storage.setSession("isLogin",true)
      }else{
        state.isLogin=false
      }
    },
    modifyPassword(state){
      S_Storage.clearSession("userInfo")
      S_Storage.setSession("isLogin",false)
    },
    modifyUserInfo(state,data){
      S_Storage.setSession("userInfo",data)
    },
    sessionStorage(state,data){
      state.isLogin=!state.isLogin
      state.userInfo=data
    }
  },
  actions:{

  }
})

export default store