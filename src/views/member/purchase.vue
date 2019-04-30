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
          label="选择日期"
          prop="merchantName"
        >
          <el-date-picker
            v-model="time"
            :picker-options="pickerOptions2"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="timeChange"/>
        </el-form-item>

        <el-button
          type="primary"
          size="mini"
        >导出表格</el-button>
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
        label="ID"
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
        prop="memberName"
        label="会员套餐名称"
      />
      <el-table-column
        prop="originalPrice"
        label="购买价格"
      />

      <el-table-column
        prop="createTime"
        label="下单时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime ) }}
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      time: '',
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      form: {
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
      this.$store.dispatch('MemberRecordPage', this.form).then((res) => {
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
    dateFormat: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
    timeChange(data) {
      this.form.startTime = data[0]
      this.form.endTime = data[1]
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    }
  }
}
</script>
