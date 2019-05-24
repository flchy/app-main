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
        prop="keyName"
        label="配置名称"
      />
      <el-table-column
        label="配置值"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.config">{{ scope.row.value }}</div>
          <div v-if="!scope.row.config && scope.row.key">
            {{ toJson(scope.row.key).url }}
            <el-tooltip placement="top">
              <div slot="content">
                <img :src="toJson(scope.row.key).qrcode" width="400px" height="400px">
              </div>
              <img :src="toJson(scope.row.key).qrcode" width="40px" height="40px" style="margin-right:10px">
            </el-tooltip>
          </div>
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
        <el-form v-loading="loading1" ref="form" :model="form" :rules="rules" label-width="300px" size="mini">
          <el-form-item :label="form.keyName" prop="value">
            <el-input-number v-model="form.value" style="width:200px;" />
          </el-form-item>
          <el-form-item>
            <el-button v-loading="loading1" type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="addDialog=false">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog v-if="addDialog1" :visible.sync="addDialog1" title="操作" size="small">
      <div >
        <el-form v-loading="loading" ref="form1" :model="form1" :rules="rules1" label-width="200px" size="mini">
          <h1 style="text-align: center;">{{ form1.keyName }}</h1>
          <el-form-item label="地址" prop="key1">
            <el-input v-model="form1.key1" type="textarea" style="width:400px;" />
            <el-button v-loading="loading1" type="info" @click="useqrcode">生成二维码</el-button>
          </el-form-item>
          <el-form-item label="二维码" prop="qrcode">
            <el-input v-model="form1.qrcode" style="display: none;" type="textarea" />
            <div>
              <div id="code"/>
              <canvas id="canvas"/>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button v-loading="loading" type="primary" @click="onSubmit1">确定</el-button>
            <el-button @click="addDialog1=false">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import QRCode from 'qrcode'
export default {
  components: {
    QRCode: QRCode
  },
  data() {
    return {
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      addDialog: false,
      addDialog1: false,
      form: {
        cityCode: '',
        provinceCode: ''
      },
      form1: {
        key1: '',
        qrcode: ''
      },
      loading: false,
      loading1: false,
      citys: [],
      citys1: [],
      rules: {
        value: [
          { required: true, message: '请输入值', trigger: 'blur' }
        ]
      },
      rules1: {
        qrcode: [
          { required: true, message: '请生成二维码', trigger: 'blur' }
        ],
        key1: [
          { required: true, message: '请输入url', trigger: 'blur' }
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
      this.$store.dispatch('SelectSystemConfig').then((res) => {
        this.tableData = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addColonel(data) {
      if (data.config) {
        this.addDialog = true
        this.form.key = data.key
        this.form.keyName = data.keyName
        this.form.value = data.value
      } else {
        this.addDialog1 = true

        this.form1.keyName = data.keyName
        this.form1.key = data.value
        if (data.key) {
          this.form1.key1 = this.toJson(data.key).url
          this.form1.qrcode = this.toJson(data.key).qrcode
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
      this.loading1 = false
      this.$store.dispatch('PutSystemConfig', this.form).then((res) => {
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
    onSubmit1() {
      let canCommit = true
      this.$refs.form1.validate((valid) => {
        if (valid) {
          canCommit = true
        } else {
          canCommit = false
        }
      })
      if (!canCommit) {
        return
      }
      this.loading = false

      this.form1.value = JSON.stringify({ 'url': this.form1.key1, 'qrcode': this.form1.qrcode })

      this.$store.dispatch('PutDownloadUpdate', this.form1).then((res) => {
        if (res.code === 0) {
          this.$message('修改成功!')
          this.form1 = {}
          this.addDialog1 = false
          this.init()
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    useqrcode() {
      if (!this.form1.key1) {
        this.$message.error('请先输入url地址')
        return
      }
      var canvas = document.getElementById('canvas')
      var That = this
      That.loading = true
      QRCode.toCanvas(canvas, this.form1.key1, function(error) {
        if (error) {
          console.error(error)
          That.loading = false
          return
        }
        // console.log('success!')
        var base64 = That.base64ToBlob(canvas.toDataURL('image/jpeg'))
        const formData = new FormData()
        formData.append('imgs', base64)
        That.$store.dispatch('UploadImage', formData).then((res) => {
          console.log(res)
          if (res.code === 0) {
            That.form1.qrcode = res.data[0]
          }
          That.loading = false
        }).catch(() => {
          That.loading = false
        })
      })
    },
    // base64转blob
    base64ToBlob(code) {
      const parts = code.split(';base64,')
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })
    },
    toJson(data) {
      var key = JSON.parse(data)
      console.log(key)
      return key
    }
  }
}
</script>
