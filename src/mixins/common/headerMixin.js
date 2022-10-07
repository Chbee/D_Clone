import { isNativeApp } from '@utils/appInfo'

const mixin = {
  methods: {
    goBack() {
      const currentName = this.$router?.history?.current?.name
      if((currentName === ROUTE.Ticket.Complete || currentName === ROUTE.Ticket.Payment) && Object.prototype.hasOwnProperty.call(sessionStorage, this.comBeforeTicketSubmit)) {
        const diff = window.history.length - Number(sessionStorage.getItem(this.comBeforeTicketSubmit))
        sessionStorage.removeItem(this.comBeforeTicketSubmit)
        this.$router.go(currentName === ROUTE.Ticket.Payment ? -(diff + 1) : -diff)
      } else if(currentName === ROUTE.Faq.FaqInquireComplete || currentName === ROUTE.Faq.BulkComplete) {
        if(isNativeApp()) { // APP 일 경우 자동로그인으로 인한 분기처리
          let back = (currentName === ROUTE.Faq.BulkComplete ? -3 : -1) 
          if(sessionStorage.getItem(this.comFaqFirst) !== null && sessionStorage.getItem(this.comFaqFirst) !== undefined) {
            if(currentName === ROUTE.Faq.BulkComplete) { // 최초 기업 및 단체구매 완료 페이지 시 자동로그인 시 1추가
              back = back - Number(sessionStorage.getItem(this.comFaqFirst))
            }
          }
          this.$router.go(back) 
        } else{
          this.$router.go(currentName === ROUTE.Faq.BulkComplete ? -3 : -1) 
        }
      } else if(history.length <= 1) {
        const path = window.location.href
        // window.pop close
        if(path.indexOf('nice.checkplus.co.kr') !== -1) {
          window.close()
        } else {
          this.$router.replace('/')
        }
      } else this.$router.back()
    },      
    isEmpty(val) {
      return val === null || val === undefined || val === '' || (val?.trim && val.trim() === '')
    }
  },
  computed: {
    comBeforeTicketSubmit() {
      return 'beforeTicketSubmit'
    },
    comFaqFirst() {
      return 'faqFirst'
    }
  }
}
  
export default mixin
  