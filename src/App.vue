<template>
  <div id="app">
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
  background-color: #D3DCE6;
  color: #333;
  text-align: center;

}
.el-footer{
  padding-top: 10px;
  background: #f2f2f2;
  height: 60px;
  position: absolute;
  width: 85%;
  bottom: 10px;
}
.el-main {
  text-align: center;
  padding: 15px 0px;
}

</style>
