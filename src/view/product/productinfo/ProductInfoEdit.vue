<template>
  <el-dialog :title="'商品资料'" :visible.sync="visible"
             :close-on-click-modal="false" @close="hideDo">

    <el-form ref="form" :model="row" label-width="80px" align="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="类别">
            <el-input v-model="row.type" placeholder="请输入">
              <el-button slot="append" @click="typeVisible=true" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>


          <el-form-item label="名称"
                        prop="name"
                        :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
            <el-input v-model="row.name" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="单位">
            <el-select v-model="row.company">
              <el-option :value="'箱'"></el-option>
              <el-option :value="'个'"></el-option>
              <el-option :value="'只'"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="生产厂家">
            <el-input v-model="row.manufacturer" placeholder="请输入"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="编号"
                        prop="number"
                        :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
            <el-input v-model="row.number" :disabled="!isAdd"/>
          </el-form-item>
          <el-form-item label="规格">
            <el-input v-model="row.spec" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="含量">
            <el-input v-model="row.content" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="条形码">
            <el-input v-model="row.barcode" placeholder="请输入"/>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="成本价">
            <el-input-number v-model="row.cost" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="售价">
            <el-input-number v-model="row.proce" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="row.status">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">禁用</el-radio>
            </el-radio-group>
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
          <el-form-item label="备注">
            <el-input v-model="row.remark" placeholder="请输入" type="textarea" :rows="3"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标记">
            <el-input v-model="row.badge" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="row.sort" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="图片">

            <el-upload
              class="avatar-uploader"
              :action="'/api/fileUpload/product/'+ row.number"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="row.image" :src="row.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item>
        <el-button icon="el-icon-edit" type="primary" @click="submitForm">提交</el-button>
        <el-button icon="el-icon-delete" @click="hide()">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :width="'300px'" :visible.sync="typeVisible" @dblclick.native="closeTypeFrm" title="双击选择"
               :show-close="false" :modal-append-to-body="false" :append-to-body="true">
      <productTypeInfoTree ref="productTypeInfoTree" :handleNodeClick="handleNodeClick"/>
    </el-dialog>
  </el-dialog>

</template>

<script>
  import ProductTypeInfoTree from '@/view/product/producttypeinfo/ProductTypeInfoTree.vue';

  let data = () => {
    return {
      isAdd: false,
      visible: false,
      typeVisible: false,
      row: {},
      oldRow: {},
      isChange: false
    }
  }
  export default {
    data: data,
    props: ['search'],
    components: {
      ProductTypeInfoTree,
    },
    methods: {
      closeTypeFrm: function () {
        this.typeVisible = false;
      },
      show: function (row) {
        this.oldRow = row;
        this.row = JSON.parse(JSON.stringify(row));
        this.visible = true;
        this.isChange = false;
      },
      getNewNumber: function (type) {
        this.$http.get("/product/findMaxNumber", {
          params: {type : type}}).then(res => {
          if (res.data.success) {
            this.$set(this.row, 'number', res.data.data);
          }
        });
      },
      showAdd: function () {
        this.isAdd = true;
        this.visible = true;
        this.oldRow = null;
        this.isChange = false;

        this.row = {
          company: '箱',
          status: true
        }

        this.getNewNumber('');
      },
      handleNodeClick(data) {
        this.$set(this.row, 'type', data.label)

        if (this.isAdd){
          this.getNewNumber(data.label);
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
        } else {
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
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.$set(this.row, 'image', res.data)

        }
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      onSubmit: function () {
        let param = this.row;
        let vm = this;
        let url = this.isAdd ? '/base/productInfo/addNew' : '/base/productInfo/update';

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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

