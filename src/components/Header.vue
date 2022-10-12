<template>
  <header :class="{ transparent: transparent, shop: shop, dmuseum: dmuseum}">
    <!-- dmuseum -->
    <template v-if="dmuseum">
      <div class="header-web">
        <div class="header-side" />
        <div
          class="main-menu-area"
          :class="{ sticky: headerSticky }"
        >
          <div class="left-area">
            <h1>
              <!-- 모바일 상세 페이지 class="detail-page-title" -->
              <router-link
                :to="{ name: 'Museum' }"
              >
                대림문화재단
              </router-link>
            </h1>
            <div 
              class="main-menu" 
              @mouseleave="menuCall = false"
            >
              <ul>
                <li
                  v-for="(item, index) in museumMainMenu"
                  :key="index"
                  :class="index == currentIdx ? 'on' : ''"
                >
                  <router-link
                    :to="item.router || $route.fullPath"
                    @mouseover.native="mainHover(index)"
                  >
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
              <div
                v-if="menuCall && museumMainMenu[hoverIndex].sub"
                class="sub-menu"
                :class="`menu`+museumMainMenu[hoverIndex].index"
              >
                <div class="menu-area">
                  <ul>
                    <li
                      v-for="(sitem, sindex) in museumMainMenu[hoverIndex].sub"
                      :key="sindex"
                    >
                      <router-link
                        :to="sitem.router"
                      >
                        {{ sitem.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="right-area">
            <div class="sns-links">
              <ul>
                <li 
                  v-for="(item, index) in snsLinks" 
                  :key="index"
                  :class="item.className"
                >
                  <a
                    :href="item.href" 
                    target="_blank"
                    @click="sideClick(index, $event)"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="side-links">
              <ul>
                <li 
                  v-for="(item, index) in museumSideLinks" 
                  :key="index"
                  :class="item.className"
                >
                  <router-link
                    :to="item.router"
                    target="_blank"
                    @click.stop="sideClick(index, $event)" 
                  >
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="header-mobile">
        <div class="header-logo-area">
          <button
            type="button"
            class="btn-back"
          >
            뒤로가기
          </button>
          <h1>
            <!-- @mouseover="mainHover(index, item)" -->
            <router-link :to="{ name: 'Museum' }">
              대림문화재단
            </router-link>
          </h1>
          <button
            type="button"
            class="btn-all-menu"
            @click="gnbOpen($event)"
          >
            전체메뉴
          </button>
        </div>
        <div class="main-menu-area">
          <div class="menu-header">
            <strong class="logo"><router-link :to="{ name: 'Museum' }">대림문화재단</router-link></strong>
          </div>
          <div class="main-menu">
            <ul class="menu-list">
              <li 
                v-for="(item, index) in museumMainMenu" 
                :key="index"
              >
                <router-link :to="item.router">
                  {{ item.name }}
                </router-link>
                <ul
                  v-if="item.sub"
                  class="sub-menu"
                >
                  <li
                    v-for="(sitem, sindex) in item.sub"
                    :key="sindex"
                  >
                    <router-link :to="sitem.router">
                      {{ sitem.name }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="footer-area">
            <div class="sns-links">
              <ul>
                <li 
                  v-for="(item, index) in snsLinks" 
                  :key="index"
                  :class="item.className"
                >
                  <a 
                    :href="item.href" 
                    @click="sideClick(index, $event)"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="side-links">
              <ul>
                <li 
                  v-for="(item, index) in museumSideLinks" 
                  :key="index"
                  :class="item.className"
                >
                  <router-link
                    :to="item.router"
                  >
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            @click="gnbClose($event)"
          >
            닫기
          </button>
        </div>
      </div>
    </template>
    <!--// dmuseum -->
    <!-- main, shop -->
    <template v-else>
      <div
        class="header-web"
        :class="{ 'this-menu': shop, 'none-sub-menu' : noneShopMenu }"
      >
        <div class="header-side">
          <ul>
            <li v-if="!isLogin">
              <router-link :to="{ name: ROUTE.Login }">
                LOGIN
              </router-link>
            </li>
            <li v-if="!isLogin">
              <router-link :to="{ name: ROUTE.Join.JoinInfo }">
                BECOME A MEMBER
              </router-link>
            </li>
            <li v-if="isLogin">
              <!-- @click="logout" -->
              <a
                href="javascript:void(0);"
                @click="logout"
              >
                LOGOUT
              </a>
            </li>
            <li v-if="isLogin">
              <router-link :to="{ name: 'MyPageMain' }">
                MY PAGE
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'NoticeAll' }">
                NOTICE
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: ROUTE.Faq.Category.All, query:{refresh: true} }">
                FAQ
              </router-link>
            </li>
            <!-- <li v-if="!isLogin"> 2022.02.19 [DCJ-T4479] 비로그인신 JOIN 표출 제거
              <router-link :to="{ name: ROUTE.Join.Main }">
                JOIN
              </router-link>
            </li> -->
            <!-- prd 다국어 반영 -->
            <!-- <li v-if="siteMode !== 'prd'"> -->
            <li>
              <a
                href="javascript:void(0);"
                @click="langChange(lang, 'toggle')"
              >
                {{ langComputed }}
              </a>
            </li>
            <!-- 2022.02.17  대림문화재단 새창 띄우기 변경-->
            <li>
              <a 
                :href="foundationUrl"
                target="_blank"
              >
                <a>{{ $t('MAIN_0076') }}</a>  <!-- 대림문화재단 -->
              </a>
            </li>
          </ul>
        </div>
        <div
          class="main-menu-area"
          :class="{ sticky: headerSticky }"
        >
          <h1>
            <!-- 모바일 상세 페이지 class="detail-page-title" -->
            <a
              href="javascript:void(0);"
              @click="$router.push({name: ROUTE.Main})"
            >대림문화재단</a>
          </h1>
          <div 
            class="main-menu" 
            :class="{ live: allView }"
            @mouseleave="menuCall = false"
          >
            <ul>
              <li
                v-for="(item, index) in categoryDepth1"
                :key="index"
                :class="!isMain && index == currentIdx ? 'on' : ''"
              >
                <a 
                  href="javascript:void(0);"
                  @mouseover="mainHoverGnb(index, item)"
                  @mouseleave="mainHoverOutGnb(index, item)"
                  @click="moveLink(item.linkUrl, index)"
                >
                  {{ $i18n.locale === 'en' ? item.gnbNmEn : item.gnbNm }}
                </a>
              </li>
            </ul>
            <!-- v-if="menuCall && categoryDepth2" -->
            <div
              v-show="menuCall && categoryDepth2 && categoryDepth2 != ''"
              class="sub-menu"
              :class="{ normal: isNormalSub }"
              :style="`width: ${getWinwid}px;`"
            >
              <div class="pannel">
                <div>
                  <div class="menu-area">
                    <ul>
                      <template v-if="hoverIndex !== 5">
                        <li
                          v-for="(sitem, sindex) in categoryDepth2"
                          :key="sindex"
                          @click="menuCall = false"
                        >
                          <a
                            href="javascript:void(0);"
                            :style="{color:sitem.linkUrl === $route.name ? 'black':''}" 
                            @click="sitem.linkUrl ? moveSubLink(sitem.linkUrl, sindex): ''"
                          >
                            {{ $i18n.locale === 'en' ? sitem.gnbNmEn : sitem.gnbNm }}
                          </a>
                        </li>
                      </template>
                      <template v-else>
                        <li
                          v-for="(sitem, sindex) in shopSubMenuList"
                          :key="sindex"
                          @click="menuCall = false"
                        >
                          <router-link :to="sitem.router">
                            {{ sitem.name }}
                          </router-link>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div class="banner-area">
                    <ul>
                      <li 
                        v-for="(item, index) in menuBanners"
                        :key="index"
                        :class="item.className"
                      >
                        <strong v-html="item.svg" />
                        <img
                          :src="require(`@images/${item.imgUrl}`)"
                          :alt="item.title"
                        >
                        <!-- 2022.03.01 Open용 문구 변경 -->
                        <template v-if="item.className === 'daelim'">
                          <div>
                            <p>
                              <em v-if="$i18n.locale ==='ko'">전시 준비 중입니다.</em>
                              <em v-else>We are preparing for a next exhibition</em>
                            </p>
                            <p>{{ item.address }}</p>
                            <p>{{ item.title }}</p>
                          </div>
                        </template>
                        <template v-else>
                          <div>
                            <p>
                              <em v-if="holidayInfo ==='Y'">{{ item.name }}</em>
                              <em v-else>OPEN TODAY</em>
                              <span v-if="dayInfo !== 'MON' && holidayInfo === 'N'">{{ item.time }}</span>
                              <span v-else-if="dayInfo === 'SAT' && holidayInfo === 'N'">{{ item.satTime }}</span>
                            </p>
                            <p>{{ item.address }}</p>
                            <p>{{ item.title }}</p>
                          </div>
                        </template>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- shop search area -->
          <template v-if="shop">
            <div class="side-menu-area">
              <ul v-if="isLogin">
                <li
                  v-for="(item, index) in sideList"
                  :key="index"
                  :class="item.className"
                > 
                  <router-link :to="item.router">
                    {{ item.name }}
                    <span
                      v-if="item.ea > 0"
                      class="ea"
                    > {{ item.ea }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <div
              class="shop-sub-menu"
              :class="{'hide' : noneShopMenu}"
            >
              <!-- pc shopmenu -->
              <ul>
                <li
                  v-for="(item, index) in shopSubMenuList"
                  :key="index"
                  :class="{on: shopSubMenuIndex === index}"
                  @click="shopSubMenuIndex = index"
                >
                  <router-link 
                    :to="item.router"
                    :style="[shopSubMenuIndex === index ? { 'color': '#000'} : {'color': '#999'}]"
                  >
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
              <div class="search-area">
                <comp-field
                  v-model="searchWord"
                  width="276"
                  :placeholder="$t('SHOP_0001')"
                  :value="searchWord"
                  @onKeyup="setSearchWord(searchWord)"
                  @onKeypress.enter="searchShopProduct"
                />
                <comp-btn
                  :btn-name="$t('SHOP_0001')"
                  class-name="btn-search"
                  @click="searchShopProduct"
                />
              </div>
            </div>
          </template>
          <!--// shop search area -->
          <!-- main side link area -->
          <template v-else>
            <div class="side-links">
              <ul
                :class="{ live: allView }"
              >
                <li 
                  v-for="(item, index) in sideLinks"
                  :key="index" 
                  :class="item.className"
                >
                  <a 
                    :href="item.href"
                    @click.stop="sideClassClick(item.className)"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div
              v-show="onSearchBox"
              v-click-outside="()=>{ onSearchBox=false }"
              class="search-view-box"
            >
              <div>
                <comp-field
                  v-model="searchString"
                  :error-msg="alert ? $t('SEARCH_0001') : alertLength ? $t('SEARCH_0021') : ''"
                  :placeholder="$t('SEARCH_0001')"
                  @onKeyup.enter="searchProgram"
                />
                <button
                  type="button"
                  class="search-submit"
                  @click="searchProgram"
                >
                  검색
                </button>
              </div>
              <button 
            
                type="button"
                class="search-close"
                @click="onSearchBox = false"
              >
                검색 닫기
              </button>
            </div>
          </template>
          <!--// main side link area -->
        </div>
      </div>
      <!-- main, shop mobile area -->
      <div class="header-mobile">
        <div class="header-logo-area">
          <strong class="mo-subject">
            {{ headerTitle }}
            <template
              v-if="shop &&
                shopSubMenuIndex > -1 &&
                shopSubMenuList[shopSubMenuIndex] &&
                shopSubMenuList[shopSubMenuIndex].name"
            >
              {{ shopSubMenuList[shopSubMenuIndex].name }}
            </template>
          </strong>
          <h1 v-if="isGnb">
            <router-link :to="{ name: 'Main' }">
              대림문화재단
            </router-link>
          </h1>
          <button
            v-else
            type="button"
            class="btn-back"
            @click="goBack()"
          >
            뒤로가기
          </button>
          <!-- <router-link :to="{ name: 'Search', params: { searchString }}"> -->
          <button
            v-if="transparent"
            type="button"
            class="btn-search"
            @click="moSearchLayerCall = true"
          >
            검색
          </button>
          <!-- </router-link> -->
          <button
            type="button"
            class="btn-all-menu"
            @click="gnbOpen($event)"
          >
            전체메뉴
          </button>
        </div>
        <div class="main-menu-area">
          <div class="menu-header">
            <strong class="logo">
              <router-link :to="{ path: '/' }">
                대림문화재단
              </router-link>
            </strong>
          </div>
          <div class="main-menu">
            <ul class="menu-list">
              <li 
                v-for="(item, index) in categoryDepth1" 
                :key="index"
              >
                <a
                  @click="mainClickGnbMobile(index, item)"
                >
                  {{ item.gnbNm }}
                </a>
              </li>
            </ul>
            <ul class="util-menu">
              <li v-if="!isLogin"> 
                <router-link :to="{ name: ROUTE.Join.JoinInfo }"> 
                  BECOME A MEMBER
                </router-link>
              </li>
              <li v-if="!isLogin">
                <router-link :to="{ name: ROUTE.Login }">
                  LOGIN
                </router-link>
              </li>
              <li v-if="isLogin">
                <router-link 
                  :to="{ name: 'MyPageMain' }"
                  @click.native="gnbClose"
                >
                  MY PAGE
                </router-link>
              </li>
              <li v-if="isLogin">
                <a
                  href="javascript:void(0);"
                  @click="logout"
                >
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-area">
            <ul>
              <li 
                v-for="(item, index) in menuFooter"  
                :key="index"
                :class="item.className"
              > 
                <a @click="asideFootClick(item)">
                  {{ item.name }}
                </a>
              </li>
            </ul>
            <!-- 노션 354 -->
            <div
              v-if="moSearchLayerCall"
              class="search-mo-layer"
            >
              <button 
                type="button" 
                class="btn-close"
                @click="moSearchLayerCall = false, searchString = ''"
              >
                닫기
              </button>
              <div class="search-filed-area">
                <comp-field 
                  v-model="searchString"
                  :error-msg="alert == true ? $t('SEARCH_0001') : alertLength ? $t('SEARCH_0021') : ''"
                  :placeholder="$t('SEARCH_0001')"
                  @onKeyup.enter="searchProgram"
                />
                <button
                  type="button"
                  class="search-submit"
                  @click="searchProgram"
                >
                  검색
                </button>
              </div>
            </div>
            <div class="lang-area">
              <a 
                :href="foundationUrl"
                target="_blank"
              >
                <strong>{{ $t('MAIN_0076') }}</strong>  <!-- 대림문화재단 -->
              </a>
              <ul>
                <!-- <li
                  v-if="siteMode !== 'prd'"
                > -->
                <li>
                  <a
                    href="javascript:void(0);"
                    @click="langChange(lang, 'toggle')"
                  >
                    {{ langComputed }}
                  </a>
                </li> 
                <!-- <li  //2022.02.18 GNB 토글 메인과 동일하게 변경(LIST 표출 제거)
                  v-for="(l, index) in langList"
                  :key="index"
                >
                  <a
                    :class="{on: l.code === lang}"
                    @click="langChange(l.code, 'click')"
                  >
                    {{ l.name }}
                  </a>
                </li> -->
              </ul>
            </div>
          </div>
          <div
            v-if="menuCall"
            class="sub-menu"
          >
            <button
              type="button"
              class="btn-prev"
              @click="menuCall = false"
            >
              {{ categoryDepth1[hoverIndex].gnbNm }}
            </button>
            <div class="menu-area">
              <ul>
                <template v-if="hoverIndex !== 5">
                  <li
                    v-for="(sitem, sindex) in categoryDepth2"
                    :key="sindex"
                  >
                    <a @click="sitem.linkUrl ? moveLink(sitem.linkUrl, sindex): ''">  <!-- 다국어 처리 -->
                      {{ $i18n.locale === 'en' ? sitem.gnbNmEn : sitem.gnbNm }}
                    </a>
                  </li>
                </template>
                <template v-else>
                  <!-- hamburger shopmenu -->
                  <li
                    v-for="(sitem, sindex) in shopSubMenuMobileList" 
                    :key="sindex"
                    @click="menuCall = false; shopSubMenuIndex = sindex - 1"
                  >
                    <router-link
                      :to="sitem.router || {name: sitem.linkUrl}"
                      @click.native="gnbClose"
                    >
                      {{ sitem.name || sitem.gnbNm }}
                    </router-link>
                  </li>
                </template>
              </ul>
            </div>
            <ul class="util-menu">
              <li v-if="!isLogin"> 
                <router-link :to="{ name: ROUTE.Join.JoinInfo }"> 
                  BECOME A MEMBER
                </router-link>
              </li>
              <li v-if="!isLogin">
                <router-link :to="{ name: ROUTE.Login }">
                  LOGIN
                </router-link>
              </li>
              <li v-if="isLogin">
                <router-link 
                  :to="{ name: 'MyPageMain' }"
                  @click.native="gnbClose"
                >
                  MY PAGE
                </router-link>
              </li>
              <li v-if="isLogin">
                <a
                  href="javascript:void(0);"
                  @click="logout"
                >
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            class="btn-close"
            @click="gnbClose($event)"
          >
            닫기
          </button>
        </div>
        <template v-if="shop">
          <div class="side-menu-area">
            <div class="search-area">
              <comp-field
                v-model="searchWord"
                :placeholder="$t('SHOP_0001')"
                :value="searchWord"
                @onKeyup="setSearchWord(searchWord)"
                @onKeypress.enter="searchShopProduct"
              />
              <comp-btn
                :btn-name="$t('SHOP_0001')"
                class-name="btn-search"
                @click="searchShopProduct"
              />
            </div>
            <ul>
              <li
                v-for="(item, index) in sideList"
                :key="index"
                :class="item.className"
              > 
                <router-link :to="item.router">
                  {{ item.name }}
                  <span
                    v-if="item.ea > 0"
                    class="ea"
                  > {{ item.ea }}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="shop-sub-menu">
            <!-- MOBILE shopmenu -->
            <ul>
              <!-- mobileShopSubMenuList -->
              <li
                v-for="(item, index) in shopSubMenuList"
                :key="index"
                @click="shopSubMenuIndex = index"
              >
                <router-link
                  :to="item.router"
                  :style="[shopSubMenuIndex === index ? {'color': '#000'} : {'color': '#999'}]"
                >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <!--// main, shop mobile area -->
    </template>
    <!--// main, shop -->
  </header>
</template>

<script>
import headerMixin from '@/mixins/common/headerMixin'

import '@utils/network/index.js'
import ClickOutside from 'vue-click-outside'
import { logout } from '@utils/login'
import { appLogout, isNativeApp } from '@utils/appInfo'
import gnbMixin from '@/mixins/gnbMixin'
import CompBtn from '@comp/elements/Btn.vue'
import { searchShopCategoryList } from '@api/shop/Category.js'
import { isEmpty } from '@utils/StringUtils/StringUtil.js'
import { specialCharacters } from '@utils/common/common.js'
import { replaceSpecialKeyword } from '@utils/common/inputValidation.js'

import { getDayInfo } from '@api/main/DateChk.js'

export default {
  name: 'Header',
  component: {
    CompBtn
  },
  directives: {
    ClickOutside
  },
  mixins: [gnbMixin, headerMixin],
  props: {
    transparent: {
      type: Boolean,
      default: false,
      required: false
    },
    shop: {
      type: Boolean,
      default: false,
      required: false
    },
    dmuseum: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      // main, shop header
      siteMode: process.env.NODE_ENV, 
      isGnb: true,
      ROUTE: ROUTE,
      headerTitle: '',
      lang: this.$i18n.locale,
      gnbDepth: 0,
      searchWord: '',
      searchString: '',
      thisMenu: null,
      currentIdx: '',
      isMain: true,
      sideLinks: [
        { name: 'SCHEDULE', href: 'javascript:void(0);', className: 'schedule' },
        { name: 'SEARCH', href: 'javascript:void(0);', className: 'search' },
        { name: 'ALL MENU', href: 'javascript:void(0);', className: 'all-menu' }
      ],
      isNormalSub: true,
      sideList: [
        { name: 'Like', ea: this.getUserWishCount, router: { name: 'WishList' }, className: 'like' },
        { name: 'Cart', ea: this.getUserCartCount, router: { name: 'Basket' }, className: 'cart' }
      ],
      onSearchBox: false,
      alert: false,
      alertLength: false,
      dayInfo: '',
      holidayInfo: '',
      menuBanners: [
        { 
          className: 'd-museum',
          title: this.$i18n.locale === 'ko' ? '디뮤지엄' : 'D MUSEUM', 
          name: this.$i18n.locale === 'ko' ? '휴관일' : this.$i18n.locale === 'en' ? 'CLOSED' : '',
          imgUrl: 'header/d-museum.jpg', // 2022.03.01 이미지 최신소스로 변경
          time: '11:00 ~ 20:00',
          satTime: '11:00 ~ 21:00',
          address: this.$i18n.locale === 'ko' ? '서울특별시 성동구 왕십리로 83-21,' : 'D MUSEUM, 83-21, Wangsimni-ro, Seongdong-gu, Seoul',
          svg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="17.997" viewBox="0 0 88 17.997">
              <path data-name="-e-디뮤지엄" d="M5040 188.995v-17.979h17.28v17.979zm3.581-3.67h5.367a5.341 5.341 0 0 0 0-10.682h-5.367v1.615h1.386v7.454h-1.386zm15.289 3.652V171H5128v17.979zm43.272-12.543h1.066v5.158a3.663 3.663 0 1 0 7.325 0v-5.158h1.067v-1.618h-3.723v1.618h1.064v5.161a2.07 2.07 0 1 1-4.14 0v-5.161h1.064v-1.618h-3.723zm-12.747 8.876a3.3 3.3 0 0 0 3.4-3.192v-.018a2.98 2.98 0 0 0-.059-.578 2.477 2.477 0 0 0-.958-1.5 5.188 5.188 0 0 0-1.854-.806c-.122-.031-.244-.063-.368-.091-.227-.057-.458-.115-.689-.18a11.15 11.15 0 0 1-.729-.22 1.039 1.039 0 0 1-.769-.936 1.47 1.47 0 0 1 1.7-1.5c1.544.058 1.8 1.781 1.8 1.781h1.591v-3.314h-1.591v.468l-.009-.006a3.47 3.47 0 0 0-1.891-.551 3.052 3.052 0 0 0-3.207 2.87v.237a2.258 2.258 0 0 0 .016.282 2.569 2.569 0 0 0 1.159 1.852 2.53 2.53 0 0 0 .516.261 9.792 9.792 0 0 0 1.18.358 46.709 46.709 0 0 1 .921.244 4.433 4.433 0 0 1 1.057.4 1.01 1.01 0 0 1 .582.955 1.045 1.045 0 0 1-.017.2 1.86 1.86 0 0 1-1.936 1.368 2.033 2.033 0 0 1-1.953-1.879h-1.587v3.345h1.592v-.534a3.512 3.512 0 0 0 2.102.684zm-14.127-8.876h1.067v5.158a3.664 3.664 0 1 0 7.327 0v-5.158h1.065v-1.618H5081v1.618h1.066v5.161a2.07 2.07 0 1 1-4.14 0v-5.161h1.063v-1.618h-3.723zm45.534 8.718h3.727v-1.619h-1.065v-7.1h1.065v-1.618h-3.5l-2.48 5.059-2.48-5.059h-3.5v1.618h1.067v7.1h-1.067v1.619h3.726v-1.619h-1.067v-6.776l3.319 6.776 3.321-6.776v6.776h-1.068zm-26.788 0h7.154v-2.7h-1.591v1.078h-2.91v-2.74h2.919v-1.615h-2.919v-2.744h2.91v1.076h1.591v-2.694h-7.154v1.618h1.062v7.1h-1.062zm-23.442 0h3.725v-1.619h-1.067v-7.1h1.067v-1.618h-3.5l-2.48 5.059-2.479-5.059h-3.5v1.618h1.066v7.1h-1.066v1.619h3.725v-1.619H5065v-6.776l3.32 6.776 3.32-6.776v6.776h-1.067zm-24.015-1.444v-7.449h2.4a3.725 3.725 0 0 1 0 7.449z" transform="translate(-5039.999 -170.998)" style="fill:#111"/>
            </svg>
          `
        },
        { 
          className: 'daelim',
          title: this.$i18n.locale === 'ko' ? '대림미술관' : 'DAELIM MUSEUM',
          imgUrl: 'header/daelim.jpg', // 2022.03.01 이미지 최신소스로 변경
          time: '10:00 ~ 18:00', 
          address: this.$i18n.locale === 'ko' ? '서울특별시 종로구 자하문로 4길 21,' : 'DAELIM MUSEUM, 21, Jahamun-ro 4-gil, Jongno-gu, Seoul',
          svg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="122.999" height="11.998" viewBox="0 0 122.999 11.998">
              <path data-name="-e-대림미술관" d="M4814.281 186.047v-8.389c0-.365.133-.527.489-.527h1.858c.367 0 .477.161.477.527v7.89c0 .791.7 1.114 1.557 1.114.837 0 1.556-.323 1.556-1.114v-7.89c0-.365.138-.527.49-.527h1.863c.354 0 .469.161.469.527v8.389c0 1.488-1.161 2.95-4.378 2.95-3.238.003-4.381-1.462-4.381-2.95zm-19.1 0V184.9c0-.37.132-.535.5-.535h1.785c.349 0 .471.165.471.535v.773c0 .793.67 1.089 1.513 1.089s1.533-.3 1.533-1.089v-.352c0-.618-.823-.909-1.487-1.148l-2.459-.931a2.562 2.562 0 0 1-1.6-2.294v-1c0-1.493.892-2.95 4.062-2.95 3.189 0 4.147 1.458 4.147 2.95v.637c0 .358-.138.518-.5.518h-1.79c-.35 0-.476-.16-.476-.518v-.261c0-.795-.553-1.091-1.337-1.091s-1.369.3-1.369 1.091v.181a.782.782 0 0 0 .561.729l2.884.979a2.793 2.793 0 0 1 2.143 2.606v1.226c0 1.488-1.045 2.95-4.279 2.95s-4.302-1.46-4.302-2.948zm-10.543 0v-8.389c0-.365.126-.527.5-.527h1.849c.368 0 .477.161.477.527v7.89c0 .791.7 1.114 1.555 1.114s1.558-.323 1.558-1.114v-7.89c0-.365.142-.527.5-.527h1.845c.359 0 .482.161.482.527v8.389c0 1.488-1.167 2.95-4.389 2.95s-4.378-1.462-4.378-2.95zm49.109 2.811c-.371 0-.5-.16-.5-.527v-5.458a31.524 31.524 0 0 1-.537 1.814l-.771 1.878a.667.667 0 0 1-.664.519h-1.49a.7.7 0 0 1-.657-.519l-.947-2.2a11.251 11.251 0 0 1-.437-1.428v5.4c0 .367-.13.527-.488.527h-1.681c-.361 0-.493-.16-.493-.527v-10.679c0-.365.132-.527.493-.527h1.681a.426.426 0 0 1 .444.283l2.335 5.276c.248.58.467 1.3.5 1.358a11.219 11.219 0 0 1 .489-1.336l2.264-5.337c.07-.174.2-.244.458-.244h1.765c.357 0 .483.161.483.527v10.673c0 .367-.126.527-.483.527zm-27.718 0c-.351 0-.5-.167-.5-.527v-10.673c0-.365.149-.527.5-.527h5.875c.36 0 .516.123.516.489v1.347c0 .354-.155.5-.516.5h-3.538v2.233h3.262c.358 0 .523.12.523.483v1.257c0 .359-.165.5-.523.5h-3.262v2.588h3.711c.367 0 .509.115.509.479v1.341c0 .359-.142.5-.509.5zm-25.669 0c-.353 0-.5-.16-.5-.527v-5.458c-.023.059-.341 1.261-.549 1.814l-.765 1.878a.677.677 0 0 1-.668.519h-1.478c-.342 0-.518-.217-.658-.519l-.932-2.2a11.413 11.413 0 0 1-.46-1.428v5.4c0 .367-.12.527-.472.527h-1.688c-.362 0-.5-.16-.5-.527v-10.679c0-.365.142-.527.5-.527h1.688a.432.432 0 0 1 .444.283l2.33 5.276c.242.58.464 1.3.5 1.358a12.513 12.513 0 0 1 .5-1.336l2.243-5.337c.073-.174.212-.244.467-.244h1.773c.358 0 .473.161.473.527v10.673c0 .367-.115.527-.473.527zm-15.726 0c-.375 0-.511-.16-.511-.527v-5.458c-.011.059-.337 1.261-.537 1.814l-.762 1.878c-.137.335-.313.519-.665.519h-1.492c-.351 0-.521-.217-.664-.519l-.937-2.2c-.185-.436-.408-1.3-.448-1.428v5.4c0 .367-.118.527-.479.527h-1.687c-.362 0-.493-.16-.493-.527v-10.679c0-.365.131-.527.493-.527h1.687a.413.413 0 0 1 .44.283l2.346 5.276c.232.58.456 1.3.491 1.358a11.055 11.055 0 0 1 .494-1.336l2.25-5.337c.073-.174.219-.244.472-.244h1.769c.354 0 .476.161.476.527v10.673c0 .367-.121.527-.476.527zm-13.062 0c-.368 0-.5-.16-.5-.527v-10.673c0-.365.128-.527.5-.527h1.851c.355 0 .483.161.483.527v10.673c0 .367-.127.527-.483.527zm-8.4 0c-.311 0-.443-.18-.443-.527v-10.673c0-.365.132-.527.506-.527h1.846c.367 0 .493.161.493.527v8.877h3.356c.363 0 .514.115.514.479v1.341c0 .359-.151.5-.514.5zm-8.755 0c-.363 0-.5-.167-.5-.527v-10.673c0-.365.138-.527.5-.527h5.875c.353 0 .5.123.5.489v1.347c0 .354-.149.5-.5.5h-3.541v2.233H4740c.362 0 .517.12.517.483v1.257c0 .359-.155.5-.517.5h-3.259v2.588h3.7c.368 0 .528.115.528.479v1.341c0 .359-.16.5-.528.5zm-4.347 0c-.37 0-.523-.188-.61-.527l-.441-1.638h-2.85l-.449 1.638c-.092.339-.236.527-.6.527h-1.733c-.358 0-.479-.188-.377-.527l3.106-10.673c.108-.343.271-.527.635-.527h1.859a.6.6 0 0 1 .633.527l3.108 10.673c.1.339-.015.527-.377.527zm-3.036-5.338-.249.921h1.613l-.24-.921a34.754 34.754 0 0 1-.537-3.612 34.3 34.3 0 0 1-.592 3.612zm-13.6 5.338c-.311 0-.432-.18-.432-.527v-10.673c0-.365.141-.527.5-.527h3.89c3.226 0 4.4 1.466 4.4 2.946v5.832c0 1.486-1.171 2.949-4.4 2.949zm2.407-2.323h1.546c.845 0 1.556-.328 1.556-1.125v-4.823c0-.793-.711-1.134-1.556-1.134h-1.546z" transform="translate(-4712.995 -176.999)" style="fill:#111"/>
            </svg>
          `
        }
        // DLM-222 : 구슬모아 당구장 삭제
      ],
      headerSticky: false,
      getWinwid: 0,
      allView: false, // dmuseum
      menuCall: false,
      hoverIndex: 0,
      menuFooter: [
        { name: 'SCHEDULE', className: 'schedule', router: { name: ROUTE.Calendar } },
        // { name: 'SEARCH', className: 'search', router: { name: ROUTE.Shop.Main } },
        { name: 'SEARCH', className: 'search', router: { name: ROUTE.Search, params: { searchString: '' } } },
        { name: 'ALARM', className: 'alarm', router: { name: ROUTE.Notice.Category.All } },
        { name: 'HELP', className: 'help', router: { name: ROUTE.Faq.Category.All } }
      ],
      moSearchLayerCall: false, // 노션 354
      langList: [
        { name: 'KOR', href: 'javascript:void(0);', code: 'ko' },
        { name: 'ENG', href: 'javascript:void(0);', code: 'en' }
      ],
      // shop
      eventTicketHover: false,
      noneShopMenu: false,
      shopSubMenuList: [],
      shopSubMenuIndex: 0,
      // museum header
      museumMainMenu: [
        { 
          index: 1,
          name: this.$t('DAELIM_0001'),
          router: { name: ROUTE.Museum.Introduce }
        },
        { 
          index: 2,
          name: this.$t('DAELIM_0049'), 
          router: { name: '' },
          sub: [
            { name: this.$t('DAELIM_0025'), router: { name: ROUTE.Museum.Notice } },
            { name: this.$t('DAELIM_0037'), router: { name: ROUTE.Museum.Employment } }
          ]
        }
      ],
      snsLinks: [
        // { name: 'facebook', href: 'https://www.facebook.com/daelimmuseum', className: 'facebook' },
        // { name: 'twitter', href: 'https://tv.naver.com/daelimmuseum', className: 'twitter' },
        { name: 'instagram', href: 'https://www.instagram.com/daelimmuseum/', className: 'instagram' },
        { name: 'youtube', href: 'https://www.youtube.com/user/DaelimMuseum', className: 'youtube' }
      ],
      museumSideLinks: [
        { name: this.$t('DAELIM_0019'), router: { name: ROUTE.Main }, className: 'museum' },
        { name: this.$t('DAELIM_0016'), router: { name: ROUTE.Main }, className: 'daelim-museum' },
        { name: this.$t('DAELIM_0022'), router: { name: ROUTE.Main }, className: 'moa' }
      ]
    }
  },
  computed: {
    langComputed() {
      let result = ''
      switch (this.lang) {
      case 'ko':
        result = 'KOR'
        break
      case 'en':
        result = 'ENG'
        break
      }
      return result
    }, 
    isLogin() {
      return this.$store.state.loginStore.isLogin
    },
    shopSubMenuMobileList() {
      return [].concat(this.categoryDepth2).concat(this.shopSubMenuList)
    },
    foundationUrl() {
      return process.env.VUE_APP_WEB_FOUNDATION_URL
    }
  },
  watch: {
    onSearchBox(val) {
      !val && (this.searchString = '')
    },
    '$route.path' (to) {
      this.gnbClose()
      this.isMainChk()

      this.isGnb = this.$route.meta.gnb || false
      this.headerTitle = ''
      this.currentIdx = -1
      /**
       * fin 1depth menu
       */
      let route

      if(this.dmuseum) {
        route = this.$route
        this.currentIdx = this.museumMainMenu.filter(menu => {
          return menu.sub
            ? menu.sub.some(subMenu => subMenu.router.name === route.name)
            : menu.router.name === route.name
        })[0]?.index - 1
      } else {
        if(this.categoryDepth1 && this.$route.matched.length > 0) {
          // get route children
          route = this.$router.options.routes.find(route => route.path === this.$route.matched[0].path)
          if(route && route.children && route.children.length > 0) {
            // GNB Menu compare with first child menu
            this.currentIdx = this.categoryDepth1.map(menu => menu.linkUrl).indexOf(route.children[0].name)
          }
        }
      }

      // 메뉴 접근가능 여부 체크
      let isDisableMenu = false
      let oneDepthGnbRouterName = null
      let currMenu = null
      const allCategoryList = this.$store.state.common.gnb.allCategoryList

      // 라우터 이름을 통해 현재 메뉴에 대한 정보 조회
      // currMenu = allCategoryList.filter(menu => menu.linkUrl === to.name)[0] // to.name parameter is undefined
      currMenu = allCategoryList.filter(menu => menu.linkUrl === this.$route.name)[0]

      // 현재 메뉴에 대한 정보가 카테고리 목록에 있는 URL이고, 사용여부 또는 전시여부가 Y 가 아닌 경우
      if(currMenu !== undefined && currMenu !== null && (currMenu.useYn !== 'Y' || currMenu.dispYn !== 'Y')) {
        isDisableMenu = true
      }

      // 현재 화면에 대한 1 Depth GNB 메뉴의 라우터 이름 조회
      if(route && route.children && route.children.length > 0) {
        oneDepthGnbRouterName = route.children[0].name
      }
      
      // 현재 화면에 대한 1 Depth GNB가 비활성화 상태인 경우
      if(oneDepthGnbRouterName !== undefined && oneDepthGnbRouterName !== null && allCategoryList.filter(menu => menu.linkUrl === oneDepthGnbRouterName && (menu.useYn !== 'Y' || menu.dispYn !== 'Y')).length > 0) {
        isDisableMenu = true
      }
      
      // 비활성화 상태인 화면인 경우 메인화면으로 강제 이동
      if(isDisableMenu === true) {
        this.$router.push({ name: ROUTE.Main })
        return
      }
      
      /**
       모바일 Web 타이틀 노출 우선순위
       1. 1depth에서 meta title을 정의 한 경우에는 2depth이상의 메뉴에서는 1depth title을 노출 : ex) My Page
       2. 각 화면에서 meta title을 정의 한 경우
       3. GNB가 있는 메뉴면 GNB 메뉴명 노출
       4. 미노출
       **/

      // 1depth에서 title을 정의 한 경우에는 2depth이상의 메뉴에서는 1depth title을 노출
      if(this.currentIdx < 0 && route && route.meta && route.meta.title) {
        this.headerTitle = route.meta.title
      }else{
        // 각 화면에서 title을 정의 한 경우
        if(this.$route.meta && this.$route.meta.title) {
          this.headerTitle = this.$route.meta.title
        }else{
          // GNB 메뉴명 노출
          if(this.currentIdx >= 0) {
            this.headerTitle = this.categoryDepth1[this.currentIdx].gnbNm
          }
        }
      }

      // shop gnb: category page Index
      if(this.$route.name === ROUTE.Shop.CategoryList) {
        const categoryIdx = this.$route.params.categoryIdx
        this.shopSubMenuIndex = this.shopSubMenuList.findIndex(shopSub => Number(shopSub.router.params.categoryIdx) === Number(categoryIdx))
      } else {
        this.shopSubMenuIndex = -1
      }

      // shop searchWord refresh
      if(this.$route.name !== ROUTE.Shop.Search) {
        this.searchWord = ''
      }
    },
    shop() {
      if(this.shop) {
        if(this.isLogin) {
          this.selectUserWishCount()
          this.selectUserCartCount()
          this.sideList.find(side => side.name === 'Like').ea = this.getUserWishCount
          this.sideList.find(side => side.name === 'Cart').ea = this.getUserCartCount
        }
      }
      return this.shop
    },
    getUserWishCount() {
      this.sideList.find(side => side.name === 'Like').ea = this.getUserWishCount
    },
    getUserCartCount() {
      this.sideList.find(side => side.name === 'Cart').ea = this.getUserCartCount
    }
  },
  created () {
    this.$store.dispatch('common/gnb/searchGnbCategoryList', false)

    // 일자 정보 조회 -> header 내 이용
    getDayInfo().then(res => {     
      if(res.data != null) {
        this.dayInfo = res.data
        this.holidayInfo = res.oprDtChk
      }
    })
  },
  mounted() {
    this.screenChange()
    window.addEventListener('resize', this.screenChange)
    // shop menu list
    this.setShopSubMenuList()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screenChange)
  },
  methods: {
    // pub
    screenChange() {
      this.screenBranch({
        wide: () => {
          window.onscroll = this.sticky
          this.getWinwid = window.$('header').width()
        },
        small: () => {
          window.onscroll = this.scrollEvent
        }
      })
    },
    sticky() {
      this.onSearchBox = false

      const side = this.$el.querySelector('.header-side')
      const menus = this.$el.querySelector('.main-menu-area')
      const sideH = side.clientHeight === 0 ? menus.clientHeight : side.clientHeight
      if (window.pageYOffset >= sideH) {
        this.headerSticky = true
        this.allView = false
      } else {
        this.headerSticky = false
      }
      this.eventTicketHover = false
    },
    scrollEvent() {
      this.onSearchBox = false
      const header = this.$el.querySelector('.header-mobile')
      const basketHeader = document.querySelector('.basket-fix-area') ?? document.body
      if (window.pageYOffset > 0) {
        header.classList.add('scroll')
        if (this.shop) {
          basketHeader.classList.add('fix-on')
        }
      } else {
        header.classList.remove('scroll')
        if (this.shop) {
          basketHeader.classList.remove('fix-on')
        }
      }
    },
    sideClick(i, e) {
      if (i === 2) {
        this.allView = true
      }
      // search layer
      const search = e.target.closest('li') ?? e.target
      if (search.classList.contains('search')) {
        this.onSearchBox = true
      }
    },
    sideClassClick(attrClass) {
      this.onSearchBox = false
      switch (attrClass) {
      case 'schedule':
        this.$router.push({ name: ROUTE.Calendar })
        break
      case 'search':
        this.onSearchBox = true
        break
      case 'all-menu':
        this.allView = true
        break
      }
    },
    moveLink(link, idx) {
      if(this.$route.name !== link) { 
        this.$router.push({ name: link })
      } else {
        this.gnbClose()
      }
      this.menuCall = false
      this.currentIdx = idx
    },
    moveSubLink(link) {
      this.$router.push({ name: link })
      this.menuCall = false
      this.currentIdx = this.hoverIndex
    },
    isMainChk() {
      if(this.$route.name === 'Main') {
        this.isMain = true
      } else {
        this.isMain = false
      }
    },
    mainHover(i) {
      if (i < 3) {
        this.hoverIndex = i
        this.menuCall = true
        i === 0 ? this.isNormalSub = false : this.isNormalSub = true
      } else {
        this.menuCall = false
      }
    },
    mainHoverGnb(i, item) {
      if(i < 3) {
        this.setGnb(1, item.gnbIdx)
        this.hoverIndex = i
        this.menuCall = true
        i === 0 ? this.isNormalSub = false : this.isNormalSub = true
      } else {
        if (this.shop && i > 2 && i < 5) {
          this.eventTicketHover = true
        } else { 
          this.eventTicketHover = false
        }
        this.menuCall = false
      }
      if(this.shop && i < 5) { // gnb index로 구분하는거 ... 나중에 수정하셔야할지도 ㅠ
        this.noneShopMenu = true
      }
    },
    mainHoverOutGnb(i, item) {
      if(this.shop) {
        this.noneShopMenu = false
      }
    },
    mainClickGnbMobile(i, item) {
      this.setGnb(1, item.gnbIdx)

      if(this.categoryDepth2.length <= 0) {
        this.gnbClose()
        this.$router.push({ name: item.linkUrl })
        this.menuCall = false
      } else {
        this.hoverIndex = i
        this.menuCall = true
      }
    },
    gnbOpen($event) {
      const header = document.querySelector('.header-mobile')
      header.classList.add('open')
      document.querySelector('body').classList.add('scroll-lock')
    },
    gnbClose($event) {
      const header = document.querySelector('.header-mobile')
      header.classList.remove('open')
      document.querySelector('body').classList.remove('scroll-lock')
    },
    mainClick(i) {
      this.hoverIndex = i
      this.menuCall = true
    },
    mainClickGnb(i, item) {
      // header source
      this.setGnb(1, item.gnbIdx /*, item.linkUrl */)
      // pub
      this.hoverIndex = i
      this.menuCall = true
    },
    // header source
    langChange(lang, event) {
      if(event === 'toggle') {
        switch (lang) {
        case 'ko': lang = 'en'
          break
        case 'en': lang = 'ko'
          break
        }
      }
      this.lang = lang
      localStorage.setItem('locale', lang)
      location.reload()
    },
    logout() {
      this._confirm({
        content: this.$t('MAIN_0074'), // 로그아웃 하시겠습니까? 
        okLabel: this.$t('COMM_0011'), // 확인
        cancelLabel: this.$t('COMM_0012'), // 취소
        okClickListener: () => {
          logout()

          // 로그아웃 스키마 호출
          if (isNativeApp()) {
            location.href = appLogout()

            sessionStorage.removeItem('autoLogin')
          }

          this.$router.push('/login')
        },
        cancelClickListener: () => { return false }
      })
    },
    setGnb(gnbDepth, gnbIdx /* , linkUrl */) {
      // this.$router.push({ name: linkUrl })
      this.gnbDepth = gnbDepth
      this.gnbIdx = gnbIdx
    },

    // shop 검색결과
    searchShopProduct($event) {
      if(!this.searchWord) {
        this._alert(this.$t('SHOP_0441')) // 상품의 검색어를 입력해주세요.
      } else {
        this.$router.push({ name: ROUTE.Shop.Search, params: { searchWord: this.searchWord } })
      }
    },
    // shop 검색키워드 세팅
    setSearchWord(searchWord) {
      if(searchWord.trim() === '') {
        this.searchWord = specialCharacters(searchWord.trim())
      } else {
        this.searchWord = Array.from(new Set(specialCharacters(searchWord).split(' '))).join(' ')
      }
    },

    // main search validation
    searchValidation() {
      if(isEmpty(this.searchString || this.searchString.trim())) {
        this.alert = true
        this.alertLength = false
        return false
      }
      if(this.searchString.trim().length < 2) {
        this.alert = false
        this.alertLength = true
        return false
      }
      this.alert = false
      this.alertLength = false
      return true
    },

    // main search
    searchProgram() {
      this.searchString = replaceSpecialKeyword(this.searchString)

      if(this.searchValidation()) {
        this.onSearchBox = false
        this.moSearchLayerCall = false
        this.$router.push({ name: ROUTE.Search.All, params: { searchString: this.searchString } })
        this.searchString = ''
      }
    },

    // shop sub menu
    setShopSubMenuList() {
      searchShopCategoryList().then(res => {
        this.shopSubMenuList = res?.filter(category => {
          return category.categoryDepth === 2
        }).map(category2 => {
          return {
            name: category2.categoryNm,
            router: { name: ROUTE.Shop.CategoryList, params: { categoryIdx: category2.categoryIdx.toString() } }
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },

    asideFootClick(menuFooter) { // 노션 354
      if(menuFooter.name === 'SEARCH') {
        this.moSearchLayerCall = true
      }else if (menuFooter.router.name === this.$route.name) {
        this.gnbClose()
      }else {
        this.$router.push(menuFooter.router)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@styles/layouts/header.scss';
// mobile lang toggle style
.lang-area ul li a {
  color: #666 !important;
  font-weight: 500 !important;
} 
.lang-area ul li a.on {
  color: #fff !important;
  font-weight: 600 !important;
}
</style>
