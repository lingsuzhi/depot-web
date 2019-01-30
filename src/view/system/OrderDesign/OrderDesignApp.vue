<template>
  <section>
    <el-container>
      <el-aside width="120px">
        <DesignLeft @typeSelect="typeSelect"/>
      </el-aside>
      <el-main style="background: #f8f8f8">
        <DesignMain ref="designMain"/>
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
    methods:{
      typeSelect(type){
        this.$refs.designMain.setType(type);
      }
    },
    name: "OrderDesignApp"
  }
</script>

<style scoped>

</style>
