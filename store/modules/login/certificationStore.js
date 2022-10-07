import { sendCertificationNoApi, verifyCertificationNoApi } from '@api/login/Certification'

const ModuleName = 'certificationStore'

const TYPES = {

  TID: 'tid',
  CERTIFICATION_TOKEN: 'certificationToken',
  CERTIFICATION_WAY: 'certificationWay',
  CERTIFICATION_NO: 'certificationNo',
  CERTIFICATION_CELL_NO: 'certificationCellNo',
  CERTIFICATION_EMAIL: 'certificationEmail',

  WEB_ID: 'webId',
  CUSTOMER_NM: 'customerNm',
  IS_CHECKING: 'isChecking',
  IS_CHECKED: 'isChecked',

  GET_TID: 'getTid',
  GET_CERTIFICATION_TOKEN: 'getCertificationToken',
  GET_CERTIFICATION_WAY: 'getCertificationWay',
  GET_CERTIFICATION_NO: 'getCertificationNo',
  GET_CERTIFICATION_CELL_NO: 'getCertificationCellNo',
  GET_CERTIFICATION_EMAIL: 'getCertificationEmail',
  GET_WEB_ID: 'getWebId',
  GET_CUSTOMER_NM: 'getCustomerNm',
  GET_IS_CHECKING: 'getIsChecking',
  GET_IS_CHECKED: 'getIsChecked',

  SELECT_CERTIFICATION_NO: 'selectCertificationNo',
  VERIFY_CERTIFICATION_NO: 'verifyCertificationNo',
  INITIALIZE: 'initialize',

  SET_TID: 'setTid',
  SET_CERTIFICATION_TOKEN: 'setCertificationToken',
  SET_CERTIFICATION_WAY: 'setCertificationWay',
  SET_CERTIFICATION_NO: 'setCertificationNo',
  SET_CERTIFICATION_CELL_NO: 'setCertificationCellNo',
  SET_CERTIFICATION_EMAIL: 'setCertificationEmail',
  SET_WEB_ID: 'setWebId',
  SET_CUSTOMER_NM: 'setCustomerNm',
  SET_IS_CHECKING: 'setIsChecking',
  SET_IS_CHECKED: 'setIsChecked'

}

