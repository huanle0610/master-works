// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store.js'
import { sync } from 'vuex-router-sync'

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// VueMaterial部分 开始-------------------------------
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
// Vue.material.registerTheme('default', {
//   primary: 'blue',
//   accent: 'red',
//   warn: 'red',
//   background: 'grey'
// })
Vue.material.registerTheme('default', {
  primary: 'teal',
  accent: 'cyan',
  warn: 'red',
  background: 'grey'
})
Vue.material.registerTheme('purple', {
  primary: {
    color: 'purple-grey',
    hue: 900
  },
  accent: {
    color: 'grey',
    hue: 700
  },
  background: {
    color: 'purple-grey',
    hue: 800
  }
})
Vue.material.setCurrentTheme('default')
// VueMaterial部分 结束-------------------------------

sync(store, router) // done. Returns an unsync callback fn

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
