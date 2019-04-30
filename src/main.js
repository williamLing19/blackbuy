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

//写组件
import index from "./components/index.vue"
//写规则
const routes = [
  { path: "/index", component: index }
]
//创建router实例
const router = new VueRouter({
  routes
})
//挂载到vue实例
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
