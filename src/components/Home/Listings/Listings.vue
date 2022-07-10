<template>
  <div class="container__house-list">
    <h3 v-if="searchQuery !== '' && count !== 0" style="margin-top: 0">
      {{ this.count }} results found
    </h3>
    <div
      v-for="listing in availableListings"
      class="container__house-list__house"
      :key="listing.id"
    >
      <div
        class="container__house-list__house__wrapper"
        @click="setRoute(listing)"
      >
        <div class="container__house-list__house__wrapper__container-image">
          <img
            :src="listing.image"
            alt="house-image"
            class="container__house-list__house__wrapper__container-image__image"
          />
        </div>
        <div class="container__house-list__house__wrapper__details">
          <p class="container__house-list__house__wrapper__details__street">
            {{ listing.location.street }}
          </p>
          <p class="container__house-list__house__wrapper__details__price">
            &euro; {{ listing.price }}
          </p>
          <p class="container__house-list__house__wrapper__details__zip">
            {{ listing.location.zip }} {{ listing.location.city }}
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
              {{ listing.rooms.bedrooms }}
            </p>
            <img
              class="container__house-list__house__wrapper__details__rooms__image"
              src="../../../static/images/ic_bath@3x.png"
              alt="baths"
            />
            <p
              class="container__house-list__house__wrapper__details__rooms__specs"
            >
              {{ listing.rooms.bathrooms }}
            </p>
            <img
              class="container__house-list__house__wrapper__details__rooms__image"
              src="../../../static/images/ic_size@3x.png"
              alt="size"
            />
            <p
              class="container__house-list__house__wrapper__details__rooms__specs"
            >
              {{ listing.size }}
            </p>
          </div>
        </div>
      </div>
      <EditDelete
        v-if="showEdit && listing.madeByMe"
        :selected-listing="listing"
      />
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

<script lang="ts">
import axios from "axios"
import Vue from "vue"
import EditDelete from "@/components/Home/EditDelete/EditDelete.vue"

export default Vue.extend({
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
      count: 0,
    }
  },
  computed: {
    listings(this: any) {
      return this.$store.state.listings
    },
    availableListings() {
      if (this.shortList) {
        return this.listings
          .filter(
            (house: { [key: string]: string | number }) =>
              house.id !== this.selectedId
          )
          .splice(0, 3)
      }
      if (this.sortBy === "price") this.$store.commit("setSortedBy", "price")
      else this.$store.commit("setSortedBy", "size")

      if (this.searchQuery === "") return this.listings
      return this.listings?.filter(
        (house: any) =>
          house.location.street?.includes(this.searchQuery) ||
          house.location.city?.includes(this.searchQuery) ||
          house.location.zip.includes(this.searchQuery) ||
          house.price.toString().includes(this.searchQuery) ||
          house.size.toString().includes(this.searchQuery)
      )
    },
  },
  watch: {
    availableListings(to: string) {
      if (to) this.count = to.length
    },
  },
  methods: {
    setRoute(listing: { [key: string]: string | number }) {
      this.$router.push({ path: `/listing/${listing.id}` })
      this.$store.commit("setNavigationActiveItem", "/")
      this.$store.commit("setSelectedListing", listing)
    },
  },
})
</script>

<style lang="scss">
@import "./style.scss";
</style>
