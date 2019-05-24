import { getNotice, editNotice } from '@/api/notice'
const wechatUser = {
  actions: {
    // 获取公告
    GetNotice({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        getNotice(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改公告
    EditNotice({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        editNotice(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default wechatUser
