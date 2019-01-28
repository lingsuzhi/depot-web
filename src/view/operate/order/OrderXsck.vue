<template>
  <section>
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
            <el-input :readonly="true"></el-input>
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
            <el-input :readonly="frmDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="折扣">
            <el-input :readonly="frmDisabled"></el-input>
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
          <el-form-item label="负责人">
            <el-autocomplete
              @click="fuzerenClick"
              :disabled="frmDisabled"
              style="width: 100%"
              class="inline-input"
              v-model="state1"
              :hide-loading="true"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="备注">
            <el-input :readonly="frmDisabled"></el-input>
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
          <el-input-number v-model="scope.row.count" size="mini" :readonly="frmDisabled"/>
          <!--<el-input v-model="scope.row.count"  class="numberElTxt"   :readonly="frmDisabled"/>-->
        </template>
      </el-table-column>

      <el-table-column prop="total" label="金额" width="160" :formatter="getTotal"
                       :show-overflow-tooltip="true" header-align="center"/>

      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
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

  export default {
    components: {
      CustomerSelect,
      ProductSelect,

    },
    data() {
      return {
        state1: '',
        frmDisabled: true,
        from: {
          customer: '',
          date: ''
        },
        tableData: [],
        restaurants: [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
          {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
          {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
          {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
          {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
          {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"},
          {"value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107"},
          {"value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号"},
          {"value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号"},
          {"value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号"},
          {"value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"},
          {"value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层"},
          {"value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号"},
          {"value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路"},
          {"value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺"},
          {"value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819"},
          {"value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306"},
          {"value": "枪会山", "address": "上海市普陀区棕榈路"},
          {"value": "纵食", "address": "元丰天山花园(东门) 双流路267号"},
          {"value": "钱记", "address": "上海市长宁区天山西路"},
          {"value": "壹杯加", "address": "上海市长宁区通协路"},
          {"value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"},
          {"value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室"},
          {"value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"},
          {"value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6"},
          {"value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号"},
          {"value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号"},
          {"value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号"},
          {"value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号"},
          {"value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室"},
          {"value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1"},
          {"value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号"},
          {"value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室"},
          {"value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部"},
          {"value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B"},
          {"value": "浏阳蒸菜", "address": "天山西路430号"},
          {"value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路"},
          {"value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室"},
          {"value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号"},
          {"value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号"},
          {"value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位"},
          {"value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号"},
          {"value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼"},
          {"value": "阳阳麻辣烫", "address": "天山西路389号"},
          {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
        ]

      }
    },
    computed: {},
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
            break;
          case '增行':
            this.showProductSelect();
            break;
          case '取消':
            this.frmDisabled = true;
            break;

        }

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
        let obj = Object.assign({}, row)

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
          if (column.label == '名称'){
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
