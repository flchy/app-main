import { selectCity, cityPage, selectArea, saveArea, deleteCity } from '@/api/city'
const city = {
  actions: {
    // 查询所有开通城市
    SelectCity({ commit, state }) {
      return new Promise((resolve, reject) => {
        selectCity().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有开通城市
    CityPage({ commit, state }, parem) {
      return new Promise((resolve, reject) => {
        cityPage(parem).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有开通城市
    SelectArea({ commit, state }, parem) {
      return new Promise((resolve, reject) => {
        selectArea(parem).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有开通城市
    SaveArea({ commit, state }, parem) {
      return new Promise((resolve, reject) => {
        saveArea(parem).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除城市
    DeleteCity({ commit, state }, parem) {
      return new Promise((resolve, reject) => {
        deleteCity(parem).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default city
