import { isLogin } from '@utils/login'

export default {
  namespaced: true,
  state: {
    isLogin: isLogin()
  },
  getters: {
    isLogin(state) {
      return state.isLogin
    }
  },
  mutations: {

    MU_IS_LOGIN: (state, payload) => {
      state.isLogin = payload
    }
  },
  actions: {
    AC_IS_LOGIN: ({ commit }, payload) => {
      commit('MU_IS_LOGIN', payload)
    }

  }
}
