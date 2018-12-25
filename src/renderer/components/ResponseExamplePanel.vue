<template>
  <div class="response-example-panel">
    <pre style="margin: 0;padding: 0;" v-highlightjs="code"><code class="json"></code></pre>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { generateExampleCodeByParam } from '@/libs/swagger'

export default {
  props: {
    reference: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters('swagger', [
      'getRef'
    ]),
    response () {
      return this.getRef(this.reference)
    },
    code () {
      return generateExampleCodeByParam(this.response)
    }
  }
}
</script>

<style lang="scss">
  .response-example-panel {
    .response-example-panel__code {

    }
  }
</style>

