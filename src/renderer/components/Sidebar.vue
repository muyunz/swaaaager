<template>
  <div hide-trigger class="api-sidebar">
    <Menu width="300px">
      <Submenu :name="tag" v-for="(tag, tagIndex) in Object.keys(tags)" :key="tagIndex">
        <template slot="title">
          {{ tag }}
        </template>
        <MenuItem
          class="api-menu"
          v-for="(pathMethod, pathMethodIndex) in tags[tag].paths"
          :style="{ paddingLeft: '15px' }"
          :key="pathMethodIndex"
          :name="`${tag}-${pathMethodIndex}`">
          <router-link :to="{ name: 'path', params: { path: pathMethod.path, method: pathMethod.method } }" class="api-menu__item">
            <Tooltip :content="pathMethod.method.toUpperCase()" placement="top">
              <div class="api-menu__item-dot" :style="{background: method[pathMethod.method].color}"></div>
            </Tooltip>
            <div class="api-menu__item-info">
              <div class="api-menu__item-path">{{ pathMethod.path }}</div>
              <div class="api-menu__item-summary">{{ paths[pathMethod.path][pathMethod.method].summary }}</div>
            </div>
          </router-link>
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ApiPath from "@/components/ApiPath"
import config from '@/config'
export default {
  components: {
    ApiPath
  },
  data() {
    return {
      show: true,
      method: config.method
    };
  },
  computed: {
    ...mapState("swagger", {
      tags: state => state.tags,
      paths: state => state.resource.paths
    })
  }
};
</script>

<style lang="scss">
.api-sidebar {
  min-width: 300px;
  overflow-y: auto;
  background: #ffffff;

  .ivu-menu-vertical.ivu-menu-light:after {
    background: none;
  }

  .api-menu {
    padding-left: 0px;
    .api-menu__item {
      display: flex;
      align-items: center;
      .api-menu__item-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #333;
        margin: 15px;
      }
      .api-menu__item-path {
        color: #333;
        font-weight: bold;
      }
      .api-menu__item-summary {
        color: #666;
      }
    }
  }

  /* 隱藏右側 Icon */
  .ivu-menu-submenu-title-icon {
    display: none;
  }
}
</style>
