import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.scss';
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole';

import Loading from './plugin/loading/index';


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
  render: h => h(App)
}).$mount('#app')
