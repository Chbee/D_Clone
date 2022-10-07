import { module as calendar } from './scheduleStore'

const ModuleName = 'main'
const module = {
  namespaced: true,
  modules: {
    calendar
  }
}

export {
  module,
  ModuleName
}