<template>
  <div class="main">
    <div 
      v-for="(item, idx) in sectionList" 
      :key="idx"
    >
      <div v-if="!checkIsVideo(item.imgUrl)">
        <comp-img 
          :src="item.imgUrl"
        />
      </div>
      <div v-else>
        <video
          autoplay 
          loop
        >
          <source 
            :src="item.imgUrl" 
            type="video/mp4"
          >
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { fetchSectionListData } from '@/api/main/Main'

export default {
  name: ROUTE.MAIN,
  components: { 
  },
  data() {
    return {
      sectionList: [{}],
      bannerListCode: '6000100'
    }
  },
  computed: {
    ...mapGetters('main/banner', ['getBannerList'])
  },
  created() {
    // this.sectionList = this.getBannerList
  },
  mounted() {
    this.fetchBannersData(this.bannerListCode)
      .then((data) => (this.sectionList = data))
    
    fetchSectionListData(this.bannerListCode)
      .then((_) => (console.log('')))
  },
  methods: {
    ...mapActions('main/banner', ['fetchBannersData']),
    checkIsVideo(data) {
      if (typeof (data) === 'string') {
        return data.includes('mp4') || false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>