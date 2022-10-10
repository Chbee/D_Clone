import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 캘린더 리스트 조회
const selectListCalendar = (dateString, prgPlcCd) => {
  return network.send({
    method: method.GET,
    url: '/v1/calendar',
    params: { yearMonth: dateString, prgPlcCd: prgPlcCd }
  })
}

// 일별 스케줄 조회
const selectListScheduleByDay = (dateString, prgPlcCd) => {
  return network.send({
    method: method.GET,
    url: '/v1/calendar/programs',
    params: { date: dateString, prgPlcCd: prgPlcCd }
  })
}

export {
  selectListCalendar,
  selectListScheduleByDay
}