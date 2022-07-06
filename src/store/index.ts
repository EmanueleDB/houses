import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import axios from "axios"
import listings from "@/components/Home/Listings/Listings.vue"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    listings: [],
    selectedListing: {},
    navigationActiveItem: "",
    windowWidth: "",
    patching: false,
    listingToPatch: {},
  },
  getters: {},
  mutations: {
    setListings(state: any, payload: object) {
      state.listings = payload
    },

    setSelectedListing(state: any, payload) {
      state.selectedListing = payload
    },
    setListingToPatch(state: any, payload) {
      state.listingToPatch = payload
    },
    resetSelectedListing(state: any) {
      state.selectedListing = {}
    },
    resetListingToPatch(state: any) {
      state.listingToPatch = {}
    },
    isPatching(state: any, payload) {
      state.patching = payload
    },
    setNavigationActiveItem(state: any, payload: string) {
      state.navigationActiveItem = payload
    },
    setWindowWidth(state: any, payload: number) {
      state.windowWidth = payload
    },
    addNewListing(state: any, payload: object) {
      state.listings.push(payload)
    },
  },
  //I have decided to set the fetch request directly in the store because I would need to access to the list
  //from multiple places
  //Everytime I create or delete a new listing I dispatch this action
  actions: {
    async getListings({ commit, state }) {
      try {
        const headers = { "X-Api-Key": process.env.VUE_APP_APIKEY }
        const response = await axios.get(
          "https://api.intern.d-tt.nl/api/houses",
          { headers }
        )
        commit("setListings", response.data)
      } catch (e) {
        console.log(e)
      }
    },
  },
  modules: {},
})
