import axios from 'axios'

const state = {
  url: null,
  root: null,
  parsing: false,
  fetching: false
}

const mutations = {
  SET_URL (state, url) {
    state.url = url
  },
  FETCH_SWAGGER_REQUEST (state) {
    state.fetching = true
  },
  FETCH_SWAGGER_SUCCESS (state, resoucre) {
    state.root = resoucre
    state.fetcing = false
  },
  FETCH_SWAGGER_FAILURE (state) {
    state.fetcing = false
  }
}

const actions = {
  async fetchSwagger ({ commit }, url) {
    commit('SET_URL', url)
    commit('FETCH_SWAGGER_REQUEST')
    const res = await axios.get(url)
    commit('FETCH_SWAGGER_SUCCESS', res.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
