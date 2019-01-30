<template>
  <section>
    <canvas id="myCanvas" width="1200" height="1600">
      你的浏览器不支持canvas
    </canvas>
  </section>
</template>

<script>
  import LszCanvas from "@/common/canvas/LszCanvas"

  let data = () => {
    return {
      canvas :''
    }
  }

  export default {
    data: data,
    components: {},
    methods:{
      setType(type){
        this.canvas.setType(type);
      }
    },
    mounted: function () {
      this.canvas = new LszCanvas('myCanvas');
    }
  }
</script>

<style scoped>

</style>
