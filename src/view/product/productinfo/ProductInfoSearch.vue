<template>
  <el-col :span="24" style="padding-bottom: 0px;">
    <el-form :inline="true" v-model="filters">

<el-form-item>
  <el-input v-model="filters.number" placeholder="编号" clearable></el-input>
</el-form-item>

<el-form-item>
  <el-input v-model="filters.name" placeholder="名称" clearable></el-input>
</el-form-item>

<el-form-item>
  <el-input v-model="filters.spec" placeholder="规格" clearable></el-input>
</el-form-item>


      <el-form-item>
        <el-button type="primary" @click="search"  icon="el-icon-search">查询</el-button>
        <el-button type="warning" @click="add" icon="el-icon-plus">添加</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  export default {
    name: "lsz-pagination",
    props: ['search', 'filters', 'add'],
    methods: {}
  }
</script>


