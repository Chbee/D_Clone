<template>
  <div class="main">
    <div class="main-visual">
      <div class="main-visual-area">
        <swiper
          ref="mainSwiper"
          class="swiper"
          :options="mainvisualOption"
        >
          <swiper-slide
            v-for="(item, index) in visualList"
            :key="index"
            :class="item.className"
          >
            <div class="visual-obj-area">
              <template v-if="item.type === 'img'">
                <div class="img-area">
                  <img 
                    :src="require(`@images/${item.imgUrl}`)" 
                    :alt="item.subject"
                    class="pc"
                  >
                  <img 
                    :src="require(`@images/${item.imgUrlMobile}`)"
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
                      :src="require(`@images/${item.movUrl}`)" 
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
                  >자세히 보기</a>
                </div>
                <div class="btn-area">
                  <a
                    href="#"
                    class="btn-secondary"
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
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: ROUTE.MAIN,
  components: {
    Swiper,
    SwiperSlide
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
            console.log('슬라이드 변경 감지')
          }
        }
      },
      visualList: [
        { 
          subject: '대림 미술관', 
          period: '2011.10.13 ~ 2012.03.18', 
          en: "The 100th Anniversary of Finn Juhl's Birth", 
          kr: '핀 율 탄생 100주년 - 북유럽 가구 이야기', 
          type: 'mov',
          movUrl: 'main/main-mov1.mp4',
          movUrlMobile: 'main/main-mov1.mp4'
        },
        { 
          subject: '대림 미술관', 
          period: '2011.10.13 ~ 2012.03.18', 
          en: "The 100th Anniversary of Finn Juhl's Birth", 
          kr: '핀 율 탄생 100주년 - 북유럽 가구 이야기', 
          className: 'daelim',
          type: 'img',
          imgUrl: 'main/main-visual.jpg',
          imgUrlMobile: 'main/main-visual-m.jpg'
        }
      ]
    }
  },
  computed: {
    mainSwiper() {
      return this.$refs.mainSwiper
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
    }
  }
}
</script>

<style lang="scss" scoped>
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