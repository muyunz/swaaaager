<template>
  <div class="response-schema-panel">
    <params-table :params="transformedParams"></params-table>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  props: {
    reference: {
      type: String
    }
  },
  computed: {
    ...mapGetters('swagger', [
      'getRef'
    ]),
    response () {
      return this.getRef(this.reference)
    },
    transformedParams () {
      const { properties } = this.response
      return Object.keys(properties).map(p => ({
        ...properties[p],
        name: p
      }))
    }
  }
}
</script>

<style lang="scss">
  .response-schema-panel {

  }
</style>

