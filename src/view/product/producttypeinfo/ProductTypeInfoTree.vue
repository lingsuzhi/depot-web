<template>
  <el-card class="box-card"  style="margin-right: 10px;margin-top: 10px;">
    <el-tree :data="treeData" :props="defaultProps"
             node-key="id"
             :default-expanded-keys="openArr"
             @node-click="handleNodeClick"></el-tree>
  </el-card>
</template>

<script>

  import {dataToTree,treeToRows} from '@/common/util/TreeUtil.js'
  let data = () => {
    return {
      openArr :[],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
  export default {
    data: data,
    props: ['rows','handleNodeClick'],
    methods: {
      getSortRows:function (data) {
        return treeToRows(data);
      }
    },
    computed: {
      // 计算属性的 getter
      treeData: function () {
        let rows = this.rows;
        let tree =  dataToTree(rows);
        let rowsIndex = treeToRows(rows);
        if (rowsIndex && rowsIndex.length>0){
          let tmpArr = [];
          for (let item of rowsIndex){
            if (item.index == 1){
              tmpArr.push(item.id)
            }
          }
          this.openArr = tmpArr;
        }
        return tree;
      }
    },
    name: "MemberEdit"
  }
</script>

<style scoped>

</style>

