import method from '@/constants/method.json'
import network from '@utils/network/index.js'

// 카테고리 전체 목록 조회
const searchShopCategoryList = () => {
  return network.send({
    method: method.GET,
    url: '/v1/product/searchShopCategoryList'
  })
}

export {
  searchShopCategoryList
}