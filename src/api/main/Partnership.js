import network from '@utils/network/index.js'
import method from '@/constants/method.json'

// 파일 업로드
const uploadFile = (file) => {
  return network.send({
    method: method.POST,
    url: '/v1/partner/uploadFile',
    contentsType: 'multipart/form-data',
    data: file
  })
}

// 대관/제휴 등록
const registPartnership = (data) => {
  return network.send({
    method: method.POST,
    url: '/v1/partner/regist',
    meta: { passed: true },
    data
  })
}

export {
  uploadFile,
  registPartnership
}