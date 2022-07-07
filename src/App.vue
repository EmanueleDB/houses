<template>
  <div id="app">
    <Navigation />
    <div class="wrapper">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation"

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  watch: {
    windowWidth(to) {
      this.$store.commit("setWindowWidth", to)
    },
  },
  mounted() {
    //When the app load for the first time, I fetch the listings
    this.$store.dispatch("getListings")
    window.addEventListener("resize", this.checkScreenSize)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize)
  },
  methods: {
    checkScreenSize(e) {
      this.windowWidth = e.currentTarget.innerWidth
    },
  },
}
</script>

<style lang="scss">
#app {
  .wrapper {
    margin: 0;

    @include respond-to("md") {
      margin: 55px 10% 0 10%;
    }
  }
}
</style>
