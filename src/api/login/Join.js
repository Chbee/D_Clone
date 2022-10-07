import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 아이디/휴대폰번호/이메일 중복체크
const checkDuplicationApi = ({ webId, cellNo, email }) => {
  return network.send({
    method: method.GET,
    url: '/v1/join/check/duplicate',
    meta: { passed: true },
    params: { webId, cellNo, email }

  })
}
// 일반회원가입
const joinApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/join',
    meta: { passed: true },
    data
  })
}
// apple 소셜 회원가입
const joinAppleApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/join/apple',
    meta: { passed: true },
    data
  })
}

// 회원가입 약관목록
const getJoinTermCodes = () => {
  return network.send({
    method: method.GET,
    url: '/v1/join/code/terms'
  })
}

// 추가정보입력 약관목록
const getJoinAdditionalTermCodes = () => {
  return network.send({
    method: method.GET,
    url: '/v1/join/code/terms/additional'
  })
}

export {
  checkDuplicationApi,
  joinApi,
  joinAppleApi,
  getJoinTermCodes,
  getJoinAdditionalTermCodes
}
