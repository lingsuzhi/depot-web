<template>
  <section>
    <el-container>
      <el-aside width="120px">
        <DesignLeft/>
      </el-aside>
      <el-main style="background: antiquewhite">
        <DesignMain/>
      </el-main>
      <el-aside>
        右边
      </el-aside>
    </el-container>

  </section>
</template>

<script>
  import DesignLeft from './DesignLeft.vue';
  import DesignMain from './DesignMain.vue';

  export default {
    components: {
      DesignLeft,
      DesignMain,
    },
    name: "OrderDesignApp"
  }
</script>

<style scoped>

</style>
