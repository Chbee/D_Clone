
const plugins = []
if(process.env.NODE_ENV === 'prd') {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ],
  plugins: plugins
}