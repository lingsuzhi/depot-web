<template>
  <section>
    <el-container>
      <el-header>
        <lsz-search :search="search" :filters="filters" :add="add"/>
      </el-header>
      <el-main>
        <el-table :data="sheet.rows" highlight-current-row v-loading="sheet.loading" stripe="stripe" border="border"
                  @sort-change="sortChange" style="width: 100%;" max-height="690">
          <el-table-column prop="account" label="账号" width="160" sortable="sortable" :show-overflow-tooltip="true"
                           header-align="center">
            <template slot-scope="scope">
              <span style="color: #409EFF">{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机" width="160" sortable="sortable" :show-overflow-tooltip="true"/>
          <el-table-column prop="authLevel" label="性别" width="120" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.sex?'success':'info'">{{scope.row.sex? '男' : '女'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="googleKey" label="谷歌验证" width="120" align="center">
          </el-table-column>
          <el-table-column prop="role" label="角色" width="120" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="160" sortable="sortable" :show-overflow-tooltip="true"/>
          <el-table-column prop="registerDate" label="注册时间" width="200" align="center" sortable="sortable"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{ formatDate(scope.row.registerDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="180" :show-overflow-tooltip="true"/>
          <el-table-column label="操作" fixed="right" width="120" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-dropdown @command="handleCommand">
           <span class="el-dropdown-link">
              <el-button size="small" type="text">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{'method':'showMemberInfo','args':scope.row}">编辑</el-dropdown-item>
                  <el-dropdown-item :command="{'method':'killMemberInfo','args':scope.row}">删除</el-dropdown-item>
                  <el-dropdown-item :command="{'method':'showMemberLog','args':[scope.row.id,1]}">操作日志
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <lsz-pagination :getList="getList" :sheet="sheet"/>
    </el-container>

    <MemberEdit ref="memberEdit"/>
  </section>
</template>

<script>
  import LszPagination from '@/components/common/lsz-pagination.vue';
  import LszSearch from './LszSearch.vue';
  import MemberEdit from './MemberEdit.vue';

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
    this.$http.post('/base/memberInfo/findPage', param).then(res => {

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
      LszSearch,
      MemberEdit,
    },
    methods: {
      search: function () {
        this.sheet.pageNum = 1
        this.getList()
      },
      handleCommand: function (param) {
        this[param.method](param.args)
      },
      killMemberInfo: function (row) {
        let vm = this;
        vm.$confirm('是否确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.get('/base/memberInfo/delByUuid?uuid=' + row.uuid).then(res => {
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
          //用户点击取消
        })
      },
      showMemberInfo: function (row) {
        this.$refs.memberEdit.show(row);
      },
      add: function () {
        this.$refs.memberEdit.showAdd();
      },
      formatDate: function (d, format) {
        if (!format) {
          format = 'YYYY-MM-DD HH:mm:ss';
        }
        if (!d) {
          return "";
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
    name: "Member"
  }
</script>

<style scoped>
</style>
