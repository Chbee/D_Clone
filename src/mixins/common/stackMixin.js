// 페이지 이동 처리
import { createNamespacedHelpers } from 'vuex'
import { ModuleName } from '@store/common/navigationStore'
const { mapActions, mapGetters } = createNamespacedHelpers(ModuleName)

const mixins = {
  computed: {
    ...mapGetters(['stack', 'popupStack', 'currentPopup', 'size', 'params'])
  },
  methods: {
    ...mapActions(['__push', '__back', '__pushPopup', '__clear', '__removePopup', '__setParams'])
  }
}
export default mixins