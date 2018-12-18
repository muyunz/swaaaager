<template>
  <div class="toolbar">
    <Input size="large" placeholder="請填入 swagger.json" v-model="swaggerUrl" @keyup.enter.native="parse"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      swaggerUrl: 'http://10.10.10.68:8081/api-docs/blockchain_backend.json'
    }
  },
  methods: {
    ...mapActions('swagger', ['fetchSwagger']),
    parse () {
      this.fetchSwagger(this.swaggerUrl)
    }
  },
  mounted () {
    this.parse()
  }
}
</script>

<style lang="scss">
  .toolbar {
    padding: 20px;
    background: #393E52;
  }
</style>
