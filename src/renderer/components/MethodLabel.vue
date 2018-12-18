<template>
  <!-- <Tag class="method-label" :color="methods[method].color">{{ methods[method].text }}</Tag> -->
  <div class="method-label" :style="{color: methods[method].color}">{{ methods[method].text }}</div>
</template>

<script>
import config from '@/config'
export default {
  props: {
    method: {
      type: String
    }
  },
  data () {
    return {
      methods: config.method
    }
  }
}
</script>

<style lang="scss">
  .method-label {
    display: inline-block;
    padding-right: 15px;
  }
</style>
