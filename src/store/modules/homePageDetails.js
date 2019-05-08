import { gethomePageDetails, editHomePageDetails } from '@/api/homePageDetails'
const wechatUser = {
  actions: {
    // 查询首页介绍
    GethomePageDetails({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        gethomePageDetails(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改首页介绍
    EditHomePageDetails({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        editHomePageDetails(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default wechatUser
