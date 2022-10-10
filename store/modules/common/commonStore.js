import { module as gnb } from './gnbStore'
import { module as commCdStore } from './commCdStore'

const ModuleName = 'common'
const module = {
  namespaced: true,
  modules: {
    gnb,
    commCdStore
  }
}

export {
  module,
  ModuleName
}