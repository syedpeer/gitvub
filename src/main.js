// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './main.scss'
require('material-design-lite')

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
