import { getLocaleMessage } from '@utils/i18n/index.js'

import Confirm from '@comp/common/Confirm'
import Vue from 'vue'

export const _alert = (message, title, okClickListener, options) => {
  if(typeof title === 'function') {
    okClickListener = title
  }
  _confirm({
    title: '',
    content: message || '',
    okLabel: getLocaleMessage('MEMBER_0028'), // 확인
    isConfirm: false,
    isShowCancel: false,
    okClickListener: okClickListener,
    ...(options || {})
  })
}

const _confirm = (options) => {
  if (typeof options !== 'object') {
    return console.error('parameter는 Object 입니다.')
  }
  if (!options.content || options.content.length === 0) {
    return console.error('content는 필수 입니다.')
  }
  if (options.isConfirm == null) {
    options.isConfirm = true
  }

  if (!options.content || options.content === '') {
    return
  }

  const ConfirmConstructor = Vue.extend(Confirm)
  options.title = ''
  options.content = options.content || ''
  options.passXss = options.passXss || false
  options.okLabel = options.okLabel || getLocaleMessage('MEMBER_0028') // 확인
  options.cancelLabel = options.cancelLabel || getLocaleMessage('MEMBER_0098') // 취소
  options.containerClass = options.containerClass || ''
  options.isConfirm = options.isConfirm != null ? options.isConfirm : true
  options.isShowCancel = options.isShowCancel != null ? options.isShowCancel : true
  const popupInstance = new ConfirmConstructor({
    data: options
  })
  popupInstance.vm = popupInstance.$mount()
  document.body.appendChild(popupInstance.vm.$el)
  // this.$page.push({ name: 'popup', vm: popupInstance.vm })
}

export const confirm = _confirm
export const alert = _alert

// [ 'UPPER_SNAKE_CASE', 'CAMEL_CASE' ] => { 'UPPER_SNAKE_CASE' : 'upperSnakeCase', 'CAMEL_CASE' : 'camelCase' } 
export const constMaker = (...keys) => {
  if (!keys || keys.length <= 0) { return {} }
  if (Array.isArray(keys[0])) { keys = keys[0] }
  const con = {}
  //   console.log(keys)
  keys.forEach((key) => { con[key] = camelCase(key) })
  return con
}

// UPPER_SNAKE_CASE to camelCase
export const camelCase = str => {
  const string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
    .reduce((result, word) => result + capitalize(word.toLowerCase()))
  return string.charAt(0).toLowerCase() + string.slice(1)
}

// str to UpperCamelCase
export const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)

// Special Code to Special Characters
export const specialCharacters = str => {
  if(str === null || str === undefined) return ''
      
  const reverseEntityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&rdquo;': '”',
    '&ldquo;': '“',
    '&rsquo;': '’',
    '&middot;': '·',
    '&#39;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
    '&ndash;': '-',
    '&mdash;': '—'
  }
  return String(str).replace(/&amp;|&lt;|&gt;|&quot;|&rdquo;|&ldquo;|&rsquo;|&#39;|&middot;|&#x60;|&#x3D;|&#x2F;|&ndash;|&mdash;/g, function(s) {
    return reverseEntityMap[s]
  })
}

export default {
  camelCase, capitalize, constMaker
}