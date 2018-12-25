<template>
  <div class="params-panel">
    <div
      v-for="paramsIn in avaliableParamsIns"
      :key="paramsIn"
      class="params-panel__param-in">
      <Row type="flex" align="middle" class="params-panel__param-in-title">
        <Col>
          {{ paramsIns[paramsIn].label }}
        </Col>
        <Col class="params-panel__param-mode">
          <a class="params-panel__param-mode--active" href="">範例</a> | <a href="">模型</a>
        </Col>
      </Row>
      <params-table :params="paramsGroupedByIn[paramsIn]"></params-table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    params: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      paramsIns: {
        header: { label: 'Header' },
        query: { label: 'Query' },
        body: { label: 'Body' },
        path: { label: 'Path' }
      }
    }
  },
  computed: {
    paramsGroupedByIn () {
      return _.groupBy(this.params, 'in')
    },
    avaliableParamsIns () {
      return Object.keys(this.paramsGroupedByIn)
    }
  }
}
</script>

<style lang="scss">
  .params-panel {
    .params-panel__param-in {
      margin-bottom: 10px;
      .params-panel__param-in-title {
        font-size: 18px;
        padding: 10px 0;
      }
    }
    .params-panel__param-mode {
      font-size: 14px;
      line-height: 14px;
      padding: 0 10px;
      a {
        color: #333;
        &.params-panel__param-mode--active {
          color: #007EA7;
        }
      }
    }
  }
</style>

