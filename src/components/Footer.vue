<template>
  <footer
    v-show="isShow"
    :class="{ dmuseum: dmuseum }"
  >
    <template v-if="dmuseum">
      <div class="footer-bottom-area">
        <ul class="footer-menu">
          <li
            v-for="(item, index) in dmuseumFooterMenu"
            :key="index"
          >
            <a 
              v-if="index === 1" 
              :href="item.href" 
              target="_blank"
              title="새창열림"
            >
              {{ item.name }}
            </a>
            <a 
              v-else 
              :href="item.href"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
        <div class="footer-info-area">
          <button
            type="button"
            class="footer-info-title"
            @click="btnClick($event)"
          >
            (재)대림문화재단
          </button>
          <ul class="footer-info">
            <li
              v-for="(item, index) in dmuseumFooterInfo"
              :key="index"
              :class="item.className"
            >
              <template v-if="item.link">
                <a
                  :href="item.href"
                  target="_blank"
                  title="새창열림"
                >
                  {{ item.name }}
                </a>
              </template>
              <template v-else>
                {{ item.name }}
              </template>
            </li>
          </ul>
        </div>
        <p class="copyrights">
          &copy; 2022 BY <span>DAELIM CULTURAL FOUNDATION</span> ALL RIGHT RESERVED.
        </p>
      </div>
    </template>
    <template v-else>
      <ul class="footer-top-area">
        <li>
          <h1>
            <a>
              DAELIM<br> CULTURAL<br> FOUNDATION
            </a>
          </h1>
        </li>
        <li
          v-for="(item, index) in footerAddress"
          :key="index"
          :class="item.className"
        >
          <strong>{{ item.name }}</strong>
          <p v-html="item.address" />
          <!-- DLM-222 : 구슬모아 당구장 삭제 -->
          <p v-if="item.className === 'guseulmoa'">
            {{ item.tel }}
          </p>
          <p v-else>
            T. {{ item.tel }}
          </p>
          <p v-if="item.fax">
            F. {{ item.fax }}
          </p>
        </li>
        <li class="footer-util-area">
          <ul class="sns">
            <li 
              v-for="(item, index) in snsList" 
              :key="index"
              :class="item.className"
            >
              <a
                :href="item.href"
                target="_blank"
                :title="item.title"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
          <ul class="quick-links">
            <li 
              v-for="(item, index) in quickLinks" 
              :key="index"
              :class="item.className"
            >
              <a 
                v-if="item.blank" 
                :href="item.href" 
                class="blank-link"
                target="_blank"
              >
                {{ item.name }}
              </a>
              <a 
                v-else 
                :href="item.href"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="footer-bottom-area">
        <ul class="footer-menu">
          <li
            v-for="(item, index) in footerMenu"
            :key="index"
          >
            <a :href="item.href">
              {{ item.name }}
            </a>
          </li>
        </ul>
        <div class="footer-info-area">
          <button
            type="button"
            class="footer-info-title"
            @click="btnClick($event)"
          >
            {{ dcfInfo.name }}  <!-- (재)대림문화재단 -->
          </button>
          <ul class="footer-info">
            <li
              v-for="(item, index) in footerInfo"
              :key="index"
              :class="item.className"
            >
              <template v-if="item.link">
                <a
                  :href="item.href"
                  target="_blank"
                  title="새창열림"
                >
                  {{ item.name }}
                </a>
              </template>
              <template v-else>
                {{ item.name }}
              </template>
            </li>
          </ul>

          <ul class="footer-info">
            <li
              v-for="(item, index) in footerInfoNext"
              :key="index"
              :class="item.className"
            >
              <template v-if="item.link">
                <a 
                  :href="item.href" 
                  target="_blank" 
                  title="새창열림"
                >
                  {{ item.name }}
                </a>
              </template>
              <template v-else>
                {{ item.name }}
              </template>
            </li>
          </ul>
        </div>
        <p class="copyrights">
          &copy; 2022 BY <em>DAELIM CULTURAL FOUNDATION</em> ALL RIGHT RESERVED.
        </p>
      </div>
    </template>
    <!-- [DCJ-T4325] -->
    <!-- [DCJ-T4842] 탑버튼 레이아웃으로 이띙 -->
  </footer>
