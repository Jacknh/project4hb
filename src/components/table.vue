<template>
  <table>
    <thead>
      <tr>
        <th v-for="(col, i) in columns" :key="i">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIdx) in data" :key="rowIdx">
        <th v-for="(col, i) in columns" :key="i">
          <template v-if="'cellRender' in col">
            <i-render :row='row' :column='col' :index='rowIdx' :cellRender='col.cellRender'></i-render>
          </template>
          <template v-else>
            <slot :row='row' :column='col' :index='rowIdx' :name="col.slot"></slot>
          </template>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import IRender from './render.js';

export default {
  name: 'iTable',
  components: {
    IRender
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style>
  table{
    width: 60%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td, table th{
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
</style>

