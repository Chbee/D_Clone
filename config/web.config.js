const path = require('path')

const isMobile = process.env.MOBILE || false

const entry = isMobile ? 'src/main.mobile.js' : 'src/main.js'
const template = isMobile ? 'public/mobile.html' : 'public/index.html'
const title = isMobile ? 'D MUSEUM | DAELIM MUSEUM' : 'D MUSEUM | DAELIM MUSEUM | 구슬모아당구장'

console.log('entry ', entry)

module.exports = {
  configureWebpack: {
    // plugins: (process.env.NODE_ENV === 'production') ? [...productionPlugins] : [],
    // 1. 절대 경로
    // resolve.alias는 모듈을 더 쉽게 import, require 하게 만듭니다.
    resolve: {
      alias: {
        '@router': path.join(__dirname, '../router'),
        '@pages': path.join(__dirname, '../src/pages')
      }
    }
  },
  pages: {
    index: {
      // entry for the page
      entry,
      // the source template
      template,
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title,
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}