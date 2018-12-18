<template>
  <div class="layout">
    <Layout>
      <Header>
        <toolbar></toolbar>
      </Header>
      <Layout>
        <sidebar></sidebar>
        <Layout class="content-layout">
          <Content>
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
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
  .content-layout {
    padding: 25px;
  }
</style>

