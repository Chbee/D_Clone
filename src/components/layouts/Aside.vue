<template>
<!-- { 클래스명: 조건, mobileView가 존재하면 class="mobile" } -->
  <aside :class="{mobile: mobileView}">
    <div
      class="menu-area aside-menu-area"
      :class="{on:isShowMenu}"
    >
    <!-- mobileView에 값이 있을 때 적용되는 template -->
      <template v-if="mobileView">
        <!-- 클릭하면 showMenu함수 실행 (event를 매개변수로 넘김) -->
        <button
          type="button"
          class="menu-title mobile-view-title"
          @click="showMenu($event)"
        >
        <!-- headerTitle 데이터 표시 -->
          {{ headerTitle }}
        </button>
        <!-- 화면에 표시가 안됨 -->
        <button
          type="button"
          class="btn-back"
        >
          이전
        </button>
      </template>
      <!-- mobileView에 값이 없을 때 적용되는 template -->
      <template v-else>
        <!-- MY PAGE -->
        <!-- router의 name값: MyPageMain -->
        <router-link :to="{ name: 'MyPageMain' }">
          <!-- MAIN_0050 translation한 값 세팅 -->
          <strong class="menu-title">{{ $t('MAIN_0050') }}</strong>
        </router-link>
      </template>
      <div class="menu-list mypage-menu-list">
        <ul>
          <!-- menuList만큼 li 생성 -->
          <!-- :data-index : transition hook에서 추출가능하도록 함, 메뉴 index -->
          <!-- 큰메뉴 (MY TICKETS, MY SHOPPING, MY INFO ...) -->
          <li
            v-for="(item, index) in menuList"
            :key="index"
            :data-index="index"
            class="on"
          >
          <!-- 큰 메뉴 링크 -->
            <a
              :id="item.id"
              :class="item.className"
              role="button"
            >{{ item.name }}</a>
            <div class="sub-menu-area">
              <ul>
                <!-- 서브 메뉴 리스트 -->
                <!-- menuList.subMenuList의 갯수만큼 생성 -->
                <!-- index값과 menuIndex값이 동일하고, sindex값과 subMenuIndex값이 동일하면 class="on" -->
                <li
                  v-for="(sitem, sindex) in item.subMenuList"
                  :key="sindex"
                  :class="{on:index == menuIndex && sindex == subMenuIndex}"
                >
                <!-- 리스트 a tag -->
                <!-- :class : sitem.className을 클래스 명으로 -->
                <!-- @click : click 이벤트 발생 시 clickMenu 함수 실행, 매개변수로 event 자체와 sitem.link 값 넘김 -->
                  <a
                    :id="sitem.id"
                    href="javascript:void(0)"
                    :class="sitem.className"
                    role="button"
                    @click="clickMenu($event, sitem.link)"
                  >{{ sitem.name }}</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    asideRoutePath: {
      type: String,
      default: () => { return '' }
    }
  },
  data() {
    return {
      headerTitle: 'MY PAGE',
      menuIndex: 0,
      subMenuIndex: 0,
      mobileView: false,
      isShowMenu: false,
      menuList: [
        {
          // MY TICKETS
          name: this.$t('MAIN_0051'),
          menuToggle: true,
          id: '',
          className: '',
          subMenuList: [
            // 티켓예매 목록
            { name: this.$t('MAIN_0052'), id: '', className: '', link: '/mypage/tickets/list' },
            // 티켓선물 내역
            { name: this.$t('MAIN_0053'), id: '', className: '', link: '/mypage/tickets/giftlist' },
            // 잔여티켓 알림신청 내역
            { name: this.$t('MAIN_0054'), id: '', className: '', link: '/mypage/tickets/remnant' }
          ]
        },
        {
          // MY SHOPPING
          name: this.$t('MAIN_0056'),
          menuToggle: true,
          id: '',
          className: '',
          subMenuList: [
            // 주문내역
            { name: this.$t('MAIN_0057'), id: '', className: '', link: '/mypage/shopping', detailMenuList: [{ name: this.$t('MAIN_0057'), link: '/mypage/shopping/detail' }] },
            // 취소/반품내역
            { name: this.$t('MAIN_0058'), id: '', className: '', link: '/mypage/shopping/requesthistory', detailMenuList: [{ name: this.$t('MAIN_0057'), link: '/mypage/shopping/requestDetail' }] },
            // 위시리스트
            { name: this.$t('MAIN_0059'), id: '', className: '', link: '/mypage/shopping/wish' },
            // 배송지관리
            { name: this.$t('MAIN_0060'), id: '', className: '', link: '/mypage/shopping/address' },
            // 고객리뷰
            { name: this.$t('MAIN_0062'), id: '', className: '', link: '/mypage/shopping/review/writable' },
            // 상품문의
            { name: this.$t('MAIN_0064'), id: '', className: '', link: '/mypage/shopping/inquire' },
            // 재입고 알림
            { name: this.$t('MAIN_0063'), id: '', className: '', link: '/mypage/shopping/restock' }
          ]
        },
        {
          // MY INFO
          name: this.$t('MAIN_0073'),
          menuToggle: true,
          id: '',
          className: '',
          subMenuList: [
            // 나의 회원등급
            { name: this.$t('MAIN_0065'), id: '', className: '', link: '/mypage/info/level' },
            // 나의 쿠폰
            { name: this.$t('MAIN_0066'), id: '', className: '', link: '/mypage/coupon' },
            // (구)멤버스 카드
            { name: this.$t('MAIN_0067'), id: '', className: '', link: '/mypage/info/members' },
            // 나의 문의내역
            { name: this.$t('MAIN_0068'), id: '', className: '', link: '/mypage/qna' },
            // 개인정보 변경/탈퇴
            { name: this.$t('MAIN_0069'), id: '', className: '', link: '/mypage/info' }
          ]
        }
      ]
    }
  },
  computed: {
  },
  watch: {
    asideRoutePath: {
      immediate: true,
      handler(val, prev) {
        console.debug('asideRoutePath', val)
        let hasMenu = false
        for(const i in this.menuList) {
          const subMenuList = this.menuList[i].subMenuList

          for(const j in subMenuList) {
            if(val === subMenuList[j].link) {
              this.menuIndex = i
              this.subMenuIndex = j
              this.headerTitle = subMenuList[j].name
              hasMenu = true
              break
            } else if(subMenuList[j].detailMenuList !== undefined) {
              if(val === subMenuList[j].detailMenuList[0].link && prev === subMenuList[j].link) {
                this.menuIndex = i
                this.subMenuIndex = j
                this.headerTitle = subMenuList[j].name
                hasMenu = true
                break
              } else if(val === subMenuList[j].detailMenuList[0].link) {
                this.menuIndex = i
                this.subMenuIndex = j
                this.headerTitle = subMenuList[j].name
                hasMenu = true
                break
              }
            }
          }
          if(hasMenu) break
        }
        // hasMenu == false이면 메뉴 select안됨, 이동은 됨
        if(!hasMenu) {
          // 마이페이지 메인의 경우 인덱스 설정 안함 
          if(val === '/mypage/') {
            this.menuIndex = -1
            this.subMenuIndex = -1
          }
        }
      }
    }
  },
  mounted() {
    this.viewEvent()
    window.addEventListener('resize', this.viewEvent)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.viewEvent)
  },
  methods: {
    viewEvent() {
      this.screenBranch({
        wide: () => {
          this.mobileView = false
        },
        small: () => {
          this.mobileView = true
        }
      })
    },
    showMenu() {
      this.isShowMenu = !this.isShowMenu
    },
    clickMenu(e, link) {
      // router에 link push, link == router.path
      this.$router.push(link)
      this.showMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/components/aside.scss';
</style>

