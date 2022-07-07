<template>
  <div class="container">
    <Back />
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
      <EditDelete
        v-if="selectedListing.madeByMe"
        :change-position="true"
        :selected-listing="selectedListing"
        :redirect="true"
      />
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
//See comment in the NewListing.vue file
//I can show the details of the new listing because the body that is needed to send the POST request of the new listing
// is different from the object of the other houses already present in the API

import Listings from "@/components/Home/Listings/Listings"
import ImageHelper from "./Helpers/IconHelper"
import EditDelete from "@/components/Home/EditDelete/EditDelete"
import Section from "./Helpers/Section"
import Back from "./Helpers/Back"

export default {
  name: "ListingDetails",
  components: {
    Back,
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
    selectedListing() {
      return this.$store.state.selectedListing
    },
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
