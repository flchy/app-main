<template>
  <div class="app-container">
    <el-form v-loading="loading" ref="form" :model="form" :rules="rules" label-width="200px" size="mini">
      <el-form-item label="名称" prop="couponName">
        <el-input v-model="form.couponName" placeholder="名称" style="width:350px;" />
      </el-form-item>

      <el-form-item label="发放时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          style="width:350px;"
          type="datetime"
          placeholder="选择日期时间"
          align="right"/>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          style="width:350px;"
          type="datetime"
          placeholder="选择日期时间"
          align="right"/>
      </el-form-item>
      <el-form-item label="针对用户类型" prop="userType">
        <el-radio v-model="form.userType" label="0">所有用户</el-radio>
        <el-radio v-model="form.userType" label="1">普通用户</el-radio>
        <el-radio v-model="form.userType" label="2">会员用户</el-radio>
      </el-form-item>
      <el-form-item label="发行量" prop="circulation">
        <el-input v-model="form.circulation" type="number" style="width:350px;" />
      </el-form-item>
      <el-form-item label="优惠规则" prop="type">
        <el-radio v-model="form.type" label="0">满减</el-radio>
        <el-radio v-model="form.type" label="1">现金</el-radio>
      </el-form-item>
      <div>
        <el-form-item v-if="form.type==='0'" label="满减:">
          <el-form-item label="使用条件" prop="full" label-width="100px">
            <el-input v-model="form.full" type="number" placeholder="请填写消费额度" style="width:200px;" />
          </el-form-item>
          <el-form-item label="优惠额度" prop="reduce" label-width="100px" inline>
            <el-input v-model="form.reduce" type="number" placeholder="请填写优惠额度，即减多少" style="width:200px;" />
          </el-form-item>
        </el-form-item>
        <el-form-item v-if="form.type==='1'" label="现金:">
          <el-form-item label="优惠额度" prop="reduce" label-width="100px" inline>
            <el-input v-model="form.reduce" type="number" placeholder="请填写优惠额度，即减多少" style="width:200px;" />
          </el-form-item>
        </el-form-item>
      </div>
      <el-form-item label="优惠卷封面" prop="couponImage">
        <el-upload
          v-loading="loadingcardUp"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="uploads"
          class="avatar-uploader"
          action="" >
          <img v-if="form.couponImage" :src="form.couponImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="优惠卷内容" prop="content">
        <el-input v-model="form.content" type="textarea" style="width:350px;" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      loading: false,
      loadingcardUp: false,
      form: {
        couponName: '',
        startTime: '',
        endTime: '',
        userType: '',
        circulation: '',
        type: '',
        full: '',
        reduce: '',
        couponImage: ''
      },
      rules: {
        couponName: [
          { required: true, message: '请输入优惠卷名称', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择发放时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        circulation: [
          { required: true, message: '请输入发行量', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请先选择优惠规则', trigger: 'blur' }
        ],
        full: [
          { required: true, message: '请输入使用条件，即满多少', trigger: 'blur' }
        ],
        reduce: [
          { required: true, message: '请输入优惠额度，即减多少', trigger: 'blur' }
        ],
        couponImage: [
          { required: true, message: '请上传优惠卷图片', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
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
      this.form.startTime = this.dateFormat(this.form.startTime)
      this.form.endTime = this.dateFormat(this.form.endTime)
      this.$store.dispatch('SaveCoupon', this.form).then((res) => {
        if (res.code === 0) {
          this.$message('添加成功!')
          this.form = {}
          this.onCancel()
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onCancel() {
      this.$router.push('/operate/list')
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
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
            That.form.couponImage = res.imageNginxPath + res.path
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
    dateFormat: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
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
  .amap-demo {
      height: 300px;
    }
</style>
