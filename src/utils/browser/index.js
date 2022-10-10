import getBrowserLanguage from './getBrowserLanguage'
import getBrowserType from './getBrowserType'

import store from '*/store/index.js'

const setBrowserLanguage = () => {
  store.dispatch('browserStore/AC_BROWSER_LANGUAGE', getBrowserLanguage())
}

const setBrowserType = () => {
  store.dispatch('browserStore/AC_BROWSER_TYPE', getBrowserType())
}

export {
  setBrowserLanguage,
  setBrowserType
}
