import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 상품목록 페이징 조회
const searchStyleList = (param) => {
  return network.send({
    method: method.GET,
    url: '/v1/product/searchStyleList',
    params: param
  })
}

// 상품목록 상세 조회
const getStyle = ({ ...params }) => { // 상품 단건 조회
  return network.send({
    method: method.GET,
    url: '/v1/product/getStyle',
    params: params
  })
}

export {
  searchStyleList,
  getStyle
}