import network from '@utils/network/index.js'
import method from '@/constants/method.json'

const fetchVisualListData = (value) => {
  return network.send({
    method: method.GET,
    url: '/v1/mainSample/mainSection',
    params: { homeCd: value }
  })
}

export { fetchVisualListData }