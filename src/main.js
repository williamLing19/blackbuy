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
//导入axios
import axios from "axios"
//放到原型上方便使用
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://111.230.232.110:8899';

//写组件
//首页组件
import index from "./components/index.vue"
//详情组件
import detail from "./components/detail.vue"
//会员中心组件
import centerContainer from "./components/centerContainer.vue"
//会员鼓励师组件
import vipgls from './components/vipgls.vue'
//订单列表
import vipOrderDetail from './components/vipOrderDetail.vue'
//订单详情
import vipDetail from './components/vipDetail.vue'
//写规则
const routes = [
  { path: "/", redirect: "/index" },
  { path: "/index", component: index },
  { path: "/detail/:id", component: detail },
  { path: "/centerContainer", component: centerContainer, 
    children:[
      {
        path:'vipgls',
        component:vipgls
      },
      {
        path:'/vipOrderDetail',
        component:vipOrderDetail
      },
      {
        path:'/vipDetail',
        component:vipDetail
      },
      {
        path:'',
        redirect: "vipgls"
      }
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
Vue.filter("formatTime",(value)=>{
  return moment(value).format("YYYY年MM月DD日")
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
