import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 장바구니 조회
const searchCartList = () => {
  return network.send({
    method: method.GET,
    url: '/v1/cart/searchCartList'
  })
}

// 장바구니 등록
const registCart = (productList) => {
  return network.send({
    url: '/v1/cart/registCart',
    method: method.POST,
    meta: { passed: true },
    data: { registCartList: productList }
  })
}

// 장바구니 수정
const updateCart = ({ cartSeq, productNo, qty }) => {
  return network.send({
    url: '/v1/cart/updateCart',
    method: method.POST,
    meta: { passed: true },
    params: { cartSeq, productNo, qty }
  })
}

// 장바구니 삭제
const deleteCart = (cartSeqAr) => {
  return network.send({
    url: '/v1/cart/deleteCart',
    method: method.DELETE,
    params: { cartSeqAr }
  })
}

export {
  searchCartList,
  registCart,
  updateCart,
  deleteCart
}