import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 상품정보고시 조회
const getOfficialInfo = (styleNo) => {
  return network.send({
    method: method.GET,
    url: '/v1/official/getOfficialInfo',
    params: {
      styleNo: styleNo
    }
  })
}

export {
  getOfficialInfo
}