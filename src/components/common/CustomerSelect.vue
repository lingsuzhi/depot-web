<template>
  <section>
    <el-dialog :title="'客户资料'" :visible.sync="visible"
               :close-on-click-modal="false" @close="hideDo">
      <el-container>
        <el-header>
          <el-col :span="24" style="padding-bottom: 0px;">
            <el-form :inline="true" v-model="filters">

              <el-form-item>
                <el-input v-model="filters.number" placeholder="编号" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-input v-model="filters.name" placeholder="名称" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-input v-model="filters.phone" placeholder="电话" clearable></el-input>
              </el-form-item>

            </el-form>
          </el-col>
        </el-header>
        <el-main>
          <el-table :data="sheet.rows" highlight-current-row v-loading="sheet.loading" stripe="stripe" border="border"
                    @sort-change="sortChange" style="width: 100%;" max-height="690" :row-style="tableRowStyle">

            <el-table-column prop="number" label="编号" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="name" label="名称" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="phone" label="电话" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="email" label="邮箱" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="type" label="类别" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

            <el-table-column prop="remark" label="备注" min-width="160" sortable="sortable" :show-overflow-tooltip="true"
                             header-align="center"/>

          </el-table>
        </el-main>
        <lsz-pagination :getList="getList" :sheet="sheet"/>
      </el-container>
    </el-dialog>
  </section>
</template>

<script>
  import LszPagination from '@/components/common/lsz-pagination.vue';
  import CustomerInfoSearch from '../../view/product/customerinfo/CustomerInfoSearch.vue';
  import CustomerInfoEdit from '../../view/product/customerinfo/CustomerInfoEdit.vue';

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
  let getList = function () {
    let param = {
      pageNum: this.sheet.pageNum,
      pageSize: this.sheet.pageSize,
      sort: this.sheet.sort,
      order: this.sheet.order,
      query: this.filters
    }
    this.sheet.loading = true
    this.$http.post('/base/customerInfo/findPage', param).then(res => {

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
      CustomerInfoSearch,
      CustomerInfoEdit,
    },
    methods: {
      search: function () {
        this.sheet.pageNum = 1
        this.getList()
      },
      handleCommand: function (param) {
        this[param.method](param.args)
      },
      tableRowStyle({row, rowIndex}) {
        if (row.color) {
          return 'color: ' + row.color;
        }
      },
      killCustomerInfoInfo: function (row) {
        let vm = this;
        vm.$confirm('是否确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.get('/base/customerInfo/delByUuid?uuid=' + row.uuid).then(res => {
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
      showCustomerInfoInfo: function (row) {
        this.$refs.customerInfoEdit.show(row);
      },
      add: function () {
        this.$refs.customerInfoEdit.showAdd();
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
    },
    mounted: function () {
      this.search()
    },
    name: "CustomerInfo"
  }
</script>

<style scoped>
</style>

