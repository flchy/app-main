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
          prop="orderId"
        >
          <el-input v-model="form.orderId" placeholder="订单号/手机" @change="phoneChange" />
        </el-form-item>
        <el-form-item
          label="选择日期"
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
        <el-form-item label="团长" prop="type">
          <el-select
            v-model="form.colonelId"
            :remote-method="remoteMethod"
            :loading="loadings"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            @change="colonelChange">
            <el-option
              v-for="item in options4"
              :key="item.id"
              :label="item.colonelName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item
          label="小区"
          prop="village"
        >
          <el-input v-model="form.village" placeholder="店铺所属小区" @change="villageChange" />
        </el-form-item>
        <!-- <el-button
          type="primary"
          size="mini"
          @click="addColonel"
        >添加</el-button> -->
        <el-button
          type="primary"
          size="mini"
        >导出表格</el-button>
        <el-tabs v-model="form.status" type="card" @tab-click="handleClick">
          <el-tab-pane label="待处理" name="6"/>
          <el-tab-pane v-if="form.status==='7'" label="已处理" name="7"/>
          <el-tab-pane v-else label="已处理" name="-2"/>
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
        prop="orderId"
        label="订单编号"
      />
      <el-table-column
        label="下单时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.returnTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="colonelName"
        label="所属团长"
      />
      <el-table-column
        prop="userEntity"
        label="用户身份"
      />
      <el-table-column
        prop="userName"
        label="用户昵称"
      />

      <el-table-column
        prop="phone"
        label="联系电话"
      />
      <el-table-column
        label="购买价格"
      >
        <template slot-scope="scope">
          {{ scope.row.totalAmount }}元
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="175"

      >
        <template slot-scope="scope" >
          <el-button
            v-if="scope.row.status===6"
            type="primary"
            size="mini"
            @click="
              addDialog = true
              toDetails(scope.row.orderId)"
          >去处理</el-button>
          <el-button
            size="mini"
            type="primary"
            @click=" addDialog = true
                     toDetails(scope.row.orderId)"
          >详情</el-button>
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
      <el-form v-loading="loadingDialog" inline label-width="100px" size="mini">
        <el-form-item label="订单编号">
          <label style="color: #ccc;">{{ orderInfo.orderId }}</label>
        </el-form-item>
        <el-form-item label="下单时间" >
          <label style="color: #ccc;">{{ dateFormat(orderInfo.createTime) }}</label>
        </el-form-item>
        <el-form-item label="用户身份">
          <label style="color: #ccc;">{{ orderInfo.userEntity }}</label>
        </el-form-item>
        <el-form-item label="用户昵称">
          <label style="color: #ccc;">{{ orderInfo.userName }}</label>
        </el-form-item>
        <el-form-item label="联系电话">
          <label style="color: #ccc;">{{ orderInfo.phone }}</label>
        </el-form-item>
        <el-form-item label="申请退款时间" >
          <label style="color: #ccc;">{{ dateFormat(orderInfo.returnTime ) }}</label>
        </el-form-item>
        <el-form-item label="订单状态">
          <label style="color: #ccc;">{{ orderInfo.statusName }}</label>
        </el-form-item>
        <el-form-item label="所属团长">
          <label style="color: #ccc;">{{ orderInfo.colonelName }}</label>
        </el-form-item>
        <el-form-item label="小区">
          <label style="color: #ccc;">{{ orderInfo.village }}</label>
        </el-form-item>
        <div >
          <el-form-item label="商品详情" style="display: block;margin-bottom: 0px;"/>
          <el-form-item v-for="item in orderInfo.assembleOrderDetailsList" :key="item.id" :label="item.goodsName" label-width="350px">
            <label style="color: #ccc;margin-left:80px">{{ item.quantity }}</label>
            <label style="color: #ccc;margin-left:80px">{{ item.price }}元</label>
          </el-form-item>
        </div>
        <div style="border:1px dashed #ccc"/>
        <div style="text-align: center;margin:10px 0px;">
          <label style="margin-right:20px">订单金额{{ orderInfo.totalAmount }}元</label>
          <label style="margin-right:20px">优惠抵扣{{ orderInfo.favorablePrice }}元</label>
          <label >实付{{ orderInfo.finalAmount }}元</label>
        </div>
        <div style="border:1px solid  #d7dae2;border-radius: 4px; min-height:60px; padding:3px;word-wrap : break-word;word-break:break-all;">
          <label>退单原因:    </label> {{ orderInfo.returnReason }}
        </div>
        <div style="margin-top:20px;text-align: center;">
          <el-button
            v-if="orderInfo.status===6"
            type="primary"
            size="mini"
          >拒绝退款</el-button>
          <!-- @click="editDelivery(orderInfo.orderId)" -->
          <el-button
            v-if="orderInfo.status===6"
            type="primary"
            size="mini"
          >同意退款</el-button>
          <!-- @click="editDistribution(orderInfo.orderId)" -->
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
        merchantName: '',
        status: '6',
        orderId: '',
        village: '',
        colonelId: ''
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
      orderInfo: ''
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
      if (Number(this.form.status) === 6) {
        this.form.statusAy = [this.form.status]
      } else {
        this.form.statusAy = [7, -2]
      }

      this.$store.dispatch('OrderPage', this.form).then((res) => {
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
      this.form.pageNum = 1
      this.getPage()
    },
    toDetails(id) {
      this.loadingDialog = true
      this.$store.dispatch('OrderInfo', { id: id }).then((res) => {
        if (res.code === 0) {
          this.orderInfo = res.data
        }
        this.loadingDialog = false
      }).catch(() => {
        this.loadingDialog = false
      })
    },
    dateFormat: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
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
