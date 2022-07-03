<template>
  <div>
    <div class="container">
      <div class="container__top">
        <h1>Houses</h1>
        <div class="container__top__button-container">
          <button
            v-if="windowWidth > 455"
            class="container__top__button-container__button"
          >
            <img
              class="container__top__button-container__button__icon"
              src="../../static/images/ic_plus_white@3x.png"
              alt="plus-icon"
            />
            create new
          </button>
        </div>
      </div>
      <div class="container__search">
        <img
          class="container__search__icon"
          src="../../static/images/ic_search@3x.png"
          alt="search icon"
        />
        <img
          v-if="searchQuery !== ''"
          class="container__search__clear"
          src="../../static/images/ic_clear@3x.png"
          alt="clear"
          @click="searchQuery = ''"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a house"
          class="container__search__input-text"
        />
        <div class="tab container__search__tab">
          <button
            :class="[
              'container__search__tab__price',
              { active: filter === 'price' },
            ]"
            @click="filter = 'price'"
          >
            Price
          </button>
          <button
            :class="[
              'container__search__tab__size',
              { active: filter === 'size' },
            ]"
            @click="filter = 'size'"
          >
            Size
          </button>
        </div>
      </div>
      <Listings :filter="filter" :search-query="searchQuery" />
    </div>
  </div>
</template>

<script>
import Listings from "./Houses/Listings"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    Listings,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      filter: "price",
      searchQuery: "",
      windowWidth: window.innerWidth,
    }
  },
  mounted() {
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
@import 'style';

</style>
