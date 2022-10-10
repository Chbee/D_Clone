<template>
  <img 
    v-show="!isLoading"
    :style="{height: maxHeight}"
    :src="url" 
    :alt="imgAlt" 
    @load="onImgLoad"
    @error="onError"
  >
</template>

<script>
import smallDefaultImage from '@images/main/blank-logo-small.png'
import middleDefaultImage from '@images/main/blank-logo-middle.png'
import learnSmallDefaultImage from '@images/main/blank-logo-learn-list-small.png'
import learnMiddleDefaultImage from '@images/main/blank-logo-learn-list-middle.png'
import learnLargeDefaultImage from '@images/main/blank-logo-learn-list-large.png'
import exhibitionListDefaultImage from '@assets/images/main/blank-logo-exhibition-list.png'
import exhibitionSmallDefaultImage from '@assets/images/main/blank-logo-exhibition-view-small.png'
import exhibitionMiddleDefaultImage from '@assets/images/main/blank-logo-exhibition-view-middle.png'
import exhibitionLargeDefaultImage from '@assets/images/main/blank-logo-exhibition-view-large.png'
import searchMiddleDefaultImage from '@assets/images/main/blank-logo-search-middle.png'

export default {
  name: 'CompImg',
  props: {
    src: {
      type: String,
      default: ''
    },
    imgAlt: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return{
      url: '',
      maxHeight: '',
      isLoading: true
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(url) {
        this.url = this.src || ''
      }
    }
  },
  methods: {
    onImgLoad() {
      this.$nextTick(() => {
        this.$emit('load')
      })
      this.isLoading = false
    },
    onError() {
      switch(this.type) {
      case 'small':
        this.url = smallDefaultImage
        break
      case 'middle':
        this.url = middleDefaultImage
        break
      case 'learn-small':
        this.url = learnSmallDefaultImage
        break
      case 'learn-middle':
        this.url = learnMiddleDefaultImage
        break
      case 'learn-large':
        this.url = learnLargeDefaultImage
        break
      case 'exhibition-list':
        this.url = exhibitionListDefaultImage
        break
      case 'exhibition-small':
        this.url = exhibitionSmallDefaultImage
        break
      case 'exhibition-middle':
        this.url = exhibitionMiddleDefaultImage
        break
      case 'exhibition-large':
        this.url = exhibitionLargeDefaultImage
        break
      case 'searc-middl':
        this.url = searchMiddleDefaultImage
        break
      default: 
        this.url = ''
        break
      }
      this.maxHeight = this.height
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/elements/image.scss';
</style>

