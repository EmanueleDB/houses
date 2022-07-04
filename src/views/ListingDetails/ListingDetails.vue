<template>
  <div class="container">
    <div class="container__top">
      <div class="container__top__back">
        <img
          class="container__top__back__icon"
          src="../../static/images/ic_back_grey@3x.png"
          alt="back"
          @click="$router.push({path: '/' })"
        />
        <p>Back to overview</p>
      </div>
    </div>
    <div class="container__top">
      <img :src="listing.image" alt="image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ListingDetails",
  data() {
    return {
      listing: {},
    }
  },
  computed: {
    getHouses() {
      return this.$store.state.houses
    },
  },
  mounted() {
    this.findListing()
  },
  methods: {
    findListing() {
      this.listing = this.getHouses.find(
        (house) => house.id.toString() === this.$route.params.id
      )
    },
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
