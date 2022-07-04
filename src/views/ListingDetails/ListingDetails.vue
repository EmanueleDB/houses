<template>
  <div class="container">
    <div class="container__detail">
      <div class="container__detail__back">
        <img
          class="container__detail__back__icon"
          src="../../static/images/ic_back_grey@3x.png"
          alt="back"
          @click="$router.push({ path: '/' })"
        />
        <p>Back to overview</p>
      </div>
    </div>
    <div class="container__detail">
      <img class="container__detail__image" :src="listing.image" alt="image" />
      <div class="container__detail__reccomended">
        <h3>Reccomended for you</h3>
        <div class="container__detail__reccomended__wrapper">
          <div v-for="house in getHouses" :key="house.id">
            <div class="container__detail__reccomended__wrapper__specs" v-if="house.id !== listing.id && house.id < 6">
              <img
                class="container__detail__reccomended__wrapper__specs__image"
                :src="house.image"
                alt="house-image"
              />
            </div>
          </div>
        </div>
      </div>
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
    console.log(this.getHouses)
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