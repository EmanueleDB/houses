<template>
  <div class="container__house-list">
    <div
      v-for="house in availableHouses"
      class="container__house-list__house"
      :key="house.id"
    >
      <img
        :src="house.image"
        alt="house-image"
        class="container__house-list__house__image"
      />
      <div class="container__house-list__house__details">
        <p class="container__house-list__house__details__street">
          {{ house.location.street }}
        </p>
        <p class="container__house-list__house__details__price">
          &euro; {{ house.price }}
        </p>
        <p class="container__house-list__house__details__zip">
          {{ house.location.zip }} {{ house.location.city }}
        </p>
        <div class="container__house-list__house__details__rooms">
          <img
            class="container__house-list__house__details__rooms__image"
            src="../../../static/images/ic_bed@3x.png"
            alt="bed"
          />
          <p class="container__house-list__house__details__rooms__specs">
            {{ house.rooms.bedrooms }}
          </p>
          <img
            class="container__house-list__house__details__rooms__image"
            src="../../../static/images/ic_bath@3x.png"
            alt="baths"
          />
          <p class="container__house-list__house__details__rooms__specs">
            {{ house.rooms.bathrooms }}
          </p>
          <img
            class="container__house-list__house__details__rooms__image"
            src="../../../static/images/ic_size@3x.png"
            alt="size"
          />
          <p class="container__house-list__house__details__rooms__specs">
            {{ house.size }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Listings",
  props: {
    filter: {
      type: String,
      required: true,
    },
    searchQuery: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      houses: [],
    }
  },
  computed: {
    availableHouses() {
      if (this.searchQuery === "") return this.houses
      return this.houses?.filter((house) =>
        house.location.street?.includes(this.searchQuery)
      )
    },
  },
  mounted() {
    this.getHouses()
  },
  methods: {
    async getHouses() {
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY }
        const response = await axios.get(
          "https://api.intern.d-tt.nl/api/houses",
          { headers }
        )
        this.houses = response.data
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
