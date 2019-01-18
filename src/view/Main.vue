<style lang="less">
  .content-container {
    .el-col-24 {
      margin-bottom: 20px;
    }
  }
</style>
<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" >

        <i class="fa fa-chevron-circle-right" style="font-size: 20px" v-show="collapsed" @click.prevent="collapse"></i>
        <span  @click.prevent="collapse">{{collapsed?'':sysName}} <i class="fa fa-list-ul" style="font-size: 20px;margin-left: 3px"></i></span>
      </el-col>
      <el-col :span="4">

      </el-col>
      <el-col :span="10" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">你好： {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown" class="dropdown-userinfo">
            <el-dropdown-item>
              <router-link to="/">首页</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="change">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
                 :style="collapsed ? {'width': '230px'} : {}" unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in menuData" v-if="!item.hidden">
            <el-submenu :index="index+''"
                        v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
              :class="item.iconCls"></i>{{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in menuData" v-if="!item.hidden" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title"
                   style="padding-left: 20px;"
                   @mouseover="showMenu(index,true)"
                   @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu"
                  :class="'submenu-hook-'+index"
                  @mouseover="showMenu(index,true)"
                  @mouseout="showMenu(index,false)">
                <li v-for="child in item.children"
                    v-if="!child.hidden"
                    :key="child.path"
                    class="el-menu-item"
                    style="padding-left: 40px;"
                    :class="$route.path==child.path?'is-active':''"
                    @click="$router.push(child.path)">{{child.name}}
                </li>
              </ul>
            </template>
            <template v-else>

            <div class="el-submenu__title el-menu-item"
                 style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                 :class="$route.path==item.children[0].path?'is-active':''"
                 @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>

</template>
</li>
</ul>
</aside>
<section class="content-container">
  <div class="grid-content bg-purple-light">
    <el-col :span="24" class="breadcrumb-container">
      <template v-if="$route.path==='/activityCenter/activityList'">
        <el-button type="primary"
                   @click="addActivity">添加活动
        </el-button>
      </template>
      <template v-if="!$route.path.includes('/activityCenter')">
        <strong class="title">{{$route.name}}</strong>
      </template>
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="content-wrapper">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </div>

</section>
</el-col>
<!--form-->
<el-dialog title="修改密码" :visible.sync="formVisible" :close-on-click-modal="false">
  <el-form :model="form" label-width="100px" :rules="rules" ref="form">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input type="password" v-model="form.oldPassword" auto-complete="off" placeholder="旧密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="form.newPassword" auto-complete="off" placeholder="新密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password">
      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click.native="formVisible = false">取消</el-button>
    <el-button type="primary" @click.native="submit" :loading="formLoading">提交</el-button>
  </div>
</el-dialog>
</el-row>
</template>

<script>

  const rules = {
    oldPassword: [{
      required: true,
      message: '请输入旧密码',
      trigger: 'blur'
    }],
    newPassword: [{
      required: true,
      message: '请输入新密码',
      trigger: 'blur'
    }],
    password: [{
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    }]
  }
  let data = () => {
    return {
      dialogTableVisible: false,
      /*
      basicSettingObj: {
        isShowBasicSeting: false,
        dialogVisible: false,
        basicSettingClass: false,
        title: '基本设置',
        width: '50%'
      },
      */
      // 控制显示活动dialog
      sysName: '后台管理',
      menuData: [],
      collapsed: false,
      formLoading: false,
      formVisible: false,
      rules: rules,
      sysUserName: '',
      form: {}
    }
  }

  let change = function () {
    this.form = {}
    this.formVisible = true
  }

  let submit = function () {
    this.formLoading = true
    this.$http.post('/changePassword/', this.form).then(res => {
      this.formLoading = false
      if (!res.data.success) {
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'error'
        })
        return
      }
      this.$message({
        type: 'success',
        message: '执行成功!'
      })
      this.formVisible = false
    }).catch(e => this.formLoading = false)
  }

  let initMenu = function (user) {

    user.admin = true;
    for (let i in this.$router.options.routes) {
      let root = this.$router.options.routes[i]
      if (user && user.admin) {
        this.menuData.push(root)
      } else {
        if (root.hidden)
          continue
        let dChildren = []
        for (let j in root.children) {
          let item = root.children[j]
          if (item.hidden)
            continue
          let flag = user.admin
          if (!flag) {
            for (let ditem of user.userRoleList) {
              for (let each of ditem.role.menuList) {
                if (each.menuId === item.path) {
                  flag = true
                  // break
                }
              }
            }
            if (flag)
              dChildren.push(item)
          }


        }
        /*
          for (let n in user.menuList) {
            if (user.menuList[n] == item.path) {
              flag = true
              break
            }
          }
          */
        /*
              if (flag)
                children.push(item)
            }
            */
        if (dChildren.length < 1)
          continue
        root.children = dChildren
        this.menuData.push(root)
        // root.children = children
      }
    }

  }


  let logout = function () {
    this.$confirm('确认退出吗?', '提示', {}).then(() => {
      if (this.$cookies.isKey(this.$constants.token)) {
        this.$cookies.remove(this.$constants.token)
      }
      this.$router.push('/login')
    }).catch(e => {
    })
  }

  export default {
    components: {

    },
    data: data,
    methods: {
      initMenu,
      change,
      submit,
      //退出登录
      logout,
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed
      },
      receiveSubmit() {
      },
      showMenu: function (i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
      },
      addActivity() {
        this.dialogTableVisible = true
      },
      closeDialog() {
        this.dialogTableVisible = false
      }
    },
    beforeMount() {
      this.$http.get('/admin/getCurrentUser', this.form).then(res => {
        if (!res.data.success) {
          return
        }
        let user = res.data.data
        sessionStorage.setItem('user', JSON.stringify(user))
        this.sysUserName = user.name ? user.name : user.userId
        // this.initMenu(user)
      }).catch(e => this.logining = false)
    },
    mounted: function () {
      var userJson = sessionStorage.getItem('user')
      if (userJson) {
        let user = JSON.parse(userJson)
        this.sysUserName = user.name ? user.name : user.account
        this.initMenu(user)
        return
      }
      /*
          this.$http.get('/getCurrentUser', this.form).then(res => {
            if (!res.data.success) {
              return
            }
            let user = res.data.data
            sessionStorage.setItem('user', JSON.stringify(user))
            this.sysUserName = user.name ? user.name : user.account
            this.initMenu(user)
          }).catch(e => this.logining = false)
          */
    }
  }
</script>
<style lang="less">
  .el-icon-date {
    font-size: 10px !important;
    width: 10px !important;
    margin-right: 10px !important;
  }
  .el-menu-item {
    background-color: #EEE  !important;
  }

</style>

<style scoped="scoped"
       lang="scss">
  $background: #409EFF;

  .dropdown-userinfo {
    a:link {
      color: #606266;
      text-decoration: none;
    }
    a:active {
      color: #606266;
    }
    a:visited {
      color: #606266;
      text-decoration: none;
    }
    a:hover {
      color: #409EFF;
      text-decoration: none;
    }
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: $background;
      color: #fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
        small {
          font-size: 10px;
          margin-left: 20px;
        }
      }
      .logo-width {
        width: 230px;
      }
      .logo-collapse-width {
        width: 60px;
      }
      .tools {
        padding: 0 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        .el-menu {
          height: 100%;
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
          }
        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }
      .content-container {
        flex: 1;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            color: $background;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
