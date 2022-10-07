import network from '@utils/network/index.js'
import method from '@/constants/method.json'
import moment from 'moment'

const ModuleName = 'event/program'

const TYPES = {
  CURRENT_PROGRAMS: 'currentPrograms',
  PAST_PROGRAMS: 'pastPrograms',
  PROGRAM_DETAIL: 'programDetail',

  GET_CURRENT_PROGRAMS: 'getCurrentPrograms',
  GET_PAST_PROGRAMS: 'getPastPrograms',
  GET_PROGRAM_DETAIL: 'getProgramDetail',

  SELECT_CURRENT_PROGRAMS: 'selectCurrentPrograms',
  SELECT_PAST_PROGRAMS: 'selectPastPrograms',
  SELECT_PROGRAM_DETAIL: 'selectProgramDetail',

  SET_CURRENT_PROGRAMS: 'setCurrentPrograms',
  SET_PAST_PROGRAMS: 'setPastPrograms',
  SET_PROGRAM_DETAIL: 'setProgramDetail',
  ADD_PAST_PROGRAMS: 'addPastPrograms'
}

const helper = {
  convertCurrentPrograms(programs = []) {
    return programs.map(({
      prgImgFileUrl,
      prgImgFileUrlMobile,
      prgPlcVal,
      prgPlcDtl,
      prgStartDt,
      prgEndDt,
      prgOpenTime,
      prgCloseTime,
      prgNm,
      prgDesc,
      prgIdx
    }) => {
      const background = prgImgFileUrl
      const backgroundMobile = prgImgFileUrlMobile
      const place = `${prgPlcVal === prgPlcDtl ? prgPlcVal : `${prgPlcVal} ${prgPlcDtl || ''}`}`
      const gallery = prgPlcVal
      const startDay = '?'
      const period = prgStartDt === prgEndDt ? `${prgStartDt} ${startDay}` : `${prgStartDt} ~ ${prgEndDt}`
      const time = `${period} ` + (prgOpenTime ? `${moment(prgOpenTime, 'HH:mm:ss').format('HH:mm')} ~ ${moment(prgCloseTime, 'HH:mm:ss').format('HH:mm')}` : '')
      const title = prgNm
      const explain = prgDesc

      return {
        background, backgroundMobile, place, gallery, time, title, explain, prgIdx
      }
    })
  },
  convertPastPrograms(programs = []) {
    return programs.map(({
      prgImgFileUrl,
      prgImgFileUrlMobile,
      prgPlcVal,
      prgStartDt,
      prgEndDt,
      prgNm,
      prgDesc,
      prgIdx
    }) => {
      const thumb = prgImgFileUrl
      const thumbMobile = prgImgFileUrlMobile
      const place = prgPlcVal
      const term = prgStartDt === prgEndDt ? `${prgStartDt}` : `${prgStartDt} - ${prgEndDt}`
      const title = prgNm
      const explain = prgDesc
      const link = 'javascript:void(0);'

      return {
        thumb, place, term, title, explain, link, prgIdx
      }
    })
  }
}

const module = {
  namespaced: true,
  state: {
    [TYPES.CURRENT_PROGRAMS]: [],
    [TYPES.PAST_PROGRAMS]: [],
    [TYPES.PROGRAM_DETAIL]: []
  },
  getters: {
    [TYPES.GET_CURRENT_PROGRAMS](state) {
      return state[TYPES.CURRENT_PROGRAMS]
    },
    [TYPES.GET_PAST_PROGRAMS](state) {
      return state[TYPES.PAST_PROGRAMS]
    },
    [TYPES.GET_PROGRAM_DETAIL](state) {
      return state[TYPES.PROGRAM_DETAIL]
    }
  },
  actions: {
    [TYPES.SELECT_CURRENT_PROGRAMS](context, payload) {
      return new Promise((resolve, reject) => {
        network.send({
          method: method.GET,
          params: payload,
          url: '/v1/program/event/current'
        }).then((data) => {
          context.commit(TYPES.SET_CURRENT_PROGRAMS, helper.convertCurrentPrograms(data.data))
          resolve(data.data)
        }).catch((e) => {
          reject(e)
        })
      })
    },
    [TYPES.SELECT_PAST_PROGRAMS](context, payload) {
      return new Promise((resolve, reject) => {
        network.send({
          method: method.GET,
          params: payload,
          url: '/v1/program/event/past'
        }).then((data) => {
          if(payload.pageNo === 1) {
            context.commit(TYPES.SET_PAST_PROGRAMS, helper.convertPastPrograms(data.data))
          } else {
            context.commit(TYPES.ADD_PAST_PROGRAMS, helper.convertPastPrograms(data.data))
          }
          resolve(data)
        }).catch((e) => {
          reject(e)
        })
      })
    },
    [TYPES.SELECT_PROGRAM_DETAIL](context, payload) {
      return new Promise((resolve, reject) => {
        network.send({
          method: method.GET,
          params: { prgIdx: payload.prgIdx },
          url: payload.isPreview ? '/preview/event/{prgIdx}' : '/v1/program/event/detail'
        }).then((data) => {
          context.commit(TYPES.SET_PROGRAM_DETAIL, data)
          resolve(data)
        }).catch((e) => {
          reject(e)
        })
      })
    }
  },
  mutations: {
    [TYPES.SET_CURRENT_PROGRAMS](state, payload) {
      state[TYPES.CURRENT_PROGRAMS] = payload
    },
    [TYPES.SET_PAST_PROGRAMS](state, payload) {
      state[TYPES.PAST_PROGRAMS] = payload
    },
    [TYPES.SET_PROGRAM_DETAIL](state, payload) {
      state[TYPES.PROGRAM_DETAIL] = payload
    },
    [TYPES.ADD_PAST_PROGRAMS](state, payload) {
      state[TYPES.PAST_PROGRAMS] = [...state[TYPES.PAST_PROGRAMS], ...payload]
    }
  }
}

export {
  TYPES,
  module,
  ModuleName
}

