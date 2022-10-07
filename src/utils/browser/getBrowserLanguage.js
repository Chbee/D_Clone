const getBrowserLanguage = () => {
  return navigator.language || navigator.userLanguage
}

export default getBrowserLanguage