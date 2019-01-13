<template>
  <section>
    <div id="myChart" :style="{width: '600px', height: '600px'}"></div>

    <button @click="btnClick">提示</button>
  </section>

</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  let data = () => {
    return {
      aaa: '啊啊啊',
      msg: 'Welcome to Your Vue.js App'
    }

  }
  export default {
    name: "Test",
    data: data,
    methods: {
      btnClick: function () {

      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    },
    mounted(){
      this.drawLine();
    },
  }
</script>

<style scoped>

</style>
