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
          label="搜索用户"
          prop="nickNameOrPhone"
        >
          <el-input v-model="form.merchantName" placeholder="用户昵称或电话号码 " @change="phoneChange" />
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select v-model="type" placeholder="显示全部用户" @change="typeChange" >
            <el-option label="全部用户" value="0"/>
            <el-option label="普通用户" value="1"/>
            <el-option label="会员用户" value="2"/>
          </el-select>
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
        prop="nickName"
        label="昵称"
      />
      <el-table-column
        prop="phone"
        label="电话"
      />
      <el-table-column
        prop="type"
        label="用户身份"
      />
      <el-table-column
        prop="lastOrderTime"
        label="最近下单"
      >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.lastOrderTime) }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="toDetails(scope.row.id)"
          >详情</el-button>
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
      form: {
        nickNameOrPhone: '',
        type: ''
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
      this.$store.dispatch('WechatUserPage', this.form).then((res) => {
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
      this.form.nickNameOrPhone = data
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    typeChange(data) {
      this.form.type = data === '0' ? 'all' : data === '1' ? 'common' : 'member'
      this.form.pageSize = 10
      this.form.pageNum = 1
      this.getPage()
    },
    toDetails(id) {
      // this.$router.push('/shop/details/' + id)
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
