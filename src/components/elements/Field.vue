<template>
  <!-- 
    :style = computed() > widRem, props > margin
    :class = class 추가
  -->
  <div
    class="input-area"
    :style="`width: ${widRem}; margin: ${margin};`"
    :class="{'date-area': isDate, 'error-area': error}"
  >
  <!-- 
    :id : id 값 추가, id값이 ''이 아니면 id, 맞으면 userId로 세팅
    ref : 직접 html요소에 접근가능토록 함 ex. this.$refs.input
    v-model : internalValue와 매핑
    :autocomplete : default on, 
   -->
    <input
      :id="id !== '' ? id : userId"
      ref="input"
      v-model="internalValue"
      :autocomplete="autocomplete"
      :type="type==='number' ? '' : type"
      :class="{'error': errorMsg && errorMsg.length > 0, 'input-date': isDate, 'complete': completeMsg && completeMsg.length > 0,}"
      :style="`padding: ${padding};`"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onCntntChange"
      @blur="$emit('onBlur', arguments[0])"
      @focus="$emit('onFocus', arguments[0])"
      @keydown="onKeydown"
      @keypress="$emit('onKeypress', arguments[0])"
      @keyup="onKeyup"
    >
    <button
      v-if="isDate"
      type="button"
      class="date"
      :disabled="disabled"
      @click.stop="showCalendar"
    >
      clendar
    </button>
    <span
      v-if="unit"
      class="unit"
    >{{ unit }}</span>
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
    <p
      v-if="complete"
      class="complete-msg"
    >
      {{ completeMsg }}
    </p>
    <a 
      :class="{'file-close-btn': isCloseBtn}"
      href="javascript:void(0);"
      @click="fileClose"
    />
    <template v-if="isMobile()">
      <comp-layer
        v-if="isDate && isShowCalendar"
        width="626"
        height="526"
        close-show
        @layer-close="hide"
      >
        <div slot="layer-body">
          <comp-calendar
            :value="internalValue"
            :disabled-dates="disabledDates"
            :holiday="holiday"
            :limit-double-years="limitDoubleYears"
            :place="place"
            @selected="dateSelected"
          />
        </div>
      </comp-layer>
    </template>
    <template v-else>
      <div
        v-if="isDate && isShowCalendar"
        v-click-outside="()=>{ isShowCalendar=false }"
        style="position:absolute; width:400px;min-height:330px;margin-top:10px;padding:20px 20px 0px 20px; border:1px solid #eee; background:white; z-index:10;"
      >
        <comp-calendar
          :value="internalValue"
          :disabled-dates="disabledDates"
          :holiday="holiday"
          :limit-double-years="limitDoubleYears"
          :place="place"
          @selected="dateSelected"
        />
      </div>
    </template>
  </div>
</template>

<script>
import CompLayer from '@comp/common/Layer.vue'

import CompCalendar from '@comp/common/Calendar'
import { reaplceCntnt, INPUT_TYPE } from '@utils/common/inputValidation'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'CompField',
  components: {
    CompCalendar,
    CompLayer
  },
  directives: {
    ClickOutside
  },
  props: {
    autocomplete: {
      type: String,
      default: 'on',
      required: false
    },
    width: {
      type: String,
      default: '',
      required: false
    },
    margin: {
      type: String,
      default: '',
      required: false
    },
    padding: {
      type: String,
      default: '',
      required: false
    },
    type: {
      type: String,
      default: 'text',
      required: false
    },
    unit: {
      type: String,
      default: '',
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
    id: {
      type: String,
      default: '',
      required: false
    },
    value: {
      type: [String, Number],
      default: '',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    errorMsg: {
      type: String,
      default: '',
      required: false
    },
    completeMsg: {
      type: String,
      default: '',
      required: false
    },
    maxlength: {
      type: [String, Number],
      default: -1
    },
    isDate: {
      type: Boolean,
      default: false,
      required: false
    },
    disabledDates: {
      type: Object,
      default: () => {}
    },
    place: {
      type: String,
      default: null
    },
    calendarStyle: {
      type: String,
      default: 'simple'
    },
    inputType: {
      type: String,
      default: ''
    },
    isCloseBtn: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      isShowCalendar: false,
      userId: '',
      internalValue: '',
      holiday: false,
      limitDoubleYears: false
    }
  },
  computed: {
    error() {
      return this.errorMsg && this.errorMsg.length > 0
    },
    complete() {
      return this.completeMsg && this.completeMsg.length > 0
    },
    widRem() {
      if (parseInt(this.width) > 0) {
        return this.pxToRem(this.width) + 'rem'
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
      // 컴포넌트 생성되자마자 즉시 실행
      immediate: true,
      handler(val) {
        this.internalValue = val
      }
    },
    calendarStyle: {
      immediate: true,
      handler(val) {
        if (val === 'simple') {
          this.holiday = false
          this.limitDoubleYears = true
        } else {
          this.holiday = true
          this.limitDoubleYears = false
        }
      }
    }
  },
  mounted() {
    this.userId = `field${this._uid}`
  },
  methods: {
    isShowAlert() {
      return document.getElementsByClassName('alert-pop').length > 0
    },
    onCntntChange (e) {
      if(this.type === 'number') {
        this.internalValue = reaplceCntnt(INPUT_TYPE.NUMBER, this.internalValue)
        if (this.internalValue.length > this.maxlength) {
          this.internalValue = this.internalValue.slice(0, this.maxlength)
        }
      }
      if(this.inputType) {
        this.internalValue = reaplceCntnt(this.inputType, this.internalValue)
        this.$emit('input', this.internalValue)
      }
      !this.isShowAlert() && this.$emit('onInput', e)
    },
    onKeyup(e) {
      !this.isShowAlert() && this.$emit('onKeyup', e)
    },
    onKeydown(e) {
      const charCode = e.keyCode
      if(this.type === 'number') {
        const isTopNumber = charCode >= 48 && charCode <= 57
        const isPadNumber = charCode >= 96 && charCode <= 105
        const isNotNumber = !isTopNumber && !isPadNumber
        if (charCode > 31 && charCode !== 46 && !e.ctrlKey && (isNotNumber || e.shiftKey)) {
          e.preventDefault ? e.preventDefault() : e.returnValue = false
          return false
        }
      }

      !this.isShowAlert() && this.$emit('onKeydown', e)
    },  
    reaplceValue(reg) {
      if(reg.test(this.internalValue)) {
        this.internalValue = this.internalValue.replace(reg, '')
      }
    },
    showCalendar() {
      this.isShowCalendar = true
    },
    hide() {
      this.isShowCalendar = false
    },
    dateSelected() {
      this.internalValue = arguments[2]
      this.isShowCalendar = false
    },
    focus() {
      const elId = this.id !== '' ? this.id : this.userId
      document.getElementById(elId).focus()
    },
    fileClose() {
      this.$emit('fileClose')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/elements/field.scss';
</style>


