<template>
    <div class="background">
  <form @submit.prevent="createListing()">
      <div class="new-listing">
        <div class="new-listing__title">
          <Back :change-style="true" />
          <h1 style="margin-top: 1rem">
            {{ isPatching ? "Edit listing" : "Create new listing" }}
          </h1>
        </div>

        <div class="form">
          <div class="form__inputs">
            <label class="form__inputs__label">Street name*</label>
            <input
              v-model="newListing.streetName"
              class="form__inputs__input"
              type="text"
              placeholder="Enter the street name"
            />
          </div>
          <div class="form__inputs form__inputs__double">
            <div class="form__inputs__set" style="margin-right: 5px">
              <label class="form__inputs__label">House number*</label>
              <input
                v-model="newListing.houseNumber"
                class="form__inputs__input"
                type="number"
                placeholder="Enter house number"
              />
            </div>
            <div class="form__inputs__set" style="margin-left: 5px">
              <label class="form__inputs__label">Additional (optional)*</label>
              <input
                v-model="newListing.numberAddition"
                class="form__inputs__input"
                type="number"
                placeholder="e.g. A"
              />
            </div>
          </div>
          <div class="form__inputs">
            <label class="form__inputs__label">Postal code*</label>
            <input
              v-model="newListing.zip"
              ref="zip"
              :class="[
                'form__inputs__input',
                {
                  form__inputs__input__error: errors.includes('zip'),
                },
              ]"
              type="text"
              placeholder="e.g. 1000 AA"
              @input="errorHelper($event, 'zip')"
            />
          </div>
          <div class="form__inputs">
            <label class="form__inputs__label">City*</label>
            <input
              v-model="newListing.city"
              ref="city"
              :class="[
                'form__inputs__input',
                {
                  form__inputs__input__error: errors.includes('city'),
                },
              ]"
              type="text"
              placeholder="e.g. Utrecht"
              @input="errorHelper($event, 'city')"
            />
          </div>
          <div class="form__inputs" style="position: relative">
            <img
              v-if="previewImage || listingToPatch.image"
              class="form__inputs__file__delete-image"
              src="../../static/images/ic_clear_white@3x.png"
              alt="upload-icon"
              @click="deleteImage()"
            />

            <label class="form__inputs__label"
              >Upload picture(PNG or JPG)*</label
            >
            <img
              v-if="isPatching && newListing.image"
              class="form__inputs__preview"
              :src="newListing.image"
              alt="image"
            />
            <img
              v-else-if="previewImage"
              class="form__inputs__preview"
              :src="previewImage"
              alt="image"
            />
            <label v-else class="form__inputs__file">
              <input
                type="file"
                accept="image/jpg, image/png"
                style="display: none"
                @change="getFile($event)"
              />
              <img
                class="form__inputs__file__icon"
                src="../../static/images/ic_upload@3x.png"
                alt="upload-icon"
              />
            </label>
          </div>
          <div class="form__inputs">
            <label class="form__inputs__label">Price*</label>
            <input
              v-model="newListing.price"
              ref="price"
              :class="[
                'form__inputs__input',
                {
                  form__inputs__input__error: errors.includes('price'),
                },
              ]"
              type="number"
              placeholder="e.g. € 150000"
              @input="errorHelper($event, 'price')"
            />
          </div>

          <div class="form__inputs form__inputs__double">
            <div class="form__inputs__set" style="margin-right: 5px">
              <label class="form__inputs__label">Size*</label>
              <input
                v-model="newListing.size"
                ref="size"
                :class="[
                  'form__inputs__input',
                  {
                    form__inputs__input__error: errors.includes('size'),
                  },
                ]"
                type="text"
                placeholder="e.g. 60mq"
                @input="errorHelper($event, 'size')"
              />
            </div>
            <div class="form__inputs__set" style="margin-left: 5px">
              <label class="form__inputs__label">Garage*</label>
              <select
                name="garage"
                class="form__inputs__select"
                style="width: 100%"
                v-model="newListing.hasGarage"
              >
                <option value="" disabled selected hidden>Select</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div class="form__inputs form__inputs__double">
            <div class="form__inputs__set" style="margin-right: 5px">
              <label class="form__inputs__label">Bedrooms*</label>
              <input
                v-model="newListing.bedrooms"
                ref="bedrooms"
                :class="[
                  'form__inputs__input',
                  {
                    form__inputs__input__error: errors.includes('bedrooms'),
                  },
                ]"
                type="number"
                placeholder="Enter amount"
                @input="errorHelper($event, 'bedrooms')"
              />
            </div>
            <div class="form__inputs__set" style="margin-left: 5px">
              <label class="form__inputs__label">Bathrooms*</label>
              <input
                v-model="newListing.bathrooms"
                ref="bathrooms"
                :class="[
                  'form__inputs__input',
                  {
                    form__inputs__input__error: errors.includes('bathrooms'),
                  },
                ]"
                type="number"
                placeholder="Enter amount"
                @input="errorHelper($event, 'bathrooms')"
              />
            </div>
          </div>
          <div class="form__inputs">
            <label class="form__inputs__label">Construction date*</label>
            <input
              v-model="newListing.constructionYear"
              class="form__inputs__input"
              type="text"
              placeholder="e.g 1980"
            />
          </div>
          <div class="form__inputs">
            <label class="form__inputs__label">Description*</label>
            <div
              :class="[
                'form__inputs__text-area-wrapper',
                {
                  'form__inputs__text-area-wrapper__error':
                    errors.includes('description'),
                },
              ]"
              ref="description"
            >
              <textarea
                v-model="newListing.description"
                :class="[
                  'form__inputs__text-area-wrapper__textarea',
                  {
                    'form__inputs__text-area-wrapper__textarea__error':
                      errors.includes('description'),
                  },
                ]"
                placeholder="Enter description"
                @input="errorHelper($event, 'description')"
              />
            </div>
          </div>
          <span v-if="errors.length" class="form__error-message"
            >Required field missing</span
          >
          <button
            :disabled="errors.length > 0"
            class="form__button"
            type="submit"
          >
            {{ isPatching ? "SAVE" : "POST" }}
          </button>
        </div>
      </div>
  </form>
    </div>
