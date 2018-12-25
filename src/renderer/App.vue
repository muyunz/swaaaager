<template>
  <div class="app">
    <toolbar></toolbar>
    <div class="main" v-if="$store.state.swagger.fetched">
      <sidebar class="main-sidebar"></sidebar>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Sidebar,
    Toolbar
  }
}
</script>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .main {
      display: flex;
      .main-sidebar {
        width: 300px;
        height: 100vh;
      }
      .main-content {
        flex: 1;
        display: flex;
        overflow-y: auto;
        overflow-x: hidden;
        background: #fff;
      }
    }
  }
</style>

