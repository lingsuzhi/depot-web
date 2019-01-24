<template>
  <section>

    <el-container>
      <el-aside width="220px">
        <productTypeInfoTree ref="productTypeInfoTree" :handleNodeClick="handleNodeClick"/>
      </el-aside>
      <el-main>
        <el-container>
          <el-header>
            <productTypeInfoSearch :search="search" :filters="filters" :add="add"/>
          </el-header>
          <el-main>
            <el-table :data="sheet.rows" highlight-current-row v-loading="sheet.loading" stripe="stripe" border="border"
                      :row-class-name="tableRowClassName"
                      @sort-change="sortChange" style="width: 100%;" max-height="700">

              <el-table-column prop="name" label="名称" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                               header-align="center"/>

              <el-table-column prop="parent" label="上级" min-width="160" sortable="sortable"
                               :show-overflow-tooltip="true" header-align="center"/>

              <el-table-column prop="type" label="类型" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                               header-align="center"/>

              <el-table-column prop="remark" label="备注" min-width="160" sortable="sortable"
                               :show-overflow-tooltip="true" header-align="center"/>

              <el-table-column label="操作" fixed="right" width="120" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <el-dropdown @command="handleCommand">
           <span class="el-dropdown-link">
              <el-button size="small" type="text">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{'method':'showProductTypeInfoInfo','args':scope.row}">编辑
                      </el-dropdown-item>
                      <el-dropdown-item :command="{'method':'killProductTypeInfoInfo','args':scope.row}">删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <lsz-pagination :getList="getList" :sheet="sheet"/>
        </el-container>

      </el-main>
    </el-container>


    <productTypeInfoEdit ref="productTypeInfoEdit" :search="search" :rows="rows"/>
  </section>
</template>

<script>
  import LszPagination from '@/components/common/lsz-pagination.vue';
  import ProductTypeInfoSearch from './ProductTypeInfoSearch.vue';
  import ProductTypeInfoEdit from './ProductTypeInfoEdit.vue';
  import ProductTypeInfoTree from '@/view/product/producttypeinfo/ProductTypeInfoTree.vue';

  let data = () => {
    return {
      filters: {},
      rows: [],
      sheet: {
        rows: [],
        total: 0,
        pageNum: 1,
        pageSize: 50,
        sort: null,
        loading: false
      },
    }
  }
  let getList = function () {
    let param = {
      pageNum: this.sheet.pageNum,
      pageSize: this.sheet.pageSize,
      sort: this.sheet.sort,
      order: this.sheet.order,
      query: this.filters
    }
    this.sheet.loading = true
    this.$http.post('/base/productTypeInfo/findPage', param).then(res => {

      let response = res.data.data;

      this.sheet.total = response.totalElements
      manageData(this, response.content);
      this.sheet.loading = false
    }).catch(() => this.sheet.loading = false)
  }
  let manageData = function (vm, data) {
    let tree = vm.$refs.productTypeInfoTree;
    if (data && data.length == tree.rows.length) {
      let sortRows = tree.getSortRows(data);
      let arr = [];
      for (let item of sortRows) {
        for (let row of data) {
          if (item.id == row.uuid) {
            row.index = item.index
            arr.push(row)
          }
        }
      }
      vm.sheet.rows = arr;
    } else {
      vm.sheet.rows = data;
    }

  }
  export default {
    data: data,
    components: {
      LszPagination,
      ProductTypeInfoSearch,
      ProductTypeInfoEdit,
      ProductTypeInfoTree,
    },
    methods: {
      search: function () {
        this.sheet.pageNum = 1
        this.getList()
      },
      handleNodeClick(data) {
        this.$set(this.filters, 'name', data.label)
        this.search();
      },
      handleCommand: function (param) {
        this[param.method](param.args)
      },
      killProductTypeInfoInfo: function (row) {
        let vm = this;
        vm.$confirm('是否确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.get('/base/productTypeInfo/delByUuid?uuid=' + row.uuid).then(res => {
            if (!res.data.success) {
              vm.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
              return
            }
            vm.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.search();
          })
        }).catch(() => {

        })
      },
      showProductTypeInfoInfo: function (row) {
        this.$refs.productTypeInfoEdit.show(row);
      },
      add: function () {
        this.$refs.productTypeInfoEdit.showAdd();
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
      sortChange: function (d) {
        this.sheet.sort = d && d.prop
        this.sheet.order = d && d.order && d.order.indexOf('asc') >= 0 ? 'ASC' : 'DESC'
        this.search()
      },
      tableRowClassName({row, rowIndex}) {

        return 'my-row' + row.index;
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.search();
      }, 100)

    },
    name: "ProductTypeInfo"
  }
</script>

<style>
  .el-table .my-row1 {
    color: #dd6161;
  }

  .el-table .my-row2 {
    color: #5daf34;
  }

  .el-table .my-row3 {
    color: #409eff;
  }
</style>

<style scoped>
</style>

