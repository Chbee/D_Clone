// string 관련 유틸리티

/*
 * desc : url 쿼리 문자열로 변경
 * param : Object
 */
const queryStringfy = obj => {
  const str = []
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    }
  })

  return str.join('&')
}

/*
 * desc : 입력된 문자열이 url 패턴인지 체크
 * param : {
 *           str : String
 *         }
 */
const checkPatternUrl = str => {
  const expUrl = /^(http\\:\/\/)?((\w+)[.])+(asia|biz|cc|cn|com|de|eu|in|info|jobs|jp|kr|mobi|mx|name|net|nz|org|travel|tv|tw|uk|us)(\/(\w*))*$/i
  return expUrl.test(str)
}

// 이메일 형식 검사
const checkRegexEamil = (str) => {
  const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
  return pattern.test(str)
}

// Object 빈 값 체크
const isEmpty = (obj) => {
  if(obj == null || ((obj.constructor === String) && obj.trim() === '')) {
    return true
  }

  return false
}

// 정규표현식 매칭 여부
const isMatchRegExp = (regExp, str) => {
  if(regExp.test(str)) {
    return true
  }

  return false
}

const convertToCellNumberFormat = (cellNumber) => {
  if (cellNumber.length === 11) {
    return cellNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  } else if (cellNumber.length === 8) {
    return cellNumber.replace(/(\d{4})(\d{4})/, '$1-$2')
  } else if (cellNumber.length === 10) {
    if (cellNumber.indexOf('02') === 0) {
      return cellNumber.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
    } else {
      return cellNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
  }

  return cellNumber
}

const splitMessageByNewLineTag = message => {
  return message.split(/<br\s*\/?\s*>/).filter(msg => msg && !isEmpty(msg.trim()))
    .map(msg => msg.trim())
}

export {
  queryStringfy,
  checkPatternUrl,
  checkRegexEamil,
  isEmpty,
  isMatchRegExp,
  convertToCellNumberFormat,
  splitMessageByNewLineTag
}
