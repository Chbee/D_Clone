import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 파라미터 약관 유형인 모든 약관 리스트 조회
const getTermsList = (termCd) => {
  return network.send({
    method: method.GET,
    url: '/v1/terms/getTermsList',
    params: { termCd }
  })
}

// 파라미터 약관 유형인 모든 약관 리스트 조회 (대림문화재단 용)
const getTermsListForMuseum = (termCd) => {
  return network.send({
    method: method.GET,
    url: '/v1/terms/getKoTermsList',
    params: { termCd }
  })
}

// 최신 약관 조회
const getLatestTerms = (termCd) => {
  return network.send({
    method: method.GET,
    url: '/v1/terms/latest',
    params: { termCd }
  })
}

export {
  getTermsList,
  getLatestTerms,
  getTermsListForMuseum
}