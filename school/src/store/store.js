import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import S_Storage from '@/utils/storage/sessionStorage'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    users:[],
    userInfo:[],
    classmateInfo:[],
    uploadState:0,
    isLogin:false
  },
  getters:{
    getIsLogin:(state)=>state.isLogin,
    getUserInfo:(state)=>state.userInfo,
    getClassmateInfo:(state)=>state.classmateInfo,
    getUploadState:(state)=>state.uploadState
  },
  mutations:{
    updateData(state){
      state.userInfo=S_Storage.getSession("userInfo")
    },
    uploadPhoto(state,data){
      let _info=S_Storage.getSession("userInfo")
      let falg=true
      if(_info.photoList.length){
        _info.photoList.forEach((item,index) =>{
          if(item.time==data.time){//日期相同
            item.photos=[].concat(item.photos,data.url)    
            falg=false
          } 
        })
      }
      if(!_info.photoList.length||falg){//相册为空时
        _info.photoList.push({
          time:data.time,
          photos:[].concat(data.url)
        })  
      }
      const config={
        onUploadProgress: progressEvent => {
          const complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          state.uploadState=complete
        }
      }
      axios.put('userData/'+_info.id,_info,config)
        .then((res)=>{
          S_Storage.setSession("userInfo",res.data)
          state.userInfo=res.data
        })
    },
    updateHeadImg(state,data){
      let _info=S_Storage.getSession("userInfo")
      _info.personalInfo.photo=data
      axios.put('userData/'+_info.id,_info)
        .then((res)=>{
          S_Storage.setSession("userInfo",res.data)
          state.userInfo=res.data
        })
    },
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