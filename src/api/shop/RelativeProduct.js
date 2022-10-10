import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 연관 상품 목록 조회
const searchRelProductList = ({ ...params }) => {
  return network.send({
    method: method.GET,
    url: '/v1/returnDelivery/getRelProductList',
    params: params
  })
}

export {
  searchRelProductList
}