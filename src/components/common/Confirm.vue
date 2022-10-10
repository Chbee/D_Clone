<template>
  <comp-layer
    v-if="dialog"
    :layer-title="title"
    width="408"
    hide-header
    style="min-height: 250px;"
    class="alert-pop"
    :close-show="false"
    :footer="true"
    @layer-close="clickCancel"
  >
    <div slot="layer-body">
      <div class="normal-area">
        <slot name="icon-area" />
        <p
          class="comment small"
          v-html="content"
        />
      </div>
    </div>
    <div slot="layer-footer">
      <comp-btn
        v-if="isConfirm && isShowCancel"
        class-name="secondary small"
        @click="clickCancel"
      >
        {{ cancelLabel }}
      </comp-btn>
      <comp-btn
        :name="okLabel"
        class-name="primary small"
        @click="clickOk"
      >
        {{ okLabel }}
      </comp-btn>
    </div>
  </comp-layer>
</template>

<script>
import CompLayer from '@comp/common/Layer.vue'
import store from '*/store'

export default {
  name: 'Confirm',
  components: { CompLayer },
  data () {
    return {
      dialog: false
    }
  },
  beforeDestroy () {
    this.unbindEvents()
  },
  mounted () {
    window.addEventListener('keydown', this.keyEvent)
    this.dialog = true
  },
  destroyed() {
    document.body.removeChild(this.$el)
  },
  methods: {
    transitionEnd (e) {
      !this.dialog && this.$destroy()
    },
    clickOk () {
      this.remove()
      if (this.okClickListener) {
        this.okClickListener()
      }
    },
    clickCancel () {
      this.remove()
      if (this.cancelClickListener) {
        this.cancelClickListener()
      }
    },
    remove() {
      this.dialog = false
      this.$destroy()
      store.dispatch('navigationStore/__removePopup')
    },
    keyEvent (e) {
      if (e.defaultPrevented) {
        return false
      }
      const key = e.key || e.keyCode
      if (key === 'Enter' || key === 'Spacebar' || key === ' ' || key === '32') {
        this.clickOk()
      } else if (key === 'Escape' || key === 'Esc' || key === '27') {
        this.clickCancel()
      }
      e.preventDefault()
      return false
    },
    unbindEvents () {
      window.removeEventListener('keydown', this.keyEvent)
      this.$el.removeEventListener('transitionend', this.transitionEnd)
    }
  }
}
</script>