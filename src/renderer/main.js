import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import './components'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './styles/app.scss'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/railscasts.css'
Vue.use(VueHighlightJS)

Vue.use(iView, {
  size: 'large'
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
