import { selectPayWay, putPayWay } from '@/api/payway'
const city = {
  actions: {
    // 查询支付方式配置
    SelectPayWay({ commit, state }) {
      return new Promise((resolve, reject) => {
        selectPayWay().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改支付方式配置
    PutPayWay({ commit, state }, parem) {
      return new Promise((resolve, reject) => {
        putPayWay(parem).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default city
