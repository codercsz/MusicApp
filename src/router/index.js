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
    path: '/', redirect: Recommend,
  },
  {
    path: '/recommend', component: Recommend,
      children: [
          {
              path: 'detail/:id/:type',
              component: Detail,
              //三级路由
              children: [
                  {
                      path: '/detail/comments',
                      component: () => import("../components/Detail/Comments")
                  }
              ]
          },

      ]},
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: 'detail/:id/:rank',
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
  {path: '/search', component: Search },
  { path: '/account', component: () => import("../components/account/Account") }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
