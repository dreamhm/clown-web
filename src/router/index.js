import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'                           // 访问页面
import Login from '@/components/home/entry/Login'                   // 登录
import Register from '@/components/home/entry/Register'             // 注册
import Main from '@/components/main/Main'                           // 登录主页
import UserInfo from '@/components/manage/components/UserList'      // 用户列表
import Powerdetails from '@/components/powerdetails/powerdetails'   // 权限管理

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
        isChecked: true
      }
    },{
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        isChecked: true
      }
    },{
      path: '/powerdetails',
      name: 'Powerdetails',
      component: Powerdetails,
      meta: {
        isChecked: true
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