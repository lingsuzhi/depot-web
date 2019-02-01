<template>
  <section v-loading="frmLoadding" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row :gutter="12">
      <el-col :span="3">
        <el-tooltip content="新增" placement="top" effect="light">
          <el-card :class="!frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('新增',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-circle-plus-outline"></i>
          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="2">
        <el-tooltip content="编辑" placement="top" effect="light">
          <el-card :class="!frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('编辑',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-edit-outline"></i>

          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="2">
        <el-tooltip content="删除" placement="top" effect="light">
          <el-card :class="!frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('删除',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-delete"></i>

          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="2">
        <el-tooltip content="保存" placement="top" effect="light">
          <el-card :class="frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('保存',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-success"></i>

          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="2">
        <el-tooltip content="取消" placement="top" effect="light">
          <el-card :class="frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('取消',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-error"></i>

          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="3">
        <el-tooltip content="前单" placement="top" effect="light">
          <el-card :class="!frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('前单',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-d-arrow-left"></i>

          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="3">
        <el-tooltip content="后单" placement="top" effect="light">
          <el-card :class="!frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('后单',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-d-arrow-right"></i>

          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="2">
        <el-tooltip content="增行" placement="top" effect="light">
          <el-card :class="frmDisabled?'lsz-card-disabled':'lsz-card'" @click.native="cardClick('增行',$event)"
                   shadow="frmDisabled?never:hover">
            <i class="el-icon-zoom-in"></i>
          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="2">
        <el-tooltip content="打印" placement="top" effect="light">
          <el-card class="lsz-card" @click.native="cardClick('打印',$event)"
                   shadow="hover">
            <i class="el-icon-printer"></i>
          </el-card>
        </el-tooltip>
      </el-col>

      <el-col :span="3">
        <el-tooltip content="设置" placement="top" effect="light">
          <el-card class="lsz-card" @click.native="cardClick('设置',$event)"
                   shadow="hover">
            <i class="el-icon-setting"></i>
          </el-card>
        </el-tooltip>
      </el-col>
    </el-row>

    <el-form style="margin-top: 16px" label-position="right" label-width="66px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="单号">
            <el-input :readonly="true" v-model="from.uuid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" align="left">
          <el-form-item label="日期">
            <el-date-picker
              :readonly="frmDisabled"
              v-model="from.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="流水号">
            <el-input :readonly="frmDisabled" v-model="from.serialNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="折扣">
            <el-input :readonly="frmDisabled" v-model="from.discount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="客户">
            <el-input v-model="from.customer" :readonly="frmDisabled">
              <el-button :disabled="frmDisabled" slot="append" icon="el-icon-search"
                         @click="showCustomerSelect"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" align="left">
          <el-form-item label="经办人">
            <el-autocomplete
              @click="fuzerenClick"
              :disabled="frmDisabled"
              style="width: 100%"
              class="inline-input"
              v-model="from.dutyPerson"
              :hide-loading="true"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="备注">
            <el-input :readonly="frmDisabled" v-model="from.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--表格-->
    <el-table
      :border="true"
      :data="tableData"
      max-height="605"
      :summary-method="getSummaries"
      :header-cell-style="headerRowClassStyle"
      :row-class-name="tableRowClassName"
      show-summary
      style="width: 100%">
      <el-table-column type="index" width="50" :label="' '">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="120"
                       :show-overflow-tooltip="true" header-align="center"/>

      <el-table-column prop="name" label="名称" width="200"
                       header-align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" class="numberElTxt" :readonly="frmDisabled"/>
        </template>
      </el-table-column>

      <el-table-column prop="spec" label="规格" width="180"
                       header-align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.spec" class="numberElTxt" :readonly="frmDisabled"/>
        </template>
      </el-table-column>

      <el-table-column prop="content" label="含量" width="120"
                       :show-overflow-tooltip="true" header-align="center"/>

      <el-table-column prop="company" label="单位" width="80" align="center"
                       :show-overflow-tooltip="true" header-align="center"/>

      <el-table-column prop="proce" label="单价" width="160"
                       header-align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.proce" class="numberElTxt" :readonly="frmDisabled"/>
        </template>
      </el-table-column>

      <el-table-column prop="count" label="数量" width="160"
                       header-align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.count" size="mini" :disabled="frmDisabled"/>
          <!--<el-input v-model="scope.row.count"  class="numberElTxt"   :readonly="frmDisabled"/>-->
        </template>
      </el-table-column>

      <el-table-column prop="total" label="金额" width="160" :formatter="getTotal"
                       :show-overflow-tooltip="true" header-align="center"/>

      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="frmDisabled"
            type="text"
            @click="handleDelete(scope.$index, scope.row)">移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <CustomerSelect ref="customerSelect" :select="customerDo"/>
    <ProductSelect ref="productSelect" :select="productDo"/>

  </section>
