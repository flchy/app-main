import { userEncashmentPage, userEncashmentConfirm } from '@/api/userEncashment'

const order = {
  actions: {
    // 获取订单分页
    UserEncashmentPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        userEncashmentPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 审核
    UserEncashmentConfirm({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        userEncashmentConfirm(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default order
