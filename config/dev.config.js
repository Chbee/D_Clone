const BundleAnalyze = false
const bundleAnalyze = false
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const plugins = []

bundleAnalyze && plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  productionSourceMap: true,
  lintOnSave: true,  
  configureWebpack: {
    plugins: plugins
  },
  css: {
    sourceMap: true
  }
}