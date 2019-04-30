<template>
  <div class="app-container">
    <el-form v-loading="loading" ref="form" :model="form" label-width="200px" size="mini">
      <el-form-item label="所属城市" prop="merchantName">
        <label >{{ form.cityName }}</label>
      </el-form-item>
      <el-form-item label="编号" prop="merchantName">
        <label >{{ form.id }}</label>
      </el-form-item>
      <el-form-item label="名称" prop="merchantName">
        <label >{{ form.merchantName }}</label>
      </el-form-item>
      <el-form-item label="小区" prop="merchantName">
        <label >{{ form.village }}</label>
      </el-form-item>
      <el-form-item label="地址" prop="merchantName">
        <label >{{ form.address }}</label>
      </el-form-item>
      <el-form-item label="成立日期" prop="merchantName">
        <label >{{ dateFormat(form.createTime) }}</label>
      </el-form-item>
      <el-form-item label="店铺坐标" prop="merchantName">
        <label >{{ form.latitude }} , {{ form.longitude }}</label>
      </el-form-item>
      <el-form-item label="团长" prop="merchantName">
        <label >{{ form.colonelName }}</label>
        <el-button type="primary" icon="el-icon-edit" circle @click="addTable"/>
      </el-form-item>
      <el-form-item label="店铺图片" prop="merchantName">
        <img :src="form.logo ">
      </el-form-item>
    </el-form>
    <el-dialog v-if="addDialogTable" :visible.sync="addDialogTable" title="选择团长" size="small">
      <div class="man-btn">
        <el-form
          :model="form"
          label-width="100px"
          inline
          size="mini"
        >
          <el-form-item
            label="搜索团长"
            prop="phone"
          >
            <el-input v-model="form.phone" @change="phoneChange" />
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
          prop="colonelName"
          label="姓名"
        />
        <el-table-column
          label="年龄"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.age }}岁
          </template>
        </el-table-column>
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
          label="匹配店铺"
        />
        <el-table-column
          prop="isLine"
          label="是否签约"
        >
          <template slot-scope="scope">
            {{ scope.row.isLine===true?"是":"否" }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="saveColonel(scope.row)"
            >设为团长</el-button>
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
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      loading: false,
      addDialogTable: false,
      form: {
      },
      tableData: [],
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      form1: {
        merchantName: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const id = this.$route.params.id
      this.$store.dispatch('MerchantInfo', { id: id }).then((res) => {
        this.form = res.data
        this.loading = false
        this.isupdate = true
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
    addTable() {
      this.addDialogTable = true
      this.form1.phone = ''
      this.form1.pageSize = 10
      this.form1.pageNum = 1
      this.getPage()
    },
    getPage() {
      this.loading1 = true
      this.form1.pageSize = this.pageSize
      this.form1.pageNum = this.pageNum
      this.$store.dispatch('NoMerchantColonelPage', this.form1).then((res) => {
        this.tableData = res.data.data
        this.pageSize = res.data.size
        this.pageNum = res.data.pageNum
        this.totalCount = Number(res.data.total)
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
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
      this.form1.phone = data
      this.form1.pageSize = 10
      this.form1.pageNum = 1
      this.getPage()
    },
    saveColonel(data) {
      this.addDialogTable = false
      this.$store.dispatch('UpdateMerchant', { id: this.$route.params.id, colonelId: data.id }).then((res) => {
        if (res.code === 0) {
          this.$message('修改成功!')
          this.init()
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
