<template>
  <section>
    <p>{{date | time}}</p>
    {{date | mytime(12,43,30)}}

    <p ref="content">啊啊啊啊p标签的内容</p>
    <button @click="btnclick">提示</button>
  </section>

</template>

<script>
  let data = () => {
    return {
      aaa: '啊啊啊',

      date: new Date()
    }

  }
  export default {
    name: "Test",
    data: data,
    methods: {
      btnclick: function () {
        let txt = this.$refs.content.textContent;
        alert(txt)
      }
    },
    filters: {
      time: function (value) {
        let d = value;
        //  let d = new Date(parseInt(value) * 1000)
        return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
      },
      mytime: function (d, ss, ff, mm) {
        return (d.getFullYear()) +
          '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
          '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
          ' ' + ss +
          '：' + ff +
          '：' + mm;

      }
    }
  }
</script>

<style scoped>

</style>
