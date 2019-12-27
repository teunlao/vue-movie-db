import Vue from 'vue'
import Vuex from 'vuex'

import { API_KEY_V3 } from '@/config'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: {
      popular: [],
      activeIndex: 0
    }
  },
  getters: {
    activeIndex(state) {
      return state.movies.activeIndex
    },
    moviesPopular(state) {
      return state.movies.popular
    },
    moviesPopularReverse(state) {
      return [...state.movies.popular].reverse()
    }
  },
  mutations: {
    SET_MOVIES_POPULAR(state, payload) {
      this.state.movies.popular = [...this.state.movies.popular, ...payload.results]
    },
    SET_ACTIVE_INDEX(state, payload) {
      this.state.movies.activeIndex = payload
    }
  },
  actions: {
    async GET_MOVIES_POPULAR({ commit }, page) {
      const response = await fetch(`${api.baseURL}${api.movies.popular}?api_key=${API_KEY_V3}&page=${page}`)
      if (response.ok) commit('SET_MOVIES_POPULAR', await response.json())
      else throw Error()
    }
  },
  modules: {
  }
})
