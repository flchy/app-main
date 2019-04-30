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
          label="姓名,电话"
          prop="phone"
        >
          <el-input v-model="form.phone" placeholder="姓名,电话" @change="phoneChange"/>
        </el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="toColonel"
        >返回团长管理</el-button>
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
        prop="colonelName"
        label="团长名称"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        prop="phone"
        label="联系电话"
      />
      <el-table-column
        prop="village"
        label="所属小区"
      />
      <el-table-column
        label="性别"
      >
        <template slot-scope="scope">
          {{ scope.row.gender===1?"男":scope.row.gender===2?"女":"未知" }}
        </template>
      </el-table-column>
      <el-table-column
        label="提交时间"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        style="text-align: center;"
      >
        <template slot-scope="scope" style="text-align: center;">
          <el-button
            size="mini"
            type="primary"
            @click="asHeadOfThe(scope.row)">
            申请成为团长
          </el-button>
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
        phone: ''
      },
      loading: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    asHeadOfThe(params) {
      params.addNew = true
      this.$router.push({ name: '添加团长', params: params })
    },
    init() {
      this.getPage()
    }, getPage() {
      this.loading = true
      this.form.pageSize = this.pageSize
      this.form.pageNum = this.pageNum
      this.$store.dispatch('ColonelApplyPage', this.form).then((res) => {
        this.tableData = res.data.data
        this.pageSize = res.data.size
        this.pageNum = res.data.pageNum
        this.totalCount = Number(res.data.total)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    dateFormat: function(date) {
      if (date === undefined || date === '') {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm')
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
      this.form.phone = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    toColonel() {
      this.$router.push('/colonel/list')
    }
  }
}
</script>
