import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import S_Storage from '@/utils/storage/sessionStorage'
Vue.use(VueRouter)

import Home from '@/pages/home/home'
import Login from '@/pages/login/login'
import Register from '@/pages/register/register'
import SchoolIntro from '@/pages/schoolIntro/schoolIntro'
import TeacherRecord from '@/pages/teacherRecord/teacherRecord'
import ClassmateRecord from '@/pages/classmateRecord/classmateRecord'
import Detail from '@/pages/classmateRecord/detail'
import PhotoDetail from '@/pages/classmateRecord/photoDetail'
import Release from '@/components/release'
import Location from '@/pages/location/location'
import ClassPhotos from '@/pages/classPhotos/classPhotos'
import Videos from '@/pages/video/videos'
import PlayVideo from '@/pages/video/playVideo'
import Personal from '@/pages/personal/personal'
import MyInfo from '@/pages/personal/myInfo'
import MyPhotos from '@/pages/personal/myPhotos'
import MyPhotoDetail from '@/pages/personal/myPhotoDetail'
import MyQuotation from '@/pages/personal/myQuotation'
import ModifyPassword from '@/pages/personal/modifyPassword'
const routes=[
  {path:'/',name:'home',component:Home},
  {path:'/login',name:'login',component:Login},
  {path:'/register',name:'register',component:Register},
  {path:'/schoolIntro',name:'schoolIntro',component:SchoolIntro},
  {path:'/teacherRecord',name:'teacherRecord',component:TeacherRecord},
  {path:'/classmateRecord',name:'classmateRecord',component:ClassmateRecord},
  {path:'/location',name:'location',component:Location},
  {path:'/detail',name:'detail',component:Detail},
  {path:'/photoDetail',name:'photoDetail',component:PhotoDetail},
  {path:'/release',name:'release',component:Release},
  {path:'/classPhotos',name:'classPhotos',component:ClassPhotos},
  {path:'/videos',name:'videos',component:Videos},
  {path:'/playVideo',name:'playVideo',component:PlayVideo},
  {path:'/personal',name:'personal',component:Personal},
  {path:'/myInfo',name:'myInfo',component:MyInfo},
  {path:'/myPhotos',name:'myPhotos',component:MyPhotos},
  {path:'/myPhotoDetail',name:'myPhotoDetail',component:MyPhotoDetail},
  {path:'/myQuotation',name:'myQuotation',component:MyQuotation},
  {path:'/modifyPassword',name:'modifyPassword',component:ModifyPassword},
  {path:'*',redirect:'/'}
]

const router=new VueRouter({
  mode:'history',
  routes
})
router.beforeEach(function (to, from, next) {
  const nextRoute = [
    'personal',
    'myQuotation',
    'album',
    'classmateRecord',
    'teacherRecord',
    'videos',
    'modifyPassword',
    'location'
    ];
  const isLogin = S_Storage.getSession("isLogin")
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      router.push({name: 'login'})
    }
  }
  if (to.name === 'login') {
    if (isLogin) {
      router.push({name: 'home'});
    }
  }
  next();
})
export default router