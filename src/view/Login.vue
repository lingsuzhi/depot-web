<template>
  <section>
    <el-row v-if="error || !show" class="show-loading">
      <el-col :span="24">
        <label :style="error? {'color': '#F56C6C'} : {'color': '#409EFF'}">
          <i :class="error? 'el-icon-warning' : 'el-icon-loading'"></i>
          {{error?'无法链接网络，请刷新页面':'载入中，请稍候...'}}
        </label>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-center">
      <el-form v-show="show" :model="form" :rules="rule" ref="form" label-position="left" label-width="0px" class="login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="form.account" auto-complete="off" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"  @keyup.enter.native="login" />
        </el-form-item>

        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="loginIng">登录</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </section>
</template>

<style scoped="scoped"       lang="scss">
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 300px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0 auto 40px;
      text-align: center;
      color: #505458;
    }
  }

  .show-loading {
    background-clip: padding-box;
    margin: 200px auto;
    width: 100%;
    text-align: center;
  }
</style>
<script>

  let data = () =>{
    return {
      error: false,
      loginIng:false,
      show: false,
      form: {
        account: null,
        password: null,
      },
      rule: {
        account: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }],
      }
    }
  }
  export default {
    data: data,
    methods: {
      login : function() {
        let me = this;
        me.$refs.form.validate((valid) => {
          if (!valid) {
            return false;
          }

          let param = {
            name: me.form.account,
            pwd: me.form.password
          }
          me.loginIng = true
          me.$http.post('/admin/login', param).then(res => {
            me.loginIng = false;
            if (!res.data.success) {
              me.$message({
                message: res.data.message,
                type: 'error'
              });
              return
            }
            let body = res.data.data;
            sessionStorage.setItem('user', JSON.stringify(body))
            let token = body.token
            me.$http.defaults.headers[me.$constants.auth] = token
            me.$cookies.set(me.$constants.token, token)
            me.$router.push({
              path: '/'
            })
          }).catch(e => me.loginIng = false)
        })
      }

    },
    mounted: function() {
      this.show = true
    }
  }
</script>


