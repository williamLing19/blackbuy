import Vue from 'vue'
import App from './App.vue'
//导入公共样式--导入的样式不适用可以省略xxxfrom
import "./assets/statics/site/css/style.css"
//导入vue-router
import VueRouter from "vue-router"
Vue.use(VueRouter)
//导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//将aixos添加到原型
import axios from "axios"
Vue.prototype.$axios=axios
//基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';

//写组件-首页组件
import index from "./components/index.vue"
// 详情组件
import detail from './components/detail.vue'
//会员中心组件
import centerContainer from "./components/centerContainer.vue"
//会员信息组件
import vipOrderDeatil from "./components/vipOrderDeatil.vue"
//写规则
const routes = [
  //重定向---从a到b的过程
  { path: "/", redirect: "/index" },
  { path: "/index", component: index },
  { path: "/detail/:id", component: detail },
  { path: "/centerContainer", component: centerContainer,
    children:[
      //重定向
      {path:"",redirect:"/vipOrderDeatil"},
      {path:"/vipOrderDeatil",component:vipOrderDeatil}
    ]
  },
]
//创建router实例
const router = new VueRouter({
  routes
})
//挂载到vue实例
Vue.config.productionTip = false

//全局过滤器
import moment from "moment"
Vue.filter("formatTime",value=>{
  return moment(value).format("YYYY年MM月DD日 HH:mm:ss")
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
