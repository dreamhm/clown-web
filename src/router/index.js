import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Login from '@/components/home/entry/Login'
import Register from '@/components/home/entry/Register'

Vue.use(Router)

const router = new Router({
  routes: [
    {
	    path: '/',
      redirect: { name: 'Home'},
      mode : "history"
    },{
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
      	isChecked: false
      },
      mode : "history"
    },{
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        isChecked: false
      },
      mode : "history"
    },{
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        isChecked: false
      },
       //去掉地址栏的"/#/"
      mode : "history"
    }
  ]
})

// 判断用户是否登录 决定是否放行
router.beforeEach(function (to, from, next) {
	if (!to.meta.isChecked) {
		next(); // 放行
	} else {
		// 获取localStorage中参数，若有则视为登录 若没有则视为未登录
		let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
		if (userId && token) {
			next(); // 放行
		} else {
			next( { name: "Login"}); // 重定向 至登录页面
		}
	}
})
export default router;