<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="tableData"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="payName"
        label="收款方式"
      />
      <el-table-column
        prop="accountNumber"
        label="收款账号"
      />
      <el-table-column
        prop="accountName"
        label="收款人名称"
      />
      <el-table-column
        label="二维码地址"
      >
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">
              <img :src="scope.row.qrCode" width="400px" height="400px">
            </div>
            <img :src="scope.row.qrCode" width="40px" height="40px">
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="addColonel(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="addDialog" :visible.sync="addDialog" title="操作" size="small">
      <div >
        <el-form v-loading="loading1" ref="form" :model="form" :rules="rules" label-width="200px" size="mini">
          <el-form-item label="收款方式" prop="payName">
            <el-input v-model="form.payName" disabled="" style="width:200px;" />
          </el-form-item>
          <el-form-item label="收款账号" prop="accountNumber">
            <el-input v-model="form.accountNumber" style="width:200px;" />
          </el-form-item>
          <el-form-item label="收款人名称" prop="accountName">
            <el-input v-model="form.accountName" style="width:200px;" />
          </el-form-item>
          <el-form-item label="二维码地址" prop="qrCode">
            <!-- <el-input v-model="form.qrCode" style="width:200px;" /> -->
            <el-upload
              v-loading="loadingcardUp"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="uploads"
              class="avatar-uploader"
              action="" >
              <img v-if="form.qrCode" :src="form.qrCode" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button v-loading="loading" type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="addDialog=false">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loadingcardUp: false,
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      addDialog: false,
      form: {
        cityCode: '',
        provinceCode: ''
      },
      loading: false,
      loading1: false,
      citys: [],
      citys1: [],
      rules: {
        accountNumber: [
          { required: true, message: '请输入收款账号', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '请输入收款人名称', trigger: 'blur' }
        ],
        qrCode: [
          { required: true, message: '请上传二维码地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getPage()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    getPage() {
      this.loading = true
      this.$store.dispatch('SelectPayWay').then((res) => {
        this.tableData = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addColonel(data) {
      this.addDialog = true
      this.form.id = data.id
      this.form.accountNumber = data.accountNumber
      this.form.payName = data.payName
      this.form.accountName = data.accountName
      this.form.qrCode = data.qrCode
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
      this.loading1 = false
      this.$store.dispatch('PutPayWay', this.form).then((res) => {
        if (res.code === 0) {
          this.$message('修改成功!')
          this.form = {}
          this.addDialog = false
          this.init()
        }
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
      })
    },
    uploads(param) {
      var That = this
      this.loadingcardUp = true
      const formData = new FormData()
      formData.append('imgs', param.file)
      That.$store.dispatch('UploadImage', formData).then((res) => {
        if (res.code === 0) {
          That.form.qrCode = res.data[0]
        }
        That.loadingcardUp = false
      }).catch(() => {
        That.loadingcardUp = false
      })
    }
  }
}
</script>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
