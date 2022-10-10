<template>
  <div class="check-area">
    <input
      :id="id !== '' ? id : userId"
      ref="myCheck"
      v-model="internalValue"
      type="checkbox"
      :disabled="disabled"
      :class="className"
      @click="checkClick($event)"
      @change="$emit('change', internalValue)"
    ><label
      :for="id !== '' ? id : userId"
    ><span class="check" />{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CompCheck',
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false
    },
    id: {
      type: String,
      default: '',
      required: false
    },
    className: {
      type: String,
      default: '',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    label: {
      type: String,
      default: '',
      required: false
    },
    checked: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      userId: '',
      internalValue: false
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
    this.userId = `check${this._uid}`
    if (this.checked) this.$refs.myCheck.checked = true
  },
  methods: {
    checkClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/elements/check.scss';
</style>
