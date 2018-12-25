<template>
  <div class="path-view">
    <div class="path-view__title">
      <method-label :method="$route.params.method"></method-label>
      <div v-html="pathHtml"></div>
    </div>
    <div class="path-view__description" v-html="path.description">
    </div>
    <h2 class="sub-title">參數</h2>
    <params-panel :params="path.parameters"></params-panel>
    <h2 class="sub-title">回應</h2>
    <response-panel :responses="path.responses"></response-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState('swagger', {
      resource: state => state.resource,
      paths: state => state.resource ? state.resource.paths : []
    }),
    path () {
      return this.paths[this.$route.params.path][this.$route.params.method]
    },
    pathHtml () {
      const re = /\{([^}]+)\}/g
      return this.$route.params.path.replace(re, function($0, $1, $2) {
        return '<a class="path-params">{' + $1 + '}</a>';
      })
    }
  }
}
</script>

<style lang="scss">
  .path-view {
    padding: 25px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .path-params {
      color: #31C6B3;
    }

    .path-view__title {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
    }
    .path-view__description {
      font-size: 16px;
      padding: 15px 0;
    }
  }
</style>
