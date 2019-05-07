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
          prop="goodsName"
        >
          <el-input v-model="form.goodsName" placeholder="商品名称/编号" @change="phoneChange" />
        </el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="addColonel"
        >添加商品</el-button>
        <el-button
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
        prop="goodsName"
        label="商品名称"
      />
      <el-table-column
        prop="classifyName"
        label="商品分类"
      />
      <el-table-column
        prop="originalPrice"
        label="成本价"
        width="100"
      />
      <el-table-column
        prop="marketPrice"
        label="市场价"
        width="100"
      />
      <el-table-column
        prop="platformPrice"
        label="平台价"
        width="100"
      />

      <el-table-column
        prop="memberPrice"
        label="会员价"
        width="100"
      />
      <el-table-column
        prop="turplusTotal"
        label="商品库存"
        width="100"
      />
      <el-table-column
        prop="sales"
        label="商品销量"
        width="100"
      />
      <el-table-column
        prop="salesVolume"
        label="销售额"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="340"
      >
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.recommend"
            type="primary"
            size="mini"
            @click="editRecommend(scope.row,)"
          >设为今日推荐</el-button>
          <el-button
            v-else
            size="mini"
            @click="editRecommend(scope.row)"
          >取消今日推荐</el-button>
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
        goodsName: ''
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
    getPage() {
      this.loading = true
      this.form.pageSize = this.pageSize
      this.form.pageNum = this.pageNum
      this.$store.dispatch('GoodsPage', this.form).then((res) => {
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
      this.form.goodsName = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    addColonel() {
      this.$router.push('/goods/add/:id')
    },
    toType() {
      this.$router.push('/goods/type')
    },
    toLabel() {
      this.$router.push('/goods/label')
    },
    editColonel(id) {
      this.$router.push('/goods/add/' + id)
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
        this.$store.dispatch('Doodsgoods', { goodId: id }).then((res) => {
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
