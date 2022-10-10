import { selectListCalendar, selectListScheduleByDay } from '@api/main/Schedule'

const ModuleName = 'main/calendar'


const module = {
  namespaced: true,
  state: {
    calendarList: [],
    scheduleListByDay: [],
    holidayList: [],
    selectedDay: 0,
    selectedMonth: 0,
    selectedYear: 0,
    selectedType: null
  },
  getters: {
    calendarList (state) {
      return state.calendarList || []
    },
    scheduleListByDay (state) {
      return state.scheduleListByDay || []
    },
    holidayList (state) {
      return state.holidayList || []
    },
    selectedDay(state) {
      return state.selectedDay
    },
    selectedMonth(state) {
      return state.selectedMonth
    },
    selectedYear(state) {
      return state.selectedMonth
    },
    selectedType(state) {
      return state.selectedType
    }
  },
  actions: {
    selectListCalendar({ state }) {
      if(state.isLoading) return
      state.isLoading = true
      selectListCalendar(`${state.selectedYear}-${addZero(state.selectedMonth)}`, state.selectedType)
        .then(result => {
          state.isLoading = false
          state.calendarList = result.infoList
          state.holidayList = result.holidayList
        }) 
    },
    selectListScheduleByDay ({ state }) {
      selectListScheduleByDay(`${state.selectedYear}-${addZero(state.selectedMonth)}-${addZero(state.selectedDay)}`)
        .then(list => {
          state.scheduleListByDay = list
        }) 
    },
    setSelectedType({ state }, payload) {
      state.selectedType = payload
    }
  },
  mutations: {
    setDate(state, date) {
      date.day && (state.selectedDay = date.day)
      date.month && (state.selectedMonth = date.month)
      date.year && (state.selectedYear = date.year)
    }
  }
}
const addZero = (value) => {
  return (value + '').padStart(2, '0')
}
export {
  module,
  ModuleName
}