import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'home', component: () => import('@/pages/home/home')},
  {path: '/login', name: 'login', component: () => import('@/pages/login/login')},
  {path: '/register', name: 'register', component: () => import('@/pages/register/register')},
  {path: '/schoolIntro', name: 'schoolIntro', component: () => import('@/pages/schoolIntro/schoolIntro')},
  {path: '/teacherRecord', name: 'teacherRecord', component: () => import('@/pages/teacherRecord/teacherRecord')},
  {path: '/classmateRecord', name: 'classmateRecord', component: () => import('@/pages/classmateRecord/classmateRecord')},
  {path: '/location', name: 'location', component: () => import('@/pages/location/location')},
  {path: '/detail', name: 'detail', component: () => import('@/pages/classmateRecord/detail')},
  {path: '/photoDetail', name: 'photoDetail', component: () => import('@/pages/classmateRecord/photoDetail')},
  {path: '/release', name: 'release', component: () => import('@/components/release')},
  {path: '/classPhotos', name: 'classPhotos', component: () => import('@/pages/classPhotos/classPhotos')},
  {path: '/videos', name: 'videos', component: () => import('@/pages/video/videos')},
  {path: '/playVideo', name: 'playVideo', component: () => import('@/pages/video/playVideo')},
  {path: '/personal', name: 'personal', component: () => import('@/pages/personal/personal')},
  {path: '/myInfo', name: 'myInfo', component: () => import('@/pages/personal/myInfo')},
  {path: '/myPhotos', name: 'myPhotos', component: () => import('@/pages/personal/myPhotos')},
  {path: '/myPhotoDetail', name: 'myPhotoDetail', component: () => import('@/pages/personal/myPhotoDetail')},
  {path: '/myQuotation', name: 'myQuotation', component: () => import('@/pages/personal/myQuotation')},
  {path: '/modifyPassword', name: 'modifyPassword', component: () => import('@/pages/personal/modifyPassword')},
 // {path: '*', redirect:'/'},
];

const router = new VueRouter({
  mode: 'history',
  routes,
})
router.beforeEach(({name}, from, next) => {
  if (name === 'login' || name === 'register') {
    next()
  } else {
    const token = sessionStorage.getItem('x_access_token');
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
