// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import firebase from 'firebase/app'
import Config from './config'

Vue.config.productionTip = false
firebase.initializeApp({
  apiKey: Config.firebaseApiKey,
  databaseURL: 'https://ruliweb-lol-manual-manager.firebaseio.com',
  projectId: 'ruliweb-lol-manual-manager'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
