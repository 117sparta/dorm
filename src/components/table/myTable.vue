<template>
  <el-table :data="data">
    <el-table-column v-for="item in columns" :key="item.id" :align="item.align" :fixed="item.fixed" :min-width="item.minWidth" :width="item.width" :formatter="item.formatter" :label="item.label" :prop="item.field">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
}
</script>
