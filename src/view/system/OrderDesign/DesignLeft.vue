<template>
  <section>
    <el-row v-for="(item,index) in btns" :key="index" style="margin-top: 25px;">
      <button   style="font-size: 16px"     :ref="'countBtn'+index" @mousedown="btnClick(index)">
        {{item}}
      </button>
    </el-row>
  </section>
</template>

<script>
  let data = () => {
    return {
      btns: ['标签', '表格', '标题', 100],
    }
  }

  export default {
    data: data,
    components: {},
    methods:{
      btnClick(index){
        let type = this.btns[index];
        this.$emit('typeSelect',type)
      }
    },
    name: "DesignLeft"
  }
</script>

<style scoped>

</style>
