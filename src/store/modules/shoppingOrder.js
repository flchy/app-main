import { shoppingOrderPage, shoppingOrderConfirm } from '@/api/shoppingOrder'

const order = {
  actions: {
    // 获取订单分页
    ShoppingOrderPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        shoppingOrderPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 审核
    ShoppingOrderConfirm({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        shoppingOrderConfirm(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default order
