<template>
  <div class="container__search">
    <img
      class="container__search__icon"
      src="../../../static/images/ic_search@3x.png"
      alt="search icon"
    />
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for a house"
      class="container__search__input-text"
      @input="changeInput($event)"
    />
    <img
      v-if="searchQuery !== ''"
      class="container__search__clear"
      src="../../../static/images/ic_clear@3x.png"
      alt="clear"
      @click="clearSearch()"
    />

    <div class="tab container__search__tab">
      <button
        :class="[
          'container__search__tab__price',
          { active: clicked === 'price' },
        ]"
        @click="setOrder('price')"
      >
        Price
      </button>
      <button
        :class="[
          'container__search__tab__size',
          { active: clicked === 'size' },
        ]"
        @click="setOrder('size')"
      >
        Size
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      clicked: "price",
      searchQuery: "",
    }
  },
  methods: {
    setOrder(value) {
      this.clicked = value
      this.$emit("sort", value)
    },
    changeInput(event) {
      this.$emit("searchQuery", event.target.value)
    },
    clearSearch() {
      this.searchQuery = ''
      this.$emit('searchQuery', '')
    }
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
