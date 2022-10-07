const regexpId = /^(?=.*[A-Za-z])[a-zA-Z]{6,12}$|^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
const regexpPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_=+:;,./|?<>{}'\-"[\]\\])[A-Za-z\d`~!@#$%^&*()_=+:;,./|?<>{}'\-"[\]\\]{10,14}$/
const regexpCellNo = /^\d{3}-\d{3,4}-\d{4}$/
const regexpEmail = /^[a-zA-Z0-9_+.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,10}$/
const regexpBirthday = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

export {
  regexpId,
  regexpPwd,
  regexpCellNo,
  regexpEmail,
  regexpBirthday
}