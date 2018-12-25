<template>
  <div class="path-view">
    <div class="path-view__title">
      <method-label :method="$route.params.method"></method-label>
      <div v-html="pathHtml"></div>
    </div>
    <div class="path-view__description" v-html="path.description">
    </div>
    <Row type="flex" align="middle" class="sub-title">
      <Col>
        <h2>參數</h2>
      </Col>
      <div class="flex-spacer"></div>
      <Col>
        <Select v-model="produce" style="width:200px" placeholder="">
          <Option v-for="_produce in path.produces" :value="_produce" :key="_produce">{{ _produce }}</Option>
        </Select>
      </Col>
    </Row>
    <params-panel :params="path.parameters"></params-panel>
    <Row type="flex" align="middle" class="sub-title">
      <Col>
        <h2>回應</h2>
      </Col>
      <div class="flex-spacer"></div>
      <Col>
        <Select v-model="consume" style="width:200px" placeholder="">
          <Option v-for="_consume in path.consumes" :value="_consume" :key="_consume">{{ _consume }}</Option>
        </Select>
      </Col>
    </Row>
    <response-panel :responses="path.responses"></response-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      produce: null,
      consume: null
    }
  },
  computed: {
    ...mapState('swagger', {
      resource: state => state.resource,
      paths: state => state.resource ? state.resource.paths : []
    }),
    path () {
      const path = this.paths[this.$route.params.path][this.$route.params.method]
      if (path) {
        this.produce = path.produces[0] || null
        this.consume = path.consumes[0] || null
      }
      return path
    },
    pathHtml () {
      const re = /\{([^}]+)\}/g
      return this.$route.params.path.replace(re, function($0, $1, $2) {
        return '<a class="path-params">{' + $1 + '}</a>';
      })
    },
  }
}
</script>

<style lang="scss">
  .path-view {
    padding: 25px;
    width: 100%;
    display: flex;
    flex-direction: column;

    & > div {
      flex: 0 0 auto;
    }

    .path-params {
      color: #31C6B3;
    }

    .path-view__title {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      flex: 0 0 auto;
    }
    .path-view__description {
      font-size: 16px;
      padding: 15px 0;
    }
  }
</style>
