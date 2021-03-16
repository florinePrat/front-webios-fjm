<template>
  <div
      ref="target"
      id="target"
      class="center">
  </div>
</template>

<script>
/**
 * Page Loader, use on Home, Project, Search.
 */
export default {
  name: 'Loader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    color: '#9b2ed0',
    type: 'gradient',
  }),
  computed: {
    /**
     * Init loader
     *
     * @returns {*}
     */
    loader: function (){
      return this.$vs.loading({
        type: this.type,
        color: this.color,
        scale: 1.1,
      })

    },
  },
  mounted() {
    if (this.loading){
      this.loader
    }
  },
  watch: {

    /**
     * If page is load close loader
     *
     * @param {boolean} isLoading
     */
    loading(isLoading){
      console.info('LOADING STATUS', isLoading)
      if (!isLoading){
        this.loader.close()
      }
    }
  }
}
</script>
<style scoped>
</style>