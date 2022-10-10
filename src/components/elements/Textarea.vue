<template>
  <div
    class="textarea"
    :style="`width: ${width}; margin: ${margin};`"
    :class="{letters: letters}"
  >
    <textarea
      :id="id !== '' ? id : userId"
      v-model="internalValue"
      :style="`height: ${heiRem};`"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
    />
    <span
      v-if="letters"
      class="letters-count"
    ><em>{{ live }}</em>/{{ total }}</span>
    <p
      v-if="error"
      class="error-msg"
    >
      {{ errorMsg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CompTextarea',
  props: {
    id: {
      type: String,
      default: '',
      required: false
    },
    width: {
      type: String,
      default: '100%',
      required: false
    },
    margin: {
      type: String,
      default: '1px 0',
      required: false
    },
    height: {
      type: String,
      default: 'auto',
      required: false
    },
    letters: {
      type: Boolean,
      default: false,
      required: false
    },
    total: {
      type: Number,
      default: 0,
      required: false
    },
    live: {
      type: Number,
      default: 0,
      required: false
    },
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    value: {
      type: String,
      default: '',
      required: false
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    errorMsg: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      userId: '',
      internalValue: ''
    }
  },
  computed: {
    error() {
      return this.errorMsg && this.errorMsg.length > 0
    },
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
    }
  },
  watch: {
    internalValue(val) {
      this.$emit('input', val)
    },
    value: {
      immediate: true,
      handler(val) {
        this.internalValue = val
      }
    }
  },
  mounted() {
    console.log('internalValue')
    this.userId = `text${this._uid}`
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/elements/textarea.scss';
</style>

