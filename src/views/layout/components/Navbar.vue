<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span
            style="display:block;"
            @click="changePassword" >修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog v-if="addDialog" :visible.sync="addDialog" title="修改密码" size="small">
      <el-form v-loading="loadingDialog" ref="form" :rules="rules" :model="form" label-width="200px" size="mini">
        <el-form-item label="旧密码" prop="password" >
          <el-input v-model="form.password" placeholder="旧密码" type="password" style="width:250px;" />
        </el-form-item>
        <el-form-item label="新密码" prop="changePassword">
          <el-input v-model="form.changePassword" placeholder="新密码" type="password" style="width:250px;"/>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPassword">
          <el-input v-model="form.repeatPassword" placeholder="重复密码" type="password" style="width:250px;"/>
        </el-form-item>
        <div style="margin-top:20px;text-align: center;">
          <el-button
            type="primary"
            size="mini"
            @click="updatePed('form')"
          >确定</el-button>
          <el-button size="mini" @click="addDialog=false">Cancel</el-button>

        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      addDialog: false,
      loadingDialog: false,
      rules: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        changePassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        repeatPassword: [
          { required: true, message: '请输入重复密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      form: {}
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    changePassword() {
      this.addDialog = true
      this.form = {}
    },
    updatePed(formName) {
      let canCommit = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          canCommit = true
        } else {
          canCommit = false
        }
      })
      if (!canCommit) {
        return
      }
      this.loadingDialog = true
      delete this.form.createDate
      this.$store.dispatch('ChangePassword', this.form).then((res) => {
        if (res.code === 0) {
          this.$message('修改成功!')
          this.logout()
        }
        this.loadingDialog = false
      }).catch(() => {
        this.loadingDialog = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

