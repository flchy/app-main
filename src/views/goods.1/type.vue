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
          style="margin:20px"
          @click="addColonel"
        >添加</el-button>
        <el-button
          size="mini"
          @click="toGoods"
        >返回</el-button>
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
        prop="classify_name"
        label="名称"
      />
      <el-table-column
        prop="sort"
        label="排序"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="update(scope.row)"
          >修改</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteColonel(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="addDialog" :visible.sync="addDialog" title="操作" width="480px" size="small">
      <div >
        <el-form v-loading="loading1" ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
          <el-form-item label="名称" prop="classifyName">
            <el-input v-model="form.classifyName" placeholder="请输入名称" style="width:300px;" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入排序" type="number" style="width:300px;" />
          </el-form-item>
          <el-form-item>
            <el-button v-loading="loading" type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="addDialog=false">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tableData: [],
      addDialog: false,
      form: {
        classifyName: '',
        sort: 0
      },
      loading: false,
      loading1: false,
      rules: {
        classifyName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getPage()
    },
    toGoods() {
      this.$router.push('/goods/list')
    },
    getPage() {
      this.loading = true
      this.$store.dispatch('ClassifyGetAll').then((res) => {
        this.tableData = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    update(data) {
      this.form.classifyName = data.classify_name
      this.form.id = data.id
      this.form.sort = data.sort
      this.addDialog = true
    },
    addColonel() {
      this.addDialog = true
      this.form = {}
    },
    deleteColonel(id) {
      this.$confirm('此操作将永久删除', ' 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('ClassifyDelete', { classId: id }).then((res) => {
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
    }, onSubmit() {
      let canCommit = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          canCommit = true
        } else {
          canCommit = false
        }
      })
      if (!canCommit) {
        return
      }
      this.loading1 = false
      this.$store.dispatch('ClassifyAddOrUpdate', this.form).then((res) => {
        if (res.code === 0) {
          if (this.form.id) {
            this.$message('修改成功!')
          } else {
            this.$message('添加成功!')
          }
          this.form = {}
          this.addDialog = false
          this.init()
        }
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
      })
    }
  }
}
</script>
