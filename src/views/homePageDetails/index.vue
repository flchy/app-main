<template>
  <div class="app-container">
    <el-form v-loading="loading" ref="form" :model="form" :rules="rules" label-width="200px" size="mini" class="homebbbb">

      <el-form-item label="banner图" prop="images">
        <el-upload
          v-loading="loadingcardUp"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :http-request="uploads"
          :file-list="imgList"
          v-model="form.images"
          width="300px"
          action=""
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img :src="dialogImageUrl" width="100%" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="积分商城介绍" prop="scoreScDetails">
        <el-input v-model="form.scoreScDetails" :autosize="{ minRows: 2, maxRows: 20}" style="width:500px;" type="textarea" />
      </el-form-item>
      <el-form-item label="积分商城产品介绍" prop="productScDetails">
        <el-input v-model="form.productScDetails" :autosize="{ minRows: 5, maxRows: 20}" style="width:500px;" type="textarea"/>
      </el-form-item>

      <div >
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HomePageDetails',

  data() {
    return {
      quillUpdateImg: false,
      formatList: [],
      imgList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      multipleSelection: [],
      form: {

      },
      dynamicTags: [],
      longitude: '',
      latitude: '',
      addDialog: false,
      addDialogTable: false,
      loadingcardUp: false,
      loadingcardDown: false,
      loading: false,
      loading1: false,
      isupdate: false,
      classify: [],
      tableData: [],
      rules: {

        // images: [
        //   { required: true, message: '请上传图片', trigger: 'blur' }
        // ],
        scoreScDetails: [
          { required: true, message: '请输入积分商城介绍', trigger: 'blur' }
        ],
        productScDetails: [
          { required: true, message: '请输入积分商城产品介绍', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.form.details = html
    },
    init() {
      this.loading = true

      this.$store.dispatch('GethomePageDetails').then((res) => {
        this.form = res.data
        this.imgList = []
        res.data.banner.forEach(l => {
          this.imgList.push({ url: l })
        })
        this.form.images = this.imgList.map(l => l.url).join(',')
        this.loading = false
        this.isupdate = true
      }).catch(() => {
        this.loading = false
      })
    },
    onSubmit(formName) {
      console.log(this.form)
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
      this.loading = true
      this.form.banner = this.form.images
      this.$store.dispatch('EditHomePageDetails', this.form).then((res) => {
        if (res.code === 0) {
          this.$message('修改成功!')
          this.init()
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
      const formData = new FormData()
      formData.append('imgs', param.file)
      That.$store.dispatch('UploadImage', formData).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.imgList.push({ name: param.file.name, url: res.data[0] })
          this.form.images = this.imgList.map(l => l.url).join(',')
        }
        That.loadingcardUp = false
      }).catch(() => {
        That.loadingcardUp = false
      })
    },
    handleRemove(file, fileList) {
      var index = this.imgList.indexOf(file)
      if (index > -1) {
        this.imgList.splice(index, 1)
      }
      this.form.images = this.imgList.map(l => l.url).join(',')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    saveColonel(data) {
      this.form.colonelId = data.id
      this.form.colonelName = data.colonelName
      this.addDialogTable = false
    },

    dateFormat1: function(date) {
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
  .topClassBorder{
    border-top:2px solid rgb(37, 155, 36);
    padding-top:10px;
  }
  .specifications .el-form-item__label{
    width: 50px;
  }
   .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .ql-editor{
    min-height:300px;
  }
.homebbbb  .el-upload-list--picture-card .el-upload-list__item {
    width: 250px;
  }
</style>
