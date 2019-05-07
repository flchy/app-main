<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="200px" size="mini">
      <el-form-item label="商品名称" prop="title" >
        <el-input v-model="form.title" placeholder="商品名称" style="width:350px;" />
      </el-form-item>

      <el-form-item label="数量" prop="total">
        <el-input v-model="form.total" style="width:350px;" type="number"/>
      </el-form-item>

      <el-form-item label="报单积分" prop="tradeScore">
        <el-input v-model="form.tradeScore" style="width:350px;" type="number"/>
      </el-form-item>

      <el-form-item label="商品图片" prop="images">
        <el-upload
          v-loading="loadingcardUp"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :http-request="uploads"
          :file-list="imgList"
          v-model="form.images"
          action=""
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img :src="dialogImageUrl" width="100%" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
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
      <el-form-item label="收益率" prop="annualizedRate">
        <el-input v-model="form.annualizedRate" style="width:350px;" type="number">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="到期后转入消费积分占比" prop="consumeRate">
        <el-input v-model="form.consumeRate" style="width:350px;" type="number">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>

      <div >
        <el-form-item label=" ">
          <el-button v-loading="loading" type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog v-if="addDialogTable" :visible.sync="addDialogTable" title="选择团长" size="small">
      <el-table
        v-loading="loading1"
        :data="tableData"
        size="mini"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="tagName"
          label="标签名称"
        />

        <el-table-column
          prop="sort"
          label="排序"
        />

      </el-table>
      <div style="text-align: center;">
        <el-button v-loading="loading" style="margin-top: 25px;" size="mini" type="primary" @click="addlnglat">确定</el-button>
        <el-button size="mini" @click="addDialogTable=false">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
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
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],

        total: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        tradeScore: [
          { required: true, message: '请输入报单积分', trigger: 'blur' }
        ],
        images: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        annualizedRate: [
          { required: true, message: '请输入收益率', trigger: 'blur' }
        ],
        consumeRate: [
          { required: true, message: '到期后转入消费积分占比', trigger: 'blur' }
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
      // this.$store.dispatch('ClassifyGetAll', { }).then((res) => {
      //   this.classify = res.data
      //   this.loading = false
      // }).catch(() => {
      //   this.loading = false
      // })
      const id = this.$route.params.id
      if (id !== ':id') {
        this.loading = true
        this.$store.dispatch('FinancialProductstail', { id: id }).then((res) => {
          this.form = res.data
          res.data.imagess.forEach(l => {
            this.imgList.push({ url: l })
          })
          this.form.images = this.imgList.map(l => l.url).join(',')
          this.loading = false
          this.isupdate = true
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.form = {
          assembleGoodsFormatList: []
        }
        this.isupdate = false
        this.loading = false
      }
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
      var assembleTagList = []
      if (this.dynamicTags) {
        this.dynamicTags.forEach(val => {
          assembleTagList.push(val.id)
        })
      }

      this.form.assembleTagIds = assembleTagList
      this.loading = true
      this.form.startTime = this.dateFormat1(this.form.startTime)
      this.form.endTime = this.dateFormat1(this.form.endTime)
      this.$store.dispatch('CreateOrEditFinancialProducts', this.form).then((res) => {
        if (res.code === 0) {
          if (this.isupdate) {
            this.$message('修改成功!')
          } else {
            this.$message('添加成功!')
          }
          this.form = { assembleGoodsFormatList: [] }
          this.onCancel()
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onCancel() {
      this.$router.push('/financialProducts/list')
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

    dateFormat1: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
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
