import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/Index.vue'
// 引入注册页面
import register from '../views/Register.vue'
// 引入404页面
import notfind from '../views/404.vue'
// 引入登录界面
import login from '../components/Login.vue'
// /引入home页面
import home from '../components/Home.vue'
//引入infoshow页面
  import  infoshow from '../components/../components/Infoshow.vue'

import foundlist from '../components/Foundlist'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: index ,children:[
    {path: '/home',component: home },
    { path: '/foundlist', component:foundlist},
    {path: '/infoshow',component: infoshow }
  ]},
  { path: '/register', component: register },
  { path: '/login', component: login},
  { path: '*', component: notfind }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to要去的页面
  // from要离开的页面
  if (to.path=='/login' || to.path=='/register') {
     next();
  } else if(!sessionStorage.token){
      next('/login')
  }else{
    next()
  }
})
export default router
