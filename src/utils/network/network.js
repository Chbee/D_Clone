import axiosInstance from './axiosInstance.js'

class Network {
  constructor({ baseURL }) {
    // axios 인스턴스 할당
    this.$network = axiosInstance
    // baseURL 설정
    this.$baseURL = baseURL   
  }

  // axio 인스턴스 생성에 필요한 속성 설정
  setConfig({ method, url, params, data, meta }) {
    return {
      baseURL: this.setBaseUrl(url),
      method,
      ...this.pathVariableParser(url, params),
      data: this.setData(method, data),
      headers: this.setHeaders(data),
      meta: meta
    }
  }

  // axios 네트워크 요청을 보내는 함수
  send ({ method, url, params, data, meta }) {
    return this.$network(this.setConfig({ method, url, params, data, meta }))
  }

  // get method 이면 data를 지웁니다.
  setData(method, data) {
    return method === 'get' ? null : data
  }

  // url에 http가 포함 여부 검사 - http가 포함되이있으면 외부 API 호출로 판단
  checkExternalUrl(url) {
    return url && typeof (url) === 'string' && url.indexOf('http://') !== -1 && url.indexOf('https://') !== -1
  }

  // 외부 API 호출이면 baseURL를 사용하지 않습니다.
  setBaseUrl(url) {
    return this.checkExternalUrl(url) ? undefined : this.$baseURL
  }

  // 헤더 세팅
  setHeaders(data) {
    // data 가 있으면 json을 지정해준다.
    return data ? { 'Content-Type': 'application/json' } : undefined
  }

  // pathVariable 파싱
  pathVariableParser(url, params) {
    // 1. exception 
    // 2. pathVariable 세팅이 되어있지 않으면 건너 뛴다. 
    if(!params && url && typeof (url) === 'string' && url.indexOf('{') === -1) return { url, params }

    const objectList = Object.keys(params).map((key) => [key, params[key]])

    for(const info of objectList) {
      const key = info[0]
      const value = info[1]
    
      if(url.indexOf(key) !== -1) {
        url = url.replace(`{${key}}`, `${value}`)
        delete params[key]
      }
    }
    console.log('url ', url)
    return {
      url: url,
      params: params
    }
  }
}

export default Network