const module = {
  namespaced: true,
  state: {
    [TYPES.CERTIFICATION_TOKEN]: '',
    [TYPES.CERTIFICATION_WAY]: '',
    [TYPES.CERTIFICATION_NO]: '',
    [TYPES.TID]: '',
    [TYPES.CERTIFICATION_CELL_NO]: '',
    [TYPES.CERTIFICATION_EMAIL]: '',
    [TYPES.WEB_ID]: '',
    [TYPES.CUSTOMER_NM]: '',
    [TYPES.IS_CHECKING]: false,
    [TYPES.IS_CHECKED]: false
  },
  getters: {
    [TYPES.GET_CERTIFICATION_TOKEN](state) {
      return state[TYPES.CERTIFICATION_TOKEN]
    },
    [TYPES.GET_CERTIFICATION_WAY](state) {
      return state[TYPES.CERTIFICATION_WAY]
    },
    [TYPES.GET_CERTIFICATION_NO](state) {
      return state[TYPES.CERTIFICATION_NO]
    },
    [TYPES.GET_TID](state) {
      return state[TYPES.TID]
    },
    [TYPES.GET_CERTIFICATION_CELL_NO](state) {
      return state[TYPES.CERTIFICATION_CELL_NO]
    },
    [TYPES.GET_CERTIFICATION_EMAIL](state) {
      return state[TYPES.CERTIFICATION_EMAIL]
    },
    [TYPES.GET_WEB_ID](state) {
      return state[TYPES.WEB_ID]
    },
    [TYPES.GET_CUSTOMER_NM](state) {
      return state[TYPES.CUSTOMER_NM]
    },
    [TYPES.GET_IS_CHECKING](state) {
      return state[TYPES.IS_CHECKING]
    },
    [TYPES.GET_IS_CHECKED](state) {
      return state[TYPES.IS_CHECKED]
    }
  },
  actions: {
    [TYPES.SELECT_CERTIFICATION_NO](context, payload) {
      return new Promise((resolve, reject) => {
        const { certificationWay, cellNo, email, webId, customerNm, compareYn, template } = payload || {}
        const params = { certificationWay, cellNo, email, webId, customerNm, compareYn, template }

        // 인증 진행중 변경 및 인증번호 초기화
        context.commit(TYPES.SET_IS_CHECKING, true)
        context.commit(TYPES.SET_IS_CHECKED, false)
        context.commit(TYPES.SET_CERTIFICATION_NO, '')

        // 인증번호 전송시 서버에서 데이터 비교
        sendCertificationNoApi(params)
          .then(response => {
            const { resultCode, data } = response.data || {}
            const { certificationToken } = data || {}

            if (resultCode === '10') {
              context.commit(TYPES.SET_CERTIFICATION_WAY, certificationWay)
              context.commit(TYPES.SET_CERTIFICATION_CELL_NO, cellNo)
              context.commit(TYPES.SET_CERTIFICATION_EMAIL, email)
              context.commit(TYPES.SET_WEB_ID, webId)
              context.commit(TYPES.SET_CUSTOMER_NM, customerNm)
              context.commit(TYPES.SET_CERTIFICATION_TOKEN, certificationToken)
            }
            if (['20', '21'].includes(resultCode)) {
              clearInterval(context.state[TYPES.TID])
              context.commit(TYPES.SET_IS_CHECKING, false)
              context.commit(TYPES.SET_IS_CHECKED, false)
              context.commit(TYPES.SET_TID, '')
              context.commit(TYPES.SET_CERTIFICATION_TOKEN, '')
            }

            resolve(resultCode)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    [TYPES.VERIFY_CERTIFICATION_NO](context, payload) {
      return new Promise((resolve, reject) => {
        verifyCertificationNoApi({ certificationNo: payload, certificationToken: context.state[TYPES.CERTIFICATION_TOKEN] })
          .then(response => {
            const { resultCode } = response.data || {}

            if (resultCode === '10') {
              clearInterval(context.state[TYPES.TID])
              context.commit(TYPES.SET_IS_CHECKING, false)
              context.commit(TYPES.SET_IS_CHECKED, true)
              context.commit(TYPES.SET_TID, '')
              context.commit(TYPES.SET_CERTIFICATION_NO, payload)
            }

            resolve(resultCode)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    [TYPES.INITIALIZE](context, payload) {
      clearInterval(context.state[TYPES.TID])
      context.commit(TYPES.SET_TID, '')
      context.commit(TYPES.SET_CERTIFICATION_TOKEN, '')
      context.commit(TYPES.SET_CERTIFICATION_WAY, '')
      context.commit(TYPES.SET_CERTIFICATION_NO, '')
      context.commit(TYPES.SET_CERTIFICATION_CELL_NO, '')
      context.commit(TYPES.SET_CERTIFICATION_EMAIL, '')
      context.commit(TYPES.SET_WEB_ID, '')
      context.commit(TYPES.SET_CUSTOMER_NM, '')
      context.commit(TYPES.SET_IS_CHECKING, false)
      context.commit(TYPES.SET_IS_CHECKED, false)
    }
  },
  mutations: {
    [TYPES.SET_CERTIFICATION_TOKEN]: (state, payload) => {
      state[TYPES.CERTIFICATION_TOKEN] = payload
    },
    [TYPES.SET_CERTIFICATION_WAY]: (state, payload) => {
      state[TYPES.CERTIFICATION_WAY] = payload
    },
    [TYPES.SET_CERTIFICATION_NO]: (state, payload) => {
      state[TYPES.CERTIFICATION_NO] = payload
    },
    [TYPES.SET_TID]: (state, payload) => {
      state[TYPES.TID] = payload
    },
    [TYPES.SET_CERTIFICATION_CELL_NO]: (state, payload) => {
      state[TYPES.CERTIFICATION_CELL_NO] = payload
    },
    [TYPES.SET_CERTIFICATION_EMAIL]: (state, payload) => {
      state[TYPES.CERTIFICATION_EMAIL] = payload
    },
    [TYPES.SET_WEB_ID]: (state, payload) => {
      state[TYPES.WEB_ID] = payload
    },
    [TYPES.SET_CUSTOMER_NM]: (state, payload) => {
      state[TYPES.CUSTOMER_NM] = payload
    },
    [TYPES.SET_IS_CHECKING]: (state, payload) => {
      state[TYPES.IS_CHECKING] = payload
    },
    [TYPES.SET_IS_CHECKED]: (state, payload) => {
      state[TYPES.IS_CHECKED] = payload
    }
  }
}

export {
  TYPES,
  module,
  ModuleName
}