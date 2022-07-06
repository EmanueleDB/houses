<template>
  <form @submit.prevent="createListing()">
    <div class="container">
      <div class="container__background">
        <Back />
        <h1>Create new listing</h1>
        <div class="container__background__new">
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Street name*</label>
              <input
                v-model="newListing.streetName"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>House number*</label>
              <input
                v-model="newListing.houseNumber"
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
                v-model="newListing.numberAddition"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Postal code*</label>
              <input
                v-model="newListing.zip"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>City*</label>
              <input
                v-model="newListing.city"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div
              class="container__background__new__row__column"
              style="display: flex; flex-direction: column"
            >
              <label>Upload picture(PNG or JPG)*</label>
              <img
                v-if="isPatching"
                class="container__background__new__row__column__preview"
                :src="newListing.image"
                alt="image"
              />
              <img
                v-else-if="previewImage"
                class="container__background__new__row__column__preview"
                :src="previewImage"
                alt="image"
              />
              <label
                v-else
                class="container__background__new__row__column__file"
              >
                <input
                  type="file"
                  accept="image/jpg, image/png"
                  style="display: none"
                  @change="getFile($event)"
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
              <label>Price*</label>
              <input
                v-model="newListing.price"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Size*</label>
              <input
                v-model="newListing.size"
                class="container__background__new__input"
                style="margin-right: 20px"
                type="text"
              />
            </div>
            <div
              class="container__background__new__row__column"
              style="margin-top: 10px"
            >
              <label>Garage*</label>
              <select
                name="garage"
                class="container__background__new__input"
                v-model="newListing.hasGarage"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Bedrooms*</label>
              <input
                v-model="newListing.bedrooms"
                class="container__background__new__input"
                style="margin-right: 20px"
                type="text"
              />
            </div>
            <div
              class="container__background__new__row__column"
              style="margin-top: 10px"
            >
              <label>Bathrooms*</label>
              <input
                v-model="newListing.bathrooms"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Construction date*</label>
              <input
                v-model="newListing.constructionYear"
                class="container__background__new__input"
                type="text"
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <label>Description*</label>
              <textarea
                v-model="newListing.description"
                class="container__background__new__input"
                style="
                  width: 100%;
                  height: calc(100% - 30px);
                  margin-bottom: 30px;
                "
              />
            </div>
          </div>
          <div class="container__background__new__row">
            <div class="container__background__new__row__column">
              <span class="container__background__new__row__column__error"
                >Required field missing</span
              >
            </div>
            <div
              class="container__background__new__row__column"
              style="display: flex; justify-content: flex-end"
            >
              <button
                class="container__background__new__row__column__button"
                type="submit"
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Back from "@/views/ListingDetails/Helpers/Back"
import axios from "axios"
export default {
  name: "NewListing",
  components: { Back },
  data() {
    return {
      newListing: {},
      errors: false,
      files: {},
      previewImage: null,
    }
  },
  computed: {
    isPatching() {
      return this.$store.state.patching
    },
  },
  mounted() {
    this.checkIfPatching()
  },
  methods: {
    checkIfPatching() {
      if (this.isPatching) {
        const [street, number] =
          this.$store.state.selectedListing.location.street.split(" ")
        this.newListing = {
          streetName: street,
          houseNumber: number,
          city: this.$store.state.selectedListing.location.city,
          zip: this.$store.state.selectedListing.location.zip,
          ...this.$store.state.selectedListing,
        }
      }
    },

    getFile(e) {
      this.files = e.target.files
      if (!this.files.length) return
      const reader = new FileReader()
      reader.onload = () => {
        this.previewImage = reader.result
      }
      reader.readAsDataURL(this.files[0])
    },

    async uploadImage(file, id) {
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY }
        const data = new FormData()
        data.append("image", file)
        await axios({
          method: "POST",
          url: `https://api.intern.d-tt.nl/api/houses/${id}/upload`,
          data,
          headers,
        })
      } catch (e) {
        console.log(e)
      }
    },

    checkErrors() {
      console.log("xxx")
    },

    //To add a house I need to perform 2 calls, the first one will post the house and with the id given in its response
    //I can perform the second call to upload the image
    async createListing() {
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY }
        const response = await axios({
          method: "POST",
          url: "https://api.intern.d-tt.nl/api/houses",
          data: this.newListing,
          headers,
        })
        if (!response) console.log("Oops, there was a problem...")
        await this.uploadImage(this.files[0], response.data.id)
        await this.$store.dispatch("getListings")
        this.$router.push({ path: `/listing/${response.data.id}` })
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
