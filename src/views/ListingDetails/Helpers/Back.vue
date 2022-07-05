<template>
  <div class="back">
    <img
      class="back__icon"
      :src="
        windowWidth > 768
          ? require(`../../../static/images/ic_back_grey@3x.png`)
          : require(`../../../static/images/ic_back_white@3x.png`)
      "
      alt="back"
      @click="$router.push({ path: '/' })"
    />
    <p class="back__text">Back to overview</p>
  </div>
</template>

<script>
export default {
  name: "Back",
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth
    },
  },
}
</script>

<style lang="scss">
.back {
  position: absolute;
  top: 80px;
  left: 30px;

  @include respond-to("md") {
    position: unset;
    margin: 3rem 0 2rem 0;
    grid-column: span 12;
    display: flex;
    font-size: 1rem;
    @include font-montserrat-semiBold;
  }
  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
  }

  &__text {
    display: none;

    @include respond-to("md") {
      display: unset;
    }
  }
}
</style>
