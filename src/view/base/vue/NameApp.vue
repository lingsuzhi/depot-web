<template>
  <section>
    <el-container>
      <el-header>
        <【lName】Search :search="search" :filters="filters" :add="add"/>
      </el-header>
      <el-main>
        <el-table :data="sheet.rows" highlight-current-row v-loading="sheet.loading" stripe="stripe" border="border"
                  @sort-change="sortChange" style="width: 100%;" max-height="690" :row-style="tableRowStyle">
【tableColumn】

          <el-table-column prop="createDate" label="时间" width="200" align="center" sortable="sortable"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{ formatDate(scope.row.createDate) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="120" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-dropdown @command="handleCommand">
           <span class="el-dropdown-link">
              <el-button size="small" type="text">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{'method':'show【uName】Info','args':scope.row}">编辑</el-dropdown-item>
                  <el-dropdown-item :command="{'method':'kill【uName】Info','args':scope.row}">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <lsz-pagination :getList="getList" :sheet="sheet"/>
    </el-container>

    <【lName】Edit ref="【lName】Edit" :search="search"/>
  </section>
</template>

<script>
  import LszPagination from '@/components/common/lsz-pagination.vue';
  import 【uName】Search from './【uName】Search.vue';
  import 【uName】Edit from './【uName】Edit.vue';

  let data = () => {
    return {
      filters: {},
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
    this.$http.post('/base/【lName】/findPage', param).then(res => {

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
      【uName】Search,
      【uName】Edit,
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
        if (row.color){
          return 'color: ' + row.color;
        }
      },
      kill【uName】Info: function (row) {
        let vm = this;
        vm.$confirm('是否确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.get('/base/【lName】/delByUuid?uuid=' + row.uuid).then(res => {
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
      show【uName】Info: function (row) {
        this.$refs.【lName】Edit.show(row);
      },
      add: function () {
        this.$refs.【lName】Edit.showAdd();
      },
      formatDate: function (d, format) {
        if(!d){
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
    name: "【uName】"
  }
</script>

<style scoped>
</style>
