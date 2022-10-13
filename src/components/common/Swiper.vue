<template>
  <div class="main-visual-area">
    <swiper
      ref="mainSwiper"
      class="swiper"
      :options="mainvisualOption"
    >
      <swiper-slide
        v-for="(item, index) in slideList"
        :key="index"
        :class="item.className"
      >
        <div class="visual-obj-area">
          <template v-if="item.type === 'img'">
            <div class="img-area">
              <img 
                :src="item.imgUrl" 
                :alt="item.subject"
                class="pc"
              >
              <img 
                :src="item.imgUrlMobile"
                :alt="item.subject" 
                class="mo"
              >
            </div>
          </template>
          <template v-if="item.type === 'mov'">
            <div class="video-area">
              <video
                autoplay=""
                loop=""
                muted=""
                playsinline=""
              >
                <source 
                  :src="item.imgUrl" 
                  type="video/mp4"
                >
              </video>
            </div>
          </template>
        </div>
        <div 
          class="info-area"
        >
          <span
            v-if="item.subject != ''"
            class="subject"
          >{{ item.subject }}</span>
          <span class="period">{{ item.period }}</span>
          <div class="title-area">
            <strong class="title">{{ item.en }}</strong>
            <span>{{ item.kr }}</span>
          </div>
          <div class="btn-group">
            <div class="btn-area">
              <a
                href="#"
                class="btn-primary"
                @click="detailClick(item.prgTypeCd, item.prgIdx)"
              >자세히 보기</a>
            </div>
            <div class="btn-area">
              <a
                href="#"
                class="btn-secondary"
                @click="ticketingClick(item.prgIdx)"
              >예매하기</a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="pagination_wrap">
      <div class="swiper-pagination main-swiper-fraction" />
      <div class="pagination-progress">
        <div class="mv-progress-bg">
          <span
            ref="mvProgressbar"
            class="mv-progress-bar"
          />
        </div>
        <comp-btn 
          btn-name="정지/플레이" 
          :class="{ play: visualPlay }"
          @click="mvControl($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'MainSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    slideList: {
      type: Array,
      default: () => {},
      required: false
    }
  },
  data() {
    return {
      visualPlay: false,
      mainvisualOption: {
        slidesPerView: 1,
        loop: true,
        threshold: 20,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.main-swiper-fraction',
          type: 'fraction',
          formatFractionCurrent: function (number) {
            return ('0' + number).slice(-2)
          },
          formatFractionTotal: function (number) {
            return ('0' + number).slice(-2)
          },
          renderFraction: function (currentClass, totalClass) {
            return '<span style="color: #fff" class="' + currentClass + '"></span>' + 
            '<span style="color: rgba(255, 255, 255, .3);"> / </span>' + 
            '<span style="color: rgba(255, 255, 255, .3);" class="' + totalClass + '"></span>' 
          }
        },
        on: {
          slideChange: function() {
            const progressBar = document.querySelector('.mv-progress-bar')
            // const progressBar = this.$refs.mvProgressbar
            // const progressBar = this.$el.querySelector('.mv-progress-bar')
            window.$(progressBar).css('width', '0%')
            window.$(progressBar).stop().animate({ width: '100%' }, 5000)
            // console.log('슬라이드 변경 감지')
          }
        }
      }
    }
  },
  computed: {
    mainSwiper() {
      return this.$refs.mainSwiper
    }
  },
  watch: {
    mainvisualOption() {
      if(this.mainvisualOption.autoplay === null) {
        this.mainSwiper.$swiper.autoplay.stop()
      }
    }
  },
  updated() { 
    // 슬라이드 리스트가 한 개일 경우 슬라이드 불가
    if(this.slideList.length > 1) {
      this.mainSwiper.$swiper.params.touchRatio = 1
      this.mainvisualOption.autoplay = {}
      this.mainvisualOption.autoplay.delay = 5000
    }
    
    // 첫 번째 스와이프 영상일 시 오토플레이 스탑!
    for(let i = 0; i < this.slideList.length; i++) {
      if(document.querySelector('#divImgType' + i).children[0].matches('.video')) {
        document.getElementById('video' + i).pause()
      }
    }
    
    if(document.querySelector('#divImgType0') !== null) {
      if(document.querySelector('#divImgType0').children[0].matches('.video')) {
        this.mainSwiper.$swiper.autoplay.stop()
        document.getElementById('video0').play()
      }
    }
  },
  methods: {
    mvControl(e) {
      const progressBar = this.$refs.mvProgressbar
      if(e.target.parentElement.classList.contains('play')) {
        this.visualPlay = false
        this.mainSwiper.$swiper.autoplay.start()
        window.$(progressBar).stop().animate({ width: '100%' }, 5000)
      } else {
        this.visualPlay = true
        this.mainSwiper.$swiper.autoplay.stop()
        window.$(progressBar).stop()
      }
    },
    detailClick(prgTypeCd, prgIdx) {
      if (!prgIdx.length) {
        this._alert('화면 이동 불가 pgIdx값 없음')
        return
      }
      this._alert('상세 화면 이동 : /exhibition/current/' + prgIdx + 'prgTypeCd : ' + prgTypeCd)
    },
    ticketingClick(prgIdx) {
      if (!prgIdx.length) {
        this._alert('화면 이동 불가 pgIdx값 없음')
        return
      }
      this._alert('예매 화면 이동 : /ticket/reservation/' + prgIdx)
    },
    nextSilde(index) {
      const data = this.$parent.getVisualType(index)
      // const progressBar = this.$el.querySelector('.mv-progress-bar')
      
      // 반복문을 통한 재생중인 영상 전체 일시중지
      for(let i = 0; i < this.slideList.length; i++) {
        if(document.querySelector('#divImgType' + i).children[0].matches('.video')) {
          document.getElementById('video' + i).pause()
        }
      }
      
      // 이미지 일 경우
      if(data.type === 'img') {
        this.visualPlay = false
        // delay: 5000
        this.mainvisualOption.autoplay = {}
        this.mainvisualOption.autoplay.delay = 5000
        this.mainSwiper.$swiper.autoplay.run()
        
        // window.$(progressBar).css('width', '0%')
        // window.$(progressBar).stop().animate({ width: '100%' }, 5000)
      } else { // 동영상일 경우
        // const seq = this.$parent.visualMovSeq(index) // 실제SEQ
        
        this.visualPlay = true
        this.mainSwiper.$swiper.autoplay.stop()
        this.mainvisualOption.autoplay = null
        
        // this.mainSwiper.$swiper.autoplay.pause()
        // window.$(progressBar).css('width', '0%')
        // window.$(progressBar).stop()
        document.getElementById('video' + index).play()
        // const timer = (1000 * this.$refs.videoComp[seq].reminigTimeSet())
        // window.$(progressBar).stop().animate({ width: '100%' }, timer)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/components/swiper.scss';
@import '@styles/elements/btn.scss';
@import '@styles/main/main.scss';

  .info-area .btn-group {display: flex; margin-top: 1.25rem;}
  .info-area .btn-group a {width: 11.875rem; height: 3.75rem; line-height: 3.75rem; border: 0.125rem solid #fff; font-weight: 600; display: inline-block; vertical-align: middle; text-decoration: none;}
  .info-area .btn-group a.btn-primary {background: transparent; color: #fff;}
  .info-area .btn-group a.btn-secondary {margin-left: 1.75rem; background: #fff;}

  .pagination_wrap {position: absolute; top: 70%; left: 50px; transform: translateY(-50%); z-index: 100;}
  .pagination-progress {position: absolute; top: 25px; height: 1.5px; margin: 0 !important; left: 0 !important;}
  .mv-progress-bg {display: block; width: 190px; height: 1.5px; background: rgba(255, 255, 225, 0.2);}
  .mv-progress-bar {position: absolute; left: 0; top: 0; height: 100%; background-color: #fff;}
  .swiper-pagination.main-swiper-fraction {text-align: left; position: static;}
  .btn-area2 {position: absolute; position: absolute; top: 50%; right: -15px; transform: translateY(-50%);} 
  .swiper-btn.swiper-button-play {display: none; width: 0; height: 0; border-top: 4px solid transparent; border-left: 8px solid #fff; border-bottom: 4px solid transparent;}
  .swiper-btn.swiper-button-pause {width: 8px; height: 8px; background-color: #fff;}
</style>