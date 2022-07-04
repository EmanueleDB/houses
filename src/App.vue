<template>
  <div id="app">
    <Navigation />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation"

export default {
  components: {
    Navigation,
  },
}
</script>

<style lang="scss">
#app {
  .wrapper {
    margin: 0;

    @include respond-to("md") {
      margin: 0 10% 0 10%;
    }
  }
}
</style>
