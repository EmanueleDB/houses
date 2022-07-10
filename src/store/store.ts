import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import axios from "axios"
import listings from "@/components/Home/Listings/Listings.vue"
import State from "@/models/state"

Vue.use(Vuex)

const state: State = {
  listings: [],
  selectedListing: {},
  navigationActiveItem: "",
  windowWidth: "",
  patching: false,
  listingToPatch: {},
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters: {},
  mutations: {
    setListings(state: any, payload: []) {
      state.listings = payload
    },

    setSelectedListing(state: any, payload: object) {
      state.selectedListing = payload
    },
    setListingToPatch(state: any, payload: object) {
      state.listingToPatch = payload
    },
    resetSelectedListing(state: any) {
      state.selectedListing = {}
    },
    isPatching(state: any, payload: boolean) {
      state.patching = payload
    },
    setNavigationActiveItem(state: any, payload: string) {
      state.navigationActiveItem = payload
    },
    setWindowWidth(state: any, payload: number) {
      state.windowWidth = payload
    },
    setSortedBy(state: any, payload: string) {
      state.listings = state.listings.sort((a: any, b: any) =>
        a[payload] > b[payload] ? 1 : -1
      )
    },
  },
  //I have decided to set the fetch request directly in the store because I would need to refresh the list from
  //different places
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
