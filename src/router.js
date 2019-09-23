import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Upload from './views/Upload'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    }
  ]
})