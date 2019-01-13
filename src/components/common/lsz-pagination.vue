<template>
  <el-footer>
    <el-col :span="6">
      <el-select v-model="sheet.pageSize" placeholder="请选择" @change="getList">
        <el-option label="10" :value="10"/>
        <el-option label="20" :value="20"/>
        <el-option label="50" :value="50"/>
        <el-option label="100" :value="100"/>
      </el-select>

    </el-col>
    <el-col :span="18">
      <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="sheet.pageSize"
                     :total="sheet.total" background>
      </el-pagination>
    </el-col>
  </el-footer>
</template>

<script>
  export default {
    name: "lsz-pagination",
    props:['getList','sheet'],
    methods: {
      handleCurrentChange: function (val) {
        this.sheet.pageNum = val
        this.getList()
      },
    }
  }
</script>

<style scoped>

</style>
