<template>
  <div id="app">
      <Navigation />
        <router-view :key="$route.path" />
      </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import Vue from "vue"

export default Vue.extend ({
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
    this.$store.dispatch("FETCH_LISTINGS")
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
})
</script>