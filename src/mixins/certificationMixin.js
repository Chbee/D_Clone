// 본인인증
import { TYPES, ModuleName } from '@store/login/certificationStore'
import { createNamespacedHelpers } from 'vuex'

const certificationStore = createNamespacedHelpers(ModuleName)

const mixin = {
  data() {
    return {
      certificationNo: '',
      timer: ''
    }
  },
  computed: {
    ...certificationStore.mapGetters([TYPES.GET_TID, TYPES.GET_IS_CHECKING, TYPES.GET_IS_CHECKED, TYPES.GET_WEB_ID, TYPES.GET_CUSTOMER_NM, TYPES.GET_CERTIFICATION_WAY, TYPES.GET_CERTIFICATION_CELL_NO, TYPES.GET_CERTIFICATION_EMAIL, TYPES.GET_CERTIFICATION_NO, TYPES.GET_CERTIFICATION_TOKEN]),
    // 인증방식
    certificationWays() {
      return [
        {
          id: 'email',
          label: this.$t('MEMBER_0053')
        },
        {
          id: 'phone',
          label: this.$t('MEMBER_0048')
        }
      ]
    },
    validSendEmail() {
      if (this.getIsChecking) {
        return this.email && this.timer && this.timer < '4:55'
      }
      return this.email
    },
    validSendCell7No() {
      if (this.getIsChecking) {
        return this.cellNo && this.timer && this.timer < '4:55'
      }
      return this.cellNo
    }
  },
  methods: {
    // loginStore Action 등록
    ...certificationStore.mapActions([TYPES.SELECT_CERTIFICATION_NO, TYPES.VERIFY_CERTIFICATION_NO, TYPES.INITIALIZE]),
    ...certificationStore.mapMutations([TYPES.SET_IS_CHECKING, TYPES.SET_IS_CHECKED, TYPES.SET_TID]),
    // 인증전송 클릭
    sendCertificationNo({ certificationWay, certificationNo, cellNo, email, webId, customerNm, compareYn, template }) {
      this.certificationNo = ''
      this.error.certificationNo = ''
      this.complete.certificationNo = ''

      // store action methods 호출
      this.selectCertificationNo({ certificationWay, certificationNo, cellNo, email, webId, customerNm, compareYn, template })
        .then(resultCode => {
          if (resultCode === '10') {
            this.certificationTimer()
          }
          if (['20', '21'].includes(resultCode)) {
            this._alert(this.$t('MEMBER_0209'))
          }
        })
    },
    // 인증확인 클릭
    checkCertificationNo() {
      // 인증시간 만료 체크
      if (this.timer === '0:00') {
        this.error.certificationNo = this.$t('MEMBER_0210')
        return false
      }

      this.error.certificationNo = ''
      this.complete.certificationNo = ''

      const param = {}
      param.certificationNo = this.certificationNo

      this.verifyCertificationNo(this.certificationNo)
        .then(resultCode => {
          if (resultCode === '10') {
            this.complete.certificationNo = this.$t('MEMBER_0085')
          } else {
            this.error.certificationNo = this.$t('MEMBER_0084')
          }
        })
    },
    // 인증번호 타이머
    certificationTimer() {
      if (this.getTid) {
        clearInterval(this.getTid)
      }

      let timerSeconds = 300

      const tid = setInterval(() => {
        const min = parseInt(timerSeconds / 60)
        const sec = parseInt(timerSeconds % 60)
        const text = `${min}:${sec < 10 ? '0' + sec : sec}`

        this.timer = text

        timerSeconds--

        // 인증 타이머 종료
        if (timerSeconds < 0) {
          clearInterval(tid)
          this.setIsChecking(false)
        }
      }, 1000)

      this.setTid(tid)
    }
  }
}

export default mixin
