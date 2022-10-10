<template>
  <div id="app">
    <div id="contents">
      <template v-if="isInicisPop && !isAppDown">
        <comp-header
          v-if="headerDisplay === 'shop'"
          :shop="true"
          :transparent="false"
        />
        <comp-header
          v-else-if="headerDisplay === 'dmuseum'"
          :dmuseum="true"
          :transparent="false"
        />
        <comp-header
          v-else-if="headerDisplay === 'main'"
          :transparent="true"
        />
        <comp-header
          v-else-if="['other', 'login', 'join'].includes(headerDisplay)"
          :transparent="false"
        />
      </template>
      <main>
        <keep-alive-router />
      </main>
      <template v-if="isInicisPop && !isAuthMobile && !isAppDown">
        <comp-footer
          v-if="headerDisplay === 'dmuseum'"
          :dmuseum="true"
        />
        <comp-footer v-else />
        <!-- [DCJ-T4842] -->
        <button 
          class="goto-top" 
          :class="{'show': scrollMoving }"
          @click="gotoTop"
        >
          상단으로 이동
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import CompHeader from '@comp/Header.vue'
import CompFooter from '@comp/Footer.vue'
import KeepAliveRouter from '@comp/common/KeepAliveRouter.vue'

export default {
  metaInfo: {
    meta: [
      // SEO setting
      { name: 'description', content: '#description', vmid: 'description' },
      { name: 'keywords', content: '#keywords' },
      { name: 'author', content: '#author' },
      // SNS 용
      {
        property: 'og:title',
        content: '#title',
        template: chunk => `${chunk} | DMU`,
        vmid: 'og:title'
      },
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: '#og:title' },
      { property: 'og:site_name', content: '#og:site_name' },
      // The list of types is available here: http://ogp.me/#types
      { property: 'og:type', content: 'website' },
      // Should the the same as your canonical link, see below.
      { property: 'og:url', content: `${process.env.VUE_APP_WEB_URL}` },
      { property: 'og:image', content: 'https://ldb-phinf.pstatic.net/20210520_228/1621504706342H1qBQ_JPEG/HuEbURnB-n8TkKFQaruNqg_W.jpg' },
      // Often the same as your meta description, but not always.
      { property: 'og:description', content: '#description' },

      // Twitter card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: `${process.env.VUE_APP_WEB_URL}` },
      { name: 'twitter:title', content: '#title' },
      { name: 'twitter:description', content: '#description' },
      // Your twitter handle, if you have one.
      { name: 'twitter:creator', content: '#creator' },
      { name: 'twitter:image:src', content: 'https://ldb-phinf.pstatic.net/20210520_228/1621504706342H1qBQ_JPEG/HuEbURnB-n8TkKFQaruNqg_W.jpg' },

      // Google / Schema.org markup:
      { itemprop: 'name', content: '#title' },
      { itemprop: 'description', content: '#description' },
      { itemprop: 'image', content: 'https://ldb-phinf.pstatic.net/20210520_228/1621504706342H1qBQ_JPEG/HuEbURnB-n8TkKFQaruNqg_W.jpg' }
    ],
    link: [
      { rel: 'canonical', href: `${process.env.VUE_APP_WEB_URL}` }
    ]
  },
  name: ROUTE.Main,
  components: {
    CompHeader,
    CompFooter,
    KeepAliveRouter
  },
  data() {
    return {
      // PC 이니시스 호출시 헤더, 푸터 제외하기위한 값
      isInicisPop: !(document.location.href.indexOf('iniPayPc') > 0),
      headerDisplay: null,
      scrollMoving: false // [DCJ-T4842]
    }
  },
  computed: {
    // 모바일 회원가입, 로그인 시 푸터 제외하기 위한 값
    isAuthMobile() {
      return this.isMobile() && ['login', 'join'].includes(this.headerDisplay)
    },
    isAppDown() {
      return this.$route.name === 'appDownLoad'
    }
  },
  watch: {
    $route: {
      handler() {
        this.setType()
      }
    }
  },
  mounted() {
    // 개발에서만 동작하도록 설정, for developler
    this.setType()
    // [DCJ-T4842]
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 20) {
        this.scrollMoving = true
      } else {
        this.scrollMoving = false
      }
    })
  },
  beforeMount() {
    // ie 접속 시 edge 자동 호출
    const agent = navigator.userAgent.toLowerCase()
    const url = process.env.VUE_APP_WEB_URL
    if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || agent.indexOf('msie') !== -1) {
      window.location.href = 'microsoft-edge:' + url
      setTimeout(() => {
        window.open('', '_self').close()
      }, 5000)
    }
  },
  methods: {
    setType() {
      // 헤더노출 구분 : 메인, Shop, 대림문화재단, 로그인, 회원가입
      const route = this.$route
      if (route.path.startsWith('/shop')) {
        this.headerDisplay = 'shop'
      } else if (route.path.startsWith('/daelimculturalfoundation')) {
        this.headerDisplay = 'dmuseum'
      } else if (route.name === ROUTE.Main) {
        this.headerDisplay = 'main'
      } else if(route.path.startsWith('/login')) {
        this.headerDisplay = 'login'
      } else if(route.path.startsWith('/join') && route.name !== ROUTE.Join.JoinInfo) {
        this.headerDisplay = 'join'
      } else {
        this.headerDisplay = 'other'
      }
    }
  }
}
</script>
<style lang="scss">
@import '@styles/common.scss';
</style>