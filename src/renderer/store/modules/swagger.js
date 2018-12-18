import axios from 'axios'

const UNKWON_TAG = 'UNKWON'

const state = {
  url: null,
  paths: [],
  tags: {
    [UNKWON_TAG]: {
      paths: []
    }
  },
  resource: null,
  parsing: false,
  fetching: false,
  fetched: false
}


const mutations = {
  SET_URL (state, url) {
    state.url = url
  },
  FETCH_SWAGGER_REQUEST (state) {
    state.fetching = true
    state.tags = {
      [UNKWON_TAG]: {
        paths: []
      }
    }
    state.resource = null
  },
  FETCH_SWAGGER_SUCCESS (state, resource) {

    const tags = {}

    Object.keys(resource.paths).forEach(path => {
      Object.keys(resource.paths[path]).forEach(method => {
        const pathMethod = resource.paths[path][method]
        pathMethod.tags && pathMethod.tags.length ? pathMethod.tags.forEach(tag => {
          const pathItem = {
            method,
            path
          }
          if (tags[tag]) {
            tags[tag].paths.push(pathItem)
          } else {
            tags[tag] = { paths: [ pathItem ] }
          }
        }) : tags[UNKWON_TAG].paths.push({
          method,
          path
        })
      })
    })

    state.resource = resource
    state.tags = tags
    state.fetcing = false
    state.fetched = true
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
