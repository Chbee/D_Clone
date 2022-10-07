import globalMixin from './globalMixin'
const mixin = {
  mixins: [globalMixin],
  computed: {
    isApp() {
      return true
    }
  }
}

export default mixin
