import Vue from 'vue'
import Router from 'vue-router'

import WebRouter from './modules/index.js'
import store from '*/store/index.js'
import ROUTE from '@constants/route.json'
import { isNativeApp } from '@utils/appInfo'

import { setNaviagation } from './navigation'
import { isLogin } from '@utils/login'

window.ROUTE = ROUTE

const isApp = process.env.NODE_ENV.indexOf('MOB') >= 0
const isPrd = process.env.NODE_ENV.indexOf('prd') >= 0

// let intervalObj = null

Vue.use(Router)
console.log('process.env.NODE_ENV', process.env.NODE_ENV, isApp)

const router = new Router({
  // 도메인 뒤 경로 삭제
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      to.params.savedPosition = savedPosition
      return savedPosition
    } else if (to.params.savePosition || to.name === from.name) {
      return savedPosition || {}
    } else{
      return { x: 0, y: 0 }
    }
  },
  routes: WebRouter
})

// 페이지 이동
setNaviagation(router, isApp)

// async: 비동기 처리
// await는 왜 없는가?
router.beforeEach(async (to, from, next) => {
  store.commit('common/gnb/setGnbOn', (to.path).split('/')[1].toUpperCase())
  store.commit('loginStore/MU_IS_LOGIN', isLogin())

  // APP으로 빌드된 환경이고, 현재 Native APP으로 접속한 상황이 아닌 경우
  if(isApp === true && isPrd && isNativeApp() !== true) {
    // PC/Mobile 반응형 웹 사이트의 앱 설치 안내 화면으로 이동
    window.location.href = process.env.VUE_APP_WEB_URL + '/appDownload'
    return
  }

  // 라우터 이동 전에 권한 및 유효성 체크
  store.dispatch('common/gnb/hasAuth', to).then((redirectInfo) => {
    if(redirectInfo.path === null) {
      next()
    }else{
      next(redirectInfo)
    }
  })
})

router.onError((error) => {
  if (error.name === 'ChunkLoadError') {
    window.location.reload()
  }
})

// [2022-03-01 ki89.choi][DCJ-T4886] 사이트 탭 표기 
// stack over flow 소스 (https://stackoverflow.com/questions/51915013/meta-tags-doesnt-work-with-vue-router)
const headTitle = document.title
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.headTitle)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.headTitle + ' | ' + headTitle
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.headTitle + ' | ' + headTitle
  } else {
    document.title = headTitle
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
  // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
