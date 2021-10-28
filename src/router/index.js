import Vue from 'vue'
import VueRouter from 'vue-router'
/*
import Recommend from "../views/Recommend";
import Search from "../views/Search";
import Singer from "../views/Singer";
import Rank from "../views/Rank";
*/

//异步按需加载
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module);
  })
}

const Detail = (resolve) => {
  import('../components/Detail/Detail').then((module) => {
    resolve(module);
  });
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module);
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module);
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module);
  })
}

Vue.use(VueRouter)

const routes = [
  {
    //重定向 定的是路由并非组件
    path: '/', redirect: '/recommend',

  },
  {
    path: '/recommend', component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail,
        //三级路由
    /*    children: [
          {
            path: 'detail/:id/:type/comments',
            component: () => import("../components/Detail/Comments")
          }
        ]*/
      },

    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../components/Detail/Detail')
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../components/Detail/Detail')

      }
    ]
  },
  {path: '/search', component: Search},
  {path: '/account', component: () => import("../components/account/Account")},
  {path: '/comments/:id', component: () => import("../components/Comments/Comments")},



];

const router = new VueRouter({
  //如果需要预渲染的插件，那么Router的模式必须是history模式，否则打包失败
  mode: 'history',//如果使用的是history模式，部署后刷新会报404错误
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
