<template>
<section>

  <el-row :gutter="20" class="block">
    <el-col :span="6">
      <div class="grid-content" style="background: #67C23A;">
        <div class="color-box">
          <div><small>会员总数</small>{{ model.memberTotal? model.memberTotal : 0 }}</div>
          <span class="value"><small>今日新增</small>{{ model.memberToday? model.memberToday : 0 }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" style="background: #E6A23C;">
        <div class="color-box">
          <div><small>实名总数</small>{{ model.realnameTotal? model.realnameTotal : 0 }}</div>
          <span class="value"><small>今日实名</small>{{ model.realnameToday? model.realnameToday : 0 }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" style="background: #F56C6C;">
        <div class="color-box">
          <div><small>月活跃数</small>{{ model.loginMonth? model.loginMonth : 0 }}</div>
          <span class="value"><small>日活跃数</small>{{ model.loginToday? model.loginToday : 0 }}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" style="background: #409EFF;">
        <div class="color-box">
          <div><small>总交易数</small>{{ model.tradeTotal? model.tradeTotal : 0 }}</div>
          <span class="value"><small>今日交易数</small>{{ model.tradeToday? model.tradeToday : 0 }}</span>
        </div>
      </div>
    </el-col>
  </el-row>

</section>
</template>

<script>
let data = () => {
  return {
    model: {}
  }
}

export default {
  data: data,
  methods: {

  },
  mounted: function() {

  }
}
</script>

<style scoped
  lang="scss">
.block {
    margin: 20px;
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        height: 120px;
        text-align: center;

        .color-box {
            div {
                padding-top: 40px;
                padding-bottom: 6px;
                font-size: 26px;
                color: #fff;
                small {
                    font-size: 16px;
                    padding-right: 8px;
                }
            }
            span {

                line-height: 0;
                color: #E4E7ED;
                small {
                    font-size: 8px;
                    padding-right: 4px;
                }
            }
        }
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>
