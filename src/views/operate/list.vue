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
          style="margin:10px"
          @click="addColonel"
        >添加</el-button>
    </el-form></div>
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
        prop="couponName"
        label="名称"
      />
      <el-table-column
        label="发放时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.endTime ) }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status===0?"正常":scope.row.status===-1?'删除':scope.row.status===1?'上架中':'已下架' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="circulation"
        label="发行量"
      />
      <el-table-column
        prop="receiveAmount"
        label="领取量"
      />
      <el-table-column
        prop="useAmount"
        label="使用量"
      />
      <el-table-column
        prop="userType"
        label="针对用户"
      >
        <template slot-scope="scope">
          {{ scope.row.userType===0?"所有用户":scope.row.userType===1?'普通用户':'会员用户' }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="toDetails(scope.row.id)"
          >查看</el-button>
          <!-- <el-button
            type="primary"
            size="mini"
            @click="editColonel(scope.row.id)"
          >下架</el-button> -->
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
      form: {
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
      this.$store.dispatch('CouponPage', this.form).then((res) => {
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
      this.$router.push('/operate/add')
    },
    editColonel(id) {
      this.$router.push('/shop/add/' + id)
    },
    toDetails(id) {
      this.$message.info('没设计图')
      // this.$router.push('/shop/details/' + id)
    },
    deleteColonel(id) {
      this.$confirm('此操作将永久删除', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('DeleteCoupon', { id: id }).then((res) => {
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
    }
  }
}
</script>
