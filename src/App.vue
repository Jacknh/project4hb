<template>
  <div id="app">
    <p>title: {{ title }}</p>
    <p>price: ￥{{ price }}元</p>
    <p>goodsno: {{ goodsno }}</p>
    <p>brand: {{ brand }}</p>
    <i-table :columns="columns" :data="tableData">
      <template slot-scope="{ row }" slot="mSlot">
        <input type="number" min="0" :placeholder="row.mMax" v-model.number="row.mNumber" @keydown="onKeyDown" @blur="onBlur($event, row, 'm')">
      </template>
      <template slot-scope="{ row }" slot="lSlot">
        <input type="number" min="0" :placeholder="row.lMax" v-model.number="row.lNumber" @keydown="onKeyDown" @blur="onBlur($event, row, 'l')">
      </template>
      <template slot-scope="{ row }" slot="sSlot">
        <input type="number" min="0" :placeholder="row.sMax" v-model.number="row.sNumber" @keydown="onKeyDown" @blur="onBlur($event, row, 's')">
      </template>
    </i-table>
    <div class="show">
      总件数：{{ totalCount }}
      总金额：￥ {{ totalCount * price }}元
      <button :disabled='totalCount <= 0'>提交订单</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ITable from './components/table.vue';

function getColumns() {
  const _this = this;
  return [
    {
      title: '颜色/尺码',
      cellRender(h, { row }) {
        return h('span', row.color)
      }
    },
    {
      title: 'M',
      slot: 'mSlot'
    },
    {
      title: 'L',
      slot: 'lSlot'
    },
    {
      title: 'S',
      slot: 'sSlot'
    },
    {
      title: '小计',
      cellRender(h, { row }) {
        const value = (Number(row.mNumber) + Number(row.lNumber) + Number(row.sNumber)) * _this.price;
        return h('span', value)
      }
    }
  ]
}

export default {
  name: 'app',
  components: {
    ITable
  },
  async created() {
    this.columns = getColumns.call(this);
    const { data }  = await axios.get('/api/goods');
    this.title = data.title;
    this.price = data.price;
    this.goodsno = data.goodsno;
    this.brand = data.brand;
    this.tableData = data.data;
  },
  data() {
    return {
      title: '',
      price: '',
      goodsno: '',
      brand: '',
      columns: [],
      tableData: [],
      totalCount: 0
    }
  },
  methods: {
    onBlur($event, row, type) {
      const max = row[`${type}Max`];
      row[`${type}Number`] = Number($event.target.value);
      if (Number($event.target.value) > max) {
        alert(`超出库存数量${max}!`);
        row[`${type}Number`] = max;
        $event.target.value = max;
      }
      this.assignTotalCount();
    },
    onKeyDown($event) {
      if ($event.keyCode === 189) {
        $event.returnValue = false;
      }
    },
    assignTotalCount() {
      this.totalCount = this.tableData.reduce((accumulator, curr) => accumulator + Number(curr.mNumber) + Number(curr.lNumber) + Number(curr.sNumber), 0);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 50px auto;
}
.show {
  margin-top: 20px;
}
</style>
