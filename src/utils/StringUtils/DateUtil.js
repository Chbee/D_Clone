// date 관련 유틸리티
import moment from 'moment'
import SDLUtil from '@/utils/SDLUtil'

/**
 * 현재 날짜 (locale 별 format)
 * @returns {*}
 */
const now = () => moment().format(SDLUtil.getMsgProp('data-format.date.ymd'))

/**
 * 날짜 기준 이후 데이터
 * @param num 더해지는 수치
 * @param unit 더해지는 항목 ex) 년: Y, 월: M, 일: D
 * @param date 기준 날짜 (기본값 - 현재)
 * @returns {string}
 */
const addDate = (num, unit, date = moment()) => moment(date)
  .add(num, unit)
  .format(SDLUtil.getMsgProp('data-format.date.ymd'))

/**
 * 날짜 기준 이전 데이터
 * @param num 빼지는 수치
 * @param unit 빼지는 항목 ex) 년: Y, 월: M, 일: D
 * @param date 기준 날짜 (기본값 - 현재)
 * @returns {string}
 */
const subDate = (num, unit, date = moment()) => moment(date)
  .subtract(num, unit)
  .format(SDLUtil.getMsgProp('data-format.date.ymd'))

/**
 * 표준 포맷으로 변환
 * @param param 날짜 데이터  (String / Object)
 * @returns {string|{endDate: string, startDate: string}}
 */
const stdFormat = param => {
  let result = null
  
  if (param.startDate != null & param.startDate !== undefined) {
    result = {
      startDate: moment(param.startDate).format('YYYY-MM-DD'),
      endDate: moment(param.endDate).format('YYYY-MM-DD')
    }
  } else {
    result = moment(param).format('YYYY-MM-DD')
  }
  return result
}

export default {
  now,
  addDate,
  subDate,
  stdFormat
}
