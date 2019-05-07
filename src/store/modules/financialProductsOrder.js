import { financialProductsOrderPage, financialProductsOrderConfirm } from '@/api/financialProductsOrder'

const order = {
  actions: {
    // 获取订单分页
    FinancialProductsOrderPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        financialProductsOrderPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 审核
    FinancialProductsOrderConfirm({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        financialProductsOrderConfirm(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default order
