const toggle = {
  bind(el, binding, vnode) {
    const btns = el.querySelectorAll('.btn-toggle')
    const action = {
      default() {
        btns.forEach((item, index) => {
          item.handler = (e) => {
            const myLi = item.closest('li')
            const area = myLi.querySelector('.field-area')
            if (
              !e.target.classList.contains('icon-question') && 
              !e.target.classList.contains('close')
              // !e.target.closest('li').classList.contains('complete')
            ) {
              if (item.classList.contains('on')) {
                area.style.display = 'none'
                item.classList.remove('on')
              } else {
                area.style.display = 'block'
                item.classList.add('on')
              }
            }
          }
          item.addEventListener('click', item.handler)
        })
      },
      all() {
        const getSiblings = node => [...node.parentNode.children].filter(c => c !== node)
        btns.forEach((item, index) => {
          item.handler = (e) => {
            const myLi = item.closest('li')
            const area = myLi.querySelector('.field-area')
            const otherLi = getSiblings(myLi)
            if (
              !e.target.classList.contains('icon-question') && 
              !e.target.classList.contains('close')
              // !e.target.closest('li').classList.contains('complete')
            ) {
              if (item.classList.contains('on')) {
                area.style.display = 'none'
                item.classList.remove('on')
              } else {
                area.style.display = 'block'
                item.classList.add('on')
                otherLi.forEach((li, idx) => {
                  li.querySelector('.btn-toggle').classList.remove('on')
                  li.querySelector('.field-area').style.display = 'none'
                })
              }
            }
          }
          item.addEventListener('click', item.handler)
        })
      }
    }
    if (binding.value === 'all') {
      action.all()
    } else {
      action.default()
    }
  },
  // 나의 문의내역 : 답변창 페이징시 이전페이지 열린목록 그대로 노출 이슈 관련 추가(2022.02.24 kim.yoonho)
  componentUpdated(el, binding, vnode, oldVnode) {
    const btns = el.querySelectorAll('.btn-toggle')
    btns.forEach((item, index) => {
      const myLi = item.closest('li')
      const area = myLi.querySelector('.field-area')
      area.style.display = 'none'
      item.classList.remove('on')
    })
  },
  unbind(el) {
    const btns = el.querySelectorAll('.btn-toggle')
    btns.forEach((item, index) => {
      item.removeEventListener('click', item.handler)
    })
  }
}

export default toggle