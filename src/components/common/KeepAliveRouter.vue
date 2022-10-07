<template>
  <keep-alive :include="stack">
    <router-view />
  </keep-alive>
</template>

<script>
import stackMixin from '@/mixins/common/stackMixin'

export default {
  name: 'KeepAliveRouter',
  mixins: [stackMixin],
  props: {
    log: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    stack: {
      immediate: true,
      handler(val) {
        this.log && console.log(val)
      }
    }
  }
}
</script>
