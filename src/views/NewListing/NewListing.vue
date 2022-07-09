<template>
  <form @submit.prevent="createListing()">
    <div class="background">
      <div class="gradient">
        <div class="container">
          <div class="container__title">
            <Back :change-style="true" />
            <h1 style="margin-top: 1rem">
              {{ isPatching ? "Edit listing" : "Create new listing" }}
            </h1>
          </div>

          <div class="form">
            <div class="form__box">
              <div class="form__box__inputs">
                <label class="form__box__inputs__label">Street name*</label>
                <input
                  v-model="newListing.streetName"
                  class="form__box__inputs__input"
                  type="text"
                  placeholder="Enter the street name"
                />
              </div>
              <div class="form__box__inputs__double">
                <label class="form__box__inputs__label">House number*</label>
                <input
                  v-model="newListing.houseNumber"
                  class="form__box__inputs__input"
                  type="number"
                  placeholder="Enter house number"
                />
              </div>
              <div class="form__box__inputs__double">
                <label class="form__box__inputs__label"
                  >Additional (optional)*</label
                >
                <input
                  v-model="newListing.numberAddition"
                  class="form__box__inputs__input"
                  type="number"
                  placeholder="e.g. A"
                />
              </div>
              <div class="form__box__inputs">
                <label class="form__box__inputs__label">Postal code*</label>
                <input
                  v-model="newListing.zip"
                  ref="zip"
                  :class="[
                    'form__box__inputs__input',
                    {
                      form__box__inputs__input__error: errors.includes('zip'),
                    },
                  ]"
                  type="text"
                  placeholder="e.g. 1000 AA"
                  @input="errorHelper($event, 'zip')"
                />
              </div>
              <div class="form__box__inputs">
                <label class="form__box__inputs__label">City*</label>
                <input
                  v-model="newListing.city"
                  ref="city"
                  :class="[
                    'form__box__inputs__input',
                    {
                      form__box__inputs__input__error: errors.includes('city'),
                    },
                  ]"
                  type="text"
                  placeholder="e.g. Utrecht"
                  @input="errorHelper($event, 'city')"
                />
              </div>
              <div class="form__box__inputs">
                <label class="form__box__inputs__label"
                  >Upload picture(PNG or JPG)*</label
                >
                <img
                  v-if="isPatching"
                  class="form__box__inputs__preview"
                  :src="newListing.image"
                  alt="image"
                />
                <img
                  v-else-if="previewImage"
                  class="form__box__inputs__preview"
                  :src="previewImage"
                  alt="image"
                />
                <label v-else class="form__box__inputs__file">
                  <input
                    type="file"
                    accept="image/jpg, image/png"
                    style="display: none"
                    @change="getFile($event)"
                  />
                  <img
                    class="form__box__inputs__file__icon"
                    src="../../static/images/ic_upload@3x.png"
                    alt="upload-icon"
                  />
                </label>
              </div>
              <div class="form__box__inputs">
                <label class="form__box__inputs__label">Price*</label>
                <input
                  v-model="newListing.price"
                  ref="price"
                  :class="[
                    'form__box__inputs__input',
                    {
                      form__box__inputs__input__error: errors.includes('price'),
                    },
                  ]"
                  type="number"
                  placeholder="e.g. € 150000"
                  @input="errorHelper($event, 'price')"
                />
              </div>
              <div class="form__box__inputs__double">
                <label class="form__box__inputs__label">Size*</label>
                <input
                  v-model="newListing.size"
                  ref="size"
                  :class="[
                    'form__box__inputs__input',
                    {
                      form__box__inputs__input__error: errors.includes('size'),
                    },
                  ]"
                  type="text"
                  placeholder="e.g. 60mq"
                  @input="errorHelper($event, 'size')"
                />
              </div>
              <div class="form__box__inputs__double" style="width: 50%">
                <label class="form__box__inputs__label">Garage*</label>
                <select
                  name="garage"
                  class="form__box__inputs__select"
                  style="width: 100%"
                  v-model="newListing.hasGarage"
                >
                  <option value="" disabled selected hidden>Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div class="form__box__inputs__double">
                <label class="form__box__inputs__label">Bedrooms*</label>
                <input
                  v-model="newListing.bedrooms"
                  ref="bedrooms"
                  :class="[
                    'form__box__inputs__input',
                    {
                      form__box__inputs__input__error:
                        errors.includes('bedrooms'),
                    },
                  ]"
                  type="number"
                  placeholder="Enter amount"
                  @input="errorHelper($event, 'bedrooms')"
                />
              </div>
              <div class="form__box__inputs__double">
                <label class="form__box__inputs__label">Bathrooms*</label>
                <input
                  v-model="newListing.bathrooms"
                  ref="bathrooms"
                  :class="[
                    'form__box__inputs__input',
                    {
                      form__box__inputs__input__error:
                        errors.includes('bathrooms'),
                    },
                  ]"
                  type="number"
                  placeholder="Enter amount"
                  @input="errorHelper($event, 'bathrooms')"
                />
              </div>
              <div class="form__box__inputs">
                <label class="form__box__inputs__label"
                  >Construction date*</label
                >
                <input
                  v-model="newListing.constructionYear"
                  class="form__box__inputs__input"
                  type="text"
                  placeholder="e.g 1980"
                />
              </div>
              <div class="form__box__inputs">
                <label class="form__box__inputs__label">Description*</label>
                <div
                  class="form__box__inputs__text-area-wrapper"
                  ref="description"
                >
                  <textarea
                    v-model="newListing.description"
                    :class="[
                      'form__box__inputs__text-area-wrapper__textarea',
                      {
                        'form__box__inputs__text-area-wrapper__textarea__error':
                          errors.includes('bathrooms'),
                      },
                    ]"
                    placeholder="Enter description"
                    @input="errorHelper($event, 'description')"
                  />
                </div>
              </div>
              <span v-if="errors.length" class="form__box__error-message"
                >Required field missing</span
              >
              <div class="form__box__inputs">
                <button
                  :disabled="!errors.length === 0"
                  class="form__box__inputs__button"
                  type="submit"
                >
                  {{ isPatching ? "SAVE" : "POST" }}
                </button>
              </div>
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
      newListing: { hasGarage: "" },
      errors: [],
      files: {},
      previewImage: null,
    }
  },
  computed: {
    isPatching() {
      return this.$store.state.patching
    },
    listingToPatch() {
      return this.$store.state.listingToPatch
    },
  },
  mounted() {
    if (this.isPatching) this.adaptSchema()
  },
  methods: {
    adaptSchema() {
      const [street, number] = this.listingToPatch.location.street.split(" ")
      this.newListing = {
        streetName: street,
        houseNumber: number,
        price: this.listingToPatch.price,
        bedrooms: this.listingToPatch.rooms.bedrooms,
        bathrooms: this.listingToPatch.rooms.bathrooms,
        size: this.listingToPatch.size,
        streetName: street,
        houseNumber: number,
        zip: this.listingToPatch.location.zip,
        city: this.listingToPatch.location.city,
        constructionYear: this.listingToPatch.constructionYear,
        hasGarage: this.listingToPatch.hasGarage,
        description: this.listingToPatch.description,
        image: this.listingToPatch.image,
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

    errorHelper(e, property) {
      if (!e.target.value) {
        this.errors.push(property)
        this.$refs[property].style.border = "1px solid #EB5440"
      }
      this.errors = this.errors.filter((error) => error !== property)
      this.$refs[property].style.border = "unset"
    },

    checkErrors() {
        this.errors = []
      const requiredInputs = [
        "price",
        "bedrooms",
        "bathrooms",
        "size",
        "zip",
        "city",
        "description",
      ]
      requiredInputs.map((key) => {
        if (!this.newListing[key]) {
          this.$refs[key].style.border = "1px solid #EB5440"
          this.errors.push(key)
          console.log(this.errors)
        } else {
          this.errors = this.errors.filter((error) => error !== key)
          console.log(this.errors)
          this.$refs[key].style.border = "unset"
        }
      })
    },

    //To add a house I need to perform 2 calls, the first one will post the house and with the id given in its response
    //I can perform the second call to upload the image
    async createListing() {
      this.checkErrors()
      if (this.errors.length) return
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY }
        const response = await axios({
          method: "POST",
          url: this.isPatching
            ? `https://api.intern.d-tt.nl/api/houses/${this.listingToPatch.id}`
            : "https://api.intern.d-tt.nl/api/houses",
          data: this.newListing,
          headers,
        })
        //Edit
        if (this.isPatching) {
          await this.$store.commit("setSelectedListing", this.listingToPatch)
          await this.$store.dispatch("getListings")
          await this.$router.push({
            path: `/`,
          })
        } else {
          //uploading the image based on the id
          await this.uploadImage(this.files[0], response.data.id)
          await this.$store.dispatch("getListings")
          const found = this.$store.state.listings.filter(
            (listing) => listing.id === response.data.id
          )
          await this.$store.commit("setSelectedListing", found[0])
          //redirecting to the created/edited listing page
          await this.$router.push({ path: `/listing/${response.data.id}` })
        }
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
