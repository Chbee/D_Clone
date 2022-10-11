<template>
  <div class="main">
    <div
      class="main-visual"
      style="position: relative;"
    >
      <div class="swiper-area">
        <div class="main-visual-area">
          <swiper
            ref="mainSwiper"
            :options="mainvisualOption"
          >
            <swiper-slide
              v-for="(item, index) in visualList"
              :key="index"
              :class="item.className"
            >
              <div class="visual-obj-area">
                <div
                  v-if="item.type == 'mov'"
                  class="video-area"
                >
                  <video
                    :id="'video'+index"
                    loop
                    muted
                    autoplay
                    playsinline
                    class="videoClass wide-video video"
                  >
                    <source 
                      :src="item.movUrl"
                      :idx="index"
                      type="video/mp4"
                    >
                  </video>
                </div>
                <div
                  v-else
                  class="img-area"
                >
                  <img
                    :src="item.imgUrl"
                    alt=""
                    class="pc"
                  >
                  <img
                    :src="item.imgUrlMobile"
                    alt=""
                    class="mo"
                  >
                </div>
              </div>
              <div class="info-area">
                <span class="subject">{{ item.subject }}</span>
                <span class="period">{{ item.period }}</span>
                <div class="title-area">
                  <strong class="title">{{ item.en }}</strong>
                  <span>{{ item.kr }}</span>
                </div>
                <div class="btn-group">
                  <comp-btn
                    btn-name="자세히 보기"
                    class-name="primary"
                  />
                  <comp-btn
                    btn-name="예매하기"
                    class-name="secondary"
                  />
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div
            class="pagination-progress"
          >
            <div
              class="mv-progress-bg"
            >
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
      <div class="slide-pagination-area">
        <div class="main-page-list" />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: ROUTE.MAIN,
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
    }
  },
  data() {
    return {
      visualList: [
        {
          subject: '대림 미술관',
          period: '2011.10.13 ~ 2012.03.18',
          en: "The 100th Anniversary of Finn Juhl's Birth",
          kr: '핀 율 탄생 100주년 - 북유럽 가구 이야기111',
          className: 'daelim',
          type: 'mov',
          movUrl: 'https://cdn.daelimmuseum.org/Store/Homepage/Main/Pc/202203/20220314043623155001.mp4',
          movUrlMobile: 'https://cdn.daelimmuseum.org/Store/Homepage/Main/Pc/202203/20220314043623155001.mp4'
        },
        {
          subject: '대림 미술관',
          period: '2011.10.13 ~ 2012.03.18',
          en: "The 100th Anniversary of Finn Juhl's Birth",
          kr: '핀 율 탄생 100주년 - 북유럽 가구 이야기222',
          className: 'daelim',
          type: 'img',
          imgUrl: 'https://cdn.daelimmuseum.org/Store/Homepage/Main/Pc/202209/20220916134414476001.jpg',
          imgUrlMobile: 'https://cdn.daelimmuseum.org/Store/Homepage/Main/Mobile/202209/20220916134408611001.jpg'
        }
      ],
      visualPlay: false,
      mainvisualOption: {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: '.main-page-list',
          type: 'fraction',
          formatFractionCurrent: function (number) {
            return ('0' + number).slice(-2)
          },
          formatFractionTotal: function (number) {
            return ('0' + number).slice(-2)
          },
          renderFraction: function (currentClass, totalClass) {
            return '<span style="color: #fff" class="' + currentClass + '"></span>' +
                    ' / ' +
                    '<span style="color: rgba(255,255,255,.3);" class="' + totalClass + '"></span>'
          }
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        on: {
          slideChange: () => {
            const progressBar = this.$refs.mvProgressbar
            window.$(progressBar).css('width', '0%')
            window.$(progressBar).stop().animate({ width: '100%' }, 5000)
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
  created () {
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
@import '@styles/components/swiper.scss';
@import '@styles/elements/btn.scss';
@import '@styles/main/main.scss';
@import '@styles/components/slide-pagination.scss';
@import '@styles/components/responsive-list.scss';
</style>