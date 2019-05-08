import { appUserPage, editAppUserStatus } from '@/api/appUser'
const wechatUser = {
  actions: {
    // 获取拼团用户分页
    AppUserPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        appUserPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改用户状态
    EditAppUserStatus({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        editAppUserStatus(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default wechatUser
