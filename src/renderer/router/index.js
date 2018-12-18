import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/views/Landing').default
    },
    {
      path: '/:path/:method',
      name: 'path',
      component: require('@/views/Path').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
