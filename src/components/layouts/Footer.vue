<template>
  <footer :class="{ dmuseum: dmuseum }">
    <template v-if="dmuseum">
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
            (재)대림문화재단
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
        </div>
        <p class="copyrights">
          &copy; 2020 BY DAELIM CULTURAL FOUNDATION ALL RIGHT RESERVED.
        </p>
      </div>
    </template>
    <template v-else>
      <ul class="footer-top-area">
        <li>
          <h1>
            <a href="javascript:void(0);">
              DAELIM<br>CULTURAL<br>FOUNDATION
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
          <p>
            T. {{ item.tel }}
          </p>
          <p v-if="item.fax">
            F. {{ item.fax }}
          </p>
        </li>
        <li>
          <ul class="sns">
            <li 
              v-for="(item, index) in snsList" 
              :key="index"
              :class="item.className"
            >
              <a 
                :href="item.href" 
                target="_blank" 
                title="새창열림"
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
            (재)대림문화재단
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
        </div>
        <p class="copyrights">
          &copy; 2021 BY <em>DAELIM MUSEUM</em> ALL RIGHT RESERVED.
        </p>
      </div>
    </template>
  </footer>
</template>

<script>
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
      footerAddress: [
        { name: 'DAELIM MUSEUM', address: '서울특별시 종로구 자하문로4길<br>21, 대림미술관', tel: '02.6233.0667', fax: '02.720.0665', className: 'daelim-museum' },
        { name: 'D MUSEUM', address: '서울특별시 성동구 왕십리로<br>83-21. 디뮤지엄', tel: '02.6233.7200', className: 'd-museum' },
        { name: '구슬모아당구장', address: '서울특별시 종로구 종로3길 17<br>D타워 123호, 구슬모아당구장', tel: '070.4457.1016', className: 'guseulmoa' }
      ],
      snsList: [
        { name: 'facebook', href: 'javascript:void(0)', className: 'facebook' },
        { name: 'twitter', href: 'javascript:void(0)', className: 'twitter' },
        { name: 'instagram', href: 'javascript:void(0)', className: 'instagram' },
        { name: 'youtube', href: 'javascript:void(0)', className: 'youtube' }
      ],
      quickLinks: [
        { name: '채용', href: 'javascript:void(0)' },
        { name: '대관·제휴문의', href: 'javascript:void(0)' },
        { name: 'SITEMAP', href: 'javascript:void(0)', className: 'sitemap' },
        { name: '대림문화재단 소개', href: 'javascript:void(0)' },
        { name: '문화체육관광부 ', href: 'javascript:void(0)', blank: true }
      ],
      footerMenu: [
        { name: '개인정보 처리방침', href: 'javascript:void(0)' },
        { name: '이용약관', href: 'javascript:void(0)' },
        { name: '영상정보처리기기 운영·관리 방침', href: 'javascript:void(0)' }
      ],
      footerInfo: [
        { name: '사업자등록번호: 305-82-09028' },
        { name: '서울특별시 종로구 지하문로4길 21(통의동 35-1)' },
        { name: '통신판매업신고번호: 강남 제000000호' },
        { name: '개인정보 보호책임자: 홍길동' },
        { name: '호스팅서비스: (재)대림문화재단' },
        { name: '대표전화: 02.720.0667' },
        { name: '이메일: daelim@daelim.org' },
        { name: '사업자 정보확인', href: 'javascript:void(0);', link: true },
        { name: '에스크로 가입확인', href: 'javascript:void(0);', link: true },
        { name: 'ISMS-P 인증확인', href: 'javascript:void(0);', link: true }
      ]
    }
  },
  methods: {
    btnClick(e) {
      const infoArea = document.querySelector('.footer-info-area')
      if (infoArea.classList.contains('on')) {
        infoArea.classList.remove('on')
      } else {
        infoArea.classList.add('on')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/layouts/footer.scss';
</style>

