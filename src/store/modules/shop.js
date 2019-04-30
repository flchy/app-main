import { merchantPage, saveMerchant, updateMerchant, merchantInfo, deleteMerchant } from '@/api/shop'

const shop = {
  actions: {
    // 获取拼团店铺列表
    MerchantPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        merchantPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加拼团店铺
    SaveMerchant({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        saveMerchant(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改拼团店铺
    UpdateMerchant({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        updateMerchant(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改拼团店铺
    MerchantInfo({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        merchantInfo(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除拼团店铺
    DeleteMerchant({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        deleteMerchant(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default shop
