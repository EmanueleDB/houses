import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    houses: [],
  },
  getters: {},
  mutations: {
    fetchHouses(state: any, payload: object) {
      state.houses = payload
    },
  },
  actions: {},
  modules: {},
})
