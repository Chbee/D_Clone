import Network from './network.js'

const network = new Network({
  // .env 파일 내 설정 필요
  baseURL: process.env.VUE_APP_BASE_URL
})

export default network
