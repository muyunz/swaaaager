<template>
  <div hide-trigger class="api-sidebar">
    <div class="api-sidebar__header">
      <Input search v-model.trim="keyword" />
    </div>
    <div class="api-sidebar__menu-wrap">
      <Menu
      ref="menu"
      class="api-sidebar__menu"
      :class="{'api-sidebar__menu--search': keyword !== ''}"
      width="300px"
      :active-name="activeName"
      :open-names="openNames">
        <Submenu
          v-for="(tag, tagIndex) in Object.keys(tags)"
          :name="tag"
          :ref="tag"
          :class="{'api-sidebar__menu--result': isTagResult(tag)}"
          :key="tagIndex">
          <template slot="title">
            {{ tag }}
          </template>
          <MenuItem
            class="api-menu"
            v-for="(pathMethod, pathMethodIndex) in tags[tag].paths"
            :class="{'api-sidebar__menu--result': isPathResult(pathMethod)}"
            :style="{ paddingLeft: '15px' }"
            :key="pathMethodIndex"
            :name="`${tag}-${pathMethodIndex}`"
            :ref="`${tag}-${pathMethodIndex}`">
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import ApiPath from "@/components/ApiPath"
import config from '@/config'
import _ from 'lodash'

export default {
  components: {
    ApiPath
  },
  data() {
    return {
      show: true,
      keyword: '',
      activeName: '',
      openNames: [],
      method: config.method,
      filter: {
        tagNames: [],
        paths: []
      }
    };
  },
  watch: {
    keyword: _.debounce(function (keyword) {
      if (this.keyword !== '') {
        const { tagNames, paths } = this.filter

        this.filter.tagNames = this.tagNames.filter(t => t.indexOf(keyword) !== -1)
        this.filter.paths = this.allPaths.filter(p => p.path.indexOf(keyword) !== -1)


        if (tagNames.length && paths.length) {
          const path = paths[0]
          this.openNames = [path.tag]
          this.activeName = `${path.tag}-${path.index}`
        } else if (paths.length) {
          const path = paths[0]
          this.openNames = [path.tag]
          this.activeName = `${path.tag}-${path.index}`
        } else {
          const tagName = tagNames[0]
          this.openNames = [tagName]
          this.activeName = ``
        }
      } else {
        this.filter.tagNames = []
        this.filter.paths = []
      }

      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName()

        const targetRef = this.activeName === '' ? this.openNames[0].split('-')[1] : this.activeName
        const targets = this.$refs[targetRef]

        if (targets && targets.length) {
          const $el = targets[0].$el
          const $parent = this.$refs.menu.$el

          $parent.scrollTop = $el.offsetTop - $parent.offsetTop
        }

      })
    }, 300)
  },
  computed: {
    ...mapState("swagger", {
      tags: state => state.tags,
      tagNames: state => Object.keys(state.tags),
      paths: state => state.resource.paths
    }),
    ...mapGetters("swagger", ['tagNames', 'allPaths'])
  },
  methods: {
    isTagResult (tag) {
      return this.keyword === '' ? false : ( this.filter.tagNames.includes(tag) )
    },
    isPathResult (pathMethod) {
      return this.keyword === '' ? false : ( !!this.filter.paths.find(p => p.method === pathMethod.method && p.path === pathMethod.path) )
    }
  },
  mounted () {

  }
};
</script>

<style lang="scss">
.api-sidebar {
  min-width: 300px;
  background: #f2f2f2;

  .api-sidebar__header {
    z-index: 1;
    position: relative;
    padding: 15px;
  }

  .api-sidebar__menu {
    overflow: hidden;
    background: none;
  }

  .api-sidebar__menu-wrap {
    z-index: 0;
    position: relative;
    height: 100%;
    overflow-y: auto;
  }

  .api-sidebar__menu--result {
    .ivu-menu-submenu-title {
      color: #333;
    }
    .api-menu {
      .api-menu__item-path {
        color: #333;
      }
    }
  }

  .api-sidebar__menu--search {
    .ivu-menu-submenu-title {
      color: #999;
    }
    .api-menu {
      .api-menu__item-path {
        color: #999;
      }
    }
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    background: none;
  }

  .api-menu {
    padding-left: 0px;
    .api-menu__item {
      display: flex;
      align-items: center;
      .api-menu__item-info {
        width: 100%;
      }
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
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
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
