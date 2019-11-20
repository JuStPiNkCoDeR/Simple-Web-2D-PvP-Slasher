import Vue from 'vue'
import Vuex from 'vuex'
import MutationsType from './MutationsType';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    viewPortSize: {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    }
  },
  mutations: {
    [MutationsType.viewPortChange] (state, size) {
      state.viewPortSize.x = size.x;
      state.viewPortSize.y = size.y;
    }
  },
  actions: {
  },
  modules: {
  }
})
