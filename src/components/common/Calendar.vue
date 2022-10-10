<template>
  <div
    class="datepicker_wrap"
  >
    <datepicker
      :wrapper-class="type"
      inline 
      calendar-class="dcalender"
      :language="lang"
      :value="value"
      :maximum-view="'day'"
      :disabled-dates="disabledData"
      :day-cell-content="dayCellContent"
      :open-date="openDate"
      :allowed-to-show-view="()=>{}"
      @selected="selected"
      @changedMonth="changedMonth"
      @changedYear="changedYear"
    />
  </div>
</template>

<script>
// https://github.com/charliekassel/vuejs-datepicker#readme
import moment from 'moment'

import Datepicker from 'vuejs-datepicker'
import { en } from 'vuejs-datepicker/dist/locale'

import network from '@utils/network/index.js'
import method from '@/constants/method.json'

/**
 * date 오류 방지를 위해 convert
 */
const convertDate = (obj = {}) => {
  for(const key in obj) {
    const value = obj[key]
    if(Array.isArray(value) || (typeof value === 'object' && value instanceof Date === false)) convertDate(value)
    if(value instanceof Date === true) { 
      value.setHours(23)
      value.setMinutes(59)
      value.setSeconds(59)
    }
  }
}

export default {
  name: 'CompCalendar',
  components: {
    Datepicker
  },
  props: {
    disabledDates: {
      type: Object,
      default: () => {}
    },
    scheduledDate: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Date, String],
      default: null
    },
    type: {
      type: String,
      default: 'small'
    },
    openDate: {
      type: [Date, String],
      default: null
    },
    limitDoubleYears: {
      type: Boolean,
      default: false
    },
    holiday: {
      type: Boolean,
      default: false
    },
    selectableHoliday: {
      type: Boolean,
      default: false
    },
    place: {
      type: String,
      default: null
    },
    holidayList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['selected', 'changedMonth', 'changedYear'],
  data() {
    return {
      selectedDate: null,
      holidayDay: {},
      disabledData: {},
      isLoadedHoliday: false,
      isChangedPlace: false
    }
  },
  computed: {
    lang() {
      en.ymd = true
      en.yearSuffix = ' .'
      for(let i = 1; i <= 12; i++) {
        en._monthsAbbr[i - 1] = (i < 10 ? '0' : '') + i
      }
      return en
    }
  },
  watch: {
    place: {
      immediate: false,
      handler(val) {
        this.isChangedPlace = true
        if(this.holiday) {
          if(this.isLoadedHoliday) {
            this.setHoliday()
          }
        }
      }
    },
    scheduledDate(val) {
      // 장소가 변경될때만 날짜별 리스트 조회해야함 (월이 변경되어 스크케줄리스트가 변경될때는 조회하면 안됨)
      // 장소가 변경된후 스케줄 리스트가 변경되면 날짜 변경 이벤트 전달
      this.isChangedPlace && this.selected(this.selectedDate || this.value)
      this.isChangedPlace = false
    },
    disabledDates: {
      immediate: true,
      handler(val) {
        const obj = { ...val }
        if(this.limitDoubleYears) {
          if(!obj.from || !moment().add(2, 'year').isAfter(obj.from)) {
            obj.from = moment().add(2, 'year').toDate()
          }
          if(!obj.to || !moment().subtract(2, 'year').isBefore(obj.to)) {
            obj.to = moment().subtract(2, 'year').toDate()
          }
        }
        convertDate(obj)
        this.disabledData = obj
      }
    }
  },
  mounted() {
    require('@styles/elements/calendar.scss')

    if(this.holiday) {
      this.selectListCalendar()
        .then(() => {
          this.setHoliday()
          this.selected(this.value)  
        })
    }
  },
  methods: {
    selected(date) {
      if(date != null && date.getDay) {
        this.selectedDate = date
        if(this.holiday && this.isHoliday(date)) {
          this.$emit('selectHoliday')
        }else{
          this.$emit('selected', date, this.hasSchedule(date), `${date.getFullYear()}-${this.addZero(date.getMonth() + 1)}-${this.addZero(date.getDate())}`)
        }
      }
    },
    addZero(value) {
      return (value + '').padStart(2, '0')
    },
    dayCellContent(dayCell) {
      const time = new Date(dayCell.timestamp)
      let holiday = ''
      if(this.holiday && this.selectableHoliday) {
        const holNm = this.isHoliday(time)
        holiday = holNm ? `<span class="holiday on">${holNm}</span>` : ''
      }
      const circle = this.scheduledDate.length && holiday.length === 0 ? this.addCircle(dayCell) : ''
      return `<div class="cell_wrap">
        <div>
          <p>${dayCell.date}</p> 
          <div class="mark">
          ${circle}
          ${holiday}
          </div>
        </div>
      </div>`
    },
    getScheduleFilterList(dateTime) {
      const date = moment(dateTime).format('YYYY-MM-DD')
      return this.scheduledDate.filter(item => {
        return date === item.eachDay
      })
    },
    hasSchedule(dateTime) {
      return this.getScheduleFilterList(dateTime).length
    },
    addCircle(dayCell) {
      let circleDiv = ''
      this.getScheduleFilterList(moment(dayCell.timestamp).toDate()).forEach(item => {
        if(item.edu > 0) { circleDiv += '<span class="black on"></span>' }
        if(item.ehb > 0) { circleDiv += '<span class="green on"></span>' }
        if(item.evt > 0) { circleDiv += '<span class="orange on"></span>' }
      })
      return circleDiv
    },
    changedMonth(date) {
      this.$emit('changedMonth', date.month ? new Date(date.timestamp) : date)
    },
    changedYear(date) {
      this.$emit('changedYear', date.year ? new Date(date.timestamp) : date)
    },
    selectListCalendar () {
      return network.send({
        method: method.GET,
        url: '/v1/gallery/info'
      }).then(rst => {
        this.isLoadedHoliday = true
        this.holidayDay.PG00701 = this.getDay(rst[0].closedDayCd)
        this.holidayDay.PG00702 = this.getDay(rst[1].closedDayCd)
        this.holidayDay.PG00703 = this.getDay(rst[2].closedDayCd)
        if(this.holidayDay.PG00701 === this.holidayDay.PG00702 && this.holidayDay.PG00702 === this.holidayDay.PG00703) {
          this.holidayDay.all = this.holidayDay.PG00701
        }
        Promise.resolve()
      })
    },
    getDay(cd) {
      switch(cd) {
      case '8800100':
        return 1
      case '8800120':
        return 2
      case '8800130':
        return 3
      case '8800140':
        return 4
      case '8800150':
        return 5
      case '8800160':
        return 6
      case '8800170':
        return 0
      }
    },
    setHoliday() {
      // 정규 휴일만 선택못하도록 함
      if(this.holiday && !this.selectableHoliday && this.holidayDay && this.isLoadedHoliday) {
        this.disabledData = { ...this.disabledData }
        this.disabledData.days = [this.holidayDayNumber()]
      }
    },
    holidayDayNumber() {
      return this.holidayDay[this.place || 'all']
    },
    isHoliday(time) {
      // 전달받은 휴일 리스트
      for(const i in this.holidayList) {
        if(moment(time).format('YYYY-MM-DD') === this.holidayList[i].eachDay) {
          return this.holidayList[i].holNm
        }
      }
      // 정규 휴일
      if(time.getDay() === this.holidayDayNumber()) { return this.$t('CAL_0005') } // 휴관일
    }
  }
}
</script>
