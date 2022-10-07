const path = require('path')
const merge = require('webpack-merge')

const buildConfig = process.env.NODE_ENV === 'prd' ? require('./config/prd.config.js') : require('./config/dev.config.js')
const deviceConfig = require('./config/web.config.js')

if(process.env.MOBILE) {
  process.env.NODE_ENV += '_MOB'
  console.log('Mobile Env')
} 

module.exports = merge(buildConfig, deviceConfig, {
  outputDir: 'dist',
  configureWebpack: {
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[id].[hash].js'
    },
    // 1. 절대 경로
    // resolve.alias는 모듈을 더 쉽게 import, require 하게 만듭니다.
    resolve: {
      alias: {
        '*': path.join(__dirname, '/'),
        '@': path.join(__dirname, 'src/'),
        '@store': path.join(__dirname, 'store/modules'),
        '@styles': path.join(__dirname, 'src/assets/styles'),
        '@media': path.join(__dirname, 'src/assets/media'),
        '@images': path.join(__dirname, 'src/assets/images'),
        '@utils': path.join(__dirname, 'src/utils'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@bundle': path.join(__dirname, 'src/assets/bundle'),
        '@comp': path.join(__dirname, 'src/components'),
        '@constants': path.join(__dirname, 'src/constants'),
        '@mixin': path.join(__dirname, 'src/mixins'),
        '@api': path.join(__dirname, 'src/api')
      }
    }
  },  
  // 웹팩 설정
  css: {
    loaderOptions: {
      sass: {
        data: '@import "src/assets/styles/_mixin.scss";'
      }
    }
  },
  // 개발 서버 설정
  // 로컬에서 개발할때만 사용됩니다.
  devServer: {
    historyApiFallback: true,
    // 1. 포트
    port: process.env.VUE_APP_DEV_SERVER_PORT || 5000,
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      // 절대로 '/' 과 같이 전체 pass를 하면 안된다.
      // vue 앱의 라우터가 매칭되지 못한다.
      '/api/v1': {
        // 프록시 요청을 보낼 서버의 주소
        target: process.env.VUE_APP_BASE_URL
      }
    }
  }
})