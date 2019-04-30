<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="200px" size="mini">
      <el-form-item label="姓名" prop="colonelName">
        <el-input v-model="form.colonelName" placeholder="请输入团长名字" style="width:350px;" />
      </el-form-item>
      <el-form-item label="小区" prop="village">
        <el-input v-model="form.village" placeholder="所属小区" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="团长详细地址" style="width:350px;" type="textarea"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" type="number" placeholder="请输入年龄" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择" style="width:350px;">
          <el-option label="男" value="1"/>
          <el-option label="女" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="form.idCard" style="width:350px;"/>
      </el-form-item>
      <el-form-item v-if="isEditor" label="银行卡号">
        <el-input v-model="form.toBankCard" disabled style="width:350px;"/>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="是否线下签约">
        <el-switch v-model="form.isLine" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="form.wechart" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="添加管理人员" >
        <el-input v-model="form.admin" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="团长提成" prop="royalty">
        <el-input v-model="form.royalty" placeholder="填写整数" style="width:350px;">
          <template slot="append">‰</template>
        </el-input>
      </el-form-item>
      <el-form-item label="身份证照片正面">
        <el-upload
          v-loading="loadingcardUp"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="uploads"
          class="avatar-uploader"
          action="" >
          <img v-if="form.cardUp" :src="form.cardUp" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="身份证照片反面">
        <el-upload
          v-loading="loadingcardDown"
          :show-file-list="false"
          :http-request="uploadsCardDown"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action=""
        >
          <img v-if="form.cardDown" :src="form.cardDown" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validateage = (rule, value, callback) => {
      if (!value) {
        callback()
      }
      if (value < 0 || value > 1000) {
        callback(new Error(''))
      }
      callback()
    }
    return {
      loadingcardUp: false,
      loadingcardDown: false,
      loading: false,
      isupdate: false,
      isEditor: false,
      form: {
        cardUp: '',
        cardDown: '',
        colonelName: '',
        village: '',
        address: '',
        age: '',
        gender: '',
        idCard: '',
        phone: '',
        isLine: false,
        wechart: '',
        admin: '',
        royalty: '',
        toBankCard: ''
      },
      rules: {
        colonelName: [
          { required: true, message: '请输入团长姓名', trigger: 'blur' }
        ],
        cardUp: [
          { required: true, message: '请上传身份证正面', trigger: 'blur' }
        ],
        cardDown: [
          { required: true, message: '请上传身份证反面', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入团长详细地址', trigger: 'blur' }
        ],
        village: [
          { required: true, message: '请输入小区', trigger: 'blur' }
        ],
        age: [
          // { required: true, message: '请输入年龄', trigger: 'blur' },
          { validator: validateage, message: '请输入正确的年龄', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        royalty: [
          { required: true, message: '请输入团长提成', trigger: 'blur' },
          { validator: validateage, message: '请输入正确的团长提成', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 新增
      const data = this.$route.params
      const id = this.$route.params.id
      if (data.addNew) {
        this.form.colonelName = data.colonelName
        this.form.address = data.address
        this.form.gender = data.gender === 1 ? '男' : '女'
        this.form.village = data.village
        this.form.phone = data.phone
      } else {
        this.isEditor = true
        if (id !== ':id') {
          this.loading = true
          this.$store.dispatch('Colonelinfo', { id: id }).then((res) => {
            this.form = res.data
            this.loading = false
            this.isupdate = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.form = {}
          this.isupdate = false
        }
      }
    },
    onSubmit() {
      let canCommit = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          canCommit = true
        } else {
          canCommit = false
        }
      })
      if (!canCommit) {
        return
      }
      this.loading = true
      if (this.isupdate) {
        delete this.form.createTime
        this.$store.dispatch('UpdateColonel', this.form).then((res) => {
          if (res.code === 0) {
            this.$message('修改成功!')
            this.onCancel()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.form.applyId = this.$route.params.id
        this.form.gender = this.form.gender === '男' ? 1 : 2
        this.$store.dispatch('ColonelSave', this.form).then((res) => {
          if (res.code === 0) {
            this.$message('添加成功!')
            this.form = {}
            this.onCancel()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    onCancel() {
      this.$router.push('/colonel/list')
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M
      return isLt2M
    },
    uploads(param) {
      var That = this
      this.loadingcardUp = true
      var reader = new FileReader()
      reader.readAsDataURL(param.file)
      reader.onload = function() {
        const base64 = reader.result
        const data = { imageBase64: base64 }
        That.$store.dispatch('UploadImageBase64', data).then((res) => {
          if (res.code === 0) {
            That.form.cardUp = res.imageNginxPath + res.path
          }
          That.loadingcardUp = false
        }).catch(() => {
          That.loadingcardUp = false
        })
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
        this.$message.error(error)
        That.loadingcardUp = false
      }
    },
    uploadsCardDown(param) {
      var That = this
      this.loadingcardDown = true
      var reader = new FileReader()
      reader.readAsDataURL(param.file)
      reader.onload = function() {
        const base64 = reader.result
        const data = { imageBase64: base64 }
        That.$store.dispatch('UploadImageBase64', data).then((res) => {
          if (res.code === 0) {
            That.form.cardDown = res.imageNginxPath + res.path
          }
          That.loadingcardDown = false
        }).catch(() => {
          That.loadingcardDown = false
        })
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
        this.$message.error(error)
        That.loadingcardDown = false
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

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
    width: 350px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 350px;
    height: 178px;
    display: block;
  }
</style>
