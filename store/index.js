import Vue from 'vue'
import Vuex from 'vuex'

import { module as common } from './modules/common/commonStore'
import { module as main } from './modules/main/mainStore'
import userStore from './modules/userStore'
import loginStore from './modules/loginStore'

import { module as navigationStore } from './modules/common/navigationStore'
import { module as event } from './modules/event/eventStore'
import { module as certificationStore } from './modules/login/certificationStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    main,
    userStore,
    loginStore,
    navigationStore,
    event,
    certificationStore
  }
})
