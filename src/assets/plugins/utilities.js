const utilites = {
  beforeDestroy() {
    window.removeEventListener('resize', this.mobileAside)
    window.removeEventListener('resize', this.mobileSubject)
    window.removeEventListener('scroll', this.following)
  },
  methods: {
    isMobile() {
      const UserAgent = navigator.userAgent
      if ( 
        UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null ||
        UserAgent.match(/LG|SAMSUNG|Samsung/) != null
      ) { 
        return true
      } else {
        return false
      }
    },
    screenBranch(obj) {
      if (window.$(window).width() < 1024) {
        obj.wide = null
        obj.small && obj.small()
      } else {
        obj.small = null
        obj.wide && obj.wide()
      }
    },
    pxToRem(pxSize) {
      return pxSize / parseFloat(getComputedStyle(document.documentElement).fontSize)
    },
    myMenu(idx) {
      const menu = document.querySelector('.main-menu')
      const menuList = menu.querySelectorAll('li')
      menuList.forEach((item, index) => {
        if (index === idx) { 
          item.classList.add('on') 
        } else {
          item.classList.remove('on')
        }
      })
    },
    myAside(cont) {
      this._cont = cont
      this.mobileAside()
      window.addEventListener('resize', this.mobileAside, true)
    },
    setSubject(title) {
      this.mobileSubject(title)
      this._title = title
      window.addEventListener('resize', this.mobileSubject, true)
    },
    setBackBtn() {
      const backBtn = window.$('.header-mobile').find('.btn-back')
      const logo = window.$('.header-mobile').find('h1')
      backBtn[0].style.display = 'block'
      logo[0].style.display = 'none'
    },
    mobileAside() {
      if (window.$(window).width() < 1024) {
        setTimeout(() => {
          const title = document.querySelector('.mobile-view-title')
          title.textContent = this._cont
        })
      }
    },
    mobileSubject() {
      if (window.$(window).width() < 1024) {
        setTimeout(() => {
          const headerArea = document.querySelector('.header-logo-area')
          const titleArea = document.createElement('strong')
          titleArea.setAttribute('class', 'mo-subject')
          titleArea.innerText = ''
          titleArea.innerText = this._title
          headerArea.appendChild(titleArea)
        })
      }
    },
    followCall() {
      window.addEventListener('scroll', this.following)
    },
    following() {
      const winH = window.innerHeight
      const floatEl = document.querySelector('.btn-float-area')
      const floatBox = floatEl.querySelector('.float-box')
      const floatTop = floatEl.getBoundingClientRect().top
      if (floatTop <= (winH - 20)) {
        floatBox.classList.remove('fix')
      } else {
        floatBox.classList.add('fix')
      }
    },
    asideBack() {
      const am = document.querySelector('.aside-menu-area')
      am.classList.add('aside-back')
    },
    removeBack() {
      const am = document.querySelector('.aside-menu-area')
      am.classList.remove('aside-back')
    },
    gotoTop() {
      window.scrollTo(0, 0)
    }
  }
}
export default utilites
