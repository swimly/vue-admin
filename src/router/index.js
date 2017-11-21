import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

Vue.use(Router)
const route = new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/home',
      component: resolve => require(['@/layout/Aside'], resolve),
      // 登录之后的页面
      children: [{
        path: '/home',
        name: 'home',
        components: {
          content: resolve => require(['@/pages/Index'], resolve)
        }
      }, {
        path: '/user',
        name: 'user',
        components: {
          content: resolve => require(['@/pages/user/Index'], resolve)
        }
      }, {
        path: '/article',
        name: 'article',
        components: {
          content: resolve => require(['@/pages/article/Index'], resolve)
        }
      }, {
        path: '/article/add',
        name: 'articleadd',
        components: {
          content: resolve => require(['@/pages/article/Add'], resolve)
        }
      }, {
        path: '/articles/:id',
        name: 'articledetail',
        components: {
          content: resolve => require(['@/pages/article/Detail'], resolve)
        }
      }, {
        path: '/project',
        name: 'project',
        components: {
          content: resolve => require(['@/pages/project/Index'], resolve)
        }
      }, {
        path: '/project/add',
        name: 'projectadd',
        components: {
          content: resolve => require(['@/pages/project/Add'], resolve)
        }
      }, {
        path: '/setting',
        name: 'setting',
        components: {
          content: resolve => require(['@/pages/setting/Index'], resolve)
        }
      }, {
        path: '/count',
        name: 'count',
        components: {
          content: resolve => require(['@/pages/count/Index'], resolve)
        }
      }]
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/author/Login'], resolve)
    }
  ]
})
route.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  console.info('开始跳转：' + Date.parse(new Date()))
  next()
})
route.afterEach(to => {
  iView.LoadingBar.finish()
  console.info('跳转结束：' + Date.parse(new Date()))
})
export default route
