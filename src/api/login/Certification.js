import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 인증번호 발송
const sendCertificationNoApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/certification/send',
    meta: { passed: true },
    data
  })
}
// 인증번호 확인
const verifyCertificationNoApi = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/certification/verify',
    meta: { passed: true },
    data
  })
}

export {
  sendCertificationNoApi,
  verifyCertificationNoApi
}
