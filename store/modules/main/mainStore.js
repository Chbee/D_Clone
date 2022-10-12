import { module as calendar } from './scheduleStore'
import { module as banner } from './bannerListStore'

const ModuleName = 'main'
const module = {
  namespaced: true,
  modules: {
    calendar,
    banner
  }
}

export {
  module,
  ModuleName
}