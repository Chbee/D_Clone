/**
 * Input Box Validation
 */

// Type 정의
export const INPUT_TYPE = {
  NOT_KOR: 'not_kor',
  NUMBER: 'number',
  NOT_SYMBOL: 'not_symbol',
  ENG: 'eng',

  ID: 'id',
  PASSWORD: 'password',
  COUPON: 'coupon',
  PIN: 'pin',
  MEMBER: 'member',
  TICKET: 'ticket',
  ORDER: 'order',
  SQL: 'sql'
}

// 유효성 체크를 위한 정규식 정의
export const REG_MATCH = {
  SYMBOL: /[~!@#$%^&*()_+|<>?:{}.,`'"/]/g,
  KOR: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ig,
  NOT_KOR: /^[a-z0-9_]/,
  NUMBER: /^[0-9]+$/,
  ENG: /^[a-z]+$/,
  PASSWORD: /^[a-zA-Z][a-z0-9~!@#$%^&*()_+|<>?:{}_]{10,14}$/, // 첫글자 영어
  ID: /^[a-zA-Z][a-z0-9_]{6,12}$/, // 첫글자 영어
  ID_EMAIL: /^[a-zA-Z0-9_][a-zA-Z0-9_.@]{6,45}$/, // 첫글자 영어
  COUPON: /^[a-zA-Z0-9_]{1,20}$/,
  PIN: /^[a-z0-9_]{12}$/,
  MEMBER: /^[0-9_]{8}$/,
  TICKET: /^[0-9_]{18}$/
}

// 공백으로 치환을 위한 정규식 정의
const REG_REPLACE = {
  SYMBOL: /[~!@#$%^&*()_+|<>?:{}.,`'"/]/g,
  KOR: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ig,
  NOT_KOR: /^[a-z0-9_]/,
  NUMBER: /[0-9]/g,
  ENG: /[a-z]/ig,
  SQL: /SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|FROM|WHERE|SET|ORDER BY|EXEC|OR|AND|UNION|FETCH|DECLARE|TRUNCATE|RALLBACK/ig
}

// 유효성 체크 @return Boolen
export const testReg = (inputType, cntnt) => {
  switch(inputType) {
  case INPUT_TYPE.ID:
    return REG_MATCH.ID.test(cntnt)
  case INPUT_TYPE.PASSWORD:
    return REG_MATCH.PASSWORD.test(cntnt)
  case INPUT_TYPE.NUMBER:
    return REG_MATCH.NUMBER.test(cntnt)
  case INPUT_TYPE.COUPON:
    return REG_MATCH.COUPON.test(cntnt)
  case INPUT_TYPE.PIN:
    return REG_MATCH.PIN.test(cntnt)
  case INPUT_TYPE.TICKET:
    return REG_MATCH.TICKET.test(cntnt)
  case INPUT_TYPE.MEMBER:
    return REG_MATCH.MEMBER.test(cntnt)
  }
}

// 정규식 체크를 통한 공백으로 치환 @return String
export const reaplceCntnt = (inputType, cntnt) => {
  switch(inputType) {
  case INPUT_TYPE.ID:
  case INPUT_TYPE.COUPON:
  case INPUT_TYPE.PIN:
  case INPUT_TYPE.ORDER:
    // 영문 + 숫자 : 한국어, 특수기호는 공백으로 치환
    cntnt = reaplceCntnt(INPUT_TYPE.NOT_KOR, cntnt)
    cntnt = reaplceCntnt(INPUT_TYPE.NOT_SYMBOL, cntnt)
    break
  case INPUT_TYPE.PASSWORD:
    // 영문 + 숫자 + 특수기호 : 한국어만 공백으로 치환
    cntnt = reaplceCntnt(INPUT_TYPE.NOT_KOR, cntnt)
    break
  case INPUT_TYPE.NUMBER:
    // 숫자 : 한국어, 영어, 특수기호는 공백으로 치환
    cntnt = reaplceCntnt(INPUT_TYPE.ENG, cntnt)
    cntnt = reaplceCntnt(INPUT_TYPE.NOT_KOR, cntnt)
    cntnt = reaplceCntnt(INPUT_TYPE.NOT_SYMBOL, cntnt)
    break
  case INPUT_TYPE.ENG:
    // 영어 공백으로 치환
    cntnt = replaceReg(REG_REPLACE.ENG, cntnt)
    break
  case INPUT_TYPE.NOT_KOR:
    // 한국어 공백으로 치환
    cntnt = replaceReg(REG_REPLACE.KOR, cntnt)
    break
  case INPUT_TYPE.NOT_SYMBOL:
    // 특수기호 공백으로 치환
    cntnt = replaceReg(REG_REPLACE.SYMBOL, cntnt)
    break
  case INPUT_TYPE.SQL:
    // SQL 키워드 공백으로 치환
    cntnt = replaceReg(REG_REPLACE.SQL, cntnt)
    break
  }

  return cntnt
}

const replaceReg = (reg, cntnt) => {
  reg.test(cntnt) && (cntnt = cntnt.replace(reg, ''))
  return cntnt
}

// SQL Injection 공격을 방지하기 위해 특수 키워드(SQL 키워드)를 공백으로 치환   (2022.02.16 특수 문자 제외) 
// 검색어가 삭제되는 경우가 있어 SQL 필터 제거 EX) ZZUGLI@NATE.ORG => ZZUGLI@NATE.G 
export const replaceSpecialKeyword = (str) => {
  // SQL 키워드를 공백으로 변환
  // str = reaplceCntnt(INPUT_TYPE.SQL, str)

  return str.trim() // 2022.02.17 수정 → 스패이스 무입력(TRIM 처리)
}

export default {
  reaplceCntnt, testReg, REG_MATCH, INPUT_TYPE
}
