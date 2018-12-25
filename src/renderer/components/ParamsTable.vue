<template>
  <div class="params-table">
    <template v-for="(param, paramIndex) in params">
      <div
        @click="expandSchema(param, paramIndex)"
        :key="`param-${paramIndex}`"
        :class="{'params-table__schema': param.schema, 'params-table__param-required': param.required, 'params-table__param-has-expand': getCorrectRef(param)}"
        class="params-table__param">
          <div class="params-table__param-name">{{ param.name }}</div>
          <div class="params-table__param-description">{{ param.description }}</div>
          <div class="params-table__param-type">{{ param.type }}</div>
      </div>
      <div
        class="params-table__expand"
        v-if="getCorrectRef(param) && expands.includes(paramIndex)"
        :key="`schema-${paramIndex}`">
        <div class="params-table__expand-line"></div>
        <div class="params-table__expand-content" v-if="getRef(getCorrectRef(param))">
          <params-table :params="transformProperties(getRef(getCorrectRef(param)).properties)"></params-table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { generateExampleCodeByParam, transformProperties, getCorrectRef } from '@/libs/swagger'

export default {
  name: 'params-table',
  props: {
    params: Array,
    default: () => []
  },
  data () {
    return {
      getCorrectRef,
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
      }
      .params-table__expand-line {
        position: relative;
        width: 10px;
      }
      .params-table__expand-content {
        width: 100%;
        box-shadow: -1px 0px 3px 0px rgba(0, 0, 0, 0.1);
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
      &.params-table__param-required {
        .params-table__param-name {
          color: #EA2117;
        }
      }
      &.params-table__param-has-expand {
        .params-table__param-type {
          color: #247ba0;
          &:after {
            content: '(+)'
          }
        }
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

