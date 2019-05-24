<template>
  <div class="app-container">
    <el-form v-loading="loading" ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
      <el-form-item label="公告" prop="details">
        <!-- 图片上传组件辅助-->
        <el-upload
          id="quill-upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="quillUpload"
          class="avatar-uploader"
          action=""
          hidden="true"
        />
        <quill-editor
          v-loading="quillUpdateImg"
          ref="myTextEditor"
          v-model="form.details"
          :options="editorOption"
          height="300px"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"/>
      </el-form-item>
      <div >
        <el-form-item label=" ">
          <el-button v-loading="loading" type="primary" @click="onSubmit('form')">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { numberIsSuccess } from '@/utils/validate'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link', 'image', 'video']
]

export default {
  name: 'AddShop',
  components: {
    numberIsSuccess
  },
  data() {
    return {
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  document.querySelector('#quill-upload input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      quillUpdateImg: false,
      formatList: [],
      imgList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      multipleSelection: [],
      form: {
        details: ''
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
        details: [
          { required: true, message: '请输入公告', trigger: 'blur' }
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
      this.$store.dispatch('GetNotice').then((res) => {
        if (res.data) {
          this.form = res.data
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    numberIsSuccess: numberIsSuccess,
    onSubmit(formName) {
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
      delete this.form.createDate
      this.$store.dispatch('EditNotice', this.form).then((res) => {
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
          this.form.picture = this.imgList.map(l => l.url).join(',')
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
      this.form.picture = this.imgList.map(l => l.url).join(',')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    quillUpload(param) {
      var That = this
      // 获取富文本组件实例
      const quill = this.$refs.myTextEditor.quill

      this.quillUpdateImg = true
      const formData = new FormData()
      formData.append('imgs', param.file)
      That.$store.dispatch('UploadImage', formData).then((res) => {
        if (res.code === 0) {
          // 获取光标所在位置
          const length = quill.getSelection().index
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.data[0])
          // 调整光标到最后
          quill.setSelection(length + 1)
        }
        That.quillUpdateImg = false
      }).catch(() => {
        That.quillUpdateImg = false
      })
    },
    saveColonel(data) {
      this.form.colonelId = data.id
      this.form.colonelName = data.colonelName
      this.addDialogTable = false
    },
    addFormat() {
      if (!this.form.assembleGoodsFormatList) {
        this.form.assembleGoodsFormatList = [{ sortIndex: 0, name: '' }]
      } else {
        this.form.assembleGoodsFormatList.push({ sortIndex: this.form.assembleGoodsFormatList.length, name: '' })
      }
    },
    remformat(item) {
      var index = this.form.assembleGoodsFormatList.indexOf(item)
      if (index > -1) {
        this.form.assembleGoodsFormatList.splice(index, 1)
        this.form.assembleGoodsFormatList.forEach((l, index) => {
          this.form.assembleGoodsFormatList[index].sortIndex = index
        })
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.addDialogTable = true
      this.loading1 = true
      this.$store.dispatch('TagList').then((res) => {
        this.tableData = res.data
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
      })
    },
    addlnglat() {
      if (this.dynamicTags) {
        if (this.multipleSelection) {
          this.multipleSelection.forEach(sel => {
            let indexto = -1
            for (let index = 0; index < this.dynamicTags.length; index++) {
              const element = this.dynamicTags[index]
              if (element.id === sel.id) {
                indexto = index
                break
              }
            }
            console.log(indexto)
            if (indexto === -1) {
              this.dynamicTags.push(sel)
            }
          })
        }
      } else {
        this.dynamicTags = this.multipleSelection
      }
      this.addDialogTable = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
</style>
