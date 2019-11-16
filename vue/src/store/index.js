import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientSize: {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