</template>

<script>
import { getLocaleMessage } from '@utils/i18n/index.js'

export default {
  name: 'Footer',
  props: {
    dmuseum: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      scrollMoving: false, // [DCJ-T4325]
      footerAddress: [
        { name: 'D MUSEUM', address: getLocaleMessage('FOOTER_0092'), tel: '02.6233.7200', className: 'd-museum' },
        { name: 'DAELIM MUSEUM', address: getLocaleMessage('FOOTER_0091'), tel: '02.720.0667', fax: '02.720.0665', className: 'daelim-museum' },
        { name: '구슬모아당구장', className: 'guseulmoa' }
      ],
      snsList: [
        // { name: 'facebook', href: 'https://www.facebook.com/daelimmuseum', className: 'facebook' },
        // { name: 'twitter', href: 'https://tv.naver.com/daelimmuseum', className: 'twitter' },
        { title: 'Instagram', name: 'instagram', href: 'https://www.instagram.com/daelimmuseum/', className: 'instagram' },
        { title: 'YouTube', name: 'youtube', href: 'https://www.youtube.com/user/DaelimMuseum', className: 'youtube' }
      ],
      quickLinks: [
        { name: getLocaleMessage('FOOTER_0004'), href: `${process.env.VUE_APP_WEB_FOUNDATION_URL}/employment`, blank: true },
        { name: getLocaleMessage('FOOTER_0005'), href: '/partnership' },
        { name: 'SITEMAP', href: '/sitemap' },
        { name: getLocaleMessage('FOOTER_0006'), href: `${process.env.VUE_APP_WEB_FOUNDATION_URL}/introduce`, blank: true },
        { name: getLocaleMessage('FOOTER_0007'), href: 'https://www.mcst.go.kr', blank: true }
      ],
      footerMenu: [
        { name: getLocaleMessage('FOOTER_0009'), href: '/privacy' },
        { name: getLocaleMessage('FOOTER_0008'), href: '/terms' },
        { name: getLocaleMessage('FOOTER_0010'), href: '/media' }
      ],
      dmuseumFooterInfo: [
        { name: getLocaleMessage('FOOTER_0094') },
        { name: getLocaleMessage('FOOTER_0095') },
        { name: getLocaleMessage('FOOTER_0096') }
      ],
      dmuseumFooterMenu: [
        { name: getLocaleMessage('FOOTER_0009'), href: '/daelimculturalfoundation/privacy' },
        { name: getLocaleMessage('FOOTER_0007'), href: 'https://www.mcst.go.kr' }
      ],
      footerInfo: [
        { name: getLocaleMessage('FOOTER_0098') },
        { name: getLocaleMessage('FOOTER_0095') },
        { name: getLocaleMessage('FOOTER_0094') }
      ],
      footerInfoNext: [
        { name: getLocaleMessage('FOOTER_0097') },
        { name: 'info@daelimmuseum.org' }
      ],
      dcfInfo: { name: getLocaleMessage('FOOTER_0115') }, // 대림문화재단 다국어 처리
      isShow: true
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {
        if(!this.$route.meta.isBack) {
          this.$el && this.$el.classList.remove('view-footer')
          setTimeout(() => {
            this.$el && this.$el.classList.add('view-footer')
          })
        }
      }
    },
    // route path 비교 후 네이버 로그 호출
    '$route'(to, from) {
      if((to.path !== from.path || from.path === '/') && to.name !== 'TicketCompletePage') {      
        if (!window.wcs_add) window.wcs_add = {}
        window.wcs_add.wa = 's_4c8c2ccc6a1b'
        if (!window._nasa) window._nasa = {}  
        if(window.wcs) {      
          window.wcs.inflow()
          window.wcs_do(window._nasa)
        }   
        window._nasa = {}
      }
    }
  },
  beforeDestroy() {
    this.$el.classList.remove('view-footer')
  },
  mounted() {
    this.$el.classList.add('view-footer')
    // [DCJ-T4325]
    // [DCJ-T4842] 삭제
  }
  // methods: {
  //   getLocaleMessage
  // }
}
</script>

<style lang="scss" scoped>
@import '@styles/layouts/footer.scss';
</style>