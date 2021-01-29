// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import {messages} from "./components/common/i18n"; /* 引入axios进行地址访问*/

Vue.use(ElementUI);
Vue.prototype.$http = axios;

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
