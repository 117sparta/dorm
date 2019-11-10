<template>
  <el-table :data="data" :height="height">
    <template  v-for="item in columns">
      <el-table-column  v-if="item.type === 'string'" :key="item.id" :align="item.align" :fixed="item.fixed" :min-width="item.minWidth + 'px'" :width="item.width + 'px'" :formatter="item.formatter" :label="item.label" :prop="item.field">
      </el-table-column>
      <el-table-column  v-else-if="item.type === 'opt'" :key="item.id" :align="item.align" :fixed="item.fixed" :min-width="item.minWidth + 'px'" :width="item.width + 'px'" :formatter="item.formatter" :label="item.label" :prop="item.field">
        <template slot-scope="scope">
          <el-button v-for="(btn, index) in item.children" :key="index" type="text" :style="{color: btn.color}" @click="btn.cb(scope.row)">{{btn.text}}</el-button>
        </template>
      </el-table-column>
    </template>
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
    },
    height: {
      type: String,
      default: () => {
        return '72vh';
      }
    }
  }
}
</script>
