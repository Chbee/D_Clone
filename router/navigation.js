import ROUTE from '@constants/route.json'

import store from '*/store'
import utilities from '@assets/plugins/utilities'
const isMobile = utilities.methods.isMobile

let isBack = false
window.onpopstate = () => {
  if(store.getters['navigationStore/currentPopup']) {
    // popup  있다면
    // 모바일 에서만 다시 이전으로
    isMobile() && history.forward()
  }
  isBack = true

  // onpopstate가 router 이동없이 호출 되는 경우 방지
  setTimeout(() => { isBack = false }, 500)
}

export const setNaviagation = (router, isApp) => {
  removeLog(router)
  // 페이지 처리 (네비게이션 가드)
  router.beforeEach((to, from, next) => {
    // 페이지를 벗어났을떄 팝업이 열려있으면 닫아줌
    if((!isMobile() || isBack) && !closePop()) {
      isBack = false
      return 
    }
    const toName = getComponentName(router, to)
    const fromName = getComponentName(router, from) 
    const stack = store.state.navigationStore.stack
    if(isBack) {
      // 1. gnb 였을때
      // 2. Stack에 아무것도 없을때 : App push Service를 통해 URL 왔을 경우
      if(isApp && (from.meta.gnb || stack.length === 0) && to.name !== ROUTE.Main) {
        store.dispatch('navigationStore/__clear', fromName)
        return next('/') 
      }
      store.dispatch('navigationStore/__back', fromName)
    }else{
      stack.find(el => el === toName) && store.dispatch('navigationStore/__back', toName) // 존재 하면 임시제거, globalMxin.js mounted에서 push
    }
    to.meta.isBack = isBack

    if(isBack) {
      isBack = false
    }
    next()
  })
}

const closePop = () => {
  const currentStack = store.getters['navigationStore/currentPopup']
  if(currentStack) {
    if(!isMobile()) {
      // PC인 경우 모든 팝업 제거
      destroyPopup(store.state.navigationStore.popupStack)
      store.dispatch('navigationStore/__clearPopup')
    }else{
      // 모바일인 경우 열려있는 팝업만 닫히고,  이전또는 다음페이지로 넘어가지 않음
      destroyPopup([currentStack])
      store.dispatch('navigationStore/__removePopup')
      if(isBack) return false
    }
  }
  return true
}

const getComponentName = (router, route) => {
  const list = router.getMatchedComponents(route.fullPath)
  return list.length > 0 ? list[list.length - 1].name : route.name
}

const destroyPopup = (list) => {
  list.forEach(vm => {
    vm.close ? vm.close() : vm.$destroy()
  })
}

/**
 * 라우터 waning log 제거를 위한 push function 재정의
 * - 프로세스와 상관없는 단수 log 제거용 재정의 입니다.
 * - log제거용이니 삭제해도 무방합니다.
 * - 제거 로그
 * 1) 동일 라우터 접근
 * 2) navigation guard를 통한 재정의
 */

const removeLog = (router) => {
  const originalPush = router.push
  router.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalPush.call(this, location, onResolve, onReject)
    }
    return originalPush.call(this, location).catch((err) => {
      const regs = [/^Redirected when going from "[a-z_.\\/]+" to "[a-z_.\\/]+" via a navigation guard.$/, /^Avoided redundant navigation to current location/]
      for(let i = 0; i < regs.length; i++) {
        if(regs[i].test(err.message)) {
          i === 0 && console.log('No Auth for this Menu : ', location)
          i === 1 && console.log('Same Route : ', location)
          return Promise.resolve(false)
        }
      }
      return Promise.reject(err)
    })
  }
}