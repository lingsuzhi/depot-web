<template>
  <el-dialog :title="'客户资料'" :visible.sync="visible"
             :close-on-click-modal="false" @close="hideDo">

    <el-form ref="form" :model="row" label-width="80px" align="left">
      
<el-form-item label="编号"
prop="number"
:rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
<el-input v-model="row.number" :disabled="!isAdd"/>
</el-form-item>

<el-form-item label="名称"
prop="name"
:rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
      <el-input v-model="row.name" placeholder="请输入"/>
</el-form-item>

<el-form-item label="电话">
      <el-input v-model="row.phone" placeholder="请输入"/>
</el-form-item>

<el-form-item label="邮箱">
      <el-input v-model="row.email" placeholder="请输入"/>
</el-form-item>

<el-form-item label="类别">
<el-select v-model="row.type">
<el-option :value="'客户'"></el-option>
<el-option :value="'供应商'"></el-option>
<el-option :value="'内部'"></el-option>
</el-select>
</el-form-item>

<el-form-item label="排序">
      <el-input-number v-model="row.sort" placeholder="请输入"/>
</el-form-item>

<el-form-item label="备注">
      <el-input v-model="row.remark" placeholder="请输入"  type="textarea"/>
</el-form-item>

<el-form-item label="颜色">
<el-color-picker
v-model="row.color"
show-alpha
:predefine=" [
'#ff4500',
'#ff8c00',
'#ffd700',
'#90ee90',
'#00ced1',
'#1e90ff',
'#c71585',
'rgba(255, 69, 0, 0.68)',
'rgb(0, 0, 0)',
'#eeeeee',
]">
</el-color-picker>
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
              type: '客户',

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
        let url = this.isAdd ? '/base/customerInfo/addNew' : '/base/customerInfo/update';

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

