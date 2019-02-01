<template>
  <section>
    <el-row>
      <el-col :span="19">
        <canvas id="myCanvas" width="1200" height="1600" tabindex="1110">
          你的浏览器不支持canvas
        </canvas>
      </el-col>
      <el-col :span="5" style="padding-top: 5px;padding-left: 6px;">
        <el-card shadow="always">
          <el-row>
            <el-select v-model="selectVal" placeholder="请选择">
              <el-option
                v-for="item in canvas.objArr"
                :key="item.id"
                :label="item.type + item.id"
                :value="item.id">
              </el-option>
            </el-select>
          </el-row>

          <el-row>

            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="属性"
                header-align="center"
                width="80">
                <template slot-scope="scope">
                  <el-popover trigger="hover" :disabled="!scope.row.tag">
                    <p>说明: {{ scope.row.tag }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span style="margin-left: 10px">{{ scope.row.key }}</span>
                    </div>

                  </el-popover>

                </template>
              </el-table-column>
              <el-table-column
                label="参数"
                header-align="center"
                min-width="120">
                <template slot-scope="scope">

                  <el-input-number size="mini" v-if="typeof (tableObj[scope.row.value]) =='number'"
                                   v-model="tableObj[scope.row.value]" @change="txtChange"></el-input-number>

                  <el-autocomplete :readonly="true"
                    size="mini" v-else-if="querySearch[scope.row.value]" v-model="tableObj[scope.row.value]" @change="txtChange"
                    :fetch-suggestions="querySearch[scope.row.value]"
                    class="inline-input"
                  ></el-autocomplete>

                  <el-input size="mini" v-else v-model="tableObj[scope.row.value]" @change="txtChange"></el-input>
                </template>
              </el-table-column>
            </el-table>

          </el-row>
        </el-card>
      </el-col>

    </el-row>
  </section>
</template>

<script>
  import LszCanvas from "@/common/canvas/LszCanvas"

  let data = () => {
    return {
      selectVal: '',
      tableObj: {},
      canvas: '',
      tableData: [],

      querySearch: {
        align: function (queryString, cb) {

          cb([
            {"value": "左对齐"},
            {"value": "居中"},
            {"value": "右对齐"}]);
        },
      }
    }
  }

  export default {
    data: data,
    components: {},
    methods: {
      setType(type) {
        this.canvas.setType(type);
      },
      txtChange() {
        this.canvas.refresh();
      },
      inputBox(obj) {
        this.$prompt('请输入内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: obj.text,
        }).then(({value}) => {
          obj.text = value;
          this.canvas.refresh();
        }).catch(() => {

        });
      }
    },
    watch: {
      selectVal: function (id) {
        let vm = this;
        let obj = this.canvas.findObjById(id);
        if (!obj) {
          vm.tableData = [];
          return;
        }
        if (obj.focus !== true) {
          this.canvas.selectObj(obj);
        }

        vm.tableObj = obj;
        vm.tableData = [
          {
            key: '左边距',
            value: 'left',
            tag: '距离左边的距离'
          },
          {
            key: '上边距',
            value: 'top'
          },
          {
            key: '宽度',
            value: 'wid'
          },
          {
            key: '高度',
            value: 'hei'
          },
          {
            key: '文本',
            value: 'text'
          },
          {
            key: '对其',
            value: 'align'
          },
        ]
      },
    },
    mounted: function () {
      this.canvas = new LszCanvas('myCanvas');
      let vm = this;
      this.canvas.inputBox = this.inputBox;
      this.canvas.focusChangeFun = function (obj) {
        if (!obj) {
          vm.selectVal = '';
          return;
        }
        vm.selectVal = obj.id;
      }
    }
  }
</script>

<style scoped>
  canvas:focus {
    outline: none
  }
</style>
