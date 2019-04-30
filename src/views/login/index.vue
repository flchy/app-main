<template>
  <div class="user-login">
    <div :style="{'background-image':`url(${backgroundImage})`}" class="user-login-bg"/>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用 <br > 后台管理系统
      </h2>
      <div class="form-container loginform">
        <h4 class="form-title">登录</h4>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="userName">
                  <div class="form-line">
                    <i class="el-icon-edit-outline input-icon"/>
                    <el-input
                      v-model="loginForm.userName"

                      placeholder="账号"/>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password">
                  <div class="form-line">
                    <i class="el-icon-service input-icon"/>
                    <el-input v-model="loginForm.password" type="password" placeholder="密码" @keyup.enter.native="handleLogin"/>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <!-- <el-col>
                <el-form-item>
                  <el-checkbox class="checkbox">记住账号</el-checkbox>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click.native.prevent="handleLogin">
                登 录
              </el-button>
            </el-row>
          </div>
          <el-row class="tips">
            <a href="/" class="link">
              立即注册
            </a>
            <span class="line">|</span>
            <a href="/" class="link">
              忘记密码
            </a>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import backgroundImage from '@/assets/loginbg.png'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      backgroundImage: backgroundImage,
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';

</style>
<style >
.loginform .el-input__inner{
  border:0px;
  outline: none;
  cursor: pointer;
}
</style>
