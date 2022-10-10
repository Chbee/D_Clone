import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 아이디 찾기
const findIdApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/find/id',
    meta: { passed: true },
    data
  })
}
// 패스워드 찾기
const findPwdApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/find/pwd',
    meta: { passed: true },
    data
  })
}
// 패스워드 재설정 (패스워드 찾기 후)
const changePasswordAfterFindPwdApi = (data) => {
  return network.send({
    method: method.PUT,
    url: '/v1/find/change/password',
    meta: { passed: true },
    data
  })
}

export {
  findIdApi,
  findPwdApi,
  changePasswordAfterFindPwdApi
}
