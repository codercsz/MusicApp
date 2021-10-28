import axios from "axios";
import Vue from 'vue';
import store from '../store/index'

//全局配置
axios.defaults.baseURL = 'http://192.168.0.102:3000';
axios.defaults.timeout = 3000;


//记录请求跟响应的次数是否相等，相等才可以关掉动画
let count = 0;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++;
  // Vue.showLoading();
  store.commit('setLoading', true);  //van-loading
  return config;
}, function (error) {
  // 对请求错误做些什么
  // Vue.hiddenLoading();  //发生错误也需要隐藏
  store.commit('setLoading', false);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--;
  if (count === 0) {
    // Vue.hiddenLoading();
    store.commit('setLoading', false);
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  store.commit('setLoading', false);
  
  // Vue.hiddenLoading();
  return Promise.reject(error);
});





//封装自己的get/post方法
export default {
    get: function (path='',data={}) {
        return new Promise(function (resolve, reject) {
            axios.get(path, {
                params: data
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            })
        })
    },
    post: function (path='',data={}) {
        return new Promise(function (resolve, reject) {
            axios.post(path, data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        })
    },
    all: function (list) {
      return new Promise(function (resolve, reject) {
        axios.all(list)
          .then(axios.spread(function (...result) {
            // 两个请求现在都执行完成
            resolve(result);
          }))
          .catch(function (error) {
            reject(error);
          });
      });
    }
}