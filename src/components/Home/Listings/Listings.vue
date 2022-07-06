<template>
  <div class="container__house-list">
    <h3 v-if="searchQuery !== '' && count !== 0" style="margin-top: 0">
      {{ this.count }} results found
    </h3>
    <div
      v-for="house in availableHouses"
      class="container__house-list__house"
      :key="house.id"
    >
      <div
        class="container__house-list__house__wrapper"
        @click="setRoute(house.id)"
      >
        <img
          :src="house.image"
          alt="house-image"
          class="container__house-list__house__wrapper__image"
        />
        <div class="container__house-list__house__wrapper__details">
          <p class="container__house-list__house__wrapper__details__street">
            {{ house.location.street }}
          </p>
          <p class="container__house-list__house__wrapper__details__price">
            &euro; {{ house.price }}
          </p>
          <p class="container__house-list__house__wrapper__details__zip">
            {{ house.location.zip }} {{ house.location.city }}
          </p>
          <div class="container__house-list__house__wrapper__details__rooms">
            <img
              class="container__house-list__house__wrapper__details__rooms__image"
              src="../../../static/images/ic_bed@3x.png"
              alt="bed"
            />
            <p
              class="container__house-list__house__wrapper__details__rooms__specs"
            >
              {{ house.rooms.bedrooms }}
            </p>
            <img
              class="container__house-list__house__wrapper__details__rooms__image"
              src="../../../static/images/ic_bath@3x.png"
              alt="baths"
            />
            <p
              class="container__house-list__house__wrapper__details__rooms__specs"
            >
              {{ house.rooms.bathrooms }}
            </p>
            <img
              class="container__house-list__house__wrapper__details__rooms__image"
              src="../../../static/images/ic_size@3x.png"
              alt="size"
            />
            <p
              class="container__house-list__house__wrapper__details__rooms__specs"
            >
              {{ house.size }}
            </p>
          </div>
        </div>
      </div>
      <EditDelete v-if="showEdit && house.madeByMe" :selected-listing="house" />
    </div>
    <div v-if="count === 0" class="container__house-list__not-found">
      <img
        src="../../../static/images/img_empty_houses@3x.png"
        alt="not-found-image"
        class="container__house-list__not-found__image"
      />
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import EditDelete from "./EditDelete"

export default {
  name: "Listings",
  components: {
    EditDelete,
  },
  props: {
    sortBy: {
      type: String,
      default: "price",
    },
    searchQuery: {
      type: String,
      default: "",
    },
    selectedId: {
      type: Number,
      default: null,
    },
    shortList: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      count: null,
    }
  },
  computed: {
    listings: {
      get: function () {
        return this.$store.state.listings
      },
      set: function () {},
    },
    availableHouses() {
      if (this.shortList) {
        return this.listings
          .filter((house) => house.id !== this.selectedId)
          .splice(0, 3)
      }
      if (this.sortBy === "price")
        this.listings = this.listings.sort((a, b) =>
          a.price > b.price ? 1 : -1
        )
      else
        this.listings = this.listings.sort((a, b) => (a.size > b.size ? 1 : -1))
      if (this.searchQuery === "") return this.listings
      return this.listings?.filter(
        (house) =>
          house.location.street?.includes(this.searchQuery) ||
          house.location.city?.includes(this.searchQuery) ||
          house.location.zip.includes(this.searchQuery) ||
          house.price.toString().includes(this.searchQuery) ||
          house.size.toString().includes(this.searchQuery)
      )
    },
  },
  watch: {
    availableHouses(to) {
      if (to) this.count = to.length
    },
  },
  methods: {
    setRoute(id) {
      this.$router.push({ path: `/listing/${id}` })
      this.$store.commit("setNavigationActiveItem", "/")
    },
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
