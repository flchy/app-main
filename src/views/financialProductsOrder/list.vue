<template>
  <div class="app-container">
    <div class="man-btn">
      <el-form
        :model="form"
        label-width="100px"
        inline
        size="mini"
      >
        <el-form-item
          label="搜索"
          prop="id"
        >
          <el-input v-model="form.id" placeholder="订单号" @change="phoneChange" />
        </el-form-item>
        <el-form-item
          label="买入时间"
          prop="merchantName"
        >
          <el-date-picker
            v-model="orderTime"
            :picker-options="pickerOptions2"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="timeChange"/>
        </el-form-item>
        <!-- <el-button
          type="primary"
          size="mini"
          @click="OrderPrinting"
        >导出表格</el-button> -->
        <el-tabs v-model="form.status" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"/>
          <el-tab-pane label="已抢购" name="1"/>
          <el-tab-pane label="已到期" name="2"/>
          <el-tab-pane label="已挂卖" name="3"/>
          <el-tab-pane label="已收益" name="4"/>
        </el-tabs>
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
        prop="id"
        label="订单编号"
        width="145"
      />
      <el-table-column
        prop="title"
        label="商品名称"
      />
      <el-table-column
        label="商品图片"
        width="200"
      >
        <template slot-scope="scope">
          <el-tooltip v-for="item in scope.row.imagess" :key="item" placement="top">
            <div slot="content">
              <img :src="item" width="400px" height="400px">
            </div>
            <img :src="item" width="40px" height="40px" style="margin-right:10px">
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="买入时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="tradeScore"
        label="订单报单积分"
      />
      <el-table-column
        prop="annualizedRate"
        label="收益百分比"
      />
      <el-table-column
        prop="consumeRate"
        label="到期后转入消费积分占比"
      />
      <el-table-column
        prop="days"
        label="冻结周期"
      />
      <el-table-column
        label="挂单时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.onsaleTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="finishTime"
        label="收益时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.finishTime) }}
        </template>
      </el-table-column>

      <el-table-column
        prop="interest"
        label="收益"
      />
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status===1?'已抢购':scope.row.status===2?"已到期":scope.row.status===3?"已挂卖":scope.row.status===4?"已收益":"" }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80"
      >
        <template slot-scope="scope" >

          <el-button
            v-if="scope.row.status===3"
            size="mini"
            type="primary"
            @click=" addDialog = true
                     toDetails(scope.row)"
          >审核</el-button>
          <!-- <el-button
            type="danger"
            size="mini"
            @click="deleteColonel(scope.row.id)"
          >删除</el-button> -->
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
    <el-dialog v-if="addDialog" :visible.sync="addDialog" title="订单详情" size="small">
      <el-form v-loading="loadingDialog" ref="form1" :rules="rules" :model="form1" inline label-width="200px" size="mini">
        <el-form-item label="订单编号">
          <label style="color: #ccc;">{{ orderInfo.id }}</label>
        </el-form-item>
        <el-form-item label="商品名称" >
          <label style="color: #ccc;">{{ orderInfo.title }}</label>
        </el-form-item>
        <el-form-item label="订单报单积分">
          <label style="color: #ccc;">{{ orderInfo.tradeScore }}</label>
        </el-form-item>
        <el-form-item label="收益百分比">
          <label style="color: #ccc;">{{ orderInfo.annualizedRate }}</label>
        </el-form-item>
        <el-form-item label="到期后转入消费积分占比">
          <label style="color: #ccc;">{{ orderInfo.consumeRate }}</label>
        </el-form-item>
        <el-form-item label="冻结周期">
          <label style="color: #ccc;">{{ orderInfo.days }}天</label>
        </el-form-item>

        <el-form-item label="买入时间">
          <label style="color: #ccc;">{{ dateFormat(orderInfo.createTime) }}</label>
        </el-form-item>
        <el-form-item label="挂单时间">
          <label style="color: #ccc;">{{ dateFormat(orderInfo.onsaleTime) }}</label>
        </el-form-item>
        <el-form-item label="收益时间">
          <label style="color: #ccc;">{{ dateFormat(orderInfo.finishTime) }}</label>
        </el-form-item>
        <el-form-item label="收益">
          <label style="color: #ccc;">{{ orderInfo.interest }}</label>
        </el-form-item>
        <el-form-item label="状态">
          <label style="color: #ccc;">{{ orderInfo.status===1?'已抢购':orderInfo.status===2?"已到期":orderInfo.status===3?"已挂卖":orderInfo.status===4?"已收益":"" }}</label>
        </el-form-item>
        <div>
          <el-form-item label="商品轮播图">
            <el-tooltip v-for="item in orderInfo.imagess" :key="item" placement="top">
              <div slot="content">
                <img :src="item" width="400px" height="400px">
              </div>
              <img :src="item" width="80px" height="80px" style="margin-right:10px">
            </el-tooltip>
          </el-form-item>
        </div>
        <div >
          <!-- <el-form-item label="审核" prop="type">
            <el-radio v-model="form1.type" label="1">通过</el-radio>
            <el-radio v-model="form1.type" label="2">不通过</el-radio>
          </el-form-item> -->
        </div>
        <div style="margin-top:20px;text-align: center;">
          <el-button
            type="primary"
            size="mini"
            @click="editDistribution(orderInfo.id)"
          >卖出抢单审核确定</el-button>
          <el-button size="mini" @click="addDialog=false">Cancel</el-button>

        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      options4: [],
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      loadings: '',
      form: {
        status: '0',
        id: ''
      },
      form1: {
        type: ''
      },
      loading: false,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      orderTime: '',
      false: '',
      addDialog: false,
      loadingDialog: false,
      orderInfo: '',
      rules: {
        type: [
          { required: true, message: '请选择审核类型', trigger: 'blur' }
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
    },
    getPage() {
      this.loading = true
      this.form.pageSize = this.pageSize
      this.form.pageNum = this.pageNum
      this.form.type = Number(this.form.status)
      if (this.form.startTime) {
        this.form.startTime = this.dateFormat1(this.form.startTime)
      }
      if (this.form.endTime) {
        this.form.endTime = this.dateFormat1(this.form.endTime)
      }
      this.$store.dispatch('FinancialProductsOrderPage', this.form).then((res) => {
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
      this.form.orderId = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    villageChange(data) {
      this.form.village = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    colonelChange(data) {
      this.form.colonelId = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    timeChange(data) {
      this.form.startTime = data[0]
      this.form.endTime = data[1]
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    handleClick(tab, event) {
      console.log(tab, event)
      this.form.status = tab.name
      this.form.pageSize = 10
      this.pageSize = 10
      this.form.pageNum = 1
      this.pageNum = 1
      this.getPage()
    },
    addColonel() {
      this.$router.push('/shop/add/:id')
    },
    editColonel(id) {
      this.$router.push('/shop/add/' + id)
    },
    toDetails(data) {
      // this.loadingDialog = true
      // this.$store.dispatch('OrderInfo', { id: id }).then((res) => {
      //   if (res.code === 0) {
      //     this.orderInfo = res.data
      //   }
      //   this.loadingDialog = false
      // }).catch(() => {
      //   this.loadingDialog = false
      // })
      this.orderInfo = data
    },
    OrderPrinting() {
      this.$store.dispatch('OrderPrinting', this.form).then((response) => {
        if (!response) {
          return
        }
        console.log(response)
        const content = response.data
        const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const fileName = '订单.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      }).catch(() => {
      })
    },
    editDelivery(id) {
      this.$confirm('确定开始配送吗？', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true

        this.$store.dispatch('ToSetDeliver', { id: id }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
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
          message: '已取消配送'
        })
      })
    },
    editDistribution(id) {
      let canCommit = true
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          canCommit = true
        } else {
          canCommit = false
        }
      })
      if (!canCommit) {
        return
      }
      this.$confirm('确定了吗？', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.addDialog = false
        this.$store.dispatch('FinancialProductsOrderConfirm', { id: id }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
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
          message: '已取消'
        })
      })
    },
    deleteColonel(id) {
      this.$confirm('此操作将永久删除', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('DeleteMerchant', { ids: id }).then((res) => {
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
    },
    dateFormat1: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loadings = true
        this.$store.dispatch('SelectMerchantColonel', { name: query }).then((res) => {
          if (res.code === 0) {
            this.options4 = res.data
          }
          this.loadings = false
        }).catch(() => {
          this.loadings = false
        })
      } else {
        this.options4 = []
      }
    }
  }
}
</script>
