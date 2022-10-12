import { fetchSectionListData } from '@/api/main/Main'

const ModuleName = 'main/banner'

const module = {
  namespaced: true,
  state: {
    bannerList: [{}]
  },
  getters: {
    getBannerList(state) {
      return state.bannerList
    }
  },
  mutations: {
    setBannerList(state, data) {
      state.bannerList = data
    }
  },
  actions: {
    fetchBannersData({ commit }, type) {
      return fetchSectionListData(type)
        .then(data => {
          commit('setBannerList', data)
          return Promise.resolve(data)
        })
    }
  }
}

export {
  module,
  ModuleName
}