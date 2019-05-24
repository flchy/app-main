import { selectSystemConfig, putSystemConfig, putDownloadUpdate } from '@/api/systemconfig'
const city = {
  actions: {
    // 查询系统配置
    SelectSystemConfig({ commit, state }) {
      return new Promise((resolve, reject) => {
        selectSystemConfig().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改系统配置
    PutSystemConfig({ commit, state }, parem) {
      return new Promise((resolve, reject) => {
        putSystemConfig(parem).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改下载系统配置
    PutDownloadUpdate({ commit, state }, parem) {
      return new Promise((resolve, reject) => {
        putDownloadUpdate(parem).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default city
