import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 팝업 정보 가져오기
const searchPopup = (dispCd, webUseYn, appUseYn, mwebUseYn) => {
  return network.send({
    method: method.GET,
    url: '/v1/popup/searchPopup',
    params: { dispCd, webUseYn, appUseYn, mwebUseYn }
  })
}

export {
  searchPopup
}