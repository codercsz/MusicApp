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
  import('../components/Detail').then((module) => {
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
        component: Detail
      }
    ]},
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
