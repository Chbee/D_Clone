import Vue from 'vue'
import VueI18n from 'vue-i18n'

import bundleKo from '@bundle/bundle_ko.json'
import bundleEn from '@bundle/bundle_en.json'

Vue.use(VueI18n)

const messages = {
  en: bundleEn,
  ko: bundleKo
}

const locale = localStorage.getItem('locale')

let defaultLanguage = (locale && Object.keys(messages).includes(locale)) ? locale : 'ko_KR' // (window.navigator.userLanguage || window.navigator.language || 'ko').replace('-', '_') 윈도우 locale 안보는걸로 기획 변경
defaultLanguage === 'ko_KR' && (defaultLanguage = 'ko')

class CustomFormatter {
  interpolate(message, values) {
    return [getMessage(message, values)]
  }
}

export const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: 'ko',
  formatter: new CustomFormatter(),
  messages // set locale messages
})
export const getLocaleMessage = (id) => {
  return i18n.getLocaleMessage(i18n.locale)[id]
}

const getMessage = (message, params) => {
  if (typeof message !== 'string' || message.length === 0) { return message }
  params = typeof params === 'string' || typeof params === 'number' ? { ...[params] } : { ...params }

  for (const key in params) {
    const value = String(params[key])
    const arg = '{' + key + '}'
    let argIdx = message.indexOf(arg)
    let srcJosa
    while (argIdx >= 0) {
      const idx = argIdx + arg.length
      if (idx === message.length || message.substring(idx, idx + 1) === ' ') {
        srcJosa = undefined
      } else if (idx + 1 === message.length || message.substring(idx + 1, idx + 2) === ' ') {
        srcJosa = message.substring(idx, idx + 1)
      } else if (idx + 2 === message.length || message.substring(idx + 2, idx + 3) === ' ') {
        srcJosa = message.substring(idx, idx + 2)
      } else if (idx + 3 === message.length || message.substring(idx + 3, idx + 4) === ' ') {
        srcJosa = message.substring(idx, idx + 3)
      } else {
        srcJosa = undefined
      }
      if (srcJosa) {
        const tgtJosa = getJosa(value, srcJosa)
        if (srcJosa !== tgtJosa) {
          message = message.substring(0, idx) + tgtJosa + message.substring(idx + srcJosa.length)
        }
      }
      message = message.substring(0, argIdx) + value + message.substring(argIdx + arg.length)

      argIdx = message.indexOf(arg)
    }
  }
  const regExp = /{([^}]+)}/g
  return message.replace(regExp, '')
}

/*
   * 조사 찾기
   */
const eul = '을'
const reul = '를'
const ei = '이'
const ga = '가'
const eun = '은'
const neun = '는'
const gwa = '과'
const wa = '와'
const euro = '으로'
const ro = '로'
const euroseo = '으로서'
const roseo = '로서'
const eurosseo = '으로써'
const rosseo = '로써'
const rieul = 'ㄹ' // charCode 4527
const getJosa = (txt, josa) => {
  if (typeof txt !== 'string' || txt.length === 0 || typeof josa !== 'string' || josa.length === 0) {
    return josa
  }

  const finalConsonant = getFinalConsonant(txt)

  if (josa === eul || josa === reul) {
    return (finalConsonant ? eul : reul)
  } else if (josa === ei || josa === ga) {
    return (finalConsonant ? ei : ga)
  } else if (josa === eun || josa === neun) {
    return (finalConsonant ? eun : neun)
  } else if (josa === gwa || josa === wa) {
    return (finalConsonant ? gwa : wa)
  } else if (josa === euro || josa === ro) {
    return (finalConsonant && finalConsonant !== rieul ? euro : ro)
  } else if (josa === euroseo || josa === roseo) {
    return (finalConsonant && finalConsonant !== rieul ? euroseo : roseo)
  } else if (josa === eurosseo || josa === rosseo) {
    return (finalConsonant && finalConsonant !== rieul ? eurosseo : rosseo)
  } else {
    return josa
  }
}

const getFinalConsonant = (txt) => {
  if (typeof txt !== 'string' || txt.length === 0) {
    return
  }
  const lastTxt = txt.substr(txt.length - 1).toUpperCase()
  const charCode = lastTxt.charCodeAt()
  let finalConsonantCode

  switch (charCode) {
  case 54: // 6
    finalConsonantCode = 1 // "ㄱ"
    break
  case 78: // N
    finalConsonantCode = 4 // "ㄴ"
    break
  case 49: // 1
  case 55: // 7
  case 56: // 8
  case 76: // L
  case 82: // R
    finalConsonantCode = 8 // "ㄹ"
    break
  case 51: // 3
  case 77: // M
    finalConsonantCode = 16 // "ㅁ"
    break
  case 48: // 0
    finalConsonantCode = 21 // "ㅇ"
    break
  }

  finalConsonantCode = finalConsonantCode || (charCode - parseInt('0xac00', 16)) % 28
  return finalConsonantCode > 0 ? String.fromCharCode(finalConsonantCode + parseInt('0x11A8') - 1) : undefined
}
export default i18n
