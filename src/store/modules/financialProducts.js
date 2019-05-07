import { financialProductsPage, createOrEditFinancialProducts, financialProductstail, delFinancialProducts } from '@/api/financialProducts'

const goods = {
  actions: {
    // 获取抢单商品分页
    FinancialProductsPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        financialProductsPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加或者修改抢单商品
    CreateOrEditFinancialProducts({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        createOrEditFinancialProducts(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查看抢单商品详情
    FinancialProductstail({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        financialProductstail(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除抢单商品
    DelFinancialProducts({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        delFinancialProducts(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default goods
