import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    listings: [],
    selectedListing: {},
    navigationActiveItem: ''
  },
  getters: {},
  mutations: {
    setListings(state: any, payload: object) {
      state.listings = payload
    },
    setSelectedListing(state: any, payload: object) {
      state.selectedListing = payload
    },
    setNavigationActiveItem(state: any, payload: string) {
      state.navigationActiveItem = payload
    },
  },
  actions: {},
  modules: {},
})
