import network from '@utils/network/index.js'
import method from '@/constants/method.json'

const reservation = {
  state: {
    initReservationData: {
      prgIdx: 'PRG202111230003', 
      prgName: '샘플', 
      prgDate: '2021-12-01',
      epsdIdx: 'PE202111250001',
      prgPlcCd: 'PG00701',
      totalTcCnt: 0,
      ticketList: []
    }, 
    inicisPayForm: {
      goodname: '',
      buyername: '',
      buyertel: '',
      buyeremail: '',
      price: '',
      gopaymethod: '',
      mid: '',
      mKey: '',
      signature: '',
      oid: '',
      timestamp: '',
      version: '1.0',
      currency: 'WON',
      acceptmethod: '',
      returnUrl: '',
      closeUrl: ''
    }
  },
  getters: {
    // getInitRezData(state) {
    //     return state.initReservationData
    // }
  },
  mutations: {
    setInitRezData(state, payload) {
      state.initReservationData = payload
    },
    setInicisPayForm(state, payload) {
      state.inicisPayForm = payload            
      state.inicisPayForm.version = '1.0'
      // state.inicisPayForm.payViewType = 'popup'
      // state.inicisPayForm.popupUrl = 'popup'
      // state.inicisPayForm.acceptmethod = 'http://localhost:5000/reservation/inicisPop'
      state.inicisPayForm.gopaymethod = 'Card'
      if(state.inicisPayForm.currency === null || state.inicisPayForm.currency === '') {
        state.inicisPayForm.currency = 'WON'
      }
    }
  },
  actions: {
    getInitRezData({ commit, state }, payload) {
      network.send({
        url: '/v1/reservation/initReservation',
        method: method.POST,
        data: state.initReservationData
      }).then(res => {
        state.initReservationData = res.data.data.initReservationData
      })
    }
  }
}

export default reservation