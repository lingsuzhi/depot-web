<template>
  <el-card class="box-card" style="margin-right: 10px;margin-top: 10px;">
    <el-tree :data="treeData" :props="defaultProps"
             node-key="id"
             :default-expanded-keys="openArr"
             @node-click="handleNodeClick"></el-tree>
  </el-card>
</template>

<script>

  import {dataToTree, treeToRows} from '@/common/util/TreeUtil.js'

  let data = () => {
    return {
      rows: [],
      openArr: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
  export default {
    data: data,
    props: ['handleNodeClick'],
    methods: {
      getSortRows: function (data) {
        return treeToRows(data);
      },
      initTree: function () {

        let param = {
          pageNum: 1,
          pageSize: 1111111,
          query: {}
        }
        this.$http.post('/base/productTypeInfo/findPage', param).then(res => {

          let response = res.data.data;
          this.rows = response.content
        }).catch(() => {

        })
      }
    },
    computed: {
      // 计算属性的 getter
      treeData: function () {
        let rows = this.rows;
        let tree = dataToTree(rows);
        let rowsIndex = treeToRows(rows);
        if (rowsIndex && rowsIndex.length > 0) {
          let tmpArr = [];
          for (let item of rowsIndex) {
            if (item.index == 1) {
              tmpArr.push(item.id)
            }
          }
          this.openArr = tmpArr;
        }
        return tree;
      }
    },
    created: function () {
      this.initTree();
    },
    name: "MemberEdit"
  }
</script>

<style scoped>

</style>

