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
        <el-button
          type="primary"
          size="mini"
          @click="toPurchase"
        >购买记录</el-button>
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
        prop="memberName"
        label="会员套餐名称"
      />
      <el-table-column
        label="图片"
      >
        <template slot-scope="scope">
          <img :src="scope.row.memberImage" width="40px" height="40px">
        </template>

      </el-table-column>
      <el-table-column
        prop="duration"
        label="时长"
      />
      <el-table-column
        prop="originalPrice"
        label="划线价格"
      />

      <el-table-column
        prop="buyPrice"
        label="实际购买价格"
      />
      <el-table-column
        prop="sorts"
        label="排序值"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editColonel(scope.row)"
          >修改</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteColonel(scope.row.memberId)"
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
        <el-form-item label="会员套餐名称" prop="memberName">
          <el-input v-model="form.memberName" placeholder="会员套餐名称" style="width:350px;" />
        </el-form-item>
        <el-form-item label="图片" prop="memberImage">
          <el-upload
            v-loading="loadingcardUp"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploads"
            class="avatar-uploader"
            action="" >
            <img v-if="form.memberImage" :src="form.memberImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="时长" prop="duration">
          <el-input v-model="form.duration" type="number" style="width:350px;">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="划线价格" prop="originalPrice">
          <el-input v-model="form.originalPrice" type="number" style="width:350px;"/>
        </el-form-item>
        <el-form-item label="实际购买价格" prop="buyPrice">
          <el-input v-model="form.buyPrice" type="number" style="width:350px;"/>
        </el-form-item>
        <el-form-item label="排序值" prop="sorts">
          <el-input v-model="form.sorts" type="number" style="width:350px;"/>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" style="width:350px;" type="textarea"/>
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
        memberName: '',
        memberImage: '',
        duration: '',
        originalPrice: '',
        buyPrice: '',
        description: '',
        sorts: ''
      },
      loading: false,
      rules: {
        memberName: [
          { required: true, message: '请输入会员套餐名称', trigger: 'blur' }
        ],
        memberImage: [
          { required: true, message: '请上传会员套餐图片logo', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '请输入会员时长', trigger: 'blur' }
        ],
        originalPrice: [
          { required: true, message: '请输入划线价格', trigger: 'blur' }
        ],
        buyPrice: [
          { required: true, message: '请输入时间购买价格', trigger: 'blur' }
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
      this.$store.dispatch('MemberPage', this.form).then((res) => {
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
    },
    toPurchase(id) {
      this.$router.push('/member/purchase')
    },
    deleteColonel(id) {
      this.$confirm('此操作将永久删除', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('DeleteMember', { id: id }).then((res) => {
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
            That.form.memberImage = res.imageNginxPath + res.path
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
      if (this.isupdate) {
        delete this.form.createTime
        this.$store.dispatch('UpdateMember', this.form).then((res) => {
          if (res.code === 0) {
            this.$message('修改成功!')
            this.addDialog = false
            this.getPage()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$store.dispatch('SaveMember', this.form).then((res) => {
          if (res.code === 0) {
            this.$message('添加成功!')
            this.form = {}
            this.getPage()
            this.addDialog = false
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
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
  .amap-demo {
      height: 300px;
    }
</style>
