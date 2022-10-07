import { TYPES, ModuleName } from '@store/common/commCdStore'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers(ModuleName)

const commCdMixin = {
  computed: {
    ...mapState({
      [TYPES.CODEGRP_PG00100]: state => state[TYPES.CODEGRP_PG00100],
      [TYPES.CODELIST_PG00100]: state => state[TYPES.CODELIST_PG00100],

      [TYPES.CODEGRP_PG00200]: state => state[TYPES.CODEGRP_PG00200],
      [TYPES.CODELIST_PG00200]: state => state[TYPES.CODELIST_PG00200],

      [TYPES.CODEGRP_PG00300]: state => state[TYPES.CODEGRP_PG00300],
      [TYPES.CODELIST_PG00300]: state => state[TYPES.CODELIST_PG00300],

      [TYPES.CODEGRP_PG00400]: state => state[TYPES.CODEGRP_PG00400],
      [TYPES.CODELIST_PG00400]: state => state[TYPES.CODELIST_PG00400],

      [TYPES.CODEGRP_PG00500]: state => state[TYPES.CODEGRP_PG00500],
      [TYPES.CODELIST_PG00500]: state => state[TYPES.CODELIST_PG00500],

      [TYPES.CODEGRP_PG00600]: state => state[TYPES.CODEGRP_PG00600],
      [TYPES.CODELIST_PG00600]: state => state[TYPES.CODELIST_PG00600],

      [TYPES.CODEGRP_PG00700]: state => state[TYPES.CODEGRP_PG00700],
      [TYPES.CODELIST_PG00700]: state => state[TYPES.CODELIST_PG00700],

      [TYPES.CODEGRP_PG00800]: state => state[TYPES.CODEGRP_PG00800],
      [TYPES.CODELIST_PG00800]: state => state[TYPES.CODELIST_PG00800],

      [TYPES.CODEGRP_PG00900]: state => state[TYPES.CODEGRP_PG00900],
      [TYPES.CODELIST_PG00900]: state => state[TYPES.CODELIST_PG00900],

      [TYPES.CODEGRP_PG01000]: state => state[TYPES.CODEGRP_PG01000],
      [TYPES.CODELIST_PG01000]: state => state[TYPES.CODELIST_PG01000],

      [TYPES.CODEGRP_PG01100]: state => state[TYPES.CODEGRP_PG01100],
      [TYPES.CODELIST_PG01100]: state => state[TYPES.CODELIST_PG01100],

      [TYPES.CODEGRP_PG01200]: state => state[TYPES.CODEGRP_PG01200],
      [TYPES.CODELIST_PG01200]: state => state[TYPES.CODELIST_PG01200],

      [TYPES.CODEGRP_PG01300]: state => state[TYPES.CODEGRP_PG01300],
      [TYPES.CODELIST_PG01300]: state => state[TYPES.CODELIST_PG01300],

      [TYPES.CODEGRP_PG01400]: state => state[TYPES.CODEGRP_PG01400],
      [TYPES.CODELIST_PG01400]: state => state[TYPES.CODELIST_PG01400],

      [TYPES.CODEGRP_PG01500]: state => state[TYPES.CODEGRP_PG01500],
      [TYPES.CODELIST_PG01500]: state => state[TYPES.CODELIST_PG01500],

      [TYPES.CODEGRP_PG01600]: state => state[TYPES.CODEGRP_PG01600],
      [TYPES.CODELIST_PG01600]: state => state[TYPES.CODELIST_PG01600],

      [TYPES.CODEGRP_PG01700]: state => state[TYPES.CODEGRP_PG01700],
      [TYPES.CODELIST_PG01700]: state => state[TYPES.CODELIST_PG01700],

      [TYPES.CODEGRP_PG01800]: state => state[TYPES.CODEGRP_PG01800],
      [TYPES.CODELIST_PG01800]: state => state[TYPES.CODELIST_PG01800],

      [TYPES.CODEGRP_PG01900]: state => state[TYPES.CODEGRP_PG01900],
      [TYPES.CODELIST_PG01900]: state => state[TYPES.CODELIST_PG01900],

      [TYPES.CODEGRP_EB00100]: state => state[TYPES.CODEGRP_EB00100],
      [TYPES.CODELIST_EB00100]: state => state[TYPES.CODELIST_EB00100],

      [TYPES.CODEGRP_RZ00100]: state => state[TYPES.CODEGRP_RZ00100],
      [TYPES.CODELIST_RZ00100]: state => state[TYPES.CODELIST_RZ00100],

      [TYPES.CODEGRP_RZ00200]: state => state[TYPES.CODEGRP_RZ00200],
      [TYPES.CODELIST_RZ00200]: state => state[TYPES.CODELIST_RZ00200],

      [TYPES.CODEGRP_RZ00300]: state => state[TYPES.CODEGRP_RZ00300],
      [TYPES.CODELIST_RZ00300]: state => state[TYPES.CODELIST_RZ00300],

      [TYPES.CODEGRP_RZ00400]: state => state[TYPES.CODEGRP_RZ00400],
      [TYPES.CODELIST_RZ00400]: state => state[TYPES.CODELIST_RZ00400],

      [TYPES.CODEGRP_RZ00500]: state => state[TYPES.CODEGRP_RZ00500],
      [TYPES.CODELIST_RZ00500]: state => state[TYPES.CODELIST_RZ00500],

      [TYPES.CODEGRP_RZ00600]: state => state[TYPES.CODEGRP_RZ00600],
      [TYPES.CODELIST_RZ00600]: state => state[TYPES.CODELIST_RZ00600],

      [TYPES.CODEGRP_RZ00700]: state => state[TYPES.CODEGRP_RZ00700],
      [TYPES.CODELIST_RZ00700]: state => state[TYPES.CODELIST_RZ00700],

      [TYPES.CODEGRP_RZ00800]: state => state[TYPES.CODEGRP_RZ00800],
      [TYPES.CODELIST_RZ00800]: state => state[TYPES.CODELIST_RZ00800],

      [TYPES.CODEGRP_RZ00900]: state => state[TYPES.CODEGRP_RZ00900],
      [TYPES.CODELIST_RZ00900]: state => state[TYPES.CODELIST_RZ00900],

      [TYPES.CODEGRP_RZ01000]: state => state[TYPES.CODEGRP_RZ01000],
      [TYPES.CODELIST_RZ01000]: state => state[TYPES.CODELIST_RZ01000],

      [TYPES.CODEGRP_RZ01100]: state => state[TYPES.CODEGRP_RZ01100],
      [TYPES.CODELIST_RZ01100]: state => state[TYPES.CODELIST_RZ01100],

      [TYPES.CODEGRP_RZ01200]: state => state[TYPES.CODEGRP_RZ01200],
      [TYPES.CODELIST_RZ01200]: state => state[TYPES.CODELIST_RZ01200],

      [TYPES.CODEGRP_RZ01400]: state => state[TYPES.CODEGRP_RZ01400],
      [TYPES.CODELIST_RZ01400]: state => state[TYPES.CODELIST_RZ01400],

      [TYPES.CODEGRP_FAQTYPE]: state => state[TYPES.CODEGRP_FAQTYPE],
      [TYPES.CODELIST_FAQTYPE]: state => state[TYPES.CODELIST_FAQTYPE],

      [TYPES.CODEGRP_1510]: state => state[TYPES.CODEGRP_1510],
      [TYPES.CODELIST_1510]: state => state[TYPES.CODELIST_1510],

      [TYPES.CODEGRP_1520]: state => state[TYPES.CODEGRP_1520],
      [TYPES.CODELIST_1520]: state => state[TYPES.CODELIST_1520],

      [TYPES.CODEGRP_2900]: state => state[TYPES.CODEGRP_2900],
      [TYPES.CODELIST_2900]: state => state[TYPES.CODELIST_2900],

      [TYPES.CODEGRP_4200]: state => state[TYPES.CODEGRP_4200],
      [TYPES.CODELIST_4200]: state => state[TYPES.CODELIST_4200],

      [TYPES.CODEGRP_4700]: state => state[TYPES.CODEGRP_4700],
      [TYPES.CODELIST_4700]: state => state[TYPES.CODELIST_4700],

      [TYPES.CODEGRP_6400]: state => state[TYPES.CODEGRP_6400],
      [TYPES.CODELIST_6400]: state => state[TYPES.CODELIST_6400],

      [TYPES.CODEGRP_6500]: state => state[TYPES.CODEGRP_6500],
      [TYPES.CODELIST_6500]: state => state[TYPES.CODELIST_6500],

      [TYPES.CODEGRP_8100]: state => state[TYPES.CODEGRP_8100],
      [TYPES.CODELIST_8100]: state => state[TYPES.CODELIST_8100],

      [TYPES.CODEGRP_8700]: state => state[TYPES.CODEGRP_8700],
      [TYPES.CODELIST_8700]: state => state[TYPES.CODELIST_8700],

      [TYPES.CODEGRP_9000]: state => state[TYPES.CODEGRP_9000],
      [TYPES.CODELIST_9000]: state => state[TYPES.CODELIST_9000],

      [TYPES.CODEGRP_FS00100]: state => state[TYPES.CODEGRP_FS00100],
      [TYPES.CODELIST_FS00100]: state => state[TYPES.CODELIST_FS00100]

    })
  },
  methods: {
    ...mapActions([
      TYPES.ACT_SELECT_COMM_CD
    ]),
    getCommCd(codeGrp, locale) {
      const codeGrpNm = 'CODELIST_' + codeGrp
      const val = this[TYPES[codeGrpNm]]
      if (val != null && val !== '' && !this.isEmptyArray(val)) return Promise.resolve(val)
      return this[TYPES.ACT_SELECT_COMM_CD]({ mstCd: codeGrp, locale: locale })
    },
    isEmptyArray(val) {
      return Array.isArray(val) && val.length === 0
    }
  }
}

export default commCdMixin
