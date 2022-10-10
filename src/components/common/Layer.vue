<template>
  <div 
    class="layer-dimmed"
    :class="{full: fullPopup, 'is-footer': footer}"
  >
    <div
      class="layer"
      :class="className"
      :style="`width: ${widRem}; height: ${heiRem};`"
    >
      <div
        v-if="!hideHeader"
        class="layer-header"
      >
        {{ layerTitle }}
        <!-- X버튼 -->
        <button 
          v-if="closeShow"
          type="button" 
          class="layer-close" 
          @click="layerClose($event)"
        >
          닫기
        </button>
      </div>
      <div
        class="layer-body"
        :style="`max-height: ${mhRem};`"
      >
      <!-- slot 확장 -->
        <slot name="layer-body" />
      </div>
      <div
        v-if="footer"
        class="layer-footer"
      >
        <slot name="layer-footer" />
      </div>
    </div>
  </div>
</template>

<script>
import store from '*/store/index.js'

export default {
  name: 'CompLayer',
  props: {
    width: {
      type: String,
      default: '',
      require: false
    },
    height: {
      type: String,
      default: '',
      require: false
    },
    maxHeight: {
      type: String,
      default: 'auto',
      require: false
    },
    fullPopup: {
      type: Boolean,
      default: false,
      require: false
    },
    layerTitle: {
      type: String,
      default: '',
      require: false
    },
    footer: {
      type: Boolean,
      default: false,
      require: false
    },
    className: {
      type: String,
      default: '',
      require: false
    },
    closeShow: {
      type: Boolean,
      default: true, // close 버튼 보이기
      require: false
    },
    hideHeader: {
      type: Boolean,
      default: false      
    }
  },
  computed: {
    widRem() {
      if (parseInt(this.width) > 0) {
        return this.pxToRem(this.width) + 'rem'
      } else {
        return false
      }
    },
    heiRem() {
      if (parseInt(this.height) > 0) {
        return this.pxToRem(this.height) + 'rem'
      } else {
        return false
      }
    },
    mhRem() {
      if (parseInt(this.maxHeight) > 0) {
        return this.pxToRem(this.maxHeight) + 'rem'
      } else {
        return false
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyEvent)
    store.dispatch('navigationStore/__pushPopup', this.$parent)
    
    this.layerPosition()
    window.addEventListener('resize', this.layerPosition)
    document.body.classList.add('body-stop')
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.layerPosition)
    window.removeEventListener('keydown', this.keyEvent)
    document.body.classList.remove('body-stop')
  },
  methods: {
    layerClose(e) {
      this.$emit('layer-close', e)
      store.dispatch('navigationStore/__removePopup')
      document.body.classList.remove('body-stop')
    },
    layerPosition() {
      const layer = this.$el.querySelector('.layer')
      layer.style.marginLeft = `${(Number(this.width) / 2) * -1}px`
      layer.style.marginTop = `${(Number(this.height) / 2) * -1}px`
    },
    keyEvent (e) {
      if (e.defaultPrevented) {
        return false
      }
      const key = e.key || e.keyCode
      if (key === 'Escape' || key === 'Esc' || key === '27') {
        this.layerClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/layouts/layer.scss';
</style>