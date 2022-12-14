import network from '@utils/network/index.js'
import method from '@/constants/method.json'

const getDayInfo = () => {
  return network.send({
    method: method.GET,
    url: '/v1/mainSample/selectDayInfo'
  })
}

export {
  getDayInfo
}