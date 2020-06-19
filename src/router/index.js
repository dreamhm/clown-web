import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Login from '@/components/home/entry/Login'
import Register from '@/components/home/entry/Register'
import Main from '@/components/main/Main'
import UserInfo from '@/components/manage/components/UserList'
import Projectdetails from '@/components/projectdetails/projectdetails'

Vue.use(Router)

const router = new Router({
  mode : "history",//去除地址栏'#'
  routes: [
    {
      path: '/',
      redirect: { name: 'Home'}
    },{
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        isChecked: false
      }
    },{
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        isChecked: false
      }
    },{
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        isChecked: false
      }
    },{
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        isChecked: false
      }
    },{
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        isChecked: false
      }
    },{
      path: '/projectdetails',
      name: 'Projectdetails',
      component: Projectdetails,
      meta: {
        isChecked: false
      }
    }
  ]
})

// 判断用户是否登录 决定是否放行
router.beforeEach(function (to, from, next) {
  if (!to.meta.isChecked) {
    next(); // 放行
  } else {
    // 获取localStorage中参数，若有则视为登录 若没有则视为未登录
    let token = localStorage.getItem("token");
    if(token){
      next(); // 放行
    } else {
      next({ name: "Login"}); // 重定向 至登录页面
    }
  }
})
export default router;