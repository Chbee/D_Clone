import { module as program } from './programStore'

const ModuleName = 'event'
const module = {
  namespaced: true,
  modules: {
    program
  }
}

export {
  module,
  ModuleName
}
