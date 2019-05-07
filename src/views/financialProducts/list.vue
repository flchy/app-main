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
          prop="name"
        >
          <el-input v-model="form.name" placeholder="商品名称/编号" @change="phoneChange" />
        </el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="addColonel"
        >添加商品</el-button>
        <!-- <el-button
          type="primary"
          size="mini"
          @click="toType"
        >分类管理</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="toLabel"
        >标签管理</el-button>
        <el-button
          type="primary"
          size="mini"
        >导出表格</el-button> -->
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
        prop="title"
        label="商品名称"
      />
      <el-table-column
        prop="tradeScore"
        label="所需报单积分"
      />
      <el-table-column
        prop="total"
        label="数量"
        width="100"
      />
      <el-table-column
        prop="annualizedRate"
        label="收益率"
        width="100"
      />
      <el-table-column
        prop="consumeRate"
        label="消费积分占比"
        width="100"
      />
      <el-table-column
        prop="days"
        label="冻结周期(天)"
        width="100"
      />
      <el-table-column
        label="商品图片"
        width="300"
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
        label="开始时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editColonel(scope.row.id)"
          >修改</el-button>
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
        name: ''
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
    },
    dateFormat: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
    getPage() {
      this.loading = true
      this.form.pageSize = this.pageSize
      this.form.pageNum = this.pageNum
      this.$store.dispatch('FinancialProductsPage', this.form).then((res) => {
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
      this.form.name = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    addColonel() {
      this.$router.push('/financialProducts/add/:id')
    },
    toType() {
      this.$router.push('/goods/type')
    },
    toLabel() {
      this.$router.push('/goods/label')
    },
    editColonel(id) {
      this.$router.push('/financialProducts/add/' + id)
    },
    toDetails(id) {
      // this.$router.push('/shop/details/' + id)
      this.$message.info('没做！！！！！！！！！！！！！！！！！！！')
    },
    deleteColonel(id) {
      this.$confirm('此操作将永久删除', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('Doodsgoods', { id: id }).then((res) => {
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
    editRecommend(data) {
      this.loading = true
      this.$store.dispatch('GoodsRecommend', { goodId: data.id }).then((res) => {
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
    }
  }
}
</script>
