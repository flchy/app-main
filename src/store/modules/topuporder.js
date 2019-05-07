import { listTopUpOrder, listTopUpOrderConfirm } from '@/api/topuporder'

const order = {
  actions: {
    // 获取订单分页
    ListTopUpOrder({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        listTopUpOrder(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 审核
    ListTopUpOrderConfirm({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        listTopUpOrderConfirm(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default order
