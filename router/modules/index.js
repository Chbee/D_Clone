/*
    1. 컴포넌트
    router-view 가 있는 index 페이지
    코드 스플리팅을 사용해서 동적으로 로드합니다.
*/
// 2. 라우터
// 웹페이지용 라우터
import ROUTE from '@constants/route.json'

const MainPage = () => import('@/pages/main/MainPage.vue')
const ErrorPage = () => import('@/pages/main/Error404.vue')

export default [
  {
    path: '/',
    name: ROUTE.Main,
    component: MainPage,
    meta: {
      gnb: true
    }
  },
  {
    path: '*',
    component: ErrorPage
  }
]
