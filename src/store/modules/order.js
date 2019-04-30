import { orderPage, deliver, distribution, orderInfo, orderStatistics, orderPrinting } from '@/api/order'

const order = {
  actions: {
    // 获取订单分页
    OrderPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        orderPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 开始配送订单
    ToSetDeliver({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        deliver(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 开始配送订单
    Distribution({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        distribution(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 订单详情
    OrderInfo({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        orderInfo(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 订单统计
    OrderStatistics({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        orderStatistics(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 订单导出
    OrderPrinting({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        orderPrinting(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default order
