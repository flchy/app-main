<template>
  <div class="app-container">
    <div class="man-btn">
      <el-form
        :model="form"
        label-width="100px"
        inline
        size="mini"
      >
        <el-button
          type="primary"
          size="mini"
          style="margin:20px"
          @click="addColonel"
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
        prop="cityName"
        label="城市名称"
      />
      <el-table-column
        prop="provinceName"
        label="省份名称"
      />
      <el-table-column
        label="开通时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
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
      <div >
        <el-form v-loading="loading1" ref="form" :model="form" :rules="rules" label-width="200px" size="mini">
          <el-form-item label="选择省份" prop="provinceCode">
            <el-select v-model="form.provinceCode" filterable placeholder="请选择店铺所在城市" style="width:200px;" @change="toCity">
              <el-option
                v-for="item in citys"
                :key="item.areaCode"
                :label="item.name"
                :value="item.areaCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择城市" prop="cityCode">
            <el-select v-model="form.cityCode" filterable placeholder="请选择店铺所在城市" style="width:200px;">
              <el-option
                v-for="item in citys1"
                :key="item.areaCode"
                :label="item.name"
                :value="item.areaCode"
              />
            </el-select>
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
import moment from 'moment'
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
        cityCode: [
          { required: true, message: '请选择城市', trigger: 'blur' }
        ],
        provinceCode: [
          { required: true, message: '请选择省份', trigger: 'blur' }
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
      this.$store.dispatch('CityPage', { pageSize: this.pageSize, pageNum: this.pageNum }).then((res) => {
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
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    addColonel() {
      this.addDialog = true
      this.loading1 = false
      this.$store.dispatch('SelectArea', { areaCode: 0 }).then((res) => {
        this.citys = res.data
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
      })
    },
    toCity(val) {
      this.addDialog = true
      this.loading1 = false
      this.$store.dispatch('SelectArea', { areaCode: this.form.provinceCode }).then((res) => {
        this.citys1 = res.data
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
      })
    },
    deleteColonel(id) {
      this.$confirm('此操作将永久删除', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('DeleteCity', { ids: id }).then((res) => {
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
    dateFormat: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
    }, onSubmit() {
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
      const province = this.getcat(this.citys, this.form.provinceCode)
      this.form.provinceName = province.name
      const city = this.getcat(this.citys1, this.form.cityCode)
      this.form.cityName = city.name
      this.$store.dispatch('SaveArea', this.form).then((res) => {
        if (res.code === 0) {
          this.$message('添加成功!')
          this.form = {}
          this.addDialog = false
          this.init()
        }
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
      })
    },
    getcat(obj, key) {
      for (let index = 0; index < obj.length; index++) {
        const element = obj[index]
        if (element.areaCode === key) {
          return element
        }
      }
    }
  }
}
</script>
