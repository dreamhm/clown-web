// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { server } from './utils/api'
import Menu from './components/common/Menu'
import HomeMenu from './components/common/HomeMenu'

Vue.config.productionTip = false

//安装插件
Vue.use(ElementUI)
Vue.prototype.$server = server
Vue.component (Menu.name, Menu);
Vue.component (HomeMenu.name, HomeMenu);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
