import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({

  state: state,
  mutations: mutations,
  actions: actions,
  getters:getters

  //state:用于保存全局共享的数据
 /* state: {
    isFullScreen: false
  },
  //mutations:用于保存修改全局共享的数据的方法
  mutations: {
    changeFullScreen(state, flag) {
      state.isFullScreen = flag;
    },

    //自己实现的方法
   /!* tese(state) {
      state.isFullScreen = !state.isFullScreen;
    }*!/
  },
  actions: {
    setFullScreen({commit}, flag) {
      commit('changeFullScreen', flag);
    }
  },
  modules: {},
  //缓存数值
  getters:{
    isFullScreen(state) {
      return state.isFullScreen;
    }
  }*/
})
