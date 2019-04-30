<template>
  <div class="app-container">
    <div class="man-btn">
      <el-form
        :model="form"
        inline
        size="mini"
      >
        <el-form-item
          label=" "
        />
        <el-button
          type="primary"
          size="mini"
          @click="

            addColonel
          "
        >添加</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="slideShowName"
        label="名称"
      />
      <el-table-column
        label="图片"
      >
        <template slot-scope="scope">
          <img :src="scope.row.pictures" width="40px" height="40px">
        </template>

      </el-table-column>
      <el-table-column
        prop="sortIndex"
        label="展示顺序"
      />
      <el-table-column
        label="发布时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status===0?'停用':'启用' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="details"
        label="描述"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status===0"
            type="primary"
            size="mini"
            @click="enableSlideshow(scope.row)"
          >启用</el-button>
          <el-button
            v-if="scope.row.status===1"
            type="warning"
            size="mini"
            @click="prohibitSlideshow(scope.row)"
          >停用</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="editColonel(scope.row)"
          >修改</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteColonel(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total="totalCount"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog v-if="addDialog" :visible.sync="addDialog" title="操作" size="small">

      <el-form ref="form" :model="form" :rules="rules" label-width="200px" size="mini">
        <el-form-item label="名称" prop="slideShowName">
          <el-input v-model="form.slideShowName" placeholder="名称" style="width:350px;" />
        </el-form-item>
        <el-form-item label="跳转位置" prop="jumpPosition">
          <el-input v-model="form.jumpPosition" placeholder="跳转位置" style="width:350px;" />
        </el-form-item>
        <el-form-item label="图片" prop="pictures">
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
        <el-form-item label="状态" prop="status">
          <el-radio v-model="form.status" label="0">停用</el-radio>
          <el-radio v-model="form.status" label="1">启用</el-radio>
        </el-form-item>
        <el-form-item label="排序值" prop="sortIndex">
          <el-input v-model="form.sortIndex" type="number" style="width:350px;"/>
        </el-form-item>
        <el-form-item label="描述" prop="details">
          <el-input v-model="form.details" style="width:350px;" type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-button v-loading="loading" type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="addDialog=false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      addDialog: false,
      loadingcardUp: false,
      isupdate: false,
      form: {
        slideShowName: '',
        jumpPosition: '',
        pictures: '',
        details: '',
        status: ''
      },
      loading: false,
      rules: {
        slideShowName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        jumpPosition: [
          { required: true, message: '跳转位置', trigger: 'blur' }
        ],
        pictures: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
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
    }, getPage() {
      this.loading = true
      this.form.pageSize = this.pageSize
      this.form.pageNum = this.pageNum
      this.$store.dispatch('SlideshowPage', this.form).then((res) => {
        this.tableData = res.data.data
        this.pageSize = res.data.size
        this.pageNum = res.data.pageNum
        this.totalCount = Number(res.data.total)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange(data) {
      this.pageSize = data
      this.getPage()
    },
    handleCurrentChange(data) {
      this.pageNum = data
      this.getPage()
    },
    phoneChange(data) {
      this.form.merchantName = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    addColonel() {
      this.addDialog = true
      this.isupdate = false
      this.form = {}
    },
    editColonel(data) {
      this.addDialog = true
      this.isupdate = true
      this.form = data
      this.form.status = data.status + ''
    },
    deleteColonel(id) {
      this.$confirm('此操作将永久删除', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('DeleteSlideshow', { ids: id }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPage()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    prohibitSlideshow(data) {
      this.$confirm('此操作停用', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('ProhibitSlideshow', { id: data.id }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '停用成功!'
            })
            this.getPage()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    enableSlideshow(data) {
      this.$confirm('此操作启用', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('EnableSlideshow', { id: data.id }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '启用成功!'
            })
            this.getPage()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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

      this.$store.dispatch('SlideshowAddOrEdit', this.form).then((res) => {
        if (res.code === 0) {
          if (this.isupdate) {
            this.$message('修改成功!')
          } else {
            this.$message('添加成功!')
          }
          this.form = {}
          this.getPage()
          this.addDialog = false
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    dateFormat: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
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
