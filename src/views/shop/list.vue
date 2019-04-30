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
          prop="merchantName"
        >
          <el-input v-model="form.merchantName" placeholder="团长名称/编号" @change="phoneChange" />
        </el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="addColonel"
        >添加</el-button>
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
        label="编号"
      />
      <el-table-column
        prop="merchantName"
        label="名称"
      />
      <el-table-column
        prop="village"
        label="小区"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        prop="colonelName"
        label="团长"
      />

      <el-table-column
        prop="yesterdaySingle"
        label="昨日单量"
      />
      <el-table-column
        prop="yesterdayTurnover"
        label="昨日成交额"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="230"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="toDetails(scope.row.id)"
          >详情</el-button>
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
export default {
  data() {
    return {
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      form: {
        merchantName: ''
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
      this.$store.dispatch('MerchantPage', this.form).then((res) => {
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
      this.$router.push('/shop/add/:id')
    },
    editColonel(id) {
      this.$router.push('/shop/add/' + id)
    },
    toDetails(id) {
      this.$router.push('/shop/details/' + id)
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
    }
  }
}
</script>
