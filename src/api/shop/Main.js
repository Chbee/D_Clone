import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 메인화면 배너목록 조회
const searchStorehomeList = () => {
  return network.send({
    method: method.GET,
    url: '/api/v1/shop/searchStorehomeList'
  })
}

// 메인화면 배너 그룹번호 단건조회
const getStorehomeInfo = ({ ...params }) => {
  return network.send({
    method: method.GET,
    url: '/api/v1/shop/getStorehome',
    params: params
  })
}

export {
  searchStorehomeList,
  getStorehomeInfo
}