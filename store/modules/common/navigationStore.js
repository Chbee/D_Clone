const STACK_MAX_SIZE = 4
const ModuleName = 'navigationStore'
const module = {
  namespaced: true,
  state: {
    stack: [],
    popupStack: [],
    params: {}
  },
  getters: {
    currentStack (state) {
      return state.stack.length > 0 ? state.stack[state.stack.length - 1] : ''
    },
    stack (state) {
      return state.stack
    },
    size (state) {
      return state.stack ? state.stack.length : 0
    },
    currentPopup (state) {
      return state.popupStack.length > 0 ? state.popupStack[state.popupStack.length - 1] : null
    },
    popupStack (state) {
      return state.popupStack
    },
    params (state) {
      return state.params
    }
  },
  actions: {
    __push ({ commit, state }, payload) {
      if(!state.stack.find(el => el === payload)) {
        state.stack.length >= STACK_MAX_SIZE && state.stack.shift()  
        state.stack.push(payload)
        state.params = {}
      }
    },
    __back ({ commit, state }, payload) {
      state.stack.splice(state.stack.findIndex(el => el === payload), 1)
    },
    __clear ({ commit, state }) {
      state.stack = []
      state.params = {}
    },
    __pushPopup ({ commit, state }, payload) {
      if(!state.popupStack.find(el => el === payload)) {
        state.popupStack.push(payload)
        state.params = {}
      }
    },
    __removePopup ({ commit, state }) {
      state.popupStack.pop()
    },
    __clearPopup ({ commit, state }, payload) {
      state.popupStack = []
    },
    __setParams ({ commit, state }, payload) {
      state.params = payload
    }

  }
}

export {
  module,
  ModuleName
}
