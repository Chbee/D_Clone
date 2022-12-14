<template>
  <div
    class="select-area"
    :style="`width: ${widRem}; margin: ${margin};`"
  >
    <div v-if="isMobile()">
      <select
        :id="id !== '' ? id : userId"
        v-model="internalValue"
        :disabled="disabled"
        :multiple="multiple"
        :style="`height: ${heiRem};`"
        @change="onChangeMob(internalValue)"
      >
        <option
          v-for="(opt, index) in optionList"
          :key="index"
          :value="opt.value"
        >
          {{ opt.name }}
        </option>
      </select>
    </div>
    <div
      v-else
      :id="id !== '' ? id : userId"
      :style="`width: ${widRem}; height: ${heiRem}; margin: ${margin};`"
      :class="className"
    >
      <button
        type="button"
        :disabled="disabled"
        :class="{ open: openStatus }"
        :data-value="startValue"
        @click="openClick($event)"
      >
        {{ startName }}
      </button>
      <ul
        v-show="openStatus"
        class="select-list"
      >
        <li
          v-for="(opt, index) in optionList"
          :key="index"
          :class="{ on: selectedIndex === index }"
        >
          <template v-if="opt.soldout">
            <div class="soldout-area">
              <del>{{ opt.name }}</del><span>품절</span>
              <comp-btn
                btn-name="재입고 알림신청"
                :text-link="true"
                href="javascript:void()"
                @click="restockClick($event, opt.value, index)"
              />
            </div>
          </template>
          <template v-else>
            <button
              type="button"
              @click="selectClick($event, opt.value, index)"
            >
              {{ opt.name }}
            </button>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 개발 요청 사항
 *
 * 1. click outside 추가 부탁드립니다.
 *  => outSideClick 메소드 추가되었습니다.
 * 2. 현재 선택되어있는 아이템이 표시가 되지 않습니다.
 * => selectedIndex 추가되었습니다.
 * 3. 하위 리스트 메뉴의 넓이가 가장 많은 글자수를 가진 아이템의 넓이로 지정되어야 합니다.
 * => setSize 메소드가 추가되었습니다.
 */
export default {
  name: 'CompSelect',
  props: {
    id: {
      type: String,
      default: '',
      required: false
    },
    width: {
      type: String,
      default: '',
      required: false
    },
    height: {
      type: String,
      default: '',
      required: false
    },
    className: {
      type: String,
      default: '',
      required: false
    },
    margin: {
      type: String,
      default: '',
      required: false
    },
    optionList: {
      type: Array,
      default: () => {},
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    multiple: {
      type: Boolean,
      default: false,
      required: false
    },
    value: {
      type: [String, Number],
      default: null,
      required: false
    },
    linkUrl: {
      type: String,
      default: '',
      required: false
    },
    soldout: {
      type: Boolean,
      default: false,
      required: false
    },
    currentIndex: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      userId: '',
      openStatus: false,
      startValue: '',
      startName: '',
      autoSize: null,
      selectedIndex: null,
      internalValue: ''
    }
  },
  computed: {
    widRem() {
      if (parseInt(this.width) > 0) {
        return this.pxToRem(this.width) + 'rem'
      } else {
        return this.autoSize
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
    currentIndex: {
      immediate: true,
      handler(val) {
        this.setSelectedIndex(val)
      }
    },
    optionList() {
      if (!this.isMobile()) {
        this.setSize()
      }
      this.setSelectedIndex(this.currentIndex)
    },
    internalValue(val) {
      this.$emit('input', val)
      this.$emit('select-click', val)
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outSideHandler)
  },
  mounted() {
    this.userId = `select${this._uid}`
    if (!this.isMobile()) {
      this.setSize()
    }
  },
  methods: {
    onChangeMob(value) {
      const i = this.optionList.findIndex(v => v.value === value)
      if (value !== this.startValue) {
        this.$emit('input', value)
        this.$emit('change', value, this.startValue)
        this.startValue = value
        this.selectedIndex = i
      }
      // this.$emit('select-click', value)
    },
    openClick(e) {
      if (e.target.classList.contains('open')) {
        this.openStatus = false
      } else {
        this.openStatus = true
        document.addEventListener('click', this.outSideHandler)
      }
    },
    selectClick(e, value, i) {
      this.$emit('input', value) // v-model emit 타이밍 이슈 수정
      if (value !== this.startValue) {
        this.$emit('change', value, this.startValue)
      }
      const txt = e.target.innerText
      this.startValue = value
      this.startName = txt
      this.openStatus = false
      this.selectedIndex = i
      this.$emit('select-click', value)
    },
    outSideHandler(event) {
      const isClickInside = this.$el.contains(event.target)
      if (!isClickInside) {
        this.openStatus = false
      }
    },
    setSize() {
      if (this.width === '' || this.width === undefined || this.width === null) {
        const size = []
        for (let i = 0; i < this.optionList.length; i++) {
          const string = this.optionList[i].name
          const stringLength = string.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length
          size.push(stringLength)
        }
        this.autoSize = (((Math.max.apply(null, size)) * 5.2) + 74) + 'px'
      }
    },
    setSelectedIndex(index) {
      this.selectedIndex = Number(index)
      this.startValue = this.optionList[this.selectedIndex].value
      this.startName = this.optionList[this.selectedIndex].name

      if(this.isMobile()) {
        const el = this.id !== '' ? this.id : this.userId
        if(document.getElementById(el)) {
          document.getElementById(el).value = this.startValue
        }
      }
      this.internalValue = this.startValue
      this.$emit('input', this.startValue)
    },
    restockClick(e, value, index) {
      e.preventDefault()
      this.$emit('restock-alarm-click', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/elements/select.scss';
</style>
