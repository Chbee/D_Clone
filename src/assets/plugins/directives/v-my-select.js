const mySelect = {
  bind: (el) => {
    const lists = [...el.querySelectorAll('li')]
    const btns = [...el.querySelectorAll('button')]
    btns.forEach((item) => {
      const callback = () => {
        lists.map(e => e.classList.remove('on'))
        const myLi = item.closest('li')
        myLi.classList.add('on')
      }
      item.callback = callback
      item.addEventListener('click', item.callback)
    })
  },
  unbind: (el) => {
    const btns = [...el.querySelectorAll('button')]
    btns.forEach((item) => {
      item.removeEventListener('click', item.callback)
    })
  }
}

export default mySelect