</template>

<script>
  import CustomerSelect from '@/components/common/select/CustomerSelect.vue';
  import ProductSelect from '@/components/common/select/ProductSelect.vue';
  import {newOrderNumber, saveOrder, findByDayMax,delOrder,moveOrder} from "./orderFace"

  export default {
    components: {
      CustomerSelect,
      ProductSelect,

    },
    data() {
      return {
        state1: '',
        frmLoadding:false,
        frmDisabled: true,
        type: 'XS',
        from: {
          customer: '',
          date: new Date()
        },
        tableData: [],
        restaurants: [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
        ]

      }
    },
    computed: {},
    mounted: function () {
      findByDayMax(this, this.type, new Date());

    },
    methods: {
      querySearch(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      cardClick(type, e) {
        if (e.currentTarget.classList.contains("lsz-card-disabled")) {
          return;
        }

        switch (type) {
          case '新增':
            this.frmDisabled = false;
            this.from.date = new Date();
            newOrderNumber(this, this.type, this.from.date);
            break;
          case '编辑':
            this.frmDisabled = false;
            break;
          case '删除':
            delOrder(this)
            break;
          case '增行':
            this.showProductSelect();
            break;
          case '前单':
            moveOrder(this,'leftOrder');
            break;
          case '后单':
            moveOrder(this,'rightOrder');
            break;
          case '取消':
            this.frmDisabled = true;
            break;
          case '保存':
            saveOrder(this, function (vm) {
              vm.frmDisabled = true;
            });
            break;
        }

      },
      formatDate: function (d, format) {
        if (!d) {
          return "";
        }
        if (!format) {
          format = 'YYYY-MM-DD HH:mm:ss';
        }
        return this.$moment(d).format(format)
      },
      //显示选择客户窗口
      showCustomerSelect() {
        this.$refs.customerSelect.show();
      },
      //显示选择产品窗口
      showProductSelect() {
        this.$refs.productSelect.show();
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      headerRowClassStyle({row, rowIndex}) {
        return {background: '#EBEEF5', color: '#8c939d', fontSize: '15px'}
      },
      tableRowClassName({row, rowIndex}) {

        return 'my-row' + row.index;
      },
      //负责人 文本框点击
      fuzerenClick() {

      },
      //选择商品窗口回调
      productDo(row) {
        let obj = {
          number: row.number,
          name: row.name,
          spec: row.spec,
          content: row.content,
          company: row.company,
          proce: row.proce,
          count: row.count,
          total: row.total,
        }

        this.tableData.push(obj);
      },
      //获取金额
      getTotal(row) {
        let total = row.count * row.proce
        if (isNaN(total)) {
          total = 0;
        }
        //row.total = total;
        this.$set(row, 'total', total)
        return total;
      },
      //选择客户
      customerDo(row) {
        this.from.customer = row.name;
      },
      //删行
      handleDelete(index, row) {
        this.tableData.splice(index, 1)
      },
      //合计
      getSummaries(param) {
        const sumColName = ['数量', '金额'];
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (column.label == '名称') {
            sums[index] = '共 ' + this.tableData.length + " 条记录";
            return;
          }
          if (!sumColName.includes(column.label)) {
            return
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
//            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
    }
  }
</script>

<style scoped>
  .lsz-card {
    /*border: none;*/
  }

  .lsz-card i {
    font-size: 32px;
  }

  .lsz-card:hover {
    color: #E6A23C;
  }

  .lsz-card-disabled i {
    font-size: 30px;
  }

  .lsz-card-disabled {
    /*background-color: #F5F7FA;*/
    border: none;
    color: #C0C4CC;
  }

  .lsz-card {
    font-size: 12px;
    cursor: pointer;
  }


</style>
<style>
  .is-disabled input {
    background-color: #ffffff !important;
  }

  .numberElTxt input {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }
</style>
