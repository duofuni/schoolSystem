import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'home', component: () => import('@/pages/home')},
  {path: '/login', name: 'login', component: () => import('@/pages/login')},
  {path: '/register', name: 'register', component: () => import('@/pages/register')},
  {path: '/schoolIntro', name: 'schoolIntro', component: () => import('@/pages/school_intro')},
  {path: '/teacherRecord', name: 'teacherRecord', component: () => import('@/pages/teacher_record')},
  {path: '/classmateRecord', name: 'classmateRecord', component: () => import('@/pages/classmate_record')},
  {path: '/location', name: 'location', component: () => import('@/pages/location')},
  {path: '/detail', name: 'detail', component: () => import('@/pages/classmate_record/detail')},
  {path: '/photoDetail', name: 'photoDetail', component: () => import('@/pages/classmate_record/photo_detail')},
  {path: '/release', name: 'release', component: () => import('@/components/release')},
  {path: '/classPhotos', name: 'classPhotos', component: () => import('@/pages/class_photos')},
  {path: '/videos', name: 'videos', component: () => import('@/pages/video')},
  {path: '/playVideo', name: 'playVideo', component: () => import('@/pages/video/play_video')},
  {path: '/personal', name: 'personal', component: () => import('@/pages/personal')},
  {path: '/myInfo', name: 'myInfo', component: () => import('@/pages/personal/my_info')},
  {path: '/myPhotos', name: 'myPhotos', component: () => import('@/pages/personal/my_photos')},
  {path: '/myPhotoDetail', name: 'myPhotoDetail', component: () => import('@/pages/personal/my_photo_detail')},
  {path: '/myQuotation', name: 'myQuotation', component: () => import('@/pages/personal/my_quotation')},
  {path: '/modifyPassword', name: 'modifyPassword', component: () => import('@/pages/personal/modify_password')},
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
