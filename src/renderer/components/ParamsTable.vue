<template>
  <Table
    class="params-table"
    :show-header="false"
    :border="false"
    :columns="columns"
    :data="params">
  </Table>
</template>

<script>
export default {
  props: {
    params: Array,
    default: () => []
  },
  data () {
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          className: 'params-table__col-name',
          render: (h, params) => {
            return (
              <div>
                {params.row.required && <div class="params-table__col-required"></div>}
                {params.row.name}
              </div>
            )
          }
        },
        {
          title: 'Description',
          key: 'description'
        },
        {
          title: 'Type',
          key: 'type'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .params-table {
    background: none;
    .params-table__col-name {
      position: relative;
      font-weight: bold;
      .params-table__col-required {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background: #FE4A49;
      }
    }
  }
</style>

