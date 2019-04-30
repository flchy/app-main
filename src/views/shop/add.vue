<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="200px" size="mini">
      <el-form-item label="选择城市" prop="cityId">
        <el-select v-model="form.cityId" filterable placeholder="请选择店铺所在城市" style="width:350px;">
          <el-option
            v-for="item in citys"
            :key="item.id"
            :label="item.cityName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="店铺名称" prop="merchantName">
        <el-input v-model="form.merchantName" placeholder="店铺名称" style="width:350px;" />
      </el-form-item>
      <el-form-item label="小区" prop="village">
        <el-input v-model="form.village" placeholder="所属小区" style="width:350px;"/>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="详细地址" style="width:350px;" type="textarea"/>
      </el-form-item>
      <el-form-item label="坐标" prop="longitude">
        <el-input v-model="form.longitude" :disabled="true" style="width:150px;" />
        <el-input v-model="form.latitude" :disabled="true" style="width:150px;" />
        <el-button type="primary" icon="el-icon-edit" circle @click="addDialog=true"/>
      </el-form-item>
      <el-form-item label="设置团长" prop="colonelId">
        <el-input v-model="form.colonelId" :disabled="true" style="width:305px;display: none;"/>
        <el-input v-model="form.colonelName" :disabled="true" style="width:305px;"/>
        <el-button type="primary" icon="el-icon-edit" circle @click="addTable"/>
      </el-form-item>
      <el-form-item label="店铺图片" prop="logo">
        <el-upload
          v-loading="loadingcardUp"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="uploads"
          class="avatar-uploader"
          action="" >
          <img v-if="form.logo" :src="form.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="开启店铺">
        <el-switch v-model="form.isOpen" style="width:350px;"/>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-if="addDialog" :visible.sync="addDialog" title="选择地址" size="small">
      <div :style="{width:'100%',height:'100%'}">
        <gadMapArea @lnglatHandler="lnglatHandler"/>
        <div class="toolbar">
          经纬度: {{ longitude }}, {{ latitude }}
        </div>
        <el-button v-loading="loading" size="mini" style="float:right" type="primary" @click="addlnglat">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="addDialogTable" :visible.sync="addDialogTable" title="选择团长" size="small">
      <div class="man-btn">
        <el-form
          :model="form"
          label-width="100px"
          inline
          size="mini"
        >
          <el-form-item
            label="搜索团长"
            prop="phone"
          >
            <el-input v-model="form.phone" @change="phoneChange" />
          </el-form-item>
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
          prop="colonelName"
          label="姓名"
        />
        <el-table-column
          label="年龄"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}岁
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
        />
        <el-table-column
          prop="village"
          label="匹配店铺"
        />
        <el-table-column
          prop="isLine"
          label="是否签约"
        >
          <template slot-scope="scope">
            {{ scope.row.isLine===true?"是":"否" }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="saveColonel(scope.row)"
            >设为团长</el-button>
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
    </el-dialog>
  </div>
</template>

<script>
import gadMapArea from '@/components/GadMap/map.vue'
export default {
  name: 'AddShop',
  components: {
    gadMapArea
  },
  data() {
    return {
      longitude: '',
      latitude: '',
      addDialog: false,
      addDialogTable: false,
      loadingcardUp: false,
      loadingcardDown: false,
      loading: false,
      loading1: false,
      isupdate: false,
      citys: [],
      form: {
        cityId: '',
        merchantName: '',
        colonelName: '',
        village: '',
        address: '',
        colonelId: '',
        logo: '',
        isOpen: false,
        longitude: '',
        latitude: ''
      },
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      form1: {
        merchantName: ''
      },
      rules: {
        cityId: [
          { required: true, message: '请选择城市', trigger: 'blur' }
        ],
        merchantName: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        village: [
          { required: true, message: '请输入小区', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入团长详细地址', trigger: 'blur' }
        ],
        colonelId: [
          { required: true, message: '请选择团长', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请选择经纬度', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传店铺图片', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      this.$store.dispatch('SelectCity', { }).then((res) => {
        this.citys = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      const id = this.$route.params.id
      if (id !== ':id') {
        this.loading = true
        this.$store.dispatch('MerchantInfo', { id: id }).then((res) => {
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
        this.$store.dispatch('UpdateMerchant', this.form).then((res) => {
          if (res.code === 0) {
            this.$message('修改成功!')
            this.onCancel()
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$store.dispatch('SaveMerchant', this.form).then((res) => {
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
      this.$router.push('/shop/list')
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
            That.form.logo = res.imageNginxPath + res.path
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
    }, lnglatHandler(longitude, latitude) {
      this.form.longitude = longitude
      this.form.latitude = latitude
      this.longitude = longitude
      this.latitude = latitude
    },
    addlnglat() {
      this.addDialog = false
      this.form.longitude = this.longitude
      this.form.latitude = this.latitude
    },
    addTable() {
      this.addDialogTable = true
      this.form1.phone = ''
      this.form1.pageSize = 10
      this.form1.pageNum = 1
      this.getPage()
    },
    getPage() {
      this.loading1 = true
      this.form1.pageSize = this.pageSize
      this.form1.pageNum = this.pageNum
      this.$store.dispatch('NoMerchantColonelPage', this.form1).then((res) => {
        this.tableData = res.data.data
        this.pageSize = res.data.size
        this.pageNum = res.data.pageNum
        this.totalCount = Number(res.data.total)
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
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
      this.form1.phone = data
      this.form1.pageSize = 10
      this.form1.pageNum = 1
      this.getPage()
    },
    saveColonel(data) {
      this.form.colonelId = data.id
      this.form.colonelName = data.colonelName
      this.addDialogTable = false
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
</style>
