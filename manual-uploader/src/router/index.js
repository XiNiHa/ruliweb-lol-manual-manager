import Vue from 'vue'
import Router from 'vue-router'
import Preview from '../components/Preview.vue'
import Adder from '../components/Adder.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'manual-uploader',
  routes: [
    {
      path: '/',
      name: 'Preview',
      component: Preview
    },
    {
      path: '/add',
      name: 'Adder',
      component: Adder
    }
  ]
})