</template>

<script lang="ts">
import Back from "@/views/ListingDetails/Helpers/Back.vue"
import axios from "axios"
import Vue from "vue"
import State from "@/models/state"
import ListingToDB from "@/models/listingToDB"
import ListingFromDB from "@/models/listingFromDB"

interface Data {
  newListing: ListingToDB
  errors: string[]
  files: any
  previewImage: string | null | ArrayBuffer
}
export default Vue.extend({
  name: "NewListing",
  components: { Back },
  data(): Data {
    return {
      newListing: { hasGarage: "" } as unknown as ListingToDB,
      errors: [],
      files: {},
      previewImage: null,
    }
  },
  computed: {
    isPatching(): State {
      return this.$store.state.patching
    },
    listingToPatch(): ListingFromDB {
      return this.$store.state.listingToPatch
    },
  },
  mounted() {
    if (this.isPatching) this.adaptSchema()
    else this.$store.commit("resetListingToPatch")
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
        zip: this.listingToPatch.location.zip,
        city: this.listingToPatch.location.city,
        constructionYear: this.listingToPatch.constructionYear,
        hasGarage: this.listingToPatch.hasGarage,
        description: this.listingToPatch.description,
        image: this.listingToPatch.image,
      }
    },

    errorHelper(e: any, property: string) {
      if (e.target.value)
        this.errors = this.errors.filter((error) => error !== property)
      else this.errors.push(property)
    },

    checkErrors(missingRequiredFields: []) {
      this.errors = []
      missingRequiredFields.map((field) => {
        this.errors.push(field)
      })
    },

    async createListing() {
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
        if (this.isPatching) {
          this.patchingActions()
        } else {
          this.creatingActions(response.data.id)
        }
      } catch (e: any) {
        this.checkErrors(e.response.data.data)
      }
    },

    getFile(e: any) {
      this.files = e.target.files
      if (this.files.length === 0) return
      else {
        const reader = new FileReader()
        reader.onload = () => {
          this.previewImage = reader.result
        }
        reader.readAsDataURL(this.files[0])
      }
    },

    async uploadImage(file: string | Blob, id: string) {
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

    async deleteImage() {
      if (this.isPatching) {
        this.newListing.image = ""
        this.listingToPatch.image = ""
      }
      this.previewImage = null
    },

    async patchingActions() {
      await this.uploadImage(this.files[0], this.listingToPatch.id)
      await this.$store.commit("setSelectedListing", this.listingToPatch)
      await this.$store.dispatch("FETCH_LISTINGS")
      await this.$router.push({
        path: `/`,
      })
    },

    async creatingActions(id: string) {
      await this.uploadImage(this.files[0], id)
      await this.$store.dispatch("FETCH_LISTINGS")
      const found = this.$store.state.listings.filter(
        (listing: { [key: string]: string }) => listing.id === id
      )
      await this.$store.commit("setSelectedListing", found[0])
      await this.$router.push({ path: `/listing/${id}` })
    },
  },
})
</script>

<style lang="scss">
@import "./style.scss";
</style>
