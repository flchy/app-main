import { wechatUserPage } from '@/api/wechatUser'
const wechatUser = {
  actions: {
    // 获取拼团用户分页
    WechatUserPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        wechatUserPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default wechatUser
