import axios from 'axios'
import router from '*/router'
import network from '@utils/network/index.js'
import { reloginApi } from '@api/login/Login'
import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, logout } from '@utils/login'
import { alert } from '@utils/common/common.js'

const axiosInstance = axios.create() // axios init
const AUTHORIZATION_TYPE = 'Bearer'

/**
 * Refresh token 인증 진행간에 발생한 다중요청 처리시 사용
 */
let isTokenRefreshing = false
const refreshSubscribers = []

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken))
}
// 매개변수 : callback
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback)
}

/*
    1. 요청 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 요청 바로 직전 - 인자값: axios config
    2) 요청 에러 - 인자값: error
*/
axiosInstance.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.

    const locale = localStorage.getItem('locale') || 'ko'
    if(locale) {
      config.headers['Accept-Language'] = locale
    }
    if(config.meta && config.meta.locale) {
      config.headers['Accept-Language'] = config.meta.locale
    }

    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `${AUTHORIZATION_TYPE} ${accessToken}`
      return config
    }
    // accessToken 없으면, 헤더의 인증 부분 삭제하고 return..?
    delete config.headers.Authorization

    return config
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error)
  }
)

/*
    2. 응답 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 응답 정성 - 인자값: http response
    2) 응답 에러 - 인자값: http error
*/
axiosInstance.interceptors.response.use(
  function (response) {
    /*
            http status가 200인 경우
            응답 바로 직전에 대해 작성합니다. 
            .then() 으로 이어집니다.
    //     */

    const config = response.config
    // meta passed 는 api request할때 지정해줌
    // passed: true -> data resultCode 신경x, 화면단에서 분기처리.....?
    if(config.meta && config.meta.passed) {
      return Promise.resolve(response)
    }


    if(response.data.resultCode === '10' || response.data.resultCode === '20') {
      return Promise.resolve(response.data.data || {})
    }else{
      // 공통 오류 처리, resultCode가 10이 아니거나, 20이 아닐때 오류로 간주 (response code가 200이어도)
      const msg = response.data.resultMessage || ''
      msg.length > 0 && alert(msg)
      return Promise.resolve(response.data)
    }
  },
  // 에러 비동기 처리
  async function (error) {
    /*
            http status가 200이 아닌 경우       
            응답 에러 처리를 작성합니다.
            .catch() 으로 이어집니다.    
        */

    /**
        * Refresh token 인증
        */
    // error response 없을때?
    if(!error.response) {
      console.log(error)
      return 
    }
    const message = error.response.data.resultMessage
    
    // error내 데이터 매핑 (error.config, error.response.status)
    const { config, response: { status } } = error
    const originalRequest = config
   
    if (status === 401) {
      // Refresh token 인증 진행간에 요청들 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = 'Bearer ' + accessToken
          // resolve(axios(originalRequest))
          resolve(network.send(originalRequest)) // => then으로 데이터 전달
        })
      })
      // Refresh token 인증 진행간에 다중 요청 방지
      if (!isTokenRefreshing) {
        isTokenRefreshing = true

        const param = {}
        param.refreshToken = getRefreshToken()
        param.isAppLogin = process.env.NODE_ENV.indexOf('MOB') >= 0

        // Refresh Token으로 재발급
        await reloginApi(param)
          .then(reloginResponse => {
            const { accessToken, refreshToken } = reloginResponse.data?.data

            // 토큰 갱신
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)

            // 진행중여부 변경 및 default header 변경
            isTokenRefreshing = false
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

            // 새로운 토큰으로 지연되었던 요청 진행
            onTokenRefreshed(accessToken)
          }).catch(reloginError => {
            // Refresh Token 만료
            const { status, data } = reloginError?.response
            isTokenRefreshing = false

            if (status === 403 && data.resultCode === '74') {
              logout()
              router.push('/login')
            }
          })
      }
      return retryOriginalRequest
    }else{
      // 오류 발생해도 meta passed값이 true이면 무시
      if(config.meta && config.meta.passed) {
        // no alert
      }else{
        message && message.length > 0 && alert(message)
      }
    }
   
    return Promise.reject(error)
  }
)
// 생성한 인스턴스를 익스포트 합니다.
export default axiosInstance