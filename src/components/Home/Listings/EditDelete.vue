<template>
  <div :class="['edit', { edit__top: changePosition }]">
    <img
      class="edit__icon"
      :src="
        changePosition && windowWidth < 768
          ? require(`../../../static/images/ic_edit_white@3x.png`)
          : require(`../../../static/images/ic_edit@3x.png`)
      "
      alt="edit"
      @click="editListing(selectedListing)"
    />
    <img
      class="edit__icon"
      :src="
        changePosition && windowWidth < 768
          ? require(`../../../static/images/ic_delete_white@3x.png`)
          : require(`../../../static/images/ic_delete@3x.png`)
      "
      alt="delete"
      @click="deleteListing(selectedListing.id)"
    />
  </div>
</template>
<script>
//The edit and delete icons are in multiple places but they not always shown (like in the reccomended column)
//With some conditions (by props) I'm able to decide where I want them and when they have to be visible
import axios from "axios"

export default {
  name: "EditDelete",
  props: {
    changePosition: {
      type: Boolean,
      default: false,
    },
    redirect: {
      type: Boolean,
      default: false,
    },
    selectedListing: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth
    },
  },
  methods: {
    async deleteListing(id) {
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY }
        const response = await axios({
          method: "DELETE",
          url: `https://api.intern.d-tt.nl/api/houses/${id}`,
          headers,
        })
        if (!response) console.log("Oops, there was a problem...")
        await this.$store.dispatch("getListings")
        if (this.redirect) this.$router.push({ path: `/` })
      } catch (e) {
        console.log(e)
      }
    },
    async editListing(selectedListing) {
      this.$store.commit("setSelectedListing", selectedListing)
      this.$store.commit("isPatching", true)
      this.$router.push({ path: "new-listing" })
    },
  },
}
</script>

<style lang="scss">
.edit {
  display: flex;

  &__icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }

  &__top {
    position: absolute;
    top: 80px;
    right: 30px;

    @include respond-to("md") {
      position: unset;
    }
  }
}
</style>
