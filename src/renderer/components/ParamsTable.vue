<template>
  <div class="params-table">
    <template v-for="(param, paramIndex) in params">
      <div
        @click="expandSchema(param, paramIndex)"
        :key="`param-${paramIndex}`"
        :class="{'params-table__schema': param.schema}"
        class="params-table__param">
          <div v-if="param.required" class="params-table__param-required"></div>
          <div class="params-table__param-name">{{ param.name }}</div>
          <div class="params-table__param-description">{{ param.description }}</div>
          <div class="params-table__param-type">{{ param.type }}</div>
      </div>
      <div
        class="params-table__expand"
        v-if="param.schema && expands.includes(paramIndex)"
        :key="`schema-${paramIndex}`">
        <div class="params-table__expand-line"></div>
        <div class="params-table__expand-content" v-if="getRef(param.schema.$ref)">
          <params-table :params="transformProperties(getRef(param.schema.$ref).properties)"></params-table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { generateExampleCodeByParam, transformProperties } from '@/libs/swagger'

export default {
  name: 'params-table',
  props: {
    params: Array,
    default: () => []
  },
  data () {
    return {
      generateExampleCodeByParam,
      transformProperties,

      expands: [],
      cmOptions: {
        tabSize: 2,
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        line: true,
      }
    }
  },
  computed: {
    ...mapGetters('swagger', [
      'getRef'
    ])
  },
  methods: {
    expandSchema (param, paramIndex) {
      const index = this.expands.findIndex(e => e === paramIndex)
      index === -1 ? this.expands.push(paramIndex) : this.expands.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
  .params-table {
    background: none;
    position: relative;
    .params-table__expand {
      position: relative;
      display: flex;
      width: 100%;
      .params-table__param {
        &:before {
          position: absolute;
          top: 50%;
          left: -8px;
          content: '';
          display: block;
          width: 5px;
          height: 1px;
          background: #ccc;
        }
      }
      .params-table__expand-line {
        position: relative;
        width: 30px;
        &:after {
          position: absolute;
          left: 20px;
          content: '';
          display: block;
          width: 1px;
          height: calc(100% - 19px);
          background: #ccc;
        }
      }
      .params-table__expand-content {
        width: 100%;

      }
    }
    & > .params-table__param {
      display: flex;
      position: relative;
      background: #fff;
      border-bottom: 1px solid #ddd;
      &:last-of-type {
        border-bottom: 0;
      }
      &.params-table__schema {
        cursor: pointer;
      }
      .params-table__param-required {
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background: #F7567C;
      }
      .params-table__param-name {
        font-weight: bold;
        width: 31.333333%;
        padding: 10px 15px;
      }

      .params-table__param-description {
        flex: 1;
        padding: 10px 15px;
      }

      .params-table__param-type {
        padding: 10px 15px;
        width: 80px;
      }
    }
  }
</style>

