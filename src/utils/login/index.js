const KEY_ACCESS_TOKEN = 'userToken'
const KEY_REFRESH_TOKEN = 'refreshToken'

const isApp = process.env.NODE_ENV.indexOf('MOB') >= 0

const setCookie = (key, value, expireDay) => {
  let expires = ''
  let secure = ''

  if(expireDay !== null && expireDay !== undefined) {
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + expireDay)
    expires = 'expires=' + expireDate.toGMTString() + '; '
  }

  if(process.env.NODE_ENV === 'stg' || process.env.NODE_ENV === 'prd') {
    secure = 'Secure; '
  }
  
  window.document.cookie = key + '=' + escape(value) + '; path=/; domain=' + window.document.domain.replaceAll('www.', '') + '; SameSite=Strict; ' + secure + expires
}

const getCookie = (key) => {
  const cookies = window.document.cookie.split(';')
  const cookie = cookies.filter(cookieItem => cookieItem.trim().indexOf(key) === 0)

  if(cookie.length > 0) {
    return cookie[0].trim().replace(key + '=', '')
  } else {
    return ''
  }
}

// 로그인
const login = (accessToken, refreshToken) => {
  if (accessToken && refreshToken) {
    if(isApp === true) {
      localStorage.setItem(KEY_ACCESS_TOKEN, accessToken)
      localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken)
    } else {
      setCookie(KEY_ACCESS_TOKEN, accessToken)
      setCookie(KEY_REFRESH_TOKEN, refreshToken)
    }
  }
}

// 로그아웃
const logout = () => {
  localStorage.removeItem(KEY_ACCESS_TOKEN)
  localStorage.removeItem(KEY_REFRESH_TOKEN)
  setCookie(KEY_ACCESS_TOKEN, '', -1)
  setCookie(KEY_REFRESH_TOKEN, '', -1)
}

// 접근 토큰 반환
const getAccessToken = () => {
  if(isApp === true) {
    return localStorage.getItem(KEY_ACCESS_TOKEN)
  } else {
    return getCookie(KEY_ACCESS_TOKEN)
  }
}

// 접근 토큰 저장
const setAccessToken = (accessToken) => {
  if(isApp === true) {
    localStorage.setItem(KEY_ACCESS_TOKEN, accessToken)
  } else {
    setCookie(KEY_ACCESS_TOKEN, accessToken)
  }
}

// 리프레시 토큰 반환
const getRefreshToken = () => {
  if(isApp === true) {
    return localStorage.getItem(KEY_REFRESH_TOKEN)
  } else {
    return getCookie(KEY_REFRESH_TOKEN)
  }
}

// 리프레시 토큰 저장
const setRefreshToken = (refreshToken) => {
  if(isApp === true) {
    localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken)
  } else {
    setCookie(KEY_REFRESH_TOKEN, refreshToken)
  }
}

// 로그인 여부
const isLogin = () => {
  return !!getAccessToken()
}

export {
  login, logout, getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, isLogin, setCookie, getCookie
}