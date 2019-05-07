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
        prop="value"
        label="配置值"
      />
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
        value: [
          { required: true, message: '请输入值', trigger: 'blur' }
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
      this.addDialog = true
      this.form.key = data.key
      this.form.keyName = data.keyName
      this.form.value = data.value
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
    }
  }
}
</script>
