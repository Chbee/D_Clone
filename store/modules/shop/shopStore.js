import network from '@utils/network/index.js'
import method from '@/constants/method.json'
import { constMaker } from '@utils/common/common.js'

const ModuleName = 'shopStore'

const TYPES = constMaker(
  // state
  'USER_WISH_COUNT',
  'USER_CART_COUNT',
  // getter
  'GET_USER_WISH_COUNT',
  'GET_USER_CART_COUNT',
  // mutations
  'SET_USER_WISH_COUNT',
  'SET_USER_CART_COUNT',
  // actions
  'SELECT_USER_WISH_COUNT',
  'SELECT_USER_CART_COUNT',
  'SELECT_VALIDATED_PRODUCT',
  'CHECK_PRODUCT_QTY'
)

const module = {
  namespaced: true,
  state: {
    [TYPES.USER_WISH_COUNT]: 0,
    [TYPES.USER_CART_COUNT]: 0
  },
  getters: {
    [TYPES.GET_USER_WISH_COUNT]: (state) => {
      return state[TYPES.USER_WISH_COUNT]
    },
    [TYPES.GET_USER_CART_COUNT]: (state) => {
      return state[TYPES.USER_CART_COUNT]
    }
  },
  /** vuex state의 변경을 담당.
   * 동기처리 기준
   * commit('함수명', '전달인자') 방식으로 호출 
  */
  mutations: {
    [TYPES.SET_USER_WISH_COUNT]: (state, payload) => {
      state[TYPES.USER_WISH_COUNT] = payload
    },
    [TYPES.SET_USER_CART_COUNT]: (state, payload) => {
      state[TYPES.USER_CART_COUNT] = payload
    }
  },
  /** mutation을 실행을 담당
    * 비동기처리 기준
    * dispatch('함수명', '전달인자') 방식으로 호출 
    */
  actions: {
    [TYPES.SELECT_USER_WISH_COUNT]: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        network.send({
          method: method.GET,
          url: '/v1/product/getUserWishCount'
        }).then(res => {
          commit(TYPES.SET_USER_WISH_COUNT, res)
          resolve(res)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },
    [TYPES.SELECT_USER_CART_COUNT]: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        network.send({
          method: method.GET,
          url: '/v1/product/getUserCartCount'
        }).then(res => {
          commit(TYPES.SET_USER_CART_COUNT, res)
          resolve(res)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },
    // 상품상세 유효성체크 완료된 단품 단건
    [TYPES.SELECT_VALIDATED_PRODUCT]: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        network.send({
          method: method.POST,
          url: '/v1/product/searchValidatedProduct',
          meta: { passed: true },
          data: params
        }).then(res => {
          resolve(res)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },
    // 상품상세 옵션 수량 체크
    [TYPES.CHECK_PRODUCT_QTY]: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        network.send({
          method: method.POST,
          url: '/v1/product/checkProductOptionQty',
          meta: { passed: true },
          data: params
        }).then(res => {
          resolve(res)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    }
  }
}

export {
  TYPES,
  module,
  ModuleName
}