<template>
  <div class="back">
    <img
      class="back__icon"
      :src="
        windowWidth > 768 || changeStyle
          ? require(`../../../static/images/ic_back_grey@3x.png`)
          : require(`../../../static/images/ic_back_white@3x.png`)
      "
      alt="back"
      @click="$router.push({ path: '/' })"
    />
    <p class="back__text">Back to overview</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Back",
  props: {
    changeStyle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    windowWidth(this: any) {
      return this.$store.state.windowWidth
    },
  },
})
</script>

<style lang="scss">
.back {
  position: absolute;
  top: 20px;
  left: 30px;

  @include respond-to("md") {
    position: unset;
    margin: 2rem 0 1rem 0;
    grid-column: span 12;
    display: flex;
    align-items: center;
    font-size: 1rem;
    @include font-montserrat-semiBold;
  }
  &__icon {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    cursor: pointer;
  }

  &__text {
    display: none;

    @include respond-to("md") {
      @include font-montserrat-semiBold;
      font-size: 1rem;
      display: unset;
    }
  }
}
</style>
