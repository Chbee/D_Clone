import Vue from 'vue'
// meta tag 처리
import Meta from 'vue-meta'
// google analytics
import VueGtag from 'vue-gtag'
import App from '@/App.vue'

// 1. router
import router from '*/router/index.js'
// 2. i18n 다국어
import { i18n } from '@utils/i18n/index.js'
// 3. vuex

import store from '*/store/index.js'

import '@assets/plugins/directives'

// 1. 공통 컴포넌트
import elementsComp from '@comp/elements/index.js'
import globalMixin from '@/mixins/common/globalMixin'
import utilites from '@assets/plugins/utilities.js'

// vue-gtag
import gtag from '@utils/gtag/index.js'
// 모듈, gtag index.js, router index.js
Vue.use(VueGtag, gtag, router)


// Vue-meta
Vue.use(Meta)
// 공통 컴포넌트
Vue.use(elementsComp)
Vue.mixin(utilites)
Vue.mixin(globalMixin)

Vue.config.productionTip = false

const vue = new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')

process.env.NODE_ENV !== 'prd' && (window.vue = vue)  
