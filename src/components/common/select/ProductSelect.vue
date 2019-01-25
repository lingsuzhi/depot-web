<template>
  <section>
    <el-dialog  v-dialogDrag title="选择商品"  :visible.sync="visible" custom-class="dlgClass"
               :close-on-click-modal="false" width="1300px" top="70px">
      <el-container>
        <el-aside width="220px">
          <productTypeInfoTree ref="productTypeInfoTree" :handleNodeClick="handleNodeClick"/>
        </el-aside>
        <el-main>
      <el-container>
        <el-header>
          <el-col :span="24" style="padding-bottom: 0px;">
            <el-form :inline="true" v-model="filters">

              <el-form-item>
                <el-input v-model="filters.number" placeholder="编号" clearable @change="txtChange"></el-input>
              </el-form-item>

              <el-form-item>
                <el-input v-model="filters.name" placeholder="名称" clearable @change="txtChange"></el-input>
              </el-form-item>

              <el-form-item>
                <el-input v-model="filters.spec" placeholder="规格" clearable @change="txtChange"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="search"  icon="el-icon-search">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-header>
        <el-main>
          <el-table :data="sheet.rows" highlight-current-row v-loading="sheet.loading"  border="border" class="productSelectTable"
                    @sort-change="sortChange" style="width: 100%;" height="620" :row-style="tableRowStyle" @row-dblclick = "selectDo">

            <el-table-column prop="number" label="编号" min-width="100" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="name" label="名称" min-width="220" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="spec" label="规格" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="content" label="含量" min-width="120" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>
            <el-table-column prop="company" label="单位" min-width="80" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>
            <el-table-column prop="type" label="类别" min-width="120" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>
            <el-table-column prop="cost" label="成本价" min-width="100" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="proce" label="售价" min-width="100" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>
          </el-table>
        </el-main>
        <lsz-pagination :getList="getList" :sheet="sheet"/>
      </el-container>
        </el-main>
      </el-container>
    </el-dialog>
  </section>
</template>

<script>
  import LszPagination from '@/components/common/lsz-pagination.vue';
  import ProductTypeInfoTree from '@/view/product/producttypeinfo/ProductTypeInfoTree.vue';

  let data = () => {
    return {
      filters: {},
      visible: false,
      sheet: {
        rows: [],
        total: 0,
        pageNum: 1,
        pageSize: 20,
        sort: null,
        loading: false
      },
    }
  }

  let getList = function (param) {
    if (!param) {
      param = {
        pageNum: this.sheet.pageNum,
        pageSize: this.sheet.pageSize,
        sort: this.sheet.sort,
        order: this.sheet.order,
        query: this.filters
      }
    }
    this.sheet.loading = true
    this.$http.post('/base/productInfo/findPage', param).then(res => {

      let response = res.data.data;

      this.sheet.total = response.totalElements
      this.sheet.rows = response.content
      this.sheet.loading = false
    }).catch(() => this.sheet.loading = false)
  }

  export default {
    data: data,
    components: {
      LszPagination,
      ProductTypeInfoTree,
    },
    props: ['select'],
    methods: {
      enter:function(){
        return false;
      },
      search: function () {
        this.sheet.pageNum = 1
        this.getList()
      },
      handleNodeClick(data) {
        //this.$set(this.filters, 'type', data.label)
        this.sheet.pageNum = 1;
        let param = {
          pageNum: this.sheet.pageNum,
          pageSize: this.sheet.pageSize,
          sort: this.sheet.sort,
          order: this.sheet.order,
          query: {type: data.label}
        }
        this.getList(param)
      },
      handleCommand: function (param) {
        this[param.method](param.args)
      },
      tableRowStyle({row, rowIndex}) {
        if (row.color) {
          return 'color: ' + row.color;
        }
      },
      //文本框修改事件
      txtChange(){
        this.search();
      },
      formatDate: function (d, format) {
        if (!d) {
          return "";
        }
        if (!format) {
          format = 'YYYY-MM-DD HH:mm:ss';
        }
        return this.$moment(d).format(format)
      },
      getList,
      //行 双击事件
      selectDo(row, event){
        row.count = 1;
        this.select(row);
        // this.hide();
      },
      hide(){
        this.visible = false;
      },
      show(){
        this.visible = true;
      },
      sortChange: function (d) {
        this.sheet.sort = d && d.prop
        this.sheet.order = d && d.order && d.order.indexOf('asc') >= 0 ? 'ASC' : 'DESC'
        this.search()
      },
    },
    mounted: function () {
      this.search()
    }
  }
</script>

<style scoped>

</style>

<style>
  .productSelectTable .current-row>td{

    background-color: #DCE5E8!important;
  }
</style>
