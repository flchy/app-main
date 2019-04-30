<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <div id="myChart" :style="{width: '800px', height: '600px'}"/>
    <div style="width:1000px">
      <el-form ref="form" inline size="mini">

        <el-form-item label="今日总单数:" label-width="200px">
          <label style="color: #ccc;width:300px;display: block;">{{ Data.daySingular }}单</label>
        </el-form-item>
        <el-form-item label="今日总金额:" >
          <label style="color: #ccc;width:300px;display: block;">{{ Data.dayMoney }}元</label>
        </el-form-item>
        <el-form-item label="本月总单数:" label-width="200px">
          <label style="color: #ccc;width:300px;display: block;">{{ Data.monthSingular }}单</label>
        </el-form-item>
        <el-form-item label="本月总金额:" >
          <label style="color: #ccc;width:300px;display: block;">{{ Data.monthMoney }}元</label>
        </el-form-item>
        <el-form-item label="本年总单数:" label-width="200px">
          <label style="color: #ccc;width:300px;display: block;">{{ Data.yearSingular }}单</label>
        </el-form-item>
        <el-form-item label="本年总金额:" >
          <label style="color: #ccc;width:300px;display: block;">{{ Data.yearMoney }}元</label>
        </el-form-item>
        <el-form-item label="全部总单数:" label-width="200px">
          <label style="color: #ccc;width:300px;display: block;">{{ Data.wholeSingular }}单</label>
        </el-form-item>
        <el-form-item label="全部总金额:" >
          <label style="color: #ccc;width:300px;display: block;">{{ Data.wholeMoney }}元</label>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  data() {
    return {
      monthList: [],
      incomeList: [],
      Data: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '统计',
          subtext: '收入'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['总收入']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.monthList
            // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '总收入',
            type: 'bar',
            data: this.incomeList,
            // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      })
    },
    init() {
      this.$store.dispatch('OrderStatistics').then((res) => {
        if (res.code === 0) {
          //
          this.Data = res.data
          this.monthList = res.data.ordersMonth.map(l => l.month)
          this.incomeList = res.data.ordersMonth.map(l => l.money)
          this.drawLine()
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
