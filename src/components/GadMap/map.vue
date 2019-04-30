<template>
  <div class ="gaodemap">
    <div class="amap-page-container">
      <el-amap-search-box :on-search-result="onSearchResult" class="search-box"/>
      <el-amap v-if="mapCenter" :zoom="15" :center="mapCenter" :events="events" :plugin="plugin" vid="amapDemo">
        <el-amap-marker v-for="marker in markers" :key="marker.key" :position="marker.position" :events="marker.events" />
        <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content" />
      </el-amap>
    </div>
  </div>

</template>
<script>
export default {
//  props: ['lngitude', 'latitude'],
  props: {
    lngitude: {
      type: String,
      default: '104.057761'
    },
    latitude: {
      type: String,
      default: '30.55807'
    }
  },
  data() {
    return {
      markers: [], // 遮盖物集合
      windows: [], // 提示消息集合
      window: '',
      mapCenter: [], // 设置中心点经纬度
      events: {
        'click': (e) => { // 地图的点击事件
          const x = e.lnglat.getLng()
          const y = e.lnglat.getLat()
          this.windows.forEach(window => {
            window.visible = false
          })
          this.$emit('lnglatHandler', x, y)
          const arr = []
          const obj = { lng: x, lat: y }
          arr.push(obj)
          this.getlnglat(arr) // 将点击后获取的经纬度传给地图
        }
      },
      plugin: [{
        pName: 'ToolBar', // 放大缩小工具
        events: {
          init(instance) {
          }
        }
      }, {
        pName: 'Scale', // 比例尺
        events: {
          init(instance) {
          }
        }
      }]
    }
  },
  // 经度、纬度
  created() { // 首次加载 将经纬度传递给地图组件
    const arr = []
    const obj = { lng: this.lngitude, lat: this.latitude }
    arr.push(obj)
    this.getlnglat(arr)
  },
  methods: {
    onSearchResult(pois) { // 搜索框搜索方法，将结果传给地图组件
      this.getlnglat(pois)
    },
    addmarker(lng, lat, index) { // 添加遮盖物
      const self = this
      const marker = {
        position: [lng, lat + index * 0.001],
        events: {
          click(e) {
            self.windows.forEach(window => {
              window.visible = false
            })
            self.window = self.windows[index]
            self.$nextTick(() => {
              self.window.visible = true
            })
          }
        }
      }
      return marker
    },
    addWindow(lng, lat, index) {
      const obj = {
        position: [lng, lat + index * 0.001],
        content: `<div class="prompt">东经${lng}  北纬${lat}</div>`,
        visible: false
      }
      return obj
    },
    getlnglat(arr, latSum = 0, lngSum = 0) { // 这就是我们封装的地图组件了，看到这基本上就完事了。
      this.markers = []
      this.windows = []
      const self = this
      if (arr.length > 0) {
        arr.forEach(function(item, index) {
          const { lng, lat } = item
          lngSum += lng
          latSum += lat
          self.markers.push(self.addmarker(lng, lat, index))
          self.windows.push(self.addWindow(lng, lat, index))
        })
        const center = {
          lng: lngSum / arr.length,
          lat: latSum / arr.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    }
  }
}
</script>

<style>
    .gaodemap .amap-page-container {
        height: 500px !important;
        position: relative;
        /* padding-top: 30px; */
        margin: 0 auto;
    }
    .gaodemap .search-box {
        position: absolute;
        float: right;
        top: 50px;
        left: 350px;
    }
</style>

