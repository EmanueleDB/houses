<template>
  <form @submit.prevent="createListing()">
    <div class="container">
      <div class="container__background">
        <Back />
        <h1>Create new listing</h1>
        <div class="container__background__new">
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Street</label>
              <input
                v-model="listing.streetName"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>House number</label>
              <input
                v-model="listing.houseNumber"
                class="container__background__new__input"
                style="margin-right: 20px"
                type="text"
              />
            </div>
            <div
              class="container__background__new__row__column"
              style="margin-top: 10px"
            >
              <label>Additional (optional)</label>
              <input
                v-model="listing.numberAddition"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Postal code</label>
              <input
                v-model="listing.zip"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>City</label>
              <input
                v-model="listing.city"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Upload picture(PNG or JPG)</label>
              <label class="container__background__new__row__column__file">
                <input
                  type="file"
                  accept="image/jpg, image/png"
                  @change="uploadImage($event)"
                />
                <img
                  class="container__background__new__row__column__file__icon"
                  src="../../static/images/ic_upload@3x.png"
                  alt="upload-icon"
                />
              </label>
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Price</label>
              <input
                v-model="listing.price"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Size</label>
              <input
                v-model="listing.size"
                class="container__background__new__input"
                style="margin-right: 20px"
                type="text"
              />
            </div>
            <div
              class="container__background__new__row__column"
              style="margin-top: 10px"
            >
              <label>Garage</label>
              <select
                name="garage"
                class="container__background__new__input"
                v-model="listing.hasGarage"
                @change="setGarage($event)"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Bedrooms</label>
              <input
                v-model="listing.bedrooms"
                class="container__background__new__input"
                style="margin-right: 20px"
                type="text"
              />
            </div>
            <div
              class="container__background__new__row__column"
              style="margin-top: 10px"
            >
              <label>Bathrooms</label>
              <input
                v-model="listing.bathrooms"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Construction date</label>
              <input
                v-model="listing.constructionYear"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Description</label>
              <textarea
                v-model="listing.description"
                class="container__background__new__input"
                style="width: 100%; height: calc(100% - 30px); margin-bottom: 30px;"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column"
            style="display: flex; justify-content: flex-end;">
              <button class="container__background__new__row__column__button" type="submit">POST</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Back from "@/views/ListingDetails/Helpers/Back"
export default {
  name: "NewListing",
  components: { Back },
  data() {
    return {
      listing: {},
    }
  },
  methods: {
    setGarage(e) {
      console.log(e.target.value, this.listing.garage)
    },
    uploadImage(e) {
      console.log(e.target.files)
    },
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
