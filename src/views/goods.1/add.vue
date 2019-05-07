<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" inline label-width="200px" size="mini">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" placeholder="商品名称" style="width:350px;" />
      </el-form-item>
      <el-form-item label="商品状态" prop="status">
        <el-radio v-model="form.status" label="1">下架</el-radio>
        <el-radio v-model="form.status" label="2">在售中</el-radio>
        <el-radio v-model="form.status" label="3">暂停销售</el-radio>
        <el-radio v-model="form.status" label="4">售罄</el-radio>
      </el-form-item>
      <el-form-item label="上线时间" prop="onlineTime">
        <el-date-picker
          v-model="form.onlineTime"
          style="width:350px;"
          type="datetime"
          placeholder="选择日期时间"
          align="right"/>
      </el-form-item>
      <el-form-item label="下线时间" prop="offlineTime">
        <el-date-picker
          v-model="form.offlineTime"
          style="width:350px;"
          type="datetime"
          placeholder="选择日期时间"
          align="right"/>
      </el-form-item>

      <el-form-item label="排序" prop="sorts">
        <el-input v-model="form.sorts" placeholder="请输入排序" type="number" style="width:350px;" />
      </el-form-item>
      <el-form-item label="库存" prop="turplusTotal">
        <el-input v-model="form.turplusTotal" style="width:350px;" type="number"/>
      </el-form-item>
      <el-form-item label="今日推荐">
        <el-switch v-model="form.recommend" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="开启限购" prop="quantityPurchased">
        <el-input v-model="form.quantityPurchased" placeholder="限购数量" type="number" style="width:350px;" />
      </el-form-item>

      <div class="topClassBorder"/>
      <div v-if=" form.assembleGoodsFormatList.length<1">
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model="form.marketPrice" style="width:350px;" type="number"/>
        </el-form-item>
        <el-form-item label="成本价" prop="originalPrice">
          <el-input v-model="form.originalPrice" style="width:350px;" type="number"/>
        </el-form-item>
        <el-form-item label="平台价" prop="platformPrice">
          <el-input v-model="form.platformPrice" style="width:350px;" type="number"/>
        </el-form-item>
        <el-form-item label="会员价" prop="memberPrice">
          <el-input v-model="form.memberPrice " style="width:350px;" type="number"/>
        </el-form-item>
      </div>
      <div >
        <el-form-item label="商品规格" >
          <el-button type="primary" icon="el-icon-edit" @click="addFormat" />
        </el-form-item>
      </div>

      <div v-if=" form.assembleGoodsFormatList.length>0">
        <div v-for="(item) in form.assembleGoodsFormatList" :key="item.sortIndex" >
          <div>
            <el-form-item
              :rules=" { required: true, message: '请输入规格名称', trigger: 'blur' }"
              :prop="'assembleGoodsFormatList.'+item.sortIndex+'.name'"
              label="名称"
              label-width="200px">
              <el-input v-model="form.assembleGoodsFormatList[item.sortIndex].name" style="width:100px;" />
            </el-form-item>
            <el-form-item
              :rules=" [{ required: true, message: '请输入市场价', trigger: 'blur' },{ validator: numberIsSuccess, trigger: 'blur' }]"
              :prop="'assembleGoodsFormatList.'+item.sortIndex+'.marketPrice'"
              label="市场价"
              label-width="70px"
            >
              <el-input v-model="form.assembleGoodsFormatList[item.sortIndex].marketPrice" style="width:100px;" type="number"/>
            </el-form-item>
            <el-form-item
              :rules=" [{ required: true, message: '请输入成本价', trigger: 'blur' },{ validator: numberIsSuccess, trigger: 'blur' }]"
              :prop="'assembleGoodsFormatList.'+item.sortIndex+'.originalPrice'"
              label="成本价"
              label-width="70px"
            >
              <el-input v-model="form.assembleGoodsFormatList[item.sortIndex].originalPrice" type="number" style="width:100px;" />
            </el-form-item>
            <el-form-item
              :rules=" [{ required: true, message: '请输入平台价', trigger: 'blur' },{ validator: numberIsSuccess, trigger: 'blur' }]"
              :prop="'assembleGoodsFormatList.'+item.sortIndex+'.platformPrice'"
              label="平台价"
              label-width="70px" >
              <el-input v-model="form.assembleGoodsFormatList[item.sortIndex].platformPrice" type="number" style="width:100px;" />
            </el-form-item>
            <el-form-item
              :rules=" [{ required: true, message: '请输入会员价', trigger: 'blur' },{ validator: numberIsSuccess, trigger: 'blur' }]"
              :prop="'assembleGoodsFormatList.'+item.sortIndex+'.memberPrice'"
              label="会员价"
              label-width="70px">
              <el-input v-model="form.assembleGoodsFormatList[item.sortIndex].memberPrice" type="number" style="width:100px;" />
            </el-form-item>
            <el-form-item
              :rules=" { required: true, message: '请输入库存', trigger: 'blur' }"
              :prop="'assembleGoodsFormatList.'+item.sortIndex+'.turplusTotal'"
              label="库存"
              label-width="50px"
            >
              <el-input v-model="form.assembleGoodsFormatList[item.sortIndex].turplusTotal" type="number" style="width:100px;" />
            </el-form-item>
            <el-form-item label="限购" label-width="50px" prop="quantityPurchased">
              <el-input v-model="form.assembleGoodsFormatList[item.sortIndex].quantityPurchased" style="width:100px;" type="number" placeholder="默认不限购,输入则限购" />
            </el-form-item>
            <el-form-item label="" label-width="50px">
              <el-button type="primary" icon="el-icon-plus" circle @click="addFormat"/>
              <el-button type="danger" icon="el-icon-minus" circle @click="remformat(item)"/>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="topClassBorder">
        <el-form-item label="商品标签" prop="assembleTagIds">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag.id"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
            {{ tag.tagName }}
          </el-tag>
          <el-input
            v-if="false"
            ref="saveTagInput"
            v-model="form.assembleTagIds"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
      </div>

      <div class="topClassBorder">
        <el-form-item label="商品图片" prop="pictures">
          <el-upload
            v-loading="loadingcardUp"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploads"
            class="avatar-uploader"
            action="" >
            <img v-if="form.pictures" :src="form.pictures" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
      </div>

      <div class="topClassBorder">
        <el-form-item label="商品介绍" prop="details">
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
      </div>
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
      multipleSelection: [],
      form: {
        assembleGoodsFormatList: [],
        goodsName: '',
        goodsClassifyId: '',
        status: '',
        originalPrice: '',
        marketPrice: '',
        platformPrice: '',
        memberPrice: '',
        onlineTime: '',
        offlineTime: '',
        sorts: '',
        turplusTotal: '',
        recommend: '',
        quantityPurchased: '',
        pictures: '',
        details: '<h2>I am Example</h2>'
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
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goodsClassifyId: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入选择状态', trigger: 'blur' }
        ],
        originalPrice: [
          { required: true, message: '请输入成本价', trigger: 'blur' },
          { validator: numberIsSuccess, trigger: 'blur' }
        ],
        marketPrice: [
          { required: true, message: '请输入市场价', trigger: 'blur' },
          { validator: numberIsSuccess, trigger: 'blur' }
        ],
        platformPrice: [
          { required: true, message: '请输入平台价', trigger: 'blur' },
          { validator: numberIsSuccess, trigger: 'blur' }
        ],
        memberPrice: [
          { required: true, message: '请输入会员价', trigger: 'blur' },
          { validator: numberIsSuccess, trigger: 'blur' }
        ],
        onlineTime: [
          { required: true, message: '请选择上线时间', trigger: 'blur' }
        ],
        offlineTime: [
          { required: true, message: '请选择下线时间', trigger: 'blur' }
        ],
        turplusTotal: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ],
        pictures: [
          { required: true, message: '请上传商品图片', trigger: 'blur' }
        ],
        details: [
          { required: true, message: '请输入商品介绍', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入规格名称', trigger: 'blur' }
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
        this.$store.dispatch('Doodsdetail', { goodId: id }).then((res) => {
          this.form = res.data
          for (let index = 0; index < this.form.assembleGoodsFormatList.length; index++) {
            this.form.assembleGoodsFormatList[index].sortIndex = index
          }
          this.dynamicTags = res.data.assembleTagList
          this.form.status = res.data.status + ''
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
      this.$store.dispatch('CreateOrEditGoods', this.form).then((res) => {
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
      this.$router.push('/goods/list')
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
            That.form.pictures = res.imageNginxPath + res.path
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
    quillUpload(param) {
      var That = this
      // 获取富文本组件实例
      const quill = this.$refs.myTextEditor.quill
      this.quillUpdateImg = true
      var reader = new FileReader()
      reader.readAsDataURL(param.file)
      reader.onload = function() {
        const base64 = reader.result
        const data = { imageBase64: base64 }
        That.$store.dispatch('UploadImageBase64', data).then((res) => {
          if (res.code === 0) {
            // That.form.pictures = res.imageNginxPath + res.path
            // 获取光标所在位置
            const length = quill.getSelection().index
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', res.imageNginxPath + res.path)
            // 调整光标到最后
            quill.setSelection(length + 1)
          } else {
            console.log('Error: ', res.msg)
          }
          That.quillUpdateImg = false
        }).catch(() => {
          That.quillUpdateImg = false
        })
      }
      reader.onerror = function(error) {
        console.log(error)
        this.$message.error('图片插入失败')
        That.quillUpdateImg = false
      }
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
/**
一帮傻逼设计的什么鸡巴玩意
*/
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
