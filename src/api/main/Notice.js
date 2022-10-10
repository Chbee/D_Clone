import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 공지사항 조회
const searchNotice = ({ pageNo, pageSize, langCd, typeCd, noticeCd, searchType, searchKeyword }) => {
  return network.send({
    method: method.GET,
    url: '/v1/notice/searchNotice',
    params: { pageNo, pageSize, langCd, typeCd, noticeCd, searchType, searchKeyword }
  })
}

// 공지사항 단건 조회
const getNotice = ({ notiIdx, typeCd, langCd, noticeCd }) => {
  return network.send({
    method: method.GET,
    url: '/v1/notice/getNotice',
    params: { notiIdx, typeCd, langCd, noticeCd }
  })
}

export {
  searchNotice,
  getNotice
}