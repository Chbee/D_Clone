export const getScrollTopById = id => {
  const element = document.getElementById(id)
  if(!element) return 0

  const webHeadElement = document.querySelector('header .main-menu-area')
  const webHeadHeight = webHeadElement ? webHeadElement.offsetHeight : 0
  const mobileHeadElement = document.querySelector('header .header-mobile')
  const mobileHeadHeight = mobileHeadElement ? mobileHeadElement.offsetHeight : 0
  const menuElement = document.querySelector('.mobile .menu-area.aside-menu-area')
  const menuHeight = menuElement ? menuElement.offsetHeight : 0
  const topHeight = webHeadHeight + mobileHeadHeight + menuHeight

  return window.pageYOffset + element.getBoundingClientRect().top - topHeight
}

export default {
  getScrollTopById
}
