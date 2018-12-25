<template>
  <div class="response-panel">
    <Tabs class="response-panel__tabs" v-model="currentStatusCode">
        <TabPane
          v-for="statusCode in statusCodes"
          :key="statusCode"
          :label="statusCode"
          :name="statusCode"></TabPane>
    </Tabs>
    <div class="response-panel__status-code">
      <Collapse>
        <Panel class="response-panel__introduction" name="introduction" hide-arrow>
          {{ currentResponse.description }}
        </Panel>
        <Panel name="response" v-if="getCorrectRef(currentResponse)">
          範例
          <p slot="content">
            <response-example-panel :reference="getCorrectRef(currentResponse)"></response-example-panel>
          </p>
        </Panel>
        <Panel name="schema">
          屬性
          <p slot="content">
            <response-schema-panel :reference="getCorrectRef(currentResponse)"></response-schema-panel>
          </p>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getCorrectRef } from '@/libs/swagger'
import { mapGetters } from 'vuex'

export default {
  props: {
    responses: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      getCorrectRef,

      currentStatusCode: '200'
    }
  },
  watch: {
    statusCodes () {
      if (this.statusCodes.length) {
        this.currentStatusCode = this.statusCodes[0]
      }
    }
  },
  computed: {
    ...mapGetters('swagger', [
      'getRef'
    ]),
    statusCodes () {
      return Object.keys(this.responses)
    },
    currentResponse () {
      return this.responses[this.currentStatusCode]
    }
  }
}
</script>

<style lang="scss">
  .response-panel {
    .response-panel__introduction {
      .ivu-collapse-header {
        background: #fff;
        border-bottom: 0 !important;
      }
    }
    .response-panel__tabs {
      .ivu-tabs-bar {
        margin-bottom: 0;
        border-bottom :0;
      }
    }
    .response-panel__status-code {
      margin-bottom: 20px;
      .response-panel__status-code-title {
        font-size: 18px;
        padding: 15px 0;
      }
      .ivu-collapse-content {
        padding: 0;
      }
      .ivu-collapse-content-box {
        padding: 0;
      }
    }
  }
</style>

