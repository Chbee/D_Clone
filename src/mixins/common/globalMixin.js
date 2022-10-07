import { alert, confirm } from '@utils/common/common.js'

const mixin = {
  data() {
    return {
      _deactivated: false
    }
  },
  mounted() {
    if(this.$router && (this.$route.meta.keepAlive || this.isMobile())) {
      const list = this.$router.getMatchedComponents(this.$route.fullPath)
      const toName = (list.length > 0 ? list[list.length - 1].name : this.$route.name) || this.$route.name
      this.$store.dispatch('navigationStore/__push', toName)
    }
  },
  created() {
    this._deactivated = false
  },
  activated() {
    this._deactivated = false
  },
  deactivated() {
    this._deactivated = true
  },
  destroyed() {
    this._deactivated = true
  },
  methods: {
    isEmpty(value) {
      return value == null || value === ''
    },
    _alert (message, title, okClickListener, options) {
      if(typeof title === 'string') {
        console.warn('title parameter is removed. So title parameter is ignored.')
      }
      alert(message, title, okClickListener, options)
    },
    _confirm (options) {
      if(options.title) { console.warn('title parameter is removed. So title parameter is ignored.') }
      confirm(options)
    }
  }
}

export default mixin
