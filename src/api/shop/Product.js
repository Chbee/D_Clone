import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 단품 목록 조회
const searchProductList = (styleNo) => {
  return network.send({
    method: method.GET,
    url: '/v1/product/searchProductList',
    params: {
      styleNo: styleNo
    }
  })
}

// 작성한 후기 단건 조회
const getWrittenReview = ({ ...reviewParams }) => {
  return network.send({
    method: method.GET,
    url: '/v1/product/getWrittenReview',
    meta: { passed: true },
    params: { ...reviewParams }
  })
}

// 작성가능한 후기 정보 단건 조회
const getWritableReview = (styleNo) => {
  return network.send({
    method: method.GET,
    url: '/v1/product/getWritableReview',
    meta: { passed: true },
    params: { styleNo }
  })
}

// 상품 후기 조회
const searchProductDetailReview = ({ ...reviewParams }) => {
  return network.send({
    method: method.GET,
    url: '/v1/product/searchProductDetailReview',
    params: { ...reviewParams }
  })
}

// 상품상세 상품문의 
const searchProductDetailQnaList = ({ ...params }) => {
  return network.send({
    method: method.GET,
    url: '/v1/product/getQnaProductList',
    params: params
  })
}

export {
  searchProductList,
  getWrittenReview,
  getWritableReview,
  searchProductDetailReview,
  searchProductDetailQnaList
}