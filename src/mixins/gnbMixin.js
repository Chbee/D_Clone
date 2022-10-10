// 상단 GNB메뉴
import { createNamespacedHelpers } from 'vuex'
import { ModuleName } from '@store/common/gnbStore'
 
const gnbStore = createNamespacedHelpers(ModuleName)

const mixin = {
  data() {
    return{
      gnbIdx: 0
    }
  },
  computed: {
    ...gnbStore.mapGetters(['isShowDrawer', 'categoryList', 'gnbOn']),
    categoryDepth1() {
      return this.categoryList.filter(item => item.gnbDepth === 1).sort((a, b) => a.dispSeq - b.dispSeq)
    },
    categoryDepth2() {
      return this.categoryList.filter(item => item.gnbDepth === 2 && item.gnb1 === this.gnbIdx).sort((a, b) => a.dispSeq - b.dispSeq)
    },
    categoryDepth3() {
      return this.categoryList.filter(item => item.gnbDepth === 3 && item.gnb2 === this.gnbIdx).sort((a, b) => a.dispSeq - b.dispSeq)
    },
    categoryDepth4() {
      return this.categoryList.filter(item => item.gnbDepth === 4 && item.gnb3 === this.gnbIdx).sort((a, b) => a.dispSeq - b.dispSeq)
    }
  },
  methods: {
    ...gnbStore.mapActions(['toggleDrawer', 'searchGnbCategoryList', 'hasMenu'])
  }
}

export default mixin
