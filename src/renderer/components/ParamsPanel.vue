<template>
  <div class="params-panel">
    <div
      v-for="paramsIn in avaliableParamsIns"
      :key="paramsIn"
      class="params-panel__param-in">
      <div class="params-panel__param-in-title">{{ paramsIns[paramsIn].label }}</div>
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
      margin-bottom: 20px;
      .params-panel__param-in-title {
        font-size: 18px;
        padding: 15px 0;
      }
    }
  }
</style>

