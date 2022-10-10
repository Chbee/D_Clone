import network from '@utils/network/index.js'

import method from '@/constants/method.json'

// 재로그인
const reloginApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/relogin',
    meta: { passed: true },
    data
  })
}
// 로그인
const loginApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/login',
    meta: { passed: true },
    data
  })
}
// SNS 인증 URL
const getSnsAuthApi = (type) => {
  return network.send({
    method: method.GET,
    url: `/v1/login/auth/${type}`,
    meta: { passed: true }
  })
}
// SNS 회원정보
const getSnsUserApi = (data, type) => {
  return network.send({
    method: method.POST,
    url: `/v1/login/${type}`,
    meta: { passed: true },
    data
  })
}
// SNS 기존계정 연동
const connectSnsApi = (data) => {
  return network.send({
    method: method.PUT,
    url: '/v1/login/connect/sns',
    meta: { passed: true },
    data
  })
}
// 계정 잠금 해제
const resolveLockedApi = (data) => {
  return network.send({
    method: method.PUT,
    url: '/v1/login/resolve/locked',
    meta: { passed: true },
    data
  })
}
// 계정 휴면 해제
const resolveSleepApi = (data) => {
  return network.send({
    method: method.PUT,
    url: '/v1/login/resolve/sleep',
    meta: { passed: true },
    data
  })
}
// 비밀번호 변경 (90일 경과 안내 팝업)
const changePasswordApi = (data) => {
  return network.send({
    method: method.PUT,
    url: '/v1/login/change/password',
    meta: { passed: true },
    data
  })
}
// 비밀번호 90일 후에 변경 (90일 경과 안내 팝업)
const changePwdUptateApi = () => {
  return network.send({
    method: method.PUT,
    url: '/v1/login/change/pwduptdate',
    meta: { passed: true }
  })
}

export {
  loginApi,
  getSnsAuthApi,
  getSnsUserApi,
  connectSnsApi,
  resolveLockedApi,
  resolveSleepApi,
  changePasswordApi,
  changePwdUptateApi,
  reloginApi
}
