<template>
  <div>
    <div class="container">
      <div class="container__top">
        <h1>Houses</h1>
        <div class="container__top__button-container">
          <button
            v-if="windowWidth > 768"
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
      <Search @sort="getFilter" @searchQuery="getInput" />
      <Listings :sort-by="sort" :search-query="searchQuery" :show-edit="true" />
    </div>
  </div>
</template>

<script>
import Listings from "./Listings/Listings"
import Search from "./Search/Search"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    Listings,
    Search,
  },
  data() {
    return {
      searchQuery: "",
      sort: "price",
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth
    },
  },
  methods: {
    getFilter(value) {
      this.sort = value
    },
    getInput(value) {
      this.searchQuery = value
    },
  },
}
</script>

<style lang="scss">
@import "style";
</style>
