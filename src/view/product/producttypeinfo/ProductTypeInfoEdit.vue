<template>
  <el-dialog :title="'商品分类'" :visible.sync="visible"
             :close-on-click-modal="false" @close="hideDo">
    <el-container>
      <el-aside width="220px">
        <productTypeInfoTree ref="productTypeInfoTree" :handleNodeClick="handleNodeClick" :rows="rows"/>
      </el-aside>
      <el-main>
        <el-form ref="form" :model="row" label-width="80px" align="left">

          <el-form-item label="名称"
                        prop="name"
                        :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
            <el-input v-model="row.name" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="上级">
            <el-input v-model="parent" placeholder="请选择" :readonly="true"/>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="row.type">
              <el-option :value="'类别'"></el-option>
              <el-option :value="'包含文字'"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="row.remark" placeholder="请输入" type="textarea"/>
          </el-form-item>


          <el-form-item>
            <el-button icon="el-icon-edit" type="primary" @click="submitForm">提交</el-button>
            <el-button icon="el-icon-delete" @click="hide()">取消</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>
  </el-dialog>

</template>

<script>
  import ProductTypeInfoTree from './ProductTypeInfoTree.vue';

  let data = () => {
    return {
      isAdd: false,
      visible: false,
      row: {
        parentId: ''
      },
      oldRow: {},
      isChange: false,
      parent: ''
    }
  }
  export default {
    data: data,
    components: {
      ProductTypeInfoTree,
    },
    props: ['search', 'rows'],
    methods: {
      show: function (row) {
        this.oldRow = row;
        this.row = JSON.parse(JSON.stringify(row));
        this.visible = true;
        this.isChange = false;
        this.parent = this.row.parent;
      },
      showAdd: function () {
        this.isAdd = true;
        this.visible = true;
        this.oldRow = null;
        this.isChange = false;
        this.parent = '';
        this.row = {
          type: '类别',

        }
        this.parent = "";

      },
      hide: function () {
        this.visible = false;
      },
      hideDo: function () {
        this.isAdd = false;
        if (this.isChange) {
          this.search();
        }

      },
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.onSubmit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleNodeClick(data) {

        this.parent = data.label;
        this.row.parentId = data.id;
      },
      onSubmit: function () {
        let param = this.row;
        param.parent = this.parent;
        if (param.uuid == param.parentId){
          console.log("id错误，保存失败")
          return;
        }
        let vm = this;
        let url = this.isAdd ? '/base/productTypeInfo/addNew' : '/base/productTypeInfo/update';
        vm.$http.post(url, param).then(res => {
          if (!res.data.success) {
            vm.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
            return
          }
          vm.isChange = true;
          vm.$message({
            type: 'success',
            message: '保存成功!'
          })
          vm.hide()
        })
      }
    },
    name: "MemberEdit"
  }
</script>

<style scoped>

</style>

