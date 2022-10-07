import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 기업 및 단체구매 신청
const registBulk = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/faq/registBulk',
    data: data
  })
}

// 아트상품 e-카탈로그 다운로드
const catalogDownload = () => {
  return network.send({
    method: method.GET,
    url: '/v1/faq/catalogDownload'
  })
}

export {
  registBulk,
  catalogDownload
}