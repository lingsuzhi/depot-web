<template>
  <el-col :span="24" style="padding-bottom: 0px;">
    <el-form :inline="true" v-model="filters">
      
<el-form-item>
  <el-input v-model="filters.account" placeholder="账号"></el-input>
</el-form-item>

<el-form-item>
  <el-input v-model="filters.name" placeholder="名称"></el-input>
</el-form-item>

<el-form-item>
<el-select v-model="filters.role" placeholder="角色">
<el-option
:label="''"
:value="null">
</el-option>
<el-option
:value="'管理员'">
</el-option>
<el-option
:value="'操作员'">
</el-option>
<el-option
:value="'来宾'">
</el-option>
</el-select>
</el-form-item>

<el-form-item>
<el-select v-model="filters.sex" placeholder="性别">
<el-option
:label="''"
:value="null">
</el-option>
<el-option
:value="'男'">
</el-option>
<el-option
:value="'女'">
</el-option>
</el-select>
</el-form-item>

<el-form-item>
  <el-input v-model="filters.phone" placeholder="手机"></el-input>
</el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
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


