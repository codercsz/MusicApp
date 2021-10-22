import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.scss';
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole';

import Loading from './plugin/loading/index';
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)


/*
vant
import { Loading } from 'vant';

Vue.use(Loading);
*/



Vue.use(Loading, {
  title: '正在加载...'
})




Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.gif'),

});

Vue.config.productionTip = false

const vconsole = new VConsole();
Vue.use(vconsole);

new Vue({
  router,
  store,
  render: h => h(App),
  //以下代码是安装了预渲染的插件之后自动添加的
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
  
  
}).$mount('#app')
