<template>
  <section>
    <el-row v-for="(item,index) in btns" :key="index" style="margin-top: 25px;">
      <el-button round style="font-size: 18px" type="primary" plain :ref="'countBtn'+index">
        {{item}}
      </el-button>
    </el-row>
  </section>
</template>

<script>
  let data = () => {
    return {
      btns: [1, 2, 3, 5, 10, 20, 30, 50, 80, 100],
    }
  }

  export default {
    data: data,
    components: {},
    name: "DesignLeft"
  }
</script>

<style scoped>

</style>
