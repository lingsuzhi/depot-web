<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-header {
  background: #f2f2f2;
  color: #333;
  text-align: left;
  padding-top: 10px;
}

.el-aside {
  /*background-color: #f2f2f2;*/
  color: #333;
  text-align: center;

}
.el-footer{
  padding-top: 10px;
  background: #f2f2f2;

  /*position: absolute;*/
  /*width: 85%;*/
  /*bottom: 7px;*/
}
.el-main {
  text-align: center;
  padding: 0px;
}

.el-table td{
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
</style>
