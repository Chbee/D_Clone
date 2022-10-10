<template>
  <div class="error-wrap">
    <div class="error-contents">
      <div
        class="error-title"
        v-html="errorTitle"
      />
      <div
        class="error-text"
        v-html="errorText"
      />
      <div class="error-btn">
        <comp-btn
          class-name="primary"
          :btn-name="$t('MAIN_0072')"
          @click="$router.replace('/')"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Error404',
  data() {
    return {
      errorTitle: this.$t('MAIN_0070'),
      errorText: this.$t('MAIN_0071')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@styles/error/error.scss";
</style>