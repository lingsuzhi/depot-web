<template>
  <el-dialog :title="'用户信息'" :visible.sync="visible"
             :close-on-click-modal="false" @close="hideDo">

    <el-form ref="form" :model="row" label-width="80px" align="left">
      
<el-form-item label="账号"
prop="account"
:rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
<el-input v-model="row.account" :disabled="!isAdd"/>
</el-form-item>

<el-form-item label="名称"
prop="name"
:rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
      <el-input v-model="row.name" placeholder="请输入"/>
</el-form-item>

<el-form-item label="角色">
<el-select v-model="row.role">
<el-option :value="'管理员'"></el-option>
<el-option :value="'操作员'"></el-option>
<el-option :value="'来宾'"></el-option>
</el-select>
</el-form-item>

<el-form-item label="性别">
<el-radio-group v-model="row.sex">
<el-radio :label="'男'" >男</el-radio>
<el-radio :label="'女'" >女</el-radio>
</el-radio-group>
</el-form-item>

<el-form-item label="手机">
      <el-input v-model="row.phone" placeholder="请输入"/>
</el-form-item>

<el-form-item label="备注">
      <el-input v-model="row.remark" placeholder="请输入"  type="textarea"/>
</el-form-item>


      <el-form-item>
        <el-button icon="el-icon-edit" type="primary" @click="submitForm">提交</el-button>
        <el-button icon="el-icon-delete" @click="hide()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script>
  let data = () => {
    return {
      isAdd: false,
      visible: false,
      row: {},
      oldRow: {},
      isChange: false
    }
  }
  export default {
    data: data,
    props: ['search'],
    methods: {
      show: function (row) {
        this.oldRow = row;
        this.row = JSON.parse(JSON.stringify(row));
        this.visible = true;
        this.isChange = false;
      },
      showAdd: function () {
        this.isAdd = true;
        this.visible = true;
        this.oldRow = null;
        this.isChange = false;

        this.row = {
              role: '来宾',
    sex: '男',

      }
      },
      hide: function () {
        this.visible = false;
      },
      hideDo: function () {
        this.isAdd = false;
        if (this.isChange && this.oldRow) {
          for (let item in this.oldRow) {
            let val = this.row[item];
            this.oldRow[item] = val;
          }
        }else{
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
      onSubmit: function () {
        let param = this.row;
        let vm = this;
        let url = this.isAdd ? '/base/memberInfo/addNew' : '/base/memberInfo/update';

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

