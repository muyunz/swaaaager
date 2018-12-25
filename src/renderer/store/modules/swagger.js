import axios from 'axios'
import _ from 'lodash'

const UNKWON_TAG = 'UNKWON'

const state = {
  url: null,
  paths: [],
  definitions: [],
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

    // GroupBy Tags
    Object.keys(resource.paths).forEach(path => {
      Object.keys(resource.paths[path]).forEach(method => {
        const pathMethod = resource.paths[path][method]
        pathMethod.tags && pathMethod.tags.length ? pathMethod.tags.forEach(tag => {
          const pathItem = {
            method,
            path,
            tag: tag,
            index: 0
          }
          if (tags[tag]) {
            const index = tags[tag].paths.length
            pathItem.index = index
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
    state.definitions = resource.definitions
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

const getters = {
  getRef: state => ref => {
    if (ref.startsWith('#/')) {
      const path = ref.substring(2).replace('/', '.')
      return _.get(state.resource, path)
    }
    return null
  },
  tagNames: state => Object.keys(state.tags),
  allPaths: state => _.flatten(Object.keys(state.tags).map(t => state.tags[t].paths))
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
