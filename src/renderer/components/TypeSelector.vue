<template>
  <Select v-model="model1" style="width:200px">
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>

<script>
export default {
  props: {

  }
}
</script>
