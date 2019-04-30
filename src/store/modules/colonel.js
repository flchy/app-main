import { noMerchantColonelPage, colonelPage, colonelSave, colonelinfo, updateColonel, deleteColonel, colonelApplyPage,
  selectMerchantColonel } from '@/api/colonel'

const colonel = {
  actions: {
    // 获取拼团团长列表
    ColonelPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        colonelPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 未绑定拼团团长列表
    NoMerchantColonelPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        noMerchantColonelPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加拼团团长列表
    ColonelSave({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        colonelSave(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }, // 获取拼团团长信息
    Colonelinfo({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        colonelinfo(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }, // 修改拼团团长
    UpdateColonel({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        updateColonel(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除拼团团长
    DeleteColonel({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        deleteColonel(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取拼团团长申请
    ColonelApplyPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        colonelApplyPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据团长名查询拼团团长
    SelectMerchantColonel({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        selectMerchantColonel(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default colonel
