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
          label="用户编号"
          prop="userId"
        >
          <el-input v-model="form.userId" type="number" placeholder="用户编号 " @change="phoneChange" />
        </el-form-item>
        <el-form-item
          label="推荐人编号"
          prop="parentId"
        >
          <el-input v-model="form.parentId" type="number" placeholder="推荐人编号 " @change="phoneChange" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="mobile"
        >
          <el-input v-model="form.mobile" placeholder="手机号码 " @change="phoneChange" />
        </el-form-item>

        <el-form-item label="用户类型" prop="type">
          <el-select v-model="type" placeholder="显示全部用户" @change="typeChange" >
            <el-option label="全部用户" value="-1"/>
            <el-option label="普通会员" value="0"/>
            <el-option label="个体会员" value="1"/>
            <el-option label="社区会员" value="2"/>
            <el-option label="市级会员" value="3"/>
            <el-option label="省级会员" value="4"/>
          </el-select>
        </el-form-item>
        <el-form-item
          label="注册时间"
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
        label="用户编号"
      />
      <el-table-column
        prop="parentId"
        label="推荐码"
      />
      <el-table-column
        prop="account"
        label="账号"
      />
      <el-table-column
        prop="mobile"
        label="手机号"
      />
      <el-table-column
        label="头像"
      >
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">
              <img :src="scope.row.avatar" width="400px" height="400px">
            </div>
            <img :src="scope.row.avatar" width="40px" height="40px" style="margin-right:10px">
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="lastOrderTime"
        label="等级"
      >
        <template slot-scope="scope">
          {{ scope.row.level===0?"普通会员":scope.row.level===1?"个体会员":scope.row.level===2?"社区会员":scope.row.level===3?"市级会员":scope.row.level===4?"省级会员":"" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="registerDate"
        label="注册时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.registerDate) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status===1?"正常":scope.row.status===2?"冻结":"" }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80"
      >
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status===1?'danger':'primary'"
            size="mini"
            @click="toDetails(scope.row)"
          >{{ scope.row.status===1?"冻结":'解冻' }}</el-button>
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
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      type: '',
      orderTime: '',

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

      form: {
        userId: '',
        type: '-1'
      },
      loading: false
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
      if (this.form.startTime) {
        this.form.startTime = this.dateFormat1(this.form.startTime)
      }
      if (this.form.endTime) {
        this.form.endTime = this.dateFormat1(this.form.endTime)
      }
      this.$store.dispatch('AppUserPage', this.form).then((res) => {
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
    typeChange(data) {
      this.form.type = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    toDetails(data) {
      // this.$router.push('/shop/details/' + id)
      this.$confirm('确定将账号: ' + data.account + (data.status === 1 ? '  冻结' : '  解冻') + '吗', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('EditAppUserStatus', { id: data.id }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: (data.status === 1 ? '  冻结' : '  解冻') + '成功!'
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
    },
    dateFormat1: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>
