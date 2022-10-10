// 휴대폰 번호 선택 select
import { regexpCellNo } from '@utils/regexp'
// import commCdMixin from '@mixin/common/commCdMixin'
const mixin = {
  data() {
    return {
      cellNo1: '010',
      cellNo2: '',
      cellNo3: ''
    }
  },
  // mixins: [commCdMixin],
  // created() {
  //   this.getCommCd('4800')
  // },
  computed: {
    cellNoPrefixes() {
      // return this.codelist4800.map(code => { return { name: code.dtlNm, value: code.dtlNm } })
      return [{ name: '010', value: '010' }, { name: '011', value: '011' }, { name: '016', value: '016' }, { name: '017', value: '017' }, { name: '018', value: '018' }, { name: '019', value: '019' }]
    },
    cellNo() {
      if (this.cellNo1 && this.cellNo2 && this.cellNo3) {
        const cellNo = `${this.cellNo1}-${this.cellNo2}-${this.cellNo3}`
        // 휴대폰번호 정규표현식
        if (regexpCellNo.test(cellNo)) {
          return `${this.cellNo1}${this.cellNo2}${this.cellNo3}`
        }
      }
      return ''
    }
  },
  methods: {
    changeSelectPrefix(to, from) {
      this.cellNo1 = to
    },
    onKeyupCellNo2(e) {
      if (this.cellNo2.length >= 4) {
        if (this.cellNo3.length >= 4) {
          this.cellNo2 = this.cellNo2.substring(0, 4)
          return false
        }

        this.cellNo3 = this.cellNo2.substring(4, this.cellNo2.length > 8 ? 8 : this.cellNo2.length)
        this.cellNo2 = this.cellNo2.substring(0, 4)

        // 4자 입력 되었으면 다음 셀로 포커스 이동
        document.getElementById('cellNo3').focus()
      }
    },
    onKeyupCellNo3() {
      if (this.cellNo3.length > 4) {
        // if (this.cellNo2.length >= 4) {
        //   this.cellNo3 = this.cellNo3.substring(0, 4)
        //   return false
        // }
        // this.cellNo2 = this.cellNo2 + this.cellNo3.substring(0, 1)
        this.cellNo3 = this.cellNo3.substring(0, 4)
      }
    },
    setCellNo(cellNo = '') {
      let cellNos = []
      if (cellNo.length === 10) {
        cellNos = cellNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3').split('-')
      }
      if (cellNo.length === 11) {
        cellNos = cellNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3').split('-')
      }

      this.cellNo1 = cellNos[0] || ''
      this.cellNo2 = cellNos[1] || ''
      this.cellNo3 = cellNos[2] || ''
    }
  }
}

export default mixin
