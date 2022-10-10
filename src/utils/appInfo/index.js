const APP_SCHEMA = 'daelim://'

// 앱 로그인 -> DLM-298
const appLogin = (custno, autologinyn, pushenable, bluetoothenable) => {
  return APP_SCHEMA + 'login?custno=' + custno + '&autologinyn=' + autologinyn + '&pushenable=' + pushenable + '&bluetoothenable=' + bluetoothenable
}

// 앱 자동로그인
const appAutologin = (autologinyn) => {
  return APP_SCHEMA + 'autologin?autologinyn=' + autologinyn
}

// 앱 로그아웃
const appLogout = () => {
  return APP_SCHEMA + 'logout'
}

// 앱종료
const appCloseapp = (confirmYn) => {
  if (confirmYn === 'Y' || confirmYn === 'N') {
    return APP_SCHEMA + 'closeapp?confirmyn=' + confirmYn
  } else {
    return APP_SCHEMA + 'closeapp'
  }
}

// 앱 스플래시 종료
const appClosesplash = () => {
  return APP_SCHEMA + 'closesplash'
}

// QR 스캐너
const openQrScan = () => {
  return APP_SCHEMA + 'qrscan'
}

const isIos = () => {
  return /iPad|iPhone|iPod|DType=I/.test(navigator.userAgent)
}

const isAos = () => {
  return /Android|DType=A/i.test(navigator.userAgent)
}

const isNativeApp = () => {
  return /AP=Y/.test(navigator.userAgent)
}

// 사용자 핸드폰 Device Type (A : AOS, I : IOS)
const isAppType = () => {
  let Dtype = ''
  const agent = navigator.userAgent.toUpperCase()

  if (agent.indexOf('DTYPE=I') > -1) {
    Dtype = 'I' // IOS
  } else if (agent.indexOf('DTYPE=A') > -1) {
    Dtype = 'A' // AOS
  } else {
    Dtype = 'N'
  }

  return Dtype
}

// 사용자 현재 어플 버전 정보
const isAppVersion = () => {
  const agent = navigator.userAgent.toUpperCase()
  let version = ''

  if (agent.indexOf('APPVERSION=') > -1) {
    version = agent.substr(agent.indexOf('APPVERSION=') + 11)
  }
  return version
}

// 레이어 팝업 닫기
const closeLayer = () => {
  return APP_SCHEMA + 'closeLayerPop'
}

// SNS 로그인
const appSnsLogin = (snsType) => {
  return `${APP_SCHEMA}snslogin?snstype=${snsType}`
}

// SNS 연결
const appSnsConnect = (snsType, encCustNo) => {
  return `${APP_SCHEMA}snsconnect?custno=${encCustNo}&snstype=${snsType}`
}

// SNS 연결
const appSnsDisconnect = (snsType, encCustNo) => {
  return `${APP_SCHEMA}snsdisconnect?custno=${encCustNo}&snstype=${snsType}`
}

// APP 푸시설정 확인
const appPushCheck = (pushYn) => {
  return APP_SCHEMA + 'pushenable?apppush=' + pushYn 
}

// APP 언어변경
const appLangChange = (langVal) => {
  return APP_SCHEMA + 'langChange?langtype=' + langVal
}

// APP 서버변경
const appSeverChange = (langVal) => {
  return APP_SCHEMA + 'serverchange'
}

// APP 영상 재생
const appGuidePlay = () => {
  return APP_SCHEMA + 'guidePlay'
}

// APP 영상 멈춤
const appGuidePause = () => {
  return APP_SCHEMA + 'guidePause'
}

// bluetooth 관련 정보 -> DLM-298
const bluetoothButtonAction = (bluetoothYn) => {
  const bluetoothenable = bluetoothYn
  return APP_SCHEMA + 'bluetooth?bluetoothenable=' + bluetoothenable
}

export {
  appLogin
  , appAutologin
  , appLogout
  , appCloseapp
  , appClosesplash
  , openQrScan
  , isIos
  , isAos
  , isNativeApp
  , isAppType
  , isAppVersion
  , closeLayer
  , appSnsLogin
  , appSnsConnect
  , appSnsDisconnect
  , appPushCheck
  , appLangChange
  , appSeverChange
  , appGuidePlay
  , appGuidePause
  , bluetoothButtonAction
}
