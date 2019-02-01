<template>
  <section>
    <el-dialog v-dialogDrag title="选择字体" :visible.sync="visible"
               :close-on-click-modal="false">
      <el-row>
        <el-col :span="10">
          <el-form v-model="font" align="left">

            <el-form-item label="字体">
              <el-select v-model="font.fontFamily" placeholder="字体" clearable>
                <el-option :value="'宋体'"></el-option>
                <el-option :value="'仿宋'"></el-option>
                <el-option :value="'新宋体'"></el-option>
                <el-option :value="'楷体'"></el-option>
                <el-option :value="'隶书'"></el-option>
                <el-option :value="'微软雅黑'"></el-option>
                <el-option :value="'幼圆'"></el-option>
                <el-option :value="'黑体'"></el-option>
                <el-option :value="'华文仿宋'"></el-option>
                <el-option :value="'Arial'"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="格式">
              <el-select v-model="font.fontWeight" placeholder="格式" clearable>
                <el-option :value="'常规'"></el-option>
                <el-option :value="'粗体'"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="大小">
              <el-select v-model="font.fontSize" placeholder="大小" clearable>
                <el-option :value="'9px'"></el-option>
                <el-option :value="'10px'"></el-option>
                <el-option :value="'11px'"></el-option>
                <el-option :value="'12px'"></el-option>
                <el-option :value="'13px'"></el-option>
                <el-option :value="'14px'"></el-option>
                <el-option :value="'15px'"></el-option>
                <el-option :value="'16px'"></el-option>
                <el-option :value="'17px'"></el-option>
                <el-option :value="'18px'"></el-option>
                <el-option :value="'19px'"></el-option>
                <el-option :value="'20px'"></el-option>
                <el-option :value="'22px'"></el-option>
                <el-option :value="'24px'"></el-option>
                <el-option :value="'26px'"></el-option>
                <el-option :value="'28px'"></el-option>
                <el-option :value="'30px'"></el-option>
                <el-option :value="'36px'"></el-option>
                <el-option :value="'48px'"></el-option>
                <el-option :value="'72px'"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker
                v-model="font.color"
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
          </el-form>
        </el-col>
        <el-col :span="14">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>示例</span>
            </div>
            <div :style="fontResult">
              这是一段文本abcDEF123
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-button icon="el-icon-edit" type="primary" @click="submit">确定</el-button>
      <el-button icon="el-icon-delete" @click="hide()">取消</el-button>


    </el-dialog>
  </section>
</template>

<script>
  let data = () => {
    return {
      visible: false,
      font: {
        fontFamily: '宋体',
        fontSize: '16px',
        fontWeight: '常规',
        color: '#333333'
      },
      oldFont: {},
    }
  }
  export default {
    data: data,
    props: [],
    computed: {
      fontResult: function () {
        let fontFamily = this.font.fontFamily;
        if (!fontFamily) {
          fontFamily = "宋体"
        }
        let fontSize = this.font.fontSize;
        if (!fontSize) {
          fontSize = '16px'
        }
        let obj = {
          fontFamily: fontFamily,
          fontSize: fontSize
        };
        if (this.font.fontWeight == '粗体') {
          obj.fontWeight = 'bold'
        }
        obj.color = this.font.color;
        return obj;
      }
    },
    methods: {
      show(font) {
        this.oldFont = font;
        if (font) {
          this.font = Object.assign({}, font);
        }

        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      submit() {
        if (this.oldFont) {
          Object.assign(this.oldFont, this.font);
        }
        this.hide();
      }
    }
  }
</script>

<style scoped>

</style>
