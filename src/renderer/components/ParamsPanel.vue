<template>
  <params-table :params="params"></params-table>
</template>

<script>
export default {
  props: {
    params: {
      type: Array,
      default: () => []
    }
  }
}
</script>
