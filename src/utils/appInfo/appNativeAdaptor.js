import { appCloseapp } from './index.js'
import ROUTE from '@constants/route.json'

export default class AppNativeAdaptor {
  #router
  #store
  
  constructor(router, store) {
    this.#router = router
    this.#store = store
  }

  aosBack() {
    const currentName = this.#router.history.current.name
    const currentStack = this.#store.getters['navigationStore/currentPopup']
    
    if(currentName === ROUTE.Main && currentStack === null) {
      console.debug('[aosBack] APP 종료 스키마 호출, confirmYn=Y')
      window.location.href = appCloseapp('Y')
    } else if(currentName === ROUTE.Main && currentStack !== null) {
      console.debug('[aosBack] 메인화면 팝업창 닫기 호출')
      currentStack.close ? currentStack.close() : currentStack.$destroy()
      this.#store.dispatch('navigationStore/__removePopup')
    } 
    else if((currentName === ROUTE.Ticket.Complete || currentName === ROUTE.Ticket.Payment) && Object.prototype.hasOwnProperty.call(sessionStorage, 'beforeTicketSubmit')) {
      const diff = window.history.length - Number(sessionStorage.getItem('beforeTicketSubmit'))
      sessionStorage.removeItem('beforeTicketSubmit')
      this.#router.go(currentName === ROUTE.Ticket.Payment ? -(diff + 1) : -diff)
    } else {
      console.debug('[aosBack] 라우터 뒤로가기 호출')
      this.#router.back()
    }
  }
}