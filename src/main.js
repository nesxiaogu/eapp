// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueResource from 'vue-resource';
import './common/stylus/index.styl';
import filter from './common/js/filter'

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.prototype.Event = new Vue(); // 单一事件处理通信

// 过滤器处理 注册所有过滤器
Object.keys(filter).forEach((attr) => {
  Vue.filter(attr, filter[attr]);
});

// 打印控制台
console.log('%cHello Vue 😊', 'color: #f60; font-size: 30px; font-family: SimSun;')

// 实例化的时候eslint规定必须要赋值给一个变量 写上下面这句代码就把这个规则给取消了
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
