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
    resetListingToPatch(state: any) {
      state.listingToPatch = {}
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
  actions: {
    async FETCH_LISTINGS({ commit, state }) {
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
