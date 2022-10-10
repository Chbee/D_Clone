// 이메일 입력 폼
import { regexpEmail } from '@utils/regexp'

const mixin = {
  data() {
    return {
      email1: '',
      email2: '',
      emailDomain: '',
      isSelectEmailDomain: false // 이메일 도메인 선택여부
    }
  },
  computed: {
    emailDomains() {
      return [
        { name: this.$t('MEMBER_0054'), value: 'none' }, // 직접입력
        { name: 'gmail.com', value: 'gmail.com' },
        { name: 'naver.com', value: 'naver.com' },
        { name: 'hanmail.net', value: 'hanmail.net' },
        { name: 'nate.com', value: 'nate.com' }
      ]
    },
    email() {
      if (this.email1 && this.email2) {
        const email = `${this.email1.trim()}@${this.email2.trim()}`
        // 이메일 정규표현식 체크
        if (regexpEmail.test(email)) {
          return email
        }
      }
      return ''
    }
  },
  methods: {
    // 이메일 도메인 select에 따른 disable처리 및 값매핑
    changeSelectEmailDomain(to, from) {
      if (to === 'none') {
        this.email2 = ''
        this.isSelectEmailDomain = false
      } else {
        this.email2 = to
        this.isSelectEmailDomain = true
      }

      if (!this.email) {
        this.error.email = this.message.MEMBER_0082
      } else {
        this.error.email = ''
      }
    },
    setEmail(email = '') {
      const emails = email.split('@')
      this.email1 = emails[0] || ''
      this.email2 = emails[1] || ''
    }
  }
}

export default mixin
