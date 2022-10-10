
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,  
  configureWebpack: {
    optimization: {
      minimizer: [new UglifyJsPlugin()]
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.min.js'
      }
    }
  },
  css: {
    sourceMap: false
  }
}