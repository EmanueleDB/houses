<template>
  <div class="container">
    <div class="container__back">
      <img
        class="container__back__icon"
        :src="
          windowWidth > 768
            ? require(`../../static/images/ic_back_grey@3x.png`)
            : require(`../../static/images/ic_back_white@3x.png`)
        "
        alt="back"
        @click="$router.push({ path: '/' })"
      />
      <p class="container__back__text">Back to overview</p>
    </div>
    <div class="container__detail">
      <img
        class="container__detail__image"
        :src="selectedListing.image"
        alt="image"
      />
    </div>
    <div class="container__space" />
    <div class="container__reccomended">
      <h3>Reccomended for you</h3>
      <Listings
        :short-list="true"
        :selected-id="selectedListing.id"
        :show-edit="false"
      />
    </div>
    <div class="container__infos">
      <h1 v-if="selectedListing.location">
        {{ selectedListing.location.street }}
      </h1>
      <EditDelete  :change-position="true" />
    </div>
    <div class="container__infos">
      <img
        class="container__infos__icon"
        src="../../static/images/ic_location@3x.png"
        alt="position-icon"
      />
      <p v-if="selectedListing.location">
        {{ selectedListing.location.zip }} {{ selectedListing.location.city }}
      </p>
    </div>
    <div class="container__infos">
      <Section :value="images.first" />
    </div>
    <div class="container__infos">
      <Section :value="images.second" />
    </div>
    <div class="container__infos" style="margin-bottom: 3rem">
      <p class="container__infos__description">
        {{ selectedListing.description }}
      </p>
    </div>
  </div>
</template>

<script>
import Listings from "@/components/Home/Listings/Listings"
import ImageHelper from "./Helpers/IconHelper"
import EditDelete from "@/components/Home/Listings/EditDelete"
import Section from "./Helpers/Section"

export default {
  name: "ListingDetails",
  components: {
    Listings,
    ImageHelper,
    Section,
    EditDelete,
  },
  data() {
    return {
      images: {
        first: [
          {
            property: "price",
            url: "ic_price@3x.png",
            alt: "price-icon",
          },
          {
            property: "size",
            url: "ic_size@3x.png",
            alt: "size-icon",
          },
          {
            property: "constructionYear",
            url: "ic_construction_date@3x.png",
            alt: "year-icon",
          },
        ],
        second: [
          {
            property: "rooms",
            subProperty: "bedrooms",
            url: "ic_bed@3x.png",
            alt: "beds-icon",
          },
          {
            property: "rooms",
            subProperty: "bathrooms",
            url: "ic_bath@3x.png",
            alt: "baths-icon",
          },
          {
            property: "hasGarage",
            url: "ic_garage@3x.png",
            alt: "garage-icon",
          },
        ],
      },
    }
  },
  computed: {
    getHouses() {
      return this.$store.state.houses
    },
    selectedListing() {
      return this.$store.state.selectedListing
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },
  },
  mounted() {
    this.findListing()
  },
  methods: {
    findListing() {
      const listing = this.getHouses.find(
        (house) => house.id.toString() === this.$route.params.id
      )
      this.$store.commit("setSelectedListing", listing)
    },
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
