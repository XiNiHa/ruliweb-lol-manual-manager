// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'

Vue.config.productionTip = false
firebase.initializeApp({
  apiKey: 'AIzaSyDS8CB514Z6lDh7uNFRDBPj8t5r2XbtwVo',
  authDomain: 'ruliweb-lol-manual-manager.firebaseapp.com',
  databaseURL: 'https://ruliweb-lol-manual-manager.firebaseio.com',
  projectId: 'ruliweb-lol-manual-manager',
  storageBucket: 'ruliweb-lol-manual-manager.appspot.com',
  messagingSenderId: '800213840897'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
