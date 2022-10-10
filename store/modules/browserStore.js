export default {
  namespaced: true,
  state: {
    browserType: null,
    browserLangauge: null
  },
  getters: {
    GE_BROWSER_TYPE: state => state.browserType,
    GE_BROWSER_LANGUAGE: state => state.browserLangauge
  },   
  mutations: {
    MU_BROWSER_TYPE: (state, payload) => {
      state.browserType = payload
    },
    MU_BROWSER_LANGUAGE: (state, payload) => {
      state.browserLangauge = payload
    }
  },
  actions: {
    AC_BROWSER_TYPE: ({ commit }, payload) => {
      commit('MU_BROWSER_TYPE', payload)
    },
    AC_BROWSER_LANGUAGE: ({ commit }, payload) => {
      commit('MU_BROWSER_LANGUAGE', payload)
    }
  }
}