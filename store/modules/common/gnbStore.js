import network from '@utils/network/index.js'
import method from '@/constants/method.json'
import { isLogin } from '@utils/login'

const ModuleName = 'common/gnb'
const module = {
  namespaced: true,
  state: {
    isShowDrawer: false,
    // GNB카테고리
    categoryList: [],
    allCategoryList: [],
    gnbOn: ''
  },
  getters: {
    isShowDrawer (state) {
      return state.isShowDrawer
    },
    categoryList(state) {
      return state.categoryList
    },
    gnbOn(state) {
      return state.gnbOn
    }
    
  },
  actions: {
    toggleDrawer ({ commit, state }) {
      state.isShowDrawer = !state.isShowDrawer
    },
    hasAuth ({ commit, state }, to) {
      // 변수 선언
      let isLoginRequiredUrl = false
      const redirectInfo = {
        path: null,
        name: null,
        params: null
      }
      
      // 로그인이 필요한 URL인지 확인
      if(to != null && to !== undefined && to.matched != null && to.matched !== undefined && to.matched.length > 0) {
        for(let i = 0; i < to.matched.length; i++) {
          if(to.matched[i].meta.loginRequired === true) {
            isLoginRequiredUrl = true
          }
        }
      }
      
      // 로그인이 필요한 URL인데 Client의 상태가 미로그인 상태인 경우
      if(isLoginRequiredUrl === true && isLogin() !== true) {
        // 로그인 화면으로 이동
        redirectInfo.path = '/login'
        redirectInfo.name = 'Login'
        redirectInfo.params = {
          returnPath: to.fullPath,
          returnName: to.name,
          returnParams: to.params
        }
      }

      // 결과값 반환
      return redirectInfo
    },
    // GNB카테고리 조회
    searchGnbCategoryList({ commit, state }, refresh) {
      // VUE State에 GNB 카테고리가 있는 경우 서버에 요청을 보내지 않음
      if(state.allCategoryList.length > 0 && refresh !== true) {
        return
      }

      // 서버에 GNB 카테고리 목록 조회 요청
      network.send({
        method: method.GET, 
        url: '/gnb/searchGnbCategoryList'
      }).then((res) => {
        // 전체 카테고리 목록을 state에 저장
        commit('setAllGnbCategoryList', res.list)
        
        // 화면에 노출될 카테고리 목록을 state에 저장
        commit('setGnbCategoryList', res.list.filter(menu => menu.useYn === 'Y' && menu.dispYn === 'Y'))
      })
    }
  },
  mutations: {
    // 화면에 노출될 GNB 카테고리 저장
    setGnbCategoryList(state, categoryList) {
      state.categoryList = categoryList
    },
    // 전체 GNB 카테고리 저장 (사용여부/전시여부에 관계 없이 모든 카테고리를 저장, 접근 가능여부를 처리하기 위한 용도로 사용)
    setAllGnbCategoryList(state, allCategoryList) {
      state.allCategoryList = allCategoryList
    },
    setGnbOn(state, nowGnb) {
      state.gnbOn = nowGnb
    }
  }
}

export {
  module,
  ModuleName
